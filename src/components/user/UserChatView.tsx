import React, { useState } from 'react';
import { 
  Send, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  FileText,
  BookmarkCheck,
  Sparkles
} from 'lucide-react';
import type { ChatMessage, Citation } from '../../types';

interface UserChatViewProps {
  initialQuery?: string;
}

export const UserChatView: React.FC<UserChatViewProps> = ({ initialQuery = '' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'assistant',
      content: `Hệ thống đã lập chỉ mục **48 tài liệu học thuật** môn Trí tuệ Nhân tạo (sách kinh điển, giáo trình ĐH Bách Khoa, ĐHQG, bài giảng MIT và UC Berkeley).

Mọi câu trả lời đều được **trích dẫn số trang và tên sách cụ thể** để bạn đối soát. Bạn có thể đặt câu hỏi về giải thuật tìm kiếm, CSP, lý thuyết trò chơi hoặc học máy.`,
      timestamp: '14:30',
      suggestedFollowUps: [
        'Thuật toán A* hoạt động như thế nào và điều kiện tối ưu?',
        'Hàm heuristic admissible khác consistent như thế nào?',
        'Nguyên lý cắt tỉa Alpha-Beta trong trò chơi đối kháng'
      ]
    }
  ]);

  const [input, setInput] = useState<string>(initialQuery);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [knowledgeScope, setKnowledgeScope] = useState<string>('ALL');

  const sampleCitations: Citation[] = [
    {
      id: 'cite_1',
      chunkId: 'chk_1001',
      documentTitle: 'EN_BK_001_AI Agents in Depth.pdf',
      pageNumber: 45,
      snippet: 'It evaluates nodes by combining g(n), the cost to reach the node, and h(n), the cost to get from the node to the goal: f(n) = g(n) + h(n). Since g(n) gives the path cost and h(n) is the estimated cost, f(n) represents the estimated cost of the cheapest solution.',
      similarityScore: 0.942
    },
    {
      id: 'cite_2',
      chunkId: 'chk_1002',
      documentTitle: 'EN_BK_001_AI Agents in Depth.pdf',
      pageNumber: 46,
      snippet: 'An admissible heuristic is one that never overestimates the cost to reach the goal. Admissible heuristics are by nature optimistic, because they think the cost of solving the problem is less than it actually is.',
      similarityScore: 0.887
    }
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        content: `Dựa trên tài liệu đối soát trong kho tri thức:

### 1. Nguyên lý thuật toán A* Search
Thuật toán **A* (A-Star Search)** đánh giá từng nút $n$ trong không gian trạng thái thông qua hàm chi phí:

$$f(n) = g(n) + h(n)$$

Trong đó:
- $g(n)$: Chi phí thực tế đã tích lũy từ trạng thái xuất phát đến nút $n$.
- $h(n)$: Chi phí ước lượng từ nút $n$ đến đích (hàm Heuristic).

### 2. Điều kiện bảo đảm tính tối ưu (Optimality)
- **Trên cây tìm kiếm (Tree Search):** Hàm $h(n)$ phải thỏa mãn tính **chấp nhận được (admissible)**: không bao giờ ước lượng lớn hơn chi phí thực tế nhỏ nhất ($h(n) \\le h^*(n)$).
- **Trên đồ thị tìm kiếm (Graph Search):** Hàm $h(n)$ cần thỏa mãn tính **nhất quán (consistent)**: với mọi trạng thái kế tiếp $n'$ qua hành động $a$, ta có $h(n) \\le c(n, a, n') + h(n')$.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: sampleCitations,
        suggestedFollowUps: [
          'Tại sao A* với h(n) = 0 tương đương với Dijkstra?',
          'Độ phức tạp bộ nhớ của A* và cách khắc phục bằng IDA*'
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: '920px', margin: '0 auto', gap: '20px' }}>
      {/* Scope Filter Bar (Academic Slate Style) */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
          fontSize: '13px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={16} color="var(--accent-indigo)" />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Nguồn tra cứu:</span>
          <select
            value={knowledgeScope}
            onChange={(e) => setKnowledgeScope(e.target.value)}
            className="input-control"
            style={{ width: 'auto', padding: '5px 12px', fontSize: '13px', height: '34px', borderColor: 'var(--border-medium)' }}
          >
            <option value="ALL">Toàn bộ 48 giáo trình & bài giảng</option>
            <option value="VI_TEXTBOOKS">Giáo trình tiếng Việt (ĐH Bách Khoa, ĐHQG)</option>
            <option value="INTL_UNIVERSITIES">Bài giảng quốc tế (MIT, UC Berkeley)</option>
            <option value="PAPERS">Bài báo nghiên cứu khoa học</option>
          </select>
        </div>

        <div className="badge badge-indigo">
          <span>Kho tài liệu: <strong>5,640 chunks</strong></span>
        </div>
      </div>

      {/* Messages Stream */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          minHeight: '440px',
          maxHeight: '620px',
          overflowY: 'auto',
          paddingRight: '6px'
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                gap: '6px'
              }}
            >
              {/* Sender label & time */}
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {isUser ? 'Bạn' : 'Hệ thống tra cứu'} • {msg.timestamp}
              </div>

              {/* Message Box */}
              <div 
                style={{
                  maxWidth: isUser ? '80%' : '100%',
                  backgroundColor: isUser ? 'var(--accent-indigo-subtle)' : '#ffffff',
                  border: isUser ? '1px solid var(--accent-indigo-border)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px 22px',
                  color: isUser ? 'var(--accent-indigo-text)' : 'var(--text-primary)',
                  fontSize: '14.5px',
                  lineHeight: '1.75',
                  whiteSpace: 'pre-line',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                {msg.content}

                {/* Academic Footnotes / Citations (Perplexity Style with Emerald) */}
                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--accent-emerald-text)', marginBottom: '10px' }}>
                      <BookmarkCheck size={14} color="var(--accent-emerald)" />
                      <span>NGUỒN THAM CHIẾU ĐỐI SOÁT TỪ GIÁO TRÌNH:</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {msg.citations.map((cite, cIdx) => (
                        <div
                          key={cite.id}
                          onClick={() => setActiveCitation(cite)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            border: '1px solid var(--accent-emerald-border)',
                            cursor: 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-emerald-subtle)';
                            e.currentTarget.style.borderColor = 'var(--accent-emerald)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.borderColor = 'var(--accent-emerald-border)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '13px' }}>
                              [{cIdx + 1}]
                            </span>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                              {cite.documentTitle}
                            </span>
                            <span style={{ color: 'var(--text-muted)' }}>
                              — Trang {cite.pageNumber}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="badge badge-emerald" style={{ fontSize: '11.5px', padding: '2px 8px' }}>
                              {(cite.similarityScore * 100).toFixed(1)}% khớp
                            </span>
                            <ExternalLink size={13} color="var(--accent-emerald)" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up Question Chips */}
              {msg.suggestedFollowUps && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {msg.suggestedFollowUps.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSend(q)}
                      style={{
                        fontSize: '12.5px',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
                        fontFamily: 'var(--font-sans)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-indigo)';
                        e.currentTarget.style.color = 'var(--accent-indigo)';
                        e.currentTarget.style.backgroundColor = 'var(--accent-indigo-subtle)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-medium)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <Sparkles size={12} color="var(--accent-indigo)" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ fontSize: '13px', color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', fontWeight: 500 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-indigo)', display: 'inline-block' }} />
            <span>Đang tra cứu và trích xuất tài liệu đối soát...</span>
          </div>
        )}
      </div>

      {/* Input Form Bar (Crisp Academic Style) */}
      <div 
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '8px 14px',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <input
          type="text"
          placeholder="Đặt câu hỏi về môn Trí Tuệ Nhân Tạo (vd: Giải thuật tìm kiếm A*)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="input-control"
          style={{ border: 'none', backgroundColor: 'transparent', height: '42px', fontSize: '14px', boxShadow: 'none' }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="btn btn-primary"
          style={{ height: '40px', padding: '0 20px', borderRadius: '8px' }}
        >
          <Send size={15} />
          <span>Gửi câu hỏi</span>
        </button>
      </div>

      {/* Citation Detail Modal Drawer */}
      {activeCitation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
          onClick={() => setActiveCitation(null)}
        >
          <div
            style={{
              width: '620px',
              maxWidth: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-dropdown)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-emerald-subtle)',
                    border: '1px solid var(--accent-emerald-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-emerald)'
                  }}
                >
                  <FileText size={16} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {activeCitation.documentTitle}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <span className="badge badge-emerald">
                      Trang {activeCitation.pageNumber}
                    </span>
                    <span className="badge badge-indigo">
                      Mã chunk: {activeCitation.chunkId}
                    </span>
                    <span className="badge badge-blue">
                      {(activeCitation.similarityScore * 100).toFixed(1)}% tương đồng
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveCitation(null)}
                className="btn btn-ghost"
                style={{ padding: '6px', borderRadius: '4px' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Snippet Content */}
            <div
              style={{
                backgroundColor: 'var(--bg-page)',
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--text-primary)',
                fontStyle: 'normal',
                borderLeft: '4px solid var(--accent-emerald)'
              }}
            >
              {activeCitation.snippet}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Đoạn trích được trích xuất trực tiếp qua pipeline bóc tách văn bản MinerU.
              </span>
              <button
                onClick={() => handleCopy(activeCitation.id, activeCitation.snippet)}
                className="btn btn-secondary"
                style={{ fontSize: '12.5px' }}
              >
                {copiedId === activeCitation.id ? (
                  <>
                    <Check size={13} color="var(--accent-emerald)" />
                    <span>Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Sao chép đoạn trích</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
