import { useState } from "react"
import { setActiveOrDeactivateUser } from "../../lib/lib"
import { toast } from "react-toastify"

type Props = {
	userId: string
	username: string
	isActive: boolean
	onClose: () => void
	onStatusChanged: () => void
}

export default function ManageUsersModal({
	userId,
	username,
	isActive,
	onClose,
	onStatusChanged,
}: Props) {
	const [loading, setLoading] = useState(false)

	const handleToggle = async () => {
		try {
			setLoading(true)
			await setActiveOrDeactivateUser(userId, isActive)
			onStatusChanged()
			onClose()
		} catch (e) {
			toast.error(e.message || "Failed to set user")
		}
	}
	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
			<div className="bg-white p-6 rounded-xl w-100">
				<h2 className="text-lg font-bold mb-4">Gestionar usuario</h2>

				<p className="mb-4">
					Usuario: <strong>{username}</strong>
				</p>

				<button
					onClick={handleToggle}
					disabled={loading}
					className={`px-4 py-2 rounded text-white ${
						isActive ? "bg-red-500" : "bg-green-600"
					}`}
				>
					{isActive ? "Desactivar cuenta" : "Activar cuenta"}
				</button>

				<button onClick={onClose} className="ml-4 px-4 py-2 rounded border">
					Cancelar
				</button>
			</div>
		</div>
	)
}
