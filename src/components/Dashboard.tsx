import { useEffect, useState } from "react"
import AppLayout from "../layouts/AppLayout"
import type { TodaySession } from "../types/todaySession-type"
import DashboardHeader from "./DashboardHeader"
import { getMySummary, getTodaySession } from "../lib/lib"
import TodaySessionCard from "./TodaySessionCard"
import ActionCards from "./ActionCards"
import { PieChart } from "recharts"
import { Pie } from "recharts"
import { Cell } from "recharts"

export default function Dashboard() {
	const [today, setToday] = useState<TodaySession | null>(null)

	useEffect(() => {
		getTodaySession().then(setToday)
	}, [])

	return (
		<AppLayout>
			<div className="space-y-6">
				<DashboardHeader />
				<TodaySessionCard />
				<ActionCards />
				<TodayProgressChart />
			</div>
		</AppLayout>
	)
}

function TodayProgressChart() {
	const [workedMinutes, setWorkedMinutes] = useState(0)
	const [extraMinutes, setExtraMinutes] = useState(0)

	useEffect(() => {
		getMySummary().then((data) => {
			setWorkedMinutes(data.today.workedMinutes)
			setExtraMinutes(data.today.extraMinutes)
		})
	}, [])

	const BASE_WORKDAY = 480

	const baseWorked = Math.min(workedMinutes, BASE_WORKDAY)
	const extraWorked = Math.max(extraMinutes, 0)
	const remaining = Math.max(BASE_WORKDAY - baseWorked, 0)

	const data = [
		{ name: "Trabajado", value: baseWorked },
		{ name: "Extra", value: extraWorked },
		{ name: "Restante", value: remaining },
	]

	return (
		<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
			<h2 className="text-lg font-semibold mb-4 text-gray-900">
				Jornada de hoy
			</h2>

			<PieChart width={220} height={220}>
				<Pie
					data={data}
					dataKey="value"
					innerRadius={70}
					outerRadius={90}
					paddingAngle={4}
					isAnimationActive
					animationDuration={900}
					animationEasing="ease-out"
				>
					<Cell fill="#2563eb" /> {/* Trabajado */}
					<Cell fill="#f59e0b" /> {/* Extra */}
					<Cell fill="#e5e7eb" /> {/* Restante */}
				</Pie>
			</PieChart>

			<p className="mt-2 text-sm text-gray-600 text-center">
				{Math.floor(workedMinutes / 60)}h {workedMinutes % 60}m trabajados
			</p>
		</div>
	)
}
