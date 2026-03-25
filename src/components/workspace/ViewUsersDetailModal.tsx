type Props = {
	onClose: () => void
	data: ""
}

export default function SessionDetailModal({ data, onClose }: Props) {
	return (
		<div
			onClick={onClose}
			className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
			>
				<h2 className="text-lg font-semibold mb-4">{data.user.username}</h2>

				<p>Check-in: {new Date(data.checkIn).toLocaleTimeString()}</p>
				<p>
					Check-out:{" "}
					{data.checkOut ? new Date(data.checkOut).toLocaleTimeString() : "—"}
				</p>

				<p>
					Total: {Math.floor(data.totalMinutes / 60)}h {data.totalMinutes % 60}m
				</p>

				<p className="mt-4 font-semibold">Pausas:</p>

				{data.pauses.length > 0 ? (
					data.pauses.map((p) => (
						<div key={p.id} className="text-sm">
							{new Date(p.startTime).toLocaleTimeString()} -{" "}
							{p.endTime ? new Date(p.endTime).toLocaleTimeString() : "Activa"}
						</div>
					))
				) : (
					<p>No hay pausas</p>
				)}
			</div>
		</div>
	)
}
