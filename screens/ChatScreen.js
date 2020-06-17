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

  async onSend(messages = []) {
    let reply = await processIntent(messages[0].text)
    // messages.push(reply)
    // console.log(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, reply),
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

const processIntent = (message) => {
  console.log(message)
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then(res =>
        res.json()
      )
      .then(data => {
        console.log('halo')
        console.log(data)
        let message = [{
          _id: 3,
          text: data.message,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require('../assets/images/mascot.png'),
          },
        }]

        resolve(message)
      })
      .catch((error) => {
        reject(error);
      });
  })

}