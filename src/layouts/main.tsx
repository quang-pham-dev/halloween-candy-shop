import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { AppSidebar } from "./sidebar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main className={cn("p-20 space-y-8")}>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default MainLayout
