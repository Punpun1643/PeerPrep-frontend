import React, { useContext, useEffect } from 'react';
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

const CodeEditor = () => {

    //getting socket
    const { getSocket } = useContext(SocketContext);
    let socket = getSocket();
    console.log(socket);

    const code = '/*Type in your solution below*/';
    
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
                    console.log('value:', value);
                    socket.emit("on-keypress", { value: value,
                                                 });
                }}
            />
        </div>
    );
}

export default CodeEditor;
