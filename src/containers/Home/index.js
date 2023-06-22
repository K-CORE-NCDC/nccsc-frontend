import React, { useEffect, useState, useContext, useRef } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { Context } from "../../wrapper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s1 from "../../assets/images/f_ci1.png";
import s2 from "../../assets/images/f_ci2.png";
import s3 from "../../assets/images/f_ci3.png";
import s4 from "../../assets/images/f_ci4.png";
import s5 from "../../assets/images/f_ci5.png";
import s6 from "../../assets/images/f_ci6.png";
import s7 from "../../assets/images/f_ci7.png";
import childMenu from "../../menu-item";
import { Mousewheel, Pagination, Navigation } from "swiper";
import breast_cancer_english from "../../assets/images/breast_cancer_english.png";
import breast_cancer_korean from "../../assets/images/breast_cancer_korean.png";
import s8 from "../../assets/images/right_below_add.png";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
// import Swiper from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import Introduction from "./Introduction";
import { SiteIntro } from "../Introduction/SiteIntro";
import { SingleDataVisualization } from "../VisualizeMyExampleData/SingleDataVisualization";
import { VisualizeMyData } from "../VisualizeMyData/VisualizeMyData";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

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
  const sections = ["MAIN", "INTRODUCTION", "VISUALIZEDATA" , "VISUALIZEMYDATA", "CUSTOMERSERVICE"];

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
    toSlide(parentProps?.parentProps?.activeClassIndex)
  }, []);

  const toSlide = (num) => {
    swiperRef.current?.swiper.slideTo(num);
  };

  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
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
      <SwiperComponent
        ref={swiperRef}
        loop={false}
        speed={800}
        direction="vertical"
        slidesPerView="auto"
        slidesToShow={5}
        mousewheel={
          {
            sensitivity: 5,
            thresholdDelta: 1,
          }
        }
        simulateTouch={false}
        watchSlidesProgress={true}

        pagination={{
          el: '.pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return "<div class='" + className + "'><span>" + sections[index] + "</span></div>";
          },
        }}

        height={window.innerHeight}
        modules={[Pagination, Mousewheel]}

        onSnapIndexChange={activeClassIndex}
        onSlideChange={(e) => {
          
          // let _activeURl = childMenu?.mainmenu?.items?.find(event => event?.index === e?.activeIndex)
          // history.push(_activeURl?.url || '/')
          parentProps?.parentProps?.setActiveClassIndex(e?.activeIndex)
          // setActiveclassPath(_activeURl?.title)
        }}

        className=" h-screen ">
        <div className={`${parentProps?.parentProps?.activeClassIndex !== 0 ? 'on' :''} pagination ` }></div>
        
        <SwiperSlide id="introduce" className="section section01">
          <Introduction height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} />
        </SwiperSlide>

        <SwiperSlide id="visualization" className="section section04">
          <SiteIntro height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} />
        </SwiperSlide>

        <SwiperSlide className="section section02">
          <SingleDataVisualization height={menuHeightRef?.current?.clientHeight} innerHeight={window.innerHeight} />
          
        </SwiperSlide >

        <SwiperSlide className="section section03">
          <VisualizeMyData />
        
        </SwiperSlide>
        <SwiperSlide className="section section03">
              <h3>gygy</h3>
        </SwiperSlide>
      </SwiperComponent>
    </>
  );
}
