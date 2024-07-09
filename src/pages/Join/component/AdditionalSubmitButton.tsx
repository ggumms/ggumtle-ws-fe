// import { useMemo } from 'react'
import { NicknameMsgType } from '../../../types/user'
import { bgColorClass } from '../../../utilities/constants/dynamicClass'

interface EditProfileSubmitProps {
	nickNameStatus: NicknameMsgType
}

const JoinSubmitButton = ({ nickNameStatus }: EditProfileSubmitProps) => {
	// const isDisabled = useMemo(() => nickNameStatus !== 'valid', [nickNameStatus])
	console.log(nickNameStatus)
	const isDisabled = false

	return (
		<button
			type="submit"
			className={`absolute bottom-10 w-full text-white text-lg font-bold border-[1px] py-4 rounded-[5px] ${isDisabled ? bgColorClass['unActive'] : bgColorClass['point1']} transition-colors`}
			disabled={isDisabled}
		>
			다음
		</button>
	)
}

export default JoinSubmitButton
