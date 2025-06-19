
import type * as LucideIcons from 'lucide-react'; // Import as namespace for type extraction

// Define a type for valid Lucide icon names
export type IconName = keyof typeof LucideIcons;

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  audioUrl?: string;
  usedCalendar?: boolean;
}

export interface Conversation {
  id:string;
  contactName: string;
  lastMessageSnippet: string;
  timestamp: string;
  channel: 'WhatsApp' | 'Telegram' | 'Other';
  avatar?: string; // URL to placeholder avatar
  messages: Message[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'WhatsApp' | 'Telegram';
  status: 'Connected' | 'Disconnected' | 'Needs Setup';
  iconName: IconName; // Ensures this is a string key of LucideIcons
  messageCount?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?: string; // e.g., 'bg-blue-500', 'bg-green-500'
}

export interface IntegrationSettingInput {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'password' | 'email';
  placeholder: string;
  value?: string; // Current value, typically from env or state
}
export interface IntegrationSetting {
  id: string;
  name: string;
  description: string;
  configured: boolean;
  iconName: IconName; // Ensures this is a string key of LucideIcons
  inputs?: IntegrationSettingInput[];
}
