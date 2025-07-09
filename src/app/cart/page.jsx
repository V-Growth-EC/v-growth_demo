'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CartRelatedSwiper from '../components/CartRelatedSwiper';
import useCartStore from '../store/cartStore';

export default function CartPage() {
  const { cart } = useCartStore();
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    // 批量查詢所有購物車商品
    async function fetchAllDetails() {
      const details = {};
      for (const item of cart) {
        if (!details[item.product_id]) {
          const res = await fetch(`/api/product-detail?product_id=${item.product_id}`);
          details[item.product_id] = await res.json();
        }
      }
      setProductDetails(details);
    }
    if (cart.length > 0) fetchAllDetails();
  }, [cart]);

  // 計算小計
  const getSubtotal = (item) => {
    const product = productDetails[item.product_id] || {};
    let base = product.price || 0;
    let extra = 0;
    if (item.stylus) extra += 3000;
    if (item.keyboard) extra += 5000;
    return (base + extra) * item.quantity;
  };

  const subtotal = cart.reduce((sum, item) => sum + getSubtotal(item), 0);
  const shipping = cart.length > 0 ? 1000 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      
      <ul className="is-cart_navi flex flerx-stretch">
        <li className="current">カート</li>
        <li>情報入力</li>
        <li>注文完了</li>
      </ul>

      <div className="is-cart-wrap">
        <div className="is-cart-wrap-flex flex-set">
          <main className="is-page-main is-cart-main">
            <form className="cart-form" action="" method="POST">
              <div className="is-cart-table">
                <table className="table_clm table_clm-cart">
                  <tbody>
                    <tr>
                      <th className="item">商品</th>
                      <th className="price">金額</th>
                      <th className="quantity">個数</th>
                      <th className="subtotal">小計</th>
                    </tr>
                    {cart.length === 0 ? (
                      <tr><td colSpan={4} style={{textAlign:'center'}}>カートは空です</td></tr>
                    ) : (
                      cart.map((item, idx) => {
                        const product = productDetails[item.product_id] || {};
                        return (
                          <tr key={idx}>
                            <td className="item">
                              <div className="thumb"><img src={product.product_img?.[0] || ''} alt="" /></div>
                              <span className="ttl">{product.product_name || '---'}</span>
                              <div style={{fontSize:'12px',color:'#888'}}>
                                {item.stylus ? 'スタイラスペンあり' : 'スタイラスペンなし'}／{item.keyboard ? '無線キーボードあり' : '無線キーボードなし'}
                              </div>
                            </td>
                            <td className="price en">¥{product.price?.toLocaleString() || 0}</td>
                            <td className="quantity">
                              <input
                                type="number"
                                className="input-text qty text en"
                                name=""
                                value={item.quantity}
                                readOnly
                              />
                            </td>
                            <td className="subtotal en">¥{getSubtotal(item).toLocaleString()}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="is-cart-btn">
                <ul className="is-cart-btn_lists flex-set">
                  <li className="is-cart-btn_lists__item reset">
                    <button type="submit" className="button" name="update_cart" value="買い物カゴを更新" disabled>買い物カゴを更新</button>
                  </li>
                  <li className="is-cart-btn_lists__item continue">
                    <a href="/">買い物を続ける</a>
                  </li>
                </ul>
              </div>
            </form>
          </main>
          
          <aside className="aside aside-cart aside-cart-item">
            <div className="aside-cart_box">
              <p className="ttl-main">お買い物カゴ</p>
              <form className="cart-form" action="/cart/add" method="POST">
                <table className="table_clm table_clm-cart_side">
                  <tbody>
                    <tr>
                      <th>小計</th>
                      <td>¥{subtotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>送料</th>
                      <td>¥{shipping.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>合計</th>
                      <td>¥{total.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
                
                <p className="btn-more">
                  <a href="/cart/cart">お支払い・発送情報入力</a>
                </p>
                <ul className="cart-nav">
                  <li><a href="">送料について</a></li>
                  <li><a href="">返品・交換について</a></li>
                  <li><a href="">プライバシーポリシー</a></li>
                </ul>
              </form>
            </div>
          </aside>
        </div>
        <CartRelatedSwiper />
      </div>
    </>
  );
}
