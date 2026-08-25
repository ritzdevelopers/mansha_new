"use client";

import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import "../../../node_modules/jodit/es2021/jodit.min.css";

const config = {
  readonly: false,
  toolbar: true,
  height: 420,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: "insert_as_html",
  buttons: [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "fontsize",
    "paragraph",
    "|",
    "link",
    "image",
    "table",
    "|",
    "align",
    "undo",
    "redo",
    "fullsize",
  ],
};

export default function ManshaEditor({ value, onChange }) {
  const editor = useRef(null);
  const [editorValue, setEditorValue] = useState(value || "");

  useEffect(() => {
    setEditorValue(value || "");
  }, [value]);

  return (
    <div className="mansha-jodit overflow-hidden rounded-lg border border-[#EEEEEE]">
      <JoditEditor
        ref={editor}
        value={editorValue}
        config={config}
        onBlur={(content) => onChange?.(content)}
      />
    </div>
  );
}
