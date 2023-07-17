import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Mousewheel, Pagination } from "swiper";
import { Context } from "../../wrapper";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Swiper as SwiperComponent, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import { Notice } from "../CustomerService/Notice";
import { SiteIntro } from "../Introduction/SiteIntro";
import { VisualizeMyData } from "../VisualizeMyData/VisualizeMyData";
import { SingleDataVisualization } from "../VisualizeMyExampleData/SingleDataVisualization";
import Introduction from "./Introduction";
import FooterComponent from "../Common/FooterComponent/FooterComponent";
// import "../../styles/swiper_cus.css"

export default function Home(parentProps) {
  const params = useParams()
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const history = useHistory()
  const menuHeightRef = useRef(null);
  const [activeClassPath, setActiveclassPath] = useState('')
  const [activeClassIndex, setActiveClassIndex] = useState(0)
  const countJson = useSelector((data) => data.homeReducer.dataCount);
  const sections = ["MAIN", "INTRODUCTION", "VISUALIZEDATA", "VISUALIZEMYDATA", "CUSTOMERSERVICE", "FOOTER"];
  const resultRef = useRef([]);
  // const swiper = useSwiper()

  useEffect(() => {

    let today = new Date();
    var date =
      today.getFullYear() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getDate();
    var a_or_p = today
      .toLocaleString("en-US", { hour: "numeric", hour12: true })
      .split(" ")[1];
    var time = a_or_p + " " + today.getHours() + ":" + (today.getMinutes() <= 9 ? `0${today.getMinutes()}` : today.getMinutes());


    setCurrentDate(date);
    setCurrentTime(time);




    if (width > 1025 && height > 800) {
      var body = document.getElementsByTagName('body')[0]
      if (body) {
        console.log(body)
        body?.classList?.add('no-overflow')
      }
      return () => {
        body?.classList?.remove('no-overflow')
      }
    }

  }, []);

  useEffect(() => {
    const storedSlideIndex = localStorage.getItem('activeSlideIndex');
    const parsedIndex = parseInt(storedSlideIndex, 10);

    if (!isNaN(parsedIndex) && swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(parsedIndex);
      swiperRef.current.swiper.update(0);
      // history.push('/') // Add this line to update Swiper
    }
  }, []);

  useEffect(() =>{
    toSlide(parentProps?.parentProps?.activeClassIndex)
  },[parentProps?.parentProps?.activeClassIndex])

 

  const toSlide = (num) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(num);
      localStorage.setItem('activeSlideIndex', num.toString());
    }
   
  };

  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const width = window?.innerWidth
  const height = window?.innerHeight
  const context = useContext(Context);


  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  }, [context]);


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
  };
  return (
    <>
      {(width > 1025 && height > 800) &&
        <>
          <div className={`${parentProps?.parentProps?.activeClassIndex !== 0 ? 'on' : ''} pagination `}></div>

          <SwiperComponent
            // ref={swiperRef}
            loop={false}
            speed={800}
            direction="vertical"
            slidesPerView="auto"
            watchSlidesProgress={false}
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
            initialSlide={0}
            height={window.innerHeight}
            modules={[Pagination, Mousewheel]}
            onSlideChange={(e) => {
              console.log(e)
              // let _activeURl = childMenu?.mainmenu?.items?.find(event => event?.index === e?.activeIndex)
              // history.push(_activeURl?.url || '/')

              parentProps?.parentProps?.setActiveClassIndex(e?.activeIndex)

              // setActiveclassPath(_activeURl?.title)
            }}
            className=" h-screen ">
            <SwiperSlide id="home" className="section section01">
              <Introduction />
            </SwiperSlide>

            <SwiperSlide id="intro" className="section section04">
              <SiteIntro />
            </SwiperSlide>

            <SwiperSlide id="exampleData" className="section section02">
              <SingleDataVisualization />

            </SwiperSlide >

            <SwiperSlide className="section section03">
              <VisualizeMyData />

            </SwiperSlide>
            <SwiperSlide className="section section04" >
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
