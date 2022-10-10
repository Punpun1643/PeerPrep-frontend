import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from './SocketContext'
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { sql } from  '@codemirror/lang-sql';
import { cpp } from '@codemirror/lang-cpp';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';

import Box from '@mui/material/Box';

const CodeEditor = (props) => {

    //getting roomId
    const roomId = props.roomId;
    console.log(roomId);

    //getting socket
    const { getSocket } = useContext(SocketContext);
    let socket = getSocket();
    console.log(socket);

    const [code, setCode] = useState();

    useEffect( () => {
        socket.on("connect", () => {
            console.log(socket.connected); // true
          });
        
        socket.emit("join-collab-service", roomId);

        setCode(! window.sessionStorage.getItem("code") ? "/*Type in your solution below*/"
                                                        : window.sessionStorage.getItem("code"));

        socket.on("sync-text", (text) => {
            setCode(text);
            window.sessionStorage.setItem("code", text);
        });

        return () => {
            socket.disconnect();
            window.sessionStorage.clear();
            socket.connect();
        } 

    }, []);

    
    return (
        <div>
            <CodeMirror
                value={code}
                height="99vh"
                theme={dracula}
                basicSetup={{
                    foldGutter: false,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: true
                }}
                extensions={[
                    javascript({ jsx: true }), 
                    java(),
                    python(),
                    sql(),
                    cpp()
                ]}
                onChange={(value, viewUpdate) => {
                    socket.emit("on-keypress", value, roomId);
                }}
            />
        </div>
    );
}

export default CodeEditor;
