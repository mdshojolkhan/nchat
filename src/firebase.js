import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: 'YOUR_API_KEY',
authDomain: 'nchat-2cc6e.firebaseapp.com',
projectId: 'nchat-2cc6e',
storageBucket: 'nchat-2cc6e.firebasestorage.app',
messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
appId: 'YOUR_APP_ID'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
