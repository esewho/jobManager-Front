import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { toast } from "react-toastify"

export default function LoginForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const { login, isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/", { replace: true })
		}
	}, [isAuthenticated, navigate])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (!username || !password) {
				toast.error("Please fill in all fields")
				return
			}
			const success = await login(username, password)
			if (!success) {
				toast.error("Invalid credentials")
				return
			}
			navigate("/")
		} catch (error) {
			console.error("Login error:", error)
			toast.error("Login failed")
		}
	}
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
			<form
				className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
					className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
				>
					Login
				</button>
				<p className="text-sm text-center text-zinc-500">
					Dont have an account?{" "}
					<a
						className="text-blue-600 font medium hover:underline"
						href="/auth/register"
					>
						Click here
					</a>
				</p>
			</form>
		</div>
	)
}
