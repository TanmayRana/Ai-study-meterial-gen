"use client";

import { useUser } from "@clerk/nextjs";

import React, { useEffect } from "react";
import axios from "axios";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    const checkIsNewUser = async () => {
      // if (!user) return;
      // const result = await db
      //   .select()
      //   .from(USER_TABLE)
      //   .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
      // console.log("result", result);
      // if (result.length === 0) {
      //   const userResp = await db
      //     .insert(USER_TABLE)
      //     .values({
      //       name: user?.fullName,
      //       email: user?.primaryEmailAddress?.emailAddress,
      //     })
      //     .returning({ id: USER_TABLE.id });
      //   console.log("userResp", userResp);
      // }
      await axios.post("/api/create-user", { user: user });

      // console.log("response", response.data);
    };

    checkIsNewUser();
  }, [user]);

  return <div>{children}</div>;
};

export default Provider;
