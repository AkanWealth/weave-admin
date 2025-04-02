import { useModalContext } from "@/components/elements/Modal";
import { useToastContext } from "@/contexts/toast";
import InputField from "@/components/elements/TextField";
import React, { useState, useEffect } from "react";
import ParagraphInput from "@/components/elements/TextArea";
import api from "@/lib/api";
import Button from "@/components/elements/Button";

function AddNotification() {
  const [appUsers, setAppUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationType, setNotificationType] = useState("");
  // const [searchName, setSearchName] = useState("");
  // const [recipientGroup, setRecipientGroup] = useState([]);
  const [recipientGroup, setRecipientGroup] = useState("");
  const { showMessage} = useToastContext(); 

const { closeModal } = useModalContext();

  // const addToRecipient = (recipient) => {
  //   const recipientExist = recipientGroup.find(
  //     (item) => item.id === recipient.id
  //   );
  //   if (!recipientExist)
  //     setRecipientGroup([
  //       ...recipientGroup,
  //       {
  //         email: recipient.email,
  //         id: recipient.id,
  //         username: recipient.username,
  //       },
  //     ]);
  //   document.getElementById("recipient").focus();
  //   setSearchName("");
  // };

  // const removeFromRecipients = (receipient) => {
  //   const otherRecipients = recipientGroup.filter(
  //     (item) => item.id !== receipient
  //   );
  //   setRecipientGroup(otherRecipients);
  // };

  // fetch all users

  const getUsers = async () => {
    setIsFetching(true);
    try {
      const response = await api.get("/usage-analytics/users");
      if (response.status === 200) {
        console.log(response.data);
        setAppUsers(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage("An error occurred while fetching users", "","error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [isSending, setIsSending] = useState(false);
  const sendNotification = async () => {
    setIsSending(true);
    const data = {
      title: notificationTitle,
      content: notificationContent,
      type: notificationType,
      recipient: recipientGroup,
      // recipients: recipientGroup.map((recipient) => recipient.id),
    };

    console.log(data);
    try {
      const response = await api.post("/notification", data);
      if (response.status === 201) {
        console.log(response.data);
        showMessage("Notification sent successfully", "","success");
        closeModal();
      }
    } catch (error) {
      showMessage(
        error.response.data.message ||
          "An error occurred while sending notification","",
        "error"
      );
      closeModal();
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h6 className="text-2xl font-rubikBold">Create New Notification</h6>

      <div className="">
        <InputField
          label={"Notification Title"}
          placeholder={"Enter the notification Title"}
          value={notificationTitle}
          setValue={setNotificationTitle}
        />

        {/* <h6 className="font-rubikMedium my-2">Notification Content</h6> */}

        <ParagraphInput
          label={"Notification Content"}
          placeholder={"Write your notification content"}
          value={notificationContent}
          setValue={setNotificationContent}
        />

        <h6 className="font-rubikMedium my-2">Notification Type</h6>
        <select
          className="border border-black p-2 py-3 rounded-md w-full"
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}
        >
          {/* <span className="text-gray-500">Select Notification Type</span> */}
          <option value="">Select Notification Type</option>
          <option value="email">Email</option>
          {/* <option value="push">Push Notification</option> */}
        </select>

        <h6 className="font-rubikMedium my-2">Select Recipient</h6>
        <select
          className="border border-black p-2 py-3 rounded-md w-full"
          value={recipientGroup}
          onChange={(e) => setRecipientGroup(e.target.value)}
        >
          {/* <span className="text-gray-500">Select Notification Type</span> */}
          <option value="">Select Recipient Group </option>
          {/* <option value="users">App Users</option> */}
          <option value="admin">Admin Users</option>
        </select>
        {/* <div className="border border-black p-2 rounded-md">
          <span className="text-gray-500">Select recipient group</span>
        </div> */}
        {/* <div className="border border-weave-primary rounded-md p-2 flex flex-row flex-wrap my-2">
          {recipientGroup.length > 0 ? (
            recipientGroup.map((recipient) => (
              <div
                key={Math.random()}
                className="bg-gray-200 rounded-md text-gray-700 p-1 text-sm mr-2"
              >
                {recipient.username}
                <button
                  onClick={(e) => {
                    removeFromRecipients(recipient.id);
                  }}
                  type="button"
                >
                  <span className="fa fa-remove ml-2"></span>
                </button>
              </div>
            ))
          ) : (
            <></>
          )}
          <input
            type="text"
            className="focus:outline-none flex-1 px-2"
            id="recipient"
            placeholder="type recipient name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            // onBlur={(e) => addToRecipient(e.target.value)}
          />

          <div className="bg-white w-full mt-2 border border-weave-primary rounded-md">
            {appUsers
              .filter(
                (user) =>
                  user.username
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchName.toLowerCase())
              )
              .map((user) => (
                <a
                  key={user.id}
                  className="bg-gray-200 text-xs p-1 text-gray-700 m-1 rounded-md inline-block"
                  style={{ cursor: "pointer" }}
                  onClick={() => addToRecipient(user)}
                >
                  {" "}
                  {user.username}
                </a>
              ))}
          </div>
        </div> */}
      </div>
      <div className="flex  my-8" style={{ gap: 10 }}>
        <div className="flex-1">
          <button
            className="border border-black py-2 w-full font-rubikMedium rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        <div className="flex-1">
          <Button
            title={isSending ? "Sending..." : "Send Notification"}
            onClick={sendNotification}
            disabled={isSending}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNotification;
