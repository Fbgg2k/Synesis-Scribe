import Header from '@/components/layout/Header';
import PageWrapper from '@/components/layout/PageWrapper';
import ConversationClientPage from '@/components/conversations/ConversationClientPage';
import SectionTitle from '@/components/shared/SectionTitle';
import { mockConversations } from '@/lib/mockData'; // For fetching contact name
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ConversationPageProps {
  params: { id: string };
}

// This function could be used for generating static paths if needed
// export async function generateStaticParams() {
//   return mockConversations.map((convo) => ({
//     id: convo.id,
//   }));
// }

export default async function ConversationPage({ params }: ConversationPageProps) {
  const conversation = mockConversations.find(c => c.id === params.id);
  const contactName = conversation ? conversation.contactName : 'Contact';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper className="p-0 md:p-0 lg:p-0 flex flex-col">
        <div className="p-4 sm:p-6 lg:p-8 border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
             <h1 className="font-headline text-xl md:text-2xl font-semibold text-foreground">
              Chat with {contactName}
            </h1>
            <div>{/* Placeholder for actions */}</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
         <ConversationClientPage conversationId={params.id} />
        </div>
      </PageWrapper>
    </div>
  );
}
