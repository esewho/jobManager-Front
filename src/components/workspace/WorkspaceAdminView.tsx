import { useEffect, useState } from "react"
import type { workspaceUserAdmin } from "../../types/workspaceUserAdmin"
import { getAllWorkspaceUsers, getMySummary } from "../../lib/lib"
import UserChartAdmin from "./UserChartAdmin"
import { useParams } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import DashboardHeader from "../DashboardHeader"
import TodaySessionCard from "../TodaySessionCard"
import ActionCards from "../ActionCards"
import WorkProgressChart from "../WorkProgressChart"
import type { Summary } from "../../types/summary-type"
import { useActiveUsersStore } from "../../store/store"
import { useAuth } from "../../context/authContext"

export default function WorkspaceAdminView() {
	const { workspaceId } = useParams()
	const { users, setUsers, checkInUser } = useActiveUsersStore()
	const { user } = useAuth()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const [summary, setSummary] = useState<Summary | null>(null)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (!workspaceId) {
			setLoading(false)
			setError("Invalid workspace")
			return
		}

		const fetchUsers = async () => {
			try {
				setLoading(true)
				await getAllWorkspaceUsers(workspaceId).then(setUsers)
			} finally {
				setLoading(false)
			}
		}

		fetchUsers()
	}, [workspaceId])

	useEffect(() => {
		getMySummary(workspaceId).then((data) => {
			setSummary(data)
		})
	}, [workspaceId])

	if (!summary) {
		return null
	}

	return (
		<AppLayout>
			<div className="flex flex-col gap-8 px-6 pb-10">
				{/* HEADER / INFO SUPERIOR */}

				{/* AQUÍ PODRÍAS METER CARDS / STATS */}
				{/* <AdminStats /> */}
				<div className="space-y-6">
					<DashboardHeader />
					<TodaySessionCard />
					<ActionCards
						userId={user.id}
						workspaceId={workspaceId}
						onChangeSession={() => getMySummary().then(setSummary)}
					/>
					<header className="flex flex-col gap-2">
						<h2 className="text-2xl font-bold">Tu Progreso</h2>
						<p className="text-slate-500 text-sm"> Progreso actual del mes</p>
					</header>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<WorkProgressChart
							title="Jornada de hoy"
							data={summary.today}
							baseMinutes={8 * 60}
						/>
						<WorkProgressChart
							title="Semana actual"
							data={summary.thisWeek}
							baseMinutes={40 * 60}
							onClick={() => setIsOpen(true)}
						/>
						<WorkProgressChart
							title="Mes actual"
							data={summary.thisMonth}
							baseMinutes={160 * 60}
						/>
					</div>
				</div>

				{/* PANEL DE USUARIOS */}
				<header className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Panel de administración</h1>
					<p className="text-slate-500 text-sm">
						Estado de los usuarios en este workspace
					</p>
				</header>

				<section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-lg font-semibold">Usuarios activos</h2>

					{loading && <div className="py-6 text-sm">Cargando usuarios…</div>}

					{!loading && error && (
						<div className="py-6 text-sm text-red-500">{error}</div>
					)}

					{!loading && !error && <UserChartAdmin users={users} />}
				</section>
			</div>
		</AppLayout>
	)
}
