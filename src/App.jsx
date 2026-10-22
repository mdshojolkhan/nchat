import React, { useState } from 'react';
import { MessageCircle, Users, Settings, UserRound, Search, Plus, Send } from 'lucide-react';

export default function App() {
const [activeTab, setActiveTab] = useState('Chats');
const [message, setMessage] = useState('');

return (
<div className="app">
<header className="topbar">
<div className="brand">
<div className="brand-icon"><MessageCircle size={25} /></div>
<div>
<h1>N-Chat</h1>
<p>Connect · Chat · Share</p>
</div>
</div>
<button className="icon-btn" aria-label="Search">
<Search size={21} />
</button>
</header>

  <main className="main-content">
    <div className="welcome">
      <span className="eyebrow">YOUR SPACE, YOUR PEOPLE</span>
      <h2>Stay connected.</h2>
      <p>Your conversations, all in one place.</p>
    </div>

    <div className="section-heading">
      <h3>{activeTab}</h3>
      <button className="new-chat" onClick={() => setActiveTab('People')}>
        <Plus size={18} /> New chat
      </button>
    </div>

    {activeTab === 'Chats' && (
      <div className="empty-state">
        <div className="empty-icon"><MessageCircle size={34} /></div>
        <h3>Your chats start here</h3>
        <p>Find people and start your first conversation.</p>
        <button className="primary-btn" onClick={() => setActiveTab('People')}>
          Find people
        </button>
      </div>
    )}

    {activeTab === 'People' && (
      <div className="empty-state">
        <div className="empty-icon"><Users size={34} /></div>
        <h3>Meet your people</h3>
        <p>People discovery will be connected to Firebase in the next step.</p>
      </div>
    )}

    {activeTab === 'Profile' && (
      <div className="empty-state">
        <div className="empty-icon"><UserRound size={34} /></div>
        <h3>Your profile</h3>
        <p>Profile details and editing will be added next.</p>
      </div>
    )}

    {activeTab === 'Settings' && (
      <div className="empty-state">
        <div className="empty-icon"><Settings size={34} /></div>
        <h3>Settings</h3>
        <p>Theme and account settings will be added next.</p>
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
