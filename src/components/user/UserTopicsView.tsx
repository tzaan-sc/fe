import React from 'react';
import { 
  BookOpen, 
  Search, 
  Puzzle, 
  Swords, 
  BrainCircuit, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import mockData from '../../data/mockData.json';

interface UserTopicsViewProps {
  onSelectQuestion: (query: string) => void;
}

export const UserTopicsView: React.FC<UserTopicsViewProps> = ({ onSelectQuestion }) => {
  const { userTopics } = mockData;

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'top_search':
        return <Search size={22} color="var(--accent-cyan)" />;
      case 'top_csp':
        return <Puzzle size={22} color="var(--accent-amber)" />;
      case 'top_game':
        return <Swords size={22} color="var(--accent-rose)" />;
      case 'top_ml':
        return <BrainCircuit size={22} color="var(--accent-purple)" />;
      default:
        return <BookOpen size={22} color="var(--accent-cyan)" />;
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <BookOpen size={28} color="var(--accent-cyan)" />
            Khám Phá Các Chuyên Đề Cốt Lõi Môn Trí Tuệ Nhân Tạo
          </h2>
          <p className="page-desc">
            Chọn một chủ đề bên dưới để xem tóm tắt hoặc nhấp vào câu hỏi gợi ý để trò chuyện trực tiếp với trợ lý AI.
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '22px' }}>
        {userTopics.map((topic) => (
          <div 
            key={topic.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Topic Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getTopicIcon(topic.id)}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                    {topic.title}
                  </h3>
                  <span className="badge badge-cyan" style={{ fontSize: '10.5px', marginTop: '4px' }}>
                    {topic.category}
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>
                {topic.chunkCount} Chunks
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {topic.description}
            </p>

            {/* Sample Questions */}
            <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={12} color="var(--accent-cyan)" />
                <span>Câu hỏi mẫu học tập:</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {topic.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectQuestion(q)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.color = '#38bdf8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.color = 'var(--text-main)';
                    }}
                  >
                    <span>{q}</span>
                    <ArrowRight size={13} style={{ flexShrink: 0, marginLeft: '8px' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
