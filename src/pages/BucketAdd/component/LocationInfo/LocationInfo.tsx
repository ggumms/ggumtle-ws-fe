import { useState } from 'react'
import PageDescription from '../../../../component/PageDescription'
import KakaoMap from './KakaoMap'
import LocationNextButton from './LocationNextButton'
import LocationSearchBar from './LocationSearchBar'

const LocationInfo = () => {
	const [markerAndInfoList, setMarkerAndInfoList] = useState<IMarkerAndInfo[]>([])

	return (
		<section className="pb-12 flex flex-col grow">
			<section className="mt-10 mb-7">
				<PageDescription type={'locationWrite'} />
			</section>
			<section className="flex flex-col grow">
				<LocationSearchBar setMarkerAndInfoList={setMarkerAndInfoList} />
				<KakaoMap
					markerAndInfoList={markerAndInfoList}
					setMarkerAndInfoList={setMarkerAndInfoList}
				/>
			</section>
			<LocationNextButton />
		</section>
	)
}

export default LocationInfo
