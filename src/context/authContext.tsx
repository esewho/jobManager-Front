import { useContext, createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, getMe, register } from "../lib/lib"
import type { UserType } from "../types/user-type"

export interface AuthContextType {
	user: UserType | null
	login: (username: string, password: string) => Promise<boolean>
	logout: () => void
	register: (username: string, password: string) => Promise<boolean>
	isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserType | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const navigate = useNavigate()

	const fetchUser = async () => {
		try {
			const userData = await getMe()
			setUser(userData)
		} catch (error) {
			console.error("Failed to fetch user data:", error)
			localStorage.removeItem("accessToken")
			setUser(null)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("accessToken")
		if (!token) {
			setIsLoading(false)
			return
		}
		fetchUser()
	}, [])

	const loginAction = async (
		username: string,
		password: string
	): Promise<boolean> => {
		const { accessToken } = await login(username, password)
		localStorage.setItem("accessToken", accessToken)
		await fetchUser()
		navigate("/")
		return true
	}

	const registerAction = async (
		username: string,
		password: string
	): Promise<boolean> => {
		const { accessToken } = await register(username, password)
		localStorage.setItem("accessToken", accessToken)
		await fetchUser()
		navigate("/")
		return true
	}

	const logOutAction = () => {
		localStorage.removeItem("accessToken")
		setUser(null)
		navigate("/login")
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				login: loginAction,
				register: registerAction,
				logout: logOutAction,
				isAuthenticated: !!user,
			}}
		>
			{!isLoading && children}
		</AuthContext.Provider>
	)
}
export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return ctx
}
