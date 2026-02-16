import type { UsersToManage } from "../../types/usersToManage-type"

type Props = {
	users: UsersToManage[]
}

export default function UserTableToManage({ users }: Props) {
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
							<td className="px-6 py-4 font-medium text-slate-900">
								{u.username}
							</td>

							<td className="px-6 py-4 text-center">
								<span className="text-sm text-slate-700">{u.role}</span>
							</td>

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

							<td className="px-6 py-4 text-right">
								<button className="text-sm text-blue-600 hover:underline">
									Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
