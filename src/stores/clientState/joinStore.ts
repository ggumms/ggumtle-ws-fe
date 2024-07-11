import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CategoryType, selectedInfoType } from '../../interfaces'
import { defaultCategories } from '../../utilities/utils/category'
import { LoginTokenType } from '../../types/auth'

interface IJoinContentStore {
	content: 'additionalInfo' | 'survey'
	setContent: (content: 'additionalInfo' | 'survey') => void
}
export const useJoinContentStore = create<IJoinContentStore>()(
	devtools((set) => ({
		content: 'additionalInfo',
		setContent: (content) => set(() => ({ content })),
	}))
)

interface IJoinInfoStore {
	joinType: LoginTokenType
	setJoinType: (joinType: LoginTokenType) => void
	code: string
	setCode: (code: string) => void
	nickname: string
	setNickname: (nickname: string) => void
	isInitialNicknameDuplicate: boolean
	setIsInitialNicknameDuplicate: (isInitialNicknameDuplicate: boolean) => void
	image: string | null
	setImage: (image: string | null) => void
	surveyResult: selectedInfoType
	addSurvey: (survey: CategoryType) => void
	removeSurvey: (survey: CategoryType) => void
}

export const useJoinInfoStore = create<IJoinInfoStore>()(
	devtools((set) => ({
		// joinType info
		joinType: 'kakao',
		setJoinType: (joinType: LoginTokenType) => set(() => ({ joinType })),
		code: '',
		setCode: (code: string) => set(() => ({ code })),

		// About Additional Info
		nickname: '',
		setNickname: (nickname: string) => set(() => ({ nickname })),
		isInitialNicknameDuplicate: false,
		setIsInitialNicknameDuplicate: (isInitialNicknameDuplicate: boolean) =>
			set(() => ({ isInitialNicknameDuplicate })),
		image: null,
		setImage: (image: string | null) => set(() => ({ image })),

		// About Survey
		surveyResult: { ...defaultCategories },
		addSurvey: (survey) =>
			set((state) => ({
				surveyResult: { ...state.surveyResult, [survey]: true },
			})),
		removeSurvey: (survey) =>
			set((state) => ({
				surveyResult: { ...state.surveyResult, [survey]: false },
			})),
	}))
)
