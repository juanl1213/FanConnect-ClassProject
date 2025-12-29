import { useState } from 'react';
import { matchdayPosts as mockPosts } from '../data';
import type { Event, MatchdayPost } from '../types';

interface Props {
  event: Event;
  onBack: () => void;
}

function MatchdayView({ event, onBack }: Props) {
  const [posts, setPosts] = useState<MatchdayPost[]>(mockPosts);
  const [showComposer, setShowComposer] = useState(false);
  const [newPost, setNewPost] = useState('');

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1
            }
          : p
      )
    );
  };

  const handlePost = () => {
    const content = newPost.trim();
    if (!content) return;
    const newEntry: MatchdayPost = {
      id: String(posts.length + 1),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'YU',
      content,
      image: null,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false
    };
    setPosts((prev) => [newEntry, ...prev]);
    setNewPost('');
    setShowComposer(false);
  };

  return (
    <div className="grid" style={{ gap: 12 }}>
      <header className="gradient-bg" style={{ color: '#fff', padding: 16, borderRadius: 18 }}>
        <button className="pill" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={onBack}>
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <span className="pill" style={{ background: '#ef4444', color: '#fff' }}>
            LIVE
          </span>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>{`${event.homeTeam} vs ${event.awayTeam}`}</p>
            <p style={{ margin: '2px 0 0', opacity: 0.9 }}>67' • 2nd Half</p>
          </div>
        </div>
      </header>

      <div className="card" style={{ padding: 12, display: 'flex', gap: 10 }}>
        <button className="auth-primary" style={{ flex: 1, height: 44, borderRadius: 12 }} onClick={() => setShowComposer((v) => !v)}>
          💬 Share Reaction
        </button>
        <button className="pill" style={{ background: '#e2e8f0', height: 44 }}>
          📷 Camera
        </button>
      </div>

      {showComposer && (
        <div className="card" style={{ padding: 12, display: 'grid', gap: 10 }}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={3}
            placeholder="What's happening in the match? ⚽"
            style={{ borderRadius: 12, border: '1px solid #e2e8f0', padding: 10, fontSize: 15 }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button className="pill" style={{ background: '#e2e8f0' }} onClick={() => setShowComposer(false)}>
              Cancel
            </button>
            <button className="auth-primary" style={{ height: 40, borderRadius: 10 }} disabled={!newPost.trim()} onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: 10,
          padding: 10,
          borderRadius: 12,
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          color: '#1d4ed8',
          alignItems: 'center'
        }}
      >
        <span>🔒</span>
        <p style={{ margin: 0, fontSize: 13 }}>
          DMs from strangers are disabled during Matchday Mode for your safety.
        </p>
      </div>

      <div className="grid" style={{ gap: 12 }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, onLike }: { post: MatchdayPost; onLike: (id: string) => void }) {
  return (
    <div className="card" style={{ padding: 14, display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700
          }}
        >
          {post.userAvatar}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700 }}>{post.userName}</p>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 12 }}>{post.timestamp}</p>
        </div>
      </div>
      <p style={{ margin: 0 }}>{post.content}</p>
      {post.image && (
        <div style={{ borderRadius: 12, overflow: 'hidden', background: '#e2e8f0' }}>
          <img src={post.image} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <button className="pill" style={{ background: '#e2e8f0', color: post.isLiked ? '#ef4444' : '#0f172a' }} onClick={() => onLike(post.id)}>
          {post.isLiked ? '❤️' : '🤍'} {post.likes}
        </button>
        <button className="pill" style={{ background: '#e2e8f0' }}>
          💬 {post.comments}
        </button>
        <div style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 13 }}>↗️ Share</div>
      </div>
    </div>
  );
}

export default MatchdayView;

