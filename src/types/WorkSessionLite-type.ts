export type WorkSessionLite = {
	status: "OPEN" | "CLOSED"
	checkIn: string
	checkOut: string | null
	totalMinutes: number
}
