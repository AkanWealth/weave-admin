import React from "react";
import { useSession } from "next-auth/react";
import LoginComp from "./loginComp";
import Provider from "./Provider";

export default function Page() {
  return (
    <div>
      <LoginComp />
    </div>
  );
}
