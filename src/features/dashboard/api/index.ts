import { ROUTES } from "@/constants/routes"
import type { DashboardData } from "@/interfaces/dashboard"
import { api } from "@/lib/api/http"

export const fetchDashboardAPI = async () => await api.get<DashboardData>(ROUTES.DASHBOARD)
