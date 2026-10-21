import React, { useState } from 'react';
import { 
  RotateCcw,
  CheckCircle2,
  XCircle,
  BookOpen
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
          <div className="badge badge-indigo" style={{ padding: '6px 12px', fontSize: '13px' }}>
            Đúng: <strong>{totalCorrect}</strong> / {sampleQuiz.length} câu ({totalAnswered} đã làm)
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                padding: '22px',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  CÂU {qIdx + 1} • {item.topicTitle.toUpperCase()}
                </span>

                {isAnswered && (
                  <span className={isCorrect ? 'badge badge-emerald' : 'badge badge-rose'}>
                    {isCorrect ? 'Chính xác' : 'Chưa đúng'}
                  </span>
                )}
              </div>

              {/* Question Title */}
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {item.question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.options.map((opt, optIdx) => {
                  let optBg = '#ffffff';
                  let optBorder = 'var(--border-medium)';
                  let optText = 'var(--text-primary)';
                  let icon = null;

                  if (isAnswered) {
                    if (optIdx === item.correctAnswerIndex) {
                      optBg = 'var(--accent-emerald-subtle)';
                      optBorder = 'var(--accent-emerald)';
                      optText = 'var(--accent-emerald-text)';
                      icon = <CheckCircle2 size={16} color="var(--accent-emerald)" />;
                    } else if (optIdx === chosenOption) {
                      optBg = 'var(--accent-rose-subtle)';
                      optBorder = 'var(--accent-rose)';
                      optText = 'var(--accent-rose-text)';
                      icon = <XCircle size={16} color="var(--accent-rose)" />;
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(item.id, optIdx)}
                      disabled={isAnswered}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '11px 16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: optBg,
                        border: `1px solid ${optBorder}`,
                        color: optText,
                        fontSize: '13.5px',
                        cursor: isAnswered ? 'default' : 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        fontFamily: 'var(--font-sans)',
                        lineHeight: 1.5
                      }}
                      onMouseEnter={(e) => {
                        if (!isAnswered) {
                          e.currentTarget.style.borderColor = 'var(--accent-indigo)';
                          e.currentTarget.style.backgroundColor = 'var(--accent-indigo-subtle)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAnswered) {
                          e.currentTarget.style.borderColor = 'var(--border-medium)';
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ 
                          width: '22px', 
                          height: '22px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 600,
                          backgroundColor: 'rgba(15, 23, 42, 0.05)',
                          color: 'var(--text-secondary)'
                        }}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Citation & Explanation Box */}
              {isAnswered && (
                <div 
                  style={{
                    marginTop: '8px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-subtle)',
                    borderLeft: '4px solid var(--accent-indigo)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={14} color="var(--accent-indigo)" />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-indigo-text)' }}>
                      Tài liệu đối soát trích xuất từ Chunk {item.sourceCitation.chunkId}:
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
