"use client";

import { AskCopilot } from "@/app/Copilot";
import { Bot } from "lucide-react";
import { useEffect, useState, useRef, useTransition, useCallback } from "react";

interface Message {
  type: "user" | "bot";
  content: string;
  id: string;
  timestamp: Date;
}

interface CopilotSidebarProps {
  query: string;
  onResponse: (text: string) => void;
  onClose: () => void;
}

function DetailsScreen() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-2xl text-white">📋</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">Details Panel</h3>
        <p className="text-sm">Details functionality coming soon...</p>
      </div>
    </div>
  );
}

export function CopilotSidebar({
  query,
  onResponse,
  onClose,
}: CopilotSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedQueries = useRef<Set<string>>(new Set());
  const [pageToggle, setPageToggle] = useState<"copilot" | "details">(
    "copilot"
  );

  const generateMessageId = useCallback(() => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  useEffect(() => {
    if (query?.trim() && !processedQueries.current.has(query)) {
      processedQueries.current.add(query);
      const userMessage: Message = {
        type: "user",
        content: query,
        id: generateMessageId(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      handleAskCopilot(query);
    }
  }, [query, generateMessageId]);

  useEffect(() => {
    try {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    } catch (scrollError) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [messages, isPending]);

  const handleAskCopilot = useCallback(
    async (q: string) => {
      if (!q?.trim()) return;

      setError(null);

      startTransition(async () => {
        try {
          const res = await AskCopilot({ query: q });

          if (res?.success === false || res?.data === null) {
            const errorMessage: Message = {
              type: "bot",
              content:
                "I apologize, but I encountered an error while processing your request. Please try again.",
              id: generateMessageId(),
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            setError("Failed to get response from copilot");
          } else if (res?.data) {
            const botMessage: Message = {
              type: "bot",
              content: res.data,
              id: generateMessageId(),
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
          } else {
            throw new Error("Unexpected response format");
          }
        } catch (err) {
          console.error("Copilot error:", err);
          const errorMessage: Message = {
            type: "bot",
            content:
              "I'm experiencing technical difficulties. Please try again later.",
            id: generateMessageId(),
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
          setError(
            err instanceof Error ? err.message : "Unknown error occurred"
          );
        }
      });
    },
    [generateMessageId]
  );

  const handleSendMessage = useCallback(() => {
    const trimmedQuery = inputQuery.trim();
    if (!trimmedQuery) return;

    const userMessage: Message = {
      type: "user",
      content: trimmedQuery,
      id: generateMessageId(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    handleAskCopilot(trimmedQuery);
    setInputQuery("");
    setError(null);
  }, [inputQuery, handleAskCopilot, generateMessageId]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  // Extract clean answer content from AI response
  const extractCleanAnswer = useCallback((content: string): string => {
    // Remove common AI response prefixes and suffixes
    let cleanContent = content
      .replace(
        /^(Here's|Here is|I'll help you|Let me help you|Sure,|Certainly,|Of course,|I can help you)/i,
        ""
      )
      .replace(/^(The answer is|My response is|My answer is)/i, "")
      .replace(
        /(Is there anything else|Do you need|Would you like|Let me know if)/i,
        ""
      )
      .replace(/\n*$/, "") // Remove trailing newlines
      .trim();

    // Remove meta commentary and keep only the core answer
    const lines = cleanContent.split("\n");
    const answerLines = lines.filter((line) => {
      const trimmedLine = line.trim().toLowerCase();
      // Filter out common meta phrases
      return (
        !trimmedLine.startsWith("i hope") &&
        !trimmedLine.startsWith("let me know") &&
        !trimmedLine.startsWith("feel free") &&
        !trimmedLine.startsWith("if you need") &&
        !trimmedLine.includes("anything else i can help") &&
        trimmedLine.length > 0
      );
    });

    return answerLines.join("\n").trim();
  }, []);

  const handleAddToComposer = useCallback(
    (messageContent: string) => {
      try {
        const cleanAnswer = extractCleanAnswer(messageContent);
        if (cleanAnswer) {
          onResponse(cleanAnswer);
        } else {
          onResponse(messageContent); // Fallback to original content
        }
      } catch (err) {
        console.error("Error adding to composer:", err);
        setError("Failed to add response to composer");
      }
    },
    [extractCleanAnswer, onResponse]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Copilot Screen Component
  const CopilotScreen = () => (
    <>
      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex justify-between items-center">
          <span className="text-red-800 dark:text-red-200 text-sm">
            {error}
          </span>
          <button
            onClick={clearError}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 ml-2"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-6 px-4 py-6 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">🤖</span>
            </div>
            <p className="text-lg font-semibold mb-2">AI Copilot Ready</p>
            <p className="text-sm text-gray-500">
              Start a conversation with the AI Copilot
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-4">
            {/* Avatar and name */}
            <div className="flex flex-col items-center w-12">
              {msg.type === "bot" ? (
                <div className="bg-gradient-to-br from-violet-500 to-pink-500 h-10 w-10 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
              ) : (
                <div className="bg-violet-500 text-white font-bold h-10 w-10 rounded-full flex items-center justify-center ring-2 ring-gray-100">
                  {msg.type[0].toUpperCase()}
                </div>
              )}
              <span className="text-[10px] text-muted-foreground mt-1">
                {msg.type === "user" ? "You" : "AI"}
              </span>
            </div>

            {/* Message bubble */}
            <div className="flex ml-6 flex-col max-w-[80%] group">
              <div
                className={`p-3 rounded-xl text-sm whitespace-pre-wrap shadow-sm ${
                  msg.type === "user"
                    ? "bg-slate-100 text-secondary-foreground"
                    : "bg-gradient-to-br from-violet-300 to-pink-300 text-black"
                }`}
              >
                <div className="break-words">{msg.content}</div>
                <div className="text-[11px] text-muted-foreground mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Add to Composer button for bot responses */}
              {msg.type === "bot" && (
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToComposer(msg.content);
                    }}
                    className="text-xs bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 transition-colors shadow-sm"
                    disabled={isPending}
                  >
                    Add to Composer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading spinner */}
        {isPending && (
          <div className="flex gap-4">
            <div className="flex flex-col items-center w-12">
              <div className="bg-gradient-to-br from-violet-500 to-pink-500 h-10 w-10 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">AI</span>
            </div>
            <div className="p-3 rounded-xl bg-secondary text-secondary-foreground text-sm shadow-sm max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Only show in Copilot screen */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a followup question.."
          className="flex-1 p-3 shadow-lg rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          onKeyPress={handleKeyPress}
          disabled={isPending}
          maxLength={1000}
        />
        <button
          onClick={handleSendMessage}
          disabled={isPending || !inputQuery.trim()}
          className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[80px] font-medium"
        >
          {isPending ? "..." : "Send"}
        </button>
      </div>
    </>
  );

  return (
    <div className="h-full w-full bg-background shadow-2xl z-50 p-4 flex flex-col">
      {/* Header */}
      <button
        onClick={onClose}
        className="text-foreground fixed right-2 hover:text-foreground/80 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        aria-label="Close copilot"
      >
        ×
      </button>

      {/* Toggle Navigation */}
      <div className="flex gap-1 items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        {/* Copilot Button */}
        <button
          onClick={() => setPageToggle("copilot")}
          className={`relative px-4 py-2 font-semibold text-lg rounded-lg transition-all duration-300 group ${
            pageToggle === "copilot"
              ? "text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text"
              : "text-foreground hover:text-violet-600"
          }`}
        >
          Copilot
          {pageToggle === "copilot" && (
            <span className="absolute left-1/2 -bottom-0.5 h-[2px] w-10 -translate-x-1/2 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-full animate-pulse" />
          )}
        </button>

        {/* Details Button */}
        <button
          onClick={() => setPageToggle("details")}
          className={`relative px-4 py-2 font-semibold text-lg rounded-lg transition-all duration-300 group ${
            pageToggle === "details"
              ? "text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text"
              : "text-foreground hover:text-violet-600"
          }`}
        >
          Details
          {pageToggle === "details" && (
            <span className="absolute left-1/2 -bottom-0.5 h-[2px] w-10 -translate-x-1/2 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* Content Area */}
      {pageToggle === "copilot" ? <CopilotScreen /> : <DetailsScreen />}
    </div>
  );
}
