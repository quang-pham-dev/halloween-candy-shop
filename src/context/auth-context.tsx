import { createContext, useState } from "react"

import { useAuthLogin } from "@/hooks/use-auth"

export type AuthContext = {
	isAuthenticated: boolean
	login: (data: { username: string; password: string }) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContext | null>(null)

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const token = localStorage.getItem("access_token")
		return !!token
	})

	const handleLoginSuccess = () => {
		setIsAuthenticated(true)
	}

	const { mutateAsync: loginMutation } = useAuthLogin({
		onSuccess: handleLoginSuccess,
	})

	const login = async (data: { username: string; password: string }) => {
		// execute login mutation
		await loginMutation(data)
	}

	const logout = async () => {
		setIsAuthenticated(false)
		localStorage.removeItem("access_token")
		localStorage.removeItem("refresh_token")
	}

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}
