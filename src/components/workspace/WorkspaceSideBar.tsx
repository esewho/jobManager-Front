import {
	Home,
	Clock,
	Settings,
	Users,
	LucideBuilding,
	LucideLogOut,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export default function WorkspaceSidebar() {
	const { user, logout } = useAuth()

	return (
		<aside className="bg-slate-900 text-slate-200 flex flex-col p-6">
			{/* LOGO / WORKSPACE */}
			<div className="mb-10">
				<h2 className="text-xl font-bold tracking-tight">Mi Workspace</h2>
				<p className="text-sm text-slate-400">{user?.username}</p>
			</div>

			{/* MENU PRINCIPAL */}
			<nav className="flex flex-col h-full gap-2 ">
				<NavLink
					to="."
					className={({ isActive }) =>
						`flex items-center gap-3 px-3 py-2 rounded-lg transition 
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`
					}
				>
					<Home size={18} />
					Inicio
				</NavLink>

				<NavLink
					to="history"
					className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800"
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
							to="manage-users"
							className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800"
						>
							<Users size={18} />
							Gestionar empleados
						</NavLink>
						<NavLink
							to="manage-workspace"
							className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800"
						>
							<LucideBuilding size={18} />
							Gestionar workspace
						</NavLink>
					</>
				)}

				<NavLink
					to="settings"
					className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 mt-6"
				>
					<Settings size={18} />
					Ajustes
				</NavLink>
				{user && (
					<NavLink
						className=" flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 mt-auto"
						onClick={logout}
						to="/auth/login"
					>
						<LucideLogOut size={18} />
						Cerrar sesión
					</NavLink>
				)}
			</nav>
		</aside>
	)
}
