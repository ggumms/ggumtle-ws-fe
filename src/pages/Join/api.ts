import { instance, multipartInstance } from '../../axios'
import { CategoryType } from '../../interfaces'

// create User Profile
export const postUserProfile = async (profileFormData: FormData): Promise<'success' | 'fail'> => {
	const editRes = await multipartInstance.put('/user/profile', profileFormData)
	return editRes.data
}

export const getNameIsDuplicated = async (name: string): Promise<boolean> => {
	const duplicateRes = await instance.post('/user/duplicate', { name })
	return duplicateRes.data
}

export const postJoin = async (joinInfo: {
	nickname: string
	image: string | null
	surveyResult: CategoryType[]
}): Promise<'success' | 'fail'> => {
	const joinRes = await instance.post('/user/join', joinInfo)
	return joinRes.data ? 'success' : 'fail'
}
