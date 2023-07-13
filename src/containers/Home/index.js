import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Mousewheel, Pagination } from "swiper";
import { Context } from "../../wrapper";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
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
    console.log(parentProps?.parentProps?.activeClassIndex)
    toSlide(parentProps?.parentProps?.activeClassIndex)
    var body = document.getElementsByTagName('body')[0]
    if (body) {
      console.log(body)
      body?.classList?.add('no-overflow')
    }
    return () => {
      body?.classList?.remove('no-overflow')
    }
  }, []);

  const toSlide = (num) => {
    swiperRef?.current?.swiper?.slideTo(num);
  };

  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const width = window?.innerWidth
  const height = window?.innerHeight
  const context = useContext(Context);

  resultRef.current = [...Array(5).keys()].map(
    (_, i) => resultRef.current[i] ?? createRef()
  );

  useEffect(() => {
    resultRef?.current[parentProps?.parentProps?.activeClassIndex]?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [parentProps?.parentProps?.activeClassIndex]);

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
              renderBullet: function (index, className)  {
                
                return `<div class="${parentProps?.parentProps?.activeClassIndex === index ? 'circle ' :' ' } ${className} "><span>  ${sections[index]} </span></div>`;
              }
            }}

            height={window.innerHeight}
            modules={[Pagination, Mousewheel]}

            // onSnapIndexChange={activeClassIndex}
            onSlideChange={(e) => {

              // let _activeURl = childMenu?.mainmenu?.items?.find(event => event?.index === e?.activeIndex)
              // history.push(_activeURl?.url || '/')

              parentProps?.parentProps?.setActiveClassIndex(e?.activeIndex)

              // setActiveclassPath(_activeURl?.title)
            }}

            className=" h-screen ">

            <SwiperSlide id="home" className="section section01">
              <Introduction height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} />
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
                <FooterComponent/>
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
