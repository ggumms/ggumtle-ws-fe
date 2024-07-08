import CategorySelect from '../../../component/CategorySelect'
import { categoryData } from '../../../utilities/utils/category'
import PageDescription from '../../../component/PageDescription'
import SurveySubmitButton from './SurveySubmitButton'
import { useJoinInfoStore } from '../../../stores/clientState/joinStore'
// import { useRouter } from '../../../hooks/useRouter'
// import { postJoina } from '../api'
import { CategoryType } from '../../../interfaces'

const Survey = () => {
	const { nickname, image, surveyResult, addSurvey, removeSurvey } = useJoinInfoStore()
	// const { routeTo } = useRouter()
	console.log(nickname, image)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const surveyResultList = Object.entries(surveyResult)
			.map(([key, value]) => {
				if (value) return key
				else return null
			})
			.filter((value) => value !== null) as CategoryType[]

		console.log(surveyResultList)

		// const joinApiRes = await postJoin({ nickname, image, surveyResult: surveyResultList })
		const joinApiRes = 'success'
		if (joinApiRes === 'success') {
			alert('꿈:틀 가입을 축하드립니다!')
			// routeTo('/')
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
