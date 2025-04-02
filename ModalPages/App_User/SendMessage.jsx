"use client";
import Button from "@/components/elements/Button";
import { useModalContext } from "@/components/elements/Modal";
import ParagraphInput from "@/components/elements/TextArea";
import InputField from "@/components/elements/TextField";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SendMessage() {
  const params = useSearchParams();
  const username = params.get("name");
  const userId = params.get("id");

  const { closeModal, showMessage } = useModalContext();
  const [isSending, setissending] = useState(false);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [contenterror, setContenterror] = useState("");
  const [subjecterror, setSubjecterror] = useState("");

  useEffect(() => {
    if (subject !== "") setSubjecterror("");
    if (content !== "") setContenterror("");
  }, [content, subject]);

  const sendMessage = async () => {
    if (subject == "") {
      setSubjecterror("Please enter a subject");
      return;
    }
    if (content == "") {
      setContenterror("Please enter some message");
      return;
    }
    setissending(true);
    try {
      const response = await api.post(`/send-message/${userId}`, {
        subject,
        content,
      });
      console.log(response.status);
      if (response.status === 201) {
        showMessage(response.data.message, "success");
        closeModal();
        return;
      }
      showMessage(response.data.message, "error");
    } catch (error) {
      showMessage(error.response.data.message, "error");
    } finally {
      setissending(false);
    }
  };

  return (
    <>
      <div className="flex" style={{ gap: 20 }}>
        <div
          style={{
            width: 80,
            minWidth: 80,
            height: 80,
            background: "#eaf6ec",
            borderRadius: "50%",
            display: "flex",
            fontSize: 25,
          }}
        >
          <i className="fa fa-envelope m-auto"></i>
        </div>
        <div className="">
          <h1 className="font-rubikMedium text-2xl capitalize">
            Send Message to {username}
          </h1>
          <p className="text-gray-500 my-2">
            Write a message to communicate directly with this user. They will
            receive your message in their registered inbox.
          </p>
        </div>
      </div>
      <div>
        <InputField
          label={"Subject"}
          placeholder={"Enter a Subject"}
          value={subject}
          setValue={setSubject}
          error={subjecterror}
        />

        <ParagraphInput
          label={"Message"}
          placeholder={"Type your message here..."}
          value={content}
          setValue={setContent}
          error={contenterror}
        />

        <div className="flex" style={{ gap: 10 }}>
          <Button
            variant={"inverse"}
            title={"Cancel"}
            onClick={() => closeModal()}
          />
          <Button
            title={isSending ? "Sending..." : "Send message"}
            onClick={() => sendMessage()}
          />
        </div>
      </div>
    </>
  );
}

export default SendMessage;
