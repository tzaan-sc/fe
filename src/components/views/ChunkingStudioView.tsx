import React, { useState } from 'react';
import { 
  Scissors, 
  Sigma, 
  Table, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  FileCheck,
  X,
  Sliders,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import mockData from '../../data/mockData.json';
import type { Chunk } from '../../types';

export const ChunkingStudioView: React.FC = () => {
  const { documents, sampleChunks } = mockData;
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0].id);
  const [strategy, setStrategy] = useState<'SEMANTIC' | 'HEADING' | 'FIXED_WINDOW'>('SEMANTIC');
  const [maxTokens, setMaxTokens] = useState<number>(512);
  const [overlapTokens, setOverlapTokens] = useState<number>(50);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  const [selectedChunk, setSelectedChunk] = useState<Chunk | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleRunChunking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAppliedNotice(`Đã áp dụng ${strategy} (${maxTokens} tokens)`);
      setTimeout(() => setAppliedNotice(null), 3000);
    }, 400);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Subtle, minimalist accents for chunks
  const chunkStyles = [
    { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.03)', badge: 'rgba(6, 182, 212, 0.15)', text: '#38bdf8' },
    { border: '#6366f1', bg: 'rgba(99, 102, 241, 0.03)', badge: 'rgba(99, 102, 241, 0.15)', text: '#818cf8' },
    { border: '#10b981', bg: 'rgba(16, 185, 129, 0.03)', badge: 'rgba(16, 185, 129, 0.15)', text: '#34d399' }
  ];

  return (
    <div className="page-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', gap: '18px' }}>
      {/* Minimal Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Scissors size={22} color="var(--accent-cyan)" />
            <span>Trực Quan Hóa Phân Đoạn (Chunk Visualizer)</span>
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Giao diện đọc tối giản — ranh giới chunk phân biệt nhẹ nhàng, click vào đoạn để tra cứu nhanh metadata.
          </p>
        </div>

        {appliedNotice && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid var(--accent-emerald)',
              color: '#34d399',
              fontSize: '12.5px'
            }}
          >
            <CheckCircle2 size={14} />
            <span>{appliedNotice}</span>
          </div>
        )}
      </div>

      {/* Minimalist Top Control Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        {/* Document Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 500 }}>Tài liệu:</span>
          <select
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
            className="input-control"
            style={{ fontSize: '13px', width: 'auto', padding: '6px 12px', height: '34px' }}
          >
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.fileName}
              </option>
            ))}
          </select>
        </div>

        {/* Minimal Strategy Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 500, marginRight: '4px' }}>Chiến lược:</span>
          {[
            { id: 'SEMANTIC', label: 'Gom Ngữ Nghĩa' },
            { id: 'HEADING', label: 'Theo Tiêu Đề' },
            { id: 'FIXED_WINDOW', label: 'Cửa Sổ Cố Định' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStrategy(st.id as any)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-sm)',
                border: strategy === st.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                backgroundColor: strategy === st.id ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                color: strategy === st.id ? '#38bdf8' : 'var(--text-muted)',
                fontSize: '12.5px',
                fontWeight: strategy === st.id ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Max Tokens & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cỡ chunk:</span>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--accent-cyan)' }}>{maxTokens} tk</span>
          </div>

          <button
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px', height: '34px' }}
            title="Tùy chỉnh chi tiết (Overlap, toán, bảng)"
          >
            <Sliders size={14} />
            <span>Tùy chỉnh</span>
          </button>

          <button
            onClick={handleRunChunking}
            disabled={isProcessing}
            className="btn btn-primary"
            style={{ padding: '6px 14px', fontSize: '12px', height: '34px' }}
          >
            {isProcessing ? <Sparkles size={14} className="animate-spin" /> : <Scissors size={14} />}
            <span>{isProcessing ? 'Đang chia...' : 'Áp dụng'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible Advanced Settings (Minimal & Out of the way) */}
      {showAdvancedSettings && (
        <div 
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Max Tokens ({maxTokens}):</span>
            <input
              type="range"
              min="128"
              max="1024"
              step="64"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Overlap ({overlapTokens}):</span>
            <input
              type="range"
              min="0"
              max="150"
              step="10"
              value={overlapTokens}
              onChange={(e) => setOverlapTokens(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '12.5px', color: 'var(--text-main)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-cyan)' }} />
              <span>Bảo toàn công thức Math</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-cyan)' }} />
              <span>Không tách đôi bảng</span>
            </label>
          </div>
        </div>
      )}

      {/* Main Reading Canvas (Centered, Clean, Minimalist) */}
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '36px 48px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          lineHeight: '1.8'
        }}
      >
        {/* Document Header in Document Viewer */}
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Tài Liệu Đang Xem</span>
            <span>•</span>
            <span>{selectedDoc.category}</span>
            <span>•</span>
            <span>{selectedDoc.pageCount} Trang</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
            {selectedDoc.fileName.replace('.pdf', '')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '4px' }}>
            Kết quả phân đoạn bởi thuật toán <strong>{strategy}</strong>. Nhấp vào bất kỳ đoạn nào để xem chi tiết thông số.
          </p>
        </div>

        {/* Clean Chunks List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sampleChunks.map((chunk, idx) => {
            const style = chunkStyles[idx % chunkStyles.length];
            const isSelected = selectedChunk?.id === chunk.id;

            return (
              <div
                key={chunk.id}
                onClick={() => setSelectedChunk(chunk as Chunk)}
                style={{
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.07)' : style.bg,
                  borderLeft: `4px solid ${isSelected ? 'var(--accent-cyan)' : style.border}`,
                  borderTop: isSelected ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                  borderRight: isSelected ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                  borderBottom: isSelected ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.025)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = style.bg;
                  }
                }}
              >
                {/* Minimal Header Bar of the Chunk */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span 
                      style={{ 
                        fontSize: '11.5px', 
                        fontWeight: 700, 
                        color: style.text, 
                        backgroundColor: style.badge, 
                        padding: '2px 8px', 
                        borderRadius: '4px' 
                      }}
                    >
                      Chunk #{chunk.chunkIndex}
                    </span>
                    <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                      Trang {chunk.metadata.pageStart}–{chunk.metadata.pageEnd}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                      • {chunk.tokenCount} tokens
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {chunk.metadata.hasEquation && (
                      <span className="badge badge-purple" style={{ fontSize: '11px', padding: '2px 7px' }}>
                        <Sigma size={11} /> Math
                      </span>
                    )}
                    {chunk.metadata.hasTable && (
                      <span className="badge badge-amber" style={{ fontSize: '11px', padding: '2px 7px' }}>
                        <Table size={11} /> Bảng
                      </span>
                    )}
                    <span style={{ fontSize: '11.5px', color: 'var(--text-dim)', marginLeft: '4px' }}>
                      {isSelected ? 'Đang chọn' : 'Chi tiết →'}
                    </span>
                  </div>
                </div>

                {/* Content Typography */}
                <div 
                  style={{ 
                    fontSize: '14.5px', 
                    color: '#e2e8f0', 
                    lineHeight: '1.75', 
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

      {/* Slide-in Minimalist Inspector Modal / Drawer */}
      {selectedChunk && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 100
          }}
          onClick={() => setSelectedChunk(null)}
        >
          <div
            style={{
              width: '440px',
              maxWidth: '90%',
              height: '100vh',
              backgroundColor: 'var(--bg-card)',
              borderLeft: '1px solid var(--border-subtle)',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.7)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>
                  Thông Số Chunk #{selectedChunk.chunkIndex}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChunk(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Độ dài token</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '2px' }}>
                  {selectedChunk.tokenCount} tokens
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Vị trí trang</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                  Trang {selectedChunk.metadata.pageStart}–{selectedChunk.metadata.pageEnd}
                </div>
              </div>
            </div>

            {/* Hierarchy Path */}
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Cây mục lục (Section Path)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                {selectedChunk.metadata.sectionPath.map((sec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#e2e8f0' }}>
                    <ChevronRight size={13} color="var(--accent-cyan)" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Preview */}
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Nội dung Markdown
              </div>
              <div 
                style={{ 
                  backgroundColor: 'var(--bg-input)', 
                  padding: '14px', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '13px', 
                  color: '#cbd5e1', 
                  lineHeight: '1.6', 
                  maxHeight: '220px', 
                  overflowY: 'auto',
                  border: '1px solid var(--border-subtle)',
                  whiteSpace: 'pre-line'
                }}
              >
                {selectedChunk.content}
              </div>
            </div>

            {/* Actions */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleCopy('drawer_copy', selectedChunk.content)}
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '12.5px' }}
              >
                {copiedId === 'drawer_copy' ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copiedId === 'drawer_copy' ? 'Đã sao chép' : 'Sao chép văn bản'}</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedChunk, null, 2));
                  setCopiedId('drawer_json');
                  setTimeout(() => setCopiedId(null), 2000);
                }}
                className="btn btn-primary"
                style={{ flex: 1, fontSize: '12.5px' }}
              >
                {copiedId === 'drawer_json' ? <Check size={14} /> : <FileCheck size={14} />}
                <span>{copiedId === 'drawer_json' ? 'Đã chép JSON' : 'Copy JSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
