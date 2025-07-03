'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CartCompletePage() {
  return (
    <>
      <Header />
      
      <ul className="is-cart_navi flex flerx-stretch">
        <li>カート</li>
        <li>情報入力</li>
        <li className="current">注文完了</li>
      </ul>

      <div className="is-cart-wrap">
        <main className="is-page-main is-cart-main is-complete-main">
          <h3 className="ttl">注文完了</h3>
          <p className="lead">
            お買い上げありがとうございました。<br />
            商品発送準備が完了次第、発送いたします。
          </p>
          <p className="btn-more"><a href="/">トップページ</a></p>
        </main>
      </div>
    </>
  );
}
