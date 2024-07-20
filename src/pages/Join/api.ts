import { CategoryType } from '../../interfaces'
import { instance as tokenInstance } from '../../utilities/apis/tokenAxios'
import {
	instance as userInstance,
	multipartInstance as userMultipartInstance,
} from '../../utilities/apis/userAxios'
import { LoginTokenType } from '../Login/hook'

// create User Profile
export const postUserProfile = async (profileFormData: FormData): Promise<'success' | 'fail'> => {
	const editRes = await userMultipartInstance.put('/user/profile', profileFormData)
	return editRes.data
}

export const getNameIsDuplicated = async (name: string): Promise<boolean> => {
	const duplicateRes = await userInstance.post('/public/duplicate-nickname', { name })
	return duplicateRes.data
}

export const postJoin = async (joinInfo: {
	joinType: LoginTokenType
	code: string
	nickname: string
	image: string | null
	surveyResult: CategoryType[]
}): Promise<'success' | 'fail'> => {
	const joinRes = await tokenInstance.post('/join', joinInfo)
	return joinRes.data ? 'success' : 'fail'
}
