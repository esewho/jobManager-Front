import type { ScheduleStatus } from "./scheduleStatus-type"

export type UserSchedule = {
	id: string
	userWorkspaceId: string
	date: string
	startTime: string
	endTime: string
	status: ScheduleStatus
	createdAt: string
}
