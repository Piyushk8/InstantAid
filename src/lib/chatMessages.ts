// Mock data (in a real app, this w
// ould be in separate files)

interface ChatData {
  [key: string]: Message[];
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export const chatMessages: ChatData = {
  "chat-1": [
    {
      id: "msg-1-1",
      content: "Hey! How are you doing today?",
      sender: "user",
      timestamp: new Date("2024-01-15T10:30:00Z"),
      status: "read",
    },
    {
      id: "msg-1-2",
      content:
        "I'm doing great, thanks for asking! Just working on some projects. How about you?",
      sender: "other",
      timestamp: new Date("2024-01-15T10:32:00Z"),
      status: "read",
    },
    {
      id: "msg-1-3",
      content:
        "Same here! Been pretty busy with work lately. Are we still on for the meeting tomorrow?",
      sender: "user",
      timestamp: new Date("2024-01-15T10:35:00Z"),
      status: "read",
    },
    {
      id: "msg-1-4",
      content:
        "Absolutely! I'll see you at 2 PM. I've prepared all the documents we need.",
      sender: "other",
      timestamp: new Date("2024-01-15T10:37:00Z"),
      status: "read",
    },
    {
      id: "msg-1-5",
      content:
        "Perfect! Looking forward to it. Thanks for preparing everything in advance.",
      sender: "user",
      timestamp: new Date("2024-01-15T10:40:00Z"),
      status: "delivered",
    },
  ],
  "chat-2": [
    {
      id: "msg-2-1",
      content: "Did you see the game last night?",
      sender: "other",
      timestamp: new Date("2024-01-14T20:15:00Z"),
      status: "read",
    },
    {
      id: "msg-2-2",
      content:
        "Yes! What an incredible finish! I can't believe they pulled that off.",
      sender: "user",
      timestamp: new Date("2024-01-14T20:18:00Z"),
      status: "read",
    },
    {
      id: "msg-2-3",
      content:
        "Right? That last-minute goal was insane. The crowd went absolutely wild!",
      sender: "other",
      timestamp: new Date("2024-01-14T20:20:00Z"),
      status: "read",
    },
    {
      id: "msg-2-4",
      content:
        "I was jumping off my couch! Best game I've watched all season for sure.",
      sender: "user",
      timestamp: new Date("2024-01-14T20:25:00Z"),
      status: "read",
    },
  ],
  "chat-3": [
    {
      id: "msg-3-1",
      content: "Happy birthday! 🎉🎂",
      sender: "user",
      timestamp: new Date("2024-01-13T09:00:00Z"),
      status: "read",
    },
    {
      id: "msg-3-2",
      content: "Thank you so much! That means a lot to me ❤️",
      sender: "other",
      timestamp: new Date("2024-01-13T09:15:00Z"),
      status: "read",
    },
    {
      id: "msg-3-3",
      content: "Are you doing anything special to celebrate?",
      sender: "user",
      timestamp: new Date("2024-01-13T09:20:00Z"),
      status: "read",
    },
    {
      id: "msg-3-4",
      content:
        "Just a small dinner with family tonight. Nothing too fancy, but I'm excited!",
      sender: "other",
      timestamp: new Date("2024-01-13T09:25:00Z"),
      status: "read",
    },
    {
      id: "msg-3-5",
      content:
        "That sounds perfect! Family time is the best. Enjoy your special day! 🥳",
      sender: "user",
      timestamp: new Date("2024-01-13T09:30:00Z"),
      status: "sent",
    },
  ],
  "chat-4": [
    {
      id: "msg-4-1",
      content: "Can you help me with the React project we discussed?",
      sender: "other",
      timestamp: new Date("2024-01-12T14:30:00Z"),
      status: "read",
    },
    {
      id: "msg-4-2",
      content: "Of course! What specific part are you struggling with?",
      sender: "user",
      timestamp: new Date("2024-01-12T14:35:00Z"),
      status: "read",
    },
    {
      id: "msg-4-3",
      content:
        "I'm having trouble with state management. The component keeps re-rendering unnecessarily.",
      sender: "other",
      timestamp: new Date("2024-01-12T14:40:00Z"),
      status: "read",
    },
    {
      id: "msg-4-4",
      content:
        "Ah, classic issue! Are you using useCallback and useMemo where needed? Also check if you're creating objects/arrays inline in your JSX.",
      sender: "user",
      timestamp: new Date("2024-01-12T14:45:00Z"),
      status: "read",
    },
    {
      id: "msg-4-5",
      content:
        "That might be it! I think I'm creating new objects on every render. Let me fix that and get back to you.",
      sender: "other",
      timestamp: new Date("2024-01-12T14:50:00Z"),
      status: "delivered",
    },
  ],
};

// Chat names for header
export const chatNames: { [key: string]: string } = {
  "chat-1": "John Doe",
  "chat-2": "Sports Group",
  "chat-3": "Sarah Wilson",
  "chat-4": "Dev Team",
};



export  const copilotTransformOptions = [
  {
    id: "rephrase",
    label: "Rephrase",
    description: "Rewrite the message with different wording but same meaning.",
    prompt: "Rephrase the following message to make it clearer and more concise."
  },
  {
    id: "make_friendly",
    label: "Make it Friendly",
    description: "Add warmth and friendliness to the message.",
    prompt: "Rewrite the following message in a more friendly and welcoming tone."
  },
  {
    id: "make_formal",
    label: "Make it Formal",
    description: "Adjust the message to be more professional and formal.",
    prompt: "Rewrite the following message in a formal and professional tone."
  },
  {
    id: "make_casual",
    label: "Make it Casual",
    description: "Make the message sound more relaxed and conversational.",
    prompt: "Rewrite the following message in a casual and relaxed tone."
  },
  {
    id: "shorten",
    label: "Shorten",
    description: "Make the message shorter while retaining the main idea.",
    prompt: "Shorten this message while keeping the core meaning intact."
  },
  {
    id: "expand",
    label: "Expand",
    description: "Add more detail or explanation to the message.",
    prompt: "Expand on this message and provide additional context or details."
  },
  {
    id: "add_emoji",
    label: "Add Emojis",
    description: "Insert appropriate emojis to make the message more expressive.",
    prompt: "Add emojis to this message to make it more expressive and engaging."
  },
  {
    id: "simplify",
    label: "Simplify",
    description: "Make the message easier to understand.",
    prompt: "Simplify this message so it's easier to understand for a broader audience."
  },
  {
    id: "persuasive",
    label: "Make it Persuasive",
    description: "Adjust the tone to be more convincing and influential.",
    prompt: "Rewrite this message to sound more persuasive and compelling."
  },
  {
    id: "empathetic",
    label: "Make it Empathetic",
    description: "Add understanding and compassion to the message.",
    prompt: "Rewrite this message to express more empathy and care."
  },
  {
    id: "summarize",
    label: "Summarize",
    description: "Condense the content into a short summary.",
    prompt: "Summarize the following message in 1-2 sentences."
  },
  {
    id: "translate",
    label: "Translate",
    description: "Translate the message into a different language.",
    prompt: "Translate this message into Spanish." // optionally replace with selected language
  }
];
