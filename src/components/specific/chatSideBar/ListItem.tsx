"use client";

import Image from "next/image";
import moment from "moment";
import { Timer } from "lucide-react";
import { getAvatarColor } from "@/lib/utils";

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
  const now = moment();
  const messageTime = moment(timestamp);
  const diffMinutes = now.diff(messageTime, "minutes");
  const diffHours = now.diff(messageTime, "hours");
const avatarColor = getAvatarColor(chatId);

  let timeDisplay = "";
  let isUrgent = false;

  if (diffMinutes < 1) {
    timeDisplay = "now";
    isUrgent = true;
  } else if (diffMinutes < 60) {
    timeDisplay = `${diffMinutes}min`;
    isUrgent = diffMinutes <= 5;
  } else if (diffHours < 24) {
    timeDisplay = `${diffHours}hr`;
  } else {
    timeDisplay = messageTime.format("MMM D");
  }

  return (
    <div
      onClick={() => onClick?.(chatId)}
      className="group relative flex items-start gap-3 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-l-blue-400"
    >
      <div className="relative flex-shrink-0">
        <div className="relative">
          {avatar ? (
            <Image
              src={avatar}
              width={52}
              height={52}
              className="rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200"
              alt={`${name}'s avatar`}
            />
          ) : (
            <div 
              style={{ backgroundColor: avatarColor }}
              className="rounded-full h-12 w-12 flex items-center justify-center text-white font-bold text-lg ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200"
            >
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Online indicator */}
          </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 pt-1">
        {/* Header: Name and Time with Urgency */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate text-base group-hover:text-blue-700 transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-1 ml-2">
            {isUrgent && (
              <div className="flex items-center">
                {diffMinutes < 1 ? (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                ) : (
                  <span className="flex items-center gap-1 bg-yellow-400 px-2 py-0.5 rounded-full text-black text-xs font-semibold">
                    <Timer size={12} />
                    Urgent
                  </span>
                )}
              </div>
            )}

            <span
              className={`text-xs font-medium whitespace-nowrap ${
                isUrgent
                  ? "text-black bg-yellow-200 px-2 py-0.5 rounded-full"
                  : diffHours < 24
                  ? "text-gray-800"
                  : "text-gray-500"
              }`}
            >
              {timeDisplay}
            </span>
          </div>
        </div>

        {/* Message Preview */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700">
          {lastMessage}
        </p>
      </div>

      {/* Hover indicator */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  );
}