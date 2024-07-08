import Survey from './component/Survey'
import { IMenu, IMenuFunc } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { icons } from '../../utilities/constants/header-icons'
// import Header from '../../component/Header'
import WithHeaderLayout from '../../component/layout/WithHeaderLayout'
import AdditionalUserInfo from './component/AdditionalUserInfo'
import { useJoinContentStore } from '../../stores/clientState/joinStore'

const getJoinContent = (currentContent: 'additionalInfo' | 'survey') => {
	switch (currentContent) {
		case 'additionalInfo':
			return <AdditionalUserInfo />
		case 'survey':
			return <Survey />
	}
}

const JoinPage = () => {
	const { content, setContent } = useJoinContentStore()
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
