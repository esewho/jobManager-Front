import type { JSX } from "react"
import { useAuth } from "../context/authContext"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }: { children: JSX.Element }) {
	const { user, isLoading } = useAuth()

	if (isLoading) return <div>cargando...</div>

	if (!user) {
		return <Navigate to="/auth" replace />
	}

	return children
}
