import { Outlet, useParams } from "react-router-dom"
import WorkspaceSidebar from "../components/workspace/WorkspaceSideBar"

export default function DashboardLayout() {
	const { workspaceId } = useParams()

	return (
		<div className="h-screen grid grid-cols-[240px_1fr] bg-slate-50">
			<WorkspaceSidebar workspaceId={workspaceId!} />
			<main className="p-8 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	)
}
