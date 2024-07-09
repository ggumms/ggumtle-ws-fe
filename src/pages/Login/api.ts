import { instance } from '../../axios'

export const getKakaoLogin = async (code: string): Promise<'success' | 'fail'> => {
	try {
		const kakaoRes = await instance.get(`auth/kakao?code=${code}`)
		return kakaoRes.status === 200 ? 'success' : 'fail'
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const logout = async () => {
	try {
		const logoutRes = await instance.get('/auth/logout')
		return logoutRes
	} catch (error) {
		console.error(error)
		throw error
	}
}
