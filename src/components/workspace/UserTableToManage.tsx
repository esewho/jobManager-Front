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
		<>
			{/* Desktop table */}
			<div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
				<table className="w-full">
					<thead className="bg-slate-50 border-b border-slate-200">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Usuario</th>
							<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Rol</th>
							<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Estado</th>
							<th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200">
						{users.map((u) => (
							<tr key={u.id} className="hover:bg-slate-50 transition-colors">
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border-2 border-blue-400 ">
											{u.avatarUrl ? (
												<img src={`${import.meta.env.VITE_API_URL}${u.avatarUrl}`} className="w-full h-full object-cover" />
											) : (
												<div className="w-full h-full flex items-center justify-center text-xs text-slate-400">?</div>
											)}
										</div>
										<span className="font-medium text-slate-900">
											{u.username}
											<p className="text-slate-700/80 text-xs ">{u.email}</p>
										</span>
									</div>
								</td>
								<td className="px-6 py-4 text-center">
									{u.role === "ADMIN" ? (
										<span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-2xl font-semibold inline-flex items-center gap-1.5">
											<AdminIcon size={14} className="fill-purple-700" />
											{u.role.toLowerCase()}
										</span>
									) : (
										<span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold px-2 py-1 rounded-2xl bg-slate-100">
											<UserIcon size={14} className="fill-slate-700" />
											{u.role.toLowerCase()}
										</span>
									)}
								</td>
								<td className="px-6 py-4 text-center">
									<span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${u.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
										{u.active ? "Activo" : "Inactivo"}
									</span>
								</td>
								<td className="px-6 py-4 text-right space-x-4">
									<button onClick={() => onEditUser(u)} className="text-sm text-blue-600 hover:underline"><EditIcon size={24} /></button>
									<button onClick={() => onAssignSchedule(u)} className="text-sm text-indigo-600 hover:underline"><ScheduleIcon size={24} /></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile cards */}
			<div className="md:hidden space-y-3">
				{users.map((u) => (
					<div key={u.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border-2 border-blue-400 shrink-0">
								{u.avatarUrl ? (
									<img src={`${import.meta.env.VITE_API_URL}${u.avatarUrl}`} className="w-full h-full object-cover" />
								) : (
									<div className="w-full h-full flex items-center justify-center text-xs text-slate-400">?</div>
								)}
							</div>
							<div className="min-w-0 flex-1">
								<p className="font-medium text-slate-900 truncate">{u.username}</p>
								<p className="text-slate-500 text-xs truncate">{u.email}</p>
							</div>
							<span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium shrink-0 ${u.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
								{u.active ? "Activo" : "Inactivo"}
							</span>
						</div>
						<div className="flex items-center justify-between">
							{u.role === "ADMIN" ? (
								<span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-2xl font-semibold inline-flex items-center gap-1.5">
									<AdminIcon size={14} className="fill-purple-700" />
									{u.role.toLowerCase()}
								</span>
							) : (
								<span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold px-2 py-1 rounded-2xl bg-slate-100">
									<UserIcon size={14} className="fill-slate-700" />
									{u.role.toLowerCase()}
								</span>
							)}
							<div className="flex gap-3">
								<button onClick={() => onEditUser(u)} className="text-blue-600 hover:underline text-sm font-medium">Editar</button>
								<button onClick={() => onAssignSchedule(u)} className="text-indigo-600 hover:underline text-sm font-medium">Horario</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
