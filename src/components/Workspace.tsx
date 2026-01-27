"use client";

import { useState } from "react";
import { Rocket } from "lucide-react";
import { WorkspaceHeading } from "./workspace/WorkspaceHeading";
import Navbar from "./Nabvar";
import { WorkspaceInput } from "./workspace/WorkspaceInput";
import { WorkspaceLogoUpload } from "./workspace/WorkspaceLogoUpload";
import { WorkspaceButton } from "./workspace/WorkspaceButton";
import { WorkspaceTrustBadges } from "./workspace/WorkspaceTrustBadges";
import { WorkspaceBackground } from "./workspace/WorkspaceBackground";
import { WorkspaceCard } from "./workspace/WorkspaceCard";


export default function CreateWorkspacePage() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="bg-[#f6f7f8]  min-h-screen font-sans">
      <Navbar  />

      <main className="flex flex-col items-center justify-center px-4 py-12 md:py-24">
        <div className="w-full max-w-[640px] flex flex-col gap-8">
          <WorkspaceHeading
            icon={<Rocket className="size-9" />}
            title="Create Your First Workspace"
            description="Set up a dedicated space for your team to manage schedules, tasks, and communication."
          />

          <WorkspaceCard>
            <WorkspaceInput
              label="Workspace Name"
              placeholder="e.g. Acme Corp Operations"
              hint="This is how your team will identify your organization."
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />

            <WorkspaceLogoUpload />

            <div className="pt-4 border-t border-gray-100  flex flex-col gap-4">
              <WorkspaceButton
                onClick={handleCreateWorkspace}
                isLoading={isLoading}
                disabled={!workspaceName.trim()}
              >
                Create Workspace
              </WorkspaceButton>

              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-gray-500  text-sm">
                  Need a hand setting up?
                </span>
                <a
                  className="text-[#137fec] text-sm font-semibold hover:underline"
                  href="#"
                >
                  Check out the guide
                </a>
              </div>
            </div>
          </WorkspaceCard>

          <WorkspaceTrustBadges />
        </div>
      </main>

      <WorkspaceBackground />
    </div>
  );
}
