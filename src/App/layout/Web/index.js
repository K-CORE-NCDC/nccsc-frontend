import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, Route, Switch, useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import uuid from 'react-uuid';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Swal from 'sweetalert2';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.css';
import { SetCookie, sendlogManagement } from '../../../actions/api_actions';
import config from '../../../config';
import NotFound from '../../../containers/404NotFound';
import FooterComponent from '../../../containers/Common/FooterComponent/FooterComponent';
import Popup from '../../../containers/Popup/Popup';
import { getCookie } from '../../../containers/getCookie';
import childMenu from '../../../menu-item';
import route from '../../../route';
import icon_home from '../../../styles/images/icon-home02.svg';
import icon_lang from '../../../styles/images/icon-language.svg';
import mainLogo from '../../../assets/images/mainLogo.png';
import mainLogowhite from '../../../assets/images/mainLogowhite.png';
import icon_user04 from '../../../styles/images/icon-user04.svg';
import { Context } from '../../../wrapper';
import Loader from '../Loader';
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
        render={(props) => <route.component parentProps={parentProps} {...props} />}
      />
    ) : null;
  });
};

export default function Web() {
  const routeLocation = useLocation();
  const timeout = 3000;
  const [showPopup, setShowPopup] = useState(true);
  const handleOnActive = () => { };
  const handleOnIdle = () => { };
  const dispatch = useDispatch();
  const history = useHistory();
  const context = useContext(Context);
  const [activeClassPath, setActiveclassPath] = useState('');
  const [activeClassIndex, setActiveClassIndex] = useState(0);
  const swiperRef = useRef(null);
  const buttonRef = useRef(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mouseEnterFlag, setMouseEnterFlag] = useState(false);
  const [menuTabOpen, setMenuTabOpen] = useState(false);
  const [is_login, setIsLogin] = useState(false);
  const [mainPageInSmallScreen, setMainPageInSmallScreen] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0)


  useEffect(() => {
    let cookiedata = SetCookie();
    cookiedata &&
      cookiedata.then((result) => {
        if (result.status === 200) {
        }
      });
    document.body.addEventListener('click', checkPopup);
  }, []);

  const checkPopup = (event) => {
    if (event.target.id === 'langBox') {
      setShowLangMenu(true);
    } else {
      if (showLangMenu) {
        setShowLangMenu(false);
      }
    }
  };

  useEffect(() => {
    if (getCookie('is_login') && getCookie('is_login') === 'True') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [window.location.pathname]);

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
            history.push('/logout/');
          }
        });
      }, delay);

      // Clean up the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  });

  const toSlide = (num) => {
    swiperRef.current?.swiper.slideTo(num);
  };



  const changeLang = (type) => {
    setShowLangMenu(!showLangMenu);
    if (type === 'kr-KO') {
      context.locale = 'kr-KO';
      context.selectLanguage('kr-KO');
    } else {
      context.locale = 'en-US';
      context.selectLanguage('en-US');
    }
  };


  const { } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  });

  let id = useParams();
  const latandLong = {};



  let toggleModal = (close) => {
    setShowPopup(close);
  };

  useEffect(() => {
    let userid = '';
    let category = 'Others';
    if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1)) {
      category = 'Visualize My Data';
    } else if (
      [
        'circos',
        'OncoPrint',
        'lollipop',
        'volcano',
        'heatmap',
        'survival',
        'correlation',
        'CNV',
        'box',
        'fusion'
      ].some((r) => window.location.href.split('/').indexOf(r) >= 0)
    ) {
      category = 'Example Data Visualization';
    }

    if (getCookie('is_login') && getCookie('is_login') !== null) {
      userid = getCookie('username');
    } else {
      if (getCookie('sessionId') === undefined) {
        localStorage.removeItem('ncc_access_token');
        localStorage.removeItem('ncc_refresh_token');
      }
    }

    sessionStorage.setItem('sessionId', uuid());
    sessionStorage.setItem('firstTime', true);
    // updateLocation();
    var today = new Date();

    if (sessionStorage.getItem('firstTime')) {
      // updateLocation();
      var loginTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      sessionStorage.setItem('loginTime', loginTime);
      sessionStorage.setItem('prevTime', loginTime);
      sessionStorage.setItem('firstTime', false);
      sessionStorage.setItem('IdNumber', 0);
      let sessionId = sessionStorage.getItem('sessionId');
      let arrayOfLog = [];
      let object = {
        id: 0,
        sessionId: sessionId,
        url: 'http://localhost:9192/home',
        startTime: loginTime,
        endTime: '',
        userid: userid,
        category: category
      };
      arrayOfLog[0] = object;
      sessionStorage.setItem('logData', JSON.stringify(arrayOfLog));
    }
    if (id[0] === '/') {
      var time = today.getHours() + ':' + (today.getMinutes() <= 9 ? `00` : today.getMinutes());
      setCurrentTime(time);
    }

  }, []);



  useEffect(() => {

    let noticeDate = new Date()
    const options = { timeZone: "Asia/Seoul", year: 'numeric', month: 'numeric', day: 'numeric' };
    noticeDate = noticeDate.toLocaleString("en-US", options);

    if (localStorage.getItem('ncc_notice_popup') === null) {
      localStorage.setItem('ncc_notice_popup', JSON.stringify({ date: noticeDate, showpopup: true }));
      setShowPopup(true);
    } else if (localStorage.getItem('ncc_notice_popup') !== null) {

      let check_popup = JSON.parse(localStorage.getItem('ncc_notice_popup'));

      if (check_popup['date'] === noticeDate && check_popup['showpopup']) {
        setShowPopup(true);
      } else if (check_popup['date'] === noticeDate && !check_popup['showpopup']) {
        setShowPopup(false);
      } else if (new Date(noticeDate) > new Date(check_popup['date'])) {
        localStorage.setItem('ncc_notice_popup', JSON.stringify({ date: noticeDate, showpopup: true }));
      }
      else if (check_popup['date'] !== noticeDate) {
        setShowPopup(false);
      }

    }
    if (!sessionStorage.getItem('location')) {
      // updateLocation();
    }
    let sessionAuth = '';
    let userid = '';
    let category = 'Others';

    if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1)) {
      category = 'Visualize My Data';
    } else if (
      [
        'circos',
        'OncoPrint',
        'lollipop',
        'volcano',
        'heatmap',
        'survival',
        'correlation',
        'CNV',
        'box',
        'fusion'
      ].some((r) => window.location.href.split('/').indexOf(r) >= 0)
    ) {
      category = 'Example Data Visualization';
    }

    if (getCookie('sessionId')) {
      sessionAuth = getCookie('sessionId');
      if (sessionAuth) {
        if (getCookie('username')) {
          userid = getCookie('username');
        }
      }
    }

    var url = window.location.href;
    let sessionId = sessionStorage.getItem('sessionId');
    let idNumber = JSON.parse(sessionStorage.getItem('IdNumber'));
    let logData = sessionStorage.getItem('logData');
    let logDataIs = JSON.parse(logData);
    let latitude = latandLong['lat'];
    let longitude = latandLong['lon'];
    var today = new Date();
    const todays = new Date();
    const yyyy = todays.getFullYear();
    let mm = todays.getMonth() + 1; // Months start at 0!
    let dd = todays.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    var currentTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    if (idNumber in logDataIs) logDataIs[idNumber]['endTime'] = currentTime;
    idNumber++;

    let object = {
      id: idNumber,
      sessionId: sessionId,
      url: url,
      startTime: currentTime,
      endTime: '',
      latitude: latitude,
      longitude: longitude,
      visitedDate: formattedToday,
      userid: userid,
      category: category
    };
    sessionStorage.setItem('IdNumber', idNumber);
    logDataIs[idNumber] = object;
    sessionStorage.setItem('logData', JSON.stringify(logDataIs));
    if (logDataIs.length >= 10) {
      logDataIs[idNumber]['endTime'] = currentTime;
      idNumber = 0;
      sessionStorage.setItem('IdNumber', idNumber);
      dispatch(sendlogManagement('POST', logDataIs));
      logDataIs.length = 0;
      let latitude = latandLong['lat'];
      let longitude = latandLong['lon'];
      let object = {
        id: 0,
        sessionId: sessionId,
        url: url,
        startTime: currentTime,
        endTime: '',
        latitude: latitude,
        longitude: longitude,
        visitedDate: formattedToday,
        username: 'sameer',
        category: category
      };
      logDataIs[idNumber] = object;
      sessionStorage.setItem('logData', JSON.stringify(logDataIs));
    }
  }, [window.location.href]);

  window.onscroll = function () {
    setHeaderHeight(window.scrollY)
  }


  let classes = '';
  if (window.innerWidth > 1025 && window.innerHeight > 870) {
    if (activeClassIndex === 0 && mouseEnterFlag && (window.location.pathname === '/k-core/' || window.location.pathname === '/')) {
      classes = 'header rev';
    } else if (
      activeClassIndex === 0 &&
      !mouseEnterFlag &&
      (window.location.pathname === '/k-core/' || window.location.pathname === '/')
    ) {
      classes = 'header';
    } else if (activeClassIndex !== 0 && mouseEnterFlag) {
      classes = 'header on  rev';
    } else {
      if (window.location.pathname === '/k-core/' || window.location.pathname === '/') {
        classes = 'header on'
      } else {
        if (headerHeight <= 150) {
          classes = 'header'
        } else {
          classes = 'header on'
        }
      }
    }
  } else {
    if (
      mainPageInSmallScreen === 0 &&
      mouseEnterFlag &&
      (window.location.pathname === '/k-core/' || window.location.pathname === '/')
    ) {
      classes = 'header rev';
    } else if (
      mainPageInSmallScreen === 0 &&
      !mouseEnterFlag &&
      (window.location.pathname === '/k-core/' || window.location.pathname === '/')
    ) {
      classes = 'header';
    } else if (mainPageInSmallScreen !== 0 && mouseEnterFlag) {
      classes = 'header on rev';
    } else {
      if (window.location.pathname === '/k-core/' || window.location.pathname === '/') {
        classes = 'header on'
      } else {
        if (headerHeight <= 150) {
          classes = 'header'
        } else {
          classes = 'header on'
        }
      }
    }
  }

  return (
    <>
      <header id="header" className={classes}>
        <div className="headerTop">
          <div className="auto fullsize">
            <h1 className="logo">
              <a href="/k-core/">
                {/* <img src={logoNew} alt="logo" className="logo01" /> */}
                <img src={mainLogowhite} alt="logo" className="logo01" style={{width:"108px"}} />
                <img src={mainLogo} alt="logo" className="logo02" style={{width:"108px"}}/>
              </a>
            </h1>
            <div className="headerUtils">
              {is_login ? (
                <>
                  <Link to="/logout/" id="Logout">
                    <FormattedMessage id="Logout" defaultMessage="Logout" />
                  </Link>
                  {getCookie('superuser') && (
                    <a href={`${config.auth}home`}>
                      <FormattedMessage id="Admin" defaultMessage="Admin" />
                    </a>
                  )}
                </>
              ) : (
                <>
                  <Link to="/signup/" id="GenerateRegistrationNumber">
                    <FormattedMessage
                      id="GenerateRegistrationNumber"
                      defaultMessage="Generate registration number"
                    />
                  </Link>
                  <Link to="/login/" id="Login">
                    <FormattedMessage id="Login" defaultMessage="Login" />
                  </Link>
                  <Link to="/findpassword/" id="FindPassword">
                    <FormattedMessage id="FindPassword" defaultMessage="Find Password" />
                  </Link>{' '}
                </>
              )}
              <div className="language">
                <a
                  id="langBox"
                  className="on"
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                  }}
                >
                  &nbsp;
                </a>
                <ul style={showLangMenu ? { display: 'block' } : { display: 'none' }}>
                  <li className={context.locale === 'kr-KO' ? ' on ' : ''}>
                    <a
                      onClick={() => {
                        changeLang('kr-KO');
                      }}
                    >
                      KOR
                    </a>
                  </li>
                  <li className={context.locale === 'en-US' ? ' on ' : ''}>
                    <a
                      onClick={() => {
                        changeLang('en-US');
                      }}
                    >
                      ENG
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <a
            onClick={() => {
              setMenuTabOpen(true);
            }}
            className="btnAllMenu"
          >
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
                  <li
                    key={'menuli_' + i}
                    ref={buttonRef}
                    onClick={() => {
                      setActiveclassPath(item?.id);
                      setActiveClassIndex(item?.index);
                      history.push(`/home${item?.url}`);
                      toSlide(item?.index);
                    }}
                    onMouseEnter={() => {
                      setMouseEnterFlag(true);
                    }}
                    onMouseLeave={() => {
                      setMouseEnterFlag(false);
                    }}
                  >
                    <a
                      className={`${(mainPageInSmallScreen !== 0 && activeClassIndex === item?.index) ||
                        activeClassIndex === item?.index
                        ? 'active_menu'
                        : ''
                        } menu_li`}
                      style={
                        (mainPageInSmallScreen !== 0 && activeClassIndex === item?.index) ||
                          activeClassIndex === item?.index
                          ? { color: '#009fe2' }
                          : { color: '' }
                      }
                    >
                      {item?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div
          id="allMenuWrap"
          className="allMenuWrap"
          style={menuTabOpen ? { display: 'block' } : { display: 'none' }}
        >
          <div className="imgBox">
            <dl>
              <dt className={`${context?.locale === 'kr-KO' ? 'korean' : ''}`}>
                <font className="font1"></font>
                <br />
                <font className="font1">
                  <font className="font1">
                    <FormattedMessage
                      id="WelcometoK-corePortal"
                      defaultMessage="Welcome to K-Core Portal"
                    />
                  </font>
                </font>
              </dt>
              <dd>
                <font className="font1">
                  <font className="font1">
                    <FormattedMessage
                      id="Designated"
                      defaultMessage="K-Core Portal is a web-based analysis portal that provides visualizations of cancer genomic data, and it is a sub-service portal of the National Cancer Data Center website."
                    />
                  </font>
                </font>
              </dd>
            </dl>
            <div className="members">
              <p>
                <span>
                  <font className="font1">
                    <font className="font1">
                      <FormattedMessage id="PleaseLogIn" defaultMessage="Please log in" />
                    </font>
                  </font>
                </span>
                <font className="font1">
                  <font className="font1"> .</font>
                </font>
              </p>
            </div>
            <div className="btnsMember">
              {!is_login ? (
                <>
                  <Link
                    to="/login/"
                    onClick={() => {
                      setMenuTabOpen(false);
                    }}
                  >
                    <font className="font1">
                      <font className="font1">
                        <FormattedMessage id="Login" defaultMessage="Login" />
                      </font>
                    </font>
                  </Link>
                  <Link
                    to="/signup/"
                    onClick={() => {
                      setMenuTabOpen(false);
                    }}
                  >
                    <font className="font1">
                      <font className="font1">
                        <FormattedMessage id="Join" defaultMessage="Register" />
                      </font>
                    </font>
                    <img src={icon_user04} alt="user" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/logout/"
                  onClick={() => {
                    setMenuTabOpen(false);
                  }}
                >
                  <font className="font1">
                    <font className="font1">
                      <FormattedMessage id="Logout" defaultMessage="Logout" />
                    </font>
                  </font>
                </Link>
              )}
            </div>
            <div className="utils">
              {!is_login ? (
                <>
                  <Link
                    to="/login/"
                    onClick={() => {
                      setMenuTabOpen(false);
                    }}
                  >
                    <font className="font1">
                      <font className="font1">
                        <FormattedMessage id="Login" defaultMessage="Login" />
                      </font>
                    </font>
                  </Link>
                  <Link
                    to="/signup/"
                    onClick={() => {
                      setMenuTabOpen(false);
                    }}
                  >
                    <font className="font1">
                      <font className="font1">
                        <FormattedMessage id="Join" defaultMessage="Register" />
                      </font>
                    </font>
                  </Link>
                </>
              ) : (
                <Link
                  to="/logout/"
                  onClick={() => {
                    setMenuTabOpen(false);
                  }}
                >
                  <font className="font1">
                    <font className="font1">
                      <FormattedMessage id="Logout" defaultMessage="Logout" />
                    </font>
                  </font>
                </Link>
              )}

              <div className="language">
                <a
                  className="on"
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                  }}
                >
                  <img src={icon_lang} alt="lang" />
                </a>
                <ul style={showLangMenu ? { display: 'block' } : { display: 'none' }}>
                  <li className={context.locale === 'kr-KO' ? ' on ' : ''}>
                    <a
                      onClick={() => {
                        changeLang('kr-KO');
                      }}
                    >
                      KOR
                    </a>
                  </li>
                  <li className={context.locale === 'en-US' ? ' on ' : ''}>
                    <a
                      onClick={() => {
                        changeLang('en-US');
                      }}
                    >
                      ENG
                    </a>
                  </li>
                </ul>
              </div>
              <Link
                to="/"
                onClick={() => {
                  setActiveClassIndex(0);
                  setMenuTabOpen(false);
                }}
              >
                <img src={icon_home} alt="home" />
              </Link>
            </div>
          </div>
          <div className="allMenu">
            <ul>
              {childMenu?.mainmenu?.items?.map((item, i) => (
                <li
                  ref={buttonRef}
                  onClick={() => {
                    setActiveclassPath(item?.id);
                    setActiveClassIndex(item?.index);
                    history.push(`/home${item?.url}`);
                    toSlide(item?.index);
                    setMenuTabOpen(false);
                  }}
                  onMouseEnter={() => {
                    setMouseEnterFlag(true);
                  }}
                  onMouseLeave={() => {
                    setMouseEnterFlag(false);
                  }}
                  key={'allMenu_li_' + i}
                >
                  <a className={`${activeClassIndex === item?.index ? 'active_menu' : ''} menu_li`}>
                    {item?.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btnClose"
            onClick={() => {
              setMenuTabOpen(false);
            }}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className="relative" id="fullSlide">
        <div className={`mainContents ${routeLocation.pathname === '/' ? '' : 'min-h-70'} `}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Home
                setActiveClassIndex={(data) => setActiveClassIndex(data)}
                activeClassIndex={activeClassIndex}
                setActiveclassPath={(data) => setActiveclassPath(data)}
                activePath={activeClassPath}
                lan={context.locale}
                setMainPageInSmallScreen={(data) => setMainPageInSmallScreen(data)}
                mainPageInSmallScreen={mainPageInSmallScreen}
              />
              <Route exact path="*" component={NotFound} lan={context.locale} />
            </Switch>
          </Suspense>
          <div>{showPopup && <Popup toggleModal={toggleModal} />}</div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}
