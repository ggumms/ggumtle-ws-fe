import { ReactNode } from 'react'

interface IDefaultLayoutProps {
	children: ReactNode
}

/* 컨텐츠가 많아짐에 	 width를 넘어가는 문제 해결을 위한 max-width 지정 */
const DefaultLayout = ({ children }: IDefaultLayoutProps) => {
	return (
		<div className="flex h-screen">
			<div className="relative flex flex-col max-w-full px-5 overflow-auto grow">{children}</div>
		</div>
	)
}

export default DefaultLayout
