import CategorySelect from '../../../../../component/CategorySelect'
import { categoryData } from '../../../../../utilities/utils/category'
import PageDescription from '../../../../../component/PageDescription'
import CategoryNextButton from './CategoryNextButton'

const CategoryInfo = () => {
	return (
		<section className="flex flex-col h-full pt-12 pb-10 grow">
			<section>
				<PageDescription type={'categoryWrite'} />
			</section>
			<section className="pt-12 grow">
				<CategorySelect categoryData={categoryData} />
			</section>
			<CategoryNextButton />
		</section>
	)
}

export default CategoryInfo
