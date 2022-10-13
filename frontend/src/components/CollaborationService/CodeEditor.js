// import React, { useContext, useEffect, useState } from 'react';
// import { SocketContext } from './SocketContext'
// import CodeMirror from '@uiw/react-codemirror';
// import { dracula } from '@uiw/codemirror-theme-dracula';
// import { javascript } from '@codemirror/lang-javascript';
// import { java } from '@codemirror/lang-java';
// import { python } from '@codemirror/lang-python';
// import { sql } from  '@codemirror/lang-sql';
// import { cpp } from '@codemirror/lang-cpp';
// import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';

// import Box from '@mui/material/Box';

// const CodeEditor = (props) => {

//     //getting roomId
//     const roomId = props.roomId;
//     console.log(roomId);

//     //getting socket
//     const { getSocket } = useContext(SocketContext);
//     let socket = getSocket();
//     console.log(socket);

//     const [code, setCode] = useState();

//     useEffect( () => {
//         socket.on("connect", () => {
//             console.log(socket.connected); // true
//           });
        
//         socket.emit("join-collab-service", roomId);

//         setCode(! window.sessionStorage.getItem("code") ? "/*Type in your solution below*/"
//                                                         : window.sessionStorage.getItem("code"));

//         socket.on("sync-text", (text) => {
//             setCode(text);
//             window.sessionStorage.setItem("code", text);
//         });

//         return () => {
//             socket.disconnect();
//             window.sessionStorage.clear();
//             socket.connect();
//         } 

//     }, []);

    
//     return (
//         <div>
//             <CodeMirror
//                 value={code}
//                 height="99vh"
//                 theme={dracula}
//                 basicSetup={{
//                     foldGutter: false,
//                     dropCursor: false,
//                     allowMultipleSelections: false,
//                     indentOnInput: true
//                 }}
//                 extensions={[
//                     javascript({ jsx: true }), 
//                     java(),
//                     python(),
//                     sql(),
//                     cpp()
//                 ]}
//                 onChange={(value, viewUpdate) => {
//                     console.log('value:', value);
//                     socket.emit("on-keypress", value, roomId);
//                 }}
//             />
//         </div>
//     );
// }

// export default CodeEditor;

import { useEffect } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { QuillBinding } from "y-quill";
import ReactQuill from "react-quill";
import QuillCursors from "quill-cursors";
import "react-quill/dist/quill.snow.css";
import "./CodeEditor.css";

const CodeEditor = (props) => {

  const roomId = props.roomId;
  let quillRef = null;
  let reactQuillRef = null;

  useEffect(() => {
    attachQuillRefs();

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(roomId, ydoc, { signalling: ['ws://localhost:3000'] });
    const ytext = ydoc.getText("quill");

    const binding = new QuillBinding(ytext, quillRef, provider.awareness);

    return () => {

        //disconnect and destroy webrtc connection when leaving page
        provider.disconnect();
        provider.destroy();
    }
  }, []);

  const attachQuillRefs = () => {
    if (typeof reactQuillRef.getEditor !== "function") return;
    quillRef = reactQuillRef.getEditor();
  };


  

  return (
    <div>
      <ReactQuill className="code-editor"
        ref={(el) => {
          reactQuillRef = el;
        }}
        theme={"snow"}
        style={{height: "99vh", backgroundColor: "white" }}
      />
    </div>
  );
};

export default CodeEditor;