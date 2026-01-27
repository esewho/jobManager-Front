interface WorkspacePageHeadingProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function WorkspacePageHeading({
  title,
  description,
  actionLabel = "Create New Workspace",
  onAction,
}: WorkspacePageHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div className="flex min-w-72 flex-col gap-2">
        <h1 className="text-[#0d121b] text-4xl font-black leading-tight tracking-[-0.033em]">
          {title}
        </h1>
        <p className="text-[#4c669a] text-base font-normal leading-normal">
          {description}
        </p>
      </div>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#135bec] text-white text-sm font-bold shadow-lg shadow-[#135bec]/20 hover:bg-[#135bec]/90 transition-all"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="truncate">{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
