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
			className="fixed inset-0 bg-black/40 flex items-center justify-center overflow-y-hidden  z-50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white h-auto overflow-hidden rounded-3xl p-6 w-full max-h-[90vh] max-w-2xl shadow-lg"
			>
				<div className="p-6 overflow-y-auto max-h-[85vh] ">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">
							Detalle del día {data.date}
						</h2>

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

						{data.sessions.length > 0 ? (
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
										{s.checkOut
											? new Date(s.checkOut).toLocaleTimeString()
											: "—"}
									</span>

									<span>
										<b>Total:</b> {Math.floor(s.totalMinutes / 60)}h{" "}
										{s.totalMinutes % 60}m
									</span>
								</div>
							))
						) : (
							<div className=" py-30">
								<p className="text-xl text-center text-slate-500">
									No hay sesiones para este día
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
