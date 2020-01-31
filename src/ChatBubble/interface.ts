import Message from '../Message'
export default interface ChatBubbleProps extends ChatBubbleAndGroupSharedProps {
  message: Message
}

export interface ChatBubbleAndGroupSharedProps {
  bubbleStyles: BubbleStyles
  bubblesCentered?: boolean
}

export interface BubbleStyles {
  userBubble: React.CSSProperties
  chatbubble: React.CSSProperties
  text: React.CSSProperties
  mediaFile: React.CSSProperties
}
