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
  Send
} from "lucide-react";
import { copilotTransformOptions } from "@/lib/chatMessages";

// Mock data for the copilot options (now only used if needed elsewhere

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  copilotResponse: string;
  handleAskCopilot: (content: string) => void;
}

interface SelectionToolbarProps {
  position: { x: number; y: number };
  selectedText: string;
  onFormat: (type: string) => void;
  onCopilotAction: (action: string, text: string) => void;
  onClose: () => void;
}

const SelectionToolbar: React.FC<SelectionToolbarProps> = ({ 
  position, 
  selectedText, 
  onFormat, 
  onCopilotAction, 
  onClose 
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  // State to track the selected copilot action
  const [selectedAction, setSelectedAction] = useState("summarize");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const formatButtons = [
    { icon: Bold, type: 'bold', label: 'Bold' },
    { icon: Italic, type: 'italic', label: 'Italic' },
    { icon: Underline, type: 'underline', label: 'Underline' },
    { icon: Code, type: 'code', label: 'Code' },
  ];

  
  return (
    <div
      ref={toolbarRef}
      className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
      style={{
        left: `${Math.max(10, position.x - 100)}px`,
        top: `${position.y - 60}px`,
        minWidth: '200px',
      }}
    >
      {/* Format Options */}
      <div className="p-2 border-b border-gray-100">
        <div className="text-xs text-gray-500 mb-2 font-medium">Format Text</div>
        <div className="flex gap-1">
          {formatButtons.map(({ icon: Icon, type, label }) => (
            <button
              key={type}
              onClick={() => onFormat(type)}
              className="p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors"
              title={label}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Copilot Actions with Select Menu and Trigger Button */}
      <div className="p-2">
        <div className="text-xs text-gray-500 mb-2 font-medium">AI Action</div>
        <div className="flex gap-2">
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="flex-1 bg-white border border-gray-200 rounded px-2 py-1 text-sm"
          >
            {copilotTransformOptions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => onCopilotAction(selectedAction, selectedText)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Selected Text Preview */}
      <div className="p-2 bg-gray-50 border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-1">Selected:</div>
        <div className="text-xs text-gray-700 max-w-[180px] truncate">
          "{selectedText}"
        </div>
      </div>
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
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
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

    // Auto-resize textarea with smoother animation
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
      
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (containerRect) {
        setToolbarPosition({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top,
        });
        setShowToolbar(true);
      }
    } else {
      setShowToolbar(false);
      setSelectedText("");
    }
  };

  const handleCopilotAction = (actionId: string, text: string) => {
    
    
    const action = copilotTransformOptions.find(a => a.id === actionId);
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
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `__${selectedText}__`;
          break;
        case 'code':
          formattedText = `\`${selectedText}\``;
          break;
        default:
          break;
      }
      
      const newMessage = message.substring(0, start) + formattedText + message.substring(end);
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
          position={toolbarPosition}
          selectedText={selectedText}
          onFormat={handleFormat}
          onCopilotAction={handleCopilotAction}
          onClose={() => setShowToolbar(false)}
        />
      )}
      
      <div className="flex flex-col gap-3">
        {/* Text Input Area */}
        <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-200' : ''} rounded-lg`}>
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
              minHeight: '44px',
              maxHeight: '120px',
              transition: 'height 0.1s ease-out',
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
            <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Quick actions">
              <Zap size={18} className="text-gray-600" />
            </button>
            <div className="w-px h-5 bg-gray-300"></div>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Save draft">
              <Bookmark size={18} className="text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Add emoji">
              <Smile size={18} className="text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || disabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                message.trim() && !disabled
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};