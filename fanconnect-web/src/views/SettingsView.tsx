import { ReactNode, useState } from 'react';

interface Props {
  onBack: () => void;
}

function SettingsView({ onBack }: Props) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [chatMessages, setChatMessages] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="grid" style={{ gap: 12 }}>
      <header className="gradient-bg" style={{ padding: 16, color: '#fff', borderRadius: 18 }}>
        <button className="pill" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={onBack}>
          ← Back
        </button>
        <h2 style={{ margin: '12px 0 0' }}>Settings</h2>
      </header>

      <SettingsSection title="Account">
        <SettingsRow icon="👤" label="Edit Profile" />
        <SettingsRow icon="🔒" label="Change Password" />
        <SettingsRow icon="✉️" label="Email Preferences" />
      </SettingsSection>

      <SettingsSection title="Notifications">
        <ToggleRow label="Push Notifications" value={pushNotifications} onChange={setPushNotifications} />
        <ToggleRow label="Chat Messages" value={chatMessages} onChange={setChatMessages} />
        <ToggleRow label="Event Reminders" value={eventReminders} onChange={setEventReminders} />
      </SettingsSection>

      <SettingsSection title="Privacy">
        <ToggleRow label="Location Services" value={location} onChange={setLocation} />
        <SettingsRow icon="👁️" label="Profile Visibility" />
        <SettingsRow icon="✋" label="Blocked Users" />
      </SettingsSection>

      <SettingsSection title="App Settings">
        <ToggleRow label="Dark Mode" value={darkMode} onChange={setDarkMode} />
        <SettingsRow icon="🌐" label="Language" value="English" />
        <SettingsRow icon="ℹ️" label="App Version" value="1.0.0" />
      </SettingsSection>

      <SettingsSection title="Support">
        <SettingsRow icon="❓" label="Help Center" />
        <SettingsRow icon="📄" label="Terms of Service" />
        <SettingsRow icon="🔐" label="Privacy Policy" />
        <SettingsRow icon="✉️" label="Contact Us" />
      </SettingsSection>

      <SettingsSection title="Account Actions">
        <SettingsRow icon="↪️" label="Sign Out" danger />
        <SettingsRow icon="🗑️" label="Delete Account" danger />
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card" style={{ padding: 12, display: 'grid', gap: 8 }}>
      <p style={{ margin: 0, color: '#64748b', fontWeight: 700 }}>{title}</p>
      <div className="grid" style={{ gap: 8 }}>
        {children}
      </div>
    </section>
  );
}

function SettingsRow({ icon, label, value, danger }: { icon: string; label: string; value?: string; danger?: boolean }) {
  return (
    <div
      className="card"
      style={{
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: '1px solid #e2e8f0',
        color: danger ? '#b91c1c' : undefined
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <p style={{ margin: 0, fontWeight: 700, flex: 1 }}>{label}</p>
      {value ? <span style={{ color: '#94a3b8' }}>{value}</span> : <span style={{ color: '#94a3b8' }}>›</span>}
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #e2e8f0' }}>
      <p style={{ margin: 0, fontWeight: 700, flex: 1 }}>{label}</p>
      <label className="switch">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <span className="slider" />
      </label>
    </div>
  );
}

export default SettingsView;

