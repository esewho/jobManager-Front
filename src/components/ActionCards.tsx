import { toast } from "react-toastify"
import { checkIn, checkOut, getAllWorkspaceUsers } from "../lib/lib"
import { useActiveUsersStore } from "../store/store"
import { useState } from "react"

type Props = {
	userId: string
	workspaceId: string
	onChangeSession: () => void
}

export default function ActionCards({
	userId,
	workspaceId,
	onChangeSession,
}: Props) {
	const [loading, setLoading] = useState(false)

	const { users, setUsers } = useActiveUsersStore()

	const user = users.find((u) => u.user.id === userId)

	const hasOpenSession =
		user?.user.session?.some((s) => s.status === "OPEN") ?? false

	const refreshUsers = async () => {
		const data = await getAllWorkspaceUsers(workspaceId)
		setUsers(data)
	}

	const handleCheckIn = async () => {
		try {
			setLoading(true)
			await checkIn(workspaceId)

			await refreshUsers()
			toast.success("Checked in successfully")
		} catch (e: any) {
			toast.error(e.message)
		} finally {
			setLoading(false)
		}
	}

	const handleCheckOut = async () => {
		try {
			setLoading(true)
			await checkOut(workspaceId)
			await refreshUsers()
			toast.success("Checked out successfully")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
			<h2 className="text-lg font-semibold">Acciones</h2>

			{!hasOpenSession && (
				<button
					onClick={handleCheckIn}
					disabled={loading}
					className="bg-stone-900 text-white py-2 rounded"
				>
					Check-in
				</button>
			)}

			{hasOpenSession && (
				<button
					onClick={handleCheckOut}
					disabled={loading}
					className="bg-gray-300 text-stone-900 py-2 rounded"
				>
					Check-out
				</button>
			)}
		</div>
	)
}
