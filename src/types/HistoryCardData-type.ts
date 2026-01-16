export type HistoryCardData = {
	id: string
	date: string
	workedMinutes: number
	extraMinutes: number
	tips: number
	shift?: "MIDDAY" | "NIGHT"
}
