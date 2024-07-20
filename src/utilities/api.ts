import axios from 'axios'
import { IBucketInfo, IMyUserInfo } from '../interfaces'
import { QueryFunctionContext } from '@tanstack/query-core'
import { tokenInstance as userServerTokenInstance } from './apis/userAxios'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
})

instance.interceptors.request.use(
	(config) => {
		config.headers['Content-Type'] = 'application/json'
		config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_USER1_TOKEN}`

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// :: User
// - Get current user request
interface IGetUserInfoRes {
	nickname: string
	profilePicture: string | null
	myBucketId: number | null
}
export const getMyInfo = async (): Promise<IMyUserInfo> => {
	const userRes = await userServerTokenInstance.get<IGetUserInfoRes>(`/private/user`)

	return {
		nickname: userRes.data.nickname,
		profileImageUrl: userRes.data.profilePicture,
		titleBucketId: userRes.data.myBucketId,
	}
}

// :: Bucket
// - Get bucket info request
interface IGetBucketInfoRes {
	result: string
	bucketInfo: IBucketInfo
}
export const getBucketInfo = async ({ queryKey }: QueryFunctionContext): Promise<IBucketInfo> => {
	const [, id] = queryKey
	const bucketRes = await instance.get<IGetBucketInfoRes>(`/bucket/info/${id}`)
	return bucketRes.data.bucketInfo
}
