import { useEffect, useRef } from 'react'
import { useGetCurrentPosition } from '../../hook'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { kakao }: any = window

// 컴포넌트 마운트 시 지도 객체 생성
const KakaoMap = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null)
	const { longitude, latitude } = useGetCurrentPosition()

	useEffect(() => {
		const container = mapContainerRef.current
		console.log(latitude, longitude, container)
		if (container && latitude && longitude) {
			// 지도 생성에 필요한 기본 옵션
			const options = {
				center: new kakao.maps.LatLng(latitude, longitude),
				level: 3,
			}

			// 지도 태그의 ref와 option을 이용해 화면에 지도 생성 및 객체 리턴
			const mapInstance = new kakao.maps.Map(container, options)
			console.log(mapInstance)
		}
	}, [longitude, latitude])

	return (
		<>
			{longitude && latitude ? (
				<div id="map" ref={mapContainerRef} className="w-full h-full grow mb-10" />
			) : (
				<p>지도 로딩 중...</p>
			)}
		</>
	)
}

export default KakaoMap
