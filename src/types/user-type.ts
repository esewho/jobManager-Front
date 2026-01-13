export type UserType = {
	id: string
	username: string
	role: "ADMIN" | "EMPLOYEE"
	active: boolean
	createdAt: string
}
