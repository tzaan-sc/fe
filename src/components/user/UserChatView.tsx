import React, { useState } from 'react';
import { 
  Send, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink,
  X,
  FileText
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
      content: `Hệ thống đã lập chỉ mục **48 tài liệu học thuật** môn Trí tuệ Nhân tạo (sách kinh điển, giáo trình và bài giảng MIT, UC Berkeley).

Mỗi câu trả lời sẽ tự động đối soát và trích dẫn trực tiếp từ các đoạn phân đoạn (chunks) trong kho tài liệu. Bạn có thể đặt câu hỏi về giải thuật tìm kiếm, CSP, lý thuyết trò chơi hoặc học máy.`,
      timestamp: '14:30',
      suggestedFollowUps: [
        'Thuật toán A* hoạt động như thế nào và điều kiện tối ưu?',
        'Hàm heuristic admissible khác consistent như thế nào?',
        'Nguyên lý cắt tỉa Alpha-Beta trong Minimax'
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
    <div className="page-wrapper" style={{ maxWidth: '900px', margin: '0 auto', gap: '20px' }}>
      {/* Scope Filter Bar (Quiet & Functional) */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 14px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          fontSize: '13px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={15} color="var(--text-muted)" />
          <span style={{ color: 'var(--text-secondary)' }}>Nguồn tra cứu:</span>
          <select
            value={knowledgeScope}
            onChange={(e) => setKnowledgeScope(e.target.value)}
            className="input-control"
            style={{ width: 'auto', padding: '4px 8px', fontSize: '12.5px', height: '28px' }}
          >
            <option value="ALL">Toàn bộ 48 giáo trình & bài giảng</option>
            <option value="VI_TEXTBOOKS">Giáo trình tiếng Việt (ĐH Bách Khoa, ĐHQG)</option>
            <option value="INTL_UNIVERSITIES">Bài giảng quốc tế (MIT, UC Berkeley)</option>
            <option value="PAPERS">Bài báo nghiên cứu khoa học</option>
          </select>
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Index: 5,640 chunks
        </span>
      </div>

      {/* Messages Stream */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          minHeight: '440px',
          maxHeight: '600px',
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
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                {isUser ? 'Bạn' : 'Hệ thống'} • {msg.timestamp}
              </div>

              {/* Message Box */}
              <div 
                style={{
                  maxWidth: isUser ? '80%' : '100%',
                  backgroundColor: isUser ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.content}

                {/* Academic Footnotes / Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Nguồn tham chiếu từ kho tài liệu:
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {msg.citations.map((cite, cIdx) => (
                        <div
                          key={cite.id}
                          onClick={() => setActiveCitation(cite)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                            fontSize: '12.5px',
                            transition: 'border-color 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-medium)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '11.5px' }}>[{cIdx + 1}]</span>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{cite.documentTitle}</span>
                            <span style={{ color: 'var(--text-muted)' }}>— Trang {cite.pageNumber}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '11.5px' }}>
                            <span>Xem trích đoạn</span>
                            <ExternalLink size={12} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up Question Chips */}
              {msg.suggestedFollowUps && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {msg.suggestedFollowUps.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSend(q)}
                      style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-medium)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
            <span>Đang tra cứu và trích xuất tài liệu...</span>
          </div>
        )}
      </div>

      {/* Input Form Bar (Clean, Minimal, No Neon Shadows) */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '6px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <input
          type="text"
          placeholder="Đặt câu hỏi về môn Trí Tuệ Nhân Tạo (vd: Giải thuật tìm kiếm A*)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="input-control"
          style={{ border: 'none', backgroundColor: 'transparent', height: '38px', fontSize: '13.5px' }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="btn btn-primary"
          style={{ height: '36px', padding: '0 16px' }}
        >
          <Send size={14} />
          <span>Gửi</span>
        </button>
      </div>

      {/* Citation Detail Modal Drawer */}
      {activeCitation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
              width: '560px',
              maxWidth: '100%',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-dropdown)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="var(--text-secondary)" />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Trích đoạn tài liệu gốc
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {activeCitation.documentTitle} — Trang {activeCitation.pageNumber}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveCitation(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div 
              style={{
                backgroundColor: 'var(--bg-input)',
                padding: '14px',
                borderRadius: '4px',
                fontSize: '13px',
                lineHeight: '1.7',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                fontStyle: 'italic'
              }}
            >
              "{activeCitation.snippet}"
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => handleCopy('cite_modal', activeCitation.snippet)}
                className="btn btn-secondary"
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                {copiedId === 'cite_modal' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedId === 'cite_modal' ? 'Đã sao chép' : 'Sao chép đoạn trích'}</span>
              </button>
              <button
                onClick={() => setActiveCitation(null)}
                className="btn btn-primary"
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
