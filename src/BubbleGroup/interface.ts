import { Message } from '../'
import ChatBubbleProps, {
  ChatBubbleAndGroupSharedProps
} from '../ChatBubble/interface'

export default interface BubbleGroupInterface
  extends ChatBubbleAndGroupSharedProps {
  id: string | number
  messages: Message[]
  senderName?: string
  showSenderName?: boolean
  chatBubble?: React.ComponentType<ChatBubbleProps>
}
