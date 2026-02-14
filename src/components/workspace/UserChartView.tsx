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
							Tiempo total
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 w-[150px]">
							Turno
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-200">
					{sessions?.map((s, idx) => {
						const statusStyles =
							s.status === "OPEN"
								? "bg-green-100 text-green-700"
								: s.status === "CLOSED"
									? "bg-slate-200 text-slate-700"
									: "bg-slate-100 text-slate-500"

						const shiftStyles =
							s.shift === "MIDDAY"
								? "bg-blue-100 text-blue-700"
								: s.shift === "NIGHT"
									? "bg-purple-100 text-purple-700"
									: "bg-slate-100 text-slate-500"

						return (
							<tr key={idx} className="hover:bg-slate-50 transition-colors">
								{/* ESTADO */}
								<td className="px-6 py-4 text-center">
									<span
										className={`inline-flex justify-center items-center min-w-[100px] rounded-full px-3 py-1 text-xs font-medium ${statusStyles}`}
									>
										{s.status ?? "—"}
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

								{/* TOTAL */}
								<td className="px-6 py-4 font-medium text-slate-900 text-center">
									{Math.floor(s.totalMinutes / 60)}h {s.totalMinutes % 60}m
								</td>

								{/* TURNO */}
								<td className="px-6 py-4 text-center">
									<span
										className={`inline-flex justify-center items-center min-w-25 rounded-full px-3 py-1 text-xs font-medium ${shiftStyles}`}
									>
										{s.shift ?? "—"}
									</span>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
