'use client';

import { useEffect, useState } from 'react';

export default function TestApiPage() {
  const [directResult, setDirectResult] = useState(null);
  const [proxyResult, setProxyResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 測試直接呼叫外部 API
    fetch('https://api.edu-cart.jp/customers/detail/1', {
      headers: {
        'x-api-key': '45eqL3kJYx8BwiqLF81o96Od0pabicaVofzo3n4'
      }
    })
    .then(res => res.json())
    .then(data => {
      setDirectResult({ success: true, data });
    })
    .catch(error => {
      setDirectResult({ success: false, error: error.message });
    });

    // 測試透過 Next.js API 路由
    fetch('/api/customer-detail?customer_id=1')
    .then(res => res.json())
    .then(data => {
      setProxyResult({ success: true, data });
    })
    .catch(error => {
      setProxyResult({ success: false, error: error.message });
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API 測試</h1>
      
      <h2>直接呼叫外部 API</h2>
      <div style={{ 
        padding: '10px', 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        backgroundColor: '#f9f9f9'
      }}>
        {directResult ? (
          directResult.success ? (
            <div>
              <h3 style={{ color: 'green' }}>成功！</h3>
              <pre style={{ 
                backgroundColor: '#fff', 
                padding: '10px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
                {JSON.stringify(directResult.data, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <h3 style={{ color: 'red' }}>錯誤</h3>
              <p>{directResult.error}</p>
            </div>
          )
        ) : (
          <p>載入中...</p>
        )}
      </div>
      
      <h2>透過 Next.js API 路由</h2>
      <div style={{ 
        padding: '10px', 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        marginTop: '10px'
      }}>
        {loading ? (
          <p>載入中...</p>
        ) : proxyResult ? (
          proxyResult.success ? (
            <div>
              <h3 style={{ color: 'green' }}>成功！</h3>
              <pre style={{ 
                backgroundColor: '#fff', 
                padding: '10px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
                {JSON.stringify(proxyResult.data, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <h3 style={{ color: 'red' }}>錯誤</h3>
              <p>{proxyResult.error}</p>
            </div>
          )
        ) : (
          <p>無結果</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          padding: '10px 20px',
          border: '1px solid #007bff',
          borderRadius: '4px'
        }}>
          返回首頁
        </a>
      </div>
    </div>
  );
} 