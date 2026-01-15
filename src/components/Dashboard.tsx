import { useEffect, useState } from "react"
import AppLayout from "../layouts/AppLayout"
import type { TodaySession } from "../types/todaySession-type"
import DashboardHeader from "./DashboardHeader"
import { getMySummary, getTodaySession } from "../lib/lib"
import TodaySessionCard from "./TodaySessionCard"
import ActionCards from "./ActionCards"
import { PieChart } from "recharts/types/chart/PieChart"
import { Pie } from "recharts/types/polar/Pie"
import { Cell } from "recharts/types/component/Cell"

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

	useEffect(() => {
		getMySummary().then((data) => {
			setWorkedMinutes(data.today.workedMinutes)
		})
	}, [])

	const data = [
		{ name: "Trabajado", value: workedMinutes },
		{ name: "Restante", value: Math.max(480 - workedMinutes, 0) },
	]

	return (
		<div className="bg-white rounded-xl shadow p-6">
			<h2 className="text-lg font-semibold mb-4">Jornada de hoy</h2>

			<PieChart width={200} height={200}>
				<Pie data={data} dataKey="value" innerRadius={60} outerRadius={80}>
					<Cell fill="#2563eb" />
					<Cell fill="#e5e7eb" />
				</Pie>
			</PieChart>
		</div>
	)
}
