import { FormEvent, useState } from 'react'
import { NicknameMsgType } from '../../../types/user'
import WriteProfileName from '../../../component/UserProfile/WriteProfileInfo/WriteProfileName'
import WriteProfileImage from '../../../component/UserProfile/WriteProfileInfo/WriteProfileImage'
import { useJoinContentStore } from '../../../stores/clientState/joinStore'
import JoinSubmitButton from './AdditionalSubmitButton'

// 1. 회원가입
// -> 카카오를 통해서 닉네임을 받아오고 이걸 사용
// 2. 기존 닉네임 수정할 때
// -> 서버를 통해서 기존 닉네임을 받아오고 이걸 사용
// -> 이렇게 되면 이제 같은 컴포넌트로 사용할 수 없고 이 정보를 외부에서 받아와야지 or 컴포넌트 쪼개야지
const AdditionalUserInfo = () => {
	const [nickNameMsgStatus, setNickNameMsgStatus] = useState<NicknameMsgType>(
		'initial' as NicknameMsgType
	)
	const { setContent } = useJoinContentStore()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// const profileFormData = new FormData(event.currentTarget)
		// const profileApiRes = await postUserProfile(profileFormData)
		const profileApiRes = 'success'

		if (profileApiRes === 'success') {
			// 관신사 설문 컴포넌트로 변경
			setContent('survey')
		} else {
			alert('프로필 정보 전송 실패')
		}
	}

	return (
		<section className="flex flex-col justify-between grow">
			<form className="flex flex-col grow gap-8 relative" onSubmit={handleSubmit}>
				<WriteProfileImage />
				<WriteProfileName
					nicknameMsgStatus={nickNameMsgStatus}
					setNickNameMsgStatus={setNickNameMsgStatus}
				/>
				<JoinSubmitButton nickNameStatus={nickNameMsgStatus} />
			</form>
		</section>
	)
}

export default AdditionalUserInfo
