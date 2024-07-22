// :: Production Axios Instance
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// :: create Instance
const baseConfig = {
	baseURL: import.meta.env.VITE_TOKEN_SERVER_URL,
	timeout: 100 * 1000, // 100초
}

const instance = axios.create(baseConfig)
const tokenInstance = axios.create(baseConfig)
const multipartInstance = axios.create(baseConfig)
const tokenMultipartInstance = axios.create(baseConfig)

// :: interceptor setting
// 1. request
// - 요청이 전달되기 전에 작업 수행
const requestPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	config.headers['Content-Type'] = 'application/json'
	config.headers['ngrok-skip-browser-warning'] = true
	return config
}
const tokenReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	config.headers['Content-Type'] = 'application/json'
	config.withCredentials = true

	return config
}
const multipartReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	config.headers['Content-Type'] = 'multipart/form-data'

	return config
}
const tokenMultipartReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	config.headers['Content-Type'] = 'multipart/form-data'
	config.withCredentials = true

	return config
}
// 요청 오류가 있는 작업 수행
const requestError = (error: unknown): Promise<never> => {
	return Promise.reject(error)
}

// 2. response
// - 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
// - 응답 데이터가 있는 작업 수행
const resolveResponse = (response: AxiosResponse): AxiosResponse => response
// - 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
// - 응답 오류가 있는 작업 수행
const responseError = (error: AxiosError): Promise<never> => {
	console.log(error)
	return Promise.reject(error)
}

instance.interceptors.request.use(requestPrev, requestError)
instance.interceptors.response.use(resolveResponse, responseError)

multipartInstance.interceptors.request.use(multipartReqPrev, requestError)
multipartInstance.interceptors.response.use(resolveResponse, responseError)

tokenInstance.interceptors.request.use(tokenReqPrev, requestError)
tokenInstance.interceptors.response.use(resolveResponse, responseError)

tokenMultipartInstance.interceptors.request.use(tokenMultipartReqPrev, requestError)
tokenMultipartInstance.interceptors.response.use(resolveResponse, responseError)

// :: axios Error 여부 판단
const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError => {
	return axios.isAxiosError(err)
}

export { instance, tokenInstance, multipartInstance, tokenMultipartInstance, isAxiosError }
