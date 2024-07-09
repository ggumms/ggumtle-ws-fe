import React, { useRef } from 'react'
import { NicknameMsgType } from '../../../types/user'
import { debounce } from 'lodash'
import { validateNickNameChar } from '../../../utilities/utils/user'
import { getNameIsDuplicated } from '../../../pages/Join/api'
import { isNicknameMsgType } from '../../../utilities/utils/typeFilter'
import { IoIosCloseCircle } from 'react-icons/io'
import AlertMessages from './AlertMessage'

interface WriteProfileNameProps {
	nickname: string
	setNickname: (nickname: string) => void
	nicknameMsgStatus: NicknameMsgType
	setNickNameMsgStatus: React.Dispatch<React.SetStateAction<NicknameMsgType>>
}

const WriteProfileName = ({
	nickname,
	setNickname,
	nicknameMsgStatus,
	setNickNameMsgStatus,
}: WriteProfileNameProps) => {
	const nameRef = useRef<string>(nickname) // 비동기 중복 검사로 인해 nameStatus 값이 덮어씌워지는 것을 방지하기 위한 ref

	const changeNickNameStatus = debounce(async (currentName) => {
		setNickNameMsgStatus('valid')
		return

		console.log('checking...')
		let currentStatus

		// :: 유효성 검사
		currentStatus = validateNickNameChar(currentName)
		if (currentStatus !== 'valid') {
			setNickNameMsgStatus(currentStatus)
			return
		}

		// :: 중복 검사
		const isDuplicated = await getNameIsDuplicated(currentName)
		currentStatus = isDuplicated ? 'duplicate' : 'valid'

		// Todo: currentName === nameRef.current 이 부분이 왜 필요한지 확인
		if (currentName === nameRef.current && isNicknameMsgType(currentStatus)) {
			setNickNameMsgStatus(currentStatus)
		}
	}, 500)

	const handleChangeName = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const currentName = event.currentTarget.value
		nameRef.current = currentName
		setNickname(currentName)
		setNickNameMsgStatus('loading')
		await changeNickNameStatus(currentName)
	}

	const handleClickEraseButton = async () => {
		console.log('erase')
		setNickname('')
		nameRef.current = ''
		await changeNickNameStatus(nameRef.current)
	}

	return (
		<fieldset>
			<label htmlFor="profileName" className="text-lg font-bold">
				닉네임
			</label>
			<div className="relative mt-2">
				<input
					type="text"
					value={nickname}
					placeholder="닉네임을 입력해주세요."
					name="profileName"
					id="profileName"
					onChange={handleChangeName}
					className="w-full px-1 text-base text-black border-b-2 px- border-lightGray2 focus:outline-none self-center"
				/>
				{nickname.length > 0 && (
					<button
						type="button"
						onClick={handleClickEraseButton}
						className="absolute right-3 translate-y-[-50%] top-1/2"
					>
						<IoIosCloseCircle size={16} color="#C4C4C4" />
					</button>
				)}
			</div>
			<p className="text-xs text-darkGray1 mt-4 flex gap-1">
				<span>&#8251;</span>
				<span>한글/영어/숫자/./밑줄을 사용할 수 있습니다.</span>
			</p>
			<AlertMessages messageStatus={nicknameMsgStatus} />
		</fieldset>
	)
}

export default WriteProfileName
