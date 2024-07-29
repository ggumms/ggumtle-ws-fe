declare namespace kakao.maps {
	class LatLng {
		constructor(latitude: number, longitude: number)
		getLat(): number
		getLng(): number
	}

	class LatLngBounds {
		constructor(sw?: LatLng, ne?: LatLng)
		extend(latlng: LatLng): this
		getSouthWest(): LatLng
		getNorthEast(): LatLng
		isEmpty(): boolean
		equals(latlngBounds: LatLngBounds): boolean
		contain(latlng: LatLng): boolean
	}

	class Map {
		constructor(container: HTMLElement, options: MapOptions)
		setCenter(latlng: LatLng): void
		addControl(control: MapTypeControl | ZoomControl, position: ControlPosition): void
		setBounds(bounds: LatLngBounds, padding?: number | Padding): void
		destroy(): void
	}
	interface Padding {
		top: number
		right: number
		bottom: number
		left: number
	}

	class MapTypeControl {}

	class ZoomControl {}

	class Marker {
		constructor(options?: MarkerOptions)
		setMap(map: Map | null): void
		setPosition(position: LatLng): void
		getPosition(): LatLng
	}

	class InfoWindow {
		constructor(options?: InfoWindowOptions)
		open(map: Map, marker: Marker): void
		setContent(content: string): void
		getContent(): string
		close(): void
	}

	namespace event {
		function addListener(
			target: Map | Marker,
			type: string,
			handler: (mouseEvent: MouseEvent) => void
		): void
		function removeListener(
			target: Map,
			type: string,
			handler: (mouseEvent: MouseEvent) => void
		): void
	}

	namespace services {
		class Geocoder {
			coord2Address(
				longitude: number,
				latitude: number,
				callback: (result: AddressResult[], status: Status) => void
			): void
		}

		class Places {
			keywordSearch(
				keyword: string,
				callback: (result: PlacesSearchResult[], status: Status) => void
			): void
		}

		enum Status {
			OK = 'OK',
			ZERO_RESULT = 'ZERO_RESULT',
			ERROR = 'ERROR',
		}

		interface PlacesSearchResult {
			id: string
			place_name: string
			category_name: string
			category_group_code: string
			category_group_name: string
			phone: string
			address_name: string
			road_address_name: string
			x: string
			y: string
			place_url: string
			distance: string
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

interface IMarkerAndWindowInfo {
	markerPosition: LatLng
	windowContent: string
	isWindowOpen: boolean
}
