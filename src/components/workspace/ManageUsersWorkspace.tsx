import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUsersToManage } from "../../lib/lib"
import type { UsersToManage } from "../../types/usersToManage-type"
import DashboardLayout from "../../layouts/DashboardLayout"
import UserTableToManage from "./UserTableToManage"
import ManageUsersModal from "./ManageUsersModal"

export default function ManageUsersView() {
	const { workspaceId } = useParams()
	const [users, setUsers] = useState<UsersToManage[]>([])
	const [selectedUser, setSelectedUser] = useState<UsersToManage | null>(null)

	useEffect(() => {
		if (!workspaceId) return
		getUsersToManage(workspaceId).then(setUsers)
	}, [workspaceId])

	const refreshUsers = async () => {
		const data = await getUsersToManage(workspaceId)
		setUsers(data)
	}

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<header>
					<h1 className="text-2xl font-bold">Gestionar empleados</h1>
					<p className="text-slate-500 text-sm">
						Administra los usuarios de este workspace
					</p>
				</header>

				<UserTableToManage
					onEditUser={(user) => setSelectedUser(user)}
					users={users}
				/>
				{selectedUser && (
					<ManageUsersModal
						userId={selectedUser.id}
						username={selectedUser.username}
						isActive={selectedUser.active}
						onClose={() => setSelectedUser(null)}
						onStatusChanged={refreshUsers}
					/>
				)}
			</div>
		</DashboardLayout>
	)
}
