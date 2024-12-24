import { fetchOrdersAPI } from "@/features/orders/api"
import type { OrdersData } from "@/interfaces/orders"
import { useQuery } from "@tanstack/react-query"

const ORDERS_QUERY_KEY = ["orders"] as const

interface UseOrdersQueryParams {
	page?: number
	search?: string
}

export const useOrdersQuery = (params: UseOrdersQueryParams = {}, options = {}) => {
	const { page = 1, search = "" } = params
	const sanitizedPage = Math.max(1, page)

	return useQuery<OrdersData>({
		queryKey: [ORDERS_QUERY_KEY, sanitizedPage, search],
		queryFn: async () => {
			const response = await fetchOrdersAPI({
				page: sanitizedPage,
				search,
			})
			return response.data
		},
		...options,
	})
}
