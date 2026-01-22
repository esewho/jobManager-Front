import { useAuth } from "../context/authContext"
import { assignWorkSessionShift } from "../lib/lib"
import type { HistoryCardData } from "../types/HistoryCardData-type"
import type { ShiftType } from "../types/shift-type"

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
	const { user } = useAuth()

	const isAdmin = user?.role === "ADMIN"

	const handleAssignShift = async (sessionId: string, shift: ShiftType) => {
		await assignWorkSessionShift(sessionId, shift)
		
	}
	return (
		<>
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
				</div>
				<div className="space-y-2">
					{day.sessions.length === 0 && (
						<p className="text-sm text-gray-500">
							No hay sesiones registradas.
						</p>
					)}
					{day.sessions.map((session) => (
						<div
							key={session.sessionId}
							className="border-t pt-2 mt-2 flex flex-col md:flex-row md:justify-between"
						>
							<div>
								<p className="text-sm ">
									Check-in: {new Date(session.checkIn).toLocaleTimeString()}
								</p>
								<p className="text-sm ">
									Check-out:{" "}
									{session.checkOut
										? new Date(session.checkOut).toLocaleTimeString()
										: "No registrado"}
								</p>
								<p className="text-sm">
									Turno: {session.shift ? session.shift : "No asignado"}
								</p>
							</div>
							{isAdmin && (
								<div className="mt-2 md:mt-0">
									<label className="mr-2">Turno:</label>
									<select
										value={session.shift ?? ""}
										onChange={(e) =>
											handleAssignShift(
												session.sessionId,
												e.target.value as ShiftType,
											)
										}
										className="border rounded px-2 py-1"
									>
										<option value="">Sin asignar</option>
										<option value="MIDDAY">Mañana</option>
										<option value="NIGHT">Noche</option>
									</select>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	)
}
