import { useCallback, useEffect, useRef, useState } from 'react'
import './map.css'

const CLICKED_MARKER_TITLE = '클릭한 위치'
const INITIAL_MARKER_TITLE = '현재 위치'

interface IKakaoMapProps {
	initialPosition: { latitude: number; longitude: number }
	markerInfoList: IMarkerInfo[]
	setMarkerInfoList: React.Dispatch<React.SetStateAction<IMarkerInfo[]>>
	dataReference: TMarkerAndWindowReference | null
	setDataReference: React.Dispatch<React.SetStateAction<TMarkerAndWindowReference | null>>
	activeMarkerTitle: string
	setActiveMarkerTitle: React.Dispatch<React.SetStateAction<string>>
}

const KakaoMap = ({
	initialPosition,
	markerInfoList,
	setMarkerInfoList,
	dataReference,
	setDataReference,
	// activeMarkerTitle,
	setActiveMarkerTitle,
}: IKakaoMapProps) => {
	// 지도 관련 ref들
	const mapContainerRef = useRef<HTMLDivElement>(null) // 지도를 표시할 div를 저장하는 ref
	const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null) // 지도 인스턴스를 관리하는 state
	// 지도 관련 state들
	const [markerInterfaces, setMarkerInterfaces] = useState<kakao.maps.Marker[]>([]) // 지도에 표시될 마커와 인포윈도우 리스트
	const [infoWindowInterfaces, setInfoWindowInterfaces] = useState<IInfoWindow>({})

	// 지도 클릭 이벤트 핸들러
	// -> dataReference와 MarkerInfoList state를 변경
	const handleMapClick = useCallback(
		(mouseEvent: kakao.maps.MouseEvent) => {
			setMarkerInfoList([
				{
					title: CLICKED_MARKER_TITLE,
					markerPosition: mouseEvent.latLng,
				},
			])
			setDataReference('clicked')
		},
		[setMarkerInfoList, setDataReference]
	)

	// Note: 카카오맵 초기 설정
	// - position을 받아올 때 한번만 생성하면된다.
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

	// Note: 마커 정보가 갱신되면 기존 지도에 있던 정보 초기화
	useEffect(() => {
		if (!mapInstance || markerInfoList.length === 0) return
		// 기존 마커 & infoWindow 인스턴스들은 지도에서 제거
		markerInterfaces.forEach((marker) => {
			marker.setMap(null)
		})
		Object.values(infoWindowInterfaces).forEach((infoWindow) => {
			infoWindow.close()
		})
	}, [markerInfoList, mapInstance])

	// Note: state 기반으로 지도에 마커 객체를 만들어서 배열에 저장
	useEffect(() => {
		if (!mapInstance || markerInfoList.length === 0) return

		// 새로운 마커 인스턴스를 생성하고 배열에 저장
		const markerResultList = [] as kakao.maps.Marker[]

		markerInfoList.forEach(({ markerPosition, title }) => {
			const newMarker = new kakao.maps.Marker({
				title: title,
				position: markerPosition,
				clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
			})
			markerResultList.push(newMarker)
		})

		setMarkerInterfaces(markerResultList)
	}, [markerInfoList, mapInstance])

	// Note: 마커 정보가 갱신 되면 인포 윈도우 인스턴스들을 생성하고 객체에 저장
	useEffect(() => {
		if (!mapInstance || markerInterfaces.length === 0) return

		const infoWindowResultObject = {} as IInfoWindow

		switch (dataReference) {
			case 'initial': {
				const contentText = INITIAL_MARKER_TITLE

				infoWindowResultObject[contentText] = new kakao.maps.InfoWindow({
					position: markerInterfaces[0].getPosition(),
					content: '<div style="padding:5px;font-size:12px;">' + INITIAL_MARKER_TITLE + '</div>',
					zIndex: 1,
				})

				setInfoWindowInterfaces(infoWindowResultObject)
				break
			}
			case 'clicked': {
				const contentText = CLICKED_MARKER_TITLE

				const geocoder = new kakao.maps.services.Geocoder()
				geocoder.coord2Address(
					markerInterfaces[0].getPosition().getLng(),
					markerInterfaces[0].getPosition().getLat(),
					(result, status) => {
						if (status === kakao.maps.services.Status.OK) {
							let detailAddr = result[0].road_address
								? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>'
								: ''
							detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>'

							const content =
								'<div class="bAddr">' +
								'<span class="title">법정동 주소정보</span>' +
								detailAddr +
								'</div>'

							infoWindowResultObject[contentText] = new kakao.maps.InfoWindow({
								position: markerInterfaces[0].getPosition(),
								content: '<div style="padding:5px;font-size:12px;">' + content + '</div>',
								zIndex: 1,
							})

							setInfoWindowInterfaces(infoWindowResultObject)
						}
					}
				)

				break
			}
			case 'searched': {
				markerInterfaces.forEach((marker) => {
					infoWindowResultObject[marker.getTitle()] = new kakao.maps.InfoWindow({
						position: marker.getPosition(),
						content: '<div style="padding:5px;font-size:12px;">' + marker.getTitle() + '</div>',
						zIndex: 1,
					})
				})

				setInfoWindowInterfaces(infoWindowResultObject)
				break
			}
		}
	}, [markerInterfaces, mapInstance])

	// Note: 마커 정보가 갱신 되면 지도에 마커를 표시
	// Todo: 마커를 여러개 표시해야한다면 마커 클릭 이벤트 핸들러 등록 작업을 추가적으로 진행
	useEffect(() => {
		if (!mapInstance || markerInterfaces.length === 0) return

		// 1. 초기 셋팅 및 클릭으로 인한 변경
		switch (dataReference) {
			case 'initial':
			case 'clicked':
				markerInterfaces.forEach((marker) => {
					marker.setMap(mapInstance)
				})

				break
			case 'searched': {
				const bounds = new kakao.maps.LatLngBounds()
				markerInterfaces.forEach((marker) => {
					marker.setMap(mapInstance)

					bounds.extend(marker.getPosition())
				})
				mapInstance.setBounds(bounds)
				break
			}
			default:
				break
		}
	}, [markerInterfaces])

	// Note: 마커 정보가 갱신 되면 지도에 infoWindow를 표시
	useEffect(() => {
		if (!mapInstance || markerInterfaces.length === 0) return

		switch (dataReference) {
			case 'initial':
				setActiveMarkerTitle((prev) => {
					infoWindowInterfaces[prev]?.close()
					return INITIAL_MARKER_TITLE
				})
				infoWindowInterfaces[INITIAL_MARKER_TITLE]?.open(mapInstance, markerInterfaces[0])
				break
			case 'clicked':
				setActiveMarkerTitle((prev) => {
					infoWindowInterfaces[prev]?.close()
					return CLICKED_MARKER_TITLE
				})
				infoWindowInterfaces[CLICKED_MARKER_TITLE]?.open(mapInstance, markerInterfaces[0])
				break
			case 'searched': {
				markerInterfaces.forEach((marker) => {
					// 1. 클릭했을 때, 마커의 타이틀을 활성화된 타이틀로 등록
					// 2. 이전 infoWindow를 닫고, 새로운 타이틀에 해당하는 infoWindow를 열어준다.
					kakao.maps.event.addListener(marker, 'click', () => {
						const clickedMarkerTitle = marker.getTitle()

						setActiveMarkerTitle((prev) => {
							infoWindowInterfaces[prev]?.close()
							return clickedMarkerTitle
						})
						infoWindowInterfaces[clickedMarkerTitle]?.open(mapInstance, marker)
					})
				})

				break
			}

			default:
				break
		}
	}, [infoWindowInterfaces])

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
