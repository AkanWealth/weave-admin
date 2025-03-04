"use client";
import React, { useEffect, useRef, useState } from "react";
// import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import the Quill stylesheet

let ReactQuill;
if (typeof window !== "undefined") {
  ReactQuill = require("quill");
  require("quill/dist/quill.snow.css");
}

const RichTextEditor = ({ setValue }) => {
  const editorRef = useRef(null); // Ref to hold the editor DOM element
  const quillInstance = useRef(null); // Ref to hold the Quill instance
  const [content, setContent] = useState(""); // State to track content

  useEffect(() => {
    setValue(content);
  }, [content]);

  useEffect(() => {
    if (!quillInstance.current && editorRef.current) {
      // Initialize Quill editor only if it hasn't been initialized
      quillInstance.current = new ReactQuill(editorRef.current, {
        theme: "snow", // Use the 'snow' theme
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
          ],
        },
      });

      // Listen for text changes
      quillInstance.current.on("text-change", () => {
        const htmlContent =
          editorRef.current.querySelector(".ql-editor").innerHTML;
        setContent(htmlContent);
      });
      return;
    }

    // Cleanup on unmount
    return () => {
      quillInstance.current = null; // Clean the instance
    };
  }, []);

  return <div ref={editorRef} style={{ height: "300px" }} />;
};

export default RichTextEditor;
