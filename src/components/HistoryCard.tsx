import type { HistoryCardData } from "../types/HistoryCardData-type"

type Props = {
	day: HistoryCardData
}

function formatWeekDay(weekDay: number): string {
	const days = [
		"Domingo",
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
		"Sábado",
	]

	return days[weekDay] ?? ""
}

function formatMinutes(minutes: number) {
	const h = Math.floor(minutes / 60)
	const m = minutes % 60
	return `${h}h ${m}m`
}

export default function HistoryCard({ day }: Props) {
	return (
		<div className="bg-white rounded-xl p-4 shadow">
			<div className="flex justify-between items-center mb-2">
				<span className="font-semibold">
					{formatWeekDay(day.weekDay)}, {day.date}
				</span>
				<span className="text-sm text-gray-500">{day.date}</span>
			</div>

			<div className="text-sm">
				<p>Trabajado: {formatMinutes(day.workedMinutes)}</p>
				<p>Extra: {formatMinutes(day.extraMinutes)}</p>
				<p>Propinas: {day.tips} €</p>
				<p>
					Turno:{" "}
					{day.sessions.map((session, index) => (
						<span key={index}>
							{session.shift ? session.shift : "Sin asignar"}{" "}
						</span>
					))}
				</p>
			</div>
		</div>
	)
}
