import { useState } from 'react';
import {
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { MessageCircle, Mail, Lock, UserRound } from 'lucide-react';

export default function Login({ onLogin }) {
const [isRegister, setIsRegister] = useState(false);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

async function handleSubmit(e) {
e.preventDefault();
setError('');
setLoading(true);

try {
  if (isRegister) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    if (name.trim()) {
      await updateProfile(credential.user, {
        displayName: name.trim()
      });
    }

    await setDoc(doc(db, 'users', credential.user.uid), {
      uid: credential.user.uid,
      name: name.trim(),
      email: email.trim(),
      createdAt: serverTimestamp()
    });
  } else {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }

  onLogin?.(auth.currentUser);
} catch (err) {
  const messages = {
    'auth/invalid-credential': 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।',
    'auth/email-already-in-use': 'এই ইমেইল দিয়ে অ্যাকাউন্ট আছে।',
    'auth/weak-password': 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের দিন।',
    'auth/invalid-email': 'সঠিক ইমেইল ঠিকানা লিখুন।',
    'permission-denied': 'Firebase Security Rules পরীক্ষা করুন।'
  };

  setError(messages[err.code] || err.message || 'কিছু একটা সমস্যা হয়েছে।');
} finally {
  setLoading(false);
}

}

return (
<div className="login-page">
<div className="login-card">
<div className="login-logo">
<MessageCircle size={30} />
</div>

    <h1>Welcome to N-Chat</h1>
    <p className="login-subtitle">
      {isRegister
        ? 'Create your account and connect.'
        : 'Your people. Your conversations.'}
    </p>

    <form onSubmit={handleSubmit}>
      {isRegister && (
        <label className="input-field">
          <UserRound size={19} />
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </label>
      )}

      <label className="input-field">
        <Mail size={19} />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>

      <label className="input-field">
        <Lock size={19} />
        <input
          type="password"
          placeholder="Password (at least 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
        />
      </label>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="login-submit" type="submit" disabled={loading}>
        {loading
          ? 'Please wait...'
          : isRegister
            ? 'Create Account'
            : 'Sign In'}
      </button>
    </form>

    <p className="login-switch">
      {isRegister ? 'Already have an account?' : "Don't have an account?"}
      {' '}
      <button
        type="button"
        onClick={() => {
          setIsRegister(!isRegister);
          setError('');
        }}
      >
        {isRegister ? 'Sign In' : 'Register'}
      </button>
    </p>
  </div>
</div>

);
}
