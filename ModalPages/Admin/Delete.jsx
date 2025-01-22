import React from "react";

function DeleteAdmin() {
  return (
    <div className="text-sm">
      <div className="flex" style={{ gap: 20 }}>
        <div
          style={{
            width: 50,
            height: 50,
            background: "#FFDEDE",
            borderRadius: "50%",
            display: "flex",
          }}
        >
          <i className="fa fa-trash m-auto"></i>
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Delete Admin User</h4>
          <p className="text-gray-500">
            Are you sure you want to delete this account? This user will be
            deleted from the system
          </p>
        </div>
      </div>
      <div className="text-gray-700 my-4">
        To confirm this, type "DELETE"
        <input
          type="text"
          className="border border-black p-2 w-full rounded-md my-2"
          placeholder="Enter text"
        />
      </div>
      <div className="flex" style={{ gap: 10 }}>
        <div className="flex-1">
          <button className="bg-red-500 text-base-white py-2 w-full font-rubikMedium rounded-md">
            Confirm
          </button>
        </div>
        <div className="flex-1">
          <button className="border border-black py-2 w-full font-rubikMedium rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAdmin;
