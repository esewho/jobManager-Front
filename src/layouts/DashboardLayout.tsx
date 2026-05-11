import { useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import { Menu } from "lucide-react"
import WorkspaceSidebar from "../components/workspace/WorkspaceSideBar"

export default function DashboardLayout() {
	const { workspaceId } = useParams()
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className="h-screen flex bg-slate-50">
			{/* Desktop sidebar */}
			<div className="hidden lg:block w-[240px] shrink-0">
				<WorkspaceSidebar workspaceId={workspaceId!} />
			</div>

			{/* Mobile drawer */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}
			<div
				className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out lg:hidden ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<WorkspaceSidebar
					workspaceId={workspaceId!}
					onClose={() => setSidebarOpen(false)}
				/>
			</div>

			{/* Main content */}
			<main className="flex-1 overflow-y-auto min-w-0">
				<div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 lg:hidden">
					<button
						onClick={() => setSidebarOpen(true)}
						className="p-2 rounded-lg hover:bg-slate-100 transition"
					>
						<Menu size={24} />
					</button>
					<h1 className="font-semibold text-slate-900">JobManager</h1>
				</div>
				<div className="p-4 md:p-8">
					<Outlet />
				</div>
			</main>
		</div>
	)
}
