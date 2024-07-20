import WithHeaderLayout from '../../component/layout/WithHeaderLayout'
import { IMenu, IMenuFunc, IMyUserInfo } from '../../interfaces'
import { icons } from '../../utilities/constants/header-icons'
import { useRouter } from '../../hooks/useRouter'
import WriteProfileImage from '../../component/UserProfile/WriteProfileInfo/WriteProfileImage'
import WriteProfileName from '../../component/UserProfile/WriteProfileInfo/WriteProfileName'
import { NicknameMsgType } from '../../types/user'
import { useCallback, useMemo, useState } from 'react'
import EditProfileSubmit from './component/EditProfileSubmit'
import { useCurrentUserStore } from '../../stores/currentUserStore'
import { putUserProfile } from './api'
import LogoutButton from './component/LogoutButton'
import ResignButton from './component/ResignButton'

// 유저 이름 변경하는 기능
// - 유저 이미지 url을 기반으로 File로 만들어서 관리하는 기능

const UserProfileEdit = () => {
	const { userInfo, setUserInfo } = useCurrentUserStore()
	const nickname = useMemo(() => {
		return userInfo?.nickname || ''
	}, [userInfo])
	const setNickname = useCallback(
		(nickname: string) => {
			setUserInfo({ ...userInfo, nickname } as IMyUserInfo)
		},
		[userInfo]
	)
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

	const handleEditUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const editProfileRes = await putUserProfile(formData)

		if (editProfileRes) {
			routeTo('/mypage')
		} else {
			alert('프로필 정보 수정 실패')
		}
	}

	return (
		<WithHeaderLayout headerMenu={menu} headerFunc={func}>
			<form className="flex flex-col gap-8 relative grow" onSubmit={handleEditUserProfile}>
				<WriteProfileImage previousImage={null} />
				<WriteProfileName
					nickname={nickname}
					setNickname={setNickname}
					nicknameMsgStatus={nickNameMsgStatus}
					setNickNameMsgStatus={setNickNameMsgStatus}
				/>
				<EditProfileSubmit nickNameStatus={nickNameMsgStatus} />
			</form>
			<section className="flex justify-around w-full  items-center pb-14 text-gray">
				<LogoutButton />
				<ResignButton />
			</section>
		</WithHeaderLayout>
	)
}

export default UserProfileEdit
