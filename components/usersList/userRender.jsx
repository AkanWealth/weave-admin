import Link from "next/link";
import React from "react";

function UserRender({ info, date }) {
  return (
    <tr>
      <td className="text-left px-6">
        <h6 className="font-rubikMedium text-black px-6">{info.username}</h6>
        <span className="text-gray-500 text-sm">{info.email}</span>
        <button className="mx-2 p-1">
          <i className="fa fa-copy"></i>
        </button>
      </td>
      <td className="text-left">
        <h6>{`${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`}</h6>
        <h6>{`${date.getHours()}:${date.getMinutes()}`}</h6>
      </td>
      <td className="text-left">
        <span
          className={`${
            info.isActive ? "bg-[#28A745]" : "bg-red-500"
          } px-3 rounded-full py-1 text-sm text-base-white capitalize`}
        >
          {info.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="text-left">
        <h6>{info.role.name}</h6>
      </td>
      <td>
        <button className="relative px-2 py-1 mr-8 dropdown">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>

          <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
            <div className="flex flex-col text-left">
              <Link
                href={`/users?modal=edit-admin&id=${info.id}`}
                className="px-3 py-1"
              >
                {" "}
                <i className="fa fa-pencil mr-2"></i> Edit User
              </Link>
              <Link
                href={`/users?modal=delete-admin&id=${info.id}`}
                className="text-red-500 px-3 py-1"
              >
                {" "}
                <i className="fa fa-trash mr-2"></i> Delete User{" "}
              </Link>
              <Link
                href={`/users?modal=suspend-admin&id=${info.id}`}
                className="px-3 py-1"
              >
                {" "}
                <i className="fa fa-user-times mr-2"></i> Suspend User{" "}
              </Link>
              <Link href={`/users?resend-invite`} className="px-3 py-1">
                {" "}
                <i className="fa fa-share mr-2"></i> Resend Invite
              </Link>
            </div>
          </div>
        </button>
      </td>
    </tr>
  );
}

export default UserRender;
