import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["./tests/setup.ts"],
		include: ["./src/**/*.test.{ts,tsx}"],
		coverage: {
			include: ["src/**/*"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
	},
})
