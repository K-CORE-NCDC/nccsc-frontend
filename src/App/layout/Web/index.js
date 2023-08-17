/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { Popover } from "@headlessui/react";
import React, { Suspense, useContext, useEffect, useRef, useState } from "react";
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import uuid from 'react-uuid';
import logoNew from "../../../assets/images/Left_up.png";
import menu_black from "../../../assets/images/right_below_add.png";
import footer_img from "../../../assets/images/f_logo.png";
import icon_home from "../../../styles/images/icon-home02.svg";
import icon_lang from "../../../styles/images/icon-language.svg";
import login_icon from "../../../styles/images/icon-login.svg";
import icon_user04 from "../../../styles/images/icon-user04.svg";
import AOS from 'aos';
import "aos/dist/aos.css";
import { useIdleTimer } from 'react-idle-timer';
import { Link, useParams, matchPath } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Swal from 'sweetalert2';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import { SetCookie, sendlogManagement } from "../../../actions/api_actions";
import NotFound from "../../../containers/404NotFound";
import Popup from "../../../containers/Popup/Popup";
import { getCookie } from "../../../containers/getCookie";
import childMenu from "../../../menu-item";
import route from "../../../route";
import { Context } from "../../../wrapper";
import Loader from "../Loader";
import FooterComponent from "../../../containers/Common/FooterComponent/FooterComponent";
import config from '../../../config';
AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100
});



export const Home = (parentProps) => {
  return route.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        childname={route.childname}
        render={(props) => <route.component parentProps={parentProps}  {...props} />}
      />
    ) : null;

  });

}

export default function Web(props) {
  const routeLocation = useLocation();
  const timeout = 3000
  const [showPopup, setShowPopup] = useState(true)
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
  const [swiperOn, setSwiperOn] = useState(true)
  const [is_login, setIsLogin] = useState(false)
  const [footer, setFooter] = useState(false)
  const [mainPageInSmallScreen, setMainPageInSmallScreen] = useState(0)



  let tabs = ['singledata-upload', 'visualise-singledata', 'visualise-multidata', 'newmultidataproject', 'multidataprojectview']

  useEffect(() => {
    let cookiedata = SetCookie()
    cookiedata && cookiedata.then((result) => {
      if (result.status === 200) {

      }
    })
  }, [])


  useEffect(() => {
    if (getCookie('is_login') && getCookie('is_login') === 'True') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [window.location.pathname])


  useEffect(() => {
    const cookieExpiry = getCookie('expiry');
    const targetDateTime = new Date(cookieExpiry).getTime();
    if (cookieExpiry && targetDateTime) {
      // Calculates the delay in milliseconds until the target date and time
      const delay = targetDateTime - Date.now();
      // Start a timeout to redirect to logout URL after the delay
      const timeoutId = setTimeout(() => {
        Swal.fire({
          title: 'Session Expired',
          icon: 'info',
          confirmButtonColor: '#003177',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            history.push('/logout/')
          }
        })
      }, delay);

      // Clean up the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  });

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

    if (getCookie('is_login') && getCookie('is_login') !== null) {
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

    }
    setCurrentDate(date);
    let path = window.location.pathname
    if (!path.includes('home')) {
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


  let classes = "";
  if (window.innerWidth > 1025 && window.innerHeight > 870) {
    if (activeClassIndex === 0 && mouseEnterFlag && (window.location.pathname === '/k-core/' || window.location.pathname === '/')) {
      classes = "header rev";
    } else if (activeClassIndex === 0 && !mouseEnterFlag && (window.location.pathname === '/k-core/' || window.location.pathname === '/')) {
      classes = "header";
    } else if (activeClassIndex !== 0 && mouseEnterFlag) {
      classes = "header on rev";
    } else {
      classes = "header on"
    }
  }
  else {
    if (mainPageInSmallScreen === 0 && mouseEnterFlag && (window.location.pathname === '/k-core/' || window.location.pathname === '/')) {
      classes = "header rev";
    } else if (mainPageInSmallScreen === 0 && !mouseEnterFlag && (window.location.pathname === '/k-core/' || window.location.pathname === '/')) {
      classes = "header";
    } else if (mainPageInSmallScreen !== 0 && mouseEnterFlag) {
      classes = "header on rev";
    } else {
      classes = "header on"
    }
  }
  console.log('Current Sub-Div ID:', mainPageInSmallScreen);

  return (
    <>
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

              {is_login ? <>
              <Link to='/logout/'><FormattedMessage id="Logout" defaultMessage='Logout' /></Link>
              {getCookie('superuser') && <a href={`${config.auth}home`}><FormattedMessage id="Admin" defaultMessage='Admin' /></a>}
              </>
                :
                <>
                  <Link to="/signup/"><FormattedMessage id="GenerateRegistrationNumber" defaultMessage='Generate registration number' /></Link>
                  <Link to='/login/'><FormattedMessage id="Login" defaultMessage='Login' /></Link>
                  <Link to="/findpassword/"><FormattedMessage id="FindPassword" defaultMessage='Find Password' /></Link> </>}
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
                {childMenu?.mainmenu?.items?.map((item, i) => (
                  <li key={'menuli_' + i}
                    ref={buttonRef} onClick={() => {
                      setActiveclassPath(item?.id)
                      setActiveClassIndex(item?.index)
                      history.push(`/home${item?.url}`)
                      toSlide(item?.index)
                    }} onMouseEnter={() => {
                      setMouseEnterFlag(true)
                    }}
                    onMouseLeave={() => {
                      setMouseEnterFlag(false)
                    }}
                  ><a className={`${mainPageInSmallScreen !== 0 && activeClassIndex === item?.index ? 'active_menu' : ''} menu_li`} style={mainPageInSmallScreen !== 0 && activeClassIndex === item?.index ? { color: '#009fe2' } : { color: '' }}>{item?.title}</a></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div id="allMenuWrap" className="allMenuWrap" style={menuTabOpen ? { display: 'block' } : { display: 'none' }}>
          <div className="imgBox">
            <dl>
              <dt className={`${context?.locale === 'kr-KO' ? "korean" : ''}`}><font className="font1"></font><br /><font className="font1"><font className="font1"><FormattedMessage id="WelcometoK-corePortal" defaultMessage='Welcome to K-Core Portal' /></font></font></dt>
              <dd><font className="font1"><font className="font1"><FormattedMessage id="Designated" defaultMessage='K-Core Portal is a web-based analysis portal that provides visualizations of cancer genomic data, and it is a sub-service portal of the National Cancer Data Center website.' /></font></font></dd>
            </dl>
            <div className="members">
              <p>
                <span><font className="font1"><font className="font1"><FormattedMessage id="PleaseLogIn" defaultMessage='Please log in' /></font></font></span><font className="font1"><font className="font1"> .
                </font></font></p>
            </div>
            <div className="btnsMember">
              {!is_login ?
                <>
                  <Link to='/login/' onClick={() => {
                    setMenuTabOpen(false)
                  }}><font className="font1">
                      <font className="font1"><FormattedMessage id="Login" defaultMessage='Login' /></font></font>
                  </Link>
                  <Link to='/signup/' onClick={() => {
                    setMenuTabOpen(false)
                  }}><font className="font1"><font className="font1"><FormattedMessage id="Join" defaultMessage='Register' /></font></font><img src={icon_user04} alt="user" /></Link>
                </> :
                <Link to='/logout/' onClick={() => {
                  setMenuTabOpen(false)
                }}><font className="font1">
                    <font className="font1"><FormattedMessage id="Logout" defaultMessage='Logout' /></font></font>
                </Link>
              }
            </div>
            <div className="utils">
              {!is_login ?
                <>
                  <Link to='/login/' onClick={() => {
                    setMenuTabOpen(false)
                  }}><font className="font1">
                      <font className="font1"><FormattedMessage id="Login" defaultMessage='Login' /></font></font>
                  </Link>
                  <Link to='/signup/' onClick={() => {
                    setMenuTabOpen(false)
                  }}><font className="font1"><font className="font1"><FormattedMessage id="Join" defaultMessage='Register' /></font></font></Link>
                </> :
                <Link to='/logout/' onClick={() => {
                  setMenuTabOpen(false)
                }}><font className="font1">
                    <font className="font1"><FormattedMessage id="Logout" defaultMessage='Logout' /></font></font>
                </Link>
              }

              <div className="language">
                <a className="on" onClick={() => { setShowLangMenu(!showLangMenu) }}><img src={icon_lang} alt="lang" /></a>
                <ul style={showLangMenu ? { display: "block" } : { display: 'none' }}>
                  <li className={((context.locale === 'kr-KO') ? ' on ' : '')}>
                    <a onClick={() => { changeLang('kr-KO') }}>KOR</a>
                  </li>
                  <li className={((context.locale === 'en-US') ? ' on ' : '')}>
                    <a onClick={() => { changeLang('en-US') }}>ENG</a>
                  </li>
                </ul>
              </div>
              <Link to='/' onClick={() => {
                setActiveClassIndex(0)
                setMenuTabOpen(false)
              }}><img src={icon_home} alt="home" /></Link>
            </div>
          </div>
          <div className="allMenu">
            <ul>
              {childMenu?.mainmenu?.items?.map((item, i) => (
                <li ref={buttonRef} onClick={() => {
                  setActiveclassPath(item?.id)
                  setActiveClassIndex(item?.index)
                  history.push(`/home${item?.url}`)
                  toSlide(item?.index)
                  setMenuTabOpen(false)
                }} onMouseEnter={() => {
                  setMouseEnterFlag(true)
                }}
                  onMouseLeave={() => {
                    setMouseEnterFlag(false)
                  }} key={'allMenu_li_' + i}><a className={`${activeClassIndex === item?.index ? 'active_menu' : ''} menu_li`}>{item?.title}</a></li>
              ))}
            </ul>
          </div>
          <button className="btnClose" onClick={() => {
            setMenuTabOpen(false)
          }}>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className="relative" id='fullSlide' >
        <div className={`mainContents ${routeLocation.pathname === '/' ? '' : 'min-h-70'} `} >
          <Suspense fallback={<Loader />}>
            <Switch>
              <Home setActiveClassIndex={(data) => setActiveClassIndex(data)} activeClassIndex={activeClassIndex} setActiveclassPath={(data) => setActiveclassPath(data)} activePath={activeClassPath} lan={context.locale}
                setMainPageInSmallScreen={(data) => setMainPageInSmallScreen(data)} mainPageInSmallScreen={mainPageInSmallScreen} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Suspense>
          <div>
            {showPopup && <Popup toggleModal={toggleModal} />}
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}