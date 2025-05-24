"use client";
import { AskCopilot } from "@/app/Copilot";
import { useEffect, useState, useTransition } from "react";

export function CopilotSidebar({
  query,
  onResponse,
  onClose,
}: {
  query: string;
  onResponse: (text: string) => void;
  onClose: () => void;
}) {
  const [response, setResponse] = useState("");
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const handleAskCopilot = async () => {
      startTransition(async () => {
        const res = await AskCopilot({ query });
        console.log("here", res);
        if (res?.success === false && res.data === null) {
          setResponse("copilot Error");
        } else {
          if (res?.data) {
            setResponse(res?.data);
          }
        }
      });
    };
    if (query) {
      handleAskCopilot();
    }
  }, [query]);

  return (
    <div className="h-full w-full bg-white shadow-2xl z-50 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">AI Copilot</h2>
        <button onClick={onClose}>&times;</button>
      </div>

      <div className="text-sm text-gray-600 mb-2">Prompt:</div>
      <div className="bg-gray-100 p-2 rounded text-sm mb-4">{query}</div>

      <div className="text-sm text-gray-600 mb-2">Response:</div>
      <div className="flex-1 overflow-auto border p-2 rounded text-sm whitespace-pre-wrap">
        {isPending ? "Thinking" : (response)}
      </div>

      <button
        onClick={() => onResponse(response)}
        className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
      >
        Add to Composer
      </button>
    </div>
  );
}
