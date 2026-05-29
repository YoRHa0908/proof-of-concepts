import { Bot, UserRound } from "lucide-react";
import { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
  index: number;
}

/**
 * MessageBubble component for displaying chat messages
 * 
 * @param message - The message object containing id, role, and text
 * @param index - The index of the message for animation delay
 */
export default function MessageBubble({ message, index }: MessageBubbleProps) {
  const isUser = message.role === "user";
  
  return (
    <div 
      className={`flex gap-2.5 chat-message-enter ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animationDelay: `${index * 0.05}s` }}
      role="listitem"
      aria-label={`${isUser ? "User" : "Assistant"} message`}
    >
      {!isUser && (
        <div 
          className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm"
          aria-label="Assistant avatar"
        >
          <Bot size={14} />
        </div>
      )}

      <div 
        className={`max-w-[82%] rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser 
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" 
            : "bg-gradient-to-r from-slate-50 to-white text-slate-800 border border-slate-200/50"
        }`}
        aria-live="polite"
      >
        {message.text}
      </div>

      {isUser && (
        <div 
          className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 shadow-sm"
          aria-label="User avatar"
        >
          <UserRound size={14} />
        </div>
      )}
    </div>
  );
}