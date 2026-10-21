import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  FileText, 
  BookOpen, 
  ExternalLink,
  Table as TableIcon,
  Sigma,
  Scissors,
  CheckCircle2,
  Copy
} from 'lucide-react';
import mockData from '../../data/mockData.json';
import type { NavTab } from '../layout/Sidebar';

interface DocumentsViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ onNavigate }) => {
  const { documents } = mockData;
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeViewTab, setActiveViewTab] = useState<'markdown' | 'structured' | 'stats'>('markdown');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sampleMarkdownContent = `# ${selectedDoc.fileName.replace('.pdf', '')}

## 1. Giới thiệu tổng quan và mục tiêu
Tài liệu học thuật được trích xuất tự động qua pipeline **MinerU (v0.8.2)**. Các cấu trúc tiêu đề, công thức toán học và bảng biểu được nhận diện và bảo toàn phục vụ phân đoạn tri thức (Chunking).

### 1.1 Khái niệm Heuristic Search & A* Search
Trong lý thuyết trí tuệ nhân tạo, giải thuật tìm kiếm heuristic đóng vai trò cốt lõi để thu hẹp không gian trạng thái. Hàm đánh giá được định nghĩa qua công thức:

$$f(n) = g(n) + h(n)$$

Trong đó:
- $g(n)$ là chi phí thực tế từ điểm xuất phát tới nút $n$.
- $h(n)$ là ước lượng chi phí từ $n$ tới mục tiêu (Heuristic).

### 1.2 Bảng so sánh các giải thuật tìm kiếm
| Thuật toán | Tính đầy đủ (Complete) | Tính tối ưu (Optimal) | Độ phức tạp thời gian |
| :--- | :---: | :---: | :---: |
| **BFS** | Có | Có (chi phí đều) | $O(b^d)$ |
| **DFS** | Không | Không | $O(b^m)$ |
| **A\* Search** | Có | Có (nếu $h(n)$ admissible) | $O(b^d)$ |

---
*Ghi chú: Đã lưu trữ metadata trang gốc [Trang 1 -> ${selectedDoc.pageCount}].*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleMarkdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <FolderKanban size={28} color="var(--accent-cyan)" />
            Kho Tài Liệu & Đối Soát Bóc Tách (Document Explorer)
          </h2>
          <p className="page-desc">
            Quản lý tài liệu gốc và đối soát song song kết quả trích xuất văn bản, bảng biểu, công thức toán từ MinerU.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => onNavigate('chunking')}
        >
          <Scissors size={16} />
          <span>Chuyển sang Chunking Studio</span>
        </button>
      </div>

      {/* Main Dual Inspector Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '20px', minHeight: '680px' }}>
        {/* Left Panel: Document List & Search */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
          {/* Search box */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Tìm tài liệu theo tên, mã..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-control"
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '4px' }}>
            Danh sách tệp ({filteredDocs.length})
          </div>

          {/* Document Items Scroll list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
            {filteredDocs.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-input)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <BookOpen size={16} color={isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: isSelected ? '#fff' : 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {doc.fileName}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--text-dim)' }}>
                    <span>{doc.pageCount} trang • {(doc.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                    <span className="badge badge-cyan" style={{ fontSize: '10px' }}>{doc.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Dual-View Inspector */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
          {/* Top Bar of Viewer */}
          <div 
            style={{ 
              padding: '14px 20px', 
              borderBottom: '1px solid var(--border-subtle)',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={18} color="var(--accent-cyan)" />
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
                  {selectedDoc.fileName}
                </span>
                <span className="badge badge-emerald">MinerU Parsed</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '2px' }}>
                Đường dẫn gốc: <code style={{ fontSize: '11px' }}>{selectedDoc.filePath}</code>
              </div>
            </div>

            {/* View Mode Tabs & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', padding: '2px', border: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setActiveViewTab('markdown')}
                  className="btn"
                  style={{
                    padding: '5px 12px',
                    fontSize: '12px',
                    backgroundColor: activeViewTab === 'markdown' ? 'var(--accent-cyan)' : 'transparent',
                    color: activeViewTab === 'markdown' ? '#000' : 'var(--text-muted)',
                    borderRadius: '4px'
                  }}
                >
                  Markdown Rendered
                </button>
                <button
                  onClick={() => setActiveViewTab('structured')}
                  className="btn"
                  style={{
                    padding: '5px 12px',
                    fontSize: '12px',
                    backgroundColor: activeViewTab === 'structured' ? 'var(--accent-cyan)' : 'transparent',
                    color: activeViewTab === 'structured' ? '#000' : 'var(--text-muted)',
                    borderRadius: '4px'
                  }}
                >
                  JSON Cấu trúc
                </button>
              </div>

              <button 
                onClick={handleCopy}
                className="btn btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
                title="Sao chép nội dung"
              >
                {copied ? <CheckCircle2 size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copied ? 'Đã chép' : 'Copy MD'}</span>
              </button>
            </div>
          </div>

          {/* Content Viewer Body */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: 'var(--bg-main)' }}>
            {activeViewTab === 'markdown' ? (
              <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Feature highlight tags */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="badge badge-purple" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sigma size={12} /> 14 Công thức toán
                  </span>
                  <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TableIcon size={12} /> 6 Bảng dữ liệu
                  </span>
                  <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ExternalLink size={12} /> Tương thích RAG Chunks
                  </span>
                </div>

                <div 
                  style={{ 
                    whiteSpace: 'pre-wrap', 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '14.5px', 
                    lineHeight: '1.7', 
                    color: '#e2e8f0',
                    backgroundColor: 'var(--bg-card)',
                    padding: '24px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {sampleMarkdownContent}
                </div>
              </div>
            ) : (
              <pre 
                style={{ 
                  backgroundColor: 'var(--bg-input)', 
                  padding: '18px', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '13px', 
                  color: '#38bdf8',
                  overflowX: 'auto',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {JSON.stringify(
                  {
                    documentId: selectedDoc.id,
                    fileName: selectedDoc.fileName,
                    status: "PARSED_SUCCESS",
                    engine: "MinerU-v0.8.2",
                    pages: selectedDoc.pageCount,
                    blocks: [
                      { type: "header", level: 1, text: selectedDoc.fileName },
                      { type: "paragraph", text: "Tài liệu học thuật được trích xuất tự động qua pipeline MinerU..." },
                      { type: "equation", math: "f(n) = g(n) + h(n)", format: "latex" },
                      { type: "table", rows: 4, cols: 4, label: "So sánh giải thuật tìm kiếm" }
                    ]
                  }, 
                  null, 
                  2
                )}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
