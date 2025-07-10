'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TrademarkPage() {
  return (
    <div style={{ height: '91vh' }}>
      <Header />
      
      <div className="is-guidance-wrap">
        <main className="is-page-main is-guidance-main">
          <section className="is-kv is-kv-lower is-kv-lower-guidance">
            <div className="ttl-primary">
              <h2>
                <span className="jp">商標</span>
                <span className="en"><i>TRADEMARK</i></span>
              </h2>
            </div>
          </section>
          
          <section className="is-guidance-inner">
            <div className="is-guidance-box">
              <ul className="bullets">
                <li className="bullets_item">iPadは、米国および他の国々で登録されたApple Inc.の商標です。</li>
                <li className="bullets_item">その他、このウェブサイト上に記載されている会社名、社名ロゴ、製品名、商品名、サービス名等は、各社、各団体の商標または登録商標です。</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
