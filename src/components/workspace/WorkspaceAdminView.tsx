import { useParams } from "react-router-dom"

import WorkspaceDashboard from "./WorkspaceDashboard"

import { useAuth } from "../../context/authContext"
import { useEffect, useState } from "react"
import {
	getAllWorkspaceUsers,
	getMySummary,
	getTodaySession,
} from "../../lib/lib"
import type { Summary } from "../../types/summary-type"
import type { WorkspaceUserAdmin } from "../../types/WorkspaceUserAdmin-type"
import { useActiveUsersStore } from "../../store/store"
import DashboardLayout from "../../layouts/DashboardLayout"
import AppLayout from "../../layouts/AppLayout"

export default function WorkspaceAdminView() {
	const { workspaceId } = useParams()
	const { user } = useAuth()

	const [usersData, setUsersData] = useState<WorkspaceUserAdmin | null>(null)
	const [summary, setSummary] = useState<Summary | null>(null)

	const refreshUsers = async () => {
		if (!workspaceId) return

		const data = await getAllWorkspaceUsers(workspaceId)
		setUsersData(data)

		const summaryData = await getMySummary(workspaceId)
		setSummary(summaryData)
	}

	useEffect(() => {
		refreshUsers()
	}, [workspaceId])

	if (!summary || !user || !usersData) return null

	return (
		<DashboardLayout>
			<WorkspaceDashboard
				summary={summary}
				users={usersData}
				userId={user.id}
				workspaceId={workspaceId}
				onSessionChange={refreshUsers}
				showAdminPanel
			/>
		</DashboardLayout>
	)
}
