"use client";

import type { ReactNode } from "react";

interface WorkspaceCardProps {
  children: ReactNode;
  className?: string;
}

export function WorkspaceCard({ children, className = "" }: WorkspaceCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col gap-8 ${className}`}
    >
      {children}
    </div>
  );
}
