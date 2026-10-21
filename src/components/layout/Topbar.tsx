import React from 'react';
import type { NavTab } from './Sidebar';
import { 
  FileText,
  Layers,
  UserCheck,
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
        backgroundColor: 'var(--bg-page)',
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
        <span style={{ color: 'var(--border-medium)', fontSize: '12px' }}>/</span>
        <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
          {getTabLabel()}
        </span>
      </div>

      {/* Segmented Persona Switcher (Clean, Minimal, No Glows) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-input)',
          padding: '2px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <button
          onClick={() => onPersonaChange('USER')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 500,
            cursor: 'pointer',
            backgroundColor: personaMode === 'USER' ? 'var(--bg-elevated)' : 'transparent',
            color: personaMode === 'USER' ? 'var(--text-primary)' : 'var(--text-muted)',
            boxShadow: personaMode === 'USER' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <UserCheck size={13} />
          <span>Người Dùng</span>
        </button>

        <button
          onClick={() => onPersonaChange('TECH')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 500,
            cursor: 'pointer',
            backgroundColor: personaMode === 'TECH' ? 'var(--bg-elevated)' : 'transparent',
            color: personaMode === 'TECH' ? 'var(--text-primary)' : 'var(--text-muted)',
            boxShadow: personaMode === 'TECH' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <SlidersHorizontal size={13} />
          <span>Kỹ Thuật Viên</span>
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={13} />
          <span>5,640 Chunks</span>
        </div>

        <a
          href="#docs"
          className="btn btn-secondary"
          style={{ padding: '5px 10px', fontSize: '12px' }}
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
