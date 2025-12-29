import { useMemo, useRef, useState } from 'react';
import { chatMessages } from '../data';
import type { ChatMessage } from '../types';

interface Props {
  chatId: string;
  onBack: () => void;
}

const icebreakers = ['Where are you sitting?', "Who's bringing the banner?", 'Want to meet before kickoff?', 'Anyone need a ride?'];

function GroupChatView({ chatId, onBack }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const now = new Date();
    const newMessage: ChatMessage = {
      id: String(messages.length + 1),
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'YU',
      message: trimmed,
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isIcebreaker: false
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setTimeout(scrollToBottom, 20);
  };

  const title = useMemo(() => {
    return chatId === '1' ? 'Man Utd vs Liverpool' : 'Matchday Chat';
  }, [chatId]);

  return (
    <div className="grid" style={{ gap: 12, height: 'calc(100vh - 40px)' }}>
      <header className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="pill" style={{ background: '#e2e8f0' }} onClick={onBack}>
          ← Back
        </button>
        <div>
          <p style={{ margin: 0, fontWeight: 700 }}>{title}</p>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 13 }}>47 members</p>
        </div>
      </header>

      <div className="card" style={{ padding: 12 }}>
        <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: 13 }}>💡 Icebreaker prompts:</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {icebreakers.map((prompt) => (
            <button
              key={prompt}
              className="pill"
              style={{ background: '#e2e8f0', border: 'none', whiteSpace: 'nowrap' }}
              onClick={() => {
                setInput(prompt);
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 12, flex: 1, overflowY: 'auto', display: 'grid', gap: 10 }}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="card" style={{ padding: 12 }}>
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 8,
            color: '#f59e0b',
            fontSize: 12
          }}
        >
          <span>🔒</span>
          <p style={{ margin: 0 }}>DMs from strangers will be disabled during matchday for your safety</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            style={{
              flex: 1,
              height: 46,
              borderRadius: 14,
              border: '1px solid #e2e8f0',
              padding: '0 12px',
              fontSize: 15
            }}
          />
          <button
            className="auth-primary"
            style={{ width: 120, height: 46, borderRadius: 14 }}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.senderId === 'system') {
    return (
      <div style={{ textAlign: 'center', color: '#475569', fontSize: 14 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '10px 14px',
            borderRadius: 14,
            background: message.isIcebreaker ? '#eff6ff' : '#e2e8f0'
          }}
        >
          {message.message}
        </div>
      </div>
    );
  }

  const isCurrentUser = message.senderId === 'current-user';

  return (
    <div style={{ display: 'flex', justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }}>
      {!isCurrentUser && (
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontSize: 12,
            fontWeight: 700,
            marginRight: 8
          }}
        >
          {message.senderAvatar}
        </div>
      )}
      <div style={{ maxWidth: '68%', display: 'grid', gap: 4 }}>
        {!isCurrentUser && (
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{message.senderName}</span>
        )}
        <div
          style={{
            background: isCurrentUser ? '#2563eb' : '#fff',
            border: isCurrentUser ? 'none' : '1px solid #e2e8f0',
            color: isCurrentUser ? '#fff' : '#0f172a',
            padding: '10px 14px',
            borderRadius: 14,
            whiteSpace: 'pre-wrap'
          }}
        >
          {message.message}
        </div>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{message.timestamp}</span>
      </div>
    </div>
  );
}

export default GroupChatView;

