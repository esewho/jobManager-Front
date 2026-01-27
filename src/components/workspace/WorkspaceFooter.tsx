interface WorkspaceFooterProps {
  version?: string;
}

export function WorkspaceFooter({ version = "2.4.0" }: WorkspaceFooterProps) {
  return (
    <footer className="mt-auto px-6 md:px-10 py-6 border-t border-[#e7ebf3]  text-center">
      <p className="text-[#4c669a]  text-xs">
        Admin Workspace Management Platform &bull; v{version}
      </p>
    </footer>
  );
}
