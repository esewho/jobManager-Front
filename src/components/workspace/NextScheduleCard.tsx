import type { UserSchedule } from "../../types/userSchedule-type"

type Props = {
	schedule: UserSchedule | null
}

function formatRelativeDate(dateString: string) {
	const date = new Date(dateString)
	const today = new Date()

	const diffTime = date.getTime() - today.setHours(0, 0, 0, 0)
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	if (diffDays === 0) return "Hoy"
	if (diffDays === 1) return "Mañana"
	if (diffDays === 2) return "En 2 días"

	return date.toLocaleDateString()
}

export default function NextScheduleCard({ schedule }: Props) {
	const relative = formatRelativeDate(schedule.date)
	return (
		<div className="flex flex-col items-center justify-center text-center h-full">
			<p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
				Próximo turno
			</p>

			<p className="text-sm text-blue-700 font-medium mb-5">{relative}</p>

			<div className="flex items-baseline gap-3 text-blue-900">
				<span className="text-3xl font-bold tracking-wide">
					{new Date(schedule.startTime).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>

				<span className="text-blue-300 text-xl font-medium">—</span>

				<span className="text-3xl font-bold tracking-wide">
					{new Date(schedule.endTime).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>
		</div>
	)
}
