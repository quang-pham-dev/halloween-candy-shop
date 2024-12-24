import { useMutation } from "@tanstack/react-query"
import { use } from "react"

import { AuthContext } from "@/context/auth-context"
import { loginAPI } from "@/features/auth/api"
import type { LoginData } from "@/interfaces"

export function useAuth() {
	const context = use(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

export const useAuthLogin = ({ onSuccess }: { onSuccess: () => void }) => {
	return useMutation({
		mutationFn: async (data: LoginData) => {
			const response = await loginAPI(data)
			// Store tokens
			localStorage.setItem("access_token", response.data.access_token)
			localStorage.setItem("refresh_token", response.data.refresh_token)

			return response
		},
		onSuccess: () => onSuccess(),
	})
}
