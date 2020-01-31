import * as React from 'react'
import ChatBubbleProps, { BubbleStyles } from './interface'
import styles from './styles'

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {},
  mediaFile: {}
}
const isValidUrl = (string: string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}
const isImg = (ext: string) =>
  ['jpg', 'jpeg', 'png', 'gif'].some(s => s === ext)
const isDoc = (ext: string) => ['pdf', 'xlsx', 'csv'].some(s => s === ext)
const isMov = (ext: string) => ['mp4', 'avi', 'mov'].some(s => s === ext)

export default class ChatBubble extends React.Component<ChatBubbleProps> {
  // create different UI according to the file extension
  factoryMediaFileUI(bubbleStyles: BubbleStyles) {
    const { message } = this.props
    const { mediaFile, text } = bubbleStyles
    const ext = message.message.split('.').pop()

    if (isImg(ext)) {
      return (
        <div style={{ padding: 10, ...mediaFile }}>
          <img style={{ width: '100%' }} src={message.message} />
        </div>
      )
    }
    if (isDoc(ext)) {
      return null
    }
    if (isMov(ext)) {
      return (
        <div style={{ padding: 10, ...mediaFile }}>
          <video controls style={{ width: '100%' }} src={message.message} />
        </div>
      )
    }

    // default: use a tag
    return (
      <a
        style={{ wordBreak: 'break-all', textDecoration: 'none' }}
        href={message.message}
      >
        <p style={{ ...styles.p, ...text }}>{message.message}</p>
      </a>
    )
  }

  render() {
    const { bubblesCentered, message } = this.props
    let { bubbleStyles } = this.props
    bubbleStyles = bubbleStyles || defaultBubbleStyles
    const { userBubble, chatbubble, text } = bubbleStyles

    // message.id 0 is reserved for blue
    const chatBubbleStyles: React.CSSProperties =
      message.id === 0
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
          {message.isMediaFile !== false && isValidUrl(message.message) ? (
            this.factoryMediaFileUI(bubbleStyles)
          ) : (
            <p style={{ ...styles.p, ...text }}>{message.message}</p>
          )}
        </div>
      </div>
    )
  }
}

export { ChatBubbleProps }
