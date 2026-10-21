import React from 'react';
import { 
  MessageSquare,
  BookOpen,
  GraduationCap,
  LayoutDashboard, 
  FolderKanban, 
  Scissors, 
  DownloadCloud, 
  ChevronLeft,
  ChevronRight,
  Database
} from 'lucide-react';
import type { AppPersonaMode } from '../../types';

export type NavTab = 
  | 'user-chat' 
  | 'user-topics' 
  | 'user-quiz' 
  | 'dashboard' 
  | 'documents' 
  | 'chunking' 
  | 'export'
  | 'playground';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  personaMode: AppPersonaMode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  personaMode
}) => {
  const userNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'user-chat', label: 'Tra cứu & Hỏi đáp', icon: <MessageSquare size={17} /> },
    { id: 'user-topics', label: 'Chuyên đề học tập', icon: <BookOpen size={17} /> },
    { id: 'user-quiz', label: 'Ôn tập trắc nghiệm', icon: <GraduationCap size={17} /> }
  ];

  const techNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Tổng quan kho dữ liệu', icon: <LayoutDashboard size={17} /> },
    { id: 'documents', label: 'Tài liệu & MinerU', icon: <FolderKanban size={17} /> },
    { id: 'chunking', label: 'Trực quan hóa Chunking', icon: <Scissors size={17} /> },
    { id: 'export', label: 'Kiểm định & Xuất file', icon: <DownloadCloud size={17} /> }
  ];

  const currentNavItems = personaMode === 'USER' ? userNavItems : techNavItems;

  return (
    <aside 
      style={{
        width: collapsed ? '68px' : '240px',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 50,
        flexShrink: 0
      }}
    >
      {/* Brand Header */}
      <div 
        style={{
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div 
          style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            flexShrink: 0
          }}
        >
          <Database size={15} />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>
              RAG Platform
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Trí tuệ nhân tạo
            </span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '14px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', padding: '0 8px 6px' }}>
          {!collapsed && (personaMode === 'USER' ? 'HỌC TẬP' : 'QUẢN TRỊ')}
        </div>

        {currentNavItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                width: '100%',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive ? 'var(--bg-surface-hover)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: isActive ? 500 : 400,
                textAlign: 'left',
                transition: 'all 0.1s ease',
                fontFamily: 'var(--font-sans)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <div style={{ color: isActive ? 'var(--text-primary)' : 'inherit', flexShrink: 0 }}>
                {item.icon}
              </div>
              {!collapsed && (
                <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Toggle Collapse Button */}
      <div 
        style={{
          padding: '12px 14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end'
        }}
      >
        <button
          onClick={onToggleCollapse}
          className="btn btn-ghost"
          style={{ padding: '6px', borderRadius: '4px', width: '28px', height: '28px' }}
          title={collapsed ? 'Mở rộng' : 'Thu gọn'}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>
    </aside>
  );
};
