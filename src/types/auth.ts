export type LoginTokenType = 'kakao'
export interface IKakaoLoginRes {
	login: boolean
	hasAccount: boolean
	nickname: string
	nicknameDuplicate: boolean
}
