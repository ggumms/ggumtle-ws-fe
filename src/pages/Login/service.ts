import { getKakaoLogin } from './api'
import { IKakaoLoginRes, LoginTokenType } from '../../types/auth'

export const getToken = async (
	loginType: LoginTokenType,
	code: string
): Promise<IKakaoLoginRes> => {
	switch (loginType) {
		case 'kakao':
			return await getKakaoLogin(code)
	}
}
