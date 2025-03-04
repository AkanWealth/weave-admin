import React from "react";
import { Link } from "next/link";

function SideBar() {
  return (
    <nav>
      <Link href={"/dashboard"}>Dashboard</Link>
    </nav>
  );
}

export default SideBar;
