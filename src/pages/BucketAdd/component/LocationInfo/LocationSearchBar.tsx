import colorPalette from '../../../../utilities/constants/colorPallet'
import { bgColorClass } from '../../../../utilities/constants/dynamicClass'
import { IoLocationSharp } from 'react-icons/io5'

interface ILocationSearchBarProps {
	setMarkerAndInfoList: React.Dispatch<React.SetStateAction<IMarkerAndInfo[]>>
}

const LocationSearchBar = ({ setMarkerAndInfoList }: ILocationSearchBarProps) => {
	console.log(setMarkerAndInfoList)
	const handleSearchLocation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const searchWord = formData.get('searchWord')
		console.log(searchWord)
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
