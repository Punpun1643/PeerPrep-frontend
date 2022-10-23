import React from 'react';

import './Message.css';

const Message = ({own}) => {
    return (
        <React.Fragment>
            <div className={own ? "message own" : "message"}>
                <div className="messageWrapper">
                    <p className="messageText">This is a message hahahahah erewnmf djwpfj wiopdfjwepfj</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Message;
