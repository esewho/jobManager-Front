import { PieChart, Pie, Cell } from "recharts"
import LegendItem from "./LegendItems"

type Props = {
	title: string
	data: {
		workedMinutes: number
		extraMinutes: number
	}
	baseMinutes: number
	onClick?: () => void
}

function formatMinutes(minutes: number) {
	const h = Math.floor(minutes / 60)
	const m = minutes % 60
	return `${h}h ${m}m`
}

export default function WorkProgressChart({
	title,
	data,
	baseMinutes,
	onClick,
}: Props) {
	const baseWorked = Math.min(data.workedMinutes, baseMinutes)
	const extraWorked = Math.max(data.workedMinutes - baseMinutes, 0)
	const remaining = Math.max(baseMinutes - data.workedMinutes, 0)

	const percentage =
		baseMinutes > 0
			? Math.min((data.workedMinutes / baseMinutes) * 100, 100)
			: 0

	const chartData = [
		{ name: "Trabajado", value: baseWorked },
		{ name: "Extra", value: extraWorked },
		{ name: "Restante", value: remaining },
	]

	return (
		<button
			onClick={onClick}
			className="bg-white rounded-xl shadow p-6 border w-full border-white hover:border hover:border-stone-950 transition ease-in-out duration-300 cursor-pointer"
		>
			<h2 className="text-lg font-semibold mb-4">{title}</h2>

			<div className="flex flex-col xl:flex-row items-center gap-6">
				<div className="relative w-[180px] h-[180px] shrink-0">
					<PieChart width={180} height={180}>
						<Pie
							data={chartData}
							dataKey="value"
							innerRadius={60}
							outerRadius={80}
						>
							<Cell fill="#2563eb" />
							<Cell fill="#f59e0b" />
							<Cell fill="#e5e7eb" />
						</Pie>
					</PieChart>

					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-lg font-semibold">
							{Math.round(percentage)}%
						</span>
						<span className="text-xs text-slate-500">Progreso</span>
					</div>
				</div>

				<div className="flex flex-col gap-2 w-full max-w-[180px] text-sm">
					<LegendItem
						color="#2563eb"
						label="Trabajado"
						value={formatMinutes(baseWorked)}
					/>
					<LegendItem
						color="#f59e0b"
						label="Extra"
						value={formatMinutes(extraWorked)}
					/>
					<LegendItem
						color="#e5e7eb"
						label="Restante"
						value={formatMinutes(remaining)}
					/>
				</div>
			</div>
		</button>
	)
}
