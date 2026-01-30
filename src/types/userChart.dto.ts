export type userChartType = {
	role: "ADMIN" | "EMPLOYEE"
	user: {
		id: string
		username: string
		session: {
			status: "OPEN" | "CLOSED"
			checkIn: string
			checkOut: string | null
			totalMinutes: number
		}[]
	}
}
