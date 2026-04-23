import type { Summary } from "../../types/summary-type"
import type { UserSchedule } from "../../types/userSchedule-type"
import type { WorkspaceUserAdmin } from "../../types/WorkspaceUserAdmin-type"
import ActionCards from "../ActionCards"
import DashboardHeader from "../DashboardHeader"
import WorkProgressChart from "../WorkProgressChart"
import CurrentTimeCard from "./CurrentTimeCard"
import NextScheduleCard from "./NextScheduleCard"
import PendingSchedulesPanel from "./PendingSchedulePanel"
import UserChartAdmin from "./UserChartAdmin"

type Props = {
	summary: Summary
	showAdminPanel: boolean
	users?: WorkspaceUserAdmin
	userId: string
	workspaceId: string | undefined
	onSessionChange: () => void
	pendingSchedules?: UserSchedule[]
	onScheduleStatusChange?: (scheduleId: string, status: string) => void
	nextSchedule?: UserSchedule | null
	onViewDetail: (session: any) => void
}

export default function WorkspaceDashboard({
	summary,
	showAdminPanel,
	users,
	userId,
	workspaceId,
	pendingSchedules,
	onScheduleStatusChange,
	onSessionChange,
	nextSchedule,
	onViewDetail,
}: Props) {
	return (
		<div className="flex flex-col gap-8 px-6 pb-10 ">
			<div className="space-y-6">
				<DashboardHeader />
				{/* Top section */}
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr_1fr] rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
					{/* 1️⃣ Acciones */}
					<div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
						<ActionCards
							userId={userId}
							workspaceId={workspaceId}
							hasOpenSession={summary.today.workedMinutes === 0}
							onSessionChange={onSessionChange}
						/>
					</div>

					{/* 2️⃣ Centro más grande */}
					<div className="p-8 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex items-center justify-center">
						<CurrentTimeCard summary={summary} />
					</div>

					{/* 3️⃣ Próximo turno */}
					<div className="p-6 flex items-center justify-center">
						{<NextScheduleCard schedule={nextSchedule || null} />}
					</div>
				</div>

				{pendingSchedules && pendingSchedules.length > 0 && (
					<PendingSchedulesPanel
						schedules={pendingSchedules}
						workspaceId={workspaceId}
						onStatusUpdated={onScheduleStatusChange!}
					/>
				)}

				<header className="flex flex-col gap-2">
					<h2 className="text-2xl font-bold">Tu Progreso</h2>
					<p className="text-slate-500 text-sm">Progreso actual del mes</p>
				</header>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

						<UserChartAdmin users={users} onViewDetail={onViewDetail} />
					</section>
				</>
			)}
		</div>
	)
}
