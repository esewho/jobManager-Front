import { useAuth } from "../context/authContext"

export default function Navbar() {
	const { user, logout } = useAuth()
	return (
		<nav className="h-14 bg-neutral-200 shadow px-4 md:px-6 flex items-center justify-center">
			<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-2">
				{user?.role === "ADMIN" && (
					<span className="text-xs md:text-sm text-gray-600 font-bold">
						ADMIN
					</span>
				)}
				{user?.role === "EMPLOYEE" && (
					<span className="text-xs md:text-sm text-gray-600 font-bold">
						EMPLOYEE
					</span>
				)}
				<span className="text-xs md:text-sm text-gray-600 font-bold text-center">
					Bienvenido, {user?.username}
				</span>
				<button
					onClick={logout}
					className="text-xs md:text-sm text-blue-600 hover:underline cursor-pointer whitespace-nowrap"
				>
					Cerrar sesión
				</button>
			</div>
		</nav>
	)
}
