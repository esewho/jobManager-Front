import {
	Home,
	Clock,
	Settings,
	Users,
	LucideBuilding,
	LucideLogOut,
} from "lucide-react"
import { NavLink, useParams } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export default function WorkspaceSidebar() {
	const { user, logout } = useAuth()

	const { workspaceId } = useParams()

	const linkClasses = ({ isActive }: { isActive: boolean }) =>
		`flex items-center gap-3 px-3 py-2 rounded-lg transition
	 ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"}`

	return (
		<aside className="bg-slate-900 text-slate-200 flex flex-col p-6">
			{/* LOGO / WORKSPACE */}
			<div className="mb-10">
				<h2 className="text-xl font-bold tracking-tight">Mi Workspace</h2>
				<p className="text-sm text-slate-400">{user?.username}</p>
			</div>

			{/* MENU PRINCIPAL */}
			<nav className="flex flex-col h-full gap-2 ">
				<NavLink to={`/workspace/${workspaceId}`} className={linkClasses}>
					<Home size={18} />
					Inicio
				</NavLink>

				<NavLink
					to={`/workspace/${workspaceId}/history`}
					className={linkClasses}
				>
					<Clock size={18} />
					Historial
				</NavLink>

				{user?.role === "ADMIN" && (
					<>
						<div className="mt-6 mb-2 text-xs uppercase text-slate-500">
							Administración
						</div>

						<NavLink
							to={`/manage-users/${workspaceId}`}
							className={linkClasses}
						>
							<Users size={18} />
							Gestionar empleados
						</NavLink>
						<NavLink
							to={`/manage-workspace/${workspaceId}`}
							className={linkClasses}
						>
							<LucideBuilding size={18} />
							Gestionar workspace
						</NavLink>
					</>
				)}

				<NavLink to="settings" className={linkClasses}>
					<Settings size={18} />
					Ajustes
				</NavLink>
				{user && (
					<NavLink className={linkClasses} onClick={logout} to="/auth/login">
						<LucideLogOut size={18} />
						Cerrar sesión
					</NavLink>
				)}
			</nav>
		</aside>
	)
}
