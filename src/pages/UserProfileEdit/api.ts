import { tokenInstance as tokenServerTokenInstance } from '../../utilities/apis/tokenAxios'
import { tokenMultipartInstance as userServerMultipartInstance } from '../../utilities/apis/userAxios'

export const putUserProfile = async (profileFormData: FormData): Promise<boolean> => {
	const editRes = await userServerMultipartInstance.patch('/change/user', profileFormData)
	return editRes.data.result
}

export const postLogout = async (): Promise<boolean> => {
	try {
		const logoutRes = await tokenServerTokenInstance.get('/logout')
		return logoutRes.status === 200
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const postResign = async (): Promise<boolean> => {
	try {
		const resignRes = await tokenServerTokenInstance.delete('/leave')
		return resignRes.status === 200
	} catch (error) {
		console.error(error)
		throw error
	}
}
