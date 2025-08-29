'use client';

import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useCartStore from '../../store/cartStore';

export default function CartCompletePage() {
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    // ネイティブJavaScriptでURLパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const result = urlParams.get('result');
    const orderNumber = urlParams.get('order_number');
    const transCode = urlParams.get('trans_code');
    const userId = urlParams.get('user_id');

    // result=1の場合、支払い成功としてカートをクリア
    if (result === '1') {
      clearCart();
      console.log('支払い成功、カートをクリアしました', {
        orderNumber,
        transCode,
        userId
      });
    }
  }, [clearCart]);

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
