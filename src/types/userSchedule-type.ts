export type UserSchedule = {
	id: string
	userWorkspaceId: string
	date: string
	startTime: string
	endTime: string
	status: "ACCEPTED" | "PENDING" | "REJECTED"
	createdAt: string
	userWorkspace: {
		user: {
			id: string
			username: string
			avatarUrl: string
		}
	}
}
