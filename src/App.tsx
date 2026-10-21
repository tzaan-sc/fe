import { useState } from 'react';
import { Sidebar, type NavTab } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { UserChatView } from './components/user/UserChatView';
import { UserTopicsView } from './components/user/UserTopicsView';
import { UserQuizView } from './components/user/UserQuizView';
import { DashboardView } from './components/views/DashboardView';
import { DocumentsView } from './components/views/DocumentsView';
import { ChunkingStudioView } from './components/views/ChunkingStudioView';
import { ExportView } from './components/views/ExportView';
import type { AppPersonaMode } from './types';

export function App() {
  // Default to USER mode (Người Dùng Thử) as requested!
  const [personaMode, setPersonaMode] = useState<AppPersonaMode>('USER');
  const [activeTab, setActiveTab] = useState<NavTab>('user-chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [prefilledChatQuery, setPrefilledChatQuery] = useState<string>('');

  const handlePersonaChange = (mode: AppPersonaMode) => {
    setPersonaMode(mode);
    if (mode === 'USER') {
      setActiveTab('user-chat');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleSelectTopicQuestion = (query: string) => {
    setPrefilledChatQuery(query);
    setActiveTab('user-chat');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      // End-User Views
      case 'user-chat':
        return <UserChatView initialQuery={prefilledChatQuery} />;
      case 'user-topics':
        return <UserTopicsView onSelectQuestion={handleSelectTopicQuestion} />;
      case 'user-quiz':
        return <UserQuizView />;

      // Technician Studio Views
      case 'dashboard':
        return <DashboardView onNavigate={setActiveTab} />;
      case 'documents':
        return <DocumentsView onNavigate={setActiveTab} />;
      case 'chunking':
        return <ChunkingStudioView />;
      case 'export':
        return <ExportView />;

      default:
        return <UserChatView />;
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
        personaMode={personaMode}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <Topbar
          activeTab={activeTab}
          personaMode={personaMode}
          onPersonaChange={handlePersonaChange}
        />
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;
