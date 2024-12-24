import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

function StatisticsCardSkeleton() {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="space-y-4">
					{/* Icon placeholder */}
					<Skeleton className="h-12 w-12 rounded-full" />
					{/* Title */}
					<Skeleton className="h-4 w-[100px]" />
					{/* Amount */}
					<Skeleton className="h-8 w-[140px]" />
					{/* Orders count */}
					<Skeleton className="h-4 w-[80px]" />
				</div>
			</CardContent>
		</Card>
	)
}

export function StatisticsSkeleton() {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			{[...Array(3)].map((_, i) => (
				<StatisticsCardSkeleton key={i} />
			))}
		</div>
	)
}
