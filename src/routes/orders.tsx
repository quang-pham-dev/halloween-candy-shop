import { createFileRoute, redirect } from "@tanstack/react-router"
import { lazy } from "react"

import MainLayout from "@/layouts/main"

// Lazy load the orders component
const OrdersView = lazy(() => import("@/features/orders/components"))

export const Route = createFileRoute("/orders")({
	component: OrdersComponent,
	beforeLoad: async ({ context }) => {
		// Protect orders route
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: "/login" })
		}
	},
	validateSearch: (search: Record<string, unknown>) => {
		// Validate and transform search params
		const page = Math.max(1, Number(search?.page) || 1)
		const q = (search?.q as string) || undefined
		return { page, q }
	},
})

function OrdersComponent() {
	return (
		<MainLayout>
			<OrdersView />
		</MainLayout>
	)
}
