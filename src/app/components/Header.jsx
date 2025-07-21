import { useEffect, useRef, useState } from 'react';
import useCartStore from '../store/cartStore';
import { useSearchParams } from 'next/navigation';

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const lastScroll = useRef(0);
  const getCartCount = useCartStore(state => state.getCartCount);
  const searchParams = useSearchParams();

  // URL パラメータから検索キーワードを読み取り
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      setSearchKeyword(keyword);
    }
  }, [searchParams]);

  useEffect(() => {
    // まず customer_id を取得
    fetch('/api/check-auth')
      .then(res => res.json())
      .then(auth => {
        if (auth.customer_id && typeof auth.customer_id === 'number' && auth.customer_id !== -1) {
          // customer_id を使用して詳細情報を取得
          return fetch(`/api/customer-detail?customer_id=${auth.customer_id}`);
        } else {
          throw new Error('まだ認証されていません');
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.customer_name) {
          setCustomer(data);
        } else {
          setError('顧客データが見つかりません');
        }
      })
      .catch((error) => {
        setError('API 接続に失敗しました: ' + error.message);
      });
  }, []);

  // ログアウト機能
  const handleLogout = async () => {
    try {
      console.log('ログアウト中...');
      const response = await fetch('/api/auth', { 
        method: 'DELETE',
        credentials: 'include' // cookie を含めることを確認
      });
      
      if (response.ok) {
        console.log('ログアウト成功、リダイレクト中...');
        // ローカル cookie を強制的にクリア（念のため）
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // ログインページにリダイレクト
        window.location.href = '/login';
      } else {
        console.error('ログアウト失敗:', response.status);
        // API が失敗しても強制的にリダイレクト
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('ログアウトエラー:', error);
      // エラーが発生しても強制的に cookie をクリアしてリダイレクト
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

  // drawer メニューを閉じる
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // drawer メニューを切り替え
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // 検索フォーム送信を処理
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      // ホームページにリダイレクトして検索キーワードを含める
      window.location.href = `/?keyword=${encodeURIComponent(searchKeyword.trim())}`;
    }
  };

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
          {/* <button 
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
          </button> */}
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
              <li className="is-nav_lists__item"><a href="/faq/">よくあるご質問</a></li>
              <li className="is-nav_lists__item"><a href="/contents/">お問い合わせ</a></li>
            </ul>
          </nav>
          <div className="is-nav sp">
            <div className={`drawer drawer--right ${isDrawerOpen ? ' drawer-open' : 'drawer-close'}`}>
              <button 
                className="drawer-toggle drawer-hamburger" 
                type="button"
                onClick={toggleDrawer}
              >
                <span className="text"></span>
                <span className="drawer-hamburger-icon"></span>
              </button>
              <nav className="drawer-nav" role="navigation">
                <div id="menu" className="g-nav drawer-menu">
                  <ul className="is-nav_lists flex">
                    <li className="is-nav_lists__item"><a href="/" onClick={closeDrawer}>商品一覧</a></li>
                    <li className="is-nav_lists__item"><a href="/guidance/terms-of-service" onClick={closeDrawer}>はじめての方へ</a></li>
                    <li className="is-nav_lists__item"><a href="/faq/" onClick={closeDrawer}>よくあるご質問</a></li>
                    <li className="is-nav_lists__item"><a href="/contents/" onClick={closeDrawer}>お問い合わせ</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              name="keyword" 
              className="form-control" 
              placeholder="商品を探す" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
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
