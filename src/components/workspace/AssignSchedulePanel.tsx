import { useState } from "react"
import type { UserSchedule } from "../../types/userSchedule-type"
import { createSchedule, getAllSchedulesOfWorkspace } from "../../lib/lib"
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
		<div className="mt-6 rounded-xl border bg-white p-6 shadow-sm animate-fadeIn">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-bold">Asignar horario a {user.username}</h2>

				<button onClick={onClose} className="text-slate-500">
					✕
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className="border rounded-lg px-3 py-2"
				/>

				<input
					type="time"
					value={startTime}
					onChange={(e) => setStartTime(e.target.value)}
					className="border rounded-lg px-3 py-2"
				/>

				<input
					type="time"
					value={endTime}
					onChange={(e) => setEndTime(e.target.value)}
					className="border rounded-lg px-3 py-2"
				/>
			</div>

			<div className="mt-6 flex justify-end gap-3">
				<button onClick={onClose} className="px-4 py-2 border rounded-lg">
					Cancelar
				</button>

				<button
					onClick={handleCreate}
					disabled={loading}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg"
				>
					Asignar
				</button>
			</div>
		</div>
	)
}
