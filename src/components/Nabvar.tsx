import { useAuth } from "../context/authContext"

export default function Navbar() {
	const { user, logout } = useAuth()
	return (
		<nav className="h-14 bg-white shadow px-6 flex items-center justify-between">
			<h1 className="font-semibold">JobManager</h1>
			<div className="flex items-center gap-4">
				{user?.role === "ADMIN" && (
					<span className="text-sm text-gray-600 font-bold">ADMIN</span>
				)}
				{user?.role === "EMPLOYEE" && (
					<span className="text-sm text-gray-600 font-bold">EMPLOYEE</span>
				)}
				<span className="text-sm text-gray-600 font-bold">
					Bienvenido, {user?.username}
				</span>
				<button
					onClick={logout}
					className="text-sm text-blue-600 hover:underline cursor-pointer"
				>
					Cerrar sesión
				</button>
			</div>
		</nav>
	)
}
