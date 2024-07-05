import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Todo: 선호도 설문조사 관련 상태 추가
interface IJoinInfoStore {
	nickname: string
	setNickname: (nickname: string) => void
	image: string | null
	setImage: (image: string | null) => void
}

// Todo: 선호도 설문조사 관련 상태 추가
export const useJoinInfoStore = create<IJoinInfoStore>()(
	devtools((set) => ({
		nickname: '',
		setNickname: (nickname: string) => set(() => ({ nickname })),
		image: null,
		setImage: (image: string | null) => set(() => ({ image })),
	}))
)
