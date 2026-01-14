import { Route, Routes } from "react-router-dom"
import Dashboard from "../components/Dashboard"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

export default function IndexRoutes() {
	return (
		<>
			<Routes>
				<Route path="/auth/login" element={<LoginForm />} />
				<Route path="/auth/register" element={<RegisterForm />} />

				<Route path="/" element={<Dashboard />} />
			</Routes>
		</>
	)
}
