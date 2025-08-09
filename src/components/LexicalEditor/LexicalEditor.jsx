import React, { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

function onError(error) {
  console.error("Lexical error:", error);
}

function InitializeEditor({ initialJSON }) {
  const [editor] = useLexicalComposerContext();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialJSON || initialized.current) return;
    initialized.current = true;

    let parsed;
    try {
      parsed = typeof initialJSON === "string"
        ? JSON.parse(initialJSON)
        : initialJSON;
    } catch {
      console.error("Invalid editor JSON");
      return;
    }

    editor.update(() => {
      const editorState = editor.parseEditorState(parsed);
      editor.setEditorState(editorState);
    });
  }, [editor, initialJSON]);

  return null;
}

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  return (
    <OnChangePlugin
      onChange={() => {
        editor.update(() => {
          const editorStateJSON = editor.getEditorState().toJSON();
          const html = $generateHtmlFromNodes(editor);
          onChange({
            json: editorStateJSON,
            html
          });
        });
      }}
    />
  );
}

const LexicalEditor = ({ initialJSON, onChange }) => {
  const editorConfig = {
    namespace: "Editor",
    theme: {
      paragraph: "editor-paragraph",
    },
    onError,
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <InitializeEditor initialJSON={initialJSON} />
      <div className="w-full border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 bg-white relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full p-4 min-h-[200px] text-base text-gray-800 outline-none" />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              Write something here...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyOnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
