import type { Channel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  const statusVariant = channel.status === 'Connected' ? 'default' : channel.status === 'Needs Setup' ? 'secondary' : 'destructive';
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-headline text-lg font-medium">{channel.name}</CardTitle>
        <channel.icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-1">
          {channel.type}
        </div>
        <Badge variant={statusVariant} className="text-xs">
          {channel.status}
        </Badge>
        {channel.messageCount !== undefined && (
          <p className="text-sm text-muted-foreground mt-2">
            {channel.messageCount} messages processed
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
