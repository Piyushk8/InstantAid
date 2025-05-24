"use client";

import ChatSidebar from "@/components/specific/chatSideBar/ChatSideBar";
import NavBar from "@/components/specific/navBar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <div className="flex-shrink-0 border-b shadow-sm z-10">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Sidebar - Chat List */}
        <aside className="hidden sm:flex sm:flex-shrink-0 sm:flex-col w-[280px]">
          <ChatSidebar />
        </aside>

        {/* Center Content Area */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="flex-1 h-full overflow-hidden">
            {children}{" "}
            {/* This now includes: ChatView + AI Tools Sidebar if needed */}
          </div>
        </main>
      </div>
    </div>
  );
}

{
  /* Mobile Sidebar Overlay (when needed) */
}
{
  /* <div
  className="sm:hidden fixed inset-0 z-50 hidden"
  id="mobile-sidebar-overlay"
>
  <div
    className="fixed inset-0 bg-black bg-opacity-50"
    onClick={() => {
      document
        .getElementById("mobile-sidebar-overlay")
        ?.classList.add("hidden");
    }}
  ></div>
  <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform">
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Chat History</h3>
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => {
            document
              .getElementById("mobile-sidebar-overlay")
              ?.classList.add("hidden");
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <div className="h-full overflow-y-auto pb-20">
      <ChatSidebar />
    </div>
  </div>
</div> */
}
