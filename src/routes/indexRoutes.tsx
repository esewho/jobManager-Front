import { Navigate, Route, Routes } from "react-router-dom"

import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import RegisterAdminForm from "../components/RegisterAdminForm"
import WorkspaceAdmin from "../components/WorkspaceAdmin"
import CreateWorkspaceForm from "../components/workspace/CreateWorkspaceForm"
import WorkspaceAdminView from "../components/workspace/WorkspaceAdminView"
import { useAuth } from "../context/authContext"
import type { JSX } from "react"
import WorkspaceDashboard from "../components/workspace/WorkspaceDashboard"
import { ClipLoader } from "react-spinners"
import { getWorkspaceById } from "../lib/lib"
import WorkspaceUserView from "../components/workspace/WorkspaceUserView"
import ManageUsersWorkspace from "../components/workspace/ManageUsersWorkspace"

function AdminRoute({ children }: { children: JSX.Element }) {
	const { user, isLoading } = useAuth()

	if (isLoading) return <div>cargando...</div>

	if (user?.role !== "ADMIN") {
		return <Navigate to="/" replace />
	}
	return children
}

export default function IndexRoutes() {
	return (
		<Routes>
			{/* AUTH */}
			<Route path="/auth/login" element={<LoginForm />} />
			<Route path="/auth/register" element={<RegisterForm />} />
			<Route path="/auth/register-admin" element={<RegisterAdminForm />} />

			{/* ROOT */}
			<Route path="/" element={<WorkspaceAdmin />} />

			{/* WORKSPACE */}
			<Route path="/workspace/:workspaceId" element={<WorkspaceUserView />} />

			<Route
				path="/workspace/:workspaceId/admin"
				element={
					<AdminRoute>
						<WorkspaceAdminView />
					</AdminRoute>
				}
			/>

			<Route
				path="/manage-users/:workspaceId"
				element={<ManageUsersWorkspace />}
			/>

			{/* CREATE */}
			<Route path="/workspace-create" element={<CreateWorkspaceForm />} />

			{/* FALLBACK */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}
