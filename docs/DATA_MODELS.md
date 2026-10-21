# ĐẶC TẢ KIỂU DỮ LIỆU & SCHEMA (DATA MODELS)
**Dự án:** RAG Dataset Builder & AI Knowledge Assistant  

---

## 1. Kiểu Dữ Liệu Phân Hệ Người Dùng Cuối (End-User Portal)

```typescript
export interface Citation {
  id: string;                      // vd: "cite_1"
  chunkId: string;                 // ID chunk tham chiếu
  documentTitle: string;           // Tên tài liệu: "EN_BK_001_AI Agents in Depth.pdf"
  pageNumber: number;              // Số trang sách (vd: 45)
  snippet: string;                 // Đoạn trích dẫn nguyên văn
  similarityScore: number;         // 0.0 - 1.0
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
  topicId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  sourceCitation: Citation;
}
```

---

## 2. Kiểu Dữ Liệu Phân Hệ Kỹ Thuật Viên (Technician Studio)

```typescript
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
```
