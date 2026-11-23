// Spike only: a one-tool MCP server for the ChatGPT connection test.
// Deployed to the throwaway project flav-chatgpt-test, never to Flav's own
// project. Deploy with "Verify JWT" OFF: this function checks the token
// itself so it can answer 401 with the header ChatGPT needs.
//
// What it proves: ChatGPT can find the sign-in server, register, send the
// user through the consent page, and call a tool with that user's token.

import { createRemoteJWKSet, jwtVerify } from "npm:jose@5.9.6";

const PROJECT_URL = Deno.env.get("SUPABASE_URL")!; // https://<ref>.supabase.co
const ISSUER = `${PROJECT_URL}/auth/v1`;
const RESOURCE = `${PROJECT_URL}/functions/v1/spike-mcp`;
const METADATA_URL = `${RESOURCE}/.well-known/oauth-protected-resource`;
const JWKS = createRemoteJWKSet(new URL(`${ISSUER}/.well-known/jwks.json`));

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

const unauthorized = (description: string) =>
  json({ error: "invalid_token", error_description: description }, 401, {
    "www-authenticate":
      `Bearer resource_metadata="${METADATA_URL}", error="invalid_token", error_description="${description}"`,
  });

const TOOLS = [
  {
    name: "whoami",
    title: "Who am I",
    description:
      "Use this to check which Flav test account is connected. Returns the signed-in test user's id and email. Read only.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    securitySchemes: [{ type: "oauth2", scopes: [] }],
  },
];

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Protected resource metadata: tells ChatGPT where to sign the user in.
  if (req.method === "GET" && url.pathname.endsWith("/.well-known/oauth-protected-resource")) {
    return json({
      resource: RESOURCE,
      authorization_servers: [ISSUER],
      bearer_methods_supported: ["header"],
    });
  }

  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  }

  // Every MCP call needs a token issued by this project's OAuth server.
  const header = req.headers.get("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  if (!token) return unauthorized("Sign in to continue");

  let claims: Record<string, unknown>;
  try {
    const { payload } = await jwtVerify(token, JWKS, { issuer: ISSUER });
    claims = payload as Record<string, unknown>;
  } catch (err) {
    console.log("token rejected:", (err as Error).message);
    return unauthorized("Token could not be verified");
  }
  // Only OAuth-issued tokens carry client_id. A plain app session does not.
  if (typeof claims.client_id !== "string") {
    return unauthorized("Token was not issued through the OAuth server");
  }
  // Logged for the test: does the audience carry the resource yet?
  console.log("token ok:", JSON.stringify({ aud: claims.aud, client_id: claims.client_id, scope: claims.scope }));

  let rpc: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> };
  try {
    rpc = await req.json();
  } catch {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, 400);
  }

  // Notifications have no id and get no body back.
  if (rpc.id === undefined || rpc.id === null) return new Response(null, { status: 202 });

  const reply = (result: unknown) => json({ jsonrpc: "2.0", id: rpc.id, result });

  switch (rpc.method) {
    case "initialize":
      return reply({
        protocolVersion: (rpc.params?.protocolVersion as string) ?? "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "flav-spike", version: "0.0.1" },
      });
    case "ping":
      return reply({});
    case "tools/list":
      return reply({ tools: TOOLS });
    case "tools/call": {
      if (rpc.params?.name !== "whoami") {
        return json({ jsonrpc: "2.0", id: rpc.id, error: { code: -32602, message: "Unknown tool" } });
      }
      const who = {
        user_id: claims.sub,
        email: claims.email ?? null,
        token_audience: claims.aud ?? null,
        oauth_client_id: claims.client_id,
      };
      return reply({
        content: [{ type: "text", text: JSON.stringify(who) }],
        structuredContent: who,
      });
    }
    default:
      return json({ jsonrpc: "2.0", id: rpc.id, error: { code: -32601, message: "Method not found" } });
  }
});
