'use client';

import { useEffect, useState } from 'react';

export default function GmoRouterPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // 確保在客戶端渲染後才執行
    if (typeof window === 'undefined') return;

    // 使用 URLSearchParams 獲取參數
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('order_number');
    const result = urlParams.get('result');
    
    console.log("URL params:", window.location.search);
    console.log("orderNumber:", orderNumber);
    console.log("result:", result);

    // 檢查 result 是否為 false
    if (result === 'false') {
      console.log("Payment result is false - showing error");
      setErrorMessage('システムエラーが発生しました。工作人員までお問い合わせください。');
      setIsLoading(false);
      return;
    }

    if (!orderNumber) {
      console.log("no orderNumber");
      setErrorMessage('注文番号が見つかりません。工作人員までお問い合わせください。');
      setIsLoading(false);
      return;
    }

    let redirectUrl;

    if (orderNumber?.startsWith('A')) {
      redirectUrl = 'https://demo3.edu-cart.jp/cart/complete';
    } else if (orderNumber?.startsWith('B')) {
      redirectUrl = 'https://demo4.edu-cart.jp/cart/complete';
    } else {
      setErrorMessage('無効な注文番号です。工作人員までお問い合わせください。');
      setIsLoading(false);
      return;
    }

    console.log("Redirecting to:", redirectUrl);
    
    // 延遲重定向以確保頁面完全載入
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
    
  }, []);

  // 如果有錯誤訊息，顯示錯誤
  if (errorMessage) {
    return (
      <div className="loading-container">
        <h3 className="ttl">エラー</h3>
        <p className="lead">{errorMessage}</p>
      </div>
    );
  }

  // 載入狀態
  return (
    <div className="loading-container">
      <h3 className="ttl">処理中...</h3>
      <p className="lead">
        注文情報を確認中です。<br />
        しばらくお待ちください。
      </p>
      <div className="loading-spinner"></div>
    </div>
  );
}