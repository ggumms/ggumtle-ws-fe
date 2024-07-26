import { IKakaoLoginRes } from '../../types/auth'
import { tokenInstance as tokenServerTokenInstance } from '../../utilities/apis/tokenAxios'

export const getKakaoLogin = async (code: string): Promise<IKakaoLoginRes> => {
	try {
		const kakaoRes = await tokenServerTokenInstance.get(`auth/kakao?code=${code}`)
		return kakaoRes.data
	} catch (error) {
		console.error(error)
		throw error
	}
}
