import type { CurrentSessionUserType } from "../../types/currentSessionUser-type"

type Props = {
	session: CurrentSessionUserType
	onClose: () => void
}

export default function SessionDetailModal({ session, onClose }: Props) {
	if (!session) return null
	const worked = Math.floor(session.workedMinutes)
	const total = Math.floor(session.totalMinutes)

	const pauseMinutes = Math.max(total - worked, 0)

	const workedPercent = total > 0 ? (worked / total) * 100 : 0
	const pausePercent = total > 0 ? (pauseMinutes / total) * 100 : 0

	const formatMinutes = (min: number) => {
		const h = Math.floor(min / 60)
		const m = Math.floor(min % 60)
		return `${h}h ${m}m`
	}

	const formatTime = (date: string | null) => {
		if (!date) return "—"
		return new Date(date).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-8"
			>
				{/* HEADER */}
				<header className="flex justify-between items-start">
					<div>
						<h2 className="text-xl font-semibold text-slate-900">
							Sesión en curso
						</h2>
						<p className="text-sm text-slate-500">
							Usuario: {session.user.username}
						</p>
					</div>

					<button
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 text-sm"
					>
						Cerrar
					</button>
				</header>

				{/* TIEMPOS PRINCIPALES */}
				<section className="grid grid-cols-3 gap-6">
					<div className="bg-slate-50 rounded-xl p-4 text-center">
						<p className="text-xs text-slate-500">Check-in</p>
						<p className="text-lg font-semibold">
							{formatTime(session.checkIn)}
						</p>
					</div>

					<div className="bg-slate-50 rounded-xl p-4 text-center">
						<p className="text-xs text-slate-500">Check-out</p>
						<p className="text-lg font-semibold">
							{formatTime(session.checkOut)}
						</p>
					</div>

					<div className="bg-slate-50 rounded-xl p-4 text-center">
						<p className="text-xs text-slate-500">Tiempo total</p>
						<p className="text-lg font-semibold">{formatMinutes(total)}</p>
					</div>
				</section>

				{/* PROGRESO */}
				<section className="space-y-4">
					<h3 className="text-sm font-semibold text-slate-700">
						Productividad
					</h3>

					{/* BAR */}
					<div className="w-full h-4 rounded-full overflow-hidden bg-slate-200 flex">
						<div
							className="bg-green-500"
							style={{ width: `${workedPercent}%` }}
						/>
						<div
							className="bg-yellow-400"
							style={{ width: `${pausePercent}%` }}
						/>
					</div>

					<div className="flex justify-between text-xs text-slate-600">
						<span>Trabajado: {formatMinutes(worked)}</span>
						<span>Pausas: {formatMinutes(pauseMinutes)}</span>
					</div>
				</section>

				{/* STATS */}
				<section className="grid grid-cols-3 gap-4">
					<div className="bg-green-50 text-green-700 rounded-xl p-4 text-center">
						<p className="text-xs">Trabajado</p>
						<p className="font-semibold text-lg">{formatMinutes(worked)}</p>
					</div>

					<div className="bg-yellow-50 text-yellow-700 rounded-xl p-4 text-center">
						<p className="text-xs">Pausas</p>
						<p className="font-semibold text-lg">
							{formatMinutes(pauseMinutes)}
						</p>
					</div>

					<div className="bg-blue-50 text-blue-700 rounded-xl p-4 text-center">
						<p className="text-xs">Nº pausas</p>
						<p className="font-semibold text-lg">{session._count.pauses}</p>
					</div>
				</section>

				{/* LISTA DE PAUSAS */}
				<section className="space-y-3">
					<h3 className="text-sm font-semibold text-slate-700">
						Historial de pausas
					</h3>

					<div className="max-h-40 overflow-y-auto space-y-2 pr-2">
						{session.pauses.length === 0 && (
							<p className="text-xs text-slate-400">Sin pausas registradas</p>
						)}

						{session.pauses.map((p) => (
							<div
								key={p.id}
								className="flex justify-between items-center text-sm bg-slate-50 px-3 py-2 rounded-lg"
							>
								<span>
									{formatTime(p.startTime)} →{" "}
									{p.endTime ? formatTime(p.endTime) : "En curso"}
								</span>

								<span className="text-xs text-slate-500">
									{p.endTime
										? formatMinutes(
												(new Date(p.endTime).getTime() -
													new Date(p.startTime).getTime()) /
													1000 /
													60,
											)
										: "—"}
								</span>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
