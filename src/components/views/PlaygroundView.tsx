import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Copy,
  Clock,
  Layers
} from 'lucide-react';
import mockData from '../../data/mockData.json';

export const PlaygroundView: React.FC = () => {
  const { sampleRetrievalTest } = mockData;
  const [queryInput, setQueryInput] = useState<string>(sampleRetrievalTest.query);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [results, setResults] = useState(sampleRetrievalTest.results);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleQueries = [
    "Thuật toán A* là gì và điều kiện tối ưu?",
    "Hàm Heuristic admissible và consistent",
    "So sánh BFS và DFS trong không gian trạng thái",
    "Công thức suy diễn đồ thị tìm kiếm"
  ];

  const handleSearch = () => {
    if (!queryInput.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResults(sampleRetrievalTest.results);
    }, 400);
  };

  const handleCopyChunk = (chunkId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(chunkId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Sparkles size={22} color="var(--accent-indigo)" />
            <span>RAG Playground — Kiểm Thử Truy Xuất (Semantic Retrieval)</span>
          </h2>
          <p className="page-desc">
            Nhập câu hỏi để thử nghiệm độ chính xác của các phân đoạn tri thức đã chia khi được hệ thống RAG tìm kiếm.
          </p>
        </div>
      </div>

      {/* Query Input Section */}
      <div className="card">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--accent-indigo)' }} />
            <input
              type="text"
              placeholder="Nhập câu hỏi kiểm thử (ví dụ: Thuật toán A* hoạt động như thế nào?)..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="input-control"
              style={{ paddingLeft: '44px', height: '48px', fontSize: '14px' }}
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="btn btn-primary"
            style={{ 
              height: '48px', 
              padding: '0 24px', 
              fontSize: '14px'
            }}
          >
            {isSearching ? <Sparkles size={16} className="animate-spin" /> : <Search size={16} />}
            <span>{isSearching ? 'Đang truy xuất...' : 'Truy xuất (Retrieve)'}</span>
          </button>
        </div>

        {/* Suggested Queries Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Gợi ý test nhanh:</span>
          {sampleQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setQueryInput(q);
                handleSearch();
              }}
              style={{
                fontSize: '12.5px',
                padding: '4px 12px',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-indigo)';
                e.currentTarget.style.color = 'var(--accent-indigo)';
                e.currentTarget.style.backgroundColor = 'var(--accent-indigo-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-medium)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* AI Synthesized Answer (Perplexity Vibe) */}
      <div 
        className="card" 
        style={{ 
          backgroundColor: '#ffffff',
          borderLeft: '4px solid var(--accent-indigo)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--accent-indigo-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-indigo)' }}>
            <Bot size={18} />
          </div>
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-primary)' }}>Câu Trả Lời Tổng Hợp Từ Context (RAG Synthesis)</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dựa trên {results.length} chunks trích xuất có điểm tương đồng cao nhất</div>
          </div>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.75', backgroundColor: '#f8fafc', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <p>
            Thuật toán <strong>A* Search</strong> là giải thuật tìm kiếm heuristic tối ưu dựa trên hàm đánh giá <code style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>f(n) = g(n) + h(n)</code>, kết hợp giữa chi phí thực tế từ điểm xuất phát <code style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>g(n)</code> và chi phí ước lượng tới đích <code style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>h(n)</code>.
          </p>
          <p style={{ marginTop: '8px' }}>
            <strong>Điều kiện tối ưu:</strong> Trên đồ thị cây (Tree Search), heuristic <code style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>h(n)</code> phải <em>admissible</em> (không bao giờ ước lượng vượt quá chi phí thực tế). Trên đồ thị tổng quát (Graph Search), heuristic cần thỏa mãn tính <em>consistent</em> (đơn điệu).
          </p>
        </div>
      </div>

      {/* Retrieved Chunks Results Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--accent-indigo)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Top Chunks Được Truy Xuất (Similarity Ranking)
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <Clock size={14} color="var(--accent-emerald)" />
            <span>Thời gian truy xuất: <strong style={{ color: 'var(--text-primary)' }}>{sampleRetrievalTest.executionTimeMs} ms</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {results.map((item, idx) => {
            const isCopied = copiedId === item.chunk.id;
            return (
              <div 
                key={idx}
                className="card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  borderLeft: idx === 0 ? '4px solid var(--accent-emerald)' : '1px solid var(--border-subtle)'
                }}
              >
                {/* Chunk Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={idx === 0 ? 'badge badge-emerald' : 'badge badge-indigo'}>
                      Top #{idx + 1}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <BookOpen size={15} color="var(--accent-indigo)" />
                      <span>{item.documentTitle}</span>
                    </div>
                  </div>

                  {/* Similarity Score Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Khớp:</span>
                      <span className="badge badge-emerald" style={{ fontSize: '12px' }}>
                        {(item.similarityScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section Path Tags */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span>Vị trí:</span>
                  {item.chunk.metadata.sectionPath.map((sec, sIdx) => (
                    <span key={sIdx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {sIdx > 0 && <ArrowRight size={10} color="var(--text-muted)" />}
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{sec}</span>
                    </span>
                  ))}
                  <span style={{ marginLeft: '8px', color: 'var(--accent-indigo)', fontWeight: 500 }}>
                    • Trang {item.chunk.metadata.pageStart}-{item.chunk.metadata.pageEnd}
                  </span>
                </div>

                {/* Content snippet */}
                <div 
                  style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-primary)', 
                    lineHeight: '1.7', 
                    backgroundColor: '#f8fafc',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {item.chunk.content}
                </div>

                {/* Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    onClick={() => handleCopyChunk(item.chunk.id, item.chunk.content)}
                    className="btn btn-secondary"
                    style={{ fontSize: '12px', padding: '5px 12px' }}
                  >
                    {isCopied ? <CheckCircle2 size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                    <span>{isCopied ? 'Đã sao chép' : 'Sao chép đoạn'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
