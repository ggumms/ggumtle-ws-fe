import { useEffect, useRef } from 'react'
import { useGetCurrentPosition } from '../../hook'
import './map.css'

// declare global {
// 	interface Window {
// 		kakao: typeof kakao
// 	}
// }

const KakaoMap = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null)
	const { longitude, latitude } = useGetCurrentPosition()

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

		const initialPosition = new kakao.maps.LatLng(latitude, longitude)
		const initialMarker = new kakao.maps.Marker({
			position: initialPosition,
		})
		initialMarker.setMap(map)

		const initialInfoContent = '<div style="padding:5px;">현재 위치</div>'
		const initialInfoWindow = new kakao.maps.InfoWindow({
			position: initialPosition,
			content: initialInfoContent,
		})
		initialInfoWindow.open(map, initialMarker)

		const marker = new kakao.maps.Marker()
		const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

		kakao.maps.event.addListener(map, 'click', (mouseEvent: kakao.maps.MouseEvent) => {
			const geocoder = new kakao.maps.services.Geocoder()
			geocoder.coord2Address(
				mouseEvent.latLng.getLng(),
				mouseEvent.latLng.getLat(),
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

						marker.setPosition(mouseEvent.latLng)
						marker.setMap(map)

						infowindow.setContent(content)
						infowindow.open(map, marker)
					}
				}
			)
		})
	}, [longitude, latitude])

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
