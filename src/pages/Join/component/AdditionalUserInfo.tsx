import { FormEvent, useState } from 'react'
import { NicknameMsgType } from '../../../types/user'
import WriteProfileName from '../../../component/UserProfile/WriteProfileInfo/WriteProfileName'
import WriteProfileImage from '../../../component/UserProfile/WriteProfileInfo/WriteProfileImage'
import { useJoinContentStore, useJoinInfoStore } from '../../../stores/clientState/joinStore'
import JoinSubmitButton from './AdditionalSubmitButton'

const AdditionalUserInfo = () => {
	const [nickNameMsgStatus, setNickNameMsgStatus] = useState<NicknameMsgType>(
		'initial' as NicknameMsgType
	)
	const { setContent } = useJoinContentStore()
	const { nickname, setNickname } = useJoinInfoStore()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		setContent('survey')
	}

	return (
		<section className="flex flex-col justify-between grow">
			<form className="flex flex-col grow gap-8 relative" onSubmit={handleSubmit}>
				<WriteProfileImage previousImage={null} />
				<WriteProfileName
					nickname={nickname}
					setNickname={setNickname}
					nicknameMsgStatus={nickNameMsgStatus}
					setNickNameMsgStatus={setNickNameMsgStatus}
				/>
				<JoinSubmitButton nickNameStatus={nickNameMsgStatus} />
			</form>
		</section>
	)
}

export default AdditionalUserInfo
