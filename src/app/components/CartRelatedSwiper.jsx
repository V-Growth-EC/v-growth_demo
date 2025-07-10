// src/app/components/CartRelatedSwiper.jsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function CartRelatedSwiper() {
  const relatedItems = [1, 2, 3, 1, 2, 3, 1, 2, 3];

  return (
    <div className="swiper_clm-2 is-cart-related">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.1}
        breakpoints={{
          980: { slidesPerView: 3.2, slidesPerGroup: 2 },
          768: { slidesPerView: 2, slidesPerGroup: 2 },
          425: { slidesPerView: 1.1,slidesPerGroup: 1 }
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