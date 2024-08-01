import { useBucketAddStore } from '../../../../stores/clientState/bucketAddStore'
import NavigateButton from '../../../../component/NavigateButton'

const MainNextButton = () => {
	const { bucketColor, bucketTitle, timeCapsule } = useBucketAddStore()
	const isDisable = !(bucketColor && bucketTitle && timeCapsule)

	return (
		<>
			<NavigateButton path="/bucket/write/additional" isDisable={isDisable}>
				다음
			</NavigateButton>
		</>
	)
}

export default MainNextButton
