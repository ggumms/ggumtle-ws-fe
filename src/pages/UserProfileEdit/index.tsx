import WithHeaderLayout from '../../component/layout/WithHeaderLayout'
import { IMenu, IMenuFunc, IMyUserInfo } from '../../interfaces'
import { icons } from '../../utilities/constants/header-icons'
import { useRouter } from '../../hooks/useRouter'
import WriteProfileImage from '../../component/UserProfile/WriteProfileInfo/WriteProfileImage'
import WriteProfileName from '../../component/UserProfile/WriteProfileInfo/WriteProfileName'
import { NicknameMsgType } from '../../types/user'
import { useCallback, useEffect, useState } from 'react'
import EditProfileSubmit from './component/EditProfileSubmit'
import { useCurrentUserStore } from '../../stores/currentUserStore'
import { putUserProfile } from './api'
import LogoutButton from './component/LogoutButton'
import ResignButton from './component/ResignButton'
import { convertUrlToFile } from '../../utilities/utils/image'

// 유저 이름 변경하는 기능
// - 유저 이미지 url을 기반으로 File로 만들어서 관리하는 기능
const UserProfileEdit = () => {
	const { userInfo, setUserInfo } = useCurrentUserStore()
	const [currentNickname, setCurrentNickname] = useState<string>(userInfo?.nickname || '')
	const [nickNameMsgStatus, setNickNameMsgStatus] = useState<NicknameMsgType>(
		'initial' as NicknameMsgType
	)
	const [currentProfileImage, setCurrentProfileImage] = useState<File | null>(null)

	const setProfileImageWithUserInfoUrl = async () =>
		setCurrentProfileImage(
			userInfo?.profileImageUrl
				? await convertUrlToFile(userInfo.profileImageUrl, 'profileImage')
				: null
		)

	useEffect(() => {
		setProfileImageWithUserInfoUrl()
	}, [])

	const setNickname = useCallback(
		(nickname: string) => {
			setUserInfo({ ...userInfo, nickname } as IMyUserInfo)
		},
		[userInfo]
	)
	const setProfileImage = useCallback(
		(profileImage: File | null) => {
			setUserInfo({ ...userInfo, profileImage } as IMyUserInfo)
		},
		[userInfo]
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

		const submittedFormData = new FormData(event.currentTarget)
		const submittedNickname = submittedFormData.get('nickname') as string
		const submittedProfileImage = submittedFormData.get('profileImage') as File

		// 서버에 보낼 formdata 생성
		const formDataToPut = new FormData()
		const editProfileReqDto = {
			nickname: submittedNickname,
			nicknameChange: submittedNickname !== userInfo?.nickname,
			profileImageChange: submittedProfileImage !== currentProfileImage,
		}
		formDataToPut.append(
			'data',
			new Blob([JSON.stringify(editProfileReqDto)], {
				type: 'application/json',
			})
		)
		formDataToPut.append('profileImage', submittedProfileImage)

		const editProfileRes = await putUserProfile(formDataToPut)

		if (editProfileRes) {
			setNickname(submittedNickname)
			setProfileImage(submittedProfileImage)
			routeTo('/mypage')
		} else {
			alert('프로필 정보 수정 실패')
		}
	}

	return (
		<WithHeaderLayout headerMenu={menu} headerFunc={func}>
			<form className="flex flex-col gap-8 relative grow" onSubmit={handleEditUserProfile}>
				<WriteProfileImage previousImage={currentProfileImage ?? null} />
				<WriteProfileName
					nickname={currentNickname}
					setNickname={setCurrentNickname}
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
