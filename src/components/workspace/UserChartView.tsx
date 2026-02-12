import type { TodaySession } from "../../types/todaySession-type"

type Props = {
	session: TodaySession | null
}

export default function UserChartView({ session }: Props) {
	if (!session) return null

	return (
		<div className="rounded-xl border bg-white p-6 shadow-sm">
			<h2 className="mb-4 text-lg font-semibold">Tu sesión de hoy</h2>

			<table className="w-full text-sm">
				<thead>
					<tr className="text-left text-slate-500">
						<th>Estado</th>
						<th>Check-in</th>
						<th>Check-out</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-t">
						<td>{session.status ?? "—"}</td>
						<td>
							{session.checkIn
								? new Date(session.checkIn).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})
								: "—"}
						</td>
						<td>
							{session.checkOut
								? new Date(session.checkOut).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})
								: "—"}
						</td>
						<td>{Math.floor(session.totalMinutes / 60)}h</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
