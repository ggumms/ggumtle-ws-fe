export enum TimeUnitType {
	min = '분',
	hour = '시간',
	week = '주',
	month = '달',
	year = '년',
}

export type AlarmType =
	| 'follow'
	| 'bucketReaction'
	| 'reviewReaction'
	| 'join'
	| 'remind'
	| 'followBucket'
	| 'followReview'
	| 'followBucketAchieve'
	| 'followCommentReview'
	| 'commentBucket'

export interface IAlarm {
	alarmId: number
	sender: string
	senderProfileImage: string
	timeUnit: 'min' | 'hour' | 'week' | 'month' | 'year'
	time: number
	isRead: boolean
	context: string | null
	type: AlarmType
	dataId: number
}
