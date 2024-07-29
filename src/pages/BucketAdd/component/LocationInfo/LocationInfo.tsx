import { useEffect, useState } from 'react'
import PageDescription from '../../../../component/PageDescription'
import KakaoMap from './KakaoMap'
import LocationNextButton from './LocationNextButton'
import LocationSearchBar from './LocationSearchBar'
import { useGetCurrentPosition } from '../../hook'

const LocationInfo = () => {
	const currentCoordinate = useGetCurrentPosition()

	const [initialPosition, setInitialPosition] = useState<{
		latitude: number
		longitude: number
	} | null>(null)
	const [markerAndWindowInfoList, setMarkerAndWindowInfoList] = useState<IMarkerAndWindowInfo[]>([])
	const [dataReference, setDataReference] = useState<TMarkerAndWindowReference>('initial')

	// 좌표를 받아오면 "초기 위치" 설정 & "마커와 인포윈도우 초기 리스트" 생성
	useEffect(() => {
		if (currentCoordinate && initialPosition === null) {
			const currentPosition = new kakao.maps.LatLng(
				currentCoordinate.latitude,
				currentCoordinate.longitude
			)
			setMarkerAndWindowInfoList([
				{
					markerPosition: currentPosition,
					windowContent: '현재 위치',
					isWindowOpen: true,
				},
			])
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
					setMarkerAndWindowInfoList={setMarkerAndWindowInfoList}
				/>

				{initialPosition ? (
					<KakaoMap
						initialPosition={initialPosition}
						dataReference={dataReference}
						setDataReference={setDataReference}
						markerAndWindowInfoList={markerAndWindowInfoList}
						setMarkerAndWindowInfoList={setMarkerAndWindowInfoList}
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
