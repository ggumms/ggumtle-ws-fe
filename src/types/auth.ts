export type LoginTokenType = 'kakao'
export interface IKakaoLoginRes {
	kakaoLoginResult: 'success' | 'fail'
	hasAccount: boolean
	nickname: string
	nicknameDuplicate: boolean
}
