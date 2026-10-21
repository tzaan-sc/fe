import React, { useState } from 'react';
import { 
  FileJson, 
  Search, 
  ArrowDownToLine,
  Check,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import mockData from '../../data/mockData.json';

export const ExportView: React.FC = () => {
  const { sampleChunks, analyticsOverview } = mockData;
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  const filteredChunks = sampleChunks.filter(c => 
    c.content.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const triggerDownload = (fileName: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportedStatus(`Đã xuất tệp ${fileName}`);
    setTimeout(() => setExportedStatus(null), 3000);
  };

  const handleDownloadChunksJsonl = () => {
    const jsonlContent = sampleChunks.map(c => JSON.stringify(c)).join('\n');
    triggerDownload('chunks.jsonl', jsonlContent, 'application/jsonlines');
  };

  const handleDownloadParentsJsonl = () => {
    const parents = [
      {
        id: "p_chk_001",
        documentId: "doc_001",
        sectionTitle: "3.2 Heuristic Search Strategies",
        content: "Nội dung bao quát toàn bộ mục 3.2 chứa các chunk con 12, 13",
        childChunkIds: ["chk_1001", "chk_1002"]
      }
    ];
    const jsonlContent = parents.map(p => JSON.stringify(p)).join('\n');
    triggerDownload('parents.jsonl', jsonlContent, 'application/jsonlines');
  };

  const handleDownloadStatsJson = () => {
    const stats = {
      generatedAt: new Date().toISOString(),
      datasetOverview: analyticsOverview,
      distribution: mockData.chunkSizeHistogram,
      validation: {
        totalChunksTested: sampleChunks.length,
        emptyChunks: 0,
        averageTokens: 156,
        status: "PASS_ALL_CRITICAL_CHECKS"
      }
    };
    triggerDownload('chunk_stats.json', JSON.stringify(stats, null, 2), 'application/json');
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            Kiểm Định & Xuất Dữ Liệu
          </h2>
          <p className="page-desc">
            Tải về các tệp dữ liệu phân đoạn chuẩn hóa phục vụ huấn luyện mô hình hoặc nạp Vector Database.
          </p>
        </div>
        {exportedStatus && (
          <div className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '13px' }}>
            <Check size={14} />
            <span>{exportedStatus}</span>
          </div>
        )}
      </div>

      {/* 3 Download Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--accent-indigo-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileJson size={18} color="var(--accent-indigo)" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>chunks.jsonl</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dataset phân đoạn chính</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Chứa danh sách toàn bộ các chunk văn bản, số token và metadata vị trí trang để nhúng vào Vector DB.
          </p>
          <button 
            onClick={handleDownloadChunksJsonl}
            className="btn btn-primary" 
            style={{ marginTop: 'auto' }}
          >
            <ArrowDownToLine size={14} />
            <span>Tải chunks.jsonl</span>
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--accent-emerald-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} color="var(--accent-emerald)" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>parents.jsonl</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Chunk cha cấp bối cảnh</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Dành cho mô hình Parent-Child Retrieval (tìm kiếm chunk con chi tiết nhưng lấy bối cảnh chunk cha để trả lời).
          </p>
          <button 
            onClick={handleDownloadParentsJsonl}
            className="btn btn-secondary" 
            style={{ marginTop: 'auto' }}
          >
            <ArrowDownToLine size={14} />
            <span>Tải parents.jsonl</span>
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--accent-amber-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileJson size={18} color="var(--accent-amber)" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>chunk_stats.json</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Báo cáo thông số kỹ thuật</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Chứa thông số phân bổ token, số công thức, bảng biểu và báo cáo xác thực chất lượng cho báo cáo đồ án.
          </p>
          <button 
            onClick={handleDownloadStatsJson}
            className="btn btn-secondary" 
            style={{ marginTop: 'auto' }}
          >
            <ArrowDownToLine size={14} />
            <span>Tải chunk_stats.json</span>
          </button>
        </div>
      </div>

      {/* Quality Validation Summary */}
      <div className="card">
        <div className="card-title">
          Báo Cáo Kiểm Tra Tiêu Chuẩn Dataset
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px 16px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" />
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>0 Chunk Rỗng</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>100% chunks có dữ liệu hợp lệ</div>
          </div>

          <div style={{ padding: '14px 16px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" />
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>100% Metadata Vị Trí</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Có đủ số trang và đường dẫn mục lục</div>
          </div>

          <div style={{ padding: '14px 16px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--accent-indigo)" />
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>Độ Dài Trung Bình</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>156 tokens / chunk chuẩn hóa</div>
          </div>
        </div>
      </div>

      {/* Chunks Table */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div className="card-title" style={{ marginBottom: 0 }}>
            Danh Sách Phân Đoạn ({filteredChunks.length})
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Tìm theo nội dung..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="input-control"
              style={{ paddingLeft: '32px', fontSize: '13px', height: '34px' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã Chunk</th>
                <th>Tài liệu nguồn</th>
                <th>Nội dung</th>
                <th>Số token</th>
                <th>Vị trí trang</th>
              </tr>
            </thead>
            <tbody>
              {filteredChunks.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-indigo-text)', fontWeight: 600 }}>
                    {c.id}
                  </td>
                  <td style={{ fontSize: '13px', fontWeight: 500 }}>
                    {c.documentId}
                  </td>
                  <td style={{ maxWidth: '440px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px' }}>
                    {c.content}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span className="badge badge-indigo">{c.tokenCount} tk</span>
                  </td>
                  <td style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    Trang {c.metadata.pageStart}–{c.metadata.pageEnd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
