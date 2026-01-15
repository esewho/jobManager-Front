import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../context/authContext"
import { toast } from "react-toastify"

export default function RegisterAdminForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const { registerAdmin } = useAuth()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (!username || !password) {
				toast.error("Please fill in all fields")
				return
			}
			await registerAdmin(username, password)
			navigate("/")
		} catch (error) {
			console.error("Registration error:", error)
			toast.error("Admin registration failed")
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
			<form
				className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl font-bold text-center mb-6">Register Admin</h2>
				<div>
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
				>
					Register as Admin
				</button>
			</form>
		</div>
	)
}
