import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo-globotalk.svg'; 
import axios from 'axios';

import Message from './Message.js';



class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: []
        };

        this.url = 'https://globotalk-back.herokuapp.com';

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }


    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
    }
  
    submitMessage(e) {
        e.preventDefault();
        const message = {
            username: "Bianca Rosa",
            content: ReactDOM.findDOMNode(this.refs.msg).value,
            img: "https://en.gravatar.com/userimage/29402383/633e9f144e450155ee10bf7bf2bc1077.jpeg",
            status: 1, // Created
        }
        axios.post(this.url + '/chat', {
            "message": message.content,
            "video_id": 1, //TODO: Video instead of topic
            "share_on_twitter": false,
            "uuid": this.uuidv4()
        }).then(function (response) {
            message.status = 2; // Success
        }).catch(function (error) {
            message.status = 3; // Error
        }); 
        this.setState({
            chats: this.state.chats.concat(message)
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }

    render() {
        const username = "Bianca Rosa";
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3><img src={logo} alt="globotalk" className="logo"/></h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <button type="submit">
                        <i className="fas fa-angle-double-right"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default Chatroom;