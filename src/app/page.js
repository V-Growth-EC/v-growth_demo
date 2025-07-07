'use client';

import Header from './components/Header';
import MainVisualSwiper from './components/MainVisualSwiper';
import { useEffect, useState } from 'react';


export default function HomePage() {
  const [productError, setProductError] = useState('');
  const [products, setProducts] = useState([]);


  // 商品列表用 API 取得
  useEffect(() => {
    // 先取得 customer_id
    fetch('/api/check-auth')
      .then(res => res.json())
      .then(auth => {
        if (auth.customer_id && typeof auth.customer_id === 'number' && auth.customer_id !== -1) {
          // 再用 customer_id 取得商品列表
          return fetch(`/api/product-overview?customer_id=${auth.customer_id}`);
        } else {
          throw new Error('尚未認證');
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProductError('查無商品資料');
        }
      })
      .catch(() => setProductError('商品 API 連線失敗'));
  }, []);

  return (
    <>
      <Header />

      <MainVisualSwiper />

      <div className="is-home-wrap flex-set">
        {/* 側邊欄 */}
        <aside className="aside">
          <nav className="aside-box aside-nav">
            <div className="aside-nav-box">
              <p className="ttl">カテゴリから探す</p>
              <ul className="aside-nav_lists">
                <li className="aside-nav_lists__item"><a href="">パソコン</a></li>
                <li className="aside-nav_lists__item"><a href="">タブレット</a></li>
                <li className="aside-nav_lists__item"><a href="">スマートフォン</a></li>
                <li className="aside-nav_lists__item"><a href="">アクセサリ</a></li>
              </ul>
            </div>
            <div className="aside-nav-box">
              <p className="ttl">サービス</p>
              <ul className="aside-nav_lists">
                <li className="aside-nav_lists__item"><a href="">補償</a></li>
                <li className="aside-nav_lists__item"><a href="">安心・安全</a></li>
                <li className="aside-nav_lists__item"><a href="">遠隔サポート</a></li>
                <li className="aside-nav_lists__item"><a href="">即日利用可能</a></li>
              </ul>
            </div>
            <div className="aside-nav-box">
              <p className="ttl">おすすめコンテンツ</p>
              <ul className="aside-nav_lists">
                <li className="aside-nav_lists__item"><a href="">プログラミング学習</a></li>
                <li className="aside-nav_lists__item"><a href="">科学・電子工作</a></li>
                <li className="aside-nav_lists__item"><a href="">オーディオ</a></li>
                <li className="aside-nav_lists__item"><a href="">中古品</a></li>
              </ul>
            </div>
          </nav>
          <div className="aside-box aside-link aside-link-howtouse">
            <p className="btn">
              <span className="jp">はじめての方へ</span>
              <span className="en">HOW TO USE</span>
              <i className="icon"></i>
            </p>
            <a href="/guidance/terms-of-service" className="box-link"></a>
          </div>
          <div className="aside-box aside-link aside-link-howtouse">
            <p className="btn">
              <span className="jp">お問い合わせ</span>
              <span className="en">CONTACT</span>
              <i className="icon"></i>
            </p>
            <a href="/contact/" className="box-link"></a>
          </div>
        </aside>

        {/* 主要內容（商品列表） */}
        <main className="is-page-main is-home-main">
          <article className="article article-products article-clm">
            <h3>商品列表</h3>
            {productError ? (
              <div style={{ color: 'red' }}>{productError}</div>
            ) : products.length === 0 ? (
              <div>載入中...</div>
            ) : (
              <ul className="article-clm_lists article-clm_lists-3 article-products_lists flex-set">
                {products.map((p) => (
                  <li key={p.product_id} className="article-clm_lists__item article-products_lists__item clm_item">
                    <div className="thumb">
                      <img src={p.thumnnail_img} alt={p.product_name} />
                    </div>
                    <div className="txt">
                      <h3 className="ttl-post">{p.product_name}</h3>
                      <div className="conv flex flex-stretch">
                        <p className="price en">¥{p.price?.toLocaleString()}<small>(税込)</small></p>
                        <p className="btn-more">
                          <a href={`/products?product_id=${p.product_id}`}>カートに入れる</a>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </main>
      </div>

      {/* banner */}
      <div className="ftr-bnr">
        <ul className="ftr-bnr_lists flex flex-stretch">
          <li className="ftr-bnr_lists__item"><a href=""><img src="/images/common/bnr-1.png" alt="" /></a></li>
          <li className="ftr-bnr_lists__item"><a href=""><img src="/images/common/bnr-2.png" alt="" /></a></li>
          <li className="ftr-bnr_lists__item"><a href=""><img src="/images/common/bnr-3.png" alt="" /></a></li>
        </ul>
      </div>
    </>
  );
}
