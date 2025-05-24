import React from "react";

const AITool = () => {
  return (
    <div
      className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 
                        border-l border-gray-200 bg-gray-50/50 min-h-0"
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* AI Tools Header */}
          <div className="border-b border-gray-200 pb-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              AI Assistant
            </h3>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="grid gap-2">
              <button
                className="flex items-center p-3 text-sm text-left rounded-lg 
                                   bg-white border border-gray-200 hover:border-blue-300 
                                   hover:bg-blue-50 transition-all duration-200 group"
              >
                <div
                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3
                                  group-hover:bg-blue-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 group-hover:text-blue-700">
                  Generate Ideas
                </span>
              </button>

              <button
                className="flex items-center p-3 text-sm text-left rounded-lg 
                                   bg-white border border-gray-200 hover:border-green-300 
                                   hover:bg-green-50 transition-all duration-200 group"
              >
                <div
                  className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3
                                  group-hover:bg-green-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 group-hover:text-green-700">
                  Summarize
                </span>
              </button>

              <button
                className="flex items-center p-3 text-sm text-left rounded-lg 
                                   bg-white border border-gray-200 hover:border-purple-300 
                                   hover:bg-purple-50 transition-all duration-200 group"
              >
                <div
                  className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3
                                  group-hover:bg-purple-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 group-hover:text-purple-700">
                  Code Review
                </span>
              </button>
            </div>
          </div>

          {/* Chat Stats */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">
              Session Info
            </h4>
            <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Messages</span>
                <span className="font-medium text-gray-900">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">15m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Model</span>
                <span className="font-medium text-gray-900">GPT-4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITool;
