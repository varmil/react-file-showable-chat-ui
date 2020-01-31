import * as React from 'react'
import BubbleGroup from '../BubbleGroup'
import DefaultChatBubble, { ChatBubbleProps } from '../ChatBubble'
import ChatInput from '../ChatInput'
import Message from '../Message'
import styles from './styles'
import { BubbleStyles } from '../ChatBubble/interface'

// Model for ChatFeed props.
interface ChatFeedInterface {
  bubblesCentered?: boolean
  bubbleStyles?: BubbleStyles
  hasInputField?: boolean
  isTyping?: boolean
  maxHeight?: number
  messages: Message[]
  showSenderName?: boolean
  chatBubble?: React.ComponentType<ChatBubbleProps>
}

// React component to render a complete chat feed
export default class ChatFeed extends React.Component<ChatFeedInterface> {
  chat: {
    scrollHeight: number
    clientHeight: number
    scrollTop: number
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const scrollHeight = this.chat.scrollHeight
    const height = this.chat.clientHeight
    const maxScrollTop = scrollHeight - height
    this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }

  /**
   * Determines what type of message/messages to render.
   */
  renderMessages(messages: Message[]) {
    const { isTyping, bubbleStyles, chatBubble, showSenderName } = this.props
    const ChatBubble = chatBubble || DefaultChatBubble
    let group: Message[] = []

    const messageNodes = messages.map((message, index) => {
      group.push(message)
      // Find diff in message type or no more messages
      if (
        index === messages.length - 1 ||
        messages[index + 1].id !== message.id
      ) {
        const messageGroup = group
        group = []
        return (
          <BubbleGroup
            key={index}
            id={message.id}
            messages={messageGroup}
            showSenderName={showSenderName}
            chatBubble={ChatBubble}
            bubbleStyles={bubbleStyles}
          />
        )
      }

      return null
    })

    // Other end is typing...
    if (isTyping) {
      messageNodes.push(
        <div key="isTyping" style={{ ...styles.chatbubbleWrapper }}>
          <ChatBubble
            message={new Message({ id: 1, message: '...', senderName: '' })}
            bubbleStyles={bubbleStyles}
          />
        </div>
      )
    }

    return messageNodes
  }

  /**
   * render : renders our chatfeed
   */
  render() {
    const inputField = this.props.hasInputField && <ChatInput />
    const { maxHeight } = this.props

    return (
      <div id="chat-panel" style={styles.chatPanel}>
        <div
          ref={c => {
            this.chat = c
          }}
          className="chat-history"
          style={{ ...styles.chatHistory, maxHeight }}
        >
          <div className="chat-messages">
            {this.renderMessages(this.props.messages)}
          </div>
        </div>
        {inputField}
      </div>
    )
  }
}
