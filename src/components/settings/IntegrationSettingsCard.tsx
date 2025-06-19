'use client';

import type { IntegrationSetting } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, type FormEvent } from 'react';

interface IntegrationSettingsCardProps {
  integration: IntegrationSetting;
}

const IntegrationSettingsCard: React.FC<IntegrationSettingsCardProps> = ({ integration }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {};
    integration.inputs?.forEach(input => {
      initialData[input.name] = input.value || '';
    });
    return initialData;
  });
  const [isConfigured, setIsConfigured] = useState(integration.configured);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Here you would typically send the formData to your backend/N8N to save.
    // For this PoC, we'll just simulate success.
    console.log('Saving settings for', integration.name, formData);
    setIsConfigured(true); // Simulate configuration
    toast({
      title: `${integration.name} Settings Saved`,
      description: 'Your settings have been (simulated) saved successfully.',
    });
  };

  return (
    <Card id={integration.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {integration.icon && <integration.icon className="mr-3 h-6 w-6 text-primary" />}
            <CardTitle className="font-headline text-xl font-medium">{integration.name}</CardTitle>
          </div>
          <Badge variant={isConfigured ? 'default' : 'secondary'}>
            {isConfigured ? <CheckCircle2 className="mr-1 h-4 w-4" /> : <XCircle className="mr-1 h-4 w-4" />}
            {isConfigured ? 'Configured' : 'Not Configured'}
          </Badge>
        </div>
        <CardDescription>{integration.description}</CardDescription>
      </CardHeader>
      {integration.inputs && integration.inputs.length > 0 && (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {integration.inputs.map((input) => (
              <div key={input.id} className="space-y-1">
                <Label htmlFor={input.id} className="text-sm font-medium">
                  {input.label}
                </Label>
                <Input
                  id={input.id}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={formData[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="bg-muted/30"
                />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Configuration
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
};

export default IntegrationSettingsCard;
