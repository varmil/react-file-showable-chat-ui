export default {
  chatbubbleWrapper: {
    overflow: 'auto'
  },
  chatbubble: {
    color: 'white',
    backgroundColor: '#007aff',
    borderRadius: 20,
    marginTop: 1,
    marginRight: 'auto',
    marginBottom: 1,
    marginLeft: 'auto',
    maxWidth: 425,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    width: '-webkit-fit-content'
  },
  chatbubbleOrientationNormal: {
    float: 'right'
  },
  recipientChatbubble: {
    backgroundColor: '#f4f4f8',
    color: 'black'
  },
  recipientChatbubbleOrientationNormal: {
    float: 'left'
  },
  p: {
    fontSize: 16,
    fontWeight: 300,
    margin: 0
  },
  docs: {
    display: 'flex',
    color: 'black',
    cursor: 'pointer',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
    border: 'gray 1px solid',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap'
  }
} as { [key: string]: React.CSSProperties }
