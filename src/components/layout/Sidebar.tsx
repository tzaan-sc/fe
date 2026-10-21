import React from 'react';
import { 
  MessageSquare,
  BookOpen,
  GraduationCap,
  LayoutDashboard, 
  FolderKanban, 
  Scissors, 
  DownloadCloud, 
  Database,
  ChevronLeft,
  ChevronRight,
  Bot
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
  const userNavItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'user-chat', label: 'Trợ Lý AI Chat', icon: <MessageSquare size={20} />, badge: 'RAG' },
    { id: 'user-topics', label: 'Chuyên Đề Môn AI', icon: <BookOpen size={20} />, badge: '4 Topic' },
    { id: 'user-quiz', label: 'Ôn Tập Trắc Nghiệm', icon: <GraduationCap size={20} />, badge: 'Quiz' }
  ];

  const techNavItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Thống Kê', icon: <LayoutDashboard size={20} /> },
    { id: 'documents', label: 'Kho Tài Liệu & MinerU', icon: <FolderKanban size={20} />, badge: '48' },
    { id: 'chunking', label: 'Chunking Studio', icon: <Scissors size={20} /> },
    { id: 'export', label: 'Kiểm Định & Xuất', icon: <DownloadCloud size={20} /> }
  ];

  const currentNavItems = personaMode === 'USER' ? userNavItems : techNavItems;

  return (
    <aside 
      style={{
        width: collapsed ? '80px' : '260px',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
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
          padding: '24px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: personaMode === 'USER' 
              ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
              : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
            boxShadow: personaMode === 'USER' ? '0 0 16px rgba(6, 182, 212, 0.4)' : '0 0 16px rgba(99, 102, 241, 0.4)'
          }}
        >
          {personaMode === 'USER' ? <Bot size={22} /> : <Database size={22} />}
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              {personaMode === 'USER' ? 'AI Knowledge' : 'RAG Studio'}
            </h1>
            <span style={{ fontSize: '11px', color: personaMode === 'USER' ? 'var(--accent-cyan)' : 'var(--accent-indigo)', fontWeight: 600, letterSpacing: '0.04em' }}>
              {personaMode === 'USER' ? 'HỌC VIÊN DÙNG THỬ' : 'KỸ THUẬT VIÊN DATA'}
            </span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', padding: '0 8px 6px', letterSpacing: '0.05em' }}>
          {!collapsed && (personaMode === 'USER' ? 'Menu Người Dùng' : 'Menu Quản Trị')}
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
                gap: '14px',
                padding: '12px 14px',
                width: '100%',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                color: isActive ? '#38bdf8' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                fontSize: '13.5px',
                fontWeight: isActive ? 600 : 500,
                textAlign: 'left',
                transition: 'all 0.15s ease',
                position: 'relative',
                fontFamily: 'var(--font-sans)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <div style={{ color: isActive ? 'var(--accent-cyan)' : 'inherit', flexShrink: 0 }}>
                {item.icon}
              </div>
              {!collapsed && (
                <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span 
                  className={item.badge === 'RAG' ? 'badge badge-emerald' : 'badge badge-cyan'}
                  style={{ fontSize: '10.5px', padding: '2px 7px' }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Persona Mode Switch Helper */}
      {!collapsed && (
        <div 
          style={{
            margin: '16px 14px',
            padding: '12px',
            backgroundColor: 'rgba(11, 19, 36, 0.7)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            fontSize: '12px'
          }}
        >
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
            {personaMode === 'USER' ? '💡 Chế độ Học viên' : '⚙️ Chế độ Kỹ thuật'}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.4' }}>
            {personaMode === 'USER' 
              ? 'Hỏi đáp AI với dẫn chứng trang sách kinh điển môn AI.' 
              : 'Kiểm soát pipeline MinerU, thuật toán chunking & export.'}
          </div>
        </div>
      )}

      {/* Toggle Collapse Button */}
      <div 
        style={{
          padding: '14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end'
        }}
      >
        <button
          onClick={onToggleCollapse}
          className="btn btn-secondary"
          style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px' }}
          title={collapsed ? 'Mở rộng' : 'Thu gọn'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
};
