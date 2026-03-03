import { useEffect, useState } from "react"
import type { Summary } from "../../types/summary-type"

type Props = {
	summary: Summary
}

export default function CurrentTimeCard({ summary }: Props) {
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const formatTime = (date: Date) =>
		date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})

	const formatDate = (date: Date) =>
		date.toLocaleDateString([], {
			weekday: "long",
			day: "numeric",
			month: "long",
		})

	return (
		<div className="flex flex-col justify-center items-center text-center h-full">
			<p className="text-sm text-slate-500 mb-2">{formatDate(time)}</p>

			<h2 className="text-5xl font-bold text-slate-900 tracking-wide">
				{formatTime(time)}
			</h2>

			<div className="mt-6 text-sm text-slate-600">
				<p>
					Hoy llevas{" "}
					<span className="font-semibold text-slate-900">
						{Math.floor(summary.today.workedMinutes / 60)}h{" "}
						{summary.today.workedMinutes % 60}m
					</span>
				</p>

				{summary.today.extraMinutes > 0 && (
					<p className="text-yellow-600 mt-1">
						+{Math.floor(summary.today.extraMinutes / 60)}h{" "}
						{summary.today.extraMinutes % 60}m extra
					</p>
				)}
			</div>
		</div>
	)
}
