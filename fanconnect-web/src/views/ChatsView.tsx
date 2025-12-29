import { activeChats, pastChats } from '../data';
import type { ChatPreview } from '../types';

interface Props {
  onChatSelect: (id: string) => void;
}

function ChatsView({ onChatSelect }: Props) {
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <h2 style={{ margin: '0 0 6px' }}>Messages</h2>
        <p style={{ margin: 0, color: '#64748b' }}>Your group chats and event discussions</p>
      </div>

      <ChatSection title="Active Chats" badge="🟢" emptyMessage="No active chats" chats={activeChats} onChatSelect={onChatSelect} />

      <ChatSection title="Past Events" badge="⏰" emptyMessage="No past chats" chats={pastChats} onChatSelect={onChatSelect} />
    </div>
  );
}

function ChatSection({
  title,
  badge,
  emptyMessage,
  chats,
  onChatSelect
}: {
  title: string;
  badge: string;
  emptyMessage: string;
  chats: ChatPreview[];
  onChatSelect: (id: string) => void;
}) {
  return (
    <section className="card" style={{ padding: 16, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{badge}</span>
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      {chats.length === 0 ? (
        <p style={{ margin: 0, color: '#94a3b8' }}>{emptyMessage}</p>
      ) : (
        <div className="grid" style={{ gap: 10 }}>
          {chats.map((chat) => (
            <ChatCard key={chat.id} chat={chat} onSelect={onChatSelect} />
          ))}
        </div>
      )}
    </section>
  );
}

function ChatCard({ chat, onSelect }: { chat: ChatPreview; onSelect: (id: string) => void }) {
  return (
    <button className="card" onClick={() => onSelect(chat.id)} style={{ padding: 12, textAlign: 'left' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: chat.isActive ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : '#e2e8f0',
            display: 'grid',
            placeItems: 'center',
            color: chat.isActive ? '#fff' : '#0f172a'
          }}
        >
          💬
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{chat.eventName}</p>
            <span style={{ color: '#94a3b8', fontSize: 12 }}>{chat.lastMessageTime}</span>
          </div>
          <p style={{ margin: '4px 0', color: '#64748b' }}>{chat.lastMessage}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: 13 }}>
            <span>👥 {chat.members} members</span>
            {chat.unreadCount > 0 && (
              <span className="pill" style={{ background: '#2563eb', color: '#fff' }}>
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export default ChatsView;

