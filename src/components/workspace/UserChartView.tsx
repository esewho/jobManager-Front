import type { WorkSessionType } from "../../types/workSession-type"

type Props = {
	sessions: WorkSessionType[] | null
}

function getStatusInfo(status: string) {
	switch (status) {
		case "OPEN":
			return {
				label: "Trabajando",
				color: "bg-green-100 text-green-700",
			}

		case "PAUSED":
			return {
				label: "Pausado",
				color: "bg-yellow-100 text-yellow-700",
			}

		case "CLOSED":
			return {
				label: "Finalizado",
				color: "bg-slate-200 text-slate-700",
			}

		default:
			return {
				label: "Desconocido",
				color: "bg-slate-100 text-slate-600",
			}
	}
}

function formatDuration(minutes: number) {
	const h = Math.floor(minutes / 60)
	const m = Math.floor(minutes % 60)

	return `${h}h ${m}m`
}

export default function UserChartView({ sessions }: Props) {
	if (!sessions || sessions.length === 0) {
		return (
			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
				<p className="text-sm text-slate-500">No hay sesiones todavía.</p>
			</div>
		)
	}

	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<table className="w-full table-fixed">
				<thead className="bg-slate-50 border-b border-slate-200">
					<tr>
						<th className="w-[18%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Estado
						</th>

						<th className="w-[18%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-in
						</th>

						<th className="w-[18%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-out
						</th>

						<th className="w-[18%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Pausas
						</th>

						<th className="w-[18%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Tiempo total
						</th>

						<th className="w-[10%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Extra
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-200">
					{sessions.map((s) => {
						const displayStatus = s.checkOut
							? "CLOSED"
							: s.isPaused
								? "PAUSED"
								: "OPEN"

						const statusInfo = getStatusInfo(displayStatus)

						return (
							<tr
								key={s.id}
								className="hover:bg-slate-50 transition-colors h-[68px]"
							>
								{/* STATUS */}
								<td className="px-6 py-4 text-center">
									<span
										className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${statusInfo.color}`}
									>
										{statusInfo.label}
									</span>
								</td>

								{/* CHECK-IN */}
								<td className="px-6 py-4 text-center text-sm text-slate-700 whitespace-nowrap">
									{s.checkIn
										? new Date(s.checkIn).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})
										: "—"}
								</td>

								{/* CHECK-OUT */}
								<td className="px-6 py-4 text-center text-sm text-slate-700 whitespace-nowrap">
									{s.checkOut
										? new Date(s.checkOut).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})
										: "—"}
								</td>

								{/* PAUSES */}
								<td className="px-6 py-4 text-center">
									<span className="inline-flex items-center justify-center min-w-8 h-8 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
										{s.pauseCount ?? 0}
									</span>
								</td>

								{/* TOTAL */}
								<td className="px-6 py-4 text-center font-medium text-slate-900 whitespace-nowrap">
									{formatDuration(s.totalMinutes)}
								</td>

								{/* EXTRA */}
								<td className="px-6 py-4 text-center">
									{s.extraMinutes > 0 ? (
										<span className="inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-700 px-2.5 py-1 text-xs font-semibold whitespace-nowrap">
											+{formatDuration(s.extraMinutes)}
										</span>
									) : (
										<span className="text-slate-400 text-sm">—</span>
									)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
