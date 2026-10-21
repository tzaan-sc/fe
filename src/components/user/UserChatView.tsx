import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
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
      content: `Xin chào bạn! Mình là **Trợ Lý Tri Thức Môn Trí Tuệ Nhân Tạo**. 

Mình được huấn luyện và kết nối trực tiếp với **kho 48 giáo trình, sách kinh điển và bài giảng AI chuẩn hóa** (Sách AI Agents in Depth, Giáo trình ĐH Bách Khoa, Bài giảng MIT & UC Berkeley). 

Mọi câu trả lời của mình đều được **trích dẫn số trang và tên sách cụ thể** để bạn đối soát chính xác 100%. Bạn muốn tìm hiểu hoặc giải đáp vấn đề gì hôm nay?`,
      timestamp: '14:30',
      suggestedFollowUps: [
        'Thuật toán A* hoạt động như thế nào?',
        'Hàm heuristic admissible là gì?',
        'Cắt tỉa Alpha-Beta trong cờ vua'
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
        content: `Dựa trên dữ liệu từ các giáo trình trong kho tri thức:

### 1. Bản chất thuật toán A* Search
Thuật toán **A* (A-Star Search)** là giải thuật tìm kiếm theo đồ thị kết hợp giữa:
- Chi phí thực tế đã đi từ điểm xuất phát tới nút hiện tại: $g(n)$
- Chi phí ước lượng thông minh từ nút hiện tại tới đích (Heuristic): $h(n)$

Hàm đánh giá tổng hợp:
$$f(n) = g(n) + h(n)$$

### 2. Điều kiện tối ưu của A*
Để thuật toán A* bảo đảm luôn tìm ra đường đi ngắn nhất (Optimal):
1. **Tính chấp nhận được (Admissible):** Hàm $h(n)$ không bao giờ được ước lượng vượt quá chi phí thực tế ($h(n) \\le h^*(n)$). 
2. **Tính nhất quán (Consistent / Monotonic):** Với mọi nút $n$ và nút kế tiếp $n'$ qua hành động $a$, ta phải có: $h(n) \\le c(n, a, n') + h(n')$.

*(Bạn có thể nhấp vào các thẻ trích dẫn bên dưới để xem lại đoạn văn nguyên bản trong sách).*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: sampleCitations,
        suggestedFollowUps: [
          'Tại sao A* với h(n)=0 lại trở thành thuật toán Dijkstra?',
          'So sánh A* và IDA* (Iterative Deepening A*)'
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-wrapper" style={{ paddingBottom: '20px' }}>
      {/* Scope Filter Bar */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <BookOpen size={16} color="var(--accent-cyan)" />
          <span style={{ color: 'var(--text-muted)' }}>Phạm vi tài liệu tra cứu:</span>
          <select
            value={knowledgeScope}
            onChange={(e) => setKnowledgeScope(e.target.value)}
            className="input-control"
            style={{ width: 'auto', padding: '4px 10px', fontSize: '12.5px', height: '32px' }}
          >
            <option value="ALL">Toàn bộ 48 Sách & Giáo trình (Khuyên dùng)</option>
            <option value="VI_TEXTBOOKS">Chỉ Giáo trình tiếng Việt (ĐH Bách Khoa, QG)</option>
            <option value="INTL_UNIVERSITIES">Chỉ Bài giảng Quốc tế (MIT, UC Berkeley)</option>
            <option value="PAPERS">Chỉ Bài báo nghiên cứu khoa học</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent-emerald)' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)', display: 'inline-block' }} />
          <span>Kho tri thức RAG: Đang hoạt động (5,640 Chunks)</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          minHeight: '480px',
          maxHeight: '620px',
          overflowY: 'auto',
          padding: '10px 4px'
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                flexDirection: isUser ? 'row-reverse' : 'row'
              }}
            >
              {/* Avatar */}
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: isUser ? 'var(--accent-indigo)' : 'rgba(6, 182, 212, 0.15)',
                  border: isUser ? 'none' : '1px solid var(--accent-cyan)',
                  color: isUser ? '#fff' : 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {isUser ? <User size={18} /> : <Bot size={20} />}
              </div>

              {/* Message Content Bubble */}
              <div 
                style={{
                  maxWidth: '75%',
                  backgroundColor: isUser ? 'var(--bg-input)' : 'var(--bg-card)',
                  border: isUser ? '1px solid var(--accent-indigo)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Sender Name & Time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '11.5px', color: 'var(--text-dim)' }}>
                  <span style={{ fontWeight: 600, color: isUser ? '#fff' : 'var(--accent-cyan)' }}>
                    {isUser ? 'Bạn' : 'Trợ Lý Tri Thức AI (RAG)'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Text Body */}
                <div 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.7', 
                    color: '#e2e8f0', 
                    whiteSpace: 'pre-line',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {msg.content}
                </div>

                {/* Citations Chips (If Assistant has citations) */}
                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BookOpen size={12} color="var(--accent-cyan)" />
                      <span>Nguồn Trích Dẫn Minh Bạch ({msg.citations.length} tài liệu)</span>
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
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(6, 182, 212, 0.08)',
                            border: '1px solid rgba(6, 182, 212, 0.25)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.25)';
                            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', backgroundColor: 'rgba(6, 182, 212, 0.2)', padding: '2px 6px', borderRadius: '3px' }}>
                              [Nguồn {cIdx + 1}]
                            </span>
                            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#fff' }}>
                              {cite.documentTitle}
                            </span>
                            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                              • Trang {cite.pageNumber}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--accent-emerald)' }}>
                            <span>{(cite.similarityScore * 100).toFixed(1)}% khớp</span>
                            <ExternalLink size={12} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Followups */}
                {msg.suggestedFollowUps && (
                  <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {msg.suggestedFollowUps.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSend(q)}
                        style={{
                          fontSize: '11.5px',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                      >
                        {q} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
              <Bot size={20} />
            </div>
            <div style={{ padding: '12px 18px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} className="animate-spin" color="var(--accent-cyan)" />
              <span>Đang tra cứu kho tri thức và tổng hợp dẫn chứng...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <div 
        style={{
          marginTop: 'auto',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '8px 12px',
          border: '1px solid var(--border-focus)',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          placeholder="Nhập câu hỏi của bạn về môn Trí Tuệ Nhân Tạo (vd: Giải thích thuật toán A*)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="input-control"
          style={{ border: 'none', backgroundColor: 'transparent', height: '42px', fontSize: '14px' }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="btn btn-primary"
          style={{ height: '42px', padding: '0 18px', borderRadius: 'var(--radius-md)' }}
        >
          <Send size={16} />
          <span>Gửi</span>
        </button>
      </div>

      {/* Citation Detail Modal Drawer */}
      {activeCitation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
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
              width: '600px',
              maxWidth: '100%',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--accent-cyan)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={22} color="var(--accent-cyan)" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                    Chi Tiết Dẫn Chứng Gốc
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Trích từ: {activeCitation.documentTitle}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveCitation(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
              <span className="badge badge-cyan">Trang {activeCitation.pageNumber}</span>
              <span className="badge badge-emerald">Độ tương đồng: {(activeCitation.similarityScore * 100).toFixed(1)}%</span>
              <span className="badge badge-purple">Chunk: {activeCitation.chunkId}</span>
            </div>

            <div 
              style={{
                backgroundColor: 'var(--bg-input)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13.5px',
                lineHeight: '1.7',
                color: '#e2e8f0',
                border: '1px solid var(--border-subtle)',
                fontStyle: 'italic'
              }}
            >
              "{activeCitation.snippet}"
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => handleCopy('cite_modal', activeCitation.snippet)}
                className="btn btn-secondary"
                style={{ fontSize: '12px', padding: '6px 14px' }}
              >
                {copiedId === 'cite_modal' ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copiedId === 'cite_modal' ? 'Đã sao chép' : 'Sao chép đoạn trích'}</span>
              </button>
              <button
                onClick={() => setActiveCitation(null)}
                className="btn btn-primary"
                style={{ fontSize: '12px', padding: '6px 14px' }}
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
