import { useState } from "react"
import { createSchedule } from "../../lib/lib"
import { toast } from "react-toastify"
import type { UsersToManage } from "../../types/usersToManage-type"

type Props = {
	user: UsersToManage
	workspaceId?: string
	onClose: () => void
	onRefreshSchedules: () => void
}

export default function AssignSchedulePanel({
	user,
	workspaceId,
	onClose,
	onRefreshSchedules,
}: Props) {
	const [date, setDate] = useState("")
	const [startTime, setStartTime] = useState("")
	const [endTime, setEndTime] = useState("")
	const [loading, setLoading] = useState(false)

	const handleCreate = async () => {
		if (!workspaceId) return

		try {
			setLoading(true)
			await createSchedule(workspaceId, {
				userId: user.id,
				date,
				startTime,
				endTime,
			})
			toast.success(`Horario enviado a ${user.username}`)
			onRefreshSchedules()
			onClose()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm animate-fadeIn">
			{/* Header */}
			<div className="flex items-start justify-between mb-6">
				<div className="flex items-center gap-3">
					<div className="h-11 w-11 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
						{user.username.charAt(0).toUpperCase()}
					</div>

					<div>
						<h2 className="text-lg font-semibold text-slate-800">
							Asignar horario
						</h2>
						<p className="text-sm text-slate-500">{user.username}</p>
					</div>
				</div>

				<button
					onClick={onClose}
					className="text-slate-400 hover:text-slate-600 transition"
				>
					✕
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
				<div className="flex flex-col gap-1">
					<label className="text-xs font-medium text-slate-500">Fecha</label>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-xs font-medium text-slate-500">
						Hora inicio
					</label>
					<input
						type="time"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-xs font-medium text-slate-500">Hora fin</label>
					<input
						type="time"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
					/>
				</div>
			</div>

			<div className="mt-8 flex justify-end gap-3">
				<button
					onClick={onClose}
					className="px-5 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
				>
					Cancelar
				</button>

				<button
					onClick={handleCreate}
					disabled={loading}
					className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
				>
					{loading ? "Asignando..." : "Asignar turno"}
				</button>
			</div>
		</div>
	)
}
