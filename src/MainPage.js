import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css"
import "swiper/swiper-bundle.min.css";
import { Mousewheel, Pagination } from "swiper";
import Introduction from "./containers/Home/Introduction";


const MainPage = () =>{
  return(
    <>
    <Swiper 
     slidesPerView="1"
     mousewheel={true}
     direction="vertical"
     pagination={{ clickable: true }}
     height={window.innerHeight}
     modules={[Pagination , Mousewheel]}
    >
        <SwiperSlide>
          <Introduction/>
        </SwiperSlide>
        <SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
    </Swiper>
    </>
  )
}
export default MainPage;
