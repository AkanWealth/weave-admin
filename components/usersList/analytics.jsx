import React from "react";

function Analytics() {
  return (
    <>
      {/* user summary */}
      <div className="flex space-x-8 w-full my-4">
        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Super Admin</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Admin</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Content Manager</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>

        <div className="w-1/4 bg-[#f8cf84] p-4 px-6 rounded-2xl">
          <div>
            <h5 className="text-gray-500 mb-1">Other Manager</h5>
            <h6 className="font-rubikMedium text-2xl">0</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
