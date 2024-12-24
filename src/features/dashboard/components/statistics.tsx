import type { SalesData } from "@/interfaces/dashboard"
import { calculateTotals } from "@/lib/utils/format"
import StatisticsBlock from "./statistics-block"

interface StatisticsProps {
	salesOverTimeWeek: Record<string, SalesData>
	salesOverTimeYear: Record<string, SalesData>
}

export function Statistics({ salesOverTimeWeek, salesOverTimeYear }: StatisticsProps) {
	// Today's data is the last entry (7)
	const today = salesOverTimeWeek["7"] || { orders: 0, total: 0 }

	// Calculate week totals (sum of all entries)
	const weekTotals = calculateTotals(salesOverTimeWeek)

	// Current month data is the last entry (12)
	const currentMonth = salesOverTimeYear["12"] || { orders: 0, total: 0 }

	const statisticsList = [
		{
			id: 1,
			title: "TODAY",
			totalValue: today.total,
			totalOrders: today.orders,
			icon: <img src="./candy-corn.svg" alt="candy corn" className="mx-auto w-16 h-16 object-cover" />,
		},
		{
			id: 2,
			title: "LAST WEEK",
			totalValue: weekTotals.total,
			totalOrders: weekTotals.orders,
			icon: <img src="./lollipop.svg" alt="candy corn" className="mx-auto w-16 h-16 object-cover" />,
		},
		{
			id: 3,
			title: "LAST MONTH",
			totalValue: currentMonth.total,
			totalOrders: currentMonth.orders,
			icon: <img src="./wrapped-candy.svg" alt="candy corn" className="mx-auto w-16 h-16 object-cover" />,
		},
	]
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
			{statisticsList.map((stat) => (
				<StatisticsBlock
					key={stat.id}
					title={stat.title}
					totalValue={stat.totalValue}
					totalOrders={stat.totalOrders}
					icon={stat.icon}
				/>
			))}
		</div>
	)
}
