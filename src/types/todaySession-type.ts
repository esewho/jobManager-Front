export type TodaySession = {
	checkIn: string | null
	checkOut: string | null
	totalMinutes: number
	extraMinutes: number
	shift: "MIDDAY" | "NIGHT" | null
	status: "OPEN" | "CLOSED" | null
}
