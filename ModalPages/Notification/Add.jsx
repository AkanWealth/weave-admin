import InputField from "@/components/elements/TextField";
import React from "react";

function AddNotification() {
  return (
    <div>
      <h6 className="text-2xl font-rubikBold">Create New Notification</h6>

      <div className="">
        <InputField
          label={"Notification Title"}
          placeholder={"Enter the notification Title"}
        />

        <h6 className="font-rubikMedium my-2">Notification Content</h6>
        <textarea
          name=""
          id=""
          className="p-2 border border-black focus:border-weave-primary rounded-md w-full h-[120px]"
          placeholder="Write your notification content"
        ></textarea>

        <h6 className="font-rubikMedium my-2">Notification Type</h6>
        <div className="border border-black p-2 rounded-md">
          <span className="text-gray-500">Select Notification Type</span>
        </div>

        <h6 className="font-rubikMedium my-2">Select Recipient</h6>
        <div className="border border-black p-2 rounded-md">
          <span className="text-gray-500">Select recipient group</span>
        </div>
      </div>
      <div className="flex  my-8" style={{ gap: 10 }}>
        <div className="flex-1">
          <button className="border border-black py-2 w-full font-rubikMedium rounded-md">
            Cancel
          </button>
        </div>
        <div className="flex-1">
          <button className="bg-weave-primary text-base-white py-2 w-full font-rubikMedium rounded-md">
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNotification;
