// src/app/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authCode }),
      });

      const data = await response.json();
      console.log('data:', data, response);
      if (response.ok) {
        router.push('/');
      } else {
        setError(data.error || '認証に失敗しました。');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="is-login flex flex-center-middle">
      <section className="is-login-content">
        <h1>
          <img src="/images/common/logo.png" alt="ICT学習支援機器販売サイト" />
        </h1>
        <h2>ICT学習支援機器販売サイトへようこそ！</h2>
        <p className="lead">認証コードをご入力ください</p>
        
        <form className="form auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="authCode"
              className="form-control"
              placeholder="認証コード"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '認証中...' : 'ログイン'}
          </button>
        </form>
        
        <p className="attention">
          本サイトは株式会社V-Growth向けのサイトです。<br className="sp" />
          事前に通知された認証コードをご入力ください。<br />
          一般の方はご利用いただけないクローズドサイトとなっております。
        </p>
      </section>
    </main>
  );
}
  
  