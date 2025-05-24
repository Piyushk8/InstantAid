// chatMessages.ts
export interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export interface ChatData {
  [chatId: string]: Message[];
}

// Consolidated chat names (merged to avoid conflicts, prioritizing more detailed names)
export const chatNames: Record<string, string> = {
  "chat-1": "Sarah Johnson", // Chose from first definition for consistency
  "chat-2": "Mike Chen",
  "chat-3": "Emma Williams",
  "chat-4": "Alex Rodriguez",
  "chat-5": "IT Support Team",
  "chat-6": "David Kim",
};

// Enhanced chat data with recent timestamps
export const chatMessages: ChatData = {
  "chat-1": [
    {
      id: "msg-1-1",
      content: "Hey! How are you doing today?",
      sender: "user",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      status: "read",
    },
    {
      id: "msg-1-2",
      content:
        "I'm doing great, thanks for asking! Just working on some projects. How about you?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      status: "read",
    },
    {
      id: "msg-1-3",
      content:
        "Same here! Been pretty busy with work lately. Are we still on for the meeting tomorrow?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "read",
    },
    {
      id: "msg-1-4",
      content:
        "Absolutely! I'll see you at 2 PM. I've prepared all the documents we need.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: "read",
    },
    {
      id: "msg-1-5",
      content:
        "Perfect! Looking forward to it. Thanks for preparing everything in advance.",
      sender: "user",
      timestamp: new Date(Date.now() - 30 * 1000), // 30 seconds ago
      status: "delivered",
    },
  ],
  "chat-2": [
    {
      id: "msg-2-1",
      content: "Did you see the game last night?",
      sender: "other",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "read",
    },
    {
      id: "msg-2-2",
      content:
        "Yes! What an incredible finish! I can't believe they pulled that off.",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 3 * 60 * 1000), // 1h 57min ago
      status: "read",
    },
    {
      id: "msg-2-3",
      content:
        "Right? That last-minute goal was insane. The crowd went absolutely wild!",
      sender: "other",
      timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
      status: "read",
    },
    {
      id: "msg-2-4",
      content:
        "I was jumping off my couch! Best game I've watched all season for sure.",
      sender: "user",
      timestamp: new Date(Date.now() - 85 * 60 * 1000), // 1h 25min ago
      status: "read",
    },
  ],
  "chat-3": [
    {
      id: "msg-3-1",
      content: "Happy birthday! 🎉🎂",
      sender: "user",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "read",
    },
    {
      id: "msg-3-2",
      content: "Thank you so much! That means a lot to me ❤️",
      sender: "other",
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
      status: "read",
    },
    {
      id: "msg-3-3",
      content: "Are you doing anything special to celebrate?",
      sender: "user",
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
      status: "read",
    },
    {
      id: "msg-3-4",
      content:
        "Just a small dinner with family tonight. Nothing too fancy, but I'm excited!",
      sender: "other",
      timestamp: new Date(Date.now() - 21 * 60 * 60 * 1000), // 21 hours ago
      status: "read",
    },
    {
      id: "msg-3-5",
      content:
        "That sounds perfect! Family time is the best. Enjoy your special day! 🥳",
      sender: "user",
      timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
      status: "sent",
    },
  ],
  "chat-4": [
    {
      id: "msg-4-1",
      content: "Can you help me with the React project we discussed?",
      sender: "other",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      status: "read",
    },
    {
      id: "msg-4-2",
      content: "Of course! What specific part are you struggling with?",
      sender: "user",
      timestamp: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
      status: "read",
    },
    {
      id: "msg-4-3",
      content:
        "I'm having trouble with state management. The component keeps re-rendering unnecessarily.",
      sender: "other",
      timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
      status: "read",
    },
    {
      id: "msg-4-4",
      content:
        "Ah, classic issue! Are you using useCallback and useMemo where needed? Also check if you're creating objects/arrays inline in your JSX.",
      sender: "user",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "read",
    },
    {
      id: "msg-4-5",
      content:
        "That might be it! I think I'm creating new objects on every render. Let me fix that and get back to you.",
      sender: "other",
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      status: "delivered",
    },
  ],
  "chat-5": [
    {
      id: "msg-5-1",
      content:
        "Emergency! The server is down and clients are calling. Can you help ASAP?",
      sender: "other",
      timestamp: new Date(Date.now() - 10 * 1000), // 10 seconds ago
      status: "delivered",
    },
  ],
  "chat-6": [
    {
      id: "msg-6-1",
      content: "Hey, are you free for a quick call?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      status: "read",
    },
    {
      id: "msg-6-2",
      content: "Sure! Is everything okay?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "read",
    },
    {
      id: "msg-6-3",
      content: "Yes, just need to discuss the client presentation quickly.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: "delivered",
    },
  ],
  "chat-7": [
    {
      id: "msg-6-1",
      content: "Hey, are you free for a quick call?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      status: "read",
    },
    {
      id: "msg-6-2",
      content: "Sure! Is everything okay?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "read",
    },
    {
      id: "msg-6-3",
      content: "Yes, just need to discuss the client presentation quickly.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: "delivered",
    },
  ],
  "chat-8": [
    {
      id: "msg-6-1",
      content: "Hey, are you free for a quick call?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      status: "read",
    },
    {
      id: "msg-6-2",
      content: "Sure! Is everything okay?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "read",
    },
    {
      id: "msg-6-3",
      content: "Yes, just need to discuss the client presentation quickly.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: "delivered",
    },
  ],
  "chat-11": [
    {
      id: "msg-6-1",
      content: "Hey, are you free for a quick call?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      status: "read",
    },
    {
      id: "msg-6-2",
      content: "Sure! Is everything okay?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "read",
    },
    {
      id: "msg-6-3",
      content: "Yes, just need to discuss the client presentation quickly.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: "delivered",
    },
  ],
  "chat-9": [
    {
      id: "msg-6-1",
      content: "Hey, are you free for a quick call?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      status: "read",
    },
    {
      id: "msg-6-2",
      content: "Sure! Is everything okay?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "read",
    },
    {
      id: "msg-6-3",
      content: "Yes, just need to discuss the client presentation quickly.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: "delivered",
    },
  ],
  "chat-10": [
    {
      id: "msg-6-1",
      content: "Hey, are you free for a quick call?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      status: "read",
    },
    {
      id: "msg-6-2",
      content: "Sure! Is everything okay?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "read",
    },
    {
      id: "msg-6-3",
      content: "Yes, just need to discuss the client presentation quickly.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: "delivered",
    },
  ],
};

// Optional: Add avatar mapping for better UI (typed for safety)
export const chatAvatars: Record<string, string> = {
  "chat-1": "/avatars/sarah.jpg",
  "chat-2": "/avatars/mike.jpg",
  "chat-3": "/avatars/emma.jpg",
  "chat-4": "/avatars/alex.jpg",
  "chat-5": "/avatars/support.jpg",
  "chat-6": "/avatars/david.jpg",
};

// Copilot transform options (aligned with SelectionToolbar usage)
export const copilotTransformOptions = [
  {
    id: "rephrase",
    label: "Rephrase",
    description: "Rewrite the message with different wording but same meaning.",
    prompt:
      "Rephrase the following message to make it clearer and more concise.",
  },
  {
    id: "make_friendly",
    label: "Make it Friendly",
    description: "Add warmth and friendliness to the message.",
    prompt:
      "Rewrite the following message in a more friendly and welcoming tone.",
  },
  {
    id: "make_formal",
    label: "Make it Formal",
    description: "Adjust the message to be more professional and formal.",
    prompt: "Rewrite the following message in a formal and professional tone.",
  },
  {
    id: "make_casual",
    label: "Make it Casual",
    description: "Make the message sound more relaxed and conversational.",
    prompt: "Rewrite the following message in a casual and relaxed tone.",
  },
  {
    id: "shorten",
    label: "Shorten",
    description: "Make the message shorter while retaining the main idea.",
    prompt: "Shorten this message while keeping the core meaning intact.",
  },
  {
    id: "expand",
    label: "Expand",
    description: "Add more detail or explanation to the message.",
    prompt: "Expand on this message and provide additional context or details.",
  },
  {
    id: "add_emoji",
    label: "Add Emojis",
    description:
      "Insert appropriate emojis to make the message more expressive.",
    prompt:
      "Add emojis to this message to make it more expressive and engaging.",
  },
  {
    id: "simplify",
    label: "Simplify",
    description: "Make the message easier to understand.",
    prompt:
      "Simplify this message so it's easier to understand for a broader audience.",
  },
  {
    id: "persuasive",
    label: "Make it Persuasive",
    description: "Adjust the tone to be more convincing and influential.",
    prompt: "Rewrite this message to sound more persuasive and compelling.",
  },
  {
    id: "empathetic",
    label: "Make it Empathetic",
    description: "Add understanding and compassion to the message.",
    prompt: "Rewrite this message to express more empathy and care.",
  },
  {
    id: "summarize",
    label: "Summarize",
    description: "Condense the content into a short summary.",
    prompt: "Summarize the following message in 1-2 sentences.",
  },
  {
    id: "translate",
    label: "Translate",
    description: "Translate the message into a different language.",
    prompt: "Translate this message into Spanish.",
  },
];
