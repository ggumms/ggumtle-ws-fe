declare namespace kakao.maps {
	class LatLng {
		constructor(latitude: number, longitude: number)
		getLat(): number
		getLng(): number
	}

	class Map {
		constructor(container: HTMLElement, options: MapOptions)
		setCenter(latlng: LatLng): void
		addControl(control: MapTypeControl | ZoomControl, position: ControlPosition): void
	}

	class MapTypeControl {}

	class ZoomControl {}

	class Marker {
		constructor(options?: MarkerOptions)
		setMap(map: Map | null): void
		setPosition(position: LatLng): void
	}

	class InfoWindow {
		constructor(options?: InfoWindowOptions)
		open(map: Map, marker: Marker): void
		setContent(content: string): void
	}

	namespace event {
		function addListener(target: Map, type: string, handler: (mouseEvent: MouseEvent) => void): void
	}

	namespace services {
		class Geocoder {
			coord2Address(
				longitude: number,
				latitude: number,
				callback: (result: AddressResult[], status: Status) => void
			): void
		}

		interface AddressResult {
			road_address?: RoadAddress
			address: Address
		}

		interface Address {
			address_name: string
		}

		interface RoadAddress {
			address_name: string
		}

		enum Status {
			OK = 'OK',
			ZERO_RESULT = 'ZERO_RESULT',
			ERROR = 'ERROR',
		}
	}

	interface MapOptions {
		center: LatLng
		level: number
	}

	enum ControlPosition {
		TOPRIGHT = 'TOPRIGHT',
		RIGHT = 'RIGHT',
	}

	interface MarkerOptions {
		position?: LatLng
	}

	interface InfoWindowOptions {
		position?: LatLng
		content?: string
		zIndex?: number
	}

	interface MouseEvent {
		latLng: LatLng
	}
}
