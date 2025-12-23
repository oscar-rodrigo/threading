export interface Thread {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  createdAt: string;  // ISO8601
  updatedAt: string;  // ISO8601
  noteCount: number;
  color: string;      // Hex color
}

export interface Note {
  id: string;
  threadId: string | null;
  source: 'email' | 'manual';
  emailMetadata?: {
    from: string;
    subject: string;
    receivedAt: string;
    messageId: string;
  };
  content: {
    plainText: string;
    html?: string;
    extractedText: string;
  };
  classification?: {
    threadId: string;
    confidence: number;
    reasoning: string;
    modelUsed: string;
    classifiedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedMarkdown {
  id: string;
  threadId: string;
  threadTitle: string;
  content: string;
  generatedAt: string;
  modelUsed: string;
  noteCount: number;
}
