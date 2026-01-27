"use client";

export interface WorkspaceTab {
  id: string;
  label: string;
  count?: number;
}

interface WorkspaceTabsProps {
  tabs: WorkspaceTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function WorkspaceTabs({ tabs, activeTab, onTabChange }: WorkspaceTabsProps) {
  return (
    <div className="mb-8">
      <div className="flex border-b border-[#cfd7e7] gap-8">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-2 transition-colors ${
                isActive
                  ? "border-[#135bec] text-[#135bec]"
                  : "border-transparent text-[#4c669a] hover:text-[#135bec]"
              }`}
            >
              <p className="text-sm font-bold tracking-[0.015em]">{tab.label}</p>
              {tab.count !== undefined && (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-[#135bec]/10 text-[#135bec]"
                      : "bg-[#e7ebf3] text-[#4c669a]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
