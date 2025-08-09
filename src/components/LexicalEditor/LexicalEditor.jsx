import React, { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function onError(error) {
  console.error("Lexical error:", error);
}

// Component to initialize editor state once
function InitializeEditor({ initialContent }) {
  const [editor] = useLexicalComposerContext();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialContent) return;
    if (initialized.current) return; // initialize only once
    initialized.current = true;

    editor.update(() => {
      try {
        const editorState = editor.parseEditorState(initialContent);
        editor.setEditorState(editorState);
      } catch {
        editor.setEditorState(editor.parseEditorState("{}"));
      }
    });
  }, [editor, initialContent]);

  return null;
}

// Plugin to lift state on editor changes
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
      <InitializeEditor initialContent={initialContent} />
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
