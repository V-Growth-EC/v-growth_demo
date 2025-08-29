// src/app/gmorouter/layout.js
import '../global.scss';
import '../../../public/css/drawer.min.css';
import '../import.scss';

export const metadata = {
  title: '処理中 - ICT学習支援機器販売サイト',
  description: '注文情報を処理中です',
  robots: 'noindex,nofollow', // 避免搜索引擎索引此頁面
};

export default function GmoRouterLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon_16-16.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon_32-32.ico"/>
        <link rel="icon" type="image/png" sizes="48x48" href="/images/favicon/favicon_48-48.ico"/>
        
        {/* 外部 CSS 和字體 */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/swiper.min.css" />
        
        {/* 內嵌樣式 - 用於 loading 動畫 */} 
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Noto Sans JP', sans-serif;
            background: #ffffff;
          }
          
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            background: white;
            padding: 20px;
          }
          
          .loading-container .ttl {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
            color: #333;
            font-family: 'Noto Sans JP', sans-serif;
          }
          
          .loading-container .lead {
            font-size: 14px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 30px;
            font-family: 'Noto Sans JP', sans-serif;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* 響應式設計 */
          @media (max-width: 768px) {
            .loading-container {
              min-height: 100vh;
              padding: 40px 20px;
            }
            
            .loading-container .ttl {
              font-size: 18px;
            }
            
            .loading-container .lead {
              font-size: 13px;
            }
            
            .loading-spinner {
              width: 32px;
              height: 32px;
              border-width: 3px;
            }
          }
          
          @media (max-width: 480px) {
            .loading-container {
              padding: 30px 15px;
            }
            
            .loading-container .ttl {
              font-size: 16px;
              margin-bottom: 10px;
            }
            
            .loading-container .lead {
              font-size: 12px;
              margin-bottom: 25px;
            }
            
            .loading-spinner {
              width: 28px;
              height: 28px;
            }
          }
        `}</style>
      </head>
      <body className="gmorouter-body">
        {children}
      </body>
    </html>
  );
}
