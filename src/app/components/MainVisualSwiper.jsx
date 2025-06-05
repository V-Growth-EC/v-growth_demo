// src/components/MainVisualSwiper.js
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MainVisualSwiper() {
  return (
    <section className="is-kv is-kv-lower is-kv-lower-home swiper_clm-1">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        className="my-swiper"
      >
        <SwiperSlide>
          <img src="/images/home/cover-1.png" alt="" className="pc" />
          <img src="/images/home/cover-1-sp.png" alt="" className="sp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/cover-2.png" alt="" className="pc" />
          <img src="/images/home/cover-2-sp.png" alt="" className="sp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/cover-3.png" alt="" className="pc" />
          <img src="/images/home/cover-3-sp.png" alt="" className="sp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/cover-4.png" alt="" className="pc" />
          <img src="/images/home/cover-4-sp.png" alt="" className="sp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/cover-5.png" alt="" className="pc" />
          <img src="/images/home/cover-5-sp.png" alt="" className="sp" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}