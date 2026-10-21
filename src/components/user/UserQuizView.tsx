import React, { useState } from 'react';
import { 
  RotateCcw
} from 'lucide-react';
import mockData from '../../data/mockData.json';

export const UserQuizView: React.FC = () => {
  const { sampleQuiz } = mockData;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults[questionId]) return;
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
    <div className="page-wrapper" style={{ maxWidth: '850px', margin: '0 auto', gap: '22px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            Tự Ôn Tập Trắc Nghiệm Môn AI
          </h2>
          <p className="page-desc">
            Câu hỏi đối soát kiến thức dựa trên các phân đoạn tri thức trong giáo trình chuẩn hóa.
          </p>
        </div>

        {/* Score & Reset Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              color: 'var(--text-secondary)'
            }}
          >
            Đúng: <strong style={{ color: 'var(--text-primary)' }}>{totalCorrect}</strong> / {sampleQuiz.length} câu ({totalAnswered} đã làm)
          </div>

          <button
            onClick={handleReset}
            className="btn btn-secondary"
            style={{ fontSize: '12.5px', padding: '6px 12px' }}
          >
            <RotateCcw size={13} />
            <span>Làm lại</span>
          </button>
        </div>
      </div>

      {/* Quiz Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                gap: '14px',
                padding: '20px'
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Câu {qIdx + 1} • {item.topicTitle}
                </span>

                {isAnswered && (
                  <span style={{ fontSize: '12px', fontWeight: 500, color: isCorrect ? '#34d399' : '#f87171' }}>
                    {isCorrect ? 'Chính xác' : 'Chưa đúng'}
                  </span>
                )}
              </div>

              {/* Question Title */}
              <h3 style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {item.question}
              </h3>

              {/* Options List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                {item.options.map((opt, optIdx) => {
                  let optBg = 'var(--bg-input)';
                  let optBorder = 'var(--border-subtle)';
                  let optColor = 'var(--text-secondary)';

                  if (isAnswered) {
                    if (optIdx === item.correctAnswerIndex) {
                      optBg = 'rgba(16, 185, 129, 0.08)';
                      optBorder = 'rgba(16, 185, 129, 0.3)';
                      optColor = '#34d399';
                    } else if (optIdx === chosenOption) {
                      optBg = 'rgba(239, 68, 68, 0.08)';
                      optBorder = 'rgba(239, 68, 68, 0.3)';
                      optColor = '#f87171';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(item.id, optIdx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: optBg,
                        border: `1px solid ${optBorder}`,
                        color: optColor,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        cursor: isAnswered ? 'default' : 'pointer',
                        textAlign: 'left',
                        transition: 'border-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isAnswered) {
                          e.currentTarget.style.borderColor = 'var(--border-medium)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAnswered) {
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }
                      }}
                    >
                      <span 
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          borderRadius: '3px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '11px',
                          color: 'var(--text-muted)',
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

              {/* Explanation & Source Citation */}
              {isAnswered && (
                <div 
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>
                    <strong>Giải thích:</strong> {item.explanation}
                  </div>

                  <div style={{ color: 'var(--text-muted)', fontSize: '11.5px', marginTop: '4px' }}>
                    Nguồn: {item.sourceCitation.documentTitle} — Trang {item.sourceCitation.pageNumber}
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
