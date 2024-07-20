import { useRouter } from '../../hooks/useRouter'
import { getToken } from './service'
import { useJoinInfoStore } from '../../stores/clientState/joinStore'

export type LoginTokenType = 'kakao'

export const useDoLogin = () => {
	const { setNickname, setIsInitialNicknameDuplicate } = useJoinInfoStore()
	const { routeTo } = useRouter()

	const doLogin = async (loginType: LoginTokenType, code: string) => {
		// 1. 로그인 api 요청(browser -> spring server)이 성공하면, access & refresh token이 담기게 된다.
		const loginRes = await getToken(loginType, code)

		// 2. 로그인이 성공하면 회원가입된 유저인지 판별
		if (loginRes.kakaoLoginResult === 'fail') {
			alert('로그인 실패')
			return
		}

		// 기존 유저라면 메인 페이지로 이동한다.
		if (loginRes.hasAccount) {
			routeTo('/')
		}

		// 회원가입이 필요한 유저라면 카카오 닉네임을 joinInfoStore에 저장하고 가입 페이지로 이동한다.
		setNickname(loginRes.nickname)
		setIsInitialNicknameDuplicate(loginRes.nicknameDuplicate)
		routeTo('/join')
	}

	return { doLogin }
}
