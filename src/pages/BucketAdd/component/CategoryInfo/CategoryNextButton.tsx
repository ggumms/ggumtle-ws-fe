import NavigateButton from '../../../../component/NavigateButton'
import { useBucketAddStore } from '../../../../stores/clientState/bucketAddStore'

const CategoryNextButton = () => {
	const { selectedInfo } = useBucketAddStore()
	const isDisable = !Object.values(selectedInfo).find((isSelected) => isSelected === true)

	return (
		<>
			<NavigateButton path="/bucket/write/main" isDisable={isDisable}>
				다음
			</NavigateButton>
		</>
	)
}

export default CategoryNextButton
