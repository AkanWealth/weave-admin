"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, setValue }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null); // Store the Quill instance

  useEffect(() => {
    if (value && value !== "")
      document.getElementById("editor-container").innerHTML = value;
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("quill").then((QuillModule) => {
        const Quill = QuillModule.default;

        // Initialize Quill only once
        if (!quillInstance.current) {
          quillInstance.current = new Quill(editorRef.current, {
            theme: "snow",
          });

          // Listen for text changes
          quillInstance.current.on("text-change", () => {
            const htmlContent =
              editorRef.current.querySelector(".ql-editor").innerHTML;
            setValue(htmlContent);
          });
        }
      });
    }
  }, []);

  return (
    <div
      ref={editorRef}
      style={{ height: "300px", border: "1px solid #ccc" }}
      id="editor-container"
    ></div>
  );
};

export default QuillEditor;
