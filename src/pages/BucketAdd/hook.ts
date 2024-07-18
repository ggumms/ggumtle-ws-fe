import { useEffect, useState } from "react"

interface ICoordinate {
  longitude: number | null
  latitude: number | null
}

export const useGetCurrentPosition = (): ICoordinate => {
  const [coordinate, setCoordinate] = useState<ICoordinate | null>(null)

  useEffect(()=>{
    if ("geolocation" in navigator) {
      // 위치정보 사용 가능
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinate({latitude, longitude})
        },
        (error) => {
          console.error('Error obtaining location', error);
        }
      );
    } else {
      // 위치정보 사용 불가능
      console.error('Geolocation is not supported by this browser.');
    }
  },[])
  
  return coordinate ?? {latitude: null, longitude: null}
}