import React, { Component} from 'react';
import Conversation from 'chat-template/dist/Conversation';

class Chat extends Component {

  constructor() {
    super()
    this.state = {
      messageList: [{
        message:'How do I use this messaging app?',
        from: 'right',
        backColor: '#3d83fa',
        textColor: "white",
        avatar: 'https://www.seeklogo.net/wp-content/uploads/2015/09/google-plus-new-icon-logo.png',
        duration: 2000,
      },
      {
        message:'Easy',
        from: 'left',
        backColor: 'white ',
        textColor: "#3d83fa",
        avatar: 'https://www.seeklogo.net/wp-content/uploads/2015/09/google-plus-new-icon-logo.png',
        duration: 2000,
      }],
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _sendMessage(text) {
    console.log(text);
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

  render() {
    return (
      <div>
        <Conversation height={300} messages={this.state.messageList} turnOffLoop/>
        <input 
          type="text"
          className="Writer"
        />
      </div>
    );
  }
}

export default Chat;
