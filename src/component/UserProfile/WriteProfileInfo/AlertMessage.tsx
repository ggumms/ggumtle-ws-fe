import { NicknameAlertMessages, NicknameMsgType } from '../../../types/user.d'

interface AlertMessagesProps {
	messageStatus: NicknameMsgType
}

const AlertMessages = ({ messageStatus }: AlertMessagesProps) => {
	return (
		<>
			{messageStatus !== 'initial' && (
				<p
					className={`mt-2 text-xs text-darkGray1 
			${messageStatus === 'valid' ? 'text-green1' : messageStatus === 'loading' ? 'text-darkGray1' : 'text-red'}
			
		}`}
				>
					{NicknameAlertMessages[messageStatus]}
				</p>
			)}
		</>
	)
}

export default AlertMessages
