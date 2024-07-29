import { useEffect, useRef } from 'react'
import colorPalette from '../../../../utilities/constants/colorPallet'
import { bgColorClass } from '../../../../utilities/constants/dynamicClass'
import { IoLocationSharp } from 'react-icons/io5'

interface ILocationSearchBarProps {
	setMarkerAndWindowInfoList: React.Dispatch<React.SetStateAction<IMarkerAndWindowInfo[]>>
}

const LocationSearchBar = ({ setMarkerAndWindowInfoList }: ILocationSearchBarProps) => {
	const placeSearch = useRef<kakao.maps.services.Places | null>(null)

	useEffect(() => {
		placeSearch.current = new kakao.maps.services.Places()
	}, [])

	const handleSearchLocation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const searchWord = formData.get('searchWord') as string
		console.log(searchWord)

		if (placeSearch.current) {
			placeSearch.current.keywordSearch(searchWord, (result, status) => {
				const searchResultList = [] as IMarkerAndWindowInfo[]
				if (status === kakao.maps.services.Status.OK) {
					// 검색 결과를 결과 저장 리스트에 추가
					// Todo: 여러 개의 마커를 표시할 경우에 대한 처리 필요
					// 1. 지도에서 마커를 표시할 때 마커에 클릭 이벤트 핸들러를 통해 인포 윈도우 토글 기능을 추가해줘야함
					// 2. 모든 마커가 표시될 수 있도록 지도의 bounds를 재설정해줘야함
					result.forEach((place) => {
						searchResultList.push({
							markerPosition: new kakao.maps.LatLng(Number(place.y), Number(place.x)),
							windowContent:
								'<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
							isWindowOpen: false,
						})
					})
				}
				setMarkerAndWindowInfoList(searchResultList)
			})
		}
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
