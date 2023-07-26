"use client";

import { $getRoot, $getSelection, EditorState } from "lexical";
import { useEffect } from "react";
import { Paper } from "@mui/material";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import styles from "./index.module.css";
import DocNodes from "./nodes";

export function DocEditor() {
  return (
    <Paper className="my-6 p-6 outline-none">
      <LexicalComposer
        initialConfig={{
          namespace: "Editor",
          theme: {
            ltr: "ltr",
            rtl: "rtl",
            paragraph: styles.editorParagraph,
          },
          onError(error, editor) {
            console.log(error);
          },
          nodes: DocNodes,
        }}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={styles.editorContainer}
              style={{ width: 960, minHeight: (960 * 297) / 210 }}
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            editorState.read(() => {
              const root = $getRoot();
              const selection = $getSelection();

              console.log(root, selection);
            });
          }}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </LexicalComposer>
    </Paper>
  );
}

function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}
