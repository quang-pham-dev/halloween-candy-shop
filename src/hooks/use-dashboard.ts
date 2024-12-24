import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"

import { fetchDashboardAPI } from "@/features/dashboard/api"

export const DASHBOARD_QUERY_KEY = ["dashboard"]

export const useDashboardQuery = (options = {}) => {
	return useQuery({
		queryKey: DASHBOARD_QUERY_KEY,
		queryFn: fetchDashboardAPI,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		// Error handling
		retry: (failureCount, error: AxiosError) => {
			if (error.response?.status === 404) return false
			return failureCount < 3
		},

		...options,
	})
}
