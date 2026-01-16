export default function LegendItem({
	color,
	label,
	value,
}: {
	color: string
	label: string
	value: string
}) {
	return (
		<div className="flex items-center gap-2 text-sm">
			<span
				className="w-3 h-3 rounded-full"
				style={{ backgroundColor: color }}
			/>
			<span className="text-gray-700">{label}</span>
			<span className="ml-auto font-medium text-gray-900">{value}</span>
		</div>
	)
}
