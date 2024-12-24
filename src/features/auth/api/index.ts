import { ROUTES } from "@/constants/routes"
import type { LoginResponse } from "@/interfaces/auth"
import { api } from "@/lib/api/http"

export const loginAPI = async <T>(data: T) => {
	return await api.post<LoginResponse>(ROUTES.AUTH.LOGIN, data)
}
