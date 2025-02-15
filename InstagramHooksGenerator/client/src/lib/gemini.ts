import { apiRequest } from "./queryClient";
import type { Business, Hook } from "@shared/schema";

export interface GenerateHooksResponse {
  business: Business;
  hooks: Hook[];
}

export async function generateHooks(businessData: {
  name: string;
  industry: string;
  targetAudience: string;
  products: string;
  brandVoice: string;
  customPrompt?: string;
}): Promise<GenerateHooksResponse> {
  const res = await apiRequest("POST", "/api/business", businessData);
  return res.json();
}