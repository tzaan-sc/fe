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
  Sparkles,
  BookOpen
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

  // Academic palette styles for chunk blocks
  const chunkStyles = [
    {
      border: 'var(--accent-indigo)',
      bg: '#fbfcfe',
      badgeClass: 'badge badge-indigo'
    },
    {
      border: 'var(--accent-emerald)',
      bg: '#fafdfb',
      badgeClass: 'badge badge-emerald'
    },
    {
      border: 'var(--accent-amber)',
      bg: '#fffdfa',
      badgeClass: 'badge badge-amber'
    }
  ];

  return (
    <div className="page-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 className="page-title">
            <Scissors size={22} color="var(--accent-indigo)" />
            <span>Trực Quan Hóa Phân Đoạn (Chunk Visualizer)</span>
          </h2>
          <p className="page-desc">
            Phân định rõ ràng từng ranh giới khối dữ liệu, nhấp vào chunk để tra cứu cấu trúc metadata chi tiết.
          </p>
        </div>

        {appliedNotice && (
          <div className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '13px' }}>
            <CheckCircle2 size={15} />
            <span>{appliedNotice}</span>
          </div>
        )}
      </div>

      {/* Top Control Bar (Academic Slate) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        {/* Document Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={16} color="var(--accent-indigo)" />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Tài liệu:</span>
          <select
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
            className="input-control"
            style={{ fontSize: '13px', width: 'auto', padding: '6px 12px', height: '34px', minWidth: '240px' }}
          >
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.fileName}
              </option>
            ))}
          </select>
        </div>

        {/* Strategy Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Chiến lược:</span>
          {[
            { id: 'SEMANTIC', label: 'Gom Ngữ Nghĩa' },
            { id: 'HEADING', label: 'Theo Tiêu Đề' },
            { id: 'FIXED_WINDOW', label: 'Cửa Sổ Cố Định' }
          ].map((st) => {
            const isCurrent = strategy === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setStrategy(st.id as any)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: isCurrent ? '1px solid var(--accent-indigo)' : '1px solid var(--border-medium)',
                  backgroundColor: isCurrent ? 'var(--accent-indigo-subtle)' : '#ffffff',
                  color: isCurrent ? 'var(--accent-indigo-text)' : 'var(--text-secondary)',
                  fontSize: '12.5px',
                  fontWeight: isCurrent ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {st.label}
              </button>
            );
          })}
        </div>

        {/* Max Tokens & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <span>Cỡ:</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-indigo)' }}>{maxTokens} tk</span>
          </div>

          <button
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12.5px', height: '34px' }}
          >
            <Sliders size={14} />
            <span>Tùy chỉnh</span>
          </button>

          <button
            onClick={handleRunChunking}
            disabled={isProcessing}
            className="btn btn-primary"
            style={{ padding: '6px 16px', fontSize: '12.5px', height: '34px' }}
          >
            {isProcessing ? <Sparkles size={14} className="animate-spin" /> : <Scissors size={14} />}
            <span>{isProcessing ? 'Đang chia...' : 'Áp dụng'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible Advanced Settings */}
      {showAdvancedSettings && (
        <div 
          style={{
            padding: '16px 20px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Max Tokens ({maxTokens}):</span>
            <input
              type="range"
              min="128"
              max="1024"
              step="64"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Overlap ({overlapTokens}):</span>
            <input
              type="range"
              min="0"
              max="150"
              step="10"
              value={overlapTokens}
              onChange={(e) => setOverlapTokens(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-primary)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-indigo)' }} />
              <span>Bảo toàn khối Math</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-indigo)' }} />
              <span>Không tách đôi bảng</span>
            </label>
          </div>
        </div>
      )}

      {/* Main Reading Canvas (Academic Paper Style) */}
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '36px 44px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Document Header in Canvas */}
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <span>TÀI LIỆU ĐANG ĐỐI SOÁT</span>
            <span>•</span>
            <span className="badge badge-indigo">{selectedDoc.category}</span>
            <span>•</span>
            <span className="badge badge-emerald">{selectedDoc.pageCount} TRANG</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.02em' }}>
            {selectedDoc.fileName.replace('.pdf', '')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Đã chia nhỏ văn bản qua chiến lược <strong>{strategy}</strong>. Nhấp vào khối bất kỳ để mở bảng phân tích Metadata.
          </p>
        </div>

        {/* Clear, Easy-to-Distinguish Chunk Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                  backgroundColor: isSelected ? 'var(--accent-indigo-subtle)' : style.bg,
                  borderLeft: `5px solid ${style.border}`,
                  borderTop: `1px solid ${isSelected ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                  borderRight: `1px solid ${isSelected ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                  borderBottom: `1px solid ${isSelected ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Chunk Top Info Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={style.badgeClass}>
                      Chunk #{chunk.chunkIndex}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      Trang {chunk.metadata.pageStart}–{chunk.metadata.pageEnd}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      • {chunk.tokenCount} tokens
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {chunk.metadata.hasEquation && (
                      <span className="badge badge-purple">
                        <Sigma size={12} /> Math
                      </span>
                    )}
                    {chunk.metadata.hasTable && (
                      <span className="badge badge-amber">
                        <Table size={12} /> Bảng
                      </span>
                    )}
                    <span style={{ fontSize: '12px', color: isSelected ? 'var(--accent-indigo)' : 'var(--text-muted)', fontWeight: 500, marginLeft: '6px' }}>
                      {isSelected ? 'Đang chọn' : 'Chi tiết →'}
                    </span>
                  </div>
                </div>

                {/* Content Typography */}
                <div 
                  style={{ 
                    fontSize: '14.5px', 
                    color: 'var(--text-primary)', 
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

      {/* Slide-in Metadata Drawer with Academic Contrast */}
      {selectedChunk && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 100
          }}
          onClick={() => setSelectedChunk(null)}
        >
          <div
            style={{
              width: '460px',
              maxWidth: '90%',
              height: '100vh',
              backgroundColor: '#ffffff',
              borderLeft: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-dropdown)',
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
                <Info size={20} color="var(--accent-indigo)" />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Thông Số Chunk #{selectedChunk.chunkIndex}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChunk(null)}
                className="btn btn-ghost"
                style={{ padding: '6px', borderRadius: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Số token</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-indigo)', marginTop: '3px' }}>
                  {selectedChunk.tokenCount} tk
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Vị trí trang</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '3px' }}>
                  {selectedChunk.metadata.pageStart}–{selectedChunk.metadata.pageEnd}
                </div>
              </div>
            </div>

            {/* Hierarchy Path */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Cây mục lục (Section Path)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                {selectedChunk.metadata.sectionPath.map((sec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <ChevronRight size={14} color="var(--accent-indigo)" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Preview */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Nội dung Markdown
              </div>
              <div 
                style={{ 
                  backgroundColor: '#f8fafc', 
                  padding: '14px', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '13px', 
                  color: 'var(--text-primary)', 
                  lineHeight: '1.65', 
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
                style={{ flex: 1, fontSize: '13px' }}
              >
                {copiedId === 'drawer_copy' ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copiedId === 'drawer_copy' ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedChunk, null, 2));
                  setCopiedId('drawer_json');
                  setTimeout(() => setCopiedId(null), 2000);
                }}
                className="btn btn-primary"
                style={{ flex: 1, fontSize: '13px' }}
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
