import type { WorkSessionLite } from "./WorkSessionLite-type"

export type AdminUser = {
	id: string
	username: string

	currentStatus: "OPEN" | "CLOSED" | "NONE"

	activeSession: WorkSessionLite | null
	lastSession: WorkSessionLite | null
}
