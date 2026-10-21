import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Check, 
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
  const [activeViewTab, setActiveViewTab] = useState<'markdown' | 'structured'>('markdown');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sampleMarkdownContent = `# ${selectedDoc.fileName.replace('.pdf', '')}

## 1. Giới thiệu tổng quan
Tài liệu học thuật được trích xuất qua pipeline **MinerU (v0.8.2)**. Các cấu trúc tiêu đề, công thức toán học và bảng biểu được nhận diện và bảo toàn phục vụ phân đoạn tri thức (Chunking).

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
| **A* Search** | Có | Có (nếu $h(n)$ admissible) | $O(b^d)$ |

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
            Kho Tài Liệu & Kết Quả MinerU
          </h2>
          <p className="page-desc">
            Đối soát tài liệu gốc và nội dung Markdown đã bóc tách phục vụ pipeline chunking.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => onNavigate('chunking')}
        >
          <span>Mở Chunking Studio</span>
        </button>
      </div>

      {/* Main Dual Inspector Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '18px', minHeight: '640px' }}>
        {/* Left Panel: Document List & Search */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '12px' }}>
          {/* Search box */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Tìm tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-control"
              style={{ paddingLeft: '32px', fontSize: '13px', height: '34px' }}
            />
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', padding: '0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Tệp đã bóc tách ({filteredDocs.length})
          </div>

          {/* Document Items Scroll list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1 }}>
            {filteredDocs.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--accent-indigo-subtle)' : 'transparent',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent-indigo-border)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <BookOpen size={14} color={isSelected ? 'var(--accent-indigo)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '13px', fontWeight: isSelected ? 600 : 500, color: isSelected ? 'var(--accent-indigo-text)' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {doc.fileName}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>{doc.pageCount} trang</span>
                    <span className="badge badge-indigo" style={{ padding: '1px 6px', fontSize: '10.5px' }}>{doc.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Clean Document Reader */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
          {/* Top Bar of Viewer */}
          <div 
            style={{ 
              padding: '12px 20px', 
              borderBottom: '1px solid var(--border-subtle)',
              backgroundColor: '#f8fafc',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {selectedDoc.fileName}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                {selectedDoc.filePath}
              </div>
            </div>

            {/* View Mode Tabs & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', backgroundColor: '#e2e8f0', borderRadius: '6px', padding: '2px' }}>
                <button
                  onClick={() => setActiveViewTab('markdown')}
                  style={{
                    padding: '4px 12px',
                    fontSize: '12.5px',
                    fontWeight: activeViewTab === 'markdown' ? 600 : 500,
                    border: 'none',
                    backgroundColor: activeViewTab === 'markdown' ? '#ffffff' : 'transparent',
                    color: activeViewTab === 'markdown' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: activeViewTab === 'markdown' ? '0 1px 2px rgba(15, 23, 42, 0.08)' : 'none'
                  }}
                >
                  Markdown
                </button>
                <button
                  onClick={() => setActiveViewTab('structured')}
                  style={{
                    padding: '4px 12px',
                    fontSize: '12.5px',
                    fontWeight: activeViewTab === 'structured' ? 600 : 500,
                    border: 'none',
                    backgroundColor: activeViewTab === 'structured' ? '#ffffff' : 'transparent',
                    color: activeViewTab === 'structured' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: activeViewTab === 'structured' ? '0 1px 2px rgba(15, 23, 42, 0.08)' : 'none'
                  }}
                >
                  JSON Cấu trúc
                </button>
              </div>

              <button 
                onClick={handleCopy}
                className="btn btn-secondary" 
                style={{ padding: '5px 12px', fontSize: '12px' }}
              >
                {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          {/* Content Viewer Body */}
          <div style={{ flex: 1, padding: '28px 36px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
            {activeViewTab === 'markdown' ? (
              <div 
                style={{ 
                  maxWidth: '820px', 
                  margin: '0 auto', 
                  whiteSpace: 'pre-wrap', 
                  fontSize: '14.5px', 
                  lineHeight: '1.8', 
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                {sampleMarkdownContent}
              </div>
            ) : (
              <pre 
                style={{ 
                  backgroundColor: '#f8fafc', 
                  padding: '18px', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '13px', 
                  color: 'var(--text-primary)',
                  overflowX: 'auto',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.6
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
