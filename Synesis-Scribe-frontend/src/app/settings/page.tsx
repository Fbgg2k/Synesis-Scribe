import Header from '@/components/layout/Header';
import PageWrapper from '@/components/layout/PageWrapper';
import SectionTitle from '@/components/shared/SectionTitle';
import IntegrationSettingsCard from '@/components/settings/IntegrationSettingsCard';
import { mockIntegrationSettings, mockLLMSettings, mockGeneralSettings } from '@/lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const communicationChannels = mockIntegrationSettings.filter(
    (setting) => ['chatwoot', 'telegram'].includes(setting.id)
  );
  const serviceIntegrations = mockIntegrationSettings.filter(
    (setting) => ['supabase', 'elevenlabs', 'googlecalendar', 'n8n'].includes(setting.id)
  );


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <SectionTitle title="Application Settings" description="Configure your integrations and preferences for Synesis Scribe." />

        <Tabs defaultValue="integrations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="integrations">Service Integrations</TabsTrigger>
            <TabsTrigger value="channels">Communication Channels</TabsTrigger>
            <TabsTrigger value="llm">LLM Configuration</TabsTrigger>
            <TabsTrigger value="general">General Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceIntegrations.map((integration) => (
                <IntegrationSettingsCard key={integration.id} integration={integration} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communicationChannels.map((integration) => (
                <IntegrationSettingsCard key={integration.id} integration={integration} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="llm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockLLMSettings.map((setting) => (
                <IntegrationSettingsCard key={setting.id} integration={setting} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="general">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockGeneralSettings.map((setting) => (
                <IntegrationSettingsCard key={setting.id} integration={setting} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PageWrapper>
    </div>
  );
}
