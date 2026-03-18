export type DayDetail = {
	date: string
	workedMinutes: number
	extraMinutes: number
	sessions: {
		id: string
		checkIn: string
		checkOut: string | null
		totalMinutes: number
		extraMinutes: number
		pauses: {
			startTime: string
			endTime: string | null
		}[]
	}[]
}
