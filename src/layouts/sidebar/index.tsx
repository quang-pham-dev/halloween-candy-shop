import { Link, useNavigate } from "@tanstack/react-router"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

const SIDEBAR_ITEMS = [
	{
		id: 1,
		title: "Dashboard",
		href: "/dashboard",
		icon: "/flying-bat.svg",
	},
	{
		id: 2,
		title: "Orders",
		href: "/orders",
		icon: "lollipop.svg",
	},
]

export function AppSidebar() {
	const navigate = useNavigate()
	const { logout } = useAuth()

	const handleLogout = async () => {
		await logout()

		navigate({ to: "/login" })
	}

	return (
		<Sidebar>
			<SidebarHeader>
				<img className="rounded-md mx-auto" src="./jack-o-lantern.svg" alt="sidebar logo" width={100} height={100} />
			</SidebarHeader>
			<SidebarContent className="gap-10 self-center mt-10">
				{SIDEBAR_ITEMS.map((item) => (
					<SidebarGroup key={item.id}>
						<SidebarMenu>
							<SidebarMenuItem>
								<Link key={item.title} to={item.href} className="w-full h-auto hover:opacity-80 transition-opacity">
									<div className="flex flex-col items-center text-center">
										<img
											src={item.icon}
											alt={item.title}
											width={70}
											height={70}
											className={cn("rounded-md mb-2", location.pathname === item.href && "filter brightness-0 invert")}
										/>
										<p
											className={cn(
												"text-xl font-semibold text-black",
												location.pathname === item.href && "filter brightness-0 invert"
											)}
										>
											{item.title}
										</p>
									</div>
								</Link>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
			<Separator />
			<div className="flex m-2 p-2">
				<Button variant="destructive" className={cn("grow")} onClick={handleLogout}>
					<LogOut /> Logout
				</Button>
			</div>
		</Sidebar>
	)
}
