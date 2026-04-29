import type { WorkspaceUserAdmin } from "../../types/WorkspaceUserAdmin-type"
import { AdminIcon, UserIcon } from "./icons"

type Props = {
	users: WorkspaceUserAdmin
	onViewDetail?: (userId: string) => void
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

export default function UserChartAdmin({ users, onViewDetail }: Props) {
	// const users = useActiveUsersStore((state) => state.users)

	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<table className="w-full table-fixed">
				<thead className="bg-slate-50 border-b border-slate-200">
					<tr>
						<th className="w-[30%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Usuario
						</th>
						<th className="w-[15%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Rol
						</th>
						<th className="w-[15%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Estado
						</th>
						<th className="w-[15%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-in
						</th>
						<th className="w-[15%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Check-out
						</th>
						<th className="w-[10%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
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
									className="hover:bg-slate-50 transition-colors h-[64px]"
								>
									{/* USER */}
									<td className="px-6 py-4">
										<div className="flex items-center gap-3 min-w-0">
											<div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border-2 border-blue-400 shrink-0">
												{u.user.avatarUrl ? (
													<img
														src={`${import.meta.env.VITE_API_URL}${u.user.avatarUrl}`}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="flex items-center justify-center h-full text-xs text-slate-400">
														{u.user.username.charAt(0).toUpperCase()}
													</div>
												)}
											</div>

											<span className="font-medium text-slate-900 truncate">
												{u.user.username}
												<p className="text-slate-700/80 text-xs ">
													{u.user.email}
												</p>
											</span>
										</div>
									</td>

									{/* ROLE */}
									<td className="px-6 py-4 text-center">
										<span
											className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-2xl text-xs font-semibold whitespace-nowrap ${
												u.role === "ADMIN"
													? "bg-purple-100 text-purple-700"
													: "bg-slate-100 text-slate-700"
											}`}
										>
											{u.role === "ADMIN" ? (
												<AdminIcon size={14} />
											) : (
												<UserIcon size={14} />
											)}
											{u.role.toLowerCase()}
										</span>
									</td>

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
										{new Date(s.checkIn).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
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

									{/* ACTION */}
									<td className="px-6 py-4 text-center">
										<button
											onClick={() => onViewDetail(u.user.id)}
											className="text-sm font-medium text-blue-600 hover:underline whitespace-nowrap"
										>
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
