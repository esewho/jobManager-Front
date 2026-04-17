import { useState } from "react"

type Props = {
	onChangeUsername: (username: string) => void
	onChangePassword: (data: {
		currentPassword: string
		newPassword: string
	}) => void
	loading: boolean
}

export default function SettingsForm({
	onChangeUsername,
	onChangePassword,
	loading,
}: Props) {
	const [username, setUsername] = useState("")
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")

	return (
		<div className="space-y-10">
			{/* USERNAME */}
			<section className="space-y-4">
				<h2 className="text-lg font-semibold text-slate-800">
					Nombre de usuario
				</h2>

				<div className="space-y-3 max-w-lg">
					<input
						type="text"
						placeholder="Nuevo username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
					/>

					<button
						type="button"
						onClick={() => {
							if (!username) return
							onChangeUsername(username)

							setUsername("")
						}}
						disabled={loading}
						className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
					>
						Actualizar nombre
					</button>
				</div>
			</section>

			{/* PASSWORD */}
			<section className="space-y-4 border-t border-slate-200 pt-6">
				<h2 className="text-lg font-semibold text-slate-800">Seguridad</h2>

				<div className="space-y-3 max-w-lg">
					<input
						type="password"
						placeholder="Contraseña actual"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
					/>

					<input
						type="password"
						placeholder="Nueva contraseña"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
					/>

					<button
						type="button"
						onClick={() => {
							if (!currentPassword || !newPassword) return
							onChangePassword({
								currentPassword,
								newPassword,
							})
							setCurrentPassword("")
							setNewPassword("")
						}}
						disabled={loading}
						className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
					>
						Actualizar contraseña
					</button>
				</div>
			</section>
		</div>
	)
}
