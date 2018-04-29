import React from 'react';

const Message = ({ chat, user }) => (
    <li className={`chat ${user === chat.username ? "right" : "left"}`}>
        {chat.img ? 
            (user !== chat.username
            && <img src={chat.img} alt={`${chat.username}'s profile pic`} />) 
            : null
        }
        <p>{chat.message}</p>
    </li>
);

export default Message;