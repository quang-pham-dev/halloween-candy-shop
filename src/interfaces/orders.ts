import type { Product } from "./product"

export interface OrdersData {
	orders: Order[]
	page: number
	total: number
}

export interface Order {
	created_at: string
	currency: string
	customer: Customer
	id: string
	product: Product
	status: "delivered" | "shipped" | "processing"
	total: number
}

export interface Customer {
	address: Address
	id: string
	name: string
	surname: string
}

export interface Address {
	city: string
	street: string
	zipcode: string
}
