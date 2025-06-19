# Synesis Scribe - Virtual Multichannel Secretary Frontend

This is the Next.js frontend for Synesis Scribe, a proof-of-concept for a virtual multichannel secretary. This application provides the user interface for interacting with the system, visualizing data, and managing configurations.

## ✨ Core Features

- **Dashboard Overview**: View connected channels, recent conversations, and calendar events at a glance.
- **Message Reception & Interaction**: Engage in conversations, with messages displayed in a user-friendly chat interface.
- **Intelligent Response Generation**: Leverage a Large Language Model (LLM) to generate context-aware responses, potentially incorporating calendar information.
- **Voice Responses**: Play back voice responses generated via ElevenLabs.
- **Conversation History**: Access and review stored conversation histories.
- **Calendar Integration**: View calendar information and (conceptually) manage schedules.
- **Settings Management**: Interface for configuring integrations like Supabase, ElevenLabs, Google Calendar, and communication channels.

## 🔧 Technologies Used

- Next.js (React Framework)
- TypeScript
- Tailwind CSS
- Shadcn/ui (UI Components)
- Lucide React (Icons)
- Genkit (for AI flow integration)

This frontend is designed to work with a backend system (potentially using N8N, Supabase, ElevenLabs, etc.) that handles the core automation and service integrations.

## 🚀 Getting Started (Frontend)

### 1. Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### 2. Clone the repository (if applicable)
If this project is part of a larger repository structure, navigate to the Next.js app's directory.

### 3. Install dependencies
```bash
npm install
# or
yarn install
```

### 4. Configure environment variables
Create a `.env.local` file in the root of the Next.js application directory. This file might be needed for API keys or service URLs that the frontend needs to interact with directly, or for Genkit configuration. Example:
```env
# Example for Genkit or other frontend-specific variables
# NEXT_PUBLIC_API_URL=...
# GOOGLE_API_KEY=... (if using Google AI Studio for Genkit directly from client, or for other Google services)
```
Refer to specific integration guides for required environment variables.

### 5. Run the development server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:9002](http://localhost:9002) (or the specified port) in your browser to see the application.

### 6. Build for production
```bash
npm run build
npm run start
```

## 📂 Project Structure (Frontend)

```
.
├── src/
│   ├── app/                 # Next.js App Router: pages, layouts
│   ├── components/          # UI components (Shadcn/ui, custom)
│   ├── lib/                 # Utility functions, type definitions, mock data
│   ├── hooks/               # Custom React hooks
│   └── ai/                  # Genkit AI flows and configuration
├── public/                # Static assets
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

This README focuses on the Next.js frontend. For details on the backend services (N8N, Supabase, etc.), please refer to their respective documentation or the backend project's README.
