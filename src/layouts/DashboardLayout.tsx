import WorkspaceSidebar from "../components/workspace/WorkspaceSideBar"

type Props = {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
	return (
		<div className="h-screen	 max-w-screen grid grid-cols-[240px_1fr] bg-slate-50 ">
			<WorkspaceSidebar />

			<main className="p-8 overflow-y-auto">{children}</main>
		</div>
	)
}
