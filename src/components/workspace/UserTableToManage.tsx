import type { UsersToManage } from "../../types/usersToManage-type"
import { AdminIcon, EditIcon, ScheduleIcon, UserIcon } from "./icons"

type Props = {
	users: UsersToManage[]
	onEditUser: (user: UsersToManage) => void
	onAssignSchedule: (user: UsersToManage) => void
}

export default function UserTableToManage({
	users,
	onEditUser,
	onAssignSchedule,
}: Props) {
	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<table className="w-full">
				<thead className="bg-slate-50 border-b border-slate-200">
					<tr>
						<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Usuario
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Rol
						</th>
						<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
							Estado
						</th>
						<th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
							Acciones
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-200">
					{users.map((u) => (
						<tr key={u.id} className="hover:bg-slate-50 transition-colors">
							<td className="px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border-2 border-blue-400 ">
										{u.avatarUrl ? (
											<img
												src={`${import.meta.env.VITE_API_URL}${u.avatarUrl}`}
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
												?
											</div>
										)}
									</div>

									<span className="font-medium text-slate-900">
										{u.username}
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
									className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
										u.active
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									{u.active ? "Activo" : "Inactivo"}
								</span>
							</td>

							<td className="px-6 py-4 text-right space-x-4">
								<button
									onClick={() => onEditUser(u)}
									className="text-sm text-blue-600 hover:underline"
								>
									<EditIcon size={24} />
								</button>

								<button
									onClick={() => onAssignSchedule(u)}
									className="text-sm text-indigo-600 hover:underline"
								>
									<ScheduleIcon size={24} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
