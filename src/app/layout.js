// src/app/layout.js
import './global.scss';
import './import.scss';
import Footer from './components/Footer';

export const metadata = {
  title: 'ICT学習支援機器販売サイト',
  description: '',
  robots: 'ALL',
  openGraph: {
    title: 'ICT学習支援機器販売サイト',
    description: '',
    images: [
      'https://www.sonpo.or.jp/sme_insurance/assets/images/ogp.png',
    ],
    url: 'https://www.sonpo.or.jp/sme_insurance/',
    type: 'website',
    siteName: 'ICT学習支援機器販売サイト',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon_16-16.ico"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon_24-24.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon_32-32.ico"/>
        <link rel="icon" type="image/png" sizes="48x48" href="/images/favicon/favicon_48-48.ico"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon_64-64.ico"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon_128-128.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon_256-256.ico"/>
        {/* 其他 favicon 可依需求補上 */}
        {/* 字體與外部 CSS */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/drawer/3.2.1/css/drawer.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/swiper.min.css" />
      </head>
      <body className="is-page site-body">
        {children}
        <Footer />
      </body>
    </html>
  );
}

