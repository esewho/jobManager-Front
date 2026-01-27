import { Route, Routes } from "react-router-dom"
import Dashboard from "../components/Dashboard"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import RegisterAdminForm from "../components/RegisterAdminForm"
import Workspace from "../components/Workspace"

export default function IndexRoutes() {
	return (
		<>
			<Routes>
				<Route path="/auth/register-admin" element={<RegisterAdminForm />} />
				<Route path="/auth/login" element={<LoginForm />} />
				<Route path="/auth/register" element={<RegisterForm />} />
				<Route path="/workspace" element={<Workspace />} />

				<Route path="/" element={<Dashboard />} />
			</Routes>
		</>
	)
}
