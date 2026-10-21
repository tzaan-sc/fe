import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Scissors, 
  DownloadCloud, 
  Sparkles,
  Database,
  ChevronLeft,
  ChevronRight,
  Cpu
} from 'lucide-react';

export type NavTab = 'dashboard' | 'documents' | 'chunking' | 'export' | 'playground';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'documents', label: 'Kho Tài Liệu', icon: <FolderKanban size={20} />, badge: '48' },
    { id: 'chunking', label: 'Chunking Studio', icon: <Scissors size={20} /> },
    { id: 'export', label: 'Kiểm Định & Xuất', icon: <DownloadCloud size={20} /> },
    { id: 'playground', label: 'RAG Playground', icon: <Sparkles size={20} />, badge: 'AI' }
  ];

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
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
            boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)'
          }}
        >
          <Database size={22} />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              RAG Studio
            </h1>
            <span style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.04em' }}>
              DATASET BUILDER
            </span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {navItems.map((item) => {
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
                fontSize: '14px',
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
                  className={item.badge === 'AI' ? 'badge badge-purple' : 'badge badge-cyan'}
                  style={{ fontSize: '11px', padding: '2px 7px' }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Pipeline Status Indicator */}
      {!collapsed && (
        <div 
          style={{
            margin: '16px 14px',
            padding: '14px',
            backgroundColor: 'rgba(11, 19, 36, 0.7)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Cpu size={14} color="var(--accent-emerald)" />
            <span style={{ color: '#fff', fontWeight: 600 }}>MinerU & Chunk Engine</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)', display: 'inline-block' }} />
            <span>Sẵn sàng kết nối API</span>
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
