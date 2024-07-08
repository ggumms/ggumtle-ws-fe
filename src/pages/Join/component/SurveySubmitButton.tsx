// import { useMemo } from 'react'
// import { useJoinInfoStore } from '../../../stores/clientState/joinStore'

import { bgColorClass } from '../../../utilities/constants/dynamicClass'

const SurveySubmitButton = () => {
	// const { joinSurveyList } = useJoinInfoStore()
	// const isDisabled = useMemo(() => nickNameStatus !== 'valid', [nickNameStatus])
	const isDisabled = false
	return (
		<button
			type="submit"
			className={`absolute bottom-10 w-full text-white text-lg font-bold border-[1px] py-4 rounded-[5px] ${isDisabled ? bgColorClass['unActive'] : bgColorClass['lightGreen']} transition-colors`}
			// disabled={isDisabled}
		>
			다음
		</button>
	)
}

export default SurveySubmitButton
