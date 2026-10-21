import React from 'react';
import type { NavTab } from './Sidebar';
import { 
  FileText,
  GraduationCap,
  SlidersHorizontal
} from 'lucide-react';
import type { AppPersonaMode } from '../../types';

interface TopbarProps {
  activeTab: NavTab;
  personaMode: AppPersonaMode;
  onPersonaChange: (mode: AppPersonaMode) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  activeTab, 
  personaMode, 
  onPersonaChange 
}) => {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'user-chat':
        return 'Tra cứu tri thức AI';
      case 'user-topics':
        return 'Chuyên đề học tập';
      case 'user-quiz':
        return 'Tự ôn tập trắc nghiệm';
      case 'dashboard':
        return 'Thống kê tổng quan';
      case 'documents':
        return 'Kho tài liệu & MinerU';
      case 'chunking':
        return 'Trực quan hóa Chunking';
      case 'export':
        return 'Kiểm định & Xuất dữ liệu';
      default:
        return 'RAG Platform';
    }
  };

  return (
    <header 
      style={{
        height: '56px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}
    >
      {/* Path / Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {personaMode === 'USER' ? 'Cổng Tra Cứu' : 'Quản Trị Dữ Liệu'}
        </span>
        <span style={{ color: 'var(--border-medium)', fontSize: '13px' }}>/</span>
        <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
          {getTabLabel()}
        </span>
      </div>

      {/* Segmented Persona Switcher (Academic Slate Style) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f1f5f9',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <button
          onClick={() => onPersonaChange('USER')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '6px',
            border: personaMode === 'USER' ? '1px solid var(--border-medium)' : '1px solid transparent',
            fontSize: '13px',
            fontWeight: personaMode === 'USER' ? 600 : 500,
            cursor: 'pointer',
            backgroundColor: personaMode === 'USER' ? '#ffffff' : 'transparent',
            color: personaMode === 'USER' ? '#4f46e5' : 'var(--text-muted)',
            boxShadow: personaMode === 'USER' ? '0 1px 2px rgba(15, 23, 42, 0.06)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <GraduationCap size={15} color={personaMode === 'USER' ? '#4f46e5' : 'inherit'} />
          <span>Người Dùng</span>
        </button>

        <button
          onClick={() => onPersonaChange('TECH')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '6px',
            border: personaMode === 'TECH' ? '1px solid var(--border-medium)' : '1px solid transparent',
            fontSize: '13px',
            fontWeight: personaMode === 'TECH' ? 600 : 500,
            cursor: 'pointer',
            backgroundColor: personaMode === 'TECH' ? '#ffffff' : 'transparent',
            color: personaMode === 'TECH' ? '#0f172a' : 'var(--text-muted)',
            boxShadow: personaMode === 'TECH' ? '0 1px 2px rgba(15, 23, 42, 0.06)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <SlidersHorizontal size={14} color={personaMode === 'TECH' ? '#0f172a' : 'inherit'} />
          <span>Kỹ Thuật Viên</span>
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div className="badge badge-emerald" style={{ padding: '4px 10px', fontSize: '12.5px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)', display: 'inline-block' }} />
          <span><strong>5,640</strong> Chunks Đã Nạp</span>
        </div>

        <a
          href="#docs"
          className="btn btn-secondary"
          style={{ padding: '5px 12px', fontSize: '12.5px' }}
          onClick={(e) => {
            e.preventDefault();
            alert('Tài liệu kỹ thuật lưu tại thư mục docs/: PAGES_SPEC.md, API_Contract.md, DATA_MODELS.md');
          }}
        >
          <FileText size={13} />
          <span>Tài liệu</span>
        </a>
      </div>
    </header>
  );
};
