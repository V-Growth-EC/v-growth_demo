'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '../../store/cartStore';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PaymentPage() {
  const { cart, getProductDetail, removeFromCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    postal: '',
    address: '',
    tel: '',
    email: ''
  });

  // 合計金額を計算
  const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
      const product = getProductDetail(item.product_id);
      if (product) {
        total += product.price * item.quantity;
        // if (item.stylus) extra += 3000;
        // if (item.keyboard) extra += 5000;
      }
    });
    return total;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // 必須項目のチェック
    if (!formData.name || !formData.postal || !formData.address || !formData.tel || !formData.email) {
      setError('すべての項目を入力してください。');
      return false;
    }

    // 郵便番号の形式チェック
    const postalRegex = /^\d{3}-?\d{4}$/;
    if (!postalRegex.test(formData.postal)) {
      setError('郵便番号は正しい形式で入力してください（例：123-4567）。');
      return false;
    }

    // 電話番号の形式チェック
    const telRegex = /^\d{2,4}-?\d{2,4}-?\d{4}$/;
    if (!telRegex.test(formData.tel)) {
      setError('電話番号は正しい形式で入力してください（例：03-1234-5678）。');
      return false;
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('メールアドレスは正しい形式で入力してください。');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 商品情報を準備
      const products = {
        ids: cart.map(item => item.product_id).join(','),
        names: cart.map(item => {
          const product = getProductDetail(item.product_id);
          return product ? product.product_name : '';
        }).join(',')
      };

      // 完全な注文データを準備
      const orderData = {
        orderId: `ORDER_${Date.now()}`,
        customerInfo: formData,
        products: products,
        pricing: {
          total: calculateTotal()
        }
      };

      // ユーザー入力のデータ
      const customerInfo = {
        name: formData.name,
        postal: formData.postal,
        address: formData.address,
        tel: formData.tel,
        email: formData.email
      };

      // 商品情報
      const productsInfo = {
        ids: cart.map(item => item.product_id).join(','),
        names: cart.map(item => {
          const product = getProductDetail(item.product_id);
          return product ? product.product_name : '';
        }).join(',')
      };

      // 金額情報
      const pricingInfo = {
        total: calculateTotal()
      };

      const response = await fetch('/api/gmo-linkpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          customerInfo,
          products: productsInfo,
          pricing: pricingInfo
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          setError('決済ページへのリダイレクトに失敗しました。');
        }
      } else {
        setError('決済処理に失敗しました。');
      }
    } catch (error) {
      console.error('決済エラー:', error);
      setError('決済処理中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }

    // console.log('res', res);
    // const data = await res.json();
    // console.log('data', data);
    // const params = data.epsilonParams;
    // console.log('params', params);
    // // フォームを生成して自動送信
    // const form = document.createElement('form');
    // form.method = 'POST';
    // form.action = 'https://beta.epsilon.jp/cgi-bin/order/receive_order.cgi';
    // Object.entries(params).forEach(([k, v]) => {
    //   const input = document.createElement('input');
    //   input.type = 'hidden';
    //   input.name = k;
    //   input.value = v;
    //   form.appendChild(input);
    // });
    // document.body.appendChild(form);
    // form.submit();
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>カートが空です</h1>
          <p>商品を追加してから決済ページに進んでください。</p>
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
            商品一覧に戻る
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="payment-page">
        <div className="container">
          <h1>決済情報入力</h1>
          
          <div className="order-summary">
            <h2>注文内容</h2>
            <div className="cart-items">
              {cart.map((item) => {
                const product = getProductDetail(item.product_id);
                return product ? (
                  <div key={item.product_id} className="cart-item">
                    <div className="item-info">
                      <h3>{product.product_name}</h3>
                      <p>数量: {item.quantity}</p>
                      <p>価格: ¥{product.price?.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="remove-btn"
                    >
                      削除
                    </button>
                  </div>
                ) : null;
              })}
            </div>
            <div className="total">
              <h3>合計: ¥{calculateTotal().toLocaleString()}</h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <h2>お客様情報</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name">お名前 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal">郵便番号 *</label>
              <input
                type="text"
                id="postal"
                name="postal"
                value={formData.postal}
                onChange={handleInputChange}
                placeholder="例: 123-4567"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">住所 *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tel">電話番号 *</label>
              <input
                type="tel"
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleInputChange}
                placeholder="例: 03-1234-5678"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">メールアドレス *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? '処理中...' : '決済に進む'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
