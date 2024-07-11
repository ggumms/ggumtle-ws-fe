import { postResign } from '../api'

const ResignButton = () => {
	const handleResign = async () => {
		// 로그아웃 처리
		const resignRes = await postResign()
		if (resignRes) {
			alert('회원탈퇴 되었습니다.')
			window.location.href = '/login'
		} else {
			alert('회원탈퇴 요청이 실패하였습니다. 다시 시도해주세요.')
		}
	}

	return (
		<button
			onClick={handleResign}
			className="text-lg font-semibold px-2 border-b-[2px] border-transparent hover:text-black hover:border-black"
		>
			회원탈퇴
		</button>
	)
}

export default ResignButton
