import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../NavBar";



const Page = ({ title, children }) => {

  return (
    <div className='flex bg-gray-100 flex-row flex-1 overflow-y-scroll h-screen'>
        <Navbar></Navbar>
        <div className="flex flex-col w-[100%] md:h-[100%] ml-24 bg-gray-100 p-4 md:pl-5 ">
          <h1 className="text-center md:text-left font-bold text-3xl ">{title}</h1>
          {children}
        </div>
    </div>
  )
}

export default Page;