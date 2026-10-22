import { useEffect, useState } from 'react';
import {
onAuthStateChanged,
signOut
} from 'firebase/auth';
import {
MessageCircle,
Users,
Settings,
UserRound,
Search,
Plus,
LogOut
} from 'lucide-react';

import { auth } from './firebase.js';
import Login from './pages/Login.jsx';

export default function App() {
const [user, setUser] = useState(null);
const [checkingAuth, setCheckingAuth] = useState(true);
const [activeTab, setActiveTab] = useState('Chats');
const [error, setError] = useState('');

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, currentUser => {
setUser(currentUser);
setCheckingAuth(false);
});

return unsubscribe;

}, []);

async function handleLogout() {
try {
await signOut(auth);
} catch {
setError('Logout করা যায়নি। আবার চেষ্টা করুন।');
}
}

if (checkingAuth) {
return (
<div className="empty-state">
<div className="empty-icon">
<MessageCircle size={34} />
</div>
<h3>N-Chat</h3>
<p>অপেক্ষা করুন...</p>
</div>
);
}

if (!user) {
return <Login />;
}

return (
<div className="app">
<header className="topbar">
<div className="brand">
<div className="brand-icon">
<MessageCircle size={25} />
</div>
<div>
<h1>N-Chat</h1>
<p>Connect · Chat · Share</p>
</div>
</div>

    <button
      className="icon-btn"
      aria-label="Search"
      onClick={() => setActiveTab('People')}
    >
      <Search size={21} />
    </button>
  </header>

  <main className="main-content">
    <div className="welcome">
      <span className="eyebrow">YOUR SPACE, YOUR PEOPLE</span>
      <h2>Stay connected.</h2>
      <p>
        Welcome, {user.displayName || user.email || 'friend'}.
        Your conversations start here.
      </p>
    </div>

    <div className="section-heading">
      <h3>{activeTab}</h3>

      {activeTab === 'Chats' && (
        <button
          className="new-chat"
          onClick={() => setActiveTab('People')}
        >
          <Plus size={18} /> New chat
        </button>
      )}

      {activeTab === 'Profile' && (
        <button className="new-chat" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      )}
    </div>

    {error && <p className="form-error">{error}</p>}

    {activeTab === 'Chats' && (
      <div className="empty-state">
        <div className="empty-icon">
          <MessageCircle size={34} />
        </div>
        <h3>Your chats start here</h3>
        <p>
          Chat messaging এখনো সংযুক্ত করা হয়নি।
          পরের ধাপে এটি তৈরি করব।
        </p>
        <button
          className="primary-btn"
          onClick={() => setActiveTab('People')}
        >
          <Users size={17} /> Find people
        </button>
      </div>
    )}

    {activeTab === 'People' && (
      <div className="empty-state">
        <div className="empty-icon">
          <Users size={34} />
        </div>
        <h3>Meet your people</h3>
        <p>
          ব্যবহারকারীদের তালিকা ও নতুন চ্যাটের সুবিধা
          পরের ধাপে যুক্ত করা হবে।
        </p>
      </div>
    )}

    {activeTab === 'Profile' && (
      <div className="empty-state">
        <div className="empty-icon">
          <UserRound size={34} />
        </div>
        <h3>{user.displayName || 'Your profile'}</h3>
        <p>{user.email}</p>
        <button className="primary-btn" onClick={handleLogout}>
          <LogOut size={17} /> Sign out
        </button>
      </div>
    )}

    {activeTab === 'Settings' && (
      <div className="empty-state">
        <div className="empty-icon">
          <Settings size={34} />
        </div>
        <h3>Settings</h3>
        <p>Theme ও account settings পরে যোগ করব।</p>
      </div>
    )}
  </main>

  <nav className="bottom-nav">
    {[
      { name: 'Chats', icon: MessageCircle },
      { name: 'People', icon: Users },
      { name: 'Profile', icon: UserRound },
      { name: 'Settings', icon: Settings }
    ].map(({ name, icon: Icon }) => (
      <button
        key={name}
        className={`nav-item ${activeTab === name ? 'active' : ''}`}
        onClick={() => setActiveTab(name)}
      >
        <Icon size={21} />
        <span>{name}</span>
      </button>
    ))}
  </nav>
</div>

);
}
