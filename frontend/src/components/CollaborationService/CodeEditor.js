import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import RandomColor from "randomcolor";
import "./CodeEditorAddons";
import "./CodeEditor.css";

const CodeEditor = (props) => {

  const roomId = props.roomId;
  
  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState("");
  
  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  useEffect(() => {
    
    if (EditorRef) {
      const ydoc = new Y.Doc();

      let provider = null;
      
      try {
        provider = new WebrtcProvider(roomId, ydoc, { signalling: ['ws://localhost:3000'] });

        const yText = ydoc.getText("codemirror");
        
        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness;
        
        // random colour for the user cursor
        const color = RandomColor(); 
        
        awareness.setLocalStateField("user", {
          name: `${roomId}`,
          color: color,
        });
        
        const getBinding = new CodemirrorBinding(yText, EditorRef, awareness, {
          yUndoManager,
        });

      } catch (err) {
        alert("There is an error in the collaborator, please refresh the page!");
      }
      return () => {
        if (provider) {
          provider.disconnect(); 
          ydoc.destroy(); 
        }
      };
    }
  }, [EditorRef]);

  return (
    <div
      style={{
        display: "flex",
        height: "99vh",
        width: "100%",
        fontSize: "16px",
        overflowY: "auto",
      }}
    >
      <CodeMirrorEditor
        onChange={(editor, data, value) => {
          setCode(value);
        }}
        autoScroll
        options={{
          mode: 'text/x-java',
          theme: "dracula", 
          lineWrapping: true,
          smartIndent: true,
          lineNumbers: true,
          foldGutter: true,
          tabSize: 2,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          autoCloseTags: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
          },
        }}
        editorDidMount={(editor) => {
          handleEditorDidMount(editor);
          editor.setSize("99vw", "100%");
        }}
      />
    </div>
  );
}

export default CodeEditor;
