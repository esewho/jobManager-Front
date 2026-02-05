import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { checkIn, checkOut, getMySummary, getTodaySession } from "../lib/lib"
import type { TodaySession } from "../types/todaySession-type"
import type { Summary } from "../types/summary-type"

type Props = {
	userId: string
	workspaceId: string | undefined
	hasOpenSession: boolean
	onSessionChange: () => void
}

export default function ActionCards({ workspaceId, onSessionChange }: Props) {
	const [loading, setLoading] = useState(false)
	const [session, setSession] = useState<TodaySession | null>(null)

	useEffect(() => {
		getTodaySession(workspaceId).then(setSession)
	}, [workspaceId])

	const hasOpenSession = session?.status === "OPEN"

	const handleCheckIn = async () => {
		if (loading) return
		try {
			setLoading(true)
			await checkIn(workspaceId)
			const updated = await getTodaySession(workspaceId)
			setSession(updated)
			onSessionChange()
			toast.success("Check-in realizado")
		} catch (e: any) {
			toast.error(e.message)
		} finally {
			setLoading(false)
		}
	}

	const handleCheckOut = async () => {
		if (loading) return
		try {
			setLoading(true)
			await checkOut(workspaceId)
			const updated = await getTodaySession(workspaceId)
			setSession(updated)
			onSessionChange()
			toast.success("Check-out realizado")
		} catch (e: any) {
			toast.error(e.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
			<h2 className="text-lg font-semibold">Acciones</h2>

			{!hasOpenSession ? (
				<button
					onClick={handleCheckIn}
					disabled={loading}
					className="bg-stone-900 text-white py-2 rounded disabled:opacity-50"
				>
					Check-in
				</button>
			) : (
				<button
					onClick={handleCheckOut}
					disabled={loading}
					className="bg-gray-300 text-stone-900 py-2 rounded disabled:opacity-50"
				>
					Check-out
				</button>
			)}
		</div>
	)
}
