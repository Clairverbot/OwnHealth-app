import * as React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
export default class LinksScreen extends React.Component {

  state = {
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello john',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require('../assets/images/mascot.png'),
          },
        }
      ]
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        isAnimated
        scrollToBottom={true}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

