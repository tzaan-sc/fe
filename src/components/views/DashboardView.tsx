import React from 'react';
import { 
  ArrowUpRight
} from 'lucide-react';
import mockData from '../../data/mockData.json';
import type { NavTab } from '../layout/Sidebar';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { analyticsOverview, categoryStats, chunkSizeHistogram, documents } = mockData;

  const kpiItems = [
    { title: 'Tài liệu đã nhập', value: analyticsOverview.totalDocuments.toLocaleString(), sub: 'Sách, giáo trình, bài báo' },
    { title: 'Trang đã bóc tách', value: analyticsOverview.totalPages.toLocaleString(), sub: 'Xử lý qua MinerU' },
    { title: 'Tổng phân đoạn (Chunks)', value: analyticsOverview.totalChunks.toLocaleString(), sub: 'Chỉ mục vector RAG' },
    { title: 'Khối công thức toán', value: analyticsOverview.totalMathFormulas.toLocaleString(), sub: 'Nhận diện LaTeX' },
    { title: 'Bảng biểu trích xuất', value: analyticsOverview.totalTables.toLocaleString(), sub: 'Định dạng Markdown' },
    { title: 'Hình ảnh & sơ đồ', value: analyticsOverview.totalImages.toLocaleString(), sub: 'Lưu trữ tệp' }
  ];

  const maxHistogramCount = Math.max(...chunkSizeHistogram.map(b => b.count));

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            Thống Kê Kho Dữ Liệu RAG
          </h2>
          <p className="page-desc">
            Theo dõi tiến trình xử lý, phân bổ tài liệu và chỉ số phân đoạn tri thức.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => onNavigate('chunking')}
        >
          <span>Mở Chunking Studio</span>
        </button>
      </div>

      {/* KPI Cards Grid (Academic Slate) */}
      <div className="stats-grid">
        {kpiItems.map((item, idx) => (
          <div key={idx} className="stat-card">
            <span className="stat-label">{item.title}</span>
            <span className="stat-value">{item.value}</span>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              {item.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {/* Category Distribution Card */}
        <div className="card">
          <div className="card-title">
            Phân Bổ Thể Loại Tài Liệu
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
            {categoryStats.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{cat.categoryName}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {cat.documentCount} tệp ({cat.percentage}%)
                  </span>
                </div>
                <div style={{ height: '7px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${cat.percentage * 2}%`, 
                      backgroundColor: i === 0 ? 'var(--accent-indigo)' : i === 1 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                      borderRadius: '4px' 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chunk Size Histogram Card */}
        <div className="card">
          <div className="card-title">
            Phân Phối Độ Dài Chunk (Token)
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px', paddingBottom: '16px', paddingTop: '10px' }}>
            {chunkSizeHistogram.map((bucket, i) => {
              const heightPercent = Math.round((bucket.count / maxHistogramCount) * 100);
              const isPeak = bucket.minTokens === 257;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: isPeak ? 'var(--accent-indigo)' : 'var(--text-muted)', fontWeight: isPeak ? 700 : 500 }}>
                    {bucket.count}
                  </span>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${heightPercent}%`, 
                      backgroundColor: isPeak ? 'var(--accent-indigo)' : '#cbd5e1',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.2s ease'
                    }} 
                  />
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {bucket.rangeLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div className="card-title" style={{ marginBottom: 0 }}>
            Tài Liệu Đang Xử Lý Gần Đây
          </div>
          <button 
            className="btn btn-ghost" 
            style={{ fontSize: '12px', padding: '4px 8px' }}
            onClick={() => onNavigate('documents')}
          >
            <span>Xem tất cả</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tên tệp</th>
                <th>Mã thể loại</th>
                <th>Ngôn ngữ</th>
                <th>Số trang</th>
                <th>Dung lượng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {doc.fileName}
                  </td>
                  <td>
                    <span className="badge badge-indigo">{doc.category}</span>
                  </td>
                  <td>
                    <span className="badge badge-blue">{doc.language}</span>
                  </td>
                  <td>{doc.pageCount} trang</td>
                  <td>{(doc.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</td>
                  <td>
                    <span className="badge badge-emerald">
                      {doc.status}
                    </span>
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
