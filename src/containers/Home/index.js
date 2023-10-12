import React, { createRef, useEffect, useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Mousewheel, Pagination } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.css';
import FooterComponent from '../Common/FooterComponent/FooterComponent';
import { Notice } from '../CustomerService/Notice';
import { SiteIntro } from '../Introduction/SiteIntro';
import { VisualizeMyData } from '../VisualizeMyData/VisualizeMyData';
import { SingleDataVisualization } from '../VisualizeMyExampleData/SingleDataVisualization';
import Introduction from './Introduction';
import SlickSlider from './slickSlide';
import { Context } from '../../wrapper';

export default function Home(parentProps) {
  const swiperRef = useRef(null);
  const menuHeightRef = useRef(null);
  const containerRef = useRef(null);
  const context = useContext(Context);
  const [language, setLanguage] = useState("kr")
  useEffect(() => {
    if (context.locale === 'en-US') {
      setLanguage('en')
    }
    else {
      setLanguage('kr')
    }

  }, [context])
  const sectionsE = [
    'MAIN',
    'INTRODUCTION',
    'VISUALIZE EXAMPLE DATA',
    'VISUALIZE MYDATA',
    'CUSTOMER SERVICE',
    'FOOTER'
  ];

  const sectionsK = [
    '메인',
    '사이트 소개',
    '데이터 분석 예시',
    '사용자 데이터 분석',
    '고객의 소리',
    '카피라이트'
  ];

  const resultRef = useRef([]);
  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
    toSlide(parentProps?.parentProps?.activeClassIndex);

    if (width > 1025 && height > 800) {
      var body = document.getElementsByTagName('body')[0];
      if (body) {
        body?.classList?.add('no-overflow');
      }

      return () => {
        body?.classList?.remove('no-overflow');
      };
    }
  }, []);

  resultRef.current = [...Array(5).keys()].map((_, i) => resultRef.current[i] ?? createRef());

  useEffect(() => {
    resultRef?.current[parentProps?.parentProps?.activeClassIndex]?.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [parentProps?.parentProps?.activeClassIndex]);

  const toSlide = (num) => {
    swiperRef?.current?.swiper?.slideTo(num);
  };

  const width = window?.innerWidth;
  const height = window?.innerHeight;

  const getActiveSlideFromURL = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const activeSlideParam = urlSearchParams.get('activeSlide');
    return activeSlideParam ? parseInt(activeSlideParam, 10) : 0;
  };

  const items = [
    { id: 1, title: 'loading...' },
    { id: 2, title: 'loading...' },
    { id: 3, title: 'loading...' },
    { id: 4, title: 'loading...' },
    { id: 5, title: 'loading...' },
    { id: 6, title: 'loading...' },
  ];

  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          parentProps?.parentProps?.setMainPageInSmallScreen(parseInt(entry.target.id));
          if (entry.target.id === '0') {
            history.push('/');
          }
        }
      });
    };
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.5
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    resultRef.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [parentProps?.parentProps?.mainPageInSmallScreen]);

  useEffect(() => {
    const handleSlideChange = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const activeSlide = swiperRef.current.swiper.activeIndex;
        const activeItem = items[activeSlide];
        console.log('activeItem', activeItem);
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('activeSlide', activeSlide.toString());
        localStorage.setItem('activeSlideIndex', activeSlide.toString());
        localStorage.setItem('activeItem', JSON.stringify(activeItem));

        if (urlSearchParams.toString() === 'activeSlide=0') {
          history.push('/');
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
    goToSlide(parentProps?.parentProps?.activeClassIndex);
  }, [parentProps?.parentProps?.activeClassIndex]);

  return (
    <>
      {activeItem && <p style={{ position: 'absolute', top: '9999' }}>{activeItem.title}</p>}
      {/* don't delete this title */}
      {width > 1025 && height > 800 && (
        <>
          <div
            className={`${parentProps?.parentProps?.activeClassIndex !== 0 ? 'on' : ''
              } pagination `}
          ></div>

          <SwiperComponent
            id="sushma"
            ref={swiperRef}
            loop={false}
            speed={800}
            direction="vertical"
            slidesPerView="auto"
            watchSlidesProgress={true}
            mousewheel={{
              sensitivity: 3,
              thresholdDelta: 1
            }}
            simulateTouch={false}
            pagination={{
              el: '.pagination',
              clickable: true,
              renderBullet: function (index, className) {
                return `<div class="${parentProps?.parentProps?.activeClassIndex === index ? 'circle ' : ' '
                  } ${className} "><span>  ${sectionsE[index]} </span></div>`;
              }
            }}
            height={window.innerHeight}
            modules={[Pagination, Mousewheel]}
            onSlideChange={(e) => {
              parentProps?.parentProps?.setActiveClassIndex(e?.activeIndex);
            }}
            className=" h-screen "
          >
            <SwiperSlide id="home" className="section section01">
              <Introduction
                height={menuHeightRef?.current?.clientHeight}
                innerHeight={window.innerHeight}
                setActiveClassIndex={(data) => parentProps?.parentProps?.setActiveClassIndex(data)}
                lan={parentProps?.parentProps?.lan}
              />
            </SwiperSlide>

            <SwiperSlide id="introduction" className="section section04">
              <SiteIntro
                height={menuHeightRef?.current?.clientHeight}
                innerHeight={window.innerHeight}
                lan={parentProps?.parentProps?.lan}
              />
            </SwiperSlide>

            <SwiperSlide className="section section02" id="visualization">
              <SingleDataVisualization
                height={menuHeightRef?.current?.clientHeight}
                innerHeight={window.innerHeight}
              />
            </SwiperSlide>

            <SwiperSlide className="section section03" id="visualizationMyData">
              <VisualizeMyData />
            </SwiperSlide>
            <SwiperSlide className="section section04" id="customerService">
              <Notice />
            </SwiperSlide>
            <SwiperSlide id="footer">
              <SlickSlider />
              <FooterComponent />
            </SwiperSlide>
          </SwiperComponent>


          {' '}
        </>
      )}

      {(width <= 1025 || height <= 800) && (
        <>
          <div className=" section01" style={{}} id="0" ref={resultRef?.current[0]}>
            <Introduction
              height={menuHeightRef?.current?.clientHeight}
              innerHeight={window.innerHeight}
              lan={parentProps?.parentProps?.lan}
              setActiveClassIndex={(data) => parentProps?.parentProps?.setActiveClassIndex(data)}
            />
          </div>
          <div
            className=" section04"
            style={{ paddingTop: '20vh' }}
            id="1"
            ref={resultRef?.current[1]}
          >
            <SiteIntro
              height={menuHeightRef?.current?.clientHeight}
              innerHeight={window.innerHeight}
              lan={parentProps?.parentProps?.lan}
            />{' '}
          </div>
          <div
            className=" section02"
            style={{ paddingTop: '20vh' }}
            ref={resultRef?.current[2]}
            id="2"
          >
            <SingleDataVisualization
              height={menuHeightRef?.current?.clientHeight}
              innerHeight={window.innerHeight}
            />{' '}
          </div>
          <div
            className="section section03"
            style={{ paddingTop: '20vh' }}
            ref={resultRef?.current[3]}
            id="3"
          >
            <VisualizeMyData />
          </div>
          <div
            className="section04"
            style={{ paddingTop: '20vh' }}
            ref={resultRef?.current[4]}
            id="4"
          >
            <Notice />
            <SlickSlider />
          </div>
        </>
      )}
    </>
  );
}
