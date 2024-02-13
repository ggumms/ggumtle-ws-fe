import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'

export const getUserStats = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	return await instance
		.get(`user/stats/${userId}`)
		.then((response) => response.data.userStats)
		.catch((e) => console.log(e))
}

export const getTimeline = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId, doing, done, review, page, size] = queryKey
	return await instance
		.get('timeline', {
			params: {
				userId: userId,
				doing: doing,
				done: done,
				review: review,
				page: page,
				size: size,
			},
		})
		.then((response) => response.data.timeline)
		.catch((e) => console.log(e))
}

interface IFollow {
	userId: number
	isFollowing: boolean
}
export const updateFollow = async ({ userId, isFollowing }: IFollow) => {
	return await instance
		.put('user/follow', {
			isFollowing: isFollowing,
			followee: userId,
		})
		.then((response) => response.data)
}
