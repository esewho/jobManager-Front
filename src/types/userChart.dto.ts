import type { UserSession } from "./userSession-type"

export type userChartType = {
	role: "ADMIN" | "EMPLOYEE"
	user: {
		id: string
		username: string
		session: UserSession[]
	}
}
