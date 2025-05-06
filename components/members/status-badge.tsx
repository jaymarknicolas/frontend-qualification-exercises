"use client";

import { CircleCheck, CircleAlert, Ban } from "lucide-react";

type StatusType = "active" | "blacklisted" | "disabled";

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig = {
  active: {
    textColor: "text-[#75E0A7]",
    bgColor: "bg-[#053321]",
    borderColor: "border-[#085D3A]",
    icon: CircleCheck,
    iconColor: "text-[#17B26A]",
    label: "Active",
  },
  blacklisted: {
    textColor: "text-[#FDA29B]",
    bgColor: "bg-[#55160C]",
    borderColor: "border-[#912018]",
    icon: CircleAlert,
    iconColor: "text-[#F04438]",
    label: "Blacklisted",
  },
  disabled: {
    textColor: "text-[#CECFD2]",
    bgColor: "bg-[#161B26]",
    borderColor: "border-[#333741]",
    icon: Ban,
    iconColor: "text-[#85888E]",
    label: "Disabled",
  },
};

export function StatusBadge({ status = "disabled" }: StatusBadgeProps) {
  const {
    textColor,
    bgColor,
    borderColor,
    icon: Icon,
    iconColor,
    label,
  } = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center rounded-full py-0.5 pl-1.5 pr-2 border text-[12px] font-medium ${textColor} ${bgColor} ${borderColor}`}
    >
      <Icon className={`w-3 h-3 mr-1 rounded-full ${iconColor}`} />
      {label}
    </div>
  );
}
