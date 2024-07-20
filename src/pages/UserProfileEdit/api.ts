import { tokenInstance, tokenMultipartInstance } from '../../utilities/apis/tokenAxios'

export const putUserProfile = async (profileFormData: FormData): Promise<boolean> => {
	const editRes = await tokenMultipartInstance.put('/change/userinfo', profileFormData)
	return editRes.data.result
}

export const postLogout = async (): Promise<boolean> => {
	try {
		const logoutRes = await tokenInstance.post('/logout')
		return logoutRes.status === 200
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const postResign = async (): Promise<boolean> => {
	try {
		const resignRes = await tokenInstance.post('/leave')
		return resignRes.status === 200
	} catch (error) {
		console.error(error)
		throw error
	}
}
