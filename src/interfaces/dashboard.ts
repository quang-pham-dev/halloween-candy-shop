import type { Product } from "./product"

export interface DashboardData {
	dashboard: Dashboard
}

export interface Dashboard {
	bestsellers: Bestseller[]
	sales_over_time_week: SalesOverTimeWeek
	sales_over_time_year: SalesOverTimeYear
}

export interface Bestseller {
	product: Product
	revenue: number
	units: number
}

export type SalesOverTimeWeek = {
	[week: string]: {
		orders: number
		total: number
	}
}

export type SalesOverTimeYear = {
	[month: string]: {
		orders: number
		total: number
	}
}

export interface SalesData {
	orders: number
	total: number
}
