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
  Library
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
        width: collapsed ? '68px' : '248px',
        backgroundColor: '#ffffff',
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
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div 
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 5px rgba(79, 70, 229, 0.25)',
            flexShrink: 0
          }}
        >
          <Library size={17} />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>
              RAG Academic
            </span>
            <span style={{ fontSize: '11px', color: 'var(--accent-indigo)', fontWeight: 500 }}>
              {personaMode === 'USER' ? 'Cổng Học Tập AI' : 'Xưởng Kỹ Thuật RAG'}
            </span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', padding: '0 8px 6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {!collapsed && (personaMode === 'USER' ? 'MỤC LỤC TRA CỨU' : 'QUẢN TRỊ DỮ LIỆU')}
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
                gap: '12px',
                padding: '9px 12px',
                width: '100%',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--accent-indigo-subtle)' : 'transparent',
                color: isActive ? 'var(--accent-indigo-text)' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-indigo-border)' : 'transparent',
                cursor: 'pointer',
                fontSize: '13.5px',
                fontWeight: isActive ? 600 : 500,
                textAlign: 'left',
                transition: 'all 0.15s ease',
                fontFamily: 'var(--font-sans)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <div style={{ color: isActive ? '#4f46e5' : 'var(--text-muted)', flexShrink: 0 }}>
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
          padding: '12px 16px',
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
