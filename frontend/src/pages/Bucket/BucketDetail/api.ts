import { QueryFunctionContext } from '@tanstack/query-core'
import { instance } from '../../../axios'
import { IBucketInfo, ICommentListInfo, UserInfoType } from '../../../interfaces'
import { IReactionInfo, ReactionType } from '../../../types/bucket'
// Todo : api 함수 이름들 다 fetch 들어가도록 수정

// :: BucketDetail
interface IGetBucketInfoRes {
	result: string
	bucketInfo: IBucketInfo
}
interface IGetUserInfoRes {
	result: string
	userInfo: UserInfoType
}
interface IBucketDetailInfo {
	bucketInfo: IBucketInfo
	userInfo: UserInfoType
}
export const getBucketDetailInfo = async ({
	queryKey,
}: QueryFunctionContext): Promise<IBucketDetailInfo> => {
	const [, id] = queryKey
	const bucketRes = await instance.get<IGetBucketInfoRes>(`bucket/info/${id}`)
	const { writerId } = bucketRes.data.bucketInfo
	const userRes = await instance.get<IGetUserInfoRes>(`user/${writerId}`)
	return { bucketInfo: bucketRes.data.bucketInfo, userInfo: userRes.data.userInfo }
}

// :: Reaction
// - Get Request
interface IGetReactionRes {
	result: string
	bucketReaction: IReactionInfo
}
export const getBucketReaction = async ({
	queryKey,
}: QueryFunctionContext): Promise<IReactionInfo> => {
	const [, id] = queryKey
	const reactionRes = await instance.get<IGetReactionRes>(`bucket/reaction/${id}`)
	return reactionRes.data.bucketReaction
}
// - Post Request
interface IPostReactionRes {
	result: string
	userReaction: ReactionType
}
export const postBucketReaction = async (
	id: string,
	reactionType: ReactionType
): Promise<'success' | 'fail'> => {
	const reactionRes = await instance.post<IPostReactionRes>(`bucket/reaction/`, {
		bucketId: id,
		userReaction: reactionType,
	})
	if (reactionRes.data.result === 'ok' && reactionRes.data.userReaction === reactionType) {
		return 'success'
	}
	return 'fail'
}

// :: Comment
// - Get Request
//   - QueryFunctionContext에서 pageParam을 사용하기 위해 제네릭 적용
interface IGetCommentRes {
	result: string
	bucketCommentList: { commentList: ICommentListInfo }
}
export const getBucketCommentList = async ({
	queryKey,
	pageParam,
}: QueryFunctionContext<string[], number>): Promise<ICommentListInfo> => {
	const [, id] = queryKey
	const fetchSize = import.meta.env.VITE_COMMENT_PAGE_SIZE

	const commentRes = await instance.get<IGetCommentRes>(
		`comment/bucket/${id}?page=${pageParam}&size=${fetchSize}`
	)
	// console.log(commentRes.data.bucketCommentList.commentList)
	return commentRes.data.bucketCommentList.commentList
}
