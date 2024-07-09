import { tokenMultipartInstance } from '../../utilities/apis/axios'

export const putUserProfile = async (profileFormData: FormData): Promise<boolean> => {
	const editRes = await tokenMultipartInstance.put('/user/self-info', profileFormData)
	return editRes.data.result
}
