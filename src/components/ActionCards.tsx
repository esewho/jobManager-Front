import { useEffect, useState } from "react"
import {
	checkIn,
	checkOut,
	getAllWorkspaceUsers,
	getTodaySession,
} from "../lib/lib"
import type { TodaySession } from "../types/todaySession-type"
import { toast } from "react-toastify"
import { useActiveUsersStore } from "../store/store"

type Props = {
	onChangeSession: () => void
	workspaceId?: string
	userId: string
}

export default function ActionCards({
	onChangeSession,
	workspaceId,
	userId,
}: Props) {
	const [loading, setLoading] = useState(false)
	// const [session, setSession] = useState<TodaySession | null>(null)

	const users = useActiveUsersStore((state) => state.users)

	const { updateUserSession, setUsers } = useActiveUsersStore()

	const mySession = users.find((u) => u.user.id === userId)?.user.session?.[0]

	const hasOpenSession = mySession?.status === "OPEN"

	const handleCheckIn = async () => {
		try {
			setLoading(true)

			const session = await checkIn(workspaceId)

			updateUserSession(userId, session)

			onChangeSession()
			toast.success("Checked in successfully")
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleCheckOut = async () => {
		try {
			setLoading(true)

			const session = await checkOut(workspaceId)

			updateUserSession(userId, session)

			onChangeSession()
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
					className="bg-stone-900 text-white py-2 rounded cursor-pointer "
				>
					Check-in
				</button>
			)}

			{hasOpenSession && (
				<button
					onClick={handleCheckOut}
					disabled={loading}
					className="bg-gray-300 text-stone-900 py-2 rounded cursor-pointer"
				>
					Check-out
				</button>
			)}
		</div>
	)
}
