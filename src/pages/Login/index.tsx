import { useLocation, useParams } from 'react-router-dom'
import KakaoLoginBtn from './components/KakaoLoginBtn'
import { useDoLogin } from './hook'
import GgumtleLogo from './components/GgumtleLogo'
import DefaultLayout from '../../component/layout/DefaultLayout'

const LoginPage = () => {
	const { loginType } = useParams()
	const code = new URLSearchParams(useLocation().search).get('code')

	useDoLogin(loginType, code)

	return (
		<DefaultLayout>
			<GgumtleLogo />
			<KakaoLoginBtn />
		</DefaultLayout>
	)
}

export default LoginPage
