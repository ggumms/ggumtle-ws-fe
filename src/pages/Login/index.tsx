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
			<div className="flex flex-col justify-start h-screen">
				{/* <div className="flex flex-col justify-center h-screen"> */}
				<GgumtleLogo />
				<KakaoLoginBtn />
			</div>
		</DefaultLayout>
	)
}

export default LoginPage
