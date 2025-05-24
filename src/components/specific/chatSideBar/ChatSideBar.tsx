import { Button } from "@/components/ui/button";
import ChatList from "./ChatList";
import ChatSideBarHeader from "./ChatSideBarHeader";
import { ChevronDown } from "lucide-react";

export default function ChatSidebar() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-background">
      {/* Sidebar Header */}
      <ChatSideBarHeader />
      <div className="flex items-center justify-between px-4 py-3 bg-background">
        {/* Left Section */}
        <div className="flex items-center gap-0.5 text-sm font-medium text-muted-foreground">
          <span>5 open</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-accent"
          >
            <ChevronDown size={16} />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-0.5 text-sm font-medium text-muted-foreground">
          <span>Waiting Longest</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-accent"
          >
            <ChevronDown size={16} />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 scrollbar-hide min-h-0 overflow-y-auto">
        <ChatList />
      </div>
    </div>
  );
}
