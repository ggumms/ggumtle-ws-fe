import { tokenMultipartInstance as tokenServerTokenMultipartInstance } from '../../utilities/apis/tokenAxios'
import { instance as userServerInstance } from '../../utilities/apis/userAxios'

export const getNameIsDuplicated = async (name: string): Promise<boolean> => {
	const duplicateRes = await userServerInstance.get(`/public/duplicate-nickname?nickname=${name}`)
	return duplicateRes.data
}

export const postJoin = async (joinFormData: FormData): Promise<'success' | 'fail'> => {
	const joinRes = await tokenServerTokenMultipartInstance.post('/join', joinFormData)
	return joinRes.status === 200 ? 'success' : 'fail'
}
