import { useEffect, useState } from 'react'
import PageDescription from '../../../../component/PageDescription'
import KakaoMap from './KakaoMap'
import LocationNextButton from './LocationNextButton'
import LocationSearchBar from './LocationSearchBar'
import { useGetCurrentPosition } from '../../hook'

const LocationInfo = () => {
	const { longitude, latitude } = useGetCurrentPosition()

	const [initialPosition, setInitialPosition] = useState<{
		latitude: number
		longitude: number
	} | null>(null)
	const [markerAndWindowInfoList, setMarkerAndWindowInfoList] = useState<IMarkerAndWindowInfo[]>([])

	// 좌표를 받아오면 "초기 위치" 설정 & "마커와 인포윈도우 초기 리스트" 생성
	useEffect(() => {
		if (longitude && latitude) {
			const currentPosition = new kakao.maps.LatLng(latitude, longitude)
			setMarkerAndWindowInfoList([
				{ markerPosition: currentPosition, windowContent: '현재 위치', isWindowOpen: true },
			])
			setInitialPosition({ latitude, longitude })
		}
	}, [longitude, latitude])

	return (
		<section className="pb-12 flex flex-col grow">
			<section className="mt-10 mb-7">
				<PageDescription type={'locationWrite'} />
			</section>
			<section className="flex flex-col grow">
				<LocationSearchBar setMarkerAndWindowInfoList={setMarkerAndWindowInfoList} />
				<KakaoMap
					initialPosition={initialPosition}
					markerAndWindowInfoList={markerAndWindowInfoList}
					setMarkerAndWindowInfoList={setMarkerAndWindowInfoList}
				/>
			</section>
			<LocationNextButton />
		</section>
	)
}

export default LocationInfo
