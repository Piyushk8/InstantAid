"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Phone, Video, Info, Sheet } from "lucide-react";
import { Message, TypingIndicator } from "./messageComponent";
import { chatMessages, chatNames } from "@/lib/chatMessages";
import { useParams, useSearchParams } from "next/navigation";
import { CopilotSidebar } from "../AIToolsPage";
import { MessageInput } from "./messageINput";
import { SheetContent } from "@/components/ui/sheet";

// Types
interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface ChatAreaProps {
  chatId?: string;
}

// Main Chat Area Component
const ChatArea: React.FC<ChatAreaProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [askCopilot, setaskCopilot] = useState<true | false>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isAISideBarOpen, setAISidebar] = useState<boolean>(false);
  const [onlineStatus, setOnlineStatus] = useState<string>("Online");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ chatId: string }>();
  const chatId = params.chatId;
  const [copilotQuery, setCopilotQuery] = useState<string>("");
  const [copilotResponse, setCopilotResponse] = useState("");
  // Load messages for the current chat
  useEffect(() => {
    const chatMessages_ = chatMessages[chatId] || [];
    setMessages(chatMessages_);
  }, [chatId]);

  // Set initial online status and update it client-side
  useEffect(() => {
    const statuses = [
      "Online",
      "Last seen 5 minutes ago",
      "Last seen 1 hour ago",
    ];
    setOnlineStatus(statuses[Math.floor(Math.random() * statuses.length)]);
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (content: string): void => {
    const newMessage: Message = {
      id: `msg-${chatId}-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    // Simulate typing indicator and response
    setTimeout(() => {
      setIsTyping(true);
    }, 1500);

    setTimeout(() => {
      setIsTyping(false);
      const autoReply: Message = {
        id: `msg-${chatId}-${Date.now() + 1}`,
        content: getAutoReply(content),
        sender: "other",
        timestamp: new Date(),
        status: "read",
      };
      setMessages((prev) => [...prev, autoReply]);

      // Mark user message as read
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 3000);
  };

  const getAutoReply = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I help you today?";
    }
    if (lowerMessage.includes("how are you")) {
      return "I'm doing well, thank you for asking! How about you?";
    }
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return "Goodbye! Have a great day!";
    }
    if (lowerMessage.includes("thank")) {
      return "You're welcome! Happy to help.";
    }
    if (lowerMessage.includes("?")) {
      return "That's a great question! Let me think about that...";
    }

    return "Thanks for your message! This is an auto-reply.";
  };

  const getChatName = (): string => {
    return chatNames[chatId] || "Unknown Chat";
  };

  const handleAskCopilot = (content: string) => {
    console.log("called", content);
    setCopilotQuery(content);
    console.log("seted", copilotQuery);
  };
  const handleCopilotResponse = (response: string) => {
    console.log("response", response);
    setCopilotResponse(response);
  };

  const handleAISidebarOpen = () => {
    setAISidebar(true);
  };

  // const handleTextSelection = (input: string) => {
  //   const selection = window.getSelection();
  //   const selectedText = selection?.toString().trim();
  //   if (selectedText) {
  //     setaskCopilot(true)
  //   }
  //   // setCopilotQuery(selectedText)
  // };
  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col h-full w-full md:w-2/3">
        {/* Chat Header */}
        <div className="flex-shrink-0 px-6 py-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getChatName().charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{getChatName()}</h3>
                <p
                  className={`text-sm ${
                    isTyping ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {isTyping ? "typing..." : onlineStatus}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Info className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical
                  className="w-5 h-5"
                  onClick={handleAISidebarOpen}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-4xl mx-auto space-y-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <Message
                  // handleTextSelection={handleTextSelection}
                  handleAskCopilot={handleAskCopilot}
                  key={message.id}
                  message={message}
                  isOwn={message.sender === "user"}
                />
              ))
            )}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* Message Input */}
        <div className="p-4">
          <MessageInput
            onSendMessage={handleSendMessage}
            copilotResponse={copilotResponse}
            disabled={false}
            handleAskCopilot={handleAskCopilot}
          />
        </div>
      </div>
      <div className="md:block hidden w-1/3">
        <CopilotSidebar
          query={copilotQuery}
          onClose={() => setAISidebar(false)}
          onResponse={handleCopilotResponse}
        />
      </div>
      {isAISideBarOpen && (
        // <Sheet>
        //   <SheetContent className="w-2/3 md:hidden">
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40" />

          <div className="absolute top-0 right-0 h-full w-[85%] z-50  bg-background p-6 rounded-lg shadow-xl md:hidden">
            <CopilotSidebar
              query={copilotQuery}
              onClose={() => setAISidebar(false)}
              onResponse={handleCopilotResponse}
            />
          </div>
        </> //   </SheetContent>
        // </Sheet>
      )}
    </div>
  );
};

export default ChatArea;
