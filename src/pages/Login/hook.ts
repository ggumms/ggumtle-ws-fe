import { useEffect } from 'react'
import { useRouter } from '../../hooks/useRouter'
import { isLoginTokenType } from '../../utilities/utils/typeFilter'
import { getToken } from './service'

export type LoginTokenType = 'kakao'

export const useDoLogin = async (loginType: string | undefined, code: string | null) => {
	const { routeTo } = useRouter()

	const doLogin = async (loginType: LoginTokenType, code: string) => {
		// 1. 로그인 api 요청(browser -> spring server)이 성공하면, access & refresh token이 담기게 된다.
		const loginRes = await getToken(loginType, code)

		// 2. 로그인이 성공하면 메인 페이지로 이동한다.
		if (loginRes === 'fail') {
			alert('로그인 실패')
			return
		}

		routeTo('/')
	}

	useEffect(() => {
		if (loginType && code && isLoginTokenType(loginType)) {
			doLogin(loginType, code)
		}
	}, [loginType])
}
