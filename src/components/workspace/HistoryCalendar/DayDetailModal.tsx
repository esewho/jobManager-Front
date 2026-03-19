import type { DayDetail } from "../../../types/dayDetail-type"
import WorkProgressChart from "../../WorkProgressChart"

type Props = {
	data: DayDetail
	onClose: () => void
}

export default function DayDetails({ data, onClose }: Props) {
	const WORKDAY_MINUTES = 8 * 60

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white h-200 overflow-y-auto rounded-2xl p-6 w-full max-w-3xl shadow-lg"
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Detalle del día {data.date}</h2>

					<button
						onClick={onClose}
						className="text-sm text-slate-500 hover:text-black"
					>
						Cerrar
					</button>
				</div>

				{/* CHART */}
				<div className="mb-6">
					<WorkProgressChart
						title="Resumen del día"
						data={{
							workedMinutes: data.workedMinutes,
							extraMinutes: data.extraMinutes,
						}}
						baseMinutes={WORKDAY_MINUTES}
					/>
				</div>

				<div className="space-y-4">
					<h3 className="text-sm font-semibold text-slate-600">Sesiones</h3>

					{data.sessions &&
						data.sessions.map((s) => (
							<div
								key={s.id}
								className="border rounded-lg p-4 text-sm flex flex-col gap-1"
							>
								<span>
									<b>Check-in:</b> {new Date(s.checkIn).toLocaleTimeString()}
								</span>

								<span>
									<b>Check-out:</b>{" "}
									{s.checkOut ? new Date(s.checkOut).toLocaleTimeString() : "—"}
								</span>

								<span>
									<b>Total:</b> {Math.floor(s.totalMinutes / 60)}h{" "}
									{s.totalMinutes % 60}m
								</span>

								<span>
									<b>Pausas:</b> {s.pauses.length}
								</span>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}
