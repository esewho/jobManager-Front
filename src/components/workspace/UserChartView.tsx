import type { WorkSessionType } from "../../types/workSession-type"

type Props = {
	sessions: WorkSessionType[] | null
}

export default function UserChartView({ sessions }: Props) {
	if (!sessions || sessions.length === 0) {
		return (
			<div className="rounded-xl border bg-white p-6 shadow-sm">
				<p className="text-slate-500 text-sm">No hay sesiones todavía.</p>
			</div>
		)
	}

	console.log(sessions)

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<table className="w-full border-collapse text-sm">
				<thead className="bg-slate-50 border-b border-slate-200">
					<tr>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 w-[150px]">
							Estado
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-in
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-out
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Pausas
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 w-[150px]">
							Tiempo total
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-200">
					{sessions?.map((s, idx) => {
						const displayStatus = s.checkOut
							? "CLOSED"
							: s.isPaused
								? "PAUSED"
								: "OPEN"
						const statusStyles =
							displayStatus === "OPEN"
								? "bg-green-100 text-green-700"
								: displayStatus === "PAUSED"
									? "bg-yellow-100 text-yellow-700"
									: "bg-slate-200 text-slate-700"

						return (
							<tr key={idx} className="hover:bg-slate-50 transition-colors">
								{/* ESTADO */}
								<td className="px-6 py-4 text-center">
									<span
										className={`inline-flex justify-center items-center min-w-25 rounded-full px-3 py-1 text-xs font-medium ${statusStyles}`}
									>
										{displayStatus}
									</span>
								</td>

								{/* CHECK IN */}
								<td className="px-6 py-4 text-slate-700 text-center">
									{s.checkIn
										? new Date(s.checkIn).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})
										: "—"}
								</td>

								{/* CHECK OUT */}
								<td className="px-6 py-4 text-slate-700 text-center">
									{s.checkOut
										? new Date(s.checkOut).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})
										: "—"}
								</td>
								{/* TURNO */}
								<td className="px-6 py-4 text-center">
									<span className="">{s.pauseCount ?? "—"}</span>
								</td>

								{/* TOTAL */}
								<td className="px-6 py-4 font-medium text-slate-900 text-center">
									{Math.floor(s.totalMinutes / 60)}h {s.totalMinutes % 60}m
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
