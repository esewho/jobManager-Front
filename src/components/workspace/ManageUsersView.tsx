import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUsersToManage } from "../../lib/lib"
import type { UsersToManage } from "../../types/usersToManage-type"
import DashboardLayout from "../../layouts/DashboardLayout"
import UserTableToManage from "./UserTableToManage"
import ManageUsersModal from "./ManageUsersModal"
import AssignSchedulePanel from "./AssignSchedulePanel"

export default function ManageUsersView() {
	const { workspaceId } = useParams()

	const [users, setUsers] = useState<UsersToManage[]>([])
	const [userToEdit, setUserToEdit] = useState<UsersToManage | null>(null)
	const [userToAssignSchedule, setUserToAssignSchedule] =
		useState<UsersToManage | null>(null)

	useEffect(() => {
		if (!workspaceId) return
		getUsersToManage(workspaceId).then(setUsers)
	}, [workspaceId])

	const refreshUsers = async () => {
		if (!workspaceId) return
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
					users={users}
					onEditUser={setUserToEdit}
					onAssignSchedule={setUserToAssignSchedule}
				/>

				{userToEdit && (
					<ManageUsersModal
						userId={userToEdit.id}
						username={userToEdit.username}
						isActive={userToEdit.active}
						onClose={() => setUserToEdit(null)}
						onStatusChanged={refreshUsers}
					/>
				)}

				{userToAssignSchedule && (
					<AssignSchedulePanel
						user={userToAssignSchedule}
						workspaceId={workspaceId}
						onClose={() => setUserToAssignSchedule(null)}
					/>
				)}
			</div>
		</DashboardLayout>
	)
}
