'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function ProductDetail() {
  useEffect(() => {
    // 初始化 Swiper
    const thumbsSwiper = new Swiper('#thumbnail', {
      modules: [Navigation],
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper('#slide', {
      modules: [Navigation, Thumbs],
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }, []);

  return (
    <>
      <Header />
      
      <div className="is-single-wrap flex-set">
        <main className="is-page-main is-single-main">
          <div className="is-single-hdr flex-set">
            <div className="thumb">
              <div id="slide" className="swiper-single slider-main">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src="/images/products/thumb-1.jpg" alt="" />
                  </div>
                  <div className="swiper-slide">
                    <img src="/images/products/thumb-2.jpg" alt="" />
                  </div>
                  <div className="swiper-slide">
                    <img src="/images/products/thumb-3.jpg" alt="" />
                  </div>
                  <div className="swiper-slide">
                    <img src="/images/products/thumb-4.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div id="thumbnail" className="swiper-single slider-thumbnail">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src="/images/products/thumb_icon-1.jpg" alt="" />
                  </div>
                  <div className="swiper-slide">
                    <img src="/images/products/thumb_icon-2.jpg" alt="" />
                  </div>
                  <div className="swiper-slide">
                    <img src="/images/products/thumb_icon-3.jpg" alt="" />
                  </div>
                  <div className="swiper-slide">
                    <img src="/images/products/thumb_icon-4.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="introduction">
              <h3 className="ttl-post">iPad第9世代256GB、iPad補償付き</h3>
              <ul className="excerpt">
                <li>iPad第9世代 10.2インチ iPad Wi-Fi 256GB シルバー</li>
                <li>【有償オプション】タブレットケース付きワイヤレスBluetooth(R)キーボード</li>
                <li>【有償オプション】充電式アクティブタッチペン（オプション選択可能、別料金）</li>
              </ul>
              <p className="price en">¥85,120<small>(税込)</small></p>
              <p className="campaign">【まとめ買い】5点以上まとめ買いで5%OFF</p>
            </div>
          </div>

          <div className="is-single-body">
            <div className="is-single-body-txt_box is-single-txt_box-detail">
              <h3>商品詳細</h3>
              <p>
                ■iPad第9世代 10.2インチ iPad Wi-Fi 256GB<br />
                【色】シルバー<br />
                【型番】MK2P3J/A
              </p>
              <p>
                ■タブレットケース付きワイヤレスBluetooth(R)キーボード（オプション選択可能、別料金）<br />
                【型番】TK-CAP02BK<br />
                【色】ブラック<br />
                【他】Bluetoothキーボード/ケース一体型/無段階角度調整/マルチペアリング対応/汎用
              </p>
              <p>
                ■充電式アクティブタッチペン（オプション選択可能、別料金）<br />
                【型番】PWTPACST02BK<br />
                【色】ブラック<br />
                【他】タッチペン/スタイラス/リチウム充電式/汎用/ペン先交換可能/ペン先付属なし
              </p>
              <p>■iPad第9世代 256GB Wi-Fi 補償サービス(3年契約)</p>
              <p>※3年分一括価</p>
            </div>

            <div className="is-single-body-txt_box">
              <p><small>※詳細はFAQでもご確認いただけます。</small></p>
              <h3>保守内容</h3>
              <ul>
                <li>自然故障とアクシデント物損(落下・破損・水没など)を含む保守サービスです。</li>
                <li>障害ごとの追加請求や上限金額、回数制限などは一切ありません。</li>
                <li>センドバック方式となりますので、故障機を送付頂き、修理機をご指定場所へ送付致します。</li>
              </ul>
            </div>

            <div className="is-single-body-txt_box">
              <h3>対象範囲外</h3>
              <ul>
                <li>火災・落雷・地震・天災・盗難・紛失は、保守の対象外となります。</li>
                <li>付属品のUSBケーブルは対象外です。</li>
                <li>MDM登録に関するサポートは対象外となります。</li>
                <li>海外での利用でも保守対象となりますが、修理品・代替機器の送付は国内とさせて頂きます。差額お客様負担の場合は対応させて頂きます。</li>
                <li>サービスは「機器シリアル番号」と「お客様名」によって契約・管理されます。持ち主の変更などの場合は対象とされません。</li>
                <li>弊社、及び 弊社指定業者以外の者による修理・改造による故障は範囲外とさせて頂きます。</li>
                <li>内蔵バッテリーの経年劣化は範囲外になります。</li>
                <li>ウィルス感染、ソフトウェアに起因する故障は対象外になります。</li>
                <li>お客様の故意・重大な過失により生じた故障は範囲外となります。</li>
              </ul>
            </div>
          </div>
        </main>

        <aside className="aside aside-cart">
          <div className="aside-cart_box">
            <p className="ttl-product">iPad第9世代256GB、iPad補償付き</p>
            <p className="price en">¥85,120<small>(税込)</small></p>
            <form className="cart-form" action="/cart/add" method="POST">
              <div className="form-group">
                <label htmlFor="quantity">個数を選択してご注文にお進みください。</label>
                <div className="select-wrapper">
                  <select name="quantity" id="quantity" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="option1">スタイラスペン</label>
                <div className="select-wrapper">
                  <select name="option1" id="option1" className="form-control">
                    <option value="with_stylus">あり</option>
                    <option value="without_stylus">なし</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="option2">無線キーボード</label>
                <div className="select-wrapper">
                  <select name="option2" id="option2" className="form-control">
                    <option value="with_keyboard">あり</option>
                    <option value="without_keyboard">なし</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-cart">カートに入れる</button>
            </form>
          </div>
          <div className="aside-bnr">
            <ul className="aside-bnr_lsts">
              <li className="aside-bnr_lists__item">
                <a href=""><img src="/images/common/bnr-1.png" alt="" /></a>
              </li>
              <li className="aside-bnr_lists__item">
                <a href=""><img src="/images/common/bnr-2.png" alt="" /></a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
