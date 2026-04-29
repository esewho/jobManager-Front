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
									className="border rounded-xl p-4 text-sm flex flex-col gap-3 bg-slate-50"
								>
									{/* INFO PRINCIPAL */}
									<div className="flex justify-between flex-wrap gap-2">
										<span>
											<b>Check-in:</b>{" "}
											{new Date(s.checkIn).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</span>

										<span>
											<b>Check-out:</b>{" "}
											{s.checkOut
												? new Date(s.checkOut).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit",
													})
												: "—"}
										</span>

										<span>
											<b>Total:</b> {Math.floor(s.totalMinutes / 60)}h{" "}
											{Math.floor(s.totalMinutes % 60)}m
										</span>
									</div>

									{/* PAUSAS */}
									<div className="space-y-2">
										<p className="text-xs font-semibold text-slate-500">
											Pausas
										</p>

										{s.pauses.length === 0 ? (
											<p className="text-xs text-slate-400">Sin pausas</p>
										) : (
											<div className="space-y-1">
												{s.pauses.map((p) => {
													const duration = p.endTime
														? Math.floor(
																(new Date(p.endTime).getTime() -
																	new Date(p.startTime).getTime()) /
																	1000 /
																	60,
															)
														: null

													return (
														<div
															key={p.id || p.startTime}
															className="flex justify-between items-center bg-white px-3 py-2 rounded-lg border text-xs"
														>
															<span>
																{new Date(p.startTime).toLocaleTimeString([], {
																	hour: "2-digit",
																	minute: "2-digit",
																})}{" "}
																→{" "}
																{p.endTime
																	? new Date(p.endTime).toLocaleTimeString([], {
																			hour: "2-digit",
																			minute: "2-digit",
																		})
																	: "En curso"}
															</span>

															<span className="text-slate-500">
																{duration !== null ? `${duration} min` : "—"}
															</span>
														</div>
													)
												})}
											</div>
										)}
									</div>
								</div>
							))
						) : (
							<div className="py-20">
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
