import type { SalesData } from "@/interfaces/dashboard"

const CHART_COLORS = ["#9747FF", "#E5844C", "#E550A4"]

/**
 * Transforms weekly sales data into a format suitable for charting.
 *
 * @param data - A record where the key is a string representing the day of the week (1-7) and the value is a SalesData object.
 * @returns An array of objects, each representing a day with its sales amount and corresponding color.
 *
 * The first two entries are "Today" and "Yesterday", followed by the remaining days of the week in reverse chronological order.
 */
export function transformWeeklyData(data: Record<string, SalesData>) {
	const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	const result = []

	// Add today and yesterday first
	result.push({
		day: "Today",
		amount: data["7"]?.total || 0,
		color: CHART_COLORS[0],
	})

	result.push({
		day: "Yesterday",
		amount: data["6"]?.total || 0,
		color: CHART_COLORS[1],
	})

	// Add the remaining days
	for (let i = 5; i >= 1; i--) {
		const dayIndex = (new Date().getDay() - (7 - i) + 7) % 7
		result.push({
			day: weekDays[dayIndex],
			amount: data[i]?.total || 0,
			color: CHART_COLORS[(7 - i) % CHART_COLORS.length],
		})
	}

	return result
}

/**
 * Transforms yearly sales data into a format suitable for charting.
 *
 * @param data - A record where the key is a string representing the month (1-12) and the value is a SalesData object.
 * @returns An array of objects, each representing a month with its sales amount and corresponding color.
 *
 * The first two entries are "This month" and "Last month", followed by the remaining months in reverse chronological order.
 */
export function transformYearlyData(data: Record<string, SalesData>) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]
	const result = []

	// Add this month and last month first
	const currentMonth = new Date().getMonth() + 1 // 1-12

	result.push({
		day: "This month",
		amount: data[currentMonth]?.total || 0,
		color: CHART_COLORS[0],
	})

	const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1
	result.push({
		day: "Last month",
		amount: data[lastMonth]?.total || 0,
		color: CHART_COLORS[1],
	})

	// Add remaining months in reverse chronological order
	let monthCount = 2
	for (let i = currentMonth - 2; monthCount < 12; i--) {
		const monthIndex = i <= 0 ? i + 12 : i
		result.push({
			day: months[monthIndex - 1],
			amount: data[monthIndex]?.total || 0,
			color: CHART_COLORS[monthCount % CHART_COLORS.length],
		})
		monthCount++
	}

	return result
}
