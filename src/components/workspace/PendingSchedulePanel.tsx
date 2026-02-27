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
		<section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
			<header className="mb-5">
				<h2 className="text-lg font-semibold text-amber-800">
					Turnos pendientes
				</h2>
				<p className="text-sm text-amber-700">
					Tienes {schedules.length} turno(s) por confirmar
				</p>
			</header>

			<div className="space-y-4">
				{schedules.map((s) => (
					<div
						key={s.id}
						className="rounded-xl bg-white border border-amber-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
					>
						<div>
							<p className="font-medium text-slate-800">
								{new Date(s.date).toLocaleDateString()}
							</p>

							<p className="text-sm text-slate-600">
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

						<div className="flex gap-2">
							<button
								onClick={() => handleAction(s.id, "REJECTED")}
								className="px-4 py-2 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
							>
								Rechazar
							</button>

							<button
								onClick={() => handleAction(s.id, "ACCEPTED")}
								className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
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
