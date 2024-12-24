import { useNavigate, useSearch } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { useCallback } from "react"

import { TableSkeleton } from "@/components/skeleton"
import { ErrorMessage } from "@/components/ui/error-message"
import { Input } from "@/components/ui/input"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { useOrdersQuery } from "@/hooks/use-orders-query"
import { generatePagination } from "@/lib/utils/pagination"
import { OrdersTable } from "./orders-table"

const PAGE_SIZE = 50

export default function OrdersView() {
	const navigate = useNavigate()
	const { page, q: currentSearch } = useSearch({ from: "/orders" })

	// Query handler
	const { data, isLoading, isError, error, refetch } = useOrdersQuery({
		page,
		search: currentSearch,
	})

	// Search and pagination handlers
	const handleSearch = useCallback(
		(term: string) => {
			navigate({
				to: "/orders",
				search: {
					q: term || undefined, // Remove q param if empty
					page: term ? 1 : page, // Reset to page 1 when searching
				},
				replace: true,
			})
		},
		[navigate, page]
	)

	const handlePageChange = useCallback(
		(newPage: number) => {
			navigate({
				to: "/orders",
				search: {
					page: Math.max(1, newPage),
					q: currentSearch || undefined, // Remove q param if empty
				},
				replace: true,
			})
		},
		[navigate, currentSearch]
	)

	// Early return when loading
	if (isError) {
		return <ErrorMessage message="Failed to load orders data" error={error} onRetry={() => refetch()} />
	}

	// Calculate total pages and ensure it's at least 1
	const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1
	const hasResults = data ? data.orders.length > 0 : false
	const paginationItems = generatePagination(page, totalPages)

	// Determine if pagination should be shown
	const showPagination = hasResults && totalPages > 1

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-semibold">Orders</h1>

				<div className="relative w-[300px]">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search orders..."
						defaultValue={currentSearch}
						onChange={(e) => handleSearch(e.target.value)}
						className="pl-9"
					/>
				</div>
			</div>

			{isLoading ? <TableSkeleton /> : data && <OrdersTable data={data} />}

			{showPagination && (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault()
									if (page > 1) handlePageChange(page - 1)
								}}
								aria-disabled={page <= 1}
								className={page <= 1 ? "pointer-events-none opacity-50" : ""}
							/>
						</PaginationItem>

						{paginationItems.map((item, index) => {
							if (item === "...") {
								return (
									<PaginationItem key={`ellipsis-${item.toString()}-${index}`}>
										<PaginationEllipsis />
									</PaginationItem>
								)
							}

							return (
								<PaginationItem key={item}>
									<PaginationLink
										href="#"
										onClick={(e) => {
											e.preventDefault()
											handlePageChange(item as number)
										}}
										isActive={page === item}
									>
										{item}
									</PaginationLink>
								</PaginationItem>
							)
						})}

						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault()
									if (page < totalPages) handlePageChange(page + 1)
								}}
								aria-disabled={page >= totalPages}
								className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}

			{!hasResults && !isLoading && (
				<div className="text-center py-8 text-muted-foreground">
					No orders found{currentSearch ? ` for "${currentSearch}"` : ""}
				</div>
			)}
		</div>
	)
}
