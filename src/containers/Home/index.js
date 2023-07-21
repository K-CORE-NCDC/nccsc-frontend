import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Mousewheel, Pagination } from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import FooterComponent from "../Common/FooterComponent/FooterComponent";
import { Notice } from "../CustomerService/Notice";
import { SiteIntro } from "../Introduction/SiteIntro";
import { VisualizeMyData } from "../VisualizeMyData/VisualizeMyData";
import { SingleDataVisualization } from "../VisualizeMyExampleData/SingleDataVisualization";
import Introduction from "./Introduction";
// import "../../styles/swiper_cus.css"

export default function Home(parentProps) {
  const swiperRef = useRef(null);
  const menuHeightRef = useRef(null);

  const sections = ["MAIN", "INTRODUCTION", "VISUALIZEDATA", "VISUALIZEMYDATA", "CUSTOMERSERVICE", "FOOTER"];
  const resultRef = useRef([]);
  const history = useHistory()

  useEffect(() => {
    window.scroll(0, 0);
    toSlide(parentProps?.parentProps?.activeClassIndex)

    if ((width > 1025 && height > 800)) {
      var body = document.getElementsByTagName('body')[0]
      if (body) {
        body?.classList?.add('no-overflow')
      }

      return () => {
        body?.classList?.remove('no-overflow')
      }
    }

  }, []);

  const toSlide = (num) => {
    swiperRef?.current?.swiper?.slideTo(num);
  };

  const width = window?.innerWidth
  const height = window?.innerHeight

  const getActiveSlideFromURL = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const activeSlideParam = urlSearchParams.get('activeSlide');
    return activeSlideParam ? parseInt(activeSlideParam, 10) : 0;
  };


  const items = [
    { id: 1, title: 'Slide 1' },
    { id: 2, title: 'Slide 2' },
    { id: 3, title: 'Slide 3' },
    { id: 4, title: 'Slide 4' },
    { id: 5, title: 'Slide 5' }
  ];

  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  useEffect(() => {
    const handleSlideChange = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const activeSlide = swiperRef.current.swiper.activeIndex;
        const activeItem = items[activeSlide];
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('activeSlide', activeSlide.toString());
        localStorage.setItem('activeSlideIndex', activeSlide.toString());
        localStorage.setItem('activeItem', JSON.stringify(activeItem));

        if (urlSearchParams.toString() === 'activeSlide=0') {
          history.push("/")
        }
        // window.history.pushState(null, null, `?${urlSearchParams.toString()}`);
      }
    };
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.on('slideChange', handleSlideChange);
    }

    return () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.off('slideChange', handleSlideChange);
      }
    };
  }, []);


  const storedItem = localStorage.getItem('activeItem');
  const activeItem = storedItem ? JSON.parse(storedItem) : null;

  useEffect(() => {
    const activeSlide = getActiveSlideFromURL();
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(activeSlide);
    }
  }, []);

  useEffect(() => {
    goToSlide(parentProps?.parentProps?.activeClassIndex)
  }, [parentProps?.parentProps?.activeClassIndex]);

  return (
    <>
      {activeItem && <p style={{ position: 'absolute', bottom: '9999' }}>{activeItem.title}</p>}
      {(width > 1025 && height > 800) &&
        <>
          <div className={`${parentProps?.parentProps?.activeClassIndex !== 0 ? 'on' : ''} pagination `}></div>

          <SwiperComponent
            id="sushma"
            ref={swiperRef}
            loop={false}
            speed={800}
            direction="vertical"
            slidesPerView="auto"
            watchSlidesProgress={true}
            mousewheel={
              {
                sensitivity: 3,
                thresholdDelta: 1,
              }
            }
            simulateTouch={false}

            pagination={{
              el: '.pagination',
              clickable: true,
              renderBullet: function (index, className) {

                return `<div class="${parentProps?.parentProps?.activeClassIndex === index ? 'circle ' : ' '} ${className} "><span>  ${sections[index]} </span></div>`;
              }
            }}

            height={window.innerHeight}
            modules={[Pagination, Mousewheel]}
            onSlideChange={(e) => {
              parentProps?.parentProps?.setActiveClassIndex(e?.activeIndex)
            }}

            className=" h-screen ">

            <SwiperSlide id="home" className="section section01">
              <Introduction height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} setActiveClassIndex= {(data) => parentProps?.parentProps?.setActiveClassIndex(data)}/>
            </SwiperSlide>

            <SwiperSlide id="introduction" className="section section04">
              <SiteIntro height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} />
            </SwiperSlide>

            <SwiperSlide className="section section02" id="visualization">
              <SingleDataVisualization height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} />

            </SwiperSlide >

            <SwiperSlide className="section section03" id="visualizationMyData">
              <VisualizeMyData />

            </SwiperSlide>
            <SwiperSlide className="section section04" id="customerService">
              <Notice />
            </SwiperSlide>
            <SwiperSlide id="footer">
              <FooterComponent />
            </SwiperSlide>
          </SwiperComponent> </>
      }

      {
        (width <= 1025 || height <= 800) &&
        <>

          <div className=" section01" style={{ marginBottom: '50px', borderBottom: '1px solid', paddingBottom: '100px' }} id="introduce" ref={resultRef?.current[0]}>
            <Introduction height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} />
          </div>

          <div className=" section04" style={{ marginBottom: '50px', borderBottom: '1px solid', paddingBottom: '100px' }} id="visualization" ref={resultRef?.current[1]}>
            <div className="contentsTitle">
              <h3>
                <font>
                  <font>Intro</font>
                  <span className="colorSecondary">
                    <font >duction</font>
                  </span>
                </font>
              </h3>
            </div>
            <SiteIntro height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} /> </div>

          <div className=" section02" style={{ marginBottom: '50px', borderBottom: '1px solid', paddingBottom: '100px' }} ref={resultRef?.current[2]}>
            <div className="contentsTitle">
              <h3>
                <font>
                  <font>Visualize </font>
                  <span className="colorSecondary">
                    <font >Example Data</font>
                  </span>
                </font>
              </h3>
            </div>
            <SingleDataVisualization height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} /> </div>

          <div className=" section03" style={{ marginBottom: '50px', borderBottom: '1px solid', paddingBottom: '100px' }} ref={resultRef?.current[3]}>
            <div className="contentsTitle">
              <h3>
                <font>
                  <font>Visualize</font>
                  <span className="colorSecondary">
                    <font >My Data</font>
                  </span>
                </font>
              </h3>
            </div>
            <VisualizeMyData />
          </div>

          <div className=" section04" style={{ marginBottom: '50px', borderBottom: '1px solid', paddingBottom: '100px' }} ref={resultRef?.current[4]}>
            <div className="contentsTitle">
              <h3>
                <font>
                  <font>Customer</font>
                  <span className="colorSecondary">
                    <font >Service</font>
                  </span>
                </font>
              </h3>
            </div>
            <Notice /> </div>
        </>


      }
    </>
  );
}
