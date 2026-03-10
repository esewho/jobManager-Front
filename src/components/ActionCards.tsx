import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
	checkIn,
	checkOut,
	getTodaySession,
	pauseWorkSession,
} from "../lib/lib"
import type { TodaySession } from "../types/todaySession-type"
import {
	ArrowCheckIn,
	CheckOutIcon,
	PauseIcon,
	ResumeIcon,
} from "./workspace/icons"

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

	const handlePause = async () => {
		if (loading) return

		try {
			setLoading(true)

			const wasPaused = session?.isPaused

			await pauseWorkSession(workspaceId)
			// setSession((prev) => ({ ...prev, isPaused: !prev?.isPaused }))
			setSession((prev) =>
				prev ? { ...prev, isPaused: !prev.isPaused } : prev,
			)
			const updated = await getTodaySession(workspaceId)
			setSession(updated)

			onSessionChange()

			if (wasPaused) {
				toast.info("Trabajo reanudado")
			} else {
				toast.warn("Tiempo pausado")
			}
		} catch (error: any) {
			toast.error(error.message)
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
	const isWorking = !!session?.checkIn && !session?.checkOut
	const isPaused = Boolean(session?.isPaused)

	return (
		<div className="flex flex-col gap-6 justify-between h-full">
			<h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
				Acciones
			</h2>

			{session?.checkIn && (
				<p className="text-sm text-slate-600">
					Has hecho check-in a las{" "}
					<span className="font-semibold text-slate-900">
						{new Date(session.checkIn).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</p>
			)}

			<div className="flex justify-center items-center gap-10">
				<button
					onClick={handleCheckIn}
					disabled={isWorking || loading}
					title="Comenzar"
					className={`flex items-center justify-center w-14 h-14 rounded-xl transition
        ${
					isWorking
						? "bg-slate-200 text-slate-400 cursor-not-allowed"
						: "bg-green-600 hover:bg-green-700 text-white"
				}
      `}
				>
					<ArrowCheckIn size={20} />
				</button>

				<button
					onClick={handlePause}
					disabled={!isWorking || loading}
					title={isPaused ? "Reanudar" : "Pausar"}
					className={`flex items-center justify-center w-14 h-14 rounded-xl transition
	${
		!isWorking
			? "bg-slate-200 text-slate-400 cursor-not-allowed"
			: isPaused
				? "bg-blue-500 hover:bg-blue-600 text-white"
				: "bg-yellow-500 hover:bg-yellow-600 text-white"
	}`}
				>
					{isPaused ? <ResumeIcon size={22} /> : <PauseIcon size={22} />}
				</button>

				<button
					title="Finalizar"
					onClick={handleCheckOut}
					disabled={!isWorking || loading}
					className={`flex items-center justify-center w-14 h-14 rounded-xl transition
        ${
					!isWorking
						? "bg-slate-200 text-slate-400 cursor-not-allowed"
						: "bg-red-500 hover:bg-red-600 text-white"
				}
      `}
				>
					<CheckOutIcon size={22} />
				</button>
			</div>
		</div>
	)
}
