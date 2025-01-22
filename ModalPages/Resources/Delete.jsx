import React from "react";

function DeleteResource() {
  return (
    <div className="text-sm">
      <div className="flex" style={{ gap: 20 }}>
        <div
          style={{
            minWidth: 50,
            height: 50,
            background: "#FFDEDE",
            borderRadius: "50%",
            display: "flex",
          }}
        >
          <i className="fa fa-trash m-auto"></i>
        </div>
        <div className="">
          <h4 className="font-rubikMedium text-xl">Delete Resource</h4>
          <p className="text-gray-500">
            Are you sure you want to delete this resource? This action cannot be
            undone.
          </p>
        </div>
      </div>
      <div className="text-gray-700 my-4 w-2/3 mx-auto font-rubikRegular text-md">
        <div className="flex flex-row my-2" style={{ gap: 6 }}>
          <div className="w-1/6 text-right">
            {" "}
            <i className="fa fa-briefcase mr-3"></i> Title:
          </div>
          <div className="w-5/6">Creating Bedtime Routine</div>
        </div>
        <div className="flex flex-row my-2" style={{ gap: 6 }}>
          <div className="w-1/6 text-right">
            {" "}
            <i className="fa fa-tag mr-3"></i> Type:
          </div>
          <div className="w-5/6">Article</div>
        </div>
        <div className="flex flex-row my-2" style={{ gap: 6 }}>
          <div className="w-1/6 text-right">
            {" "}
            <i className="fa fa-paperclip mr-3"></i> Tags:
          </div>
          <div className="w-5/6">
            <span className="tag">Sleep</span>
            <span className="tag">Travel</span>
          </div>
        </div>
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

export default DeleteResource;
