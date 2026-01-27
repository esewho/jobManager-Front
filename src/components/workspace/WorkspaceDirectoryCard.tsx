export type WorkspaceStatus = "active" | "inactive" | "warning";

export interface WorkspaceData {
  id: string;
  name: string;
  imageUrl: string;
  workersCount: number;
  status: WorkspaceStatus;
  lastActive: string;
}

interface WorkspaceDirectoryCardProps {
  workspace: WorkspaceData;
  onManage?: (workspace: WorkspaceData) => void;
  onClick?: (workspace: WorkspaceData) => void;
}

const statusColors: Record<WorkspaceStatus, string> = {
  active: "bg-green-500",
  inactive: "bg-gray-400",
  warning: "bg-orange-400",
};

export function WorkspaceDirectoryCard({
  workspace,
  onManage,
  onClick,
}: WorkspaceDirectoryCardProps) {
  return (
    <div
      className="group flex flex-col bg-white  rounded-xl border border-transparent shadow-sm hover:shadow-xl hover:border-[#135bec]/20 transition-all cursor-pointer overflow-hidden"
      onClick={() => onClick?.(workspace)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(workspace)}
      role="button"
      tabIndex={0}
    >
      <div
        className="relative w-full aspect-video bg-center bg-cover"
        style={{ backgroundImage: `url("${workspace.imageUrl}")` }}
      >
        <div
          className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white  ${statusColors[workspace.status]}`}
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-[#0d121b]  text-lg font-bold leading-tight mb-1">
            {workspace.name}
          </h3>
          <div className="flex items-center gap-2 text-[#4c669a]  text-sm">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{workspace.workersCount} Workers</span>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100  flex justify-between items-center">
          <span className="text-[#4c669a]  text-xs italic">
            Active {workspace.lastActive}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onManage?.(workspace);
            }}
            className="text-[#135bec] text-xs font-bold uppercase tracking-wider hover:underline"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
