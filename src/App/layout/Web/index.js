/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, Suspense, useContext, useEffect, useRef, useState } from "react";
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import uuid from 'react-uuid';
import menu_black from "../../../assets/images/right_below_add.png";
import logoNew from "../../../assets/images/Left_up.png";
// import logoNew from '../../../assets/images/KoreanImageNcc.png'
import { useIdleTimer } from 'react-idle-timer';
import { useParams,withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Mousewheel, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import { DashboardCount, SetCookie, sendlogManagement } from "../../../actions/api_actions";
import NotFound from "../../../containers/404NotFound";
import Introduction from "../../../containers/Home/Introduction";
import Popup from "../../../containers/Popup/Popup";
import { getCookie } from "../../../containers/getCookie";
import childMenu from "../../../menu-item";
import route from "../../../route";
import { Context } from "../../../wrapper";
import Loader from "../Loader";
import MobileHeader from '../../layout/Web/Mobile/Menu'
import DropdownMenuMobile from '../../layout/Web/Mobile/DropdownMenu'
import { SiteIntro } from "../../../containers/Introduction/SiteIntro";
import { XIcon } from "@heroicons/react/outline";
import AOS from 'aos';
import "aos/dist/aos.css"
import { VisualizeMyData } from "../../../containers/VisualizeMyData/VisualizeMyData";
import { SingleDataVisualization } from "../../../containers/VisualizeMyExampleData/SingleDataVisualization";

AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100
});


let parseJwt = (islogin1) => {
  var base64Url = islogin1 && islogin1.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);


}





export const  Home =(parentProps)=>{
  return route.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          childname={route.childname}
          render={(props) => <route.component parentProps ={parentProps}  {...props} />}
        />
      ) : null;
    
    });
  
} 


export default function Web(props) {
  const routeLocation = useLocation();
  const timeout = 3000
  const [showPopup, setShowPopup] = useState(false)
  const handleOnActive = () => { }
  const handleOnIdle = () => { }

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [countJson, setCountJson] = useState({})
  const [countStatus, setCountStatus] = useState(200)
  const history = useHistory()
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);
  const [activeClassPath, setActiveclassPath] = useState('')
  const [activeClassIndex, setActiveClassIndex] = useState(0)
  const swiperRef = useRef(null);
  const buttonRef = useRef(null);
  const menuHeightRef = useRef(null);
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [mouseEnterFlag, setMouseEnterFlag] = useState(false)
  const [menuTabOpen, setMenuTabOpen] = useState(false)
  const [swiperOn,setSwiperOn] = useState(true)

  useEffect(() => {
    let cookiedata = SetCookie()
    cookiedata && cookiedata.then((result) => {
      if (result.status === 200) {
        let data = DashboardCount()
        data.then((result) => {
          if (result.status === 200)
            setCountJson(result.data)
          else {
            setCountJson({})
            setCountStatus(204)
          }
        })
      }
    })
  }, [])


  

  const toSlide = (num) => {
    swiperRef.current?.swiper.slideTo(num);
  };

  useEffect(() => {

    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  }, [context]);

  const changeLang = (type) => {
    if (type === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
      context.locale = 'kr-KO'
      context.selectLanguage('kr-KO')
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
      context.locale = 'en-US'
      context.selectLanguage('en-US')
    }
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
  };

  const {
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  })

  let { project_id } = useParams()
  let id = useParams();
  let pid = routeLocation.pathname

  

  const [breadCrumb, setBreadCrumb] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [latandLong, setLatandLog] = useState({});


  function updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handle_geolocation_query);
    } else {
      alert("geolocation services are not supported by your browser.");
    }
  }

  function handle_geolocation_query(position) {
    let location = { 'lat': position.coords.latitude, 'lon': position.coords.longitude }
    sessionStorage.setItem('Location', JSON.stringify(location))
    setLatandLog(location)
    return location;
  }

  let toggleModal = (close) => {
    setShowPopup(close)
  }
  
  useEffect(() => {
    
    let userid = ''
    let category = 'Others'
    if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1)) {
      category = 'User DataVisualization'
    }
    
    else if (['circos', 'OncoPrint', 'lollipop', 'volcano', 'heatmap', 'survival', 'correlation', 'CNV', 'box', 'fusion'].some(r => window.location.href.split("/").indexOf(r) >= 0)) {
      category = 'DataVisualization'
    }
    
    if(getCookie('is_login') && getCookie('is_login') !== null ){
        userid = getCookie('username')
    }
    else {
      if (getCookie('sessionId') === undefined) {
        localStorage.removeItem('ncc_access_token')
        localStorage.removeItem('ncc_refresh_token')
      }
    }

    sessionStorage.setItem('sessionId', uuid())
    sessionStorage.setItem('firstTime', true)
    // updateLocation();
    var today = new Date();

    if (sessionStorage.getItem("firstTime")) {
      // updateLocation();
      var loginTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      sessionStorage.setItem('loginTime', loginTime)
      sessionStorage.setItem('prevTime', loginTime)
      sessionStorage.setItem('firstTime', false)
      sessionStorage.setItem('IdNumber', 0)
      let sessionId = sessionStorage.getItem('sessionId')
      let arrayOfLog = []
      let object = {
        'id': 0,
        'sessionId': sessionId,
        'url': 'http://localhost:9192/home',
        'startTime': loginTime,
        'endTime': '',
        'userid': userid,
        'category': category,

      }
      arrayOfLog[0] = object
      // let alid = sessionStorage.getItem('IdNumber')
      sessionStorage.setItem('logData', JSON.stringify(arrayOfLog))

    }
    // let today = new Date();
    let date = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
    if (id[0] === "/") {
      // var a_or_p = today.toLocaleString("en-US", { hour: "numeric", hour12: true }).split(" ")[1];
      // var time = a_or_p + " " + today.getHours() + ":" + today.getMinutes();
      var time = today.getHours() + ":" + (today.getMinutes() <= 9 ? `00` : today.getMinutes());
      // let check_popup = localStorage.getItem('show_popup') 
      setCurrentTime(time);
      if (!countJson) {
        let data = DashboardCount()
        data.then((result) => {
          if (result.status === 200) {
            setCountJson(result.data)
          }
          else {
            setCountStatus(204)
            setCountJson({})
          }
        })
      }
    }
    setCurrentDate(date);
    let path = window.location.pathname
    if( !path.includes('home')){
      setSwiperOn(false)
    }
  }, [])

  useEffect(() => {
    // updateLocation()
  }, [latandLong])



  useEffect(() => {
    let date = new Date().toISOString().split('T')[0]
    if (localStorage.getItem('ncc_notice_popup') === null) {
      localStorage.setItem('ncc_notice_popup', JSON.stringify({ 'date': date, 'showpopup': true }))
      setShowPopup(true)
    }
    else if (localStorage.getItem('ncc_notice_popup') !== null) {
      let check_popup = JSON.parse(localStorage.getItem('ncc_notice_popup'))
      if (check_popup['date'] === date && check_popup['showpopup']) {
        setShowPopup(true)
      }
      else if (check_popup['date'] === date && !check_popup['showpopup']) {
        setShowPopup(false)
      }
      else {
        localStorage.setItem('ncc_notice_popup', JSON.stringify({ 'date': date, 'showpopup': true }))
        setShowPopup(true)
      }

    }
    if (!sessionStorage.getItem('location')) {
      // updateLocation();
    }
    let sessionAuth = ''
    let userid = ''
    let category = 'Others'
    
    if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1)) {
      category = 'User DataVisualization'
    }
    else if (['circos', 'OncoPrint', 'lollipop', 'volcano', 'heatmap', 'survival', 'correlation', 'CNV', 'box', 'fusion'].some(r => window.location.href.split("/").indexOf(r) >= 0)) {
      category = 'DataVisualization'
    }

    if (getCookie('sessionId')) {
      sessionAuth = getCookie('sessionId');
      if (sessionAuth) {
        if (getCookie('username')) {
          userid = getCookie('username')
        }
      }
    }

    var url = window.location.href;
    let sessionId = sessionStorage.getItem('sessionId')
    let idNumber = JSON.parse(sessionStorage.getItem('IdNumber'))
    let logData = sessionStorage.getItem('logData')
    let logDataIs = JSON.parse(logData)
    let latitude = latandLong['lat']
    let longitude = latandLong['lon']
    var today = new Date();

    const todays = new Date();
    const yyyy = todays.getFullYear();
    let mm = todays.getMonth() + 1; // Months start at 0!
    let dd = todays.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    if (idNumber in logDataIs)
      logDataIs[idNumber]['endTime'] = currentTime

    idNumber++;

    let object = {
      'id': idNumber,
      'sessionId': sessionId,
      'url': url,
      'startTime': currentTime,
      'endTime': '',
      'latitude': latitude,
      'longitude': longitude,
      'visitedDate': formattedToday,
      'userid': userid,
      'category': category
    }
    sessionStorage.setItem('IdNumber', idNumber)
    logDataIs[idNumber] = object
    sessionStorage.setItem('logData', JSON.stringify(logDataIs))
    if (logDataIs.length >= 10) {
      logDataIs[idNumber]['endTime'] = currentTime
      idNumber = 0
      sessionStorage.setItem('IdNumber', idNumber)
      dispatch(sendlogManagement("POST", logDataIs))
      logDataIs.length = 0
      let latitude = latandLong['lat']
      let longitude = latandLong['lon']
      let object = {
        'id': 0,
        'sessionId': sessionId,
        'url': url,
        'startTime': currentTime,
        'endTime': '',
        'latitude': latitude,
        'longitude': longitude,
        'visitedDate': formattedToday,
        'username': 'sameer',
        'category': category
      }
      logDataIs[idNumber] = object
      sessionStorage.setItem('logData', JSON.stringify(logDataIs))
    }
  }, [window.location.href])


  useEffect(() => {
    //   let html = [];
    //   for (let m = 0; m < menu.length; m++) {
    //     let p = ''
    //     if (Object.keys(id).length !== 0) {
    //       p = id[0].split("/")[1];
    //     }
    //     let pp = pid.split("/")[1]
    //     if (menu[m].props.path.includes(pp)) {
    //       let name = menu[m].props.name;
    //       let childname = menu[m].props.childname;

    //       html.push(
    //         <li key={m + "icon"}>
    //           <HomeIcon className="h-6 w-6" aria-hidden="true" />
    //         </li>
    //       );
    //       html.push(
    //         <li key={m + "1pipe"}>
    //           <span className="mx-2">|</span>
    //         </li>
    //       );
    //       html.push(
    //         <li key={m + name}>
    //           <a className="font-bold">
    //             {name}
    //           </a>
    //         </li>
    //       );
    //       html.push(
    //         <li key={m + "c1"}>
    //           <span className="mx-2">|</span>
    //         </li>
    //       );
    //       if (window.location.href.includes('visualise')) {
    //         if (routeLocation.pathname.split("/")[3] !== '') {
    //           html.push(<li key={m + "child"}>MyData Visualization</li>);
    //         }
    //         else {
    //           html.push(<li key={m + "child"}>{childname}</li>);
    //         }
    //       }
    //       else {
    //         html.push(<li key={m + "child"}>{childname}</li>);
    //       }
    //     }
    //   }
    //   setBreadCrumb(html);
  }, [props, project_id, routeLocation.pathname]);



  let classes = "";
  if (activeClassIndex === 0 && mouseEnterFlag) {
    classes = "header rev";
  } else if (activeClassIndex === 0 && !mouseEnterFlag) {
    classes = "header";
  } else if (activeClassIndex !== 0 && mouseEnterFlag) {
    classes = "header on rev";
  } else {
    classes = "header on"
  }



 
  return (
    <div className="relative" id='fullSlide' >
      <Popover>
        {({ open }) => (
          <header id="header" className={classes}>
            <div className="headerTop">
              <div className="auto fullsize">
                <h1 className="logo">
                  <a href="/">
                    <img src={menu_black} alt="logo" className="logo02" />
                    <img src={logoNew} alt="logo" className="logo01" />
                  </a>
                </h1>
                <div className="headerUtils">
                  <a><FormattedMessage id="Login" defaultMessage='Login' /></a>
                  <a href="">Find Password</a>
                  <div className="language">
                    <a className="on" onClick={() => { setShowLangMenu(!showLangMenu) }}>&nbsp;</a>
                    <ul style={showLangMenu ? { display: "block" } : { display: 'none' }}>
                      <li className={((context.locale === 'kr-KO') ? ' on ' : '')}>
                        <a onClick={() => { changeLang('kr-KO') }}>KOR</a>
                      </li>
                      <li className={((context.locale === 'en-US') ? ' on ' : '')}>
                        <a onClick={() => { changeLang('en-US') }}>ENG</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <a onClick={() => {
                setMenuTabOpen(true)
              }} className="btnAllMenu" >
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
            <div className="headerBottom">
              <div className="auto fullsize">
                <nav id="gnb" className="gnb">
                  <ul>
                    {/* <li><a>Introduction</a></li>
                    <li><a>Visualize Example Data</a></li> */}
                    {childMenu?.mainmenu?.items?.map((item, i) => (
                      <li
                        ref={buttonRef} onClick={() => {
                          setActiveclassPath(item?.title)
                          setActiveClassIndex(item?.index)
                          history.push(`/home${item?.url}`)
                         
                          toSlide(item?.index)
                        }} onMouseEnter={() => {
                          setMouseEnterFlag(true)
                        }}
                        onMouseLeave={() => {
                          setMouseEnterFlag(false)
                        }}
                      ><a className="menu_li">{item?.title}</a></li>
                    ))}
                  </ul>
                </nav>

              </div>
            </div>
            <div id="allMenuWrap" className="allMenuWrap" style={menuTabOpen ? { display: 'block' } : { display: 'none' }}>
              <div className="allMenu">
                <ul>
                  {childMenu?.mainmenu?.items?.map((item, i) => (
                    <li

                    ><a className="menu_li">{item?.title}</a></li>
                  ))}
                </ul>

              </div>
              <a className="btnClose" onClick={() => {
                setMenuTabOpen(false)
              }}>
                <span></span>
                <span></span>
              </a>
            </div>

          </header>
        )}
      </Popover>



      <div className={`mainContents ${routeLocation.pathname === '/' ? '' : 'min-h-70'} `} >
        <Suspense fallback={<Loader />}>
          <Switch>
          
            <Home setActiveClassIndex = {(data) => setActiveClassIndex(data)} activeClassIndex={activeClassIndex}/>
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Suspense>
        <div>
          {showPopup ? <Popup toggleModal={toggleModal} /> : ''}
        </div>
      </div>



    </div>
  );
}
