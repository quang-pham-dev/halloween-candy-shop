import { Card, CardContent } from "@/components/ui/card"
import { formatAmount } from "@/lib/utils/format"

interface StatisticsProps {
	title: string
	totalValue: number
	totalOrders: number
	icon: React.ReactNode
}

export default function StatisticsBlock({ icon, title, totalValue, totalOrders }: StatisticsProps) {
	return (
		<Card className="border-0">
			<CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
				<div className="flex flex-col md:flex-row items-center sm:items-start gap-4 sm:justify-between">
					<div className="xl:w-[30%] xl:ml-3 xs:w-[30%] sm:w-auto">{icon}</div>

					<div className="w-[70%] xl:text-left xl:py-3 xs:text-left sm:text-center">
						<p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
						<p className="text-lg sm:text-xl md:text-2xl font-semibold">{formatAmount(totalValue)}</p>
						<p className="text-xs sm:text-sm font-semibold">{totalOrders} ORDERS</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
