import type { WorkspaceUserAdmin } from "../../types/WorkspaceUserAdmin-type"
import { AdminIcon, UserIcon } from "./icons"

type Props = {
	users: WorkspaceUserAdmin
}

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
		case "PAUSED":
			return {
				label: "Pausado",
				color: "bg-yellow-100 text-yellow-700",
			}

		default:
			return {
				label: "No ha fichado",
				color: "bg-slate-100 text-slate-600",
			}
	}
}

export default function UserChartAdmin({ users }: Props) {
	// const users = useActiveUsersStore((state) => state.users)

	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<table className="w-full border-collapse">
				<thead className="bg-slate-50 border-b border-slate-200">
					<tr>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Usuario
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Rol
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Estado
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-in
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-out
						</th>

						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Acciones
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-200 ">
					{users.flatMap((u) =>
						u.user.session.map((s, idx) => {
							const statusInfo = getStatusWorkSession(s.status)

							return (
								<tr
									key={`${u.user.id}-${idx}`}
									className="hover:bg-slate-50 transition-colors"
								>
									<td className="px-6 py-4 text-center">
										<div className="inline-flex items-center justify-center gap-3.5">
											<div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border-2 border-blue-400 ">
												{u.user.avatarUrl ? (
													<img
														src={`${import.meta.env.VITE_API_URL}${u.user.avatarUrl}`}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
														?
													</div>
												)}
											</div>
											<span className="font-medium text-slate-900">
												{u.user.username}
											</span>
										</div>
									</td>

									{u.role === "ADMIN" ? (
										<td className="px-6 py-4 text-center">
											<span className="text-xs  bg-purple-100 text-purple-700 px-2 py-1 rounded-2xl font-semibold inline-flex items-center gap-1.5">
												<AdminIcon size={14} className="fill-purple-700" />
												{u.role.toLowerCase()}
											</span>
										</td>
									) : (
										<td className="px-6 py-4 text-center">
											<span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold px-2 py-1 rounded-2xl bg-slate-100">
												<UserIcon size={14} className="fill-slate-700" />
												{u.role.toLowerCase()}
											</span>
										</td>
									)}

									<td className="px-6 py-4 text-center">
										<span
											className={`inline-flex justify-center items-center rounded-full px-3 py-1 text-xs font-medium ${statusInfo.color}`}
										>
											{statusInfo.label}
										</span>
									</td>

									<td className="px-6 py-4 text-center text-sm text-slate-700">
										{new Date(s.checkIn).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>

									<td className="px-6 py-4 text-center text-sm text-slate-700">
										{s.checkOut
											? new Date(s.checkOut).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})
											: "—"}
									</td>

									<td className="px-6 py-4 text-center">
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
