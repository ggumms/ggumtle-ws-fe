import { useEffect } from 'react'
import { useRouter } from '../../hooks/useRouter'
import { isLoginTokenType } from '../../utilities/utils/typeFilter'
import { getToken } from './service'
import { useJoinInfoStore } from '../../stores/clientState/joinStore'

export type LoginTokenType = 'kakao'

export const useDoLogin = async (loginType: string | undefined, code: string | null) => {
	const { setNickname, setIsInitialNicknameDuplicate } = useJoinInfoStore()
	const { routeTo } = useRouter()

	const doLogin = async (loginType: LoginTokenType, code: string) => {
		// 1. 로그인 api 요청(browser -> spring server)이 성공하면, access & refresh token이 담기게 된다.
		const loginRes = await getToken(loginType, code)

		// 2. 로그인이 성공하면 회원가입된 유저인지 판별하고 카카오 닉네임을 joinInfoStore에 저장하고 메인 페이지로 이동한다.
		if (!loginRes.login) {
			alert('로그인 실패')
			return
		}

		if (loginRes.hasAccount) {
			routeTo('/')
		}

		setNickname(loginRes.nickname)
		setIsInitialNicknameDuplicate(loginRes.nicknameDuplicate)
		routeTo('/join')
	}

	useEffect(() => {
		if (loginType && code && isLoginTokenType(loginType)) {
			doLogin(loginType, code)
		}
	}, [loginType])
}
