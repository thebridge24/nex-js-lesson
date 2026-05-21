// src/types/discovery.ts
export interface DiscoveryFormData {
  clientName: string;
  businessName: string;
  contactInfo: {
    email: string;
    phone: string;
    whatsapp?: string;
  };
  whatTheyNeed: string[];
  goals: string;
  budget: string;
  timeline: string;
  referenceWebsites: string;
}