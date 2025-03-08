import React from "react";
import { User } from "lucide-react";
import UserReport from "@/components/userFeedback/user-report";


function Page() {
    return (
        <div>
            <h3 className="text-2xl flex items-center mb-2">
                <span className="mr-4 bg-[#e8e8e8] rounded-full p-3 flex items-center justify-center">
                    <User className="w-7 h-7 text-weave-primary" />
                </span>
                User Reported Issue

            </h3>

         <UserReport/>
        </div>
    );
}

export default function () {
    return (

        <Page />

    );
}
