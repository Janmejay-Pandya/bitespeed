// src/types/index.ts

export interface IdentifyRequest {
    email?: string;
    phoneNumber?: string;
  }
  export interface ContactMetadata {
    id: number;
    linkedId: number | null;
    linkPrecedence: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
  export interface IdentifyResponse {
    contact: {
      primaryContactId: number;
      emails: string[];
      phoneNumbers: string[];
      secondaryContactIds: number[];
      metadata?: ContactMetadata[]; // 
    };
  }
  