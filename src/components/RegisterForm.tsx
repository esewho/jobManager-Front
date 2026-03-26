import { useState } from "react"

import { toast } from "react-toastify"
import { useAuth } from "../context/authContext"

type Props = {
	onSwitch: () => void
}

export default function RegisterForm({ onSwitch }: Props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const { register } = useAuth()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!username || !password) {
			toast.error("Fill all fields")
			return
		}

		await register(username, password)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<h2 className="text-xl font-bold text-slate-800">Crear cuenta</h2>

			<input
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
			/>

			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
			/>

			<button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
				Registrar
			</button>

			<p className="text-sm text-center text-slate-500">
				Si eres miembro inicie sesión{" "}
				<span
					onClick={onSwitch}
					className="text-blue-600 cursor-pointer hover:underline"
				>
					Login
				</span>
			</p>
		</form>
	)
}
