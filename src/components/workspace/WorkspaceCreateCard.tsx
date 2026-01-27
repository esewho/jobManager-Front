interface WorkspaceCreateCardProps {
  onClick?: () => void;
}

export function WorkspaceCreateCard({ onClick }: WorkspaceCreateCardProps) {
  return (
    <div
      className="group flex flex-col p-4 bg-white rounded-xl border-2 border-dashed border-[#cfd7e7] hover:border-[#135bec] transition-all cursor-pointer h-full min-h-[280px]"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="size-12 rounded-full bg-[#135bec]/10 flex items-center justify-center group-hover:bg-[#135bec] transition-colors">
          <svg
            className="w-6 h-6 text-[#135bec] group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#0d121b]  text-lg font-bold leading-tight">
            New Workspace
          </p>
          <p className="text-[#4c669a] text-xs px-4">
            Click to add a new location for workforce management.
          </p>
        </div>
      </div>
    </div>
  );
}
