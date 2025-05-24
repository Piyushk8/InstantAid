"use client";
import React, { useState, useEffect, useRef, JSX, SetStateAction } from "react";
import {
  MoreVertical,
  Phone,
  Video,
  Info,
  Bookmark,
  Zap,
  SmileIcon,
  BotIcon,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Selectfield from "./Selectfield";
import { copilotTransformOptions } from "@/lib/chatMessages";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface MessageProps {
  message: Message;
  isOwn: boolean;
  handleAskCopilot: (content: string) => void;
  // handleTextSelection: (content: string) => void;
}


//  const handleAskCopilot = (content: string) => {
//     setCopilotQuery(content);
//   };

const handleTextSelection = (
  input: string,
  setSelectedText: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const selection = window.getSelection();
  // console.log(selection)
  const selectedText = selection?.toString().trim();
  // console.log(selectedText)
  if (selectedText) {
    setSelectedText(selectedText);
  }
};


export const Message: React.FC<MessageProps> = ({
  message,
  isOwn,
  handleAskCopilot,
}) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const formatTime = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: Message["status"]): JSX.Element => {
    const iconClass = "w-3 h-3";
    switch (status) {
      case "sent":
        return (
          <div
            className={`${iconClass} border border-gray-400 rounded-full`}
          ></div>
        );
      case "delivered":
        return <div className={`${iconClass} bg-gray-400 rounded-full`}></div>;
      case "read":
        return <div className={`${iconClass} bg-blue-500 rounded-full`}></div>;
      default:
        return <div className={`${iconClass} bg-gray-300 rounded-full`}></div>;
    }
  };

  return (
    <div
      onMouseUp={() => handleTextSelection(message.id, setSelectedText)}
      className={`group relative flex mb-4 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isOwn
            ? "bg-violet-300 text-black rounded-br-md"
            : "bg-gray-100 text-gray-900 rounded-bl-md"
        }`}
      >
        <p
          id={`message_${message?.id}`}
          className="text-sm leading-relaxed break-words"
        >
          {message.content}
        </p>
        <div
          className={`flex items-center justify-end mt-1 space-x-1 ${
            isOwn ? "text-black" : "text-gray-800"
          }`}
        >
          <span className="text-xs">{formatTime(message.timestamp)}</span>
          {/* {isOwn && getStatusIcon(message.status)} */}
        </div>
      </div>
      {!isOwn && selectedText && (
        <button
          onClick={() => handleAskCopilot(selectedText)}
          className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-white text-background text-xs font-semibold rounded-lg shadow-lg shadow-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Ask Copilot
          <Bot className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Typing Indicator Component
export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};



{
  /* <div className="flex-shrink-0 border-t bg-background p-4">
  <div className="flex items-end space-x-3">
    <div className="flex-1 relative">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        disabled={disabled}
        rows={1}
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
        style={{
          minHeight: "44px",
          maxHeight: "120px",
          overflowY: "auto",
        }}
      />
    </div>

    <button
      onClick={handleSubmit}
      disabled={!message.trim() || disabled}
      className="flex-shrink-0 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </button>
  </div>
</div>; */
}
