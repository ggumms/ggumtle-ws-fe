import CategorySelect from '../../../component/CategorySelect'
import { categoryData } from '../../../utilities/utils/category'
import PageDescription from '../../../component/PageDescription'
import SurveySubmitButton from './SurveySubmitButton'
import { useJoinInfoStore } from '../../../stores/clientState/joinStore'
import { useRouter } from '../../../hooks/useRouter'
import { postJoin } from '../api'
import { CategoryType } from '../../../interfaces'

const Survey = () => {
	const { joinType, code, nickname, image, surveyResult, addSurvey, removeSurvey } =
		useJoinInfoStore()
	const { routeTo } = useRouter()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const surveyResultList = Object.entries(surveyResult)
			.map(([key, value]) => {
				if (value) return key
				else return null
			})
			.filter((value) => value !== null) as CategoryType[]

		console.log(surveyResultList)

		const joinApiRes = await postJoin({
			joinType,
			code,
			nickname,
			image,
			surveyResult: surveyResultList,
		})
		// const joinApiRes = 'success'
		if (joinApiRes === 'success') {
			alert('꿈:틀 가입을 축하드립니다!')
			routeTo('/')
		} else {
			alert('회원가입에 실패하였습니다.')
		}
	}

	return (
		<form onSubmit={handleSubmit} className="relative grow">
			<section>
				<PageDescription type={'categoryJoin'} />
			</section>
			<section className="pt-12 grow">
				<CategorySelect
					categoryData={categoryData}
					selectedInfo={surveyResult}
					addCategory={addSurvey}
					removeCategory={removeSurvey}
				/>
			</section>
			<SurveySubmitButton />
		</form>
	)
}

export default Survey

// 프로필 이미지에 대한 고찰(컴포넌트 재활요을 해야되기 때문에 이러한 문제가 발생)
// 1. 프로필 이미지를 변경하지 않는 경우
// - 서버에 등록된 이미지들을 url 형태로 받아와지기 때문에 따로 input에 넣어줄 수 없다.
// - 그렇기 때문에 이미지를 변경하지 않고 제출을 할 경우에는 formData의 이미지 부분이 비어있게 된다.
// - 그러면 이 때는 null을 보내주게 된다.
// -> 아 이미지를 삭제하는 경우에 어떻게 해야하나 했는데
