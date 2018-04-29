import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo-globotalk.svg';
import axios from 'axios';

import Message from './Message.js';

const url = 'https://globotalk-back.herokuapp.com';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [],
        };

        this.share_on_twitter = false;

        this.getMessages(this);

        this.submitMessage = this.submitMessage.bind(this);

        var self = this;
        setInterval(function() {
            self.getMessages(self);
        }, 100);
    }

    getMessages(obj) {
        return axios.get(url + '/chat').then(function (response) {
            if (response.data.length !== obj.state.chats.length) {
                obj.setState({
                    chats: obj.state.chats.concat(response.data)
                }, () => {
                    ReactDOM.findDOMNode(obj.refs.msg).value = "";
                });
            }
        }).catch(function (error) {
            console.error(error);
        });
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
        const message = {
            username: "Bianca Rosa",
            message: ReactDOM.findDOMNode(this.refs.msg).value,
            img: "https://en.gravatar.com/userimage/29402383/633e9f144e450155ee10bf7bf2bc1077.jpeg",
            video_id: 1,
            share_on_twitter: this.share_on_twitter,
        }
        var that = this;
        return axios.post(url + '/chat?video_id=' + message.video_id, message);
    }

    changeShareOnTwitter() {
        console.log(this.share_on_twitter);
        this.share_on_twitter = !this.share_on_twitter;
    }

    render() {
        const username = "Bianca Rosa";
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3><img src={logo} alt="globotalk" className="logo" /></h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) =>
                            <Message chat={chat} user={username} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="checkbox" onChange={() => this.changeShareOnTwitter()}/>
                    <i className="fab fa-twitter"/>
                    <button type="submit">
                        <i className="fas fa-angle-double-right"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default Chatroom;