import { useCallback, useEffect, useRef, useState } from 'react'
import './map.css'

interface IKakaoMapProps {
	initialPosition: { latitude: number; longitude: number }
	markerAndWindowInfoList: IMarkerAndWindowInfo[]
	setMarkerAndWindowInfoList: React.Dispatch<React.SetStateAction<IMarkerAndWindowInfo[]>>
	dataReference: TMarkerAndWindowReference
	setDataReference: React.Dispatch<React.SetStateAction<TMarkerAndWindowReference>>
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
	dataReference,
	setDataReference,
}: IKakaoMapProps) => {
	// 지도 관련 ref들
	const mapContainerRef = useRef<HTMLDivElement>(null) // 지도를 표시할 div를 저장하는 ref
	const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null) // 지도 인스턴스를 관리하는 state
	// 지도 관련 state들
	const [markersAndInfoWindows, setMarkersAndInfoWindows] = useState<IMarkerAndInfoWindowItem[]>([]) // 지도에 표시될 마커와 인포윈도우 리스트

	// 지도 클릭 이벤트 핸들러
	const handleMapClick = useCallback(
		(mouseEvent: kakao.maps.MouseEvent) => {
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
							{
								markerPosition: mouseEvent.latLng,
								windowContent: content,
								isWindowOpen: true,
							},
						])
						setDataReference('clicked')
					}
				}
			)
		},
		[setMarkerAndWindowInfoList]
	)

	// Note: 카카오맵 초기 설정
	useEffect(() => {
		if (!window.kakao || !mapContainerRef.current) {
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

		// 지도에 클릭 이벤트 리스너 추가
		kakao.maps.event.addListener(mapInstance, 'click', handleMapClick)

		// 맵 인스턴스 저장
		setMapInstance(mapInstance)
	}, [initialPosition])

	// Note: state 기반으로 지도에 마커와 인포윈도우 객체를 만들어서 배열에 저장
	useEffect(() => {
		if (!mapInstance || markerAndWindowInfoList.length === 0) return

		// 기존 마커는 제거
		markersAndInfoWindows.forEach(({ marker, infoWindow, isWindowOpen }) => {
			marker.setMap(null)
			isWindowOpen && infoWindow.close()
		})

		// 새로운 마커와 인포윈도우 리스트로 갱신
		const resultList = [] as IMarkerAndInfoWindowItem[]

		markerAndWindowInfoList.forEach(({ markerPosition, windowContent, isWindowOpen }) => {
			const newMarker = new kakao.maps.Marker({ position: markerPosition })
			const newInfoWindow = new kakao.maps.InfoWindow({ content: windowContent })

			resultList.push({ marker: newMarker, infoWindow: newInfoWindow, isWindowOpen })
		})

		setMarkersAndInfoWindows(resultList)
	}, [markerAndWindowInfoList, mapInstance])

	// Note: 마커 및 인포윈도우 리스트가 갱신되면 지도에 마커와 인포윈도우를 표시 + bounds 재설정 작업 진행
	// Note: 마커를 여러개 표시해야한다면 마커 클릭 이벤트 핸들러 등록 작업을 추가적으로 진행
	useEffect(() => {
		if (!mapInstance || markersAndInfoWindows.length === 0) return

		// 1. 초기 셋팅 및 클릭으로 인한 변경
		switch (dataReference) {
			case 'initial':
			case 'clicked':
				markersAndInfoWindows.forEach(({ marker, infoWindow, isWindowOpen }) => {
					marker.setMap(mapInstance)
					isWindowOpen && infoWindow.open(mapInstance, marker)
				})
				break
			case 'searched': {
				const bounds = new kakao.maps.LatLngBounds()
				markersAndInfoWindows.forEach(({ marker, infoWindow, isWindowOpen }) => {
					marker.setMap(mapInstance)
					isWindowOpen && infoWindow.open(mapInstance, marker)

					bounds.extend(marker.getPosition())

					// kakao.maps.event.addListener(marker, 'click', function () {
					// 	// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
					// 	if (isWindowOpen === false) {
					// 		setMarkerAndWindowInfoList(
					// 			markerAndWindowInfoList.map((item) => {
					// 				if (item.markerPosition !== marker.getPosition()) return item
					// 				return {
					// 					markerPosition: item.markerPosition,
					// 					windowContent: item.windowContent,
					// 					isWindowOpen: true,
					// 				}
					// 			})
					// 		)
					// 	}
					// })
				})
				mapInstance.setBounds(bounds)
				break
			}
			default:
				break
		}
	}, [markersAndInfoWindows, mapInstance])

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

	return <div id="map" ref={mapContainerRef} className="w-full h-full grow mb-10" />
}

export default KakaoMap
