import { createFileRoute, redirect } from "@tanstack/react-router"
import { lazy } from "react"

import MainLayout from "@/layouts/main"

// Lazy load the dashboard component
const DashboardView = lazy(() => import("@/features/dashboard/components"))

export const Route = createFileRoute("/dashboard")({
	component: DashboardComponent,
	beforeLoad: async ({ context, location }) => {
		// Protect dashboard route
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href }, // Redirect back to the intended page after login
			})
		}
	},
})

function DashboardComponent() {
	return (
		<MainLayout>
			<DashboardView />
		</MainLayout>
	)
}
