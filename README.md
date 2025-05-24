
# 🚀 InstantAid Chatbot

**InstantAid** is an AI-powered chatbot built with **Next.js** and integrated with **Gemini** to deliver fast, intelligent responses. Featuring a Copilot trained on company data, users can interact with AI directly inside the chat — rephrasing, summarizing, translating, and more  all trained on you custom data + global resources to reference to maximize you AI agent efficiency by 50%.

---

### ✨ Features

* 🤖 **AI Copilot** – Trained on company-specific data via Gemini API
* 🪄 **Smart Composer** – Add and edit Copilot suggestions before sending
* 🎨 **Inline Formatting** – Bold, italic, rephrase text with the selection toolbar
* 📱 **Responsive UI** – Built with `shadcn/ui` + Tailwind
* ⏱️ **Urgency Tags** – Visual cues for time-sensitive messages
* Upcoming:
*  😎 transitions/animations
*   
---

### ⚙️ Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind, shadcn/ui
* **AI Integration:** Gemini API
* **Deployment:** Vercel for now

---

### ▶️ Demo

📹 **Watch InstantAid in action**

https://github.com/user-attachments/assets/9efc36d1-8bd6-480a-90ff-3c9825bd431f



🌐 **Live Demo**
https://instant-aid-ten.vercel.app/

---

### 🚀 Getting Started

```bash
git clone https://github.com/your-org/instant-aid-chatbot.git
cd instant-aid-chatbot
npm install
```

Create `.env.local` and add:

```
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

Then run:

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

### 💬 Usage

* **Select a chat** → Interact in the message box
* **Highlight text** → Access toolbar for formatting + Copilot tools
* **Pick a Copilot action** → Insert AI-generated text into the composer
* **Edit & Send** → Keep the conversation flowing

---

### 🧱 Project Structure

```
components/        → Chat UI, Input, Sidebar
lib/               → Utils, mock messages
app/               → API functions (AskCopilot), page.tsx
public/avatars     → Avatar images
.env.local         → Gemini API key
```

---
