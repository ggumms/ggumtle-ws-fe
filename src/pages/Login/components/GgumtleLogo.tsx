import React from 'react'
import Ggumtle from '../../../component/Ggumtle'

const GgumtleLogo = () => {
	return (
		<section className="flex flex-col items-center mb-16 mt-36">
			<Ggumtle color={'lightGreen'} width={120} height={120} explanation="꿈:틀 로고" />
			{/* // Todo : 글자 부분은 꿈을 담는 틀 -> 꿈:틀 이렇게 보이도록 css 이용해서 수정하기 */}
			<p className="text-xl mt-5 text-center">
				<strong>[꿈:틀]</strong>
				{/* <br /> */}
				{/* <strong className="text-base">꿈을 담는 틀</strong> */}
			</p>
		</section>
	)
}

export default GgumtleLogo
