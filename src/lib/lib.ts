import { toast } from "react-toastify"
import type { TipPoolPayload } from "../types/createTipPool-type"
import type { DailyTips } from "../types/dailyTips-type"
import type { SummaryTips } from "../types/summaryTips-type"
import type { Summary } from "../types/summary-type"
import type { WorkSession } from "../types/workSession-type"
import type { ShiftType } from "../types/shift-type"
import type { TipPoolType } from "../types/tipPool-type"
import type { WorkingUsers } from "../types/workingUser-type"
import type { UserType } from "../types/user-type"
import type { TodaySession } from "../types/todaySession-type"
import type { HistoryCardData } from "../types/HistoryCardData-type"
import type { CreateWorkspacePayload } from "../types/createWorkspace-type"
import type { UpdateWorkspace } from "../types/updateWorkspace-type"
import type { WorkspaceType } from "../types/workspace-type"
import type { workspaceUserAdmin } from "../types/workspaceUserAdmin"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

function getAuthHeaders() {
	const accessToken = localStorage.getItem("accessToken")
	return {
		"Content-Type": "application/json",

		Authorization: `Bearer ${accessToken}`,
	}
}

export async function register(
	username: string,
	password: string,
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify({ username, password }),
	})

	if (!response.ok) {
		toast.error("Registration failed")
		throw new Error("Registration failed")
	}
	if (response.ok) {
		toast.success("Registered successfully")
	}

	return response.json()
}

export async function login(
	username: string,
	password: string,
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})

	if (!response.ok) {
		throw new Error("Login failed")
	}
	if (response.ok) {
		console.log("Logged in successfully")
	}

	return response.json()
}

export async function registerAdmin(
	username: string,
	password: string,
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/register-admin`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify({ username, password }),
	})

	if (!response.ok) {
		throw new Error("Admin Registration failed")
	}
	if (response.ok) {
		console.log("Admin registered successfully")
	}

	return response.json()
}

export async function getMe(): Promise<UserType> {
	const response = await fetch(`${API_URL}/user-data/me`, {
		method: "GET",
		headers: getAuthHeaders(),
	})

	if (!response.ok) {
		throw new Error("Fetching user info failed")
	}
	if (response.ok) {
		console.log("User info fetched successfully")
	}

	return response.json()
}

export async function createTipPool(payload: TipPoolPayload): Promise<void> {
	const response = await fetch(`${API_URL}/tip-pool/create`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		toast.error("Creating Tip Pool failed")
		throw new Error("Creating Tip Pool failed")
	}
	if (response.ok) {
		toast.success("Tip Pool created successfully")
	}
}

export async function getMyDailyTips(): Promise<DailyTips[]> {
	const response = await fetch(`${API_URL}/tip-pool/my-daily-tips`, {
		method: "GET",
		headers: getAuthHeaders(),
	})

	if (!response.ok) {
		toast.error("Fetching Daily Tips failed")
		throw new Error("Fetching Daily Tips failed")
	}
	if (response.ok) {
		toast.success("Daily Tips fetched successfully")
	}

	return response.json()
}

export async function getMySummaryTips(): Promise<SummaryTips> {
	const response = await fetch(`${API_URL}/tip-pool/summary-tips`, {
		method: "GET",
		headers: getAuthHeaders(),
	})

	if (!response.ok) {
		toast.error("Fetching Summary Tips failed")
		throw new Error("Fetching Summary Tips failed")
	}
	if (response.ok) {
		toast.success("Summary Tips fetched successfully")
	}

	return response.json()
}

export async function getMySummary(workspaceId?: string): Promise<Summary> {
	const response = await fetch(
		`${API_URL}/work-sessions/me-summary?workspaceId=${workspaceId}`,
		{
			method: "GET",
			headers: getAuthHeaders(),
		},
	)
	if (!response.ok) {
		throw new Error("Fetching Summary failed")
	}
	if (response.ok) {
		console.log("Summary fetched successfully")
	}

	return response.json()
}

export async function getWeeklyHistory(): Promise<HistoryCardData[]> {
	const response = await fetch(`${API_URL}/weekly-history/me`, {
		method: "GET",
		headers: getAuthHeaders(),
	})
	if (!response.ok) {
		throw new Error("Fetching Weekly History failed")
	}
	if (response.ok) {
		console.log("Weekly History fetched successfully")
	}

	return response.json()
}

export async function checkIn(workspaceId?: string): Promise<WorkSession> {
	const response = await fetch(`${API_URL}/work-sessions/check-in`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify({ workspaceId }),
	})
	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || "Check-in failed")
	}
	if (response.ok) {
		console.log("Checked in successfully")
	}

	return response.json()
}

export async function checkOut(workspaceId?: string): Promise<WorkSession> {
	const response = await fetch(`${API_URL}/work-sessions/check-out`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify({ workspaceId }),
	})
	if (!response.ok) {
		toast.error("Check-out failed")
		throw new Error("Check-out failed")
	}
	if (response.ok) {
		toast.success("Checked out successfully")
	}

	return response.json()
}

export async function getMyWorkSessions(): Promise<WorkSession[]> {
	const response = await fetch(`${API_URL}/work-sessions/me`, {
		method: "GET",
		headers: getAuthHeaders(),
	})
	if (!response.ok) {
		toast.error("Fetching Work Sessions failed")
		throw new Error("Fetching Work Sessions failed")
	}
	if (response.ok) {
		toast.success("Work Sessions fetched successfully")
	}

	return response.json()
}

export async function getTodaySession(
	workspaceId?: string,
): Promise<TodaySession | null> {
	const response = await fetch(
		`${API_URL}/work-sessions/me/today/${workspaceId}`,
		{
			method: "GET",
			headers: getAuthHeaders(),
		},
	)
	if (!response.ok) {
		throw new Error("Fetching Today's Session failed")
	}
	if (response.ok) {
		console.log("Today's Session fetched successfully")
	}

	return response.json()
}

export async function getAllWorkSessions(): Promise<WorkSession[]> {
	const response = await fetch(`${API_URL}/admin/all-work-sessions`, {
		method: "GET",
		headers: getAuthHeaders(),
	})
	if (!response.ok) {
		toast.error("Fetching All Work Sessions failed")
		throw new Error("Fetching All Work Sessions failed")
	}
	if (response.ok) {
		toast.success("All Work Sessions fetched successfully")
	}

	return response.json()
}

export async function assignWorkSessionShift(
	sessionId: string,
	shift: ShiftType,
): Promise<void> {
	const response = await fetch(
		`${API_URL}/admin/work-sessions/${sessionId}/shift`,
		{
			method: "PATCH",
			headers: getAuthHeaders(),
			body: JSON.stringify({ shift }),
		},
	)
	if (!response.ok) {
		toast.error("Assigning Shift failed")
		throw new Error("Assigning Shift failed")
	}
	if (response.ok) {
		toast.success("Shift assigned successfully")
	}
}

export async function getAllTipPools(): Promise<TipPoolType[]> {
	const response = await fetch(`${API_URL}/admin/all-tipPools`, {
		method: "GET",
		headers: getAuthHeaders(),
	})
	if (!response.ok) {
		toast.error("Fetching All Tip Pools failed")
		throw new Error("Fetching All Tip Pools failed")
	}
	if (response.ok) {
		toast.success("All Tip Pools fetched successfully")
	}

	return response.json()
}

export async function getAllWorkspaceUsers(
	workspaceId: string,
): Promise<workspaceUserAdmin> {
	const response = await fetch(`${API_URL}/admin/${workspaceId}/users`, {
		method: "GET",
		headers: getAuthHeaders(),
	})
	if (!response.ok) {
		throw new Error("Fetching Working Users failed")
	}
	console.log(getAuthHeaders())
	return response.json()
}

export async function createWorkspace(
	payload: CreateWorkspacePayload,
): Promise<void> {
	const formData = new FormData()
	formData.append("name", payload.name)

	if (payload.image) {
		formData.append("image", payload.image)
	}
	const response = await fetch(`${API_URL}/workspace/create`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
		body: formData,
	})

	if (!response.ok) {
		throw new Error("Creating Workspace failed")
	}
	if (response.ok) {
		console.log("Workspace created!")
	}
}

export async function updateWorkspace(payload: UpdateWorkspace): Promise<void> {
	const response = await fetch(`${API_URL}/workspace/update`, {
		method: "PATCH",
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		const error = await response.json()

		throw new Error(error.message || "Updating Workspace failed")
	}
	if (response.ok) {
		console.log("Workspace updated successfully")
	}
}

export async function getWorkspaceById(
	workspaceId: string,
): Promise<WorkspaceType> {
	const response = await fetch(`${API_URL}/workspace/${workspaceId}`, {
		method: "GET",
		headers: getAuthHeaders(),
	})

	if (!response.ok) {
		const error = await response.json()

		throw new Error(error.message || "Fetching Workspace failed")
	}
	if (response.ok) {
		console.log("Workspace fetched successfully")
	}
	return response.json()
}

export async function deleteWorkspace(workspaceId: string): Promise<void> {
	const response = await fetch(`${API_URL}/workspace/${workspaceId}`, {
		method: "DELETE",
		headers: getAuthHeaders(),
	})

	if (!response.ok) {
		const error = await response.json()

		throw new Error(error.message || "Deleting Workspace failed")
	}
	if (response.ok) {
		console.log("Workspace deleted successfully")
	}
}

export async function getAllWorkspaces(): Promise<WorkspaceType[]> {
	const response = await fetch(`${API_URL}/workspace/all`, {
		method: "GET",
		headers: getAuthHeaders(),
	})

	if (!response.ok) {
		const error = await response.json()

		throw new Error(error.message || "Fetching Workspaces failed")
	}
	if (response.ok) {
		console.log("Workspaces fetched successfully")
	}

	return response.json()
}
