import { useParams } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import WorkspaceDashboard from "./WorkspaceDashboard"
import { getMySummary } from "../../lib/lib"
import { useEffect, useState } from "react"
import type { Summary } from "../../types/summary-type"
import { useAuth } from "../../context/authContext"

export default function WorkspaceUserView() {
	const { workspaceId } = useParams()
	const { user } = useAuth()

	const [summary, setSummary] = useState<Summary | null>(null)

	const refreshSummary = async () => {
		const data = await getMySummary(workspaceId)
		setSummary(data)
	}

	useEffect(() => {
		if (!workspaceId && user?.role !== "EMPLOYEE") return
		getMySummary(workspaceId).then(setSummary)
	}, [workspaceId])

	if (!summary || !user) return null

	return (
		<AppLayout>
			<WorkspaceDashboard
				onSessionChange={refreshSummary}
				summary={summary}
				userId={user.id}
				workspaceId={workspaceId}
				showAdminPanel={false}
			/>
		</AppLayout>
	)
}
