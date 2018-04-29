import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo-globotalk.png';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = 'https://globotalk-back.herokuapp.com';
// const url = 'http://localhost:3000';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video: null,
        };

        this.loadVideo();
    }

    loadVideo() {
        var obj = this;
        return axios.get(url + '/videos').then(function (response) {
            obj.setState({
                video: response.data
            }, () => {
                ReactDOM.findDOMNode(obj.refs.msg).value = "";
            });
        }).catch(function (error) {
            console.error(error);
        });
    }
    
    render() {
        const { video } = this.state;

        return (
            <div className="chatroom home">
                <h3><img src={logo} alt="globotalk" className="logo" /></h3>
                {video ? 
                    <div className="now-watching">
                        <p>Você está assistindo a...</p>
                        <p>{video.title}</p>
                        <img src={video.image}/>
                        <Link to="/chat">
                            <button className="talk">talk!</button>
                        </Link>
                    </div>
                : null }
            </div>
        );
    }
}

export default Home;