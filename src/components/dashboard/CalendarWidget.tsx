import type { CalendarEvent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-lg font-medium flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-primary" />
            Calendar At a Glance
          </CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings#googlecalendar"> {/* Link to Google Calendar settings */}
              <PlusCircle className="mr-2 h-4 w-4" /> Manage
            </Link>
          </Button>
        </div>
        <CardDescription>Upcoming appointments and events.</CardDescription>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <ScrollArea className="h-[200px]">
            <ul className="space-y-3">
              {events.map((event) => (
                <li key={event.id} className="flex items-start space-x-3 p-2 rounded-md bg-muted/50">
                  <div className={cn("mt-1 h-3 w-3 rounded-full shrink-0", event.color || 'bg-primary')} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No upcoming events.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
