import { useEffect, useRef, useState } from 'react';
import useCartStore from '../store/cartStore';

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const lastScroll = useRef(0);
  const getCartCount = useCartStore(state => state.getCartCount);

  useEffect(() => {
    // 先取得 customer_id
    fetch('/api/check-auth')
      .then(res => res.json())
      .then(auth => {
        if (auth.customer_id && typeof auth.customer_id === 'number' && auth.customer_id !== -1) {
          // 再用 customer_id 取得詳細資料
          return fetch(`/api/customer-detail?customer_id=${auth.customer_id}`);
        } else {
          throw new Error('尚未認證');
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.customer_name) {
          setCustomer(data);
        } else {
          setError('查無客戶資料');
        }
      })
      .catch((error) => {
        setError('API 連線失敗: ' + error.message);
      });
  }, []);

  // 登出功能
  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      const response = await fetch('/api/auth', { 
        method: 'DELETE',
        credentials: 'include' // 确保包含cookie
      });
      
      if (response.ok) {
        console.log('Logout successful, redirecting...');
        // 强制清除本地cookie（以防万一）
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // 重定向到登录页
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.status);
        // 即使API失败，也强制重定向
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('登出錯誤:', error);
      // 即使出错，也强制清除cookie并重定向
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setIsScroll(scrollTop < lastScroll.current);
      lastScroll.current = scrollTop;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header header-front header-lower-home${isScroll ? ' scroll' : ''}`}>
      <div className="header-news flex">
        <p className="header-news_ttl">キャンペーンニュースが入ります</p>
        <p className="header-author">
          ようこそ
          <span style={customer ? { color: `#${customer.customer_color}` } : {}}>
            {customer ? customer.customer_name : 'V-Growth デモサイト'}
          </span>
          様
          <button 
            onClick={handleLogout}
            style={{
              marginLeft: '10px',
              padding: '2px 8px',
              fontSize: '12px',
              background: '#000',
              border: '1px solid #ccc',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            ログアウト
          </button>
        </p>
      </div>
      <div className="header-wrap flex flex-stretch">
        <h1 className="logo">
          <a href="/">
            <img src="/images/common/logo.png" alt="ICT学習支援機器販売サイト" />
          </a>
        </h1>
        <div className="header-r_side flex flex-center">
          <nav className="is-nav pc">
            <ul className="is-nav_lists flex">
              <li className="is-nav_lists__item"><a href="/">商品一覧</a></li>
              <li className="is-nav_lists__item"><a href="/guidance/terms-of-service">はじめての方へ</a></li>
              <li className="is-nav_lists__item"><a href="/">ご案内</a></li>
              <li className="is-nav_lists__item"><a href="/faq/">よくあるご質問</a></li>
              <li className="is-nav_lists__item"><a href="/contents/">お問い合わせ</a></li>
            </ul>
          </nav>
          <div className="is-nav sp">
            <div className="drawer drawer--right">
              <button className="drawer-toggle drawer-hamburger" type="button">
                <span className="text"></span>
                <span className="drawer-hamburger-icon"></span>
              </button>
              <nav className="drawer-nav" role="navigation">
                <div id="menu" className="g-nav drawer-menu">
                  <ul className="is-nav_lists flex">
                    <li className="is-nav_lists__item"><a href="/">商品一覧</a></li>
                    <li className="is-nav_lists__item"><a href="/guidance/terms-of-service">はじめての方へ</a></li>
                    <li className="is-nav_lists__item"><a href="/">ご案内</a></li>
                    <li className="is-nav_lists__item"><a href="/faq/">よくあるご質問</a></li>
                    <li className="is-nav_lists__item"><a href="/contents/">お問い合わせ</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <form className="header-search" action="/search" method="GET">
            <input type="text" name="keyword" className="form-control" placeholder="商品を探す" />
            <button 
              type="submit" 
              className="btn btn-search" 
              
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <p className="cart">
            <a href="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </a>
            <i className="count en">{getCartCount()}</i>
          </p>
        </div>
      </div>
    </header>
  );
}
