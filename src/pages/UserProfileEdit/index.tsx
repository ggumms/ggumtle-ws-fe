import WithHeaderLayout from '../../component/layout/WithHeaderLayout'
import { IMenu, IMenuFunc } from '../../interfaces'
import { icons } from '../../utilities/constants/header-icons'
import { useRouter } from '../../hooks/useRouter'
import WriteProfileImage from '../../component/UserProfile/WriteProfileInfo/WriteProfileImage'
import WriteProfileName from '../../component/UserProfile/WriteProfileInfo/WriteProfileName'
import { NicknameMsgType } from '../../types/user'
import { useState } from 'react'
import EditProfileSubmit from './component/EditProfileSubmit'

const UserProfileEdit = () => {
	const [nickNameMsgStatus, setNickNameMsgStatus] = useState<NicknameMsgType>(
		'initial' as NicknameMsgType
	)
	const { routeTo } = useRouter()

	const menu: IMenu = {
		left: icons.BACK,
		center: '프로필 수정',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => routeTo('/'),
		right_func: undefined,
	}

	return (
		<WithHeaderLayout headerMenu={menu} headerFunc={func}>
			<form className="flex flex-col gap-8 relative grow">
				<WriteProfileImage previousImage={null} />
				<WriteProfileName
					nicknameMsgStatus={nickNameMsgStatus}
					setNickNameMsgStatus={setNickNameMsgStatus}
				/>
				<EditProfileSubmit nickNameStatus={nickNameMsgStatus} />
			</form>
		</WithHeaderLayout>
	)
}

export default UserProfileEdit
