import { useEffect, useRef } from 'react'
import colorPalette from '../../../../utilities/constants/colorPallet'
import { bgColorClass } from '../../../../utilities/constants/dynamicClass'
import { IoLocationSharp } from 'react-icons/io5'
import { useBucketStore } from '../../../../stores/clientState/bucketAddStore'

interface ILocationSearchBarProps {
	setMarkerInfoList: React.Dispatch<React.SetStateAction<IMarkerInfo[]>>
	setDataReference: React.Dispatch<React.SetStateAction<TMarkerAndWindowReference | null>>
}

const LocationSearchBar = ({ setMarkerInfoList, setDataReference }: ILocationSearchBarProps) => {
	const placeSearch = useRef<kakao.maps.services.Places | null>(null)
	const { changeCoordinate } = useBucketStore()

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
				const searchResultList = [] as IMarkerInfo[]

				// 검색 결과가 있다면
				if (status === kakao.maps.services.Status.OK) {
					// 검색 결과를 결과 저장 리스트에 추가
					result.forEach((place) => {
						searchResultList.push({
							markerPosition: new kakao.maps.LatLng(Number(place.y), Number(place.x)),
							title: place.place_name,
						})
					})
				}
				setMarkerInfoList(searchResultList)
				setDataReference('searched')
				changeCoordinate(null, null)
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
