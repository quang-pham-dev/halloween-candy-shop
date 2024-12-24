import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/hooks/use-auth"
import type { AxiosError } from "axios"

// Define validation schema
const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

const initialValues: LoginFormValues = {
	username: "",
	password: "",
}

export default function LoginForm() {
	const navigate = useNavigate()
	const { login } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	// Initialize form with react-hook-form
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: initialValues,
	})

	const onSubmit = async (data: LoginFormValues) => {
		setIsLoading(true)
		try {
			await login(data)
			navigate({ to: "/dashboard" })
		} catch (errors: unknown) {
			if ((errors as AxiosError).message === "Request failed with status code 401") {
				setError("Invalid username or password")
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#342b4f]">
			<Card className="w-full max-w-md mx-4 border-purple-500/20 text-purple-50">
				<CardHeader className="space-y-1 pb-3 flex flex-row items-center">
					<CardTitle className="text-2xl text-purple-300 pr-4">Freddy's Artisanal Halloween Candy Shop</CardTitle>
					<img src="/jack-o-lantern.svg" alt="Freddy's Artisanal Halloween Candy Shop" className="w-24 h-24" />
				</CardHeader>
				<CardContent>
					{error && <p className="text-base text-red-500">{error}</p>}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder="Username"
												className="h-12 bg-purple-950/50 border-purple-500/20 text-purple-50 placeholder:text-purple-400 text-xl"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												type="password"
												placeholder="Password"
												className="h-12 bg-purple-950/50 border-purple-500/20 text-purple-50 placeholder:text-purple-400 text-xl"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="h-12 w-full bg-purple-500 hover:bg-purple-600 text-white"
								disabled={isLoading}
							>
								{isLoading && <Spinner size="large" className="mr-2 text-stone-950" />}
								{isLoading ? "Logging in..." : "Log in"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
