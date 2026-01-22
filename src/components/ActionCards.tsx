import { useEffect, useState } from "react"
import { checkIn, checkOut, getTodaySession } from "../lib/lib"
import type { TodaySession } from "../types/todaySession-type"
import { toast } from "react-toastify"

type Props = {
	onChangeSession: () => void
}

export default function ActionCards({ onChangeSession }: Props) {
	const [loading, setLoading] = useState(false)
	const [session, setSession] = useState<TodaySession | null>(null)

	const handleCheckIn = async () => {
		try {
			setLoading(true)
			await checkIn()
			await fetchSession()
			onChangeSession()
			toast.success("Checked in successfully")
		} catch (error: undefined | any) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleCheckOut = async () => {
		setLoading(true)
		await checkOut()
		await fetchSession()
		onChangeSession()
		setLoading(false)
	}

	const fetchSession = async () => {
		const data = await getTodaySession()
		setSession(data)
	}

	useEffect(() => {
		fetchSession()
	}, [])

	const hasOpenSession = session?.status === "OPEN"

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
