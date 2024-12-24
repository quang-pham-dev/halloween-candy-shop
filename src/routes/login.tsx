import { createFileRoute, redirect } from "@tanstack/react-router"
import { lazy } from "react"

// Lazy load the login form
const LoginForm = lazy(() => import("@/features/auth/components/login-form"))

export const Route = createFileRoute("/login")({
	component: LoginComponent,
	beforeLoad: async ({ context }) => {
		// Redirect to dashboard if already authenticated
		if (context.auth.isAuthenticated) {
			throw redirect({ to: "/dashboard" })
		}
	},
})

function LoginComponent() {
	return <LoginForm />
}
