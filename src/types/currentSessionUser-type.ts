export type CurrentSessionUserType = {
	date: string
	checkIn: string
	checkOut: string
	totalMinutes: number
	extraMinutes: number
	status: "OPEN" | "CLOSED"
	pauses: {
		id: string
		startTime: string
		endTime: string
	}[]
	_count: {
		pauses: number
	}
	user: {
		username: string
		avatarUrl: string
		id: string
	}
	workedMinutes: number
}
