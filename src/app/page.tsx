import Header from '@/components/layout/Header';
import PageWrapper from '@/components/layout/PageWrapper';
import SectionTitle from '@/components/shared/SectionTitle';
import ChannelCard from '@/components/dashboard/ChannelCard';
import ConversationListItem from '@/components/dashboard/ConversationListItem';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import IntegrationCard from '@/components/dashboard/IntegrationCard';
import { mockChannels, mockConversations, mockCalendarEvents, mockIntegrationSettings } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const dashboardIntegrations = mockIntegrationSettings.filter(
    (setting) => ['supabase', 'elevenlabs', 'n8n', 'googlecalendar'].includes(setting.id)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <SectionTitle title="Welcome to Synesis Scribe" description="Your intelligent virtual assistant dashboard." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center justify-center bg-card">
            <MessageSquarePlus className="h-12 w-12 text-primary mb-3" />
            <h3 className="font-headline text-lg font-medium mb-2 text-foreground">Add New Channel</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">Expand your reach by connecting more communication platforms.</p>
            <Button variant="default" asChild>
              <Link href="/settings#channels">Connect Channel</Link>
            </Button>
          </Card>
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SectionTitle title="Recent Conversations" />
            {mockConversations.length > 0 ? (
              <div className="space-y-4">
                {mockConversations.slice(0, 5).map((convo) => ( // Show top 5
                  <ConversationListItem key={convo.id} conversation={convo} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent conversations.</p>
            )}
             {mockConversations.length > 5 && (
                <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                        <Link href="/conversations">View All Conversations</Link>
                    </Button>
                </div>
            )}
          </div>

          <div>
            <SectionTitle title="What's Next?" />
            <CalendarWidget events={mockCalendarEvents} />
          </div>
        </div>

        <div className="mt-12">
            <SectionTitle title="Key Integrations Status" description="Overview of your connected services."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardIntegrations.map(integration => (
                    <IntegrationCard key={integration.id} integration={integration} showConfigureButton={true} />
                ))}
            </div>
        </div>

      </PageWrapper>
    </div>
  );
}

// Added a placeholder Card component for the "Add New Channel" card content.
// This is to satisfy the JSX structure. You would replace this with actual Card component from shadcn/ui
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);
