import { instance } from '../../axios'
import { IKakaoLoginRes } from '../../types/auth'

export const getKakaoLogin = async (code: string): Promise<IKakaoLoginRes> => {
	try {
		const kakaoRes = await instance.get(`auth/kakao?code=${code}`)
		return kakaoRes.data
	} catch (error) {
		console.error(error)
		throw error
	}
}
