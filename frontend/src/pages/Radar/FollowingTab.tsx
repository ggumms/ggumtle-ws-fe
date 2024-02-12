import { useEffect, useState } from 'react'
import UserItem from './components/radar/UserItem'
import ButtonArea from './components/ButtonArea'
import Radar from './components/radar/Radar'
import { ProfileAvatar } from '../../assets/svgs'
import { getRadarUsers } from './api'
import { useQuery } from '@tanstack/react-query'
import { user1stPositioning } from './utils/user/radar1st'
import { user2ndPositioning } from './utils/user/radar2nd'
import { user3rdPositioning } from './utils/user/radar3rd'
import { IRadarUser } from './types/radarUser'
import UserBottomSheet from './components/bottomSheet/UserBottomSheet'
import useUserBottomSheet from '../../hooks/useUserBottomSheet'
import { Link } from 'react-router-dom'
import BackDots from './components/radar/BackDots'

export interface IUserSimple {
	userId: number
	userProfileImage: string
	userNickname: string
}

interface IRadarUserList {
	circle1: IRadarUser[]
	circle2: IRadarUser[]
	circle3: IRadarUser[]
	refresh: boolean
}

// @TODO: 알림 페이지에서 뒤로가기 했을때 레이더 리렌더링 되지 않도록 수정하기
// @TODO: 리렌더링 횟수 줄이기
const FollowingTab = () => {
	const { isLoading, data: radar } = useQuery<IRadarUserList>({
		queryKey: ['radarUser'],
		queryFn: getRadarUsers,
	})

	const [users1st, setUsers1st] = useState<IRadarUser[]>([])
	const [users2nd, setUsers2nd] = useState<IRadarUser[]>([])
	const [users3rd, setUsers3rd] = useState<IRadarUser[]>([])

	const { sheet, content, openPreview, isMaxup, togglePreview } = useUserBottomSheet()
	const [userId, setUserId] = useState<number | null>(null)
	const [refresh, setRefresh] = useState<boolean>(false)

	const handleOpenPreview = (userId: number) => {
		openPreview()
		setUserId(userId)
	}

	const refreshRadar = (state: boolean) => {
		// @TODO: [리팩토링] 유저리스트를 비우지 않고 pos값만 변동시키면 효율 개선 가능
		setUsers1st([])
		setUsers2nd([])
		setUsers3rd([])
		setRefresh(state)
	}
	// 첫 번째 레이더 (가장 안쪽)
	useEffect(() => {
		const radius = 19
		const maxNum = 3
		!isLoading &&
			radar &&
			radar.circle1.forEach((user, index) => {
				setTimeout(
					() => {
						console.log(user)
						user1stPositioning({ setUsers1st, user, radius, maxNum })
					},
					200 * index + 100 * Math.random()
				)
			})
	}, [isLoading, refresh, radar])

	// 두 번째 레이더
	useEffect(() => {
		const radius = 34
		const maxNum = 5
		!isLoading &&
			radar &&
			radar.circle2.forEach((user, index) => {
				setTimeout(
					() => {
						user2ndPositioning({ setUsers2nd, user, radius, maxNum })
					},
					200 * index + 100 * Math.random()
				)
			})
	}, [isLoading, refresh, radar])

	// 세 번째 레이더
	useEffect(() => {
		const radius = 50
		const maxNum = 7
		!isLoading &&
			radar &&
			radar.circle3.forEach((user, index) => {
				setTimeout(
					() => {
						user3rdPositioning({ setUsers3rd, user, radius, maxNum })
					},
					200 * index + 100 * Math.random()
				)
			})
	}, [isLoading, refresh, radar])

	return (
		<div>
			<BackDots />
			<div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center overflow-hidden">
				<Radar>
					<Link to="/mypage" className="z-30">
						<ProfileAvatar className="h-14 w-14" />
					</Link>
				</Radar>

				<div className="absolute top-[calc(50%-5px)] left-1/2 w-[110%] aspect-square transform translate-x-[-50%] translate-y-[-50%]">
					{users1st.map((user) => (
						<UserItem
							key={user.userId}
							user={user}
							type="first"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{users2nd.map((user) => (
						<UserItem
							key={user.userId}
							user={user}
							type="second"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{users3rd.map((user) => (
						<UserItem
							key={user.userId}
							user={user}
							type="third"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
				</div>
			</div>

			{/* @TODO: preview가 아닌 부분을 클릭해도 closePreview 되도록 */}
			<ButtonArea refresh={refresh} refreshRadar={refreshRadar} />
			<UserBottomSheet
				userId={userId}
				togglePreview={togglePreview}
				isMaxup={isMaxup}
				sheet={sheet}
				content={content}
			/>
		</div>
	)
}

export default FollowingTab