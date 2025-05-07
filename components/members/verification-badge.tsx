"use client";

import { VerificationStatusType } from "@/types";
interface VerificationBadgeProps {
  status: VerificationStatusType;
}

const statusConfig = {
  verified: {
    borderColor: "border-[#008005]",
    dotColor: "bg-[#12B76A]",
    textColor: "text-green-500",
    label: "Verified",
  },
  unverified: {
    borderColor: "border-[#800C05]",
    dotColor: "bg-[#F63D68]",
    textColor: "text-[#C01048]",
    label: "Unverified",
  },
  pending: {
    borderColor: "border-[#B93815]",
    dotColor: "bg-orange-500",
    textColor: "text-[#B93815]",
    label: "Pending",
  },
};

export function VerificationBadge({ status }: VerificationBadgeProps) {
  const config = statusConfig[status.toLowerCase() as VerificationStatusType];
  if (!config) return null;

  const { textColor, borderColor, label, dotColor } = config;

  return (
    <div
      className={`flex items-center border rounded-full w-fit pl-1.5 pr-2 py-0.5 ${borderColor}`}
    >
      <div className={`mr-2 h-2 w-2 rounded-full ${dotColor}`}></div>
      <span className={`${textColor} text-[12px]`}>{label}</span>
    </div>
  );
}
