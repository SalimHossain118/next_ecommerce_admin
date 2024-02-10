/** @format */

import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./Logo";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <buttn
            onClick={() => signIn("google")}
            className="bg-red-400 p-2 px-4 rounded-lg cursor-pointer">
            Login With Google
          </buttn>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-bgGray min-h-screen">
      <div className=" ml-5 mt-2 block md:hidden flex flex-row items-center gap-5 ">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Logo />
      </div>

      <div className="flex">
        <Nav show={showNav} />
        <div className="bg-white p-2 flex-grow ">{children}</div>
      </div>
    </div>
  );
}
