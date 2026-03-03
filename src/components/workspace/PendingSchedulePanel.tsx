import { toast } from "react-toastify"
import { updateScheduleStatus } from "../../lib/lib"
import type { UserSchedule } from "../../types/userSchedule-type"

type Props = {
	schedules: UserSchedule[]
	workspaceId?: string
	onStatusUpdated: (scheduleId: string, status: "ACCEPTED" | "REJECTED") => void
}

export default function PendingSchedulesPanel({
	schedules,
	workspaceId,
	onStatusUpdated,
}: Props) {
	const handleAction = async (
		scheduleId: string,
		status: "ACCEPTED" | "REJECTED",
	) => {
		if (!workspaceId) return

		await updateScheduleStatus(scheduleId, workspaceId, status)
		if (status === "ACCEPTED") {
			toast.done("¡Solicitud aceptada!")
		}
		if (status === "REJECTED") {
			toast.done("¡Solicitud denegada!")
		}
		onStatusUpdated(scheduleId, status)
	}

	return (
		<section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-5">
			<header className="flex items-center justify-start gap-2 mb-4">
				<h2 className="text-base font-semibold text-amber-800">
					Turnos pendientes
				</h2>
				<span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
					{schedules.length}
				</span>
			</header>

			<div className="flex flex-col gap-3">
				{schedules.map((s) => (
					<div
						key={s.id}
						className="rounded-xl bg-white border border-slate-200 px-4 py-3 flex items-center justify-between gap-4 hover:border-amber-300 transition"
					>
						{/* Info compacta */}
						<div className="flex flex-col">
							<p className="text-sm font-medium text-slate-800">
								{new Date(s.date).toLocaleDateString()}
							</p>

							<p className="text-xs text-slate-500">
								{new Date(s.startTime).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								—{" "}
								{new Date(s.endTime).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						</div>

						<div className="flex items-center gap-2">
							<button
								onClick={() => handleAction(s.id, "REJECTED")}
								className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
							>
								Rechazar
							</button>

							<button
								onClick={() => handleAction(s.id, "ACCEPTED")}
								className="px-3 py-1.5 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
							>
								Aceptar
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
