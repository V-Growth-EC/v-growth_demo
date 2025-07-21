'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CartRelatedSwiper from '../components/CartRelatedSwiper';
import useCartStore from '../store/cartStore';

export default function CartPage() {
  const { cart, getProductDetail, updateQuantity, removeFromCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    async function fetchProductDetails() {
      const details = {};
      for (const item of cart) {
        // productDetailsCache を直接使用
        let detail = useCartStore.getState().getProductDetail(item.product_id);
        if (!detail) {
          try {
            const res = await fetch(`/api/product-detail?product_id=${item.product_id}`);
            detail = await res.json();
            useCartStore.getState().setProductDetail(item.product_id, detail);
          } catch (error) {
            console.error('商品詳細取得エラー:', error);
          }
        }
        details[item.product_id] = detail;
      }
      setProductDetails(details);
      setLoading(false);
    }

    if (cart.length > 0) {
      fetchProductDetails();
    } else {
      setProductDetails({});
      setLoading(false);
    }
  }, [cart]);

  const calculateSubtotal = (item) => {
    const product = productDetails[item.product_id];
    if (!product) return 0;
    
    let basePrice = product.price || 0;
    // if (item.stylus) extra += 3000;
    // if (item.keyboard) extra += 5000;
    
    return basePrice * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleQuantityBlur = (productId, quantity) => {
    // 即座に数量を更新（オプション、または onBlur 時のみ更新）
    if (quantity >= 1) {
      updateQuantity(productId, quantity);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>カートが空です</h1>
          <p>商品を追加してからカートページにアクセスしてください。</p>
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
            商品一覧に戻る
          </a>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>読み込み中...</p>
        </div>
      </>
    );
  }

  return (
    <div className="is-cart">
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
                    {cart.length === 0 ? "" : (
                      cart.map((item, idx) => {
                        const product = productDetails[item.product_id] || {};
                        return (
                          <tr key={idx}>
                            <td className="item">
                              <div className="thumb">
                                <i
                                  className="delete"
                                  onClick={() => removeFromCart(item.product_id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <img src="images/common/ic-cross.svg" alt="削除" />
                                </i>
                                <img src={product.product_img?.[0] || ''} alt="" /></div>
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
                                min={1}
                                onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value) || 1)}
                                onBlur={(e) => handleQuantityBlur(item.product_id, parseInt(e.target.value) || 1)}
                              />
                            </td>
                            <td className="subtotal en">¥{calculateSubtotal(item).toLocaleString()}</td>
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
                    {/* <button type="submit" className="button" name="update_cart" value="買い物カゴを更新" disabled>買い物カゴを更新</button> */}
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
              <form className="cart-form" action="/cart/payment" method="POST">
                <table className="table_clm table_clm-cart_side">
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={2}>金額計算中...</td></tr>
                    ) : (
                      <>
                        <tr>
                          <th>小計</th>
                          <td>¥{calculateTotal().toLocaleString()}</td>
                        </tr>
                        <tr>
                          <th>送料</th>
                                                     <td>¥{(1000).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <th>合計</th>
                          <td>¥{calculateTotal().toLocaleString()}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
                
                <button className="btn-cart" type="submit">
                  注文手続きに進む
                </button>
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
    </div>
  );
}
