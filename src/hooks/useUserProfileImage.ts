import { useEffect, useState } from 'react'
import { useFileToUrl } from './useFileToUrl'

export const useUserProfileImage = (
	imageFile: File | null,
	currentUserProfileUrl: string | null
) => {
	const imageUrl = useFileToUrl(imageFile)
	const [profileUrl, setProfileUrl] = useState<string | null>(null)

	// profileUrl 설정
	// - profileUrl으론 imageUrl을 currentUserProfileUrl보다 우선적으로 반영
	// - 둘 다 없으면 null, 둘 다 있으면 imageUrl을 반영
	// - 둘 중 한개만 있으면 그것을 반영
	useEffect(() => {
		setProfileUrl(imageUrl ? imageUrl : currentUserProfileUrl)
	}, [imageFile, imageUrl])

	return profileUrl
}
