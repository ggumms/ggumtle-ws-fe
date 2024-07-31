import NavigateButton from '../../../../component/NavigateButton'
import { useBucketStore } from '../../../../stores/clientState/bucketAddStore'

const LocationNextButton = () => {
	const { latitude, longitude } = useBucketStore()
	const isDisable = latitude === null || longitude === null

	return (
		<>
			<NavigateButton path="/bucket/write/additional" isDisable={isDisable}>
				다음
			</NavigateButton>
		</>
	)
}

export default LocationNextButton
