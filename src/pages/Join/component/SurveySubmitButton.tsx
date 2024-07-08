import { useMemo } from 'react'
import { useJoinInfoStore } from '../../../stores/clientState/joinStore'

import { bgColorClass } from '../../../utilities/constants/dynamicClass'

const SurveySubmitButton = () => {
	const { surveyResult: joinSurveyResult } = useJoinInfoStore()
	const isDisabled = useMemo(
		() => Object.values(joinSurveyResult).every((isSelected) => isSelected === false),
		[joinSurveyResult]
	)

	return (
		<button
			type="submit"
			className={`absolute bottom-10 w-full text-white text-lg font-bold border-[1px] py-4 rounded-[5px] ${isDisabled ? bgColorClass['unActive'] : bgColorClass['lightGreen']} transition-colors`}
			disabled={isDisabled}
		>
			완료
		</button>
	)
}

export default SurveySubmitButton
