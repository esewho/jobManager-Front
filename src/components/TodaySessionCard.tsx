import type { Summary } from "../types/summary-type"

type Props = {
	summary: Summary
}

export default function TodaySessionCard({ summary }: Props) {
	const hours = (summary.today.workedMinutes / 60).toFixed(1)

	return (
		<div className="bg-white rounded-xl shadow p-6">
			<h2 className="text-lg font-semibold mb-4">Resumen de hoy</h2>

			<div className="space-y-3">
				<div className="flex justify-between">
					<span className="text-gray-600">Horas trabajadas</span>
					<span className="font-semibold">{hours}h</span>
				</div>

				<div className="flex justify-between">
					<span>Horas extras</span>
					<span className="font-medium">
						{(summary.today.extraMinutes / 60).toFixed(1)}h
					</span>
				</div>

				<div className="flex justify-between text-green-600">
					<span>Propinas</span>
					<span className="font-semibold">{summary.today.tips} €</span>
				</div>
			</div>
		</div>
	)
}
