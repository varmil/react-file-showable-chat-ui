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
    const url = message.message
    const { mediaFile, text } = bubbleStyles
    const ext = url.split('.').pop()

    if (isImg(ext)) {
      return (
        <div style={{ padding: 10, ...mediaFile }}>
          <img style={{ width: '100%' }} src={url} />
        </div>
      )
    }
    if (isDoc(ext)) {
      return (
        <a
          style={{ display: 'block', textDecoration: 'none' }}
          href={message.message}
        >
          <div style={{ ...styles.docs, ...mediaFile }}>
            <div style={{ marginRight: 5 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height={18}
              >
                <path
                  fill="currentColor"
                  d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
            </div>
            <div>{url}</div>
          </div>
        </a>
      )
    }
    if (isMov(ext)) {
      return (
        <div style={{ padding: 10, ...mediaFile }}>
          <video controls style={{ width: '100%' }} src={url} />
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
