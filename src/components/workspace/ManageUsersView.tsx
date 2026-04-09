import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
	deleteSchedule,
	getAllSchedulesOfWorkspace,
	getUsersToManage,
} from "../../lib/lib"
import type { UsersToManage } from "../../types/usersToManage-type"
import UserTableToManage from "./UserTableToManage"
import ManageUsersModal from "./ManageUsersModal"
import AssignSchedulePanel from "./AssignSchedulePanel"
import type { UserSchedule } from "../../types/userSchedule-type"
import UserSchedulesCards from "./UserScheduleCards"

export default function ManageUsersView() {
	const { workspaceId } = useParams()

	const [users, setUsers] = useState<UsersToManage[]>([])
	const [userToEdit, setUserToEdit] = useState<UsersToManage | null>(null)
	const [userToAssignSchedule, setUserToAssignSchedule] =
		useState<UsersToManage | null>(null)

	const [schedule, setSchedule] = useState<UserSchedule[] | null>([])
	const refreshSchedules = async () => {
		if (!workspaceId) return
		const data = await getAllSchedulesOfWorkspace(workspaceId)
		setSchedule(data)
	}

	useEffect(() => {
		if (!workspaceId) return
		refreshSchedules()
	}, [workspaceId])
	useEffect(() => {
		if (!workspaceId) return
		getUsersToManage(workspaceId).then(setUsers)
	}, [workspaceId])

	const refreshUsers = async () => {
		if (!workspaceId) return
		const data = await getUsersToManage(workspaceId)
		setUsers(data)
	}

	const handleDelete = async (scheduleId: string) => {
		if (!workspaceId) return
		await deleteSchedule(workspaceId, scheduleId)
		setSchedule((prev) => {
			if (!prev) return null
			return prev.filter((s) => s.id !== scheduleId)
		})
	}

	return (
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
					onRefreshSchedules={refreshSchedules}
				/>
			)}
			<header>
				<h1 className="text-2xl font-bold">Solicitudes</h1>
				<p className="text-slate-500 text-sm">
					Comprueba el estado de las solicitudes enviadas
				</p>
			</header>

			{schedule && (
				<UserSchedulesCards onDelete={handleDelete} schedules={schedule} />
			)}
		</div>
	)
}
