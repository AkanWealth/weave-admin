"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css"; // Import the Quill stylesheet

const QuillEditor = ({ value, setValue }) => {
  const editorRef = useRef(null); // Ref to hold the editor DOM element

  const [content, setContent] = useState(value || ""); // State to track content
  useEffect(() => {
    setValue(content);
  }, [content]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("quill").then((QuillModule) => {
        const Quill = QuillModule.default;
        new Quill(editorRef.current, {
          theme: "snow",
        }).on("text-change", (e) => {
          const htmlContent =
            editorRef.current.querySelector(".ql-editor").innerHTML;
          setContent(htmlContent);
        });
      });
    }
  }, []);

  return (
    <div
      id="editor-container"
      ref={editorRef}
      style={{ height: "300px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default QuillEditor;
