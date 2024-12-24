import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "./button"

interface ErrorMessageProps {
	message?: string
	error?: Error | unknown
	onRetry?: () => void
}

export function ErrorMessage({ message = "Something went wrong", error, onRetry }: ErrorMessageProps) {
	// Extract error message if available
	const errorMessage =
		error instanceof Error ? error.message : typeof error === "string" ? error : "An unexpected error occurred"

	return (
		<Alert variant="destructive" className="my-4">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>{message}</AlertTitle>
			<AlertDescription className="mt-2">
				<p className="text-sm text-red-500">{errorMessage}</p>
				{onRetry && (
					<Button
						onClick={onRetry}
						className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
					>
						Try Again
					</Button>
				)}
			</AlertDescription>
		</Alert>
	)
}
