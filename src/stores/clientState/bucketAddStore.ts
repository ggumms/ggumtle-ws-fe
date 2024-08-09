import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ColorType, IBucketInfo, PeriodType } from '../../interfaces'
import { defaultCategories } from '../../utilities/utils/category'
import { immer } from 'zustand/middleware/immer'
import { startOfToday } from 'date-fns'
import {
	IBucketColorSlice,
	IBucketImageSlice,
	IBucketTitleSlice,
	ICategorySlice,
	IIsPrivateSlice,
	IPeriodSlice,
	IStartDateSlice,
	ITimeCapsuleSlice,
	IResetStateSlice,
	IAddStateSlice,
	ImageUrlType,
	ILocationSlice,
	ILocationInfo,
} from '../../types/bucket'

type SlicePattern<T> = StateCreator<
	T,
	[['zustand/immer', never], ['zustand/devtools', never]],
	[],
	T
>

// immer 사용으로 인한 return문 제거
const createSelectedCategorySlice: SlicePattern<ICategorySlice> = (set) => ({
	selectedInfo: { ...defaultCategories },
	addCategory: (selectedItemName) =>
		set((state) => {
			state.selectedInfo[selectedItemName] = true
		}),
	removeCategory: (selectedItemName) =>
		set((state) => {
			state.selectedInfo[selectedItemName] = false
		}),
	resetCategory: () =>
		set(() => {
			return { selectedInfo: { ...defaultCategories } }
		}),
})

const createBucketColorSlice: SlicePattern<IBucketColorSlice> = (set) => ({
	bucketColor: null,
	changeBucketColor: (color: ColorType) =>
		set(() => {
			return { bucketColor: color }
		}),
	resetBucketColor: () =>
		set(() => {
			return { bucketColor: null }
		}),
})

const createBucketTitleSlice: SlicePattern<IBucketTitleSlice> = (set) => ({
	bucketTitle: '',
	changeBucketTitle: (text: string) =>
		set(() => {
			return { bucketTitle: text }
		}),
	resetBucketTitle: () =>
		set(() => {
			return { bucketTitle: '' }
		}),
})

const createTimeCapsuleSlice: SlicePattern<ITimeCapsuleSlice> = (set) => ({
	timeCapsule: '',
	changeTimeCapsule: (text: string) =>
		set(() => {
			return { timeCapsule: text }
		}),
	resetTimeCapsule: () =>
		set(() => {
			return { timeCapsule: '' }
		}),
})

const createBucketImageSlice: SlicePattern<IBucketImageSlice> = (set) => ({
	bucketImage: null,
	changeBucketImage: (image: File | ImageUrlType | null) =>
		set(() => {
			return { bucketImage: image }
		}),
	resetBucketImage: () =>
		set(() => {
			return { bucketImage: null }
		}),
})

const createStartDateSlice: SlicePattern<IStartDateSlice> = (set) => ({
	createdDate: startOfToday(),
	changeCreatedDate: (date: Date | string) =>
		set(() => {
			return { createdDate: date }
		}),
	resetCreatedDate: () =>
		set(() => {
			return { createdDate: startOfToday() }
		}),
})

const createPeriodSlice: SlicePattern<IPeriodSlice> = (set) => ({
	period: 'twoWeeks',
	changePeriod: (period: PeriodType) =>
		set(() => {
			return { period: period }
		}),
	resetPeriod: () =>
		set(() => {
			return { period: 'twoWeeks' }
		}),
})

const createIsPrivateSlice: SlicePattern<IIsPrivateSlice> = (set) => ({
	isPrivate: false,
	changeIsPrivate: (privateValue: boolean) =>
		set(() => {
			return { isPrivate: privateValue }
		}),
	resetIsPrivate: () =>
		set(() => {
			return { isPrivate: false }
		}),
})

const createLocationSlice: SlicePattern<ILocationSlice> = (set) => ({
	locationInfo: {
		latitude: null,
		longitude: null,
		infoWindowContent: '',
		address: '',
		locationName: '',
	},

	changeLocationInfo: (newLocationInfo: Partial<ILocationInfo>) =>
		set((state) => {
			Object.keys(newLocationInfo).forEach((key) => {
				const typedKey = key as keyof ILocationInfo
				const newValue = newLocationInfo[typedKey]
				if (key in state.locationInfo) {
					if (newValue !== undefined) {
						switch (typedKey) {
							case 'latitude':
							case 'longitude':
								typeof newValue === 'number' && (state.locationInfo[typedKey] = newValue)
								break
							case 'infoWindowContent':
							case 'address':
							case 'locationName':
								typeof newValue === 'string' && (state.locationInfo[typedKey] = newValue)
								break
						}
					}
				}
			})
		}),
	resetLocationInfo: () => {
		set(() => {
			return {
				locationInfo: {
					latitude: null,
					longitude: null,
					infoWindowContent: '',
					address: '',
					locationName: '',
				},
			}
		})
	},
})

const addBucketInfoSlices: StateCreator<
	ICategorySlice &
		IBucketColorSlice &
		IBucketTitleSlice &
		ITimeCapsuleSlice &
		IBucketImageSlice &
		IStartDateSlice &
		IPeriodSlice &
		IIsPrivateSlice &
		IAddStateSlice &
		ILocationSlice,
	[['zustand/immer', never], ['zustand/devtools', never]],
	[],
	IAddStateSlice
> = (_, get) => ({
	addBucketState: (bucketInfo: IBucketInfo) => {
		get().resetCategory() // 객체 형식이기 때문에 reset이 필요

		bucketInfo.category.forEach((category) => get().addCategory(category))
		get().changeBucketColor(bucketInfo.color)
		get().changeBucketTitle(bucketInfo.title)
		get().changeTimeCapsule(bucketInfo.timeCapsule ? bucketInfo.timeCapsule : '')
		get().changeBucketImage(bucketInfo.bucketPicture)
		get().changeCreatedDate(bucketInfo.createdDate)
		get().changePeriod(bucketInfo.reminderDate)
		get().changeIsPrivate(bucketInfo.isPrivate)
		get().changeLocationInfo({
			longitude: bucketInfo.longitude,
			latitude: bucketInfo.latitude,
			address: bucketInfo.address ? bucketInfo.address : '',
			locationName: '',
		})
	},
})

const resetAllSlices: StateCreator<
	ICategorySlice &
		IBucketColorSlice &
		IBucketTitleSlice &
		ITimeCapsuleSlice &
		IBucketImageSlice &
		IStartDateSlice &
		IPeriodSlice &
		IIsPrivateSlice &
		IResetStateSlice &
		ILocationSlice,
	[['zustand/immer', never], ['zustand/devtools', never]],
	[],
	IResetStateSlice
> = (_, get) => ({
	resetAllState: () => {
		get().resetCategory()
		get().resetBucketColor()
		get().resetBucketTitle()
		get().resetTimeCapsule()
		get().resetBucketImage()
		get().resetCreatedDate()
		get().resetPeriod()
		get().resetIsPrivate()
		get().resetLocationInfo()
	},
})

// 버킷 정보를 관리하는 전역 State
// - 버킷 생성
// - 상세 버킷 조회
export const useBucketAddStore = create<
	ICategorySlice &
		IBucketColorSlice &
		IBucketTitleSlice &
		ITimeCapsuleSlice &
		IBucketImageSlice &
		IStartDateSlice &
		IPeriodSlice &
		IIsPrivateSlice &
		IResetStateSlice &
		IAddStateSlice &
		ILocationSlice
>()(
	devtools(
		immer((...a) => ({
			...createSelectedCategorySlice(...a),
			...createBucketColorSlice(...a),
			...createBucketTitleSlice(...a),
			...createTimeCapsuleSlice(...a),
			...createBucketImageSlice(...a),
			...createStartDateSlice(...a),
			...createPeriodSlice(...a),
			...createIsPrivateSlice(...a),
			...resetAllSlices(...a),
			...addBucketInfoSlices(...a),
			...createLocationSlice(...a),
		}))
	)
)
