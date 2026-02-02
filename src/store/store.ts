import { create } from "zustand"
import type { workspaceUserAdmin } from "../types/workspaceUserAdmin"

import type { UserSession } from "../types/userSession-type"

type ActiveUsersStore = {
	users: workspaceUserAdmin
	setUsers: (users: workspaceUserAdmin) => void
	updateUserSession: (userId: string, session: UserSession) => void
}

export const useActiveUsersStore = create<ActiveUsersStore>((set) => ({
	users: [],

	setUsers: (users) => set({ users }),

	updateUserSession: (userId, session) =>
		set((state) => ({
			users: state.users.map((u) =>
				u.user.id === userId
					? {
							...u,
							user: {
								...u.user,
								session: [session], // SIEMPRE array
							},
						}
					: u,
			),
		})),
}))
