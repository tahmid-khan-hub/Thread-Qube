// components/LexicalEditor.jsx
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $getSelection } from "lexical";

function onError(error) {
  console.error("Lexical error:", error);
}

// Optional onChange handler to lift state
function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  return (
    <OnChangePlugin
      onChange={() => {
        editor.update(() => {
          const editorStateJSON = editor.getEditorState().toJSON();
          onChange(editorStateJSON);
        });
      }}
    />
  );
}

const LexicalEditor = ({ initialContent, onChange }) => {
  const editorConfig = {
    namespace: "Editor",
    theme: {
      paragraph: "editor-paragraph",
    },
    onError,
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border p-4 rounded shadow bg-white min-h-[200px]">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[150px]" />
          }
          placeholder={<p className="text-gray-400">Write something...</p>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyOnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
