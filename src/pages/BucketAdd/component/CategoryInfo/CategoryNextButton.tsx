import NavigateButton from '../../../../component/NavigateButton'
import { useBucketStore } from '../../../../stores/clientState/bucketAddStore'

const CategoryNextButton = () => {
	const { selectedInfo } = useBucketStore()
	const isDisable = !Object.values(selectedInfo).find((isSelected) => isSelected === true)

	return (
		<>
			<NavigateButton path="/bucket/write/location" isDisable={isDisable}>
				다음
			</NavigateButton>
		</>
	)
}

export default CategoryNextButton
