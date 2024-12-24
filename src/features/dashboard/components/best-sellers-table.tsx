import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DashboardData } from "@/interfaces/dashboard"

interface BestSellersTableProps {
	data: Pick<DashboardData["dashboard"], "bestsellers">
}

export function BestSellersTable({ data }: BestSellersTableProps) {
	const { bestsellers } = data

	return (
		<Card className="border-0">
			<CardHeader>
				<CardTitle className="text-2xl font-normal ">Best Sellers</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="border-b border-gray-800">
							<TableHead className="text-black font-bold">PRODUCT NAME</TableHead>
							<TableHead className="text-right text-black font-bold">PRICE</TableHead>
							<TableHead className="text-right text-black font-bold"># UNITS SOLD</TableHead>
							<TableHead className="text-right text-black font-bold">REVENUE</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bestsellers?.map((item) => (
							<TableRow key={item?.product.id} className={"bg-transparent"}>
								<TableCell className="py-4">
									<div className="flex items-center gap-4">
										<div className="flex-shrink-0 relative rounded-md overflow-hidden">
											<img
												src={item.product.image || "/placeholder.svg"}
												alt={item.product.name}
												width={100}
												height={100}
												className="object-cover"
											/>
										</div>
										<span className="text-xl">{item.product.name}</span>
									</div>
								</TableCell>
								<TableCell className="text-right ">${(item.revenue / item.units).toLocaleString()}</TableCell>
								<TableCell className="text-right ">{item.units.toLocaleString()}</TableCell>
								<TableCell className="text-right ">${item.revenue.toLocaleString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
