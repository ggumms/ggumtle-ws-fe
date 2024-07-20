import { useEffect, useRef, useState } from 'react'
import { useGetCurrentPosition } from '../../hook'
import './map.css'

interface IMarkerAndInfo {
	marker: kakao.maps.Marker
	infoWindow: kakao.maps.InfoWindow
}

const KakaoMap = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null)
	const mapInstanceRef = useRef<kakao.maps.Map | null>(null)
	const { longitude, latitude } = useGetCurrentPosition()
	const [markerAndInfoList, setMarkerAndInfoList] = useState<IMarkerAndInfo[]>([])

	// 지도 클릭 이벤트 핸들러
	const handleMapClick = (mouseEvent: kakao.maps.MouseEvent) => {
		// 좌표를 주소로 변환
		const geocoder = new kakao.maps.services.Geocoder()
		geocoder.coord2Address(
			mouseEvent.latLng.getLng(),
			mouseEvent.latLng.getLat(),
			// 주소로 변환 성공 시 마커를 추가하고 인포윈도우를 표시
			(result, status) => {
				if (status === kakao.maps.services.Status.OK) {
					const detailAddr = result[0].road_address
						? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
						: ''
					const addressName = `<div>지번 주소 : ${result[0].address.address_name}</div>`

					const content = `
					<div class="bAddr">
						<span class="title">법정동 주소정보</span>
						${detailAddr}
						${addressName}
					</div>
				`

					const clickedMarker = new kakao.maps.Marker()
					const clickedInfoWindow = new kakao.maps.InfoWindow({ zIndex: 1 })
					clickedMarker.setPosition(mouseEvent.latLng)
					clickedInfoWindow.setContent(content)

					setMarkerAndInfoList((prev) => {
						prev.forEach(({ marker, infoWindow }) => {
							marker.setMap(null)
							infoWindow.close()
						})

						return [{ marker: clickedMarker, infoWindow: clickedInfoWindow }]
					})
				}
			}
		)
	}

	// Note: 카카오맵 초기 설정
	useEffect(() => {
		if (!window.kakao || !mapContainerRef.current || longitude === null || latitude === null) return

		const { kakao } = window
		const container = mapContainerRef.current
		const options: kakao.maps.MapOptions = {
			center: new kakao.maps.LatLng(latitude, longitude),
			level: 3,
		}

		const map = new kakao.maps.Map(container, options)

		const mapTypeControl = new kakao.maps.MapTypeControl()
		map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

		const zoomControl = new kakao.maps.ZoomControl()
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

		// 맵 인스턴스 저장
		mapInstanceRef.current = map

		// 초기 marker 생성
		const initialPosition = new kakao.maps.LatLng(latitude, longitude)
		const initialMarker = new kakao.maps.Marker({
			position: initialPosition,
		})
		// 초기 윈도우 생성
		const initialInfoContent = '<div style="padding:5px;">현재 위치</div>'
		const initialInfoWindow = new kakao.maps.InfoWindow({
			position: initialPosition,
			content: initialInfoContent,
		})
		setMarkerAndInfoList([{ marker: initialMarker, infoWindow: initialInfoWindow }])

		kakao.maps.event.addListener(map, 'click', handleMapClick)
	}, [longitude, latitude])

	// Note: 마커와 인포윈도우 리스트가 변경되면 마커와 인포윈도우를 지도에 표시
	useEffect(() => {
		if (markerAndInfoList.length === 0 || !mapInstanceRef.current) return

		markerAndInfoList.forEach(({ marker, infoWindow }) => {
			if (mapInstanceRef.current) {
				marker.setMap(mapInstanceRef.current)
				infoWindow.open(mapInstanceRef.current, marker)
			}
		})
	}, [markerAndInfoList])

	// Note: 클리어 함수 작성
	useEffect(() => {
		return () => {
			if (mapInstanceRef.current) {
				// 이벤트 리스너 제거
				window.kakao.maps.event.removeListener(mapInstanceRef.current, 'click', handleMapClick)
				// 맵 인스턴스 제거
				mapInstanceRef.current.destroy()
				mapInstanceRef.current = null
			}
		}
	}, [])

	return (
		<>
			{longitude !== null && latitude !== null ? (
				<div id="map" ref={mapContainerRef} className="w-full h-full grow mb-10" />
			) : (
				<p>지도 로딩 중...</p>
			)}
		</>
	)
}

export default KakaoMap
