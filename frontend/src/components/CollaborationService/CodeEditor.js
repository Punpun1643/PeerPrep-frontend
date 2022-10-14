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