import type { IntegrationSetting } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { CheckCircle2, XCircle, Settings } from 'lucide-react';
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';

interface IntegrationCardProps {
  integration: IntegrationSetting;
  showConfigureButton?: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, showConfigureButton = false }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="font-headline text-lg font-medium flex items-center">
            {integration.iconName && <DynamicLucideIcon name={integration.iconName} className="mr-2 h-5 w-5 text-primary" />}
            {integration.name}
          </CardTitle>
          <Badge variant={integration.configured ? 'default' : 'secondary'}>
            {integration.configured ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
            {integration.configured ? 'Configured' : 'Not Configured'}
          </Badge>
        </div>
        <CardDescription className="text-sm">{integration.description}</CardDescription>
      </CardHeader>
      {showConfigureButton && (
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href={`/settings#${integration.id}`}>
              <Settings className="mr-2 h-4 w-4" /> Configure
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default IntegrationCard;
