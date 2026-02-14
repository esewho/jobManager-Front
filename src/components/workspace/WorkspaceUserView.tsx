import { useParams } from "react-router-dom"
import WorkspaceDashboard from "./WorkspaceDashboard"
import { getMySessions, getMySummary } from "../../lib/lib"
import { useEffect, useState } from "react"
import type { Summary } from "../../types/summary-type"
import { useAuth } from "../../context/authContext"
import DashboardLayout from "../../layouts/DashboardLayout"

import UserChartView from "./UserChartView"
import type { WorkSessionType } from "../../types/workSession-type"

export default function WorkspaceUserView() {
	const { workspaceId } = useParams()
	const { user } = useAuth()

	const [summary, setSummary] = useState<Summary | null>(null)
	const [session, setSession] = useState<WorkSessionType[] | null>(null)

	const refreshSessions = async () => {
		const data = await getMySessions(workspaceId)
		setSession(data)
	}

	const refreshSummary = async () => {
		const data = await getMySummary(workspaceId)
		setSummary(data)
	}

	useEffect(() => {
		if (!workspaceId) return

		const fetchData = async () => {
			const summaryData = await getMySummary(workspaceId)
			const sessionData = await getMySessions(workspaceId)

			setSummary(summaryData)
			setSession(sessionData)
		}

		fetchData()
	}, [workspaceId])

	if (!summary || !user) return null
	return (
		// <AppLayout>
		<DashboardLayout>
			<WorkspaceDashboard
				onSessionChange={() => {
					refreshSummary()
					refreshSessions()
				}}
				summary={summary}
				userId={user.id}
				workspaceId={workspaceId}
				showAdminPanel={false}
			/>
			<UserChartView sessions={session} />
		</DashboardLayout>
		// </AppLayout>
	)
}
