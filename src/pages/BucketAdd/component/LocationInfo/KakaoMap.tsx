import { useEffect, useRef, useState } from 'react'
import './map.css'

interface IKakaoMapProps {
	initialPosition: { latitude: number; longitude: number } | null
	markerAndWindowInfoList: IMarkerAndWindowInfo[]
	setMarkerAndWindowInfoList: React.Dispatch<React.SetStateAction<IMarkerAndWindowInfo[]>>
}

interface IMarkerAndInfoWindowItem {
	marker: kakao.maps.Marker
	infoWindow: kakao.maps.InfoWindow
	isWindowOpen: boolean
}

const KakaoMap = ({
	initialPosition,
	markerAndWindowInfoList,
	setMarkerAndWindowInfoList,
}: IKakaoMapProps) => {
	// 지도 관련 ref들
	const mapContainerRef = useRef<HTMLDivElement>(null) // 지도를 표시할 div를 저장하는 ref
	// const mapInstanceRef = useRef<kakao.maps.Map | null>(null) // 지도 인스턴스를 관리하는 ref
	const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null) // 지도 인스턴스를 관리하는 state

	// 지도에 표시될 마커와 인포윈도우 리스트
	const [markersAndInfoWindows, setMarkersAndInfoWindows] = useState<IMarkerAndInfoWindowItem[]>([])
	useEffect(() => {
		if (!mapInstance || !markerAndWindowInfoList.length) return

		// 새로운 마커와 인포윈도우 리스트 생성
		const resultList = [] as IMarkerAndInfoWindowItem[]

		markerAndWindowInfoList.forEach(({ markerPosition, windowContent, isWindowOpen }) => {
			const marker = new kakao.maps.Marker({ position: markerPosition })
			const infoWindow = new kakao.maps.InfoWindow({ content: windowContent })

			resultList.push({ marker, infoWindow, isWindowOpen })
		})

		// 기존 마커는 제거하고, 새롭운 마커와 인포윈도우 리스트로 갱신
		setMarkersAndInfoWindows((prev) => {
			prev.forEach(({ marker, infoWindow, isWindowOpen }) => {
				marker.setMap(null)
				isWindowOpen && infoWindow.close()
			})

			return resultList
		})
	}, [markerAndWindowInfoList, mapInstance])

	// 마커와 인포윈도우 리스트가 갱신되면, 지도에 마커와 인포윈도우를 표시
	useEffect(() => {
		if (!mapInstance || !markersAndInfoWindows.length) return

		markersAndInfoWindows.forEach(({ marker, infoWindow, isWindowOpen }) => {
			// marker.setMap(mapInstanceRef.current)
			marker.setMap(mapInstance)
			isWindowOpen && infoWindow.open(mapInstance, marker)
		})
	}, [markersAndInfoWindows, mapInstance])

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
					// infoWindow에 표시할 content 생성
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
					setMarkerAndWindowInfoList([
						{ markerPosition: mouseEvent.latLng, windowContent: content, isWindowOpen: true },
					])
				}
			}
		)
	}

	// Note: 카카오맵 초기 설정
	useEffect(() => {
		if (!window.kakao || !mapContainerRef.current || initialPosition === null) {
			return
		}

		// 초기 정보를 이용한 맵 인스턴스 생성
		const { kakao } = window
		const container = mapContainerRef.current
		const options: kakao.maps.MapOptions = {
			center: new kakao.maps.LatLng(initialPosition.latitude, initialPosition.longitude),
			level: 3,
		}
		const mapInstance = new kakao.maps.Map(container, options)

		// 맵 인스턴스에 컨트롤러 추가
		const mapTypeControl = new kakao.maps.MapTypeControl()
		mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

		const zoomControl = new kakao.maps.ZoomControl()
		mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

		// 맵 인스턴스 저장
		// mapInstanceRef.current = mapInstance
		setMapInstance(mapInstance)

		// 지도에 클릭 이벤트 리스너 추가
		kakao.maps.event.addListener(mapInstance, 'click', handleMapClick)
	}, [initialPosition])

	// Note: 클리어 함수 작성
	useEffect(() => {
		return () => {
			if (mapInstance) {
				// 이벤트 리스너 제거
				window.kakao.maps.event.removeListener(mapInstance, 'click', handleMapClick)
				// 맵 인스턴스 제거
				mapInstance.destroy()
				setMapInstance(null)
			}
		}
	}, [])

	return (
		<>
			{initialPosition ? (
				<div id="map" ref={mapContainerRef} className="w-full h-full grow mb-10" />
			) : (
				<p>지도 로딩 중...</p>
			)}
		</>
	)
}

export default KakaoMap
