import { IKakaoLoginRes } from '../../types/auth'
import { instance as tokenInstance } from '../../utilities/apis/tokenAxios'

export const getKakaoLogin = async (code: string): Promise<IKakaoLoginRes> => {
	try {
		const kakaoRes = await tokenInstance.get(`auth/kakao?code=${code}`)
		return kakaoRes.data
	} catch (error) {
		console.error(error)
		throw error
	}
}
