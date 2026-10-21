// Types definition for RAG Dataset Builder Studio

export type DocumentCategory = 
  | 'BK' // Sách tham khảo (Book)
  | 'TX' // Giáo trình học thuật (Textbook)
  | 'PP' // Bài báo khoa học (Paper)
  | 'TH' // Luận văn, đồ án (Thesis)
  | 'TR' // Báo cáo kỹ thuật (Technical Report)
  | 'SL' // Slide bài giảng (Slides)
  | 'LN' // Ghi chép học tập (Lecture Notes)
  | 'GD' // Hướng dẫn (Guides/Tutorials)
  | 'UM'; // Tài liệu ĐH Quốc tế (MIT, Berkeley, Cornell...)

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

export type ChunkingStrategy = 'HEADING' | 'SEMANTIC' | 'PARENT_CHILD' | 'FIXED_WINDOW';

export interface ChunkingConfig {
  documentId: string;
  strategy: ChunkingStrategy;
  maxTokens: number;
  overlapTokens: number;
  keepTablesIntact: boolean;
  keepMathIntact: boolean;
}

export interface ScoredChunk {
  chunk: Chunk;
  documentTitle: string;
  similarityScore: number;
}

export interface RetrievalQueryResponse {
  query: string;
  executionTimeMs: number;
  results: ScoredChunk[];
}
