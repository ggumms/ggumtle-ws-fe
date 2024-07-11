import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import KakaoLoginBtn from './components/KakaoLoginBtn'
import { useDoLogin } from './hook'
import GgumtleLogo from './components/GgumtleLogo'
import DefaultLayout from '../../component/layout/DefaultLayout'
import { isLoginTokenType } from '../../utilities/utils/typeFilter'

const LoginPage = () => {
	const { loginType } = useParams()
	const code = new URLSearchParams(useLocation().search).get('code')

	const { doLogin } = useDoLogin()

	useEffect(() => {
		if (loginType && code && isLoginTokenType(loginType)) {
			doLogin(loginType, code)
		}
	}, [loginType])

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
