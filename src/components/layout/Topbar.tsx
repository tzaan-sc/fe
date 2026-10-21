import React from 'react';
import type { NavTab } from './Sidebar';
import { 
  Sparkles, 
  HelpCircle, 
  FileCode2,
  FolderGit2
} from 'lucide-react';

interface TopbarProps {
  activeTab: NavTab;
  onOpenPlayground: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ activeTab, onOpenPlayground }) => {
  const getTabBreadcrumb = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard / Thống Kê Tổng Quan';
      case 'documents':
        return 'Quản Lý Tài Liệu / Kho Giáo Trình & Bài Báo';
      case 'chunking':
        return 'Chunking Studio / Cấu Hình & Trực Quan Hóa';
      case 'export':
        return 'Kiểm Định & Xuất Dữ Liệu / Datasets JSONL';
      case 'playground':
        return 'RAG Playground / Kiểm Thử Semantic Retrieval';
    }
  };

  return (
    <header 
      style={{
        height: '64px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 36px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}
    >
      {/* Breadcrumb / Path */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FolderGit2 size={18} color="var(--accent-cyan)" />
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          RAG-Dataset-Builder
        </span>
        <span style={{ color: 'var(--border-subtle)' }}>/</span>
        <span style={{ fontSize: '13.5px', color: '#fff', fontWeight: 600 }}>
          {getTabBreadcrumb()}
        </span>
      </div>

      {/* Action Badges & Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Mock Mode Pill */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: '12px',
            color: 'var(--accent-emerald)',
            fontWeight: 500
          }}
          title="Giao diện đang hoạt động với MOCK_DATA.json độc lập không phụ thuộc backend"
        >
          <span 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-emerald)',
              boxShadow: '0 0 8px var(--accent-emerald)'
            }} 
          />
          <span>Dữ liệu: Mock Data Mode</span>
        </div>

        {/* Quick Playground Button */}
        {activeTab !== 'playground' && (
          <button
            onClick={onOpenPlayground}
            className="btn btn-outline-cyan"
            style={{ padding: '7px 14px', fontSize: '12.5px' }}
          >
            <Sparkles size={15} />
            <span>Thử nghiệm Retrieval</span>
          </button>
        )}

        {/* Code Specs Link */}
        <a
          href="#specs"
          className="btn btn-secondary"
          style={{ padding: '7px 12px', fontSize: '12.5px' }}
          onClick={(e) => {
            e.preventDefault();
            alert('Toàn bộ đặc tả API & Schema đã sẵn sàng trong các file PAGES_SPEC.md và API_Contract.md!');
          }}
        >
          <FileCode2 size={15} />
          <span>API Specs</span>
        </a>

        {/* Info / Help */}
        <button
          className="btn btn-secondary"
          style={{ padding: '8px', borderRadius: '50%', width: '34px', height: '34px' }}
          title="Trợ giúp & Hướng dẫn"
          onClick={() => alert('Dự án RAG Dataset Builder Studio - Xây dựng kho tri thức chuẩn hóa cho hệ thống AI.')}
        >
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
};
