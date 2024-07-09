import { KakaoButtonIcon } from '../../../assets/svgs'
import { KAKAO_URL } from '../../../utilities/constants/auth'

const KakaoLoginBtn = () => {
	return (
		<a
			href={KAKAO_URL}
			className="flex flex-row items-center self-stretch justify-center gap-2 py-4 text-base font-bold text-black rounded bg-yellow"
		>
			<KakaoButtonIcon />
			<p>카카오로 로그인</p>
		</a>
	)
}

export default KakaoLoginBtn
