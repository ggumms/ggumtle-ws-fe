import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { kakao }: any = window

// 컴포넌트 마운트 시 지도 객체 생성
const KakaoMap = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = mapContainerRef.current
		if (container) {

			// 지도 생성에 필요한 기본 옵션
			const options = {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 3,
			}

			// 지도 태그의 ref와 option을 이용해 화면에 지도 생성 및 객체 리턴
			const mapInstance = new kakao.maps.Map(container, options)
			console.log(mapInstance)
		}
	}, [])

	return (
		<div id="map" ref={mapContainerRef} 
    className='w-full h-full grow mb-10'
    // style={{ width: '500px', height: '400px' }}
    >
			지도 표시 영역
		</div>
	)
}

export default KakaoMap
