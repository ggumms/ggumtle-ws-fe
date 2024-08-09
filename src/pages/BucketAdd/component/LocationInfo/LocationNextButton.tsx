import NavigateButton from '../../../../component/NavigateButton'
import { useBucketAddStore } from '../../../../stores/clientState/bucketAddStore'

const LocationNextButton = () => {
	const {
		locationInfo: { latitude, longitude },
	} = useBucketAddStore()
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
