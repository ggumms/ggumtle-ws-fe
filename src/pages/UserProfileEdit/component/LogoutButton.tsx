import { postLogout } from '../api'

const LogoutButton = () => {
	const handleLogout = async () => {
		// 로그아웃 처리
		const logoutRes = await postLogout()
		if (logoutRes) {
			alert('로그아웃 되었습니다.')
			window.location.href = '/login'
		} else {
			alert('로그아웃을 다시 시도해주세요.')
		}
	}

	return (
		<button
			onClick={handleLogout}
			className="text-lg font-semibold px-2 border-b-[2px] border-transparent hover:text-black hover:border-black"
		>
			로그아웃
		</button>
	)
}

export default LogoutButton
