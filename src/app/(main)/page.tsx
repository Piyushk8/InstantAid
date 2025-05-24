"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";

const MainPage = () => {
  const { theme, setTheme } = useTheme();

  // Force default light theme
  useEffect(() => {
    if (theme === "dark") setTheme("light");
  }, [theme, setTheme]);

  return (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-violet-50 via-pink-50 to-white text-gray-800 dark:text-white px-4">
      <div className="max-w-md text-center p-8 rounded-lg bg-white shadow-md border border-gray-200">
        <div className="w-16 h-16 mx-auto mb-4 bg-violet-pink-gradient rounded-full flex items-center justify-center">
          <MessageSquareText className="text-white" size={32} />
        </div>
        <h1 className="text-xl font-semibold mb-2">Welcome to Your Chat App</h1>
        <p className="text-sm text-gray-600 mb-6">
          Select a chat from the sidebar to start messaging.
        </p>
        <div
          className="inline-block bg-violet-pink-gradient text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          Start Chatting Now!
        </div>
      </div>
    </div>
  );
};

export default MainPage;
