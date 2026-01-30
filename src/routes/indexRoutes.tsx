import { Route, Routes } from "react-router-dom"

import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import RegisterAdminForm from "../components/RegisterAdminForm"
import Workspace from "../components/Workspace"
import CreateWorkspaceForm from "../components/workspace/CreateWorkspaceForm"
import WorkspaceAdminView from "../components/workspace/WorkspaceAdminView"

export default function IndexRoutes() {
	return (
		<>
			<Routes>
				<Route path="/auth/register-admin" element={<RegisterAdminForm />} />
				<Route path="/auth/login" element={<LoginForm />} />
				<Route path="/auth/register" element={<RegisterForm />} />

				<Route path="/workspace-create" element={<CreateWorkspaceForm />} />
				<Route
					path="/workspace-dashboard/:workspaceId/admin"
					element={<WorkspaceAdminView />}
				/>
				<Route path="/" element={<Workspace />} />
			</Routes>
		</>
	)
}
