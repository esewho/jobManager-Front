import { useEffect, useState } from "react"

type Props = {
	onChangeUsername: (username: string) => void
	onChangePassword: (data: {
		currentPassword: string
		newPassword: string
	}) => void
	onChangeAvatar: (file: File) => void
	loading: boolean
	avatarUrl: string | null
}

export default function SettingsForm({
	onChangeUsername,
	onChangePassword,
	onChangeAvatar,
	loading,
	avatarUrl,
}: Props) {
	const [username, setUsername] = useState("")
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [avatar, setAvatar] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)

	useEffect(() => {
		if (avatarUrl) {
			setPreview(`${import.meta.env.VITE_API_URL}${avatarUrl}`)
		}
	}, [avatarUrl])

	const handleAvatarChange = (file: File | null) => {
		if (!file) return

		setAvatar(file)

		const url = URL.createObjectURL(file)
		setPreview(url)
	}

	return (
		<div className="space-y-10">
			<section className="space-y-4">
				<h2 className="text-lg font-semibold text-slate-800">
					Imagen de perfil
				</h2>

				<div className="flex items-center gap-6">
					<div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 border">
						{preview ? (
							<img src={preview} className="w-full h-full object-cover" />
						) : (
							<div className="flex items-center justify-center h-full text-xs text-slate-400">
								Sin imagen
							</div>
						)}
					</div>

					<div className="space-y-2">
						<input
							type="file"
							accept="image/*"
							onChange={(e) => handleAvatarChange(e.target.files?.[0] ?? null)}
							className="text-sm file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-slate-900 file:text-white hover:file:bg-slate-700"
						/>

						<button
							type="button"
							disabled={!avatar || loading}
							onClick={() => {
								if (!avatar) return
								onChangeAvatar(avatar)
							}}
							className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
						>
							Subir imagen
						</button>
					</div>
				</div>
			</section>

			<section className="space-y-4 border-t border-slate-200 pt-6">
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
