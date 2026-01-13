import { Route, Routes } from "react-router-dom"
import Dashboard from "../components/Dashboard"

export default function IndexRoutes() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</>
	)
}
