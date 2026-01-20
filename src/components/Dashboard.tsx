import { useEffect, useState } from "react"
import AppLayout from "../layouts/AppLayout"
import type { TodaySession } from "../types/todaySession-type"
import DashboardHeader from "./DashboardHeader"
import { getMySummary } from "../lib/lib"
import TodaySessionCard from "./TodaySessionCard"
import ActionCards from "./ActionCards"
import type { Summary } from "../types/summary-type"
import WorkProgressChart from "./WorkProgressChart"
import HistoryModal from "./HistoryModal"
import WeeklyHistoryList from "./WeeklyHistoryList"

export default function Dashboard() {
	const [today, setToday] = useState<TodaySession | null>(null)
	const [summary, setSummary] = useState<Summary | null>(null)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		getMySummary().then((data) => {
			setSummary(data)
		})
	}, [])

	if (!summary) {
		return null
	}

	return (
		<AppLayout>
			<div className="space-y-6">
				<DashboardHeader />
				<TodaySessionCard />
				<ActionCards />
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
			<HistoryModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<WeeklyHistoryList />
			</HistoryModal>
		</AppLayout>
	)
}

function formatMinutes(minutes: number) {
	const h = Math.floor(minutes / 60)
	const m = minutes % 60
	return `${h}h ${m}m`
}

// function TodayProgressChart() {
// 	const [workedMinutes, setWorkedMinutes] = useState(0)
// 	const [extraMinutes, setExtraMinutes] = useState(0)

// 	useEffect(() => {
// 		getMySummary().then((data) => {
// 			setWorkedMinutes(data.today.workedMinutes)
// 			setExtraMinutes(data.today.extraMinutes)
// 		})
// 	}, [])

// 	const BASE_WORKDAY = 480

// 	const baseWorked = Math.min(workedMinutes, BASE_WORKDAY)
// 	const extraWorked = Math.max(extraMinutes, 0)
// 	const remaining = Math.max(BASE_WORKDAY - baseWorked, 0)

// 	const data = [
// 		{ name: "Trabajado", value: baseWorked },
// 		{ name: "Extra", value: extraWorked },
// 		{ name: "Restante", value: remaining },
// 	]

// 	return (
// 		<div className="bg-white rounded-xl shadow p-6">
// 			<h2 className="text-lg font-semibold mb-4">Jornada de hoy</h2>

// 			<div className="flex gap-6 items-center">
// 				<PieChart width={200} height={200}>
// 					<Pie
// 						data={data}
// 						dataKey="value"
// 						innerRadius={70}
// 						outerRadius={90}
// 						paddingAngle={0}
// 						isAnimationActive
// 						animationDuration={800}
// 					>
// 						<Cell fill="#2563eb" />
// 						<Cell fill="#f59e0b" />
// 						<Cell fill="#e5e7eb" />
// 					</Pie>
// 				</PieChart>

// 				<div className="flex flex-col gap-2 w-44">
// 					<LegendItem
// 						color="#2563eb"
// 						label="Trabajado"
// 						value={formatMinutes(baseWorked)}
// 					/>
// 					<LegendItem
// 						color="#f59e0b"
// 						label="Extra"
// 						value={formatMinutes(extraWorked)}
// 					/>
// 					<LegendItem
// 						color="#e5e7eb"
// 						label="Restante"
// 						value={formatMinutes(remaining)}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	)
