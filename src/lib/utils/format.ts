import type { SalesData } from "@/interfaces/dashboard"

/**
 * Formats a given amount into a string representation with appropriate units.
 *
 * If the amount is greater than or equal to 1,000,000, it formats the amount in millions (M)
 * with three decimal places.
 *
 * If the amount is less than 1,000,000, it formats the amount in thousands (K)
 * with two decimal places.
 *
 * @param {number} amount - The amount to be formatted.
 * @returns {string} The formatted amount with appropriate units.
 */
export function formatAmount(amount: number): string {
	if (amount >= 1000000) {
		return `$${(amount / 1000000).toFixed(3)}M`
	}
	return `$${(amount / 1000).toFixed(2)}K`
}

/**
 * Calculates the total number of orders and the total sales amount from the given sales data.
 *
 * The function iterates over the sales data and sums up the orders and total sales.
 *
 * @param {Record<string, SalesData>} data - An object where keys are strings and values are SalesData objects.
 * @returns {{ orders: number, total: number }} An object containing the total number of orders and the total sales amount.
 */
export function calculateTotals(data: Record<string, SalesData>): {
	orders: number
	total: number
} {
	return Object.values(data).reduce(
		(acc, curr) => ({
			orders: acc.orders + curr.orders,
			total: acc.total + curr.total,
		}),
		{ orders: 0, total: 0 }
	)
}

/**
 * Formats a number for display on the Y-axis of a chart.
 *
 * @param value - The number to format.
 * @returns A string representing the formatted number.
 *
 * If the value is 0, it returns "$0". If the value is 1,000,000 or greater, it returns the value in millions (e.g., "$1M"). Otherwise, it returns the value in thousands (e.g., "$1K").
 */
export function formatYAxis(value: number): string {
	if (value === 0) return "$0"
	if (value >= 1000000) return `$${value / 1000000}M`
	return `$${value / 1000}K`
}
