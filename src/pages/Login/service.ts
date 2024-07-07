import { getKakaoLogin } from './api'
import { LoginTokenType } from '../../types/auth'

export const getToken = async (
	loginType: LoginTokenType,
	code: string
): Promise<'success' | 'fail'> => {
	switch (loginType) {
		case 'kakao':
			return await getKakaoLogin(code)
	}
}
