import * as React from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { SalesOverTimeWeek, SalesOverTimeYear } from "@/interfaces/dashboard"
import { formatYAxis, transformWeeklyData, transformYearlyData } from "@/lib/utils"

interface RevenueChartProps {
	salesOverTimeWeek: SalesOverTimeWeek
	salesOverTimeYear: SalesOverTimeYear
}

export function RevenueChart({ salesOverTimeWeek, salesOverTimeYear }: RevenueChartProps) {
	const [showLast7Days, setShowLast7Days] = React.useState(true)

	const chartData = React.useMemo(() => {
		return showLast7Days ? transformWeeklyData(salesOverTimeWeek) : transformYearlyData(salesOverTimeYear)
	}, [salesOverTimeWeek, salesOverTimeYear, showLast7Days])

	return (
		<Card className="border-0">
			<CardHeader className="flex flex-row items-center justify-between pb-8">
				<CardTitle className="text-2xl font-normal">Revenue</CardTitle>
				<div className="flex items-center space-x-2">
					<Label htmlFor="last7days" className="text-x">
						{showLast7Days ? "LAST 7 DAYS" : "LAST 12 MONTHS"}
					</Label>
					<Switch
						id="last7days"
						checked={showLast7Days}
						onCheckedChange={setShowLast7Days}
						className="data-[state=checked]:bg-yellow-300 data-[state=unchecked]:bg-orange-500"
					/>
				</div>
			</CardHeader>
			<CardContent>
				<div className="h-[400px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData}>
							<XAxis dataKey="day" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
							<Tooltip />
							<YAxis
								stroke="#666666"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={formatYAxis}
								width={80}
							/>
							<Bar dataKey="amount" radius={[4, 4, 0, 0]} fill="currentColor" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
