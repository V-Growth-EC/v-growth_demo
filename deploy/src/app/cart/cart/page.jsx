'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: '',
    postal: '',
    prefecture: '',
    address: '',
    tel: '',
    email: '',
    payment_method: 'credit'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      name: 'お名前',
      postal: '郵便番号',
      prefecture: '都道府県',
      address: '住所',
      tel: '電話番号',
      email: 'メールアドレス'
    };

    // 必須項目のチェック
    for (const [id, label] of Object.entries(requiredFields)) {
      if (!formData[id]) {
        newErrors[id] = `${label}を入力してください`;
      }
    }

    // 郵便番号の形式チェック
    if (formData.postal) {
      const postalPattern = /^\d{3}-?\d{4}$/;
      if (!postalPattern.test(formData.postal)) {
        newErrors.postal = '郵便番号は正しい形式で入力してください（例：123-4567）';
      }
    }

    // 電話番号の形式チェック
    if (formData.tel) {
      const telPattern = /^\d{2,4}-?\d{2,4}-?\d{3,4}$/;
      if (!telPattern.test(formData.tel)) {
        newErrors.tel = '電話番号は正しい形式で入力してください（例：03-1234-5678）';
      }
    }

    // メールアドレスの形式チェック
    if (formData.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'メールアドレスは正しい形式で入力してください';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // フォームの送信処理
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Header />
      
      <ul className="is-cart_navi flex flerx-stretch">
        <li>カート</li>
        <li className="current">情報入力</li>
        <li>注文完了</li>
      </ul>

      <div className="is-cart-wrap is-payment">
        <div className="is-cart-wrap-flex flex-set">
          <main className="is-page-main is-cart-main">
            <form className="cart-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">お名前<span className="required">必須</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="postal">郵便番号<span className="required">必須</span></label>
                <input
                  type="text"
                  id="postal"
                  name="postal"
                  value={formData.postal}
                  onChange={handleChange}
                  pattern="\d{3}-?\d{4}"
                  placeholder="例：123-4567"
                  required
                />
                {errors.postal && <span className="error-message">{errors.postal}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="prefecture">都道府県<span className="required">必須</span></label>
                <div className="select-wrapper">
                  <select
                    id="prefecture"
                    name="prefecture"
                    value={formData.prefecture}
                    onChange={handleChange}
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="北海道">北海道</option>
                    <option value="青森県">青森県</option>
                    <option value="岩手県">岩手県</option>
                    <option value="宮城県">宮城県</option>
                    <option value="秋田県">秋田県</option>
                    <option value="山形県">山形県</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="埼玉県">埼玉県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="富山県">富山県</option>
                    <option value="石川県">石川県</option>
                    <option value="福井県">福井県</option>
                    <option value="山梨県">山梨県</option>
                    <option value="長野県">長野県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="滋賀県">滋賀県</option>
                    <option value="京都府">京都府</option>
                    <option value="大阪府">大阪府</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="奈良県">奈良県</option>
                    <option value="和歌山県">和歌山県</option>
                    <option value="鳥取県">鳥取県</option>
                    <option value="島根県">島根県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="広島県">広島県</option>
                    <option value="山口県">山口県</option>
                    <option value="徳島県">徳島県</option>
                    <option value="香川県">香川県</option>
                    <option value="愛媛県">愛媛県</option>
                    <option value="高知県">高知県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="佐賀県">佐賀県</option>
                    <option value="長崎県">長崎県</option>
                    <option value="熊本県">熊本県</option>
                    <option value="大分県">大分県</option>
                    <option value="宮崎県">宮崎県</option>
                    <option value="鹿児島県">鹿児島県</option>
                    <option value="沖縄県">沖縄県</option>
                  </select>
                </div>
                {errors.prefecture && <span className="error-message">{errors.prefecture}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">住所<span className="required">必須</span></label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tel">電話番号<span className="required">必須</span></label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  pattern="\d{2,4}-?\d{2,4}-?\d{3,4}"
                  placeholder="例：03-1234-5678"
                  required
                />
                {errors.tel && <span className="error-message">{errors.tel}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">メールアドレス<span className="required">必須</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </form>
          </main>

          <aside className="aside aside-cart aside-cart-peyment">
            <div className="aside-cart_box">
              <p className="ttl-main">お買い物カゴ</p>
              <form className="cart-form" onSubmit={handleSubmit}>
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

                <div className="howto_payment">
                  <p className="ttl-main">決済方法</p>
                  <div className="payment-options">
                    <label className="payment-options_item">
                      <input
                        type="radio"
                        name="payment_method"
                        value="credit"
                        checked={formData.payment_method === 'credit'}
                        onChange={handleChange}
                      />
                      <span>クレジットカード決済</span>
                    </label>
                    <label className="payment-options_item">
                      <input
                        type="radio"
                        name="payment_method"
                        value="bank"
                        checked={formData.payment_method === 'bank'}
                        onChange={handleChange}
                      />
                      <span>銀行振込</span>
                    </label>
                    <label className="payment-options_item">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        checked={formData.payment_method === 'cod'}
                        onChange={handleChange}
                      />
                      <span>代金引換</span>
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn-cart">決済する</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
