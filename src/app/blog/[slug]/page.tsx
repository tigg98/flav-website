import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPost } from "../blog-data";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://flav.app/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            url: `https://flav.app/blog/${post.slug}`,
            author: {
              "@type": "Organization",
              name: "Flav Team",
            },
            publisher: {
              "@type": "Organization",
              name: "Flav",
              url: "https://flav.app",
              logo: "https://flav.app/logo.png",
            },
          }),
        }}
      />

      <article className="section">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-[var(--color-neutral-500)]">
                <li>
                  <Link href="/" className="hover:text-[var(--color-primary-600)] transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-[var(--color-primary-600)] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[var(--foreground)] font-medium truncate">{post.title}</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-[var(--color-primary-600)] bg-[var(--color-primary-50)] dark:bg-[#E07A5F]/15 dark:text-[var(--color-primary-400)] px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-[var(--color-neutral-500)]">{post.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-[var(--color-neutral-600)] leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-[var(--color-neutral-500)]">
                <span>By Flav Team</span>
                <span>·</span>
                <time>{post.date}</time>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-[var(--color-neutral-600)] dark:prose-p:text-[var(--color-neutral-400)] prose-strong:text-[var(--foreground)] prose-li:text-[var(--color-neutral-600)] dark:prose-li:text-[var(--color-neutral-400)]">
              {post.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} className="mt-10 mb-4">
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3 key={i} className="mt-8 mb-3">
                      {block.replace("### ", "")}
                    </h3>
                  );
                }
                if (block.startsWith("- ")) {
                  return (
                    <ul key={i} className="my-4">
                      {block.split("\n").map((item, j) => (
                        <li key={j}>{item.replace(/^- \*\*(.*?)\*\*/, "$1 —").replace(/^- /, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.startsWith("*") && block.endsWith("*")) {
                  return (
                    <p key={i} className="italic">
                      {block.slice(1, -1)}
                    </p>
                  );
                }
                return <p key={i}>{block}</p>;
              })}
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 rounded-3xl bg-[var(--background-subtle)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] text-center">
              <h3 className="text-2xl font-bold mb-3">Join the Flav Waitlist</h3>
              <p className="text-[var(--color-neutral-600)] mb-6 max-w-md mx-auto">
                Get early access to the cooking app that turns viral recipes into tonight&apos;s dinner.
              </p>
              <div className="max-w-md mx-auto">
                <WaitlistForm />
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] font-medium hover:underline"
              >
                &larr; Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
