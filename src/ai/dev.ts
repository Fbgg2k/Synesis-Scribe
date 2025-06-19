import { config } from 'dotenv';
config();

import '@/ai/flows/initial-setup-prompt.ts';
import '@/ai/flows/generate-response.ts';
import '@/ai/flows/summarize-conversation.ts';