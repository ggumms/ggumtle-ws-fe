import { useEffect, useState } from 'react'

export const useFileToUrl = (imageFile: File | null) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null)

	// File 객체를 URL.createObjectURL()을 사용하여 URL로 변환
	// 서버로 데이터를 전송하기 전에 이미지 파일을 미리보기로 보여주기 위해 사용
	useEffect(() => {
		const reader = new FileReader()

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const result = e.target?.result
			if (typeof result === 'string') {
				setImageUrl(result)
			}
		}

		imageFile instanceof File && reader && reader.readAsDataURL(imageFile)
	}, [imageFile])

	return imageUrl
}
