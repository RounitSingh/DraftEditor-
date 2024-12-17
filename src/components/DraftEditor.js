import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

const customStyleMap = {
  RED: { color: "red" },
};

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("draftContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });
  const [title, setTitle] = useState(() => {
    const savedTitle = localStorage.getItem("Title");
    return savedTitle ? JSON.parse(savedTitle) : "";
  });

  const editorRef = useRef(null);

  const focusEditor = () => {
    editorRef.current && editorRef.current.focus();
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("Title", JSON.stringify(title));
    localStorage.setItem("draftContent", JSON.stringify(rawContent));
    alert("Content saved successfully!");
  };

  const handleBeforeInput = (chars) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const blockText = contentState.getBlockForKey(blockKey).getText();

    if (chars === " ") {
      if (blockText === "#") {
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({ anchorOffset: 0, focusOffset: 1 }),
          ""
        );
        const updatedEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );
        setEditorState(
          RichUtils.toggleBlockType(updatedEditorState, "header-one")
        );
        return "handled";
      }

      if (blockText === "*") {
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({ anchorOffset: 0, focusOffset: 1 }),
          ""
        );
        const updatedEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );
        setEditorState(RichUtils.toggleInlineStyle(updatedEditorState, "BOLD"));
        return "handled";
      }

      if (blockText === "**") {
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({ anchorOffset: 0, focusOffset: 2 }),
          ""
        );
        const updatedEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );
        setEditorState(RichUtils.toggleInlineStyle(updatedEditorState, "RED")); // Use toggleInlineStyle
        return "handled";
      }

      if (blockText === "***") {
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({ anchorOffset: 0, focusOffset: 3 }),
          ""
        );
        const updatedEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );
        setEditorState(
          RichUtils.toggleInlineStyle(updatedEditorState, "UNDERLINE")
        );
        return "handled";
      }
    }

    return "not-handled";
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Enter Title"
        style={styles.titleInput}
      />
      <div style={styles.editorContainer} onClick={focusEditor}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          placeholder="Type here..."
          customStyleMap={customStyleMap}
        />
      </div>
      <button style={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  titleInput: {
    width: "100%",
    fontSize: "1.5rem",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  editorContainer: {
    border: "1px solid #ddd",
    minHeight: "300px",
    padding: "10px",
    cursor: "text",
    borderRadius: "5px",
  },
  saveButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DraftEditor;
