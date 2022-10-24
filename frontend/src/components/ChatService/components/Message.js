import React from 'react';

import './Message.css';

const Message = (props, {own}) => {
    return (
        <React.Fragment>
            <div className={own ? "message own" : "message"}>
                <div className="messageWrapper">
                    <p className="messageText">{props.message}</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Message;
