import { useEffect, useRef } from 'react'
import { useGetCurrentPosition } from '../../hook'
import './map.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { kakao }: any = window

// 컴포넌트 마운트 시 지도 객체 생성
const KakaoMap = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null)
	const { longitude, latitude } = useGetCurrentPosition()

	// Note: 지도 초기 셋팅
	useEffect(() => {
		const container = mapContainerRef.current
		console.log(latitude, longitude, container)
		if (container && latitude && longitude) {
			// 지도 생성에 필요한 기본 옵션
			const options = {
				center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심 좌표
				level: 3, // 지도 확대 레벨
			}

			// 지도 태그의 ref와 option을 이용해 화면에 지도 생성 및 객체 리턴
			const mapInstance = new kakao.maps.Map(container, options)

			// 지도 타입, 줌 레벨 변경 컨트롤러 생성
			// - 지도 타입 컨트롤러
			const mapTypeControl = new kakao.maps.MapTypeControl()
			mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
			// - 줌 컨트롤러
			const zoomControl = new kakao.maps.ZoomControl()
			mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

			// 마커 생성
			const initialPosition = new kakao.maps.LatLng(latitude, longitude)
			const initialMarker = new kakao.maps.Marker({
				position: initialPosition,
			})
			initialMarker.setMap(mapInstance)

			// 마커 위에 표시할 인포윈도우 생성
			const initialInfoContent = '<div style="padding:5px;">현재 위치</div>' // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

			const initialInfoWindow = new kakao.maps.InfoWindow({
				position: initialPosition,
				content: initialInfoContent,
			})

			initialInfoWindow.open(mapInstance, initialMarker)
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
