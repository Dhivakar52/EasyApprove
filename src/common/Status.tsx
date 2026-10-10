import React from "react";
import { cn } from "@/lib/utils";

export interface StatusProps {
  status: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; label?: string }> = {
  // Nomination & Review Statuses
  pending: { bg: "bg-orange-100", text: "text-orange-800", label: "Pending" },
  approved: { bg: "bg-green-100", text: "text-green-800", label: "Approved" },
  rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
  "under review": { bg: "bg-yellow-100", text: "text-yellow-800", label: "Under Review" },
  winner: { bg: "bg-blue-100", text: "text-blue-800", label: "Winner" },
  "runner-up": { bg: "bg-gray-100", text: "text-gray-800", label: "Runner-up" },
  active: { bg: "bg-green-100", text: "text-green-800", label: "Active" },
  upcoming: { bg: "bg-blue-100", text: "text-blue-800", label: "Upcoming" },
  completed: { bg: "bg-gray-100", text: "text-gray-800", label: "Completed" },

  // Stage progress
  "stage 1": { bg: "bg-orange-50", text: "text-orange-700", label: "Stage 1" },
  "stage 2": { bg: "bg-yellow-100", text: "text-yellow-700", label: "Stage 2" },
  "stage 3": { bg: "bg-green-100", text: "text-green-700", label: "Stage 3" },

  // Notification types
  "referral request": { bg: "bg-blue-100", text: "text-blue-700", label: "Referral Request" },
  "new referral request": { bg: "bg-purple-100", text: "text-purple-700", label: "New Referral Request" },
  "nomination approval required": { bg: "bg-yellow-100", text: "text-yellow-700", label: "Nomination Approval Required" },
  "nomination approved": { bg: "bg-green-100", text: "text-green-700", label: "Nomination Approved" },
};

export const Status: React.FC<StatusProps> = ({
  status,
  size = "md",
  className = "",
  showLabel = true,
}) => {
  const normalizedKey = (status || "").toLowerCase().trim();
  const config = STATUS_CONFIG[normalizedKey] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: status,
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs font-semibold",
    lg: "px-4 py-1.5 text-sm font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        config.bg,
        config.text,
        sizeClasses[size],
        className
      )}
    >
      {showLabel && (config.label || status)}
    </span>
  );
};

export default Status;