import Link from "next/link";
import React from "react";
import DateRender from "../elements/DateRender";
import EmailRender from "../elements/EmailRender";

function UserRender({ info, date, resendInvite }) {
  const role = info.role.name.replace(/_/, " ");
  return (
    <tr>
      <td>
        <h6 className="font-rubikMedium text-black px-6">{info.username}</h6>
      </td>
      <td className="text-left px-4">
        <EmailRender email={info.email} />
      </td>
      <td className="text-left">
        <DateRender date={info.created_at} />
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
        <h6 className="capitalize">{role}</h6>
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

              {info.isActive ? (
                <Link
                  href={`/users?modal=suspend-admin&id=${info.id}`}
                  className="px-3 py-1"
                >
                  {" "}
                  <i className="fa fa-user-times mr-2"></i> Suspend User
                </Link>
              ) : (
                <Link
                  href={`/users?modal=activate-app-user&id=${info.id}`}
                  className="px-3 py-1"
                >
                  {" "}
                  <i className="fa fa-user-check mr-2"></i> Reactivate User
                </Link>
              )}

              <Link
                href={`/users?resend-invite`}
                className="px-3 py-1"
                onClick={() => resendInvite(info.email)}
              >
                {" "}
                <i className="fa fa-share mr-2"></i> Resend Invite
              </Link>
              <Link href={`/auditLog?admin=${info.id}`} className="px-3 py-1">
                {" "}
                <i className="fa fa-share mr-2"></i> View Logs
              </Link>
            </div>
          </div>
        </button>
      </td>
    </tr>
  );
}

export default UserRender;
