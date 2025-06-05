'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CartRelatedSwiper from '../components/CartRelatedSwiper';

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);

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
                    <tr>
                      <td className="item">
                        <div className="thumb"><img src="/images/products/thumb_icon-1.jpg" alt="" /></div>
                        <span className="ttl">iPad第9世代256GB、iPad補償付き</span>
                      </td>
                      <td className="price en">¥86,000</td>
                      <td className="quantity">
                        <input
                          type="number"
                          className="input-text qty text en"
                          name=""
                          defaultValue="1"
                          placeholder=""
                          readOnly
                        />
                      </td>
                      <td className="subtotal en">¥192,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="is-cart-btn">
                <ul className="is-cart-btn_lists flex-set">
                  <li className="is-cart-btn_lists__item reset">
                    <button type="submit" className="button" name="update_cart" value="買い物カゴを更新" disabled>買い物カゴを更新</button>
                  </li>
                  <li className="is-cart-btn_lists__item continue">
                    <a href="/products/single">買い物を続ける</a>
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
                      <td>¥192,000</td>
                    </tr>
                    <tr>
                      <th>送料</th>
                      <td>¥1,000</td>
                    </tr>
                    <tr>
                      <th>合計</th>
                      <td>¥193,000</td>
                    </tr>
                  </tbody>
                </table>
                
                <button type="submit" className="btn-cart">お支払い・発送情報入力</button>
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
