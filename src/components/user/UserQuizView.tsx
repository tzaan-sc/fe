import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  RotateCcw,
  Trophy
} from 'lucide-react';
import mockData from '../../data/mockData.json';

export const UserQuizView: React.FC = () => {
  const { sampleQuiz } = mockData;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults[questionId]) return; // Don't allow changing after answered
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults({});
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalCorrect = sampleQuiz.filter(q => selectedAnswers[q.id] === q.correctAnswerIndex).length;

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <GraduationCap size={28} color="var(--accent-emerald)" />
            Tự Ôn Tập & Kiểm Tra Kiến Thức Môn AI (Self-Check Quiz)
          </h2>
          <p className="page-desc">
            Các câu hỏi trắc nghiệm được trích xuất trực tiếp từ các đoạn phân đoạn (Chunks) trong kho giáo trình.
          </p>
        </div>

        {/* Score & Reset Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid var(--accent-emerald)',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px'
            }}
          >
            <Trophy size={16} color="var(--accent-emerald)" />
            <span style={{ color: '#fff', fontWeight: 600 }}>
              Kết quả: {totalCorrect} / {sampleQuiz.length} câu đúng ({totalAnswered} đã làm)
            </span>
          </div>

          <button
            onClick={handleReset}
            className="btn btn-secondary"
            style={{ fontSize: '13px', padding: '8px 14px' }}
          >
            <RotateCcw size={15} />
            <span>Làm lại từ đầu</span>
          </button>
        </div>
      </div>

      {/* Quiz Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sampleQuiz.map((item, qIdx) => {
          const isAnswered = showResults[item.id];
          const chosenOption = selectedAnswers[item.id];
          const isCorrect = chosenOption === item.correctAnswerIndex;

          return (
            <div 
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: isAnswered 
                  ? (isCorrect ? '1px solid var(--accent-emerald)' : '1px solid var(--accent-rose)') 
                  : '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span 
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      color: '#fff', 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      padding: '3px 9px', 
                      borderRadius: '4px' 
                    }}
                  >
                    Câu #{qIdx + 1}
                  </span>
                  <span className="badge badge-cyan" style={{ fontSize: '11px' }}>
                    {item.topicTitle}
                  </span>
                </div>

                {isAnswered && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 600, color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                    {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    <span>{isCorrect ? 'Chính xác (+1 điểm)' : 'Chưa chính xác'}</span>
                  </div>
                )}
              </div>

              {/* Question Title */}
              <h3 style={{ fontSize: '15.5px', fontWeight: 600, color: '#fff', lineHeight: 1.5 }}>
                {item.question}
              </h3>

              {/* Options List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {item.options.map((opt, optIdx) => {
                  let optBg = 'var(--bg-input)';
                  let optBorder = 'var(--border-subtle)';
                  let optColor = 'var(--text-main)';

                  if (isAnswered) {
                    if (optIdx === item.correctAnswerIndex) {
                      optBg = 'rgba(16, 185, 129, 0.15)';
                      optBorder = 'var(--accent-emerald)';
                      optColor = '#34d399';
                    } else if (optIdx === chosenOption) {
                      optBg = 'rgba(244, 63, 94, 0.15)';
                      optBorder = 'var(--accent-rose)';
                      optColor = '#fb7185';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(item.id, optIdx)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: optBg,
                        border: `1px solid ${optBorder}`,
                        color: optColor,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '13.5px',
                        cursor: isAnswered ? 'default' : 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isAnswered) {
                          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                          e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAnswered) {
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          e.currentTarget.style.backgroundColor = 'var(--bg-input)';
                        }
                      }}
                    >
                      <span 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span style={{ flex: 1 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Source Citation (Revealed after answered) */}
              {isAnswered && (
                <div 
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    <strong>Giải thích chi tiết:</strong> {item.explanation}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--accent-cyan)', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <BookOpen size={14} />
                    <span>Dẫn chứng từ: <strong>{item.sourceCitation.documentTitle}</strong> (Trang {item.sourceCitation.pageNumber})</span>
                  </div>

                  <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontStyle: 'italic', paddingLeft: '8px', borderLeft: '2px solid var(--accent-cyan)' }}>
                    "{item.sourceCitation.snippet}"
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
