import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { OrdersData } from "@/interfaces/orders"

interface OrdersTableProps {
	data: OrdersData
}

export function OrdersTable({ data }: OrdersTableProps) {
	const { orders } = data

	const renderStatus = ({
		status,
	}: {
		status: "shipped" | "delivered" | "processing"
	}) => {
		const textColors: Record<"shipped" | "delivered" | "processing", string> = {
			shipped: "text-black",
			delivered: "text-green-500",
			processing: "text-red-500",
		}
		return <TableCell className={`text-right ${textColors[status]}`}>{status.toLocaleUpperCase()}</TableCell>
	}

	return (
		<Card className="border-0">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="border-b border-gray-800">
							<TableHead className="text-black font-bold">PRODUCT NAME</TableHead>
							<TableHead className="text-right text-black font-bold">DATE</TableHead>
							<TableHead className="text-right text-black font-bold">PRICE</TableHead>
							<TableHead className="text-right text-black font-bold">STATUS</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders?.map((item) => (
							<TableRow key={item.id} className={"bg-transparent"}>
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
								<TableCell className="text-right">
									<p className="text-base font-medium">{new Date(item.created_at).toLocaleDateString("en-US")}</p>
									<p className="text-sm font-normal text-gray-400">
										{new Date(item.created_at).toLocaleTimeString("en-US")}
									</p>
								</TableCell>
								<TableCell className="text-right font-medium">
									{item.currency}
									{(item.total / (item.product.quantity as number)).toLocaleString()}
								</TableCell>
								{renderStatus({
									status: item.status as "shipped" | "delivered" | "processing",
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
