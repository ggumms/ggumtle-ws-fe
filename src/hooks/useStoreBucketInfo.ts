import { useEffect } from 'react'
import { useDetailBucketStore } from '../stores/detailStore'
import { IBucketInfo } from '../interfaces'

const useStoreBucketInfo = (bucketInfo: IBucketInfo | undefined) => {
	const { setDetailBucket, resetDetailBucket } = useDetailBucketStore()
	useEffect(() => {
		resetDetailBucket()
		if (bucketInfo) {
			setDetailBucket(bucketInfo)
		}
		return () => {
			resetDetailBucket()
		}
	}, [bucketInfo])
}

export default useStoreBucketInfo
