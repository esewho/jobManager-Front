export type UserSession = {
	status: "OPEN" | "CLOSED"
	checkIn: string
	checkOut: string | undefined
	totalMinutes: number
	extraMinutes: number
}
