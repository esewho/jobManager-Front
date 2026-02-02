// store/store.ts
import { create } from "zustand"
import type { WorkspaceUserAdmin } from "../types/WorkspaceUserAdmin-type"

type ActiveUsersStore = {
	users: WorkspaceUserAdmin
	setUsers: (users: WorkspaceUserAdmin) => void
}

export const useActiveUsersStore = create<ActiveUsersStore>((set) => ({
	users: [],
	setUsers: (users) => set({ users }),
}))
