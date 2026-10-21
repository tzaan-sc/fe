import React from 'react';
import { 
  BookOpen, 
  Files, 
  Layers, 
  Sigma, 
  Table, 
  Image as ImageIcon,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  PieChart
} from 'lucide-react';
import mockData from '../../data/mockData.json';
import type { NavTab } from '../layout/Sidebar';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { analyticsOverview, categoryStats, chunkSizeHistogram, documents } = mockData;

  const kpiItems = [
    {
      title: 'Tổng số tài liệu',
      value: analyticsOverview.totalDocuments.toLocaleString(),
      sub: 'Sách, Bài báo, Slide',
      icon: <BookOpen size={22} />,
      color: 'var(--accent-cyan)'
    },
    {
      title: 'Tổng số trang',
      value: analyticsOverview.totalPages.toLocaleString(),
      sub: 'Đã bóc tách qua MinerU',
      icon: <Files size={22} />,
      color: 'var(--accent-indigo)'
    },
    {
      title: 'Tổng số Chunks',
      value: analyticsOverview.totalChunks.toLocaleString(),
      sub: 'Sẵn sàng nạp Vector DB',
      icon: <Layers size={22} />,
      color: 'var(--accent-emerald)'
    },
    {
      title: 'Công thức toán (Math)',
      value: analyticsOverview.totalMathFormulas.toLocaleString(),
      sub: 'Định dạng LaTeX / KaTeX',
      icon: <Sigma size={22} />,
      color: 'var(--accent-purple)'
    },
    {
      title: 'Bảng biểu trích xuất',
      value: analyticsOverview.totalTables.toLocaleString(),
      sub: 'Giữ nguyên cấu trúc Markdown',
      icon: <Table size={22} />,
      color: 'var(--accent-amber)'
    },
    {
      title: 'Hình ảnh & Sơ đồ',
      value: analyticsOverview.totalImages.toLocaleString(),
      sub: 'Đã lưu trữ trong data/images',
      icon: <ImageIcon size={22} />,
      color: 'var(--accent-rose)'
    }
  ];

  const maxHistogramCount = Math.max(...chunkSizeHistogram.map(b => b.count));

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <BarChart3 size={28} color="var(--accent-cyan)" />
            Tổng Quan Kho Dữ Liệu RAG (Dataset Analytics)
          </h2>
          <p className="page-desc">
            Theo dõi thời gian thực quy mô tài liệu, cấu trúc chunking và chất lượng dữ liệu trích xuất.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('chunking')}
          >
            <Sparkles size={16} />
            <span>Chạy Chunking Mới</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="stats-grid">
        {kpiItems.map((item, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon" style={{ color: item.color, backgroundColor: `${item.color}18` }}>
              {item.icon}
            </div>
            <div className="stat-info">
              <span className="stat-value">{item.value}</span>
              <span className="stat-label">{item.title}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                {item.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
        {/* Category Distribution Card */}
        <div className="card">
          <div className="card-title">
            <PieChart size={18} color="var(--accent-cyan)" />
            <span>Phân Bổ Tài Liệu Theo Thể Loại</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            {categoryStats.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{cat.categoryName}</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    {cat.documentCount} tài liệu ({cat.percentage}%)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${cat.percentage * 2}%`, 
                      background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
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
            <BarChart3 size={18} color="var(--accent-emerald)" />
            <span>Phân Phối Độ Dài Chunk (Token Distribution)</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Tỷ lệ token lý tưởng tập trung ở khoảng 256 - 512 tokens để tối ưu hóa độ chính xác truy xuất ngữ nghĩa.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '170px', paddingBottom: '20px' }}>
            {chunkSizeHistogram.map((bucket, i) => {
              const heightPercent = Math.round((bucket.count / maxHistogramCount) * 100);
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {bucket.count}
                  </span>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${heightPercent}%`, 
                      background: bucket.minTokens === 257 
                        ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)' 
                        : 'linear-gradient(180deg, #06b6d4 0%, #0284c7 100%)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.5s ease',
                      boxShadow: bucket.minTokens === 257 ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                    }} 
                  />
                  <span style={{ fontSize: '10.5px', color: 'var(--text-dim)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {bucket.rangeLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="card-title" style={{ marginBottom: 0 }}>
            <Files size={18} color="var(--accent-indigo)" />
            <span>Tài Liệu Gốc Đang Xử Lý Gần Đây</span>
          </div>
          <button 
            className="btn btn-secondary" 
            style={{ fontSize: '12.5px', padding: '6px 12px' }}
            onClick={() => onNavigate('documents')}
          >
            <span>Xem tất cả 48 file</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tên File</th>
                <th>Thể loại</th>
                <th>Ngôn ngữ</th>
                <th>Số trang</th>
                <th>Dung lượng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 600, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={16} color="var(--accent-cyan)" />
                      <span>{doc.fileName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-cyan">{doc.category}</span>
                  </td>
                  <td>
                    <span className="badge badge-purple">{doc.language}</span>
                  </td>
                  <td>{doc.pageCount} trang</td>
                  <td>{(doc.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</td>
                  <td>
                    <span className="badge badge-emerald">
                      ● {doc.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline-cyan"
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                      onClick={() => onNavigate('documents')}
                    >
                      Đối soát Markdown
                    </button>
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
