import { BASE_URL } from "@/constants/api"
import axios from "axios"

export const axiosInstance = axios.create({ baseURL: BASE_URL })

export const api = axios.create({
	baseURL: BASE_URL,
})

api.interceptors.request.use(
	(config) => {
		// Get token from localStorage
		const token = localStorage.getItem("access_token")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	(res) => {
		return res
	},
	async (err) => {
		const originalConfig = err.config

		if (originalConfig.url !== "/login" && err.response && err.response.status === 401 && !originalConfig._retry) {
			try {
				const refreshToken = localStorage.getItem("refresh_token")
				if (refreshToken) {
					// Send a POST request to refresh the token
					const result = await axios.post(
						`${BASE_URL}/refresh`,
						{
							refresh_token: refreshToken,
						},
						{
							headers: {
								Authorization: `Bearer ${refreshToken}`,
							},
						}
					)

					originalConfig._retry = true
					const access_token = result?.data.access_token
					if (access_token) {
						localStorage.setItem("access_token", access_token)
						originalConfig._retry = true
						return api(originalConfig)
					}
					// Access token not returned from refreshTokenService
					throw new Error("Access token not returned")
				}
				// No refresh token available
				throw new Error("Refresh token not found")
			} catch (error) {
				return Promise.reject(error)
			}
		}

		return Promise.reject(err)
	}
)
