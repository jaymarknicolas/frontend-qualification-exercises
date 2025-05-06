"use client";

interface VerificationBadgeProps {
  status: "verified" | "unverified" | "pending";
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
  const config = statusConfig[status];

  return (
    <div
      className={`flex items-center border rounded-full w-fit pl-1.5 pr-2 py-0.5 ${config.borderColor}`}
    >
      <div className={`mr-2 h-2 w-2 rounded-full ${config.dotColor}`}></div>
      <span className={`${config.textColor} text-[12px]`}>{config.label}</span>
    </div>
  );
}
