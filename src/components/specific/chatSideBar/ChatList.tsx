"use client";

import ChatListItem from "./ListItem";
import { chatMessages, chatNames } from "@/lib/chatMessages"; // adjust path
import { useRouter } from "next/navigation";

export default function ChatList() {
  const router = useRouter();

  const handleNavigate = (chatId: string) => {
    router.push(`/Chat/${chatId}`);
  };

  const chatList = Object.entries(chatMessages).map(([chatId, messages]) => {
    const lastMessage = messages[messages.length - 1];
    return {
      chatId,
      name: chatNames[chatId] || "Unknown",
      lastMessage: lastMessage.content,
      timestamp: lastMessage.timestamp,
      avatar: undefined, // could be mapped from chat meta
    };
  });

  return (
    <div className="w-full scrollbar-hide bg-white shadow-sm rounded-lg overflow-hidden">
      
      <div className="scrollbar-hide">
        {chatList.map((chat) => (
          <ChatListItem
            key={chat.chatId}
            chatId={chat.chatId}
            name={chat.name}
            lastMessage={chat.lastMessage}
            timestamp={chat.timestamp}
            avatar={chat.avatar}
            onClick={handleNavigate}
          />
        ))}
      </div>
    </div>
  );
}