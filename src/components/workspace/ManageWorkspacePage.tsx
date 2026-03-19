import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"
import { getWorkspaceById } from "../../lib/lib"
import type { WorkspaceBackType } from "../../types/workspaceBack-type"
import ManageWorkspace from "./ManageWorkspace"

export default function ManageWorkspacePage() {
	const { workspaceId } = useParams()

	const [workspace, setWorkspace] = useState<WorkspaceBackType | null>(null)

	const fetchWorkspace = async () => {
		if (!workspaceId) return

		const data = await getWorkspaceById(workspaceId)
		setWorkspace(data)
	}

	useEffect(() => {
		fetchWorkspace()
	}, [workspaceId])

	if (!workspace) {
		return <p className="p-6">Cargando workspace...</p>
	}

	return (
		<div className="max-h-screen bg-slate-50 flex justify-center items-start px-6 py-10">
			<ManageWorkspace workspace={workspace} onUpdated={fetchWorkspace} />
		</div>
	)
}
