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

  const getTopicMeta = (id: string) => {
    switch (id) {
      case 'top_search':
        return {
          icon: <Search size={18} color="#4f46e5" />,
          topBorder: '#4f46e5',
          badgeClass: 'badge badge-indigo',
          bgIcon: '#eef2ff'
        };
      case 'top_csp':
        return {
          icon: <Puzzle size={18} color="#d97706" />,
          topBorder: '#d97706',
          badgeClass: 'badge badge-amber',
          bgIcon: '#fffbeb'
        };
      case 'top_game':
        return {
          icon: <Swords size={18} color="#e11d48" />,
          topBorder: '#e11d48',
          badgeClass: 'badge badge-rose',
          bgIcon: '#fff1f2'
        };
      case 'top_ml':
        return {
          icon: <BrainCircuit size={18} color="#059669" />,
          topBorder: '#059669',
          badgeClass: 'badge badge-emerald',
          bgIcon: '#ecfdf5'
        };
      default:
        return {
          icon: <BookOpen size={18} color="#4f46e5" />,
          topBorder: '#4f46e5',
          badgeClass: 'badge badge-indigo',
          bgIcon: '#eef2ff'
        };
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
        {userTopics.map((topic) => {
          const meta = getTopicMeta(topic.id);
          return (
            <div 
              key={topic.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '22px',
                borderTop: `4px solid ${meta.topBorder}`,
                backgroundColor: '#ffffff'
              }}
            >
              {/* Topic Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: meta.bgIcon,
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {meta.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {topic.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '3px' }}>
                      <span className={meta.badgeClass}>
                        {topic.sampleQuestions.length} câu hỏi mẫu
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {topic.chunkCount} chunks liên quan
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {topic.description}
              </p>

              {/* Sample Questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  Câu hỏi thường gặp trong kỳ thi:
                </span>
                {topic.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectQuestion(q)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      fontFamily: 'var(--font-sans)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.borderColor = meta.topBorder;
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span>{q}</span>
                    <ArrowRight size={14} color={meta.topBorder} />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
