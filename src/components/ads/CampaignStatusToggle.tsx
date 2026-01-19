"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CampaignStatusToggleProps {
    campaignId: string;
    currentStatus: string;
}

export function CampaignStatusToggle({ campaignId, currentStatus }: CampaignStatusToggleProps) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState(currentStatus);

    const toggleStatus = async () => {
        const newStatus = status === "active" ? "paused" : "active";
        setIsUpdating(true);

        try {
            const res = await fetch("/api/campaigns", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: campaignId,
                    status: newStatus,
                }),
            });

            if (res.ok) {
                setStatus(newStatus);
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Only show toggle for active/paused campaigns
    if (status !== "active" && status !== "paused") {
        return null;
    }

    return (
        <button
            onClick={toggleStatus}
            disabled={isUpdating}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${status === "active"
                    ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/30"
                    : "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/30"
                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isUpdating ? "..." : status === "active" ? "Pause" : "Activate"}
        </button>
    );
}
