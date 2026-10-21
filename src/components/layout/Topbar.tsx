import React from 'react';
import type { NavTab } from './Sidebar';
import { 
  FileCode2,
  FolderGit2,
  UserCheck,
  Wrench
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
  const getTabBreadcrumb = () => {
    switch (activeTab) {
      case 'user-chat':
        return 'Người Dùng Thử / Trợ Lý AI Chat & Dẫn Chứng';
      case 'user-topics':
        return 'Người Dùng Thử / Khám Phá Chuyên Đề Môn AI';
      case 'user-quiz':
        return 'Người Dùng Thử / Tự Ôn Tập Trắc Nghiệm';
      case 'dashboard':
        return 'Kỹ Thuật Viên / Dashboard Thống Kê Tổng Quan';
      case 'documents':
        return 'Kỹ Thuật Viên / Kho Tài Liệu & MinerU';
      case 'chunking':
        return 'Kỹ Thuật Viên / Chunking Studio';
      case 'export':
        return 'Kỹ Thuật Viên / Kiểm Định & Xuất JSONL';
      default:
        return 'RAG Dataset Builder';
    }
  };

  return (
    <header 
      style={{
        height: '64px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}
    >
      {/* Breadcrumb / Path */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FolderGit2 size={18} color="var(--accent-cyan)" />
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          RAG-Studio
        </span>
        <span style={{ color: 'var(--border-subtle)' }}>/</span>
        <span style={{ fontSize: '13.5px', color: '#fff', fontWeight: 600 }}>
          {getTabBreadcrumb()}
        </span>
      </div>

      {/* Center Persona Switcher (CRITICAL FEATURE) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-input)',
          padding: '3px',
          borderRadius: '9999px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)'
        }}
      >
        <button
          onClick={() => onPersonaChange('USER')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: personaMode === 'USER' ? 'var(--accent-cyan)' : 'transparent',
            color: personaMode === 'USER' ? '#000' : 'var(--text-muted)',
            boxShadow: personaMode === 'USER' ? '0 2px 8px rgba(6, 182, 212, 0.4)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <UserCheck size={14} />
          <span>Người Dùng Thử</span>
        </button>

        <button
          onClick={() => onPersonaChange('TECH')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: personaMode === 'TECH' ? 'var(--accent-indigo)' : 'transparent',
            color: personaMode === 'TECH' ? '#fff' : 'var(--text-muted)',
            boxShadow: personaMode === 'TECH' ? '0 2px 8px rgba(99, 102, 241, 0.4)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Wrench size={14} />
          <span>Kỹ Thuật Viên</span>
        </button>
      </div>

      {/* Status & Docs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '11.5px',
            color: 'var(--accent-emerald)',
            fontWeight: 500
          }}
        >
          <span 
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-emerald)',
              boxShadow: '0 0 6px var(--accent-emerald)'
            }} 
          />
          <span>Mock Data: 5,640 Chunks</span>
        </div>

        <a
          href="#docs"
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '12px' }}
          onClick={(e) => {
            e.preventDefault();
            alert('Tài liệu đã được cập nhật trong thư mục docs/: PAGES_SPEC.md, API_Contract.md, DATA_MODELS.md');
          }}
        >
          <FileCode2 size={14} />
          <span>Docs</span>
        </a>
      </div>
    </header>
  );
};
