import { useState } from 'react'
import Survey from './component/Survey'
import { IMenu, IMenuFunc } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { icons } from '../../utilities/constants/header-icons'
// import Header from '../../component/Header'
import WithHeaderLayout from '../../component/layout/WithHeaderLayout'
import AdditionalUserInfo from './component/AdditionalUserInfo'

const getJoinContent = (currentContent: 'additionalInfo' | 'survey') => {
	switch (currentContent) {
		case 'additionalInfo':
			return <AdditionalUserInfo />
		case 'survey':
			return <Survey />
	}
}

// 1. 카카오 로그인을 통해서 이 페이지로 들어오게 된다.
// 2. 카카오에서 로그인을 통해서 code를 받아오고 code를 서버로 전송하면, 서버에서는 code를 이용해서 카카오로부터 로그인 가능 여부를 처리한다.
// 3. 로그인 페이지에서 JWT 토큰 및 회원가입 진행 여부가 필요하다는 응답을 받으면, 이 페이지로 이동하게 된다.
// 4. 따라서 Store를 이용해서 로그인 페이지에서 받은 정보들을 저장하고, 이 페이지에서 사용해야 한다.

const JoinPage = () => {
	const navigate = useNavigate()

	const menu: IMenu = {
		left: icons.BACK,
		center: '회원가입',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate('/'),
		right_func: undefined,
	}

	const [content, setContent] = useState<'additionalInfo' | 'survey'>('additionalInfo')

	return (
		<WithHeaderLayout headerMenu={menu} headerFunc={func}>
			{/* <Header menu={menu} func={func} /> */}
			<nav>
				<ul>
					<li className="">
						<button onClick={() => setContent('additionalInfo')}>추가 정보 입력</button>
					</li>
					<li className="">
						<button onClick={() => setContent('survey')}>관심사 선택</button>
					</li>
				</ul>
			</nav>
			{getJoinContent(content)}
		</WithHeaderLayout>
	)
}

export default JoinPage
