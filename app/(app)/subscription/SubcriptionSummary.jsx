// "use client";
// import api from "@/lib/api";
// import React, { useEffect, useState } from "react";
// import { TrendingDown, TrendingUp } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUserGroup,
//   faClockRotateLeft,
// } from "@fortawesome/free-solid-svg-icons";

// function SubcriptionSummary() {
//   const [allUsers, setAllUsers] = useState(0);
//   const [appUsers, setAppUsers] = useState(0);
//   const [averageCheck, setaverageCheck] = useState(0);
//   const [AllUserAveragemonthly, setAllUserAveragemonthly] = useState(0);
//   const [AllAppUserAveragemonthly, setAllAppUserAveragemonthly] = useState(0);
//   const [AllInternalUserAveragemonthly, setAllInternalUserAveragemonthly] =
//     useState(0);
//   const [averageCheckChange, setAverageCheckChange] = useState(-4.5); // Default value, replace with API call

//   const getUsersSummary = async () => {
//     try {
//       const getAllUsers = await api.get("/usage-analytics/total-users");
//       const getAppUsers = await api.get("/usage-analytics/app-users");
//       const getAveragecheckin = await api.get(
//         "/usage-analytics/average-checkin"
//       );
//       const getAllUserAveragemonthly = await api.get(
//         "/monitor-signups/all-users"
//       );
//       const getAllAppUserAveragemonthly = await api.get(
//         "/monitor-signups/app-users"
//       );
//       const getAllInternalUserAveragemonthly = await api.get(
//         "/monitor-signups/admins"
//       );

//       // You can add this when the API endpoint is available
//       // const getAverageCheckChange = await api.get("/usage-analytics/average-checkin-change");

//       if (getAllUsers.status === 200) setAllUsers(getAllUsers.data);
//       if (getAppUsers.status === 200) setAppUsers(getAppUsers.data);

//       // Average checkin
//       if (getAveragecheckin.status === 200) {
//         if (
//           typeof getAveragecheckin.data === "object" &&
//           getAveragecheckin.data !== null
//         ) {
//           setaverageCheck(getAveragecheckin.data.averageCheckInFrequency || 0);
//         } else {
//           setaverageCheck(getAveragecheckin.data);
//         }
//       }

//       // Average monthly user
//       if (getAllUserAveragemonthly.status === 200) {
//         if (
//           typeof getAllUserAveragemonthly.data === "object" &&
//           getAllUserAveragemonthly.data !== null
//         ) {
//           setAllUserAveragemonthly(
//             getAllUserAveragemonthly.data.growthRate || 0
//           );
//         } else {
//           setAllUserAveragemonthly(getAllUserAveragemonthly.data);
//         }
//       }

//       // Average app user
//       if (getAllAppUserAveragemonthly.status === 200) {
//         if (
//           typeof getAllAppUserAveragemonthly.data === "object" &&
//           getAllAppUserAveragemonthly.data !== null
//         ) {
//           setAllAppUserAveragemonthly(
//             getAllAppUserAveragemonthly.data.growthRate || 0
//           );
//         } else {
//           setAllAppUserAveragemonthly(getAllAppUserAveragemonthly.data);
//         }
//       }

//       // Average internal user
//       if (getAllInternalUserAveragemonthly.status === 200) {
//         if (
//           typeof getAllInternalUserAveragemonthly.data === "object" &&
//           getAllInternalUserAveragemonthly.data !== null
//         ) {
//           setAllInternalUserAveragemonthly(
//             getAllInternalUserAveragemonthly.data.growthRate || 0
//           );
//         } else {
//           setAllInternalUserAveragemonthly(
//             getAllInternalUserAveragemonthly.data
//           );
//         }
//         console.log(getAllInternalUserAveragemonthly.data.growthRate);
//       }

//       // When the API endpoint is available, uncomment this
//       // if (getAverageCheckChange.status === 200) {
//       //   setAverageCheckChange(getAverageCheckChange.data);
//       // }
//     } catch (error) {
//       console.log({ error });
//     }
//   };

//   useEffect(() => {
//     console.log("get user summary");
//     getUsersSummary();
//   }, []);

//   const renderPercentageChange = (value, timeframe) => {
//     // Determine if the value is positive or negative
//     const isPositive = value >= 0;
//     const absValue = Math.abs(value);

//     // Determine the color and icon based on the value
//     const textColorClass = isPositive ? "text-[#28A745]" : "text-red-500";
//     const bgColorClass = isPositive ? "bg-[#28A745]" : "bg-red-500";
//     const Icon = isPositive ? TrendingUp : TrendingDown;

//     return (
//       <div className={`flex items-center ${textColorClass} text-xs`}>
//         <div
//           className={`flex items-center justify-center ${bgColorClass} w-5 h-5 rounded-[5px] mr-2`}
//         >
//           <Icon className="text-white w-3 h-3" />
//         </div>
//         {value.toFixed(1)}% from {timeframe}
//       </div>
//     );
//   };

//   return (
//     <div className="grid grid-cols-4 gap-6 w-full my-4">
//       <div className="bg-base-white p-6 rounded-2xl">
//         <div className="flex justify-between items-start mb-4">
//           <div className="whitespace-nowrap">
//             <h5 className="text-gray-500 mb-2 text-sm">Total Subscriptions</h5>
//             <h6 className="font-rubikMedium text-2xl">{allUsers}</h6>
//           </div>
//           <div className="flex justify-center items-center h-10 w-10 text-[#8280FF]">
//             <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
//           </div>
//         </div>

//         {renderPercentageChange(AllUserAveragemonthly, "last month")}
//       </div>

//       <div className="bg-base-white p-6 rounded-2xl">
//         <div className="flex justify-between items-start mb-4">
//           <div className="whitespace-nowrap">
//             <h5 className="text-gray-500 mb-2 text-sm">Active Subscriptions</h5>
//             <h6 className="font-rubikMedium text-2xl">{appUsers}</h6>
//           </div>
//           <div className="flex justify-center items-center h-10 w-10 text-[#28A745]">
//             <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
//           </div>
//         </div>

//         {renderPercentageChange(AllAppUserAveragemonthly, "last month")}
//       </div>

//       <div className="bg-base-white p-6 rounded-2xl">
//         <div className="flex justify-between items-start mb-4">
//           <div className="whitespace-nowrap">
//             <h5 className="text-gray-500 mb-2 text-sm">Expired Subscriptions</h5>
//             <h6 className="font-rubikMedium text-2xl">{allUsers - appUsers}</h6>
//           </div>
//           <div className="flex justify-center items-center h-10 w-10 text-[#4AA0A4]">
//             <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
//           </div>
//         </div>

//         {renderPercentageChange(AllInternalUserAveragemonthly, "last month")}
//       </div>

//       <div className="bg-base-white p-6 rounded-2xl">
//         <div className="flex justify-between items-start mb-4">
//           <div className="whitespace-nowrap">
//             <h5 className="text-gray-500 mb-2 text-sm">Total Income</h5>
//             <h6 className="font-rubikMedium text-2xl">£{averageCheck.toFixed(2)}</h6>
//           </div>
//           <div className="flex justify-center items-center h-10 w-10 text-[#9747FF]">
//             <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl" />
//           </div>
//         </div>

//         {renderPercentageChange(averageCheckChange, "yesterday")}
//       </div>
//     </div>
//   );
// }

// export default SubcriptionSummary;



"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

function SubcriptionSummary() {
  const [allUsers, setAllUsers] = useState(0);
  const [appUsers, setAppUsers] = useState(0);
  const [averageCheck, setAverageCheck] = useState(0);
  const [allUserAverageMonthly, setAllUserAverageMonthly] = useState(0);
  const [allAppUserAverageMonthly, setAllAppUserAverageMonthly] = useState(0);
  const [allInternalUserAverageMonthly, setAllInternalUserAverageMonthly] = useState(0);
  const [averageCheckChange, setAverageCheckChange] = useState(0);

  const getUsersSummary = async () => {
    try {
      const response = await api.get("/subscriptions/summary");
      const data = response.data;

      setAllUsers(data.totalSubscriptions || 0);
      setAppUsers(data.expiredSubscriptions || 0);
      setAverageCheck(data.totalIncome || 0);
      setAllUserAverageMonthly(data.activeSubscriptions || 0);
      setAllAppUserAverageMonthly(data.activeUsersChange || 0);
      setAllInternalUserAverageMonthly(data.totalRevenue || 0);
      setAverageCheckChange(data.totalIncomeChange || 0);
    } catch (error) {
      console.error("Error fetching subscription summary:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    getUsersSummary();
  }, []);

  const renderPercentageChange = (value, timeframe) => {
    const isPositive = value >= 0;
    const absValue = Math.abs(value);
    const textColorClass = isPositive ? "text-[#28A745]" : "text-red-500";
    const bgColorClass = isPositive ? "bg-[#28A745]" : "bg-red-500";
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div className={`flex items-center ${textColorClass} text-xs`}>
        <div
          className={`flex items-center justify-center ${bgColorClass} w-5 h-5 rounded-[5px] mr-2`}
        >
          <Icon className="text-white w-3 h-3" />
        </div>
        {absValue.toFixed(1)}% from {timeframe}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-4 gap-6 w-full my-4">
      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Total Subscriptions</h5>
            <h6 className="font-rubikMedium text-2xl">{allUsers}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#8280FF]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
          </div>
        </div>
        {/* {renderPercentageChange(allUserAverageMonthly, "last month")} */}
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Active Subscriptions</h5>
            <h6 className="font-rubikMedium text-2xl">{allAppUserAverageMonthly}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#28A745]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
          </div>
        </div>
        {/* {renderPercentageChange(allAppUserAverageMonthly, "last month")} */}
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Expired Subscriptions</h5>
            <h6 className="font-rubikMedium text-2xl">{appUsers}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#4AA0A4]">
            <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
          </div>
        </div>
        {/* {renderPercentageChange(allInternalUserAverageMonthly, "last month")} */}
      </div>

      <div className="bg-base-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="whitespace-nowrap">
            <h5 className="text-gray-500 mb-2 text-sm">Total Income</h5>
            <h6 className="font-rubikMedium text-2xl">£{allInternalUserAverageMonthly}</h6>
          </div>
          <div className="flex justify-center items-center h-10 w-10 text-[#9747FF]">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl" />
          </div>
        </div>
        {/* {renderPercentageChange(averageCheckChange, "yesterday")} */}
      </div>
    </div>
  );
}

export default SubcriptionSummary;