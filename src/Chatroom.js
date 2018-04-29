import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo-globotalk.png';
import axios from 'axios';
import './App.css';
import Message from './Message.js';
import _ from 'lodash';

const url = 'https://globotalk-back.herokuapp.com';
// const url = 'http://localhost:3000';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [],
        };

        this.share_on_twitter = false;
        this.share_moment = false;

        this.getMessages(this);

        this.submitMessage = this.submitMessage.bind(this);

        var self = this;
        setInterval(function() {
            self.getMessages(self);
        }, 10000);
    }

    getMessages(obj) {
        return axios.get(url + '/all?video_id=6328393').then(function (response) {
            if (response.status == 200 && response.data.length !== obj.state.chats.length) {
                var msgs = _.map(response.data, function(obj) {
                    return _.assign(obj, _.find(obj, {message: obj.message}));
                });
                msgs = _.sortBy(msgs, 'timestamp')
                obj.setState({
                    chats: msgs
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
            username: "Leonardo Menezes",
            message: ReactDOM.findDOMNode(this.refs.msg).value,
            img: "blob:https://web.telegram.org/b76d8724-ec37-47d9-861c-e6c3466027f5",
            video_id: 6328393,
            share_on_twitter: this.share_on_twitter,
            share_moment: this.share_moment
        }
        var that = this;
        return axios.post(url + '/chat?video_id=' + message.video_id, message).then(function(response) {
            that.setState({
                chats: that.state.chats.concat(message)
            }, () => {
                ReactDOM.findDOMNode(that.refs.msg).value = "";
            });
        }).catch(function (error) {
            console.error(error);
        });;
    }

    changeShareOnTwitter() {
        this.share_on_twitter = !this.share_on_twitter;
    }

    changeMoment() {
        this.share_moment = true;
    }

    render() {
        const username = "Leonardo Menezes";
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
                    <input type="checkbox" onChange={() => this.changeMoment()}/>
                    <i className="fas fa-film"/>
                    <button type="submit">
                        <i className="fas fa-angle-double-right"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default Chatroom;