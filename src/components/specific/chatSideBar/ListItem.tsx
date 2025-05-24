"use client";

import Image from "next/image";
import moment from "moment";
import defaultAvatar from "@/lib/user.jpg";

interface ChatListItemProps {
  chatId: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  avatar?: string;
  onClick?: (chatId: string) => void;
}

export default function ChatListItem({
  chatId,
  name,
  lastMessage,
  timestamp,
  avatar,
  onClick,
}: ChatListItemProps) {
  const timeAgo = moment(timestamp).fromNow();

  return (
    <div
      onClick={() => onClick?.(chatId)}
      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors border-b cursor-pointer"
    >
      {/* Avatar */}
      <Image
        src={avatar || defaultAvatar}
        width={48}
        height={48}
        className="rounded-full object-cover"
        alt={`${name}'s avatar`}
      />

      {/* Name and Message */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <span className="font-semibold text-gray-900 truncate">{name}</span>
        <span className="text-sm text-gray-500 truncate">{lastMessage}</span>
      </div>

      {/* Time Ago */}
      <div className="text-xs text-gray-400 self-end whitespace-nowrap">{timeAgo}</div>
    </div>
  );
}
