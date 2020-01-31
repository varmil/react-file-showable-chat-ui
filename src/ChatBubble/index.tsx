import * as React from 'react'
import ChatBubbleProps from './interface'
import styles from './styles'

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {}
}

export default class ChatBubble extends React.Component<ChatBubbleProps> {
  public render() {
    const { bubblesCentered } = this.props
    let { bubbleStyles } = this.props
    bubbleStyles = bubbleStyles || defaultBubbleStyles
    const { userBubble, chatbubble, text } = bubbleStyles

    // message.id 0 is reserved for blue
    const chatBubbleStyles: React.CSSProperties =
      this.props.message.id === 0
        ? {
            ...styles.chatbubble,
            ...(bubblesCentered ? {} : styles.chatbubbleOrientationNormal),
            ...chatbubble,
            ...userBubble
          }
        : {
            ...styles.chatbubble,
            ...styles.recipientChatbubble,
            ...(bubblesCentered
              ? {}
              : styles.recipientChatbubbleOrientationNormal),
            ...chatbubble,
            ...userBubble
          }

    return (
      <div style={{ ...styles.chatbubbleWrapper }}>
        <div style={chatBubbleStyles}>
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
      </div>
    )
  }
}

export { ChatBubbleProps }
