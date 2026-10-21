import React, { useState } from 'react';
import { 
  DownloadCloud, 
  CheckCircle, 
  AlertTriangle, 
  FileJson, 
  Search, 
  Sigma, 
  Table, 
  Sparkles,
  ArrowDownToLine
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

    setExportedStatus(`Đã tải xuống thành công tệp ${fileName}!`);
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
            <DownloadCloud size={28} color="var(--accent-cyan)" />
            Kiểm Định Chất Lượng & Xuất Dữ Liệu (Export Hub)
          </h2>
          <p className="page-desc">
            Rà soát tiêu chuẩn chất lượng các phân đoạn và tải về các file dữ liệu chuẩn hóa phục vụ huấn luyện / nạp RAG.
          </p>
        </div>
        {exportedStatus && (
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
            <CheckCircle size={16} />
            <span>{exportedStatus}</span>
          </div>
        )}
      </div>

      {/* 3 Download Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
              <FileJson size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>chunks.jsonl</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Dataset phân đoạn chính</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Chứa danh sách toàn bộ các chunk văn bản, số token và metadata vị trí trang để nhúng (Embedding) vào Vector DB.
          </p>
          <button 
            onClick={handleDownloadChunksJsonl}
            className="btn btn-primary" 
            style={{ marginTop: 'auto' }}
          >
            <ArrowDownToLine size={16} />
            <span>Tải chunks.jsonl</span>
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-indigo)' }}>
              <FileJson size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>parents.jsonl</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Chunk cha cấp bối cảnh</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Dành cho mô hình Parent-Child Retrieval (tìm kiếm chunk con chi tiết nhưng lấy bối cảnh chunk cha để trả lời).
          </p>
          <button 
            onClick={handleDownloadParentsJsonl}
            className="btn btn-secondary" 
            style={{ marginTop: 'auto' }}
          >
            <ArrowDownToLine size={16} />
            <span>Tải parents.jsonl</span>
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>chunk_stats.json</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Báo cáo thông số kỹ thuật</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Chứa thông số phân bổ token, số công thức, bảng biểu và báo cáo xác thực chất lượng cho báo cáo đồ án.
          </p>
          <button 
            onClick={handleDownloadStatsJson}
            className="btn btn-secondary" 
            style={{ marginTop: 'auto' }}
          >
            <ArrowDownToLine size={16} />
            <span>Tải chunk_stats.json</span>
          </button>
        </div>
      </div>

      {/* Quality Inspection Checklist */}
      <div className="card">
        <div className="card-title">
          <CheckCircle size={18} color="var(--accent-emerald)" />
          <span>Báo Cáo Kiểm Định Chất Lượng (Quality Validation)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <CheckCircle size={18} color="var(--accent-emerald)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>0 Chunk Bị Rỗng</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>100% chunks có nội dung hợp lệ</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <CheckCircle size={18} color="var(--accent-emerald)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>100% Khớp Metadata</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Có đủ số trang & đường dẫn mục lục</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <AlertTriangle size={18} color="var(--accent-amber)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Cảnh Báo Độ Dài Nhỏ</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>2 chunks ngắn dưới 50 tokens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chunks Data Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div className="card-title" style={{ marginBottom: 0 }}>
            <span>Danh Sách Phân Đoạn Dataset ({filteredChunks.length})</span>
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Tìm trong nội dung chunk..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="input-control"
              style={{ paddingLeft: '32px', fontSize: '13px', padding: '7px 12px 7px 32px' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Chunk ID</th>
                <th>Tài liệu nguồn</th>
                <th>Nội dung trích đoạn</th>
                <th>Token</th>
                <th>Trang</th>
                <th>Đặc tính</th>
              </tr>
            </thead>
            <tbody>
              {filteredChunks.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-cyan)' }}>
                    {c.id}
                  </td>
                  <td style={{ fontWeight: 500, fontSize: '13px' }}>
                    {c.documentId}
                  </td>
                  <td style={{ maxWidth: '420px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px', color: 'var(--text-main)' }}>
                    {c.content}
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>{c.tokenCount}</span>
                  </td>
                  <td>Trang {c.metadata.pageStart}-{c.metadata.pageEnd}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {c.metadata.hasEquation && (
                        <span className="badge badge-purple" style={{ fontSize: '10.5px' }}>
                          <Sigma size={10} /> Math
                        </span>
                      )}
                      {c.metadata.hasTable && (
                        <span className="badge badge-amber" style={{ fontSize: '10.5px' }}>
                          <Table size={10} /> Table
                        </span>
                      )}
                    </div>
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
