import type { CalendarDay } from "../../../types/calendarDay-type"

type Props = {
	data: CalendarDay[]
	month: number
	year: number
	onDayClick: (date: string) => void
	loading: boolean
}

export default function CalendarHistory({
	data,
	month,
	year,
	onDayClick,
	loading,
}: Props) {
	const generateDays = () => {
		const firstDay = new Date(year, month - 1, 1)
		const lastDay = new Date(year, month, 0)

		// lunes = 0
		const startWeekDay = (firstDay.getDay() + 6) % 7

		const days: ((CalendarDay & { day: number }) | null)[] = []

		for (let i = 0; i < startWeekDay; i++) {
			days.push(null)
		}

		for (let i = 1; i <= lastDay.getDate(); i++) {
			const date = new Date(year, month - 1, i)

			const dateStr = `${date.getFullYear()}-${String(
				date.getMonth() + 1,
			).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

			const dayData = data.find((d) => d.date === dateStr)

			days.push({
				day: i,
				date: dateStr,
				workedMinutes: dayData?.workedMinutes ?? 0,
				extraMinutes: dayData?.extraMinutes ?? 0,
			})
		}

		return days
	}

	const days = generateDays()

	const getColor = (minutes: number) => {
		if (minutes > 400) return "bg-green-500 text-white"
		if (minutes > 200) return "bg-green-300"
		if (minutes > 0) return "bg-green-100"
		return "bg-white"
	}

	if (loading) {
		return <p className="text-sm text-slate-500">Cargando calendario...</p>
	}

	return (
		<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
			{/* Header días semana */}
			<div className="grid grid-cols-7 mb-4 text-xs text-slate-500 uppercase tracking-wide">
				{["L", "M", "X", "J", "V", "S", "D"].map((d) => (
					<div key={d} className="text-center">
						{d}
					</div>
				))}
			</div>

			{/* Grid */}
			<div className="grid grid-cols-7 flex-1 gap-5 h-full">
				{days.map((d, idx) => (
					<div
						key={idx}
						className={`h-24 rounded-xl border flex flex-col justify-between p-2 transition cursor-pointer hover:border-slate-900
						${d ? getColor(d.workedMinutes) : "bg-transparent border-none"}`}
						onClick={() => d && onDayClick(d.date)}
					>
						{d && (
							<>
								<span className="text-sm font-semibold">{d.day}</span>

								{/* horas */}
								{d.workedMinutes > 0 && (
									<span className="text-xs font-medium">
										{Math.floor(d.workedMinutes / 60)}h {d.workedMinutes % 60}m
									</span>
								)}
							</>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
