import { PieChart, Pie, Cell } from "recharts"
import LegendItem from "./LegendItems"

type Props = {
	title: string
	data: {
		workedMinutes: number
		extraMinutes: number
	}
	baseMinutes: number
}

function formatMinutes(minutes: number) {
	const h = Math.floor(minutes / 60)
	const m = minutes % 60
	return `${h}h ${m}m`
}

export default function WorkProgressChart({ title, data, baseMinutes }: Props) {
	const baseWorked = Math.min(data.workedMinutes, baseMinutes)
	const extraWorked = Math.max(data.extraMinutes, 0)
	const remaining = Math.max(baseMinutes - baseWorked, 0)

	const chartData = [
		{ name: "Trabajado", value: baseWorked },
		{ name: "Extra", value: extraWorked },
		{ name: "Restante", value: remaining },
	]

	return (
		<button className="bg-white rounded-xl shadow p-6 border border-white hover:border hover:border-stone-950 transition ease-in-out duration-300 cursor-pointer">
			<h2 className="text-lg font-semibold mb-4">{title}</h2>

			<div className="flex gap-6 items-center">
				<PieChart width={200} height={200}>
					<Pie
						data={chartData}
						dataKey="value"
						innerRadius={70}
						outerRadius={90}
						isAnimationActive
						animationDuration={800}
					>
						<Cell fill="#2563eb" />
						<Cell fill="#f59e0b" />
						<Cell fill="#e5e7eb" />
					</Pie>
				</PieChart>

				<div className="flex flex-col gap-2 w-44">
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
