export type UserType = {
	id: string
	username: string
	email: string
	avatarUrl: string
	role: "ADMIN" | "EMPLOYEE" | null
	active: boolean
	createdAt: string
}
