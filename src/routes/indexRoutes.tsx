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

			{/* 🔥 WORKSPACE (NESTED ROUTES) */}
			<Route path="/workspace/:workspaceId" element={<DashboardLayout />}>
				{/* USER DASHBOARD */}
				<Route index element={<WorkspaceUserView />} />

				{/* ADMIN */}
				<Route
					path="admin"
					element={
						<AdminRoute>
							<WorkspaceAdminView />
						</AdminRoute>
					}
				/>

				{/* HISTORY */}
				<Route path="history" element={<HistoryCalendarPage />} />
			</Route>

			{/* OUTSIDE WORKSPACE */}
			<Route path="/manage-users/:workspaceId" element={<ManageUsersView />} />
			<Route
				path="/manage-workspace/:workspaceId"
				element={<ManageWorkspacePage />}
			/>

			{/* CREATE */}
			<Route path="/workspace-create" element={<CreateWorkspaceForm />} />

			{/* FALLBACK */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}
