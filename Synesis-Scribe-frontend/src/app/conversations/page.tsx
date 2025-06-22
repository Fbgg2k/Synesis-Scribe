import Header from '@/components/layout/Header';
import PageWrapper from '@/components/layout/PageWrapper';
import SectionTitle from '@/components/shared/SectionTitle';
import ConversationListItem from '@/components/dashboard/ConversationListItem';
import { mockConversations } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AllConversationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle title="All Conversations" description="Browse through all your past interactions." className="mb-0" />
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        {mockConversations.length > 0 ? (
          <div className="space-y-4">
            {mockConversations.map((convo) => (
              <ConversationListItem key={convo.id} conversation={convo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No conversations yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Start interacting with your channels to see conversations here.</p>
          </div>
        )}
      </PageWrapper>
    </div>
  );
}
