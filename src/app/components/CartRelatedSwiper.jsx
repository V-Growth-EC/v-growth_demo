// src/app/components/CartRelatedSwiper.jsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function CartRelatedSwiper() {
  const relatedItems = [1, 2, 3, 1, 2, 3, 1, 2, 3];

  return (
    <div className="swiper_clm-2 is-cart-related">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          768: { slidesPerView: 3 }
        }}
        className="my-swiper"
      >
        {relatedItems.map((num, index) => (
          <SwiperSlide key={index}>
            <div className="thumb">
              <img src={`/images/products/thumb_related-${num}.jpg`} alt="" />
            </div>
            <div className="txt">
              <h3 className="ttl-post">iPad Pencil</h3>
              <div className="conv flex flex-stretch">
                <p className="price en">¥12,000<small>(税込)</small></p>
                <p className="btn-more" >
                  <a href="/products" >カートに入れる</a>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}