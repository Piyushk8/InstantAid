import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getAvatarColor(chatId: string): string {
  const colors = [
    "#F59E0B", // amber-500
  "#10B981", // emerald-500
  "#3B82F6", // blue-500
  "#6366F1", // indigo-500
  "#EC4899", // pink-500
  "#EF4444", // red-500
  "#8B5CF6", // violet-500
  "#0EA5E9", // sky-500
  "#14B8A6", // teal-500
  "#F43F5E", // rose-500
  "#EAB308", // yellow-500
  "#22C55E", // green-500
  ];
  
  let hash = 0;
  for (let i = 0; i < chatId.length; i++) {
    hash = chatId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}