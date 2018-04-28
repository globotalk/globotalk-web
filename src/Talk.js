import React, { Component} from 'react';
import Chat from 'chat-template/dist/Chat';

class Talk extends Component {

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
  
  render() {
    return (
      <div>
          <Chat messages={this.state.messageList} turnOffLoop />
      </div>
    );
  }
}

export default Chat;
