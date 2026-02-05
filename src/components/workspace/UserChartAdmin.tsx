import { useActiveUsersStore } from "../../store/store"

function getStatusWorkSession(status: string) {
	switch (status) {
		case "OPEN":
			return {
				label: "Trabajando",
				color: "bg-green-100 text-green-700",
			}

		case "CLOSED":
			return {
				label: "Finalizado",
				color: "bg-slate-200 text-slate-700",
			}

		default:
			return {
				label: "No ha fichado",
				color: "bg-slate-100 text-slate-600",
			}
	}
}

export default function UserChartAdmin() {
	const users = useActiveUsersStore((state) => state.users)

	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<table className="w-full border-collapse">
				<thead className="bg-slate-50 border-b border-slate-200">
					<tr>
						<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Usuario
						</th>
						<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Rol
						</th>
						<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Estado
						</th>
						<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-in
						</th>
						<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-out
						</th>

						<th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
							Acciones
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-200">
					{users.flatMap((u) =>
						u.user.session.map((s, idx) => {
							const statusInfo = getStatusWorkSession(s.status)

							return (
								<tr
									key={`${u.user.id}-${idx}`}
									className="hover:bg-slate-50 transition-colors"
								>
									<td className="px-6 py-4">
										<div className="flex flex-col">
											<span className="font-medium text-slate-900">
												{u.user.username}
											</span>
											<span className="text-xs text-slate-500">
												ID: {u.user.id.slice(0, 6)}…
											</span>
										</div>
									</td>

									<td className="px-6 py-4">
										<span className="text-sm font-medium text-slate-700">
											{u.role}
										</span>
									</td>

									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusInfo.color}`}
										>
											{statusInfo.label}
										</span>
									</td>

									<td className="px-6 py-4 text-sm text-slate-700">
										{new Date(s.checkIn).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>

									<td className="px-6 py-4 text-sm text-slate-700">
										{s.checkOut
											? new Date(s.checkOut).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})
											: "—"}
									</td>

									<td className="px-6 py-4 text-right">
										<button className="text-sm font-medium text-primary hover:underline">
											Ver detalle
										</button>
									</td>
								</tr>
							)
						}),
					)}
				</tbody>
			</table>
		</div>
	)
}
