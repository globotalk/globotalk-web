import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo-globotalk.svg';
import axios from 'axios';

import Message from './Message.js';



class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [],
        };

        this.share_on_twitter = false;

        this.url = 'https://globotalk-back.herokuapp.com';

        this.getMessages();

        setInterval(this.timer, 1000);
        
        this.submitMessage = this.submitMessage.bind(this);
    }

    getMessages() {
        var that = this;
        return axios.get(this.url + '/chat').then(function (response) {
            that.setState({
                chats: that.state.chats.concat(response.data)
            }, () => {
                ReactDOM.findDOMNode(that.refs.msg).value = "";
            });
        }).catch(function (error) {
            console.error(error);
        });
    }

    componentDidMount() {
        this.scrollToBot();
    }

    
    timer() {
        console.log(this);
    }


    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }


    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
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
        return axios.post(this.url + '/chat?video_id=' + message.video_id, message).then(function (response) {
            that.setState({
                chats: that.state.chats.concat(message)
            }, () => {
                ReactDOM.findDOMNode(that.refs.msg).value = "";
            });
        }).catch(function (error) {
            console.error(error);
        });
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