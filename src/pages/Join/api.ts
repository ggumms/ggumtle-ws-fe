import { instance, multipartInstance } from '../../axios'

// create User Profile
export const postUserProfile = async (profileFormData: FormData): Promise<'success' | 'fail'> => {
	const editRes = await multipartInstance.put('/user/profile', profileFormData)
	return editRes.data
}

export const getNameIsDuplicated = async (name: string): Promise<boolean> => {
	const duplicateRes = await instance.post('/user/duplicate', { name })
	return duplicateRes.data
}
