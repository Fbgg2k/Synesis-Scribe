import Link from 'next/link';
import type { Conversation } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationListItemProps {
  conversation: Conversation;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({ conversation }) => {
  return (
    <Link href={`/conversations/${conversation.id}`} className="block group">
      <div className="flex items-center justify-between p-4 bg-card hover:bg-muted/50 rounded-lg shadow transition-colors duration-200">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.avatar} alt={conversation.contactName} data-ai-hint="person avatar" />
            <AvatarFallback>{conversation.contactName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{conversation.contactName}</p>
            <p className="text-xs text-muted-foreground truncate">{conversation.lastMessageSnippet}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <span className="text-xs text-muted-foreground hidden sm:inline">{conversation.timestamp}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default ConversationListItem;
