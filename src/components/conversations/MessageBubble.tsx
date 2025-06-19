'use client';

import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Play, Bot, User, CalendarCheck2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isAIMessage = message.sender === 'ai';

  const handlePlayAudio = () => {
    if (message.audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Audio Playback Error",
            description: "Could not play the audio.",
            variant: "destructive",
          });
        });
      }
    } else if (!message.audioUrl) {
       toast({
        title: "Audio Not Available",
        description: "No audio response is available for this message.",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onEnded = () => setIsPlaying(false);

      currentAudioRef.addEventListener('play', onPlay);
      currentAudioRef.addEventListener('pause', onPause);
      currentAudioRef.addEventListener('ended', onEnded);

      return () => {
        currentAudioRef.removeEventListener('play', onPlay);
        currentAudioRef.removeEventListener('pause', onPause);
        currentAudioRef.removeEventListener('ended', onEnded);
      };
    }
  }, [message.audioUrl]);


  return (
    <div
      className={cn(
        'flex items-end gap-2 max-w-[75%]',
        isAIMessage ? 'self-start' : 'self-end flex-row-reverse'
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={isAIMessage ? 'https://placehold.co/40x40.png' : 'https://placehold.co/40x40.png'} data-ai-hint={isAIMessage ? "bot avatar" : "user avatar"} />
        <AvatarFallback>{isAIMessage ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'rounded-xl p-3 shadow-md break-words',
          isAIMessage ? 'bg-card rounded-bl-none' : 'bg-primary text-primary-foreground rounded-br-none'
        )}
      >
        <p className="text-sm">{message.text}</p>
        <div className="mt-1.5 flex items-center gap-2 justify-end">
          {isAIMessage && message.audioUrl && (
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6 text-muted-foreground hover:text-foreground",
                      isAIMessage ? "text-muted-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"
                    )}
                    onClick={handlePlayAudio}
                    aria-label={isPlaying ? "Pause audio" : "Play audio response"}
                  >
                    <Play className={cn("h-4 w-4", {"fill-current": isPlaying})} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Pause" : "Play"} voice response</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {isAIMessage && message.usedCalendar && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CalendarCheck2 className={cn("h-3.5 w-3.5", isAIMessage ? "text-muted-foreground/70" : "text-primary-foreground/70")} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Response used calendar data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <span className={cn("text-xs", isAIMessage ? "text-muted-foreground/80" : "text-primary-foreground/70")}>
            {message.timestamp}
          </span>
        </div>
      </div>
      {isAIMessage && message.audioUrl && <audio ref={audioRef} src={message.audioUrl} className="hidden" />}
    </div>
  );
};

export default MessageBubble;
