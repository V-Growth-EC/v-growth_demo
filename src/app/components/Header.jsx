import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const lastScroll = useRef(0);

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
          ようこそ<span>山田学習塾</span>様
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
            <button type="submit" className="btn btn-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <p className="cart">
            <a href="/cart"><i className="fa-solid fa-cart-shopping"></i></a>
            <i className="count en">12</i>
          </p>
        </div>
      </div>
    </header>
  );
}
