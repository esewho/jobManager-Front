import { useEffect, useState } from "react"
import { getMySummary } from "../lib/lib"
import type { Summary } from "../types/summary-type"

export default function TodaySessionCard() {
	const [todaySummary, setTodaySummary] = useState<Summary | null>(null)

	useEffect(() => {
		getMySummary().then(setTodaySummary)
	}, [])
	if (!todaySummary) {
		return null
	}

	const hours = (todaySummary.today.workedMinutes / 60).toFixed(1)

	return (
		<div className="bg-white rounded-xl shadow p-6">
			<h2 className="text-lg font-semibold mb-4">Resumen de hoy</h2>
			<div className="space-y-3">
				<div className="flex justify-between">
					<span className="text-gray-600">Horas trabajadas</span>
					<span className="font-semibold">{hours}</span>
				</div>
				<div className="flex justify-between">
					<span>Horas extras</span>
					<span className="font-medium">
						{(todaySummary.today.extraMinutes / 60).toFixed(1)}h
					</span>
				</div>
				<div className="flex justify-between text-green-600">
					<span>Propinas</span>
					<span className="font-semibold">{todaySummary.today.tips} €</span>
				</div>
			</div>
		</div>
	)
}
