import { CategoryType } from '../../interfaces'
import { multipartInstance as tokenServerMultipartInstance } from '../../utilities/apis/tokenAxios'
import {
	instance as userServerInstance,
	multipartInstance as userServerMultipartInstance,
} from '../../utilities/apis/userAxios'
import { LoginTokenType } from '../Login/hook'

// create User Profile
export const postUserProfile = async (profileFormData: FormData): Promise<'success' | 'fail'> => {
	const editRes = await userServerMultipartInstance.put('/user/profile', profileFormData)
	return editRes.data
}

export const getNameIsDuplicated = async (name: string): Promise<boolean> => {
	const duplicateRes = await userServerInstance.get(`/public/duplicate-nickname?nickname=${name}`)
	return duplicateRes.data
}

export const postJoin = async (joinInfo: {
	joinType: LoginTokenType
	code: string
	nickname: string
	image: string | null
	surveyResult: CategoryType[]
}): Promise<'success' | 'fail'> => {
	const joinRes = await tokenServerMultipartInstance.post('/join', joinInfo)
	return joinRes.data ? 'success' : 'fail'
}
