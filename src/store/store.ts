import { create } from "zustand"
import type { workspaceUserAdmin } from "../types/workspaceUserAdmin"
import type { userChartType } from "../types/userChart.dto"

type ActiveUsersStore = {
	users: workspaceUserAdmin
	setUsers: (users: workspaceUserAdmin) => void
	checkInUser: (userId: string) => void
	checkOutUser: (userId: string) => void
}
export const useActiveUsersStore = create<ActiveUsersStore>((set) => ({
	users: [],

	setUsers: (users) =>
		set(() => ({
			users,
		})),

	checkInUser: (userId) =>
		set((state) => ({
			users: state.users.map(
				(u): userChartType =>
					u.user.id === userId
						? {
								...u,
								user: {
									...u.user,
									session: {
										...u.user.session,
									},
								},
							}
						: u,
			),
		})),

	checkOutUser: (userId) =>
		set((state) => ({
			users: state.users.map((u) =>
				u.user.id === userId
					? {
							...u,
							user: {
								...u.user,
								isWorking: false,
							},
						}
					: u,
			),
		})),
}))
