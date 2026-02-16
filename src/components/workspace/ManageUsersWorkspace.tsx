import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUsersToManage } from "../../lib/lib"
import type { UsersToManage } from "../../types/usersToManage-type"
import DashboardLayout from "../../layouts/DashboardLayout"
import UserTableToManage from "./UserTableToManage"

export default function ManageUsersView() {
	const { workspaceId } = useParams()
	const [users, setUsers] = useState<UsersToManage[]>([])

	useEffect(() => {
		if (!workspaceId) return
		getUsersToManage(workspaceId).then(setUsers)
	}, [workspaceId])

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<header>
					<h1 className="text-2xl font-bold">Gestionar empleados</h1>
					<p className="text-slate-500 text-sm">
						Administra los usuarios de este workspace
					</p>
				</header>

				<UserTableToManage users={users} />
			</div>
		</DashboardLayout>
	)
}
