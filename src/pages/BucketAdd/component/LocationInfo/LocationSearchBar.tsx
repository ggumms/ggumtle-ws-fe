// import { useEffect, useRef } from 'react'
import colorPalette from '../../../../utilities/constants/colorPallet'
import { bgColorClass } from '../../../../utilities/constants/dynamicClass'
import { IoLocationSharp } from 'react-icons/io5'

interface ILocationSearchBarProps {
	setMarkerAndWindowInfoList: React.Dispatch<React.SetStateAction<IMarkerAndWindowInfo[]>>
}

const LocationSearchBar = ({ setMarkerAndWindowInfoList }: ILocationSearchBarProps) => {
	// const placeSearch = useRef<kakao.maps.services.Places | null>(null)
	console.log(setMarkerAndWindowInfoList)

	// useEffect(() => {
	// 	placeSearch.current = new kakao.maps.services.Places()
	// }, [])

	const handleSearchLocation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const searchWord = formData.get('searchWord') as string
		console.log(searchWord)
		// if (placeSearch.current) {
		// 	placeSearch.current.keywordSearch(searchWord, (result, status) => {
		// 		if (status === kakao.maps.services.Status.OK) {
		// 			result.forEach((place) => {
		// 				setMarkerAndInfoList((prev) => {
		// 					prev.forEach(({ marker, infoWindow }) => {
		// 						marker.setMap(null)
		// 						infoWindow.close()
		// 					})

		// 					const searchedMarker = new kakao.maps.Marker({})

		// 					return [{ marker: clickedMarker, infoWindow: clickedInfoWindow }]
		// 				})
		// 			})
		// 			// // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
		// 			// // LatLngBounds 객체에 좌표를 추가합니다
		// 			// const bounds = new kakao.maps.LatLngBounds()

		// 			// for (let i = 0; i < result.length; i++) {
		// 			// 	displayMarker(result[i])
		// 			// 	bounds.extend(new kakao.maps.LatLng(result[i].y, result[i].x))
		// 			// }

		// 			// // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
		// 			// map.setBounds(bounds)
		// 		}
		// 	})
		// }
	}

	return (
		<form
			onSubmit={handleSearchLocation}
			className={`flex ${bgColorClass['inputBg']} rounded-md items-center justify-center mb-4 px-4`}
		>
			<IoLocationSharp color={colorPalette.green} size={24} />
			<input
				name="searchWord"
				placeholder="장소, 지번 또는 도로명 검색"
				className={`grow outline-none bg-transparent text-base py-4 pl-2`}
			/>
		</form>
	)
}

export default LocationSearchBar
