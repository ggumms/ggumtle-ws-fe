import { useState } from 'react'
import AdditionalUserInfo from './component/AdditionalUserInfo'
import Survey from './component/Survey'
import { IMenu, IMenuFunc } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { icons } from '../../utilities/constants/header-icons'
import Header from '../../component/Header'

const getJoinContent = (currentContent: 'additionalInfo' | 'survey') => {
	switch (currentContent) {
		case 'additionalInfo':
			return <AdditionalUserInfo />
		case 'survey':
			return <Survey />
	}
}

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
		<main>
			<Header menu={menu} func={func} />
			<nav>
				<ul>
					<li className="">
						<button onClick={() => setContent('additionalInfo')}>추가정보</button>
					</li>
					<li className="">
						<button onClick={() => setContent('survey')}>설문조사</button>
					</li>
				</ul>
			</nav>
			<section>{getJoinContent(content)}</section>
		</main>
	)
}

export default JoinPage
