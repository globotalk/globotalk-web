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

    submitMessage(e) {
        e.preventDefault();
        const message = ReactDOM.findDOMNode(this.refs.msg).value;

        axios.post(this.url + '/chat', {
            "message": message,
            "topic": "content-1",
            "share_on_twitter": true
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        this.setState({
            chats: this.state.chats.concat([{
                username: "Bianca Rosa",
                content: <p>{message}</p>,
                img: "https://en.gravatar.com/userimage/29402383/633e9f144e450155ee10bf7bf2bc1077.jpeg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }

    render() {
        const username = "Bianca Rosa";
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3><img src={logo} className="logo"/></h3>
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