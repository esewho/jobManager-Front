export type WorkSessionType = {
	id: string
	checkIn: string
	checkOut?: string
	totalMinutes: number
	extraMinutes: number
	date: string
	status: "OPEN" | "CLOSED" | "PAUSED"
	shift?: "MIDDAY" | "NIGHT"
	isPaused: boolean
	pauseCount: number
}
