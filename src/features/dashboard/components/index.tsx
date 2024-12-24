import { RevenueChartSkeleton, TableSkeleton } from "@/components/skeleton"
import { StatisticsSkeleton } from "@/components/skeleton"
import { ErrorMessage } from "@/components/ui/error-message"
import { useDashboardQuery } from "@/hooks/use-dashboard"
import type { SalesOverTimeWeek, SalesOverTimeYear } from "@/interfaces"
import { BestSellersTable } from "./best-sellers-table"
import { RevenueChart } from "./revenue-chart"
import { Statistics } from "./statistics"

export default function DashboardView() {
	const { data, isLoading, isError, error, refetch } = useDashboardQuery()

	// Early return when error
	if (isError) {
		return <ErrorMessage message="Failed to load dashboard data" error={error} onRetry={() => refetch()} />
	}

	const { dashboard } = data?.data || {}
	const { sales_over_time_week, sales_over_time_year, bestsellers } = dashboard || {}

	return (
		<>
			<h1 className="text-3xl font-semibold ">Dashboard</h1>
			{isLoading ? (
				<>
					<StatisticsSkeleton />
					<RevenueChartSkeleton />
					<TableSkeleton />
				</>
			) : (
				<>
					<Statistics
						salesOverTimeWeek={sales_over_time_week as SalesOverTimeWeek}
						salesOverTimeYear={sales_over_time_year as SalesOverTimeYear}
					/>
					<RevenueChart
						salesOverTimeWeek={sales_over_time_week as SalesOverTimeWeek}
						salesOverTimeYear={sales_over_time_year as SalesOverTimeYear}
					/>
					{bestsellers && <BestSellersTable data={{ bestsellers: bestsellers || [] }} />}
				</>
			)}
		</>
	)
}
