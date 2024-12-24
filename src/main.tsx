import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { persistQueryClient, removeOldestQuery } from "@tanstack/react-query-persist-client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { compress, decompress } from "lz-string"
import React from "react"
import ReactDOM from "react-dom/client"
// import { scan } from "react-scan" 

import { DefaultCatchBoundary } from "@/components/default-catch-boundary"
import { NotFound } from "@/components/not-found"
import { type AuthContext, AuthContextProvider } from "@/context/auth-context"
import { useAuth } from "@/hooks/use-auth"
import { routeTree } from "./routeTree.gen"
import "./index.css"
import { Monitoring } from "react-scan/monitoring"

// Enable react-scan
// if (typeof window !== "undefined") {
// 	scan({
// 		enabled: true,
// 		alwaysShowLabels: true,
// 	})
// }

const STALE_TIME = 5 * 60 * 1000 // 5m
const RETRY_COUNT = 3
const MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7d
const GC_TIME = 10 * 60 * 1000 // 10m

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: RETRY_COUNT,
			staleTime: STALE_TIME,
			gcTime: GC_TIME,
		},
	},
})

const localStoragePersister = createSyncStoragePersister({
	storage: window.localStorage,
	retry: removeOldestQuery,
	serialize: (data) => compress(JSON.stringify(data)),
	deserialize: (data) => JSON.parse(decompress(data)),
})

persistQueryClient({
	queryClient,
	persister: localStoragePersister,
	maxAge: MAX_AGE,
})

// Set up a Router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient,
		auth: {} as AuthContext, // This will be set after we wrap the app in an AuthProvider
	},
	defaultPreload: "intent",
	defaultErrorComponent: DefaultCatchBoundary,
	defaultNotFoundComponent: () => <NotFound />,
})

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

function App() {
	const auth = useAuth()

	return (
		<>
			<Monitoring apiKey={import.meta.env.VITE_MONITORING_API_KEY} url={import.meta.env.VITE_MONITORING_URL} />
			<RouterProvider router={router} context={{ auth }} />{" "}
		</>
	)
}

const rootElement = document.getElementById("app")

if (rootElement) {
	if (!rootElement.innerHTML) {
		const root = ReactDOM.createRoot(rootElement)
		root.render(
			<React.StrictMode>
				<QueryClientProvider client={queryClient}>
					<AuthContextProvider>
						<App />
					</AuthContextProvider>
				</QueryClientProvider>
			</React.StrictMode>
		)
	}
}
