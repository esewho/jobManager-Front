export type HistoryCardData = {
	date: string
	weekDay: number
	workedMinutes: number
	extraMinutes: number
	tips: number
	sessions: {
		sessionId: string
		checkIn: string
		checkOut: string | null
		shift: string | null
	}[]
}
