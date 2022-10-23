import React from 'react';
import Message from './components/Message';

import './ChatDisplay.css';

const ChatDisplay = (props) => {
    return (
        <React.Fragment>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Message"></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChatDisplay;
