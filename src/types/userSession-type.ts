export type UserSession = {
	status: "OPEN" | "CLOSED" | "PAUSED"
	checkIn: string
	checkOut: string | null
	totalMinutes: number
}
