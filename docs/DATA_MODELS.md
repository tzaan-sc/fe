# 📐 ĐẶC TẢ KIỂU DỮ LIỆU & SCHEMA (DATA MODELS)
**Dự án:** RAG Dataset Builder Studio  
**Mục đích:** Thống nhất 100% kiểu dữ liệu (Types/Interfaces) giữa Frontend, Backend và Database.

---

## 1. Kiểu Dữ Liệu Thực Thể Cốt Lõi (Core Entities)

### A. Tài Liệu (`Document`)
Đại diện cho 1 tệp tài liệu trong kho lưu trữ (Sách, Giáo trình, Slide,...).
```typescript
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
  id: string;                      // vd: "doc_001"
  fileName: string;                // vd: "EN_BK_001_AI Agents in Depth.pdf"
  category: DocumentCategory;      // "BK"
  language: LanguageCode;          // "EN"
  universityTag?: string;          // vd: "MIT", "UCB", "COR" (chỉ có khi category là "UM")
  filePath: string;                // Đường dẫn file PDF gốc trong data/01_raw/
  markdownPath?: string;           // Đường dẫn file markdown sau MinerU
  structuredJsonPath?: string;     // Đường dẫn structured_content.json
  pageCount: number;               // Tổng số trang
  fileSizeBytes: number;           // Dung lượng (bytes)
  status: PipelineStatus;          // Trạng thái xử lý
  createdAt: string;               // ISO 8601 string: "2026-10-21T08:00:00Z"
  updatedAt: string;
}
```

---

### B. Phân Đoạn Dữ Liệu (`Chunk`)
Đại diện cho 1 đơn vị tri thức sau khi cắt nhỏ tài liệu, dùng cho vector database / embedding trong RAG.
```typescript
export interface ChunkMetadata {
  pageStart: number;               // Trang bắt đầu (1-indexed)
  pageEnd: number;                 // Trang kết thúc
  sectionPath: string[];           // vd: ["Chương 2: Tìm kiếm", "2.3 Giải thuật A*"]
  headingLevel: number;            // Cấp bậc tiêu đề (1 = H1, 2 = H2, ...)
  hasTable: boolean;               // Đoạn này có chứa bảng biểu không
  hasEquation: boolean;            // Đoạn này có chứa công thức toán không
  imageRefs: string[];             // Danh sách file ảnh liên kết: ["fig_01.png"]
}

export interface Chunk {
  id: string;                      // vd: "chk_001"
  documentId: string;              // Thuộc document nào
  chunkIndex: number;              // Thứ tự trong tài liệu (0, 1, 2...)
  content: string;                 // Nội dung Markdown của chunk
  tokenCount: number;              // Số lượng token (đo bằng tiktoken hoặc words)
  characterCount: number;          // Số ký tự
  metadata: ChunkMetadata;         // Thông tin vị trí & đặc tính
  parentId?: string;               // ID của chunk cha (nếu dùng Parent-Child Strategy)
  createdAt: string;
}

export interface ParentChunk {
  id: string;                      // vd: "p_chk_001"
  documentId: string;
  sectionTitle: string;
  content: string;                 // Nội dung toàn bộ mục lớn
  childChunkIds: string[];         // Danh sách ID các chunk con
}
```

---

## 2. Kiểu Dữ Liệu Cho Dashboard & Thống Kê (`Analytics`)

```typescript
export interface KPIOverview {
  totalDocuments: number;          // Tổng số tài liệu (vd: 125)
  totalPages: number;              // Tổng số trang đã parse (vd: 3450)
  totalChunks: number;             // Tổng số chunk đã tạo (vd: 12400)
  totalMathFormulas: number;       // Số công thức toán phát hiện (vd: 850)
  totalTables: number;             // Số bảng biểu phát hiện (vd: 420)
  totalImages: number;             // Số hình ảnh trích xuất (vd: 1100)
}

export interface CategoryStat {
  category: DocumentCategory;
  categoryName: string;            // "Sách tham khảo", "Giáo trình",...
  documentCount: number;
  chunkCount: number;
  percentage: number;              // Tỷ lệ %
}

export interface ChunkSizeHistogramBucket {
  rangeLabel: string;              // vd: "0-256", "257-512", "513-1024", ">1024"
  minTokens: number;
  maxTokens: number;
  count: number;                   // Số lượng chunk trong khoảng này
}
```

---

## 3. Kiểu Dữ Liệu Cho Chunking Studio (`ChunkingEngine`)

```typescript
export type ChunkingStrategy = 'HEADING' | 'SEMANTIC' | 'PARENT_CHILD' | 'FIXED_WINDOW';

export interface ChunkingConfig {
  documentId: string;
  strategy: ChunkingStrategy;
  maxTokens: number;               // Giới hạn token tối đa (vd: 512, 1024)
  overlapTokens: number;           // Số token gối đầu (vd: 50)
  keepTablesIntact: boolean;       // Không cắt đôi bảng biểu
  keepMathIntact: boolean;         // Không cắt đôi khối công thức
}

export interface ChunkingPreviewResponse {
  config: ChunkingConfig;
  totalChunksGenerated: number;
  averageTokensPerChunk: number;
  previewChunks: Chunk[];          // Danh sách chunk hiển thị trực quan
}
```

---

## 4. Kiểu Dữ Liệu Cho RAG Playground (`RetrievalTest`)

```typescript
export interface RetrievalQueryRequest {
  query: string;                   // Câu hỏi test (vd: "Thuật toán A* là gì?")
  topK: number;                    // Số lượng chunk muốn lấy (vd: 5)
  categoryFilter?: DocumentCategory[];
}

export interface ScoredChunk {
  chunk: Chunk;
  documentTitle: string;
  similarityScore: number;         // Điểm số tương đồng cosine (0.00 -> 1.00)
}

export interface RetrievalQueryResponse {
  query: string;
  executionTimeMs: number;
  results: ScoredChunk[];
}
```
