import Link from "next/link";
import React, {useState} from "react";
import Avatar from "@/assets/images/Avatar.png";
import Image from "next/image";
import { Copy, CheckCircle } from "lucide-react";


function UserRender({ info, date, resendInvite,onEditClick  }) {
    const [copiedEmail, setCopiedEmail] = useState(null);
  const role = info.role.name.replace(/_/, " ");
  const formatDate = () => {
    if (!date || !(date instanceof Date) || isNaN(date)) {
      return { dateStr: "N/A", timeStr: "N/A" };
    }
    
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const hours = date.getHours();
    const timeStr = `${String(hours % 12 || 12).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    
    return { dateStr, timeStr };
  };


   const copyToClipboard = (email) => {
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopiedEmail(email);
          // Reset the copied state after 2 seconds
          setTimeout(() => {
            setCopiedEmail(null);
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    };
  
  // Get formatted date strings
  const { dateStr, timeStr } = formatDate();

  return (
    <tr>
       <td className="text-left px-6">
        <div className="flex items-center">
          {/* Profile image */}
          <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
            {info.profileImage ? (
              <img 
                src={info.profileImage} 
                alt={`${info.username}'s profile`} 
                className="w-full h-full object-cover"
              />
            ) : (
              // Fallback for users without profile image
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-medium">
                <Image 
                src={Avatar} 
                alt={`${info.username}'s profile`} 
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
              </div>
            )}
          </div>
          
          {/* Username and email */}
          <div>
            <h6 className="font-rubikMedium text-black">{info.username}</h6>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">{info.email}</span>
              <button
                          className="ml-2 p-1 text-gray-700 hover:text-gray-600 focus:outline-none"
                          onClick={() => copyToClipboard(info.email)}
                          title="Copy email to clipboard"
                        >
                          {copiedEmail === info.email ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
            </div>
          </div>
        </div>
      </td>
      <td className="text-left">
        <h6 className="capitalize">{role}</h6>
      </td>
      <td className="text-left">
        <h6>{dateStr}</h6>
        <h6>{timeStr}</h6>
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
 
      <td>
        <button className="relative px-2 py-1 mr-8 dropdown">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>

          <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
            <div className="flex flex-col text-left">
            <div
                    onClick={() => {
                      onEditClick(info);
                    }}
                    className="px-3 py-1 text-left hover:bg-gray-100 cursor-pointer"
                  >
                    <i className="fa fa-pencil mr-2"></i> Edit User
                  </div>
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
