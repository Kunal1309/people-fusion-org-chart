"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { Employee } from "@/types";

interface AvatarProps {
  employee: Employee;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  sm: { container: "h-8 w-8", text: "text-xs" },
  md: { container: "h-10 w-10", text: "text-sm" },
  lg: { container: "h-14 w-14", text: "text-base" },
  xl: { container: "h-20 w-20", text: "text-xl" },
};

export function Avatar({ employee, size = "md", className }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const rawName =
    employee.full_name ??
    `${employee.first_name ?? ""} ${employee.last_name ?? ""}`.trim();
  const displayName = rawName || "?";

  const initials = getInitials(displayName);
  const colorClass = getAvatarColor(displayName);
  const { container, text } = SIZE_MAP[size];
  const hasImage = !imgError && (employee.profile_pic || employee.thumb);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full overflow-hidden ring-2 ring-white",
        container,
        !hasImage && colorClass,
        className
      )}
      aria-label={`Avatar for ${displayName}`}
    >
      {hasImage ? (
        <Image
          src={(employee.profile_pic ?? employee.thumb)!}
          alt={displayName}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
          sizes="80px"
        />
      ) : (
        <span className={cn("font-semibold text-white select-none", text)}>
          {initials}
        </span>
      )}
    </div>
  );
}