import { useState } from "react"
import { changeUserName, changeUserPassword } from "../../../lib/lib"
import { toast } from "react-toastify"
import UserSettingsForm from "./UserSettingsForm"

export default function UserSettingsPage() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleChangeUsername = async (username: string) => {
		try {
			setLoading(true)
			setError("")
			setSuccess("")

			await changeUserName(username)
			toast.success("Nombre actualizado")
		} catch (error: any) {
			setError(error.message)
			toast.error("No se ha podido actualizar el nombre")
		} finally {
			setLoading(false)
		}
	}

	const handleChangePassword = async (data: {
		currentPassword: string
		newPassword: string
	}) => {
		try {
			setLoading(true)
			setError("")
			await changeUserPassword(data.currentPassword, data.newPassword)
			toast.success("Contraseña actualizada")
		} catch (error: any) {
			setError(error.message)
			toast.error("No se ha podido actualizar la contraseña")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="w-full flex justify-center">
			<div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-sm p-10 space-y-10">
				<header className="space-y-2 border-b border-slate-200 pb-6">
					<h1 className="text-2xl font-semibold text-slate-900">
						Configuración de cuenta
					</h1>

					<p className="text-sm text-slate-500">
						Gestiona tu nombre de usuario y contraseña.
					</p>
				</header>

				<UserSettingsForm
					onChangeUsername={handleChangeUsername}
					onChangePassword={handleChangePassword}
					loading={loading}
				/>
				{error && (
					<div className="mt-4 bg-red-900 text-white p-3 rounded-lg text-sm">
						{error}
					</div>
				)}

				{success && (
					<div className="mt-4 bg-green-700 text-white p-3 rounded-lg text-sm">
						{success}
					</div>
				)}
			</div>
		</div>
	)
}
