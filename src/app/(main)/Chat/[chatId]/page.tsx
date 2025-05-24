"use client"
import ChatArea from "@/components/specific/Message/ChatArea";
import { useTheme } from "next-themes";
import React from "react";

const page = () => {
  const theme = useTheme()
  console.log(theme)
  if(theme.theme === "dark") theme.setTheme("light")
  return <ChatArea />;
};

export default page;
