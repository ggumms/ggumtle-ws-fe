import PageDescription from '../../../../component/PageDescription'
import LocationNextButton from './LocationNextButton'

const LocationInfo = () => {
	return (
		<section className="pb-12 flex flex-col grow">
			<section className="mt-10 mb-7">
				<PageDescription type={'locationWrite'} />
			</section>
			<div className="flex grow">위치 선택 컴포넌트</div>
			<LocationNextButton />
		</section>
	)
}

export default LocationInfo
