import { Shield, Users, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface TrustBadge {
  icon: ReactNode;
  text: string;
}

interface WorkspaceTrustBadgesProps {
  badges?: TrustBadge[];
}

const defaultBadges: TrustBadge[] = [
  {
    icon: <Shield className="size-6" />,
    text: "Enterprise-grade security",
  },
  {
    icon: <Users className="size-6" />,
    text: "Unlimited members",
  },
  {
    icon: <RefreshCw className="size-6" />,
    text: "Real-time collaboration",
  },
];

export function WorkspaceTrustBadges({
  badges = defaultBadges,
}: WorkspaceTrustBadgesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-4">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="text-[#137fec]/60">{badge.icon}</div>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-tight">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
}
