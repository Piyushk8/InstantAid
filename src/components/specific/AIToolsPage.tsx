"use client";

import { AskCopilot } from "@/app/Copilot";
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
  const [pageToggle, setpageToggle] = useState<"copilot"|"details">("copilot")

  // Generate unique ID for messages
  const generateMessageId = useCallback(() => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Handle incoming query prop changes with duplicate prevention
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

  // Auto-scroll to the latest message with error handling
  useEffect(() => {
    try {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    } catch (scrollError) {
      // Fallback for browsers that don't support smooth scrolling
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

  // No longer need global latest bot message tracking

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
      <div className="flex gap-2 items-center mb-2 border-b border-gray-400 pb-2">
        <button>
          <h2 className="font-semibold text-foreground text-lg focus:text-violet-600">
            Copilot
          </h2>
        </button>
        <button>
          <h2 className="font-semibold text-foreground text-lg focus:text-violet-600">
            Details
          </h2>
        </button>
      </div>

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
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>Start a conversation with the AI Copilot</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="group">
            <div
              className={`p-3 rounded-lg text-sm whitespace-pre-wrap max-w-[85%] ${
                msg.type === "user"
                  ? "bg-secondary text-secondary-foreground ml-auto"
                  : "bg-gradient-to-r from-violet-500 via-green-500 to-blue-500 text-white mr-auto"
              } shadow-sm`}
            >
              <div className="break-words">{msg.content}</div>
              <div
                className={`text-xs mt-1 opacity-70 ${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {/* Individual Add to Composer button for each AI response */}
            {msg.type === "bot" && (
              <div className="mt-2 mr-auto max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity">
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
        ))}

        {isPending && (
          <div className="p-3 rounded-lg bg-secondary text-secondary-foreground text-sm mr-auto max-w-[85%] shadow-sm">
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
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
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
    </div>
  );
}
