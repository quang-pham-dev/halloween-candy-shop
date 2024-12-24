import { ROUTES } from "@/constants/routes"
import type { OrdersData } from "@/interfaces/orders"
import { api } from "@/lib/api/http"

interface FetchOrdersParams {
	page?: number
	search?: string
}

export const fetchOrdersAPI = async ({ page = 1, search = "" }: FetchOrdersParams = {}) => {
	const sanitizedPage = Math.max(1, page)

	const params = new URLSearchParams()
	params.append("page", sanitizedPage.toString())
	if (search) params.append("q", search)

	const response = await api.get<OrdersData>(`${ROUTES.ORDERS}?${params.toString()}`)
	return response
}
