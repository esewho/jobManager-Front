import { Navigate, Route, Routes } from "react-router-dom"

import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import RegisterAdminForm from "../components/RegisterAdminForm"
import CreateWorkspaceForm from "../components/workspace/CreateWorkspaceForm"
import WorkspaceAdminView from "../components/workspace/WorkspaceAdminView"
import WorkspaceUserView from "../components/workspace/WorkspaceUserView"
import WorkspaceSelector from "../components/WorkspaceSelector"
import ManageUsersView from "../components/workspace/ManageUsersView"
import ManageWorkspacePage from "../components/workspace/ManageWorkspacePage"
import HistoryCalendarPage from "../components/workspace/HistoryCalendar/HistoryCalendarPage"

import { useAuth } from "../context/authContext"
import type { JSX } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

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
			<Route path="/" element={<WorkspaceSelector />} />

			<Route path="/workspace/:workspaceId" element={<DashboardLayout />}>
				<Route index element={<WorkspaceUserView />} />

				<Route
					path="admin"
					element={
						<AdminRoute>
							<WorkspaceAdminView />
						</AdminRoute>
					}
				/>

				<Route path="manage-users" element={<ManageUsersView />} />
				<Route path="manage-workspace" element={<ManageWorkspacePage />} />

				<Route path="history" element={<HistoryCalendarPage />} />
			</Route>

			{/* CREATE */}
			<Route path="/workspace-create" element={<CreateWorkspaceForm />} />

			{/* FALLBACK */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}
