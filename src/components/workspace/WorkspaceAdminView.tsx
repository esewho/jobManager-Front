import { useParams } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import WorkspaceDashboard from "./WorkspaceDashboard"

import { useAuth } from "../../context/authContext"
import { useEffect, useState } from "react"
import { getAllWorkspaceUsers, getMySummary } from "../../lib/lib"
import type { Summary } from "../../types/summary-type"
import type { WorkspaceUserAdmin } from "../../types/WorkspaceUserAdmin-type"
import { useActiveUsersStore } from "../../store/store"

export default function WorkspaceAdminView() {
	const { workspaceId } = useParams()
	const { user } = useAuth()
	const { users, setUsers } = useActiveUsersStore()

	const [summary, setSummary] = useState<Summary | null>(null)
	const [localUsers, setLocalUsers] = useState<WorkspaceUserAdmin>([])

	const refreshUsers = async () => {
		if (!workspaceId && user?.role !== "ADMIN") return
		const data = await getAllWorkspaceUsers(workspaceId)
		setUsers(data)
		setLocalUsers(data)
	}

	useEffect(() => {
		if (!workspaceId && user?.role !== "ADMIN") return
		getMySummary(workspaceId).then(setSummary)
		refreshUsers()
	}, [workspaceId])

	if (!summary || !user) return null

	return (
		<AppLayout>
			<WorkspaceDashboard
				summary={summary}
				users={users}
				userId={user.id}
				workspaceId={workspaceId}
				onSessionChange={refreshUsers}
				showAdminPanel
			/>
		</AppLayout>
	)
}
