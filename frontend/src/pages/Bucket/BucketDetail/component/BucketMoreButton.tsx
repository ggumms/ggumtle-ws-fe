import { Menu, Transition } from '@headlessui/react'
import { AiOutlineMore } from 'react-icons/ai'
import { useRouter } from '../../../../hooks/useRouter'
import { useParams } from 'react-router'
import { deleteBucket } from '../api'

const BucketMoreButton = () => {
	const { routeTo } = useRouter()
	const { bucketId } = useParams()

	const handleClickModifyButton = () => {
		routeTo(`/bucket/modify/${bucketId}`)
	}

	const handleClickDeleteButton = async () => {
		if (!bucketId) {
			return
		}

		const deleteRes = await deleteBucket(bucketId)
		if (deleteRes === 'success') {
			routeTo('/mypage')
		}
	}

	return (
		<div>
			<Menu as="div" className="relative">
				<Menu.Button>
					<AiOutlineMore color="#767676" size={24} />
				</Menu.Button>
				<Transition
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<Menu.Items
						as="ul"
						className="absolute z-10 mt-2 origin-top-right translate-x-1/2 bg-white divide-gray-100 rounded-sm shadow-lg right-1/2 ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
						<Menu.Item as="li">
							<button onClick={handleClickModifyButton} className="p-3 text-base w-14 text-point1">
								수정
							</button>
						</Menu.Item>
						<Menu.Item as="li">
							<button onClick={handleClickDeleteButton} className="p-3 text-base w-14 text-point1">
								삭제
							</button>
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}

export default BucketMoreButton