import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { checkIn, checkOut, getTodaySession } from "../lib/lib"
import type { TodaySession } from "../types/todaySession-type"

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
			onSessionChange()
			const updated = await getTodaySession(workspaceId)
			setSession(updated)
			toast.success("Check-out realizado")
		} catch (e: any) {
			toast.error(e.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-6 justify-between h-full">
			<h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
				Acciones
			</h2>

			{!hasOpenSession ? (
				<button
					onClick={handleCheckIn}
					disabled={loading}
					className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
				>
					Check-in
				</button>
			) : (
				<button
					onClick={handleCheckOut}
					disabled={loading}
					className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
				>
					Check-out
				</button>
			)}
		</div>
	)
}
