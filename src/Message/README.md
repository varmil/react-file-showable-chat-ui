## Message

The `Message` object is the standard class for handling message data in `react-file-showable-chat-ui`.

#### Constructor

* **id**: The `id` of a message is a number used to identify which user created the message. It's used for grouping messages together and determining the bubble colour. _(This may be renamed in the future)_
* **message**: This is the actual text that will be displayed in the bubble
* **senderName** (optional): the sender name is an optional parameter that associates a name to a message _(can be thought of as a string representation of an `id`, although your id's will be unique, users may have the same name)_

```javascript
const myMessage = new Message({ id: 1, message: 'Hello World!', senderName: 'Elon Musk' })

const anotherMessage = new Message({ id: 0, message: 'Hey Elon!' })
```
