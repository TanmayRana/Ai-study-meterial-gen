"use client";
import { useUser } from "@clerk/nextjs";

import React from "react";

const WelcomeBanner = () => {
  const { user } = useUser();
  return (
    <div className="p-5 bg-blue-500 w-full text-white rounded-lg flex items-center gap-6">
      {/* Image let's you add a background image to your banner */}
      {/* <Image src={""} alt="Banner" width={100} height={100} /> */}
      <div className="">
        <h2 className="font-bold text-3xl">Hello, {user?.fullName}</h2>
        <p className="">
          Welcome Back,Its time to get back and start learning new courses
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
