import { useOutletContext } from 'react-router-dom'
import SearchUserItem from '../Search/components/SearchUserItem'
import { useQuery } from '@tanstack/react-query'
import { getFollower } from './api'
import { UserInfoType } from '../../interfaces'

const FollowerDetail = () => {
	const { userId } = useOutletContext<{ userId: number }>()
	const { isLoading, data } = useQuery({
		queryKey: ['userFollower', userId],
		queryFn: getFollower,
	})

	return (
		<div className="px-4">
			{!isLoading &&
				data.searchList.content.map((user: UserInfoType) => (
					<SearchUserItem user={user} key={user.userId} />
				))}
		</div>
	)
}

export default FollowerDetail