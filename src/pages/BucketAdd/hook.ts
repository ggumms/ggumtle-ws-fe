import { useEffect, useState } from 'react'

interface ICoordinate {
	longitude: number
	latitude: number
}

export const useGetCurrentPosition = (): ICoordinate | null => {
	const [coordinate, setCoordinate] = useState<ICoordinate | null>(null)

	useEffect(() => {
		if ('geolocation' in navigator) {
			// 위치정보 사용 가능
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					setCoordinate({ latitude, longitude })
				},
				(error) => {
					console.error('Error obtaining location', error)
				}
			)
		} else {
			// 위치정보 사용 불가능
			console.error('Geolocation is not supported by this browser.')
		}
	}, [])

	return coordinate
}

export const useGetCurrentAddress = (latitude: number | null, longitude: number | null) => {
	const [defaultAddress, setDefaultAddress] = useState<string | null>(null)
	const [loadAddress, setLoadAddress] = useState<string | null>(null)

	useEffect(() => {
		if (latitude && longitude) {
			const geocoder = new kakao.maps.services.Geocoder()
			geocoder.coord2Address(longitude, latitude, (result, status) => {
				if (status === kakao.maps.services.Status.OK) {
					setDefaultAddress(result[0].address.address_name)
					result[0].road_address && setLoadAddress(result[0].road_address.address_name)
				}
			})
		}
	}, [latitude, longitude])

	return { defaultAddress, loadAddress }
}
