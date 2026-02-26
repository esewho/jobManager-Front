import type { UserSchedule } from "../../types/userSchedule-type"

type Props = {
	schedules: UserSchedule[]
	onDelete: (id: string) => void
}

export default function UserSchedulesCards({ schedules, onDelete }: Props) {
	if (!schedules.length) return null

	const getStatusStyle = (status: string) => {
		switch (status) {
			case "PENDING":
				return "bg-yellow-100 text-yellow-700"
			case "ACCEPTED":
				return "bg-green-100 text-green-700"
			case "REJECTED":
				return "bg-red-100 text-red-700"
			default:
				return "bg-slate-100 text-slate-700"
		}
	}

	return (
		<div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
			{schedules.map((s) => (
				<div
					key={s.id}
					className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4"
				>
					{/* Header */}
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
								{s.userWorkspace.user.username.charAt(0).toUpperCase()}
							</div>

							<div>
								<h4 className="font-semibold text-slate-800">
									{s.userWorkspace.user.username}
								</h4>
								<p className="text-xs text-slate-500">
									{new Date(s.date).toLocaleDateString()}
								</p>
							</div>
						</div>

						<span
							className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
								s.status,
							)}`}
						>
							{s.status}
						</span>
					</div>

					{/* Time block */}
					<div className="rounded-lg bg-slate-50 p-4 text-center">
						<p className="text-sm text-slate-500">Horario</p>
						<p className="text-lg font-semibold text-slate-800 tracking-wide">
							{new Date(s.startTime).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}{" "}
							—{" "}
							{new Date(s.endTime).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
					</div>

					{/* Action */}
					{s.status === "ACCEPTED" && (
						<button
							onClick={() => onDelete(s.id)}
							className="text-sm text-red-500 hover:text-red-600 transition self-end"
						>
							Quitar turno
						</button>
					)}
				</div>
			))}
		</div>
	)
}
