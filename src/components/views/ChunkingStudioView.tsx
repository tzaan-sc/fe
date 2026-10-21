import React, { useState } from 'react';
import { 
  Scissors, 
  Settings2, 
  Sigma, 
  Table, 
  Info, 
  CheckCircle2, 
  Sliders,
  ChevronRight,
  Eye,
  FileCheck
} from 'lucide-react';
import mockData from '../../data/mockData.json';
import type { Chunk } from '../../types';

export const ChunkingStudioView: React.FC = () => {
  const { documents, sampleChunks } = mockData;
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0].id);
  const [strategy, setStrategy] = useState<'HEADING' | 'SEMANTIC' | 'PARENT_CHILD' | 'FIXED_WINDOW'>('SEMANTIC');
  const [maxTokens, setMaxTokens] = useState<number>(512);
  const [overlapTokens, setOverlapTokens] = useState<number>(50);
  const [keepMath, setKeepMath] = useState<boolean>(true);
  const [keepTables, setKeepTables] = useState<boolean>(true);
  const [selectedChunk, setSelectedChunk] = useState<Chunk>(sampleChunks[0] as Chunk);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const handleRunChunking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAppliedNotice(`Đã chạy thành công thuật toán ${strategy} với maxTokens=${maxTokens}, overlap=${overlapTokens}`);
      setTimeout(() => setAppliedNotice(null), 3500);
    }, 600);
  };

  const chunkColors = [
    { border: 'rgba(6, 182, 212, 0.4)', bg: 'rgba(6, 182, 212, 0.05)', tag: 'var(--accent-cyan)' },
    { border: 'rgba(99, 102, 241, 0.4)', bg: 'rgba(99, 102, 241, 0.05)', tag: 'var(--accent-indigo)' },
    { border: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.05)', tag: 'var(--accent-emerald)' }
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Scissors size={28} color="var(--accent-cyan)" />
            Chunking Studio & Trực Quan Hóa Cắt Phân Đoạn
          </h2>
          <p className="page-desc">
            Thử nghiệm và tinh chỉnh các chiến lược chia chunk, quan sát ranh giới phân đoạn và kiểm tra metadata từng khối.
          </p>
        </div>
        {appliedNotice && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid var(--accent-emerald)',
              color: '#34d399',
              fontSize: '13px'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{appliedNotice}</span>
          </div>
        )}
      </div>

      {/* Main Studio 3-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', gap: '20px', minHeight: '680px' }}>
        {/* Left Column: Parameter Control Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card-title">
            <Settings2 size={18} color="var(--accent-cyan)" />
            <span>Tham Số Chunking</span>
          </div>

          {/* Document select */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Tài liệu áp dụng:
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="input-control"
              style={{ fontSize: '13px' }}
            >
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.fileName}
                </option>
              ))}
            </select>
          </div>

          {/* Strategy selection */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Chiến lược (Chunking Strategy):
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'SEMANTIC', label: 'Semantic Grouping', desc: 'Gom đoạn theo ngữ nghĩa liên kết' },
                { id: 'HEADING', label: 'Heading Hierarchy', desc: 'Tách theo cấp tiêu đề H1, H2, H3' },
                { id: 'PARENT_CHILD', label: 'Parent-Child Chunks', desc: 'Chunk cha bối cảnh + con chi tiết' },
                { id: 'FIXED_WINDOW', label: 'Fixed Window', desc: 'Cắt đều theo số lượng token' }
              ].map((st) => (
                <div
                  key={st.id}
                  onClick={() => setStrategy(st.id as any)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: strategy === st.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    backgroundColor: strategy === st.id ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-input)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: strategy === st.id ? '#38bdf8' : 'var(--text-main)' }}>
                    {st.label}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                    {st.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Max Tokens Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Max Tokens:</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{maxTokens} tokens</span>
            </div>
            <input
              type="range"
              min="128"
              max="1024"
              step="64"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>

          {/* Overlap Tokens Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Overlap Tokens:</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{overlapTokens} tokens</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              step="10"
              value={overlapTokens}
              onChange={(e) => setOverlapTokens(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>

          {/* Preservation Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-main)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={keepMath}
                onChange={(e) => setKeepMath(e.target.checked)}
                style={{ accentColor: 'var(--accent-cyan)' }}
              />
              <span>Giữ nguyên khối công thức Math</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-main)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={keepTables}
                onChange={(e) => setKeepTables(e.target.checked)}
                style={{ accentColor: 'var(--accent-cyan)' }}
              />
              <span>Không chia cắt đôi bảng biểu</span>
            </label>
          </div>

          {/* Action Button */}
          <button
            onClick={handleRunChunking}
            disabled={isProcessing}
            className="btn btn-primary"
            style={{ marginTop: 'auto', width: '100%' }}
          >
            {isProcessing ? <Sliders size={16} /> : <Scissors size={16} />}
            <span>{isProcessing ? 'Đang tính toán...' : '⚡ Chạy Chia Chunk Thử'}</span>
          </button>
        </div>

        {/* Center Column: Interactive Visualizer Canvas */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div className="card-title" style={{ marginBottom: 0 }}>
              <Eye size={18} color="var(--accent-cyan)" />
              <span>Khung Trực Quan Hóa Chunks (Click để kiểm tra)</span>
            </div>
            <span className="badge badge-emerald">
              {sampleChunks.length} Chunks sinh ra
            </span>
          </div>

          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Mỗi khối viền màu đại diện cho 1 Chunk độc lập được phân đoạn bởi thuật toán. Nhấp vào khối bất kỳ để xem bảng kiểm định Metadata bên phải.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
            {sampleChunks.map((chunk, idx) => {
              const colorTheme = chunkColors[idx % chunkColors.length];
              const isSelected = selectedChunk?.id === chunk.id;
              return (
                <div
                  key={chunk.id}
                  onClick={() => setSelectedChunk(chunk as Chunk)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? `2px solid var(--accent-cyan)` : `1px dashed ${colorTheme.border}`,
                    backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.08)' : colorTheme.bg,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Chunk Header Pill */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span 
                        style={{ 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          color: '#fff', 
                          backgroundColor: colorTheme.tag, 
                          padding: '2px 8px', 
                          borderRadius: '4px' 
                        }}
                      >
                        Chunk #{chunk.chunkIndex}
                      </span>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        {chunk.tokenCount} tokens • Trang {chunk.metadata.pageStart}-{chunk.metadata.pageEnd}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      {chunk.metadata.hasEquation && (
                        <span className="badge badge-purple" style={{ fontSize: '10px' }}>
                          <Sigma size={10} /> Math
                        </span>
                      )}
                      {chunk.metadata.hasTable && (
                        <span className="badge badge-amber" style={{ fontSize: '10px' }}>
                          <Table size={10} /> Bảng
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div 
                    style={{ 
                      fontSize: '13.5px', 
                      color: '#e2e8f0', 
                      lineHeight: '1.6', 
                      whiteSpace: 'pre-line',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {chunk.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Metadata Inspector Drawer */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '18px' }}>
          <div className="card-title">
            <Info size={18} color="var(--accent-purple)" />
            <span>Metadata Inspector</span>
          </div>

          {selectedChunk ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, overflowY: 'auto' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Chunk Identifier
                </span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {selectedChunk.id}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Đường dẫn mục lục (Section Path)
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                  {selectedChunk.metadata.sectionPath.map((sec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-main)' }}>
                      <ChevronRight size={12} color="var(--accent-cyan)" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Số Trang:</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                    {selectedChunk.metadata.pageStart} - {selectedChunk.metadata.pageEnd}
                  </div>
                </div>
                <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Số Token:</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-emerald)' }}>
                    {selectedChunk.tokenCount} tk
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Công thức toán:</span>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: selectedChunk.metadata.hasEquation ? 'var(--accent-purple)' : 'var(--text-dim)' }}>
                    {selectedChunk.metadata.hasEquation ? 'Có (LaTeX)' : 'Không'}
                  </div>
                </div>
                <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Bảng biểu:</span>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: selectedChunk.metadata.hasTable ? 'var(--accent-amber)' : 'var(--text-dim)' }}>
                    {selectedChunk.metadata.hasTable ? 'Có (Markdown)' : 'Không'}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', fontSize: '12.5px' }}
                  onClick={() => alert(`Đã sao chép cấu trúc JSON của Chunk #${selectedChunk.chunkIndex}!`)}
                >
                  <FileCheck size={14} />
                  <span>Sao chép JSON Metadata</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-dim)', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>
              Chọn một chunk để xem chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
