// Types definition for RAG Dataset Builder & AI Knowledge Assistant

export type AppPersonaMode = 'USER' | 'TECH';

// End-User Types
export interface Citation {
  id: string;
  chunkId: string;
  documentTitle: string;
  pageNumber: number;
  snippet: string;
  similarityScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
  suggestedFollowUps?: string[];
}

export interface TopicItem {
  id: string;
  title: string;
  category: string;
  description: string;
  chunkCount: number;
  sampleQuestions: string[];
}

export interface QuizQuestion {
  id: string;
  topicTitle: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  sourceCitation: Citation;
}

// Technician Types
export type DocumentCategory = 'BK' | 'TX' | 'PP' | 'TH' | 'TR' | 'SL' | 'LN' | 'GD' | 'UM';
export type LanguageCode = 'EN' | 'VI';
export type PipelineStatus = 'PENDING' | 'PARSING' | 'CHUNKING' | 'COMPLETED' | 'FAILED';

export interface Document {
  id: string;
  fileName: string;
  category: DocumentCategory;
  language: LanguageCode;
  universityTag?: string;
  filePath: string;
  markdownPath?: string;
  structuredJsonPath?: string;
  pageCount: number;
  fileSizeBytes: number;
  status: PipelineStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChunkMetadata {
  pageStart: number;
  pageEnd: number;
  sectionPath: string[];
  headingLevel: number;
  hasTable: boolean;
  hasEquation: boolean;
  imageRefs: string[];
}

export interface Chunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  characterCount: number;
  metadata: ChunkMetadata;
  parentId?: string;
  createdAt: string;
}

export interface KPIOverview {
  totalDocuments: number;
  totalPages: number;
  totalChunks: number;
  totalMathFormulas: number;
  totalTables: number;
  totalImages: number;
}

export interface CategoryStat {
  category: DocumentCategory;
  categoryName: string;
  documentCount: number;
  chunkCount: number;
  percentage: number;
}

export interface ChunkSizeHistogramBucket {
  rangeLabel: string;
  minTokens: number;
  maxTokens: number;
  count: number;
}
