import { useParams } from "react-router-dom"
import WorkspaceDashboard from "./WorkspaceDashboard"
import {
	getMyNextSchedule,
	getMyPendingSchedules,
	getMySessions,
	getMySummary,
} from "../../lib/lib"
import { useEffect, useState } from "react"
import type { Summary } from "../../types/summary-type"
import { useAuth } from "../../context/authContext"

import UserChartView from "./UserChartView"
import type { WorkSessionType } from "../../types/workSession-type"
import type { UserSchedule } from "../../types/userSchedule-type"

export default function WorkspaceUserView() {
	const { workspaceId } = useParams()
	const { user } = useAuth()

	const [summary, setSummary] = useState<Summary | null>(null)
	const [session, setSession] = useState<WorkSessionType[] | null>(null)
	const [pendingSchedules, setPendingSchedules] = useState<UserSchedule[]>([])
	const [nextSchedule, setNextSchedule] = useState<UserSchedule | null>(null)

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
			const pendingData = await getMyPendingSchedules(workspaceId)
			const nextData = await getMyNextSchedule(workspaceId)

			setSummary(summaryData)
			setSession(sessionData)
			setPendingSchedules(pendingData)
			setNextSchedule(nextData)
		}

		fetchData()
	}, [workspaceId])

	if (!summary || !user) return null
	return (
		// <AppLayout>
		<>
			<WorkspaceDashboard
				onSessionChange={() => {
					refreshSummary()
					refreshSessions()
				}}
				summary={summary}
				nextSchedule={nextSchedule}
				userId={user.id}
				workspaceId={workspaceId}
				showAdminPanel={false}
				pendingSchedules={pendingSchedules}
				onScheduleStatusChange={(scheduleId) => {
					setPendingSchedules((prev) => prev.filter((s) => s.id !== scheduleId))
				}}
			/>
			<UserChartView sessions={session} />
		</>

		// </AppLayout>
	)
}
