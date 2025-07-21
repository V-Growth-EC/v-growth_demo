'use client';

import { useEffect, useState, Suspense } from 'react';
import Header from '../components/Header';
import { useSearchParams } from 'next/navigation';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import useCartStore from '../store/cartStore';

// useSearchParams を使用するコンポーネントを作成
function ProductDetailContent() {
  const searchParams = useSearchParams();
  const product_id = searchParams.get('product_id');
  const { getProductDetail, setProductDetail } = useCartStore();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [stylus, setStylus] = useState(true);
  const [keyboard, setKeyboard] = useState(true);

  useEffect(() => {
    if (!product_id) {
      setError('product_id が存在しません');
      setIsDataLoaded(true);
      return;
    }
    let detail = getProductDetail(product_id);
    if (detail) {
      setProduct(detail);
      setIsDataLoaded(true);
    } else {
      fetch(`/api/product-detail?product_id=${product_id}`)
        .then(res => res.json())
        .then(data => {
          if (data.product_id) {
            setProduct(data);
            setProductDetail(product_id, data); // キャッシュに保存
          } else {
            setError('商品データが見つかりません');
          }
        })
        .catch(() => setError('API 接続に失敗しました'))
        .finally(() => {
          setIsDataLoaded(true);
        });
    }
  }, [product_id, getProductDetail, setProductDetail]);

  useEffect(() => {
    // データの読み込みが完了し、商品データが存在する場合のみ Swiper を初期化
    if (isDataLoaded && product && product.product_img && product.product_img.length > 0) {
      // Swiper を初期化
      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Thumbs],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: {
            el: '.swiper-thumbs',
            slidesPerView: 4,
            spaceBetween: 10,
            freeMode: true,
            watchSlidesProgress: true,
          },
        },
      });

      return () => {
        if (swiper) {
          swiper.destroy();
        }
      };
    }
  }, [isDataLoaded, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.product_id, quantity, stylus, keyboard);
      alert('カートに追加しました');
    }
  };

  if (!isDataLoaded) {
    return (
      <>
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>読み込み中...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>エラー</h1>
          <p>{error}</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>商品が見つかりません</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="product-detail-page">
        <div className="container">
          <div className="product-content">
            <div className="product-images">
              <div className="swiper">
                <div className="swiper-wrapper">
                  {product.product_img && product.product_img.length > 0 ? (
                    product.product_img.map((img, index) => (
                      <div key={index} className="swiper-slide">
                        <img src={img} alt={`${product.product_name} - ${index + 1}`} />
                      </div>
                    ))
                  ) : (
                    <div className="swiper-slide">
                      <img src={product.thumnnail_img} alt={product.product_name} />
                    </div>
                  )}
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
              
              {product.product_img && product.product_img.length > 1 && (
                <div className="swiper-thumbs">
                  <div className="swiper-wrapper">
                    {product.product_img.map((img, index) => (
                      <div key={index} className="swiper-slide">
                        <img src={img} alt={`${product.product_name} - ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="product-info">
              <h1>{product.product_name}</h1>
              <p className="price">¥{product.price?.toLocaleString()}</p>
              <p className="description">{product.description}</p>

              <div className="product-options">
                <div className="option-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={stylus}
                      onChange={(e) => setStylus(e.target.checked)}
                    />
                    スタイラス (+¥3,000)
                  </label>
                </div>
                <div className="option-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={keyboard}
                      onChange={(e) => setKeyboard(e.target.checked)}
                    />
                    キーボード (+¥5,000)
                  </label>
                </div>
              </div>

              <div className="quantity-selector">
                <label>数量:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>

              <button onClick={handleAddToCart} className="add-to-cart-btn">
                カートに追加
              </button>
            </div>
          </div>

          <div className="related-products">
            <h2>関連商品</h2>
            <div className="related-products-grid">
              {/* 関連商品のリストを表示 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>読み込み中...</p>
        </div>
      </>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}
