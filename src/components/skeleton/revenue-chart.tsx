import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export function RevenueChartSkeleton() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<Skeleton className="h-5 w-[100px]" />
				<Skeleton className="h-8 w-[120px]" />
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					{/* Chart placeholder */}
					<div className="space-y-6">
						{/* Y-axis labels */}
						<div className="flex items-center gap-3">
							<div className="flex flex-col justify-between space-y-3">
								{[...Array(4)].map((_, i) => (
									<Skeleton key={i} className="h-4 w-[60px]" />
								))}
							</div>
							{/* Bars */}
							<div className="flex-1 space-y-4">
								<div className="flex items-end justify-between">
									{[...Array(7)].map((_, i) => (
										<div key={i} className="space-y-2">
											<Skeleton
												className="w-14"
												style={{
													height: `${Math.random() * 150 + 50}px`,
												}}
											/>
											<Skeleton className="h-4 w-14" />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
