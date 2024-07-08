import CategorySelect from '../../../component/CategorySelect'
import { categoryData } from '../../../utilities/utils/category'
import PageDescription from '../../../component/PageDescription'
import SurveySubmitButton from './SurveySubmitButton'

const Survey = () => {
	return (
		<form className="relative grow">
			<section>
				<PageDescription type={'categoryJoin'} />
			</section>
			<section className="pt-12 grow">
				<CategorySelect categoryData={categoryData} />
			</section>
			<SurveySubmitButton />
		</form>
	)
}

export default Survey
