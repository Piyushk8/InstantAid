import ChatList from "./ChatList";
import ChatSideBarHeader from "./ChatSideBarHeader";

export default function ChatSidebar() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-white">
      {/* Sidebar Header */}
      <ChatSideBarHeader />
      <div className="flex-shrink-0 p-4 border-b">
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>

      {/* Chat List */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ChatList />
      </div>
    </div>
  );
}
