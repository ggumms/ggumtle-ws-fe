import { useEffect, useState } from 'react'
import PageDescription from '../../../../component/PageDescription'
import KakaoMap from './KakaoMap'
import LocationNextButton from './LocationNextButton'
import LocationSearchBar from './LocationSearchBar'
import { useGetCurrentPosition } from '../../hook'

const INITIAL_MARKER_TITLE = '현재 위치'

const LocationInfo = () => {
	const currentCoordinate = useGetCurrentPosition()

	const [initialPosition, setInitialPosition] = useState<{
		latitude: number
		longitude: number
	} | null>(null)
	const [markerInfoList, setMarkerInfoList] = useState<IMarkerInfo[]>([])
	const [activeMarkerTitle, setActiveMarkerTitle] = useState<string>('')
	const [dataReference, setDataReference] = useState<TMarkerAndWindowReference | null>(null)

	// 좌표를 받아오면 "초기 위치" 설정 & "마커와 인포윈도우 초기 리스트" 생성
	useEffect(() => {
		if (currentCoordinate && initialPosition === null) {
			const currentPosition = new kakao.maps.LatLng(
				currentCoordinate.latitude,
				currentCoordinate.longitude
			)
			setMarkerInfoList([
				{
					title: INITIAL_MARKER_TITLE,
					markerPosition: currentPosition,
				},
			])
			setDataReference('initial')

			setInitialPosition(currentCoordinate)
		}
	}, [currentCoordinate])

	return (
		<section className="pb-12 flex flex-col grow">
			<section className="mt-10 mb-7">
				<PageDescription type={'locationWrite'} />
			</section>
			<section className="flex flex-col grow">
				<LocationSearchBar
					setDataReference={setDataReference}
					setMarkerInfoList={setMarkerInfoList}
				/>

				{initialPosition ? (
					<KakaoMap
						initialPosition={initialPosition}
						dataReference={dataReference}
						setDataReference={setDataReference}
						activeMarkerTitle={activeMarkerTitle}
						setActiveMarkerTitle={setActiveMarkerTitle}
						markerInfoList={markerInfoList}
						setMarkerInfoList={setMarkerInfoList}
					/>
				) : (
					<p>지도 로딩 중...</p>
				)}
			</section>
			<LocationNextButton />
		</section>
	)
}

export default LocationInfo
