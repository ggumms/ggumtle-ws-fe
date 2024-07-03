import { useLocation, useParams } from 'react-router-dom'
import KakaoLoginBtn from './components/KakaoLoginBtn'
import { useDoLogin } from './hook'

const LoginPage = () => {
	const { loginType } = useParams()
	const code = new URLSearchParams(useLocation().search).get('code')

	useDoLogin(loginType, code)

	return (
		<section>
			<KakaoLoginBtn />
		</section>
	)
}

export default LoginPage
