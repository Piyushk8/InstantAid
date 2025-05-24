import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MoreVertical,
  Phone,
  Video,
  Info,
  Bookmark,
  Zap,
  Smile,
  Bot,
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  Send,
  ChevronDown,
} from "lucide-react";
import { copilotTransformOptions } from "@/lib/chatMessages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for the copilot options (now only used if needed elsewhere

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  copilotResponse: string;
  handleAskCopilot: (content: string) => void;
}

interface SelectionToolbarProps {
  selectedText: string;
  onFormat: (type: string) => void;
  onCopilotAction: (action: string, text: string) => void;
  onClose: () => void;
}

const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
  selectedText,
  onFormat,
  onCopilotAction,
  onClose,
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [showCopilotMenu, setShowCopilotMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState("summarize");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const formatButtons = [
    { icon: Bold, type: "bold", label: "Bold" },
    { icon: Italic, type: "italic", label: "Italic" },
    { icon: Underline, type: "underline", label: "Underline" },
    { icon: Code, type: "code", label: "Code" },
  ];

  const handleCopilotSelect = (actionId: string) => {
    setSelectedAction(actionId);
    onCopilotAction(actionId, selectedText);
    setShowCopilotMenu(false);
  };
  return (
    <div
      ref={toolbarRef}
      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="flex items-center divide-x divide-gray-100">
        {/* AI Copilot Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCopilotMenu((prev)=>!prev)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 text-blue-600 transition-colors group"
            title="AI Actions"
          >
            <Bot size={16} className="group-hover:scale-110 transition-transform" />
            <ChevronDown size={12} className={`transition-transform ${showCopilotMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showCopilotMenu && (
            <div className="absolute top-full mt-1 left-0 min-w-[220px] bg-white border text-secondary  border-gray-200 rounded-lg shadow-xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                {copilotTransformOptions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleCopilotSelect(action.id)}
                    className="w-full text-left px-4 py-3 text-sm z-10 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    <div className="font-medium text-gray-800">{action.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Format Options */}
        <div className="flex items-center">
          {formatButtons.map(({ icon: Icon, type, label }) => (
            <button
              key={type}
              onClick={() => onFormat(type)}
              className="p-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors"
              title={label}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Subtle indicator arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
    </div>
  );
};

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  copilotResponse,
  handleAskCopilot,
}) => {
  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback((): void => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      setIsTyping(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
      }
    }
  }, [message, disabled, onSendMessage]);

  useEffect(() => {
    if (copilotResponse) {
      setMessage(copilotResponse);
    }
  }, [copilotResponse]);

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const value = e.target.value;
    setMessage(value);

    // Typing indicator logic
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0 && textareaRef.current) {
      const selectedTextContent = selection.toString();
      setSelectedText(selectedTextContent);
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
      setSelectedText("");
    }
  };

  const handleCopilotAction = (actionId: string, text: string) => {
    const action = copilotTransformOptions.find((a) => a.id === actionId);
    if (action) {
      handleAskCopilot(`${action.prompt}${text}`);
    }
    setShowToolbar(false);
  };

  const handleFormat = (type: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.substring(start, end);

    if (selectedText) {
      let formattedText = selectedText;

      switch (type) {
        case "bold":
          formattedText = `**${selectedText}**`;
          break;
        case "italic":
          formattedText = `*${selectedText}*`;
          break;
        case "underline":
          formattedText = `__${selectedText}__`;
          break;
        case "code":
          formattedText = `\`${selectedText}\``;
          break;
        default:
          break;
      }

      const newMessage =
        message.substring(0, start) + formattedText + message.substring(end);
      setMessage(newMessage);

      // Restore focus and cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length);
      }, 0);
    }

    setShowToolbar(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 rounded-2xl shadow-xl ring-4 ring-gray-100 bg-white p-4 transition-all duration-200"
    >
      {showToolbar && (
        <SelectionToolbar
          selectedText={selectedText}
          onFormat={handleFormat}
          onCopilotAction={handleCopilotAction}
          onClose={() => setShowToolbar(false)}
        />
      )}

      <div className="flex flex-col gap-3">
{/* Text Input Area */}
        <div
          className={`relative transition-all duration-200 ${
            isFocused ? "ring-2 ring-blue-200" : ""
          } rounded-lg`}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onMouseUp={handleTextSelection}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none border-none outline-none p-3 text-gray-800 placeholder-gray-400 bg-gray-50 rounded-lg transition-all duration-200 focus:bg-white"
            style={{
              minHeight: "44px",
              maxHeight: "120px",
              transition: "height 0.1s ease-out",
            }}
          />

{/* Character count for long messages */}
          {message.length > 500 && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {message.length}/2000
            </div>
          )}
        </div>

{/* Action Bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Quick actions"
            >
              <Zap size={18} className="text-gray-600" />
            </button>
            <div className="w-px h-5 bg-gray-300"></div>
            <button
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Save draft"
            >
              <Bookmark size={18} className="text-gray-600" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Add emoji"
            >
              <Smile size={18} className="text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || disabled}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                message.trim() && !disabled
                  ? "bg-primary text-primary-foreground hover:bg-secondary-foreground hover:text-secondary shadow-sm"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <Send size={16} />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};