export type UserType = {
	id: string
	username: string
	avatarUrl: string
	role: "ADMIN" | "EMPLOYEE" | null
	active: boolean
	createdAt: string
}
