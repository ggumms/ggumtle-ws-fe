const ALLOW_EXTENSION_LIST = ['jpg', 'jpeg', 'png', 'gif']
const FILE_SIZE_MAX_LIMIT = 1 * 1024 * 1024 // 1MB

export const isValidImageFile = (imageFile: File): boolean => {
	// 파일이 비었는지 검사
	if (imageFile === undefined) {
		alert('선택된 파일이 없습니다.')
		return false
	}

	// 파일의 확장자가 유효한지 검사
	if (!checkFileHasValidExtension(imageFile.name)) {
		alert('유효한 파일이 입력되지 않았습니다.')
		return false
	}

	// 파일의 사이즈가 유효한지 검사
	if (!checkFileSizeIsValid(imageFile.size)) {
		alert('파일의 용량이 너무 큽니다.')
		return false
	}

	return true
}

export const checkFileHasValidExtension = (fileName: string): boolean => {
	const extension = getFileExtension(fileName)

	if (ALLOW_EXTENSION_LIST.indexOf(extension) >= 0) return true
	return false
}

export const getFileExtension = (originalFileName: string): string => {
	// 마지막 .의 위치를 구한다
	// 마지막 .의 위치다음이 파일 확장자를 의미한다
	const lastIndex = originalFileName.lastIndexOf('.')

	// 확장자가 존재하지 않는 경우
	// 파일 이름에서 .이 존재하지 않는 경우이다.
	if (lastIndex < 0) {
		return ''
	}

	// substring을 함수를 이용해 확장자만 잘라준다
	// lastIndex의 값은 마지막 .의 위치이기 때문에 해당 위치 다음부터 끝까지 문자열을 잘라준다.
	// 문자열을 자른 후 소문자로 변경시켜 확장자 값을 반환 해준다.
	return originalFileName.substring(lastIndex + 1).toLowerCase()
}

// 파일 용량이 적절한지 검사
export const checkFileSizeIsValid = (fileSize: number): boolean => {
	if (fileSize > FILE_SIZE_MAX_LIMIT) return false

	return true
}
