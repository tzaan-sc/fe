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
            <Sparkles size={28} color="var(--accent-purple)" />
            RAG Playground — Kiểm Thử Truy Xuất (Semantic Retrieval)
          </h2>
          <p className="page-desc">
            Nhập câu hỏi để thử nghiệm độ chính xác của các phân đoạn tri thức đã chia khi được hệ thống RAG tìm kiếm.
          </p>
        </div>
      </div>

      {/* Query Input Section */}
      <div className="card" style={{ border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 0 25px rgba(168, 85, 247, 0.08)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--accent-purple)' }} />
            <input
              type="text"
              placeholder="Nhập câu hỏi kiểm thử (ví dụ: Thuật toán A* hoạt động như thế nào?)..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="input-control"
              style={{ paddingLeft: '44px', height: '48px', fontSize: '15px', borderColor: 'rgba(168, 85, 247, 0.3)' }}
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="btn btn-primary"
            style={{ 
              height: '48px', 
              padding: '0 24px', 
              fontSize: '14px',
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
              boxShadow: '0 2px 12px rgba(168, 85, 247, 0.4)'
            }}
          >
            {isSearching ? <Sparkles size={18} className="animate-spin" /> : <Search size={18} />}
            <span>{isSearching ? 'Đang truy xuất...' : 'Truy Xuất (Retrieve)'}</span>
          </button>
        </div>

        {/* Suggested Queries Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>Gợi ý test nhanh:</span>
          {sampleQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setQueryInput(q);
                handleSearch();
              }}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* AI Synthesized Answer (Optional RAG Preview) */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(145deg, rgba(19, 29, 51, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
            <Bot size={18} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Câu Trả Lời Tổng Hợp Từ Context (RAG Synthesis)</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Dựa trên {results.length} chunks trích xuất có điểm tương đồng cao nhất</div>
          </div>
        </div>

        <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', backgroundColor: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <p>
            Thuật toán <strong>A* Search</strong> là giải thuật tìm kiếm heuristic tốt nhất dựa trên hàm đánh giá <code style={{ color: '#38bdf8' }}>f(n) = g(n) + h(n)</code>, kết hợp giữa chi phí thực tế từ điểm xuất phát <code style={{ color: '#38bdf8' }}>g(n)</code> và chi phí ước lượng tới đích <code style={{ color: '#38bdf8' }}>h(n)</code>.
          </p>
          <p style={{ marginTop: '8px' }}>
            <strong>Điều kiện tối ưu:</strong> Trên đồ thị cây (Tree Search), heuristic <code style={{ color: '#38bdf8' }}>h(n)</code> phải <em>admissible</em> (không bao giờ ước lượng vượt quá chi phí thực tế). Trên đồ thị tổng quát (Graph Search), heuristic cần thỏa mãn tính <em>consistent</em> (đơn điệu).
          </p>
        </div>
      </div>

      {/* Retrieved Chunks Results Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
              Top Chunks Được Truy Xuất (Similarity Ranking)
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <Clock size={14} color="var(--accent-emerald)" />
            <span>Thời gian truy xuất: <strong style={{ color: '#fff' }}>{sampleRetrievalTest.executionTimeMs} ms</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {results.map((item, idx) => {
            const scorePercent = Math.round(item.similarityScore * 100);
            const isCopied = copiedId === item.chunk.id;
            return (
              <div 
                key={idx}
                className="card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  border: idx === 0 ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)'
                }}
              >
                {/* Chunk Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span 
                      style={{ 
                        fontSize: '12px', 
                        fontWeight: 700, 
                        color: idx === 0 ? '#000' : '#fff', 
                        backgroundColor: idx === 0 ? 'var(--accent-cyan)' : 'var(--bg-input)',
                        padding: '3px 10px', 
                        borderRadius: '4px',
                        border: idx === 0 ? 'none' : '1px solid var(--border-subtle)'
                      }}
                    >
                      Top #{idx + 1}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>
                      <BookOpen size={15} color="var(--accent-cyan)" />
                      <span>{item.documentTitle}</span>
                    </div>
                  </div>

                  {/* Similarity Score Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Độ tương đồng:</span>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: scorePercent >= 90 ? 'var(--accent-emerald)' : 'var(--accent-cyan)' }}>
                        {item.similarityScore.toFixed(3)} ({scorePercent}%)
                      </span>
                    </div>
                    <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${scorePercent}%`, 
                          height: '100%', 
                          background: scorePercent >= 90 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'linear-gradient(90deg, #06b6d4, #3b82f6)'
                        }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Section Path Tags */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  <span>Vị trí:</span>
                  {item.chunk.metadata.sectionPath.map((sec, sIdx) => (
                    <span key={sIdx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {sIdx > 0 && <ArrowRight size={10} color="var(--text-dim)" />}
                      <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{sec}</span>
                    </span>
                  ))}
                  <span style={{ marginLeft: '8px', color: 'var(--accent-cyan)' }}>
                    • Trang {item.chunk.metadata.pageStart}-{item.chunk.metadata.pageEnd}
                  </span>
                </div>

                {/* Content snippet */}
                <div 
                  style={{ 
                    fontSize: '13.5px', 
                    color: '#e2e8f0', 
                    lineHeight: '1.6', 
                    backgroundColor: 'var(--bg-input)',
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
                    style={{ fontSize: '11.5px', padding: '5px 10px' }}
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
