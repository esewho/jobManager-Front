import { WorkspaceCreateCard } from "./WorkspaceCreateCard";
import { WorkspaceDirectoryCard, type WorkspaceData } from "./WorkspaceDirectoryCard";

interface WorkspaceDirectoryGridProps {
  workspaces: WorkspaceData[];
  onCreateNew?: () => void;
  onManage?: (workspace: WorkspaceData) => void;
  onSelect?: (workspace: WorkspaceData) => void;
  showCreateCard?: boolean;
}

export function WorkspaceDirectoryGrid({
  workspaces,
  onCreateNew,
  onManage,
  onSelect,
  showCreateCard = true,
}: WorkspaceDirectoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {showCreateCard && <WorkspaceCreateCard onClick={onCreateNew} />}
      {workspaces.map((workspace) => (
        <WorkspaceDirectoryCard
          key={workspace.id}
          workspace={workspace}
          onManage={onManage}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
