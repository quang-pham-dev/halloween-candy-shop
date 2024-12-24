import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TableSkeleton() {
	// Create an array of 10 items to simulate rows
	const rows = Array.from({ length: 10 }, (_, i) => i)

	return (
		<Card className="border-0">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="border-b border-gray-800">
							<TableHead className="text-black font-bold">
								<div className="flex items-center gap-4">
									<Skeleton className="h-6 w-[100px]" />
								</div>
							</TableHead>
							<TableHead className="text-right text-black font-bold">
								<div className="flex items-center gap-4">
									<Skeleton className="h-6 w-[100px]" />
								</div>
							</TableHead>
							<TableHead className="text-right text-black font-bold">
								<div className="flex items-center gap-4">
									<Skeleton className="h-6 w-[100px]" />
								</div>
							</TableHead>
							<TableHead className="text-right text-black font-bold">
								<div className="flex items-center gap-4">
									<Skeleton className="h-6 w-[100px]" />
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((index) => (
							<TableRow key={index} className="bg-transparent">
								<TableCell className="py-4">
									<div className="flex items-center gap-4">
										<Skeleton className="h-[100px] w-[100px] rounded-md" />
										<Skeleton className="h-6 w-[250px]" />
									</div>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex flex-col items-end gap-2">
										<Skeleton className="h-5 w-[100px]" />
										<Skeleton className="h-4 w-[80px]" />
									</div>
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-5 w-[80px] ml-auto" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-5 w-[100px] ml-auto" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
