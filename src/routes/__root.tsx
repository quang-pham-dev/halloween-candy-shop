import type { AuthContext } from "@/context/auth-context"
import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Outlet, createRootRouteWithContext, redirect } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

interface RootRouterContext {
	auth: AuthContext
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
	component: RootComponent,
	beforeLoad: async ({ context }) => {
		const { auth } = context
		const isAuthenticated = auth.isAuthenticated

		// Check if the user is trying to access the root path
		if (window.location.pathname === "/") {
			if (isAuthenticated) {
				throw redirect({ to: "/dashboard" })
			}
			throw redirect({ to: "/login" })
		}
	},
})

function RootComponent() {
	return (
		<>
			<Outlet />
			<ReactQueryDevtools buttonPosition="top-right" />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	)
}
