import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationHeader from '../../NavigationHeader'
import { MultiPageHeaderInfo } from '../../../types/router'

interface MultiPageLayoutProps {
	headerData: MultiPageHeaderInfo[]
}

// TODO: div 태그 삭제하기
const MultiPageLayout = ({ headerData }: MultiPageLayoutProps) => {
	return (
		<div className="flex flex-col h-screen px-5 pt-16 pb-12">
			<NavigationHeader headerData={headerData} />
			<Outlet />
		</div>
	)
}

export default MultiPageLayout
