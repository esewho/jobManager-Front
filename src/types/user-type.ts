export type UserType = {
	id: string
	username: string
	role: "ADMIN" | "EMPLOYEE" | null
	active: boolean
	createdAt: string
}
