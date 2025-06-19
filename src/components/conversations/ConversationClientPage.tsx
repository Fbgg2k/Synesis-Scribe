'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, Message } from '@/lib/types';
import { mockConversations } from '@/lib/mockData'; // For initial data
import MessageBubble from './MessageBubble';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, CornerDownLeft, Loader2, Mic } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateResponse as generateAiResponse } from '@/ai/flows/generate-response';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface ConversationClientPageProps {
  conversationId: string;
}

const ConversationClientPage: React.FC<ConversationClientPageProps> = ({ conversationId }) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching conversation data
    const fetchedConversation = mockConversations.find(c => c.id === conversationId);
    if (fetchedConversation) {
      setConversation(fetchedConversation);
      setMessages(fetchedConversation.messages || []);
    } else {
      // Handle conversation not found, e.g., redirect or show error
      toast({
        title: 'Error',
        description: 'Conversation not found.',
        variant: 'destructive',
      });
    }
  }, [conversationId, toast]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      // Simulate calendar data for AI. In a real app, this would be dynamic.
      const calendarData = "User's next appointment is Project Review at 3 PM today.";
      const aiResponse = await generateAiResponse({ message: userMessage.text, calendarData });
      
      // N8N/Backend would handle ElevenLabs integration. For PoC, we mock audioUrl.
      // And also determine if calendar was truly used based on logic.
      const mockAudioUrl = Math.random() > 0.5 ? 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' : undefined;
      const usedCalendar = Math.random() > 0.3;


      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audioUrl: mockAudioUrl,
        usedCalendar: usedCalendar,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: 'AI Response Error',
        description: 'Failed to get a response from the assistant. Please try again.',
        variant: 'destructive',
      });
      // Optionally add the failed user message back to input or keep it in chat with error state
    } finally {
      setIsLoading(false);
    }
  };


  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading conversation...</p>
      </div>
    );
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] shadow-xl">
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4 md:p-6" ref={scrollAreaRef}>
          <div className="space-y-6 flex flex-col">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="self-start flex items-end gap-2 max-w-[75%]">
                 <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                 <span className="text-sm text-muted-foreground italic">Assistant is typing...</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="border-t p-3 md:p-4 bg-card">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled={isLoading}>
            <Mic className="h-5 w-5" />
            <span className="sr-only">Use Microphone</span>
          </Button>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full px-4 py-2 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
            disabled={isLoading}
            aria-label="Message input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !newMessage.trim()} className="rounded-full bg-primary hover:bg-primary/90">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send Message</span>
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ConversationClientPage;
