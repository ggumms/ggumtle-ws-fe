const KAKAO_AUTH_BASE_URL = 'https://kauth.kakao.com/oauth/authorize	'
const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI

export const KAKAO_URL = `${KAKAO_AUTH_BASE_URL}
					?response_type=code
					&client_id=${REST_API_KEY}
					&redirect_uri=${REDIRECT_URI}
				`
