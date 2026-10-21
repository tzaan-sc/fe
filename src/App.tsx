import { useState } from 'react';
import { Sidebar, type NavTab } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DashboardView } from './components/views/DashboardView';
import { DocumentsView } from './components/views/DocumentsView';
import { ChunkingStudioView } from './components/views/ChunkingStudioView';
import { ExportView } from './components/views/ExportView';
import { PlaygroundView } from './components/views/PlaygroundView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveTab} />;
      case 'documents':
        return <DocumentsView onNavigate={setActiveTab} />;
      case 'chunking':
        return <ChunkingStudioView />;
      case 'export':
        return <ExportView />;
      case 'playground':
        return <PlaygroundView />;
      default:
        return <DashboardView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sleek Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <Topbar
          activeTab={activeTab}
          onOpenPlayground={() => setActiveTab('playground')}
        />
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;
