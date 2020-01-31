/**
 * A statndardized message object for use
 * in rendering messages in the chat feed.
 */

interface MessageData {
  /**
   * Message object for organizing and storing current message data.
   * id of the sender (0 is reserved for "blue bubble")
   */
  id: number | string
  /**
   * text ex(hello world) / URL of mediaFile ex(https://xxx.yyy.jpg)
   */
  message: string
  senderName?: string
  /**
   * TRUE means its a file, not a text message
   * FALSE means its a plain text message
   */
  isMediaFile?: boolean
}

export default class Message {
  id: number | string
  message: string
  senderName?: string
  isMediaFile?: boolean

  constructor(messageData: MessageData) {
    this.id = messageData.id
    this.message = messageData.message
    this.senderName = messageData.senderName || undefined
    this.isMediaFile = messageData.isMediaFile
  }
}
