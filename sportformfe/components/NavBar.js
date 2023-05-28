import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import React, { useState } from "react";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Profile Manager", link: "/profile/" , icon: AiOutlineUser },
  ];

  return (
    <>
      <nav className="md:relative fixed md:block">
        <div
          className={`bg-white min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-900 px-4`}
        >
          <div className="items-stretch py-7 px-2 flex justify-between ">
            {open ? 
              <Link href="/">
                <Image src="/Logo1.svg" alt="logo" width={100} height={100} />
              </Link> : <></> }
            <HiMenuAlt3
              size={16}
              className="cursor-pointer"
              onClick={() => setOpen(!open)} />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                href={menu?.link}
                key={i}
                className={` ${menu?.margin && "mt-5"} group flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-x-hidden"}`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
            <button
                onClick={() => auth.signOut()}
                className={`group flex items-center text-lg gap-3.5 font-medium p-2 capitalize bg-white border-white text-gray-900 hover:bg-gray-600 rounded-md`}
              >
                <div>{React.createElement(MdLogout, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${11}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                >
                  Logout
                </h2>
                <h2
                  className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Logout
                </h2>
              </button>
          </div>
        </div>
      </nav>
    </>
  )
}