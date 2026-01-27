
import { useState } from "react";
import type { WorkspaceData } from "./workspace/WorkspaceDirectoryCard";
import { WorkspaceTabs, type WorkspaceTab } from "./workspace/WorkspaceTabs";
import { WorkspaceDirectoryHeader } from "./workspace/WorkspaceDirectoryHeader";
import { WorkspacePageHeading } from "./workspace/WorkspacePageHeading";
import { WorkspaceDirectoryGrid } from "./workspace/WorkspaceDirectoryGrid";
import { WorkspaceFooter } from "./workspace/WorkspaceFooter";
import { WorkspaceBackground } from "./workspace/WorkspaceBackground";
import { WorkspaceHeading } from "./workspace/WorkspaceHeading";
import { IconLayers } from "./workspace/icons";
import { WorkspaceCard } from "./workspace/WorkspaceCard";
import { WorkspaceInput } from "./workspace/WorkspaceInput";
import { WorkspaceLogoUpload } from "./workspace/WorkspaceLogoUpload";
import { WorkspaceButton } from "./workspace/WorkspaceButton";
import { WorkspaceTrustBadges } from "./workspace/WorkspaceTrustBadges";


// Mock data
const mockWorkspaces: WorkspaceData[] = [
  {
    id: "1",
    name: "Downtown Office",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXoJDZDfzOAD6hFcBRJnPqPvIH-TXLQNHl5Y7hGEUmBn3T5cBDqRCyHIlIJOmLQfGcHk8kz7A3xLHqIJmVBwVnQQD8lKxJig0g8fJzA_g0qVlKXw7Xk9LrCQ7fQ8GQXQKr",
    workersCount: 45,
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Westside Branch",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZRkSvM9_xjTCsJu0vFJXcXiZP_g7qT2bZh9mJhFJEPXGkKJHPVBdJBYFPJgPLQW8VJdVFqF3JHLV5JNPJ5JNPJgPL",
    workersCount: 28,
    status: "active",
    lastActive: "30 mins ago",
  },
  {
    id: "3",
    name: "North Campus",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sample3",
    workersCount: 12,
    status: "warning",
    lastActive: "1 day ago",
  },
  {
    id: "4",
    name: "South Terminal",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sample4",
    workersCount: 67,
    status: "inactive",
    lastActive: "3 days ago",
  },
];

const tabs: WorkspaceTab[] = [
  { id: "all", label: "All", count: mockWorkspaces.length },
  {
    id: "active",
    label: "Active",
    count: mockWorkspaces.filter((w) => w.status === "active").length,
  },
  {
    id: "archived",
    label: "Archived",
    count: mockWorkspaces.filter((w) => w.status === "inactive").length,
  },
];

export default function WorkspacesPage() {
  const [hasWorkspaces, setHasWorkspaces] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredWorkspaces = mockWorkspaces.filter((w) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return w.status === "active";
    if (activeTab === "archived") return w.status === "inactive";
    return true;
  });

  const handleCreateWorkspace = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasWorkspaces(true);
    }, 1500);
  };

  // Vista de lista de workspaces
  if (hasWorkspaces) {
    return (
      <div className="min-h-screen bg-[#f8fafd] flex flex-col">
        <WorkspaceDirectoryHeader />
        <main className="flex-1 px-6 md:px-10 py-8">
          <WorkspacePageHeading
            title="Workspaces"
            description="Manage and monitor your workforce locations."
            actionLabel="Create New Workspace"
            onAction={() => setHasWorkspaces(false)}
          />
          <WorkspaceTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <WorkspaceDirectoryGrid
            workspaces={filteredWorkspaces}
            onCreateNew={() => setHasWorkspaces(false)}
            onManage={(ws) => alert(`Manage: ${ws.name}`)}
            onSelect={(ws) => alert(`Selected: ${ws.name}`)}
          />
        </main>
        <WorkspaceFooter />
      </div>
    );
  }

  // Vista de crear workspace
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      <WorkspaceBackground />
      <WorkspaceDirectoryHeader />
      <main className="flex flex-1 justify-center py-8 px-4 md:px-10">
        <div className="w-full max-w-lg flex flex-col gap-8">
          <WorkspaceHeading
            icon={<IconLayers className="size-8" />}
            title="Create Your Workspace"
            description="Set up a central hub for your team's projects, communication, and collaboration."
          />
          <WorkspaceCard>
            <WorkspaceInput
              label="Workspace Name"
              placeholder="e.g., Marketing Team"
              hint="This will be visible to all members."
            />
            <WorkspaceLogoUpload />
            <WorkspaceButton isLoading={isLoading} onClick={handleCreateWorkspace}>
              Create Workspace
            </WorkspaceButton>
          </WorkspaceCard>
          <WorkspaceTrustBadges />
        </div>
      </main>
    </div>
  );
}
