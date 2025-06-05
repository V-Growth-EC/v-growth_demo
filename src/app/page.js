'use client';

import Header from './components/Header';
import MainVisualSwiper from './components/MainVisualSwiper';

export default function HomePage() {
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
            <ul className="article-clm_lists article-clm_lists-3 article-products_lists flex-set">
              <li className="article-clm_lists__item article-products_lists__item clm_item">
                <div className="thumb">
                  <img src="/images/products/thumb-1.jpg" alt="" />
                </div>
                <div className="txt">
                  <h3 className="ttl-post">iPad第9世代256GB、iPad補償付き</h3>
                  <ul className="excerpt">
                    <li>iPad第9世代 10.2インチ iPad Wi-Fi 256GB シルバー</li>
                    <li>【有償オプション】タブレットケース付きワイヤレスBluetooth(R)キーボード</li>
                    <li>【有償オプション】充電式アクティブタッチペン（オプション選択可能、別料金）</li>
                  </ul>
                  <div className="campaign">【まとめ買い】5点以上まとめ買いで5%OFF</div>
                  <div className="conv flex flex-stretch">
                    <p className="price en">¥85,120<small>(税込)</small></p>
                    <p className="btn-more"><a href="/products">カートに入れる</a></p>
                  </div>
                </div>
              </li>
              <li className="article-clm_lists__item article-products_lists__item clm_item">
                <div className="thumb">
                  <img src="/images/products/thumb-2.jpg" alt="" />
                </div>
                <div className="txt">
                  <h3 className="ttl-post">iPad第9世代256GB、iPad補償付き</h3>
                  <ul className="excerpt">
                    <li>iPad第9世代 10.2インチ iPad Wi-Fi 256GB シルバー</li>
                    <li>【有償オプション】タブレットケース付きワイヤレスBluetooth(R)キーボード</li>
                    <li>【有償オプション】充電式アクティブタッチペン（オプション選択可能、別料金）</li>
                  </ul>
                  <div className="campaign">【まとめ買い】5点以上まとめ買いで5%OFF</div>
                  <div className="conv flex flex-stretch">
                    <p className="price en">¥85,120<small>(税込)</small></p>
                    <p className="btn-more"><a href="/products">カートに入れる</a></p>
                  </div>
                </div>
              </li>
              <li className="article-clm_lists__item article-products_lists__item clm_item">
                <div className="thumb">
                  <img src="/images/products/thumb-3.jpg" alt="" />
                </div>
                <div className="txt">
                  <h3 className="ttl-post">iPad第9世代256GB、iPad補償付き</h3>
                  <ul className="excerpt">
                    <li>iPad第9世代 10.2インチ iPad Wi-Fi 256GB シルバー</li>
                    <li>【有償オプション】タブレットケース付きワイヤレスBluetooth(R)キーボード</li>
                    <li>【有償オプション】充電式アクティブタッチペン（オプション選択可能、別料金）</li>
                  </ul>
                  <div className="campaign">【まとめ買い】5点以上まとめ買いで5%OFF</div>
                  <div className="conv flex flex-stretch">
                    <p className="price en">¥85,120<small>(税込)</small></p>
                    <p className="btn-more"><a href="/products">カートに入れる</a></p>
                  </div>
                </div>
              </li>
              <li className="article-clm_lists__item article-products_lists__item clm_item">
                <div className="thumb">
                  <img src="/images/products/thumb-4.jpg" alt="" />
                </div>
                <div className="txt">
                  <h3 className="ttl-post">iPad第9世代256GB、iPad補償付き</h3>
                  <ul className="excerpt">
                    <li>iPad第9世代 10.2インチ iPad Wi-Fi 256GB シルバー</li>
                    <li>【有償オプション】タブレットケース付きワイヤレスBluetooth(R)キーボード</li>
                    <li>【有償オプション】充電式アクティブタッチペン（オプション選択可能、別料金）</li>
                  </ul>
                  <div className="campaign">【まとめ買い】5点以上まとめ買いで5%OFF</div>
                  <div className="conv flex flex-stretch">
                    <p className="price en">¥85,120<small>(税込)</small></p>
                    <p className="btn-more"><a href="/products">カートに入れる</a></p>
                  </div>
                </div>
              </li>
              <li className="article-clm_lists__item article-products_lists__item clm_item">
                <div className="thumb">
                  <img src="/images/products/thumb-5.jpg" alt="" />
                </div>
                <div className="txt">
                  <h3 className="ttl-post">iPad第9世代256GB、iPad補償付き</h3>
                  <ul className="excerpt">
                    <li>iPad第9世代 10.2インチ iPad Wi-Fi 256GB シルバー</li>
                    <li>【有償オプション】タブレットケース付きワイヤレスBluetooth(R)キーボード</li>
                    <li>【有償オプション】充電式アクティブタッチペン（オプション選択可能、別料金）</li>
                  </ul>
                  <div className="campaign">【まとめ買い】5点以上まとめ買いで5%OFF</div>
                  <div className="conv flex flex-stretch">
                    <p className="price en">¥85,120<small>(税込)</small></p>
                    <p className="btn-more"><a href="/products">カートに入れる</a></p>
                  </div>
                </div>
              </li>
            </ul>
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
