import type { Summary } from "../../types/summary-type"
import type { WorkspaceUserAdmin } from "../../types/WorkspaceUserAdmin-type"
import ActionCards from "../ActionCards"
import DashboardHeader from "../DashboardHeader"
import TodaySessionCard from "../TodaySessionCard"
import WorkProgressChart from "../WorkProgressChart"
import UserChartAdmin from "./UserChartAdmin"

type Props = {
	summary: Summary
	showAdminPanel: boolean
	users?: WorkspaceUserAdmin
	userId: string
	workspaceId: string | undefined
	onSessionChange: () => void
}

export default function WorkspaceDashboard({
	summary,
	showAdminPanel,
	users,
	userId,
	workspaceId,
	onSessionChange,
}: Props) {
	return (
		<div className="flex flex-col gap-8 px-6 pb-10 ">
			<div className="space-y-6">
				<DashboardHeader />

				<TodaySessionCard summary={summary} />

				<ActionCards
					userId={userId}
					workspaceId={workspaceId}
					hasOpenSession={summary.today.workedMinutes === 0}
					onSessionChange={onSessionChange}
				/>

				<header className="flex flex-col gap-2">
					<h2 className="text-2xl font-bold">Tu Progreso</h2>
					<p className="text-slate-500 text-sm">Progreso actual del mes</p>
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
					/>
					<WorkProgressChart
						title="Mes actual"
						data={summary.thisMonth}
						baseMinutes={160 * 60}
					/>
				</div>
			</div>

			{showAdminPanel && users && (
				<>
					<header className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">Panel de administración</h1>
						<p className="text-slate-500 text-sm">
							Estado de los usuarios en este workspace
						</p>
					</header>

					<section className="rounded-xl border bg-white p-6 shadow-sm">
						<h2 className="mb-4 text-lg font-semibold">
							Usuarios de este Workspace
						</h2>

						<UserChartAdmin users={users} />
					</section>
				</>
			)}
		</div>
	)
}
