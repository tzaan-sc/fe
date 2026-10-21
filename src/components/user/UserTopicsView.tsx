import React from 'react';
import { 
  BookOpen, 
  Search, 
  Puzzle, 
  Swords, 
  BrainCircuit, 
  ArrowRight
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
        return <Search size={18} color="var(--text-secondary)" />;
      case 'top_csp':
        return <Puzzle size={18} color="var(--text-secondary)" />;
      case 'top_game':
        return <Swords size={18} color="var(--text-secondary)" />;
      case 'top_ml':
        return <BrainCircuit size={18} color="var(--text-secondary)" />;
      default:
        return <BookOpen size={18} color="var(--text-secondary)" />;
    }
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: '1050px', margin: '0 auto', gap: '24px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            Chuyên Đề Môn Trí Tuệ Nhân Tạo
          </h2>
          <p className="page-desc">
            Các chủ đề cốt lõi được trích xuất từ 48 giáo trình. Chọn câu hỏi mẫu để đối soát tài liệu trong khung tra cứu.
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '16px' }}>
        {userTopics.map((topic) => (
          <div 
            key={topic.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px'
            }}
          >
            {/* Topic Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getTopicIcon(topic.id)}
                </div>
                <div>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {topic.title}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {topic.category}
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {topic.chunkCount} chunks
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {topic.description}
            </p>

            {/* Sample Questions */}
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '8px' }}>
                Câu hỏi tra cứu mẫu:
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
                      padding: '7px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-medium)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    <span>{q}</span>
                    <ArrowRight size={12} color="var(--text-muted)" style={{ flexShrink: 0, marginLeft: '8px' }} />
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
