import type { Channel, Conversation, Message, CalendarEvent, IntegrationSetting } from './types';
import { MessageSquare, Send, CalendarDays, Database, BotMessageSquare, Workflow, Settings2, AudioWaveform, Cog } from 'lucide-react';

export const mockChannels: Channel[] = [
  { id: 'whatsapp', name: 'WhatsApp', type: 'WhatsApp', status: 'Connected', icon: MessageSquare, messageCount: 125 },
  { id: 'telegram', name: 'Telegram', type: 'Telegram', status: 'Needs Setup', icon: Send, messageCount: 30 },
];

const mockMessages1: Message[] = [
  { id: 'msg1', sender: 'user', text: 'Hello, I would like to schedule a meeting.', timestamp: '10:00 AM' },
  { id: 'msg2', sender: 'ai', text: 'Sure, I can help with that. What time works for you?', timestamp: '10:01 AM', audioUrl: 'https://example.com/audio/response1.mp3' },
  { id: 'msg3', sender: 'user', text: 'How about tomorrow at 2 PM?', timestamp: '10:02 AM' },
  { id: 'msg4', sender: 'ai', text: 'Let me check the calendar. Yes, 2 PM tomorrow is available. Used calendar data to confirm.', timestamp: '10:03 AM', usedCalendar: true, audioUrl: 'https://example.com/audio/response2.mp3' },
];

const mockMessages2: Message[] = [
  { id: 'msg5', sender: 'user', text: 'Can you give me a summary of my last project?', timestamp: 'Yesterday' },
  { id: 'msg6', sender: 'ai', text: 'Certainly. Your last project, "Alpha Centauri", concluded successfully with all milestones met.', timestamp: 'Yesterday', audioUrl: 'https://example.com/audio/response3.mp3' },
];

export const mockConversations: Conversation[] = [
  { id: 'conv1', contactName: 'Alice Wonderland', lastMessageSnippet: 'Yes, 2 PM tomorrow is available.', timestamp: '10:03 AM', channel: 'WhatsApp', avatar: 'https://placehold.co/40x40.png', messages: mockMessages1 },
  { id: 'conv2', contactName: 'Bob The Builder', lastMessageSnippet: 'All milestones met.', timestamp: 'Yesterday', channel: 'Telegram', avatar: 'https://placehold.co/40x40.png', messages: mockMessages2 },
  { id: 'conv3', contactName: 'Charlie Brown', lastMessageSnippet: 'Thanks for the update!', timestamp: '2 days ago', channel: 'WhatsApp', avatar: 'https://placehold.co/40x40.png', messages: [] },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 'event1', title: 'Team Sync', startTime: '11:00 AM', endTime: '12:00 PM', color: 'bg-accent' },
  { id: 'event2', title: 'Client Demo', startTime: '02:00 PM', endTime: '03:00 PM', color: 'bg-primary' },
  { id: 'event3', title: 'Project Planning', startTime: '04:00 PM', endTime: '05:00 PM', color: 'bg-secondary' },
];

export const mockIntegrationSettings: IntegrationSetting[] = [
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database for storing conversation history.',
    configured: true,
    icon: Database,
    inputs: [
      { id: 'supabase_url', name: 'supabaseUrl', label: 'Supabase URL', type: 'text', placeholder: 'https://your-instance.supabase.co' },
      { id: 'supabase_key', name: 'supabaseKey', label: 'Supabase Key', type: 'password', placeholder: 'Your Supabase API Key' },
    ]
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'API for generating voice responses.',
    configured: true,
    icon: AudioWaveform,
    inputs: [
      { id: 'elevenlabs_key', name: 'elevenlabsApiKey', label: 'ElevenLabs API Key', type: 'password', placeholder: 'Your ElevenLabs API Key' },
    ]
  },
  {
    id: 'googlecalendar',
    name: 'Google Calendar',
    description: 'Integration for managing schedules.',
    configured: false,
    icon: CalendarDays,
    inputs: [
      { id: 'gcal_client_id', name: 'googleClientId', label: 'Google Client ID', type: 'text', placeholder: 'Your Google Client ID' },
      { id: 'gcal_client_secret', name: 'googleClientSecret', label: 'Google Client Secret', type: 'password', placeholder: 'Your Google Client Secret' },
    ]
  },
  {
    id: 'n8n',
    name: 'N8N Workflows',
    description: 'Automation engine for message flows.',
    configured: true,
    icon: Workflow,
  },
  {
    id: 'chatwoot',
    name: 'Chatwoot / WhatsApp',
    description: 'Primary channel for WhatsApp communication.',
    configured: true,
    icon: MessageSquare,
     inputs: [
      { id: 'chatwoot_api_url', name: 'chatwootApiUrl', label: 'Chatwoot API URL', type: 'text', placeholder: 'https://chatwoot.example.com' },
      { id: 'chatwoot_token', name: 'chatwootToken', label: 'Chatwoot Token', type: 'password', placeholder: 'Your Chatwoot Token' },
    ]
  },
   {
    id: 'telegram',
    name: 'Telegram Bot',
    description: 'Integration for Telegram messaging.',
    configured: false,
    icon: Send,
    inputs: [
      { id: 'telegram_bot_token', name: 'telegramBotToken', label: 'Telegram Bot Token', type: 'password', placeholder: 'Your Telegram Bot Token' },
      { id: 'telegram_chat_id', name: 'telegramChatId', label: 'Telegram Chat ID', type: 'text', placeholder: 'Your Telegram Chat ID' },
    ]
  },
];

export const mockLLMSettings: IntegrationSetting[] = [
 {
    id: 'llm_settings',
    name: 'LLM Configuration',
    description: 'Settings for the Large Language Model.',
    configured: true,
    icon: BotMessageSquare,
    inputs: [
      { id: 'llm_api_key', name: 'llmApiKey', label: 'LLM API Key', type: 'password', placeholder: 'Your LLM API Key (e.g., OpenAI)' },
      { id: 'llm_model', name: 'llmModel', label: 'Model Name', type: 'text', placeholder: 'e.g., gpt-4, gemini-pro' },
    ]
  },
];

export const mockGeneralSettings: IntegrationSetting[] = [
 {
    id: 'general_notifications',
    name: 'Notifications',
    description: 'Configure how you receive notifications.',
    configured: true,
    icon: Settings2, // Using Settings2 as a generic icon for this category
    inputs: [
      { id: 'email_notifications', name: 'enableEmailNotifications', label: 'Enable Email Notifications', type: 'text', placeholder: 'true/false' }, // Assuming a simple text input for boolean for now
      { id: 'push_notifications', name: 'enablePushNotifications', label: 'Enable Push Notifications', type: 'text', placeholder: 'true/false' },
    ]
  },
];
