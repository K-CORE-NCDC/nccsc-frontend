/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import route from "../../../route";
import Loader from "../Loader";
import Header from "./Header";
import MobileHeader from "./Mobile";
import DropdownMenuMobile from "./Mobile/DropdownMenu";
import DropdownMenu from "./Header/DropdownMenu";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import logoNew from "../../../assets/images/Left_up.png";
import footer_logo from "../../../assets/images/f_logo.png";
import { useDispatch } from "react-redux";
import uuid from 'react-uuid';
import { getCookie } from "../../../containers/getCookie";

import { Context } from "../../../wrapper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s1 from "../../../assets/images/f_ci1.png";
import s2 from "../../../assets/images/f_ci2.png";
import s3 from "../../../assets/images/f_ci3.png";
import s4 from "../../../assets/images/f_ci4.png";
import s5 from "../../../assets/images/f_ci5.png";
import s6 from "../../../assets/images/f_ci6.png";
import s7 from "../../../assets/images/f_ci7.png";
import breast_cancer_english from "../../../assets/images/breast_cancer_english.png";
import breast_cancer_korean from "../../../assets/images/breast_cancer_korean.png";
import s8 from "../../../assets/images/right_below_add.png";
import { FormattedMessage } from "react-intl";
import NotFound from "../../../containers/404NotFound";
import {
  MenuIcon,
  ChevronRightIcon,
  XIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { sendlogManagement, DashboardCount, SetCookie } from "../../../actions/api_actions";
import Popup from "../../../containers/Popup/Popup";
import { useIdleTimer } from 'react-idle-timer'
import childMenu from "../../../menu-item";

let parseJwt = (islogin1) => {
  var base64Url = islogin1 && islogin1.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);


}

const menu = route.map((route, index) => {
  return route.component ? (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      name={route.name}
      childname={route.childname}
      render={(props) => <route.component {...props} />}
    />
  ) : null;
});

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


  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);


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

    let sessionAuth = ''
    let userid = ''
    let category = 'Others'
    if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1)) {
      category = 'User DataVisualization'
    }
    else if (['circos', 'OncoPrint', 'lollipop', 'volcano', 'heatmap', 'survival', 'correlation', 'CNV', 'box', 'fusion'].some(r => window.location.href.split("/").indexOf(r) >= 0)) {
      category = 'DataVisualization'
    }
    if (getCookie('sessionId') && getCookie('sessionId') !== undefined) {
      sessionAuth = getCookie('sessionId');
      if (sessionAuth) {
        if (getCookie('username')) {
          userid = getCookie('username')
        }
      }
    }
    else {
      if (getCookie('sessionId') === undefined) {
        localStorage.removeItem('ncc_access_token')
        localStorage.removeItem('ncc_refresh_token')
      }
    }

    sessionStorage.setItem('sessionId', uuid())
    sessionStorage.setItem('firstTime', true)
    updateLocation();
    var today = new Date();

    if (sessionStorage.getItem("firstTime")) {
      updateLocation();
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

  }, [])

  useEffect(() => {
    updateLocation()
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
      updateLocation();
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
    let html = [];
    for (let m = 0; m < menu.length; m++) {
      let p = ''
      if (Object.keys(id).length !== 0) {
        p = id[0].split("/")[1];
      }
      let pp = pid.split("/")[1]
      if (menu[m].props.path.includes(pp)) {
        let name = menu[m].props.name;
        let childname = menu[m].props.childname;

        html.push(
          <li key={m + "icon"}>
            <HomeIcon className="h-6 w-6" aria-hidden="true" />
          </li>
        );
        html.push(
          <li key={m + "1pipe"}>
            <span className="mx-2">|</span>
          </li>
        );
        html.push(
          <li key={m + name}>
            <a className="font-bold">
              {name}
            </a>
          </li>
        );
        html.push(
          <li key={m + "c1"}>
            <span className="mx-2">|</span>
          </li>
        );
        if (window.location.href.includes('visualise')) {
          if (routeLocation.pathname.split("/")[3] !== '') {
            html.push(<li key={m + "child"}>MyData Visualization</li>);
          }
          else {
            html.push(<li key={m + "child"}>{childname}</li>);
          }
        }
        else {
          html.push(<li key={m + "child"}>{childname}</li>);
        }
      }
    }
    setBreadCrumb(html);
  }, [props, project_id, routeLocation.pathname]);



  let classes = "";
  if (pid === "/") {
    classes = "2xl:screen-2 2xl:h-full h-full ";
  }



  return (
    <div className="relative">


      <Popover>
        {({ open }) => (
          <div id="header" className={classes}>
            <nav className="w-full navbar-expand-lg border-b border-white">
              <div className="w-full grid md:grid-cols-3 xl:grid-cols-8 2xl:grid-cols-8 px-5  pt-5">
                <div className="relative pr-5 sm:flex flex">
                  <Link to="/" className="">
                    <img className="" width="210" src={logoNew} alt="logo" />
                  </Link>
                  {/* <Popover.Button
                    className="xs:block sm:block md:block lg:hidden  text-white  cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
                    type="button"
                  >
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button> */}
                </div>
                {/* <div className="hidden 2xl:block 2xl:col-span-5 z-10">
                  <DropdownMenu />
                </div> */}
                <div className="hidden md:block lg:block xl:block 2xl:block md:col-span-2 lg:col-span-7 xl:col-span-7 2xl:col-span-2 py-3">
                  <Header />
                </div>
                {/* <nav className="hidden lg:block lg:text-2xl border-b border-white text-white bg-black" >
                  <div className="grid grid-cols-6 gap-4 bg-transparent py-5">
                    <div className="col-start-2 col-span-4">
                      <div className="flex justify-between">
                      {childMenu?.mainmenu?.items?.map((item,i) =>{
                        <span>{item}</span>

                      })}
                      </div>
                    </div>

                  </div>
                </nav> */}
                {/* <div className="hidden lg:block xl:block 2xl:block md:col-span-3 lg:col-span-8  2xl:hidden px-5 py-5">
                  <DropdownMenu />
                </div> */}
              </div>
            </nav>
            <nav className="hidden lg:block w-full navbar-expand-lg border-b border-white text-white">
              <div className="grid grid-cols-6 gap-4 bg-transparent py-5">
                <div className="col-start-2 col-span-4">
                  <div className="flex justify-between">
                    {childMenu?.mainmenu?.items?.map((item, i) => (
                      <span className="text-3xl group_box h-full font-bold items-center w-full">{item?.title}</span>
                    ))}
                  </div>
                </div>
              </div>
            </nav>




            {/* {classes !== "" && routeLocation.pathname === '/' && (
              <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xs:grid-cols-4 lg:px-64 xs:px-40 py-20  text-right text-main-blue">
                <div className="text-center xs:col-span-4  lg:col-span-3 lg:text-start  2xl:col-start-3">
                  <h2 className="lg:text-8xl xs:text-4xl">
                    <strong>K-CORE</strong>{" "}
                  </h2>
                  <h2 className="lg:text-4xl xs:text-xl mt-4">
                    <strong>K-Core Cancer Omics Research Portal</strong>
                  </h2>
                  <div className="pl-6 hidden lg:block ">
                    <p
                      className=" lg:border-l-2 lg:text-2xl xs:text-sm sm:text-xl p-5 font-medium mt-8 border-gray-600 2xl:text-right"
                    >
                      <FormattedMessage
                        id="home_child_title"
                        defaultMessage="임상 및 오믹스(유전체, 전사체, 단백질) 데이터 정보를 종합적으로 분석할 수 있는
                        분석 방법 등을 시스템으로 공유함으로써 연구 기반 조성하기 위한 서비스 입니다"
                      />
                    </p>
                  </div>
                </div>
                <div>

                </div>
              </div>
            )} */}




            {/* {classes !== "" && routeLocation.pathname === '/' && (
              <div className="hidden 2xl:block 2xl:grid  grid-rows-2 grid-col-12 grid-flow-col gap-4  text-right text-main-blue px-5">
                <div className="row-span-3 col-span-2 text-6xl py-10">
                  <div className="row-span-1">
                    <p>
                      <span className="text-4xl">Today &nbsp;&nbsp;</span>
                      <strong>{currentDate ? currentDate : ""}.</strong>
                    </p>
                  </div>
                  <div className="row-span-2">
                    <p> {currentTime ? currentTime : ""}</p>
                  </div>
                </div>
                <div className="col-span-10 border-bottom-blue mx-10">
                  <div className="grid grid-cols-8 border-b border-blue-color ">
                    <div className="text-right text-6xl p-5">1</div>
                    <div className="text-right text-6xl p-5">
                      {countStatus === 200 && countJson && "sample" in countJson
                        ? countJson["sample"]
                        : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                      {countStatus === 200 && countJson && "genes" in countJson
                        ? countJson["genes"]
                        : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                      {countStatus === 200 && countJson && "mutation" in countJson
                        ? countJson["mutation"]
                        : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                      {countStatus === 200 && countJson && "cnv" in countJson ? countJson["cnv"] : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                      {countStatus === 200 && countJson && "fusion" in countJson
                        ? countJson["fusion"]
                        : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                      {countStatus === 200 && countJson && "proteome" in countJson
                        ? countJson["proteome"]
                        : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                      {countStatus === 200 && countJson && "phospho" in countJson
                        ? countJson["phospho"]
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="row-span-2 col-span-10 mx-10">
                  <div className="grid grid-cols-8">
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage
                        id="Primary_Sites"
                        defaultMessage="Primary Sites"
                      />
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage id="Sample" defaultMessage="Sample" />
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage id="Genes" defaultMessage="Genes" />
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage
                        id="Mutations"
                        defaultMessage="Mutations"
                      />
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage id="cnv" defaultMessage="CNV" />
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage
                        id="Fusion Genes"
                        defaultMessage="Fusion Genes"
                      />
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage
                        id="Global Proteome"
                        defaultMessage="Global Proteome"
                      />
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                      <FormattedMessage
                        id="Phospho Site"
                        defaultMessage="Phospho Site"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )} */}





            {/* <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute top-0 right-0 transition transform origin-top-right  w-10/12 z-50"
              >
                <div className=" shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="py-6  mobile-background">
                    <div className="flex items-center justify-between">
                      <div></div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 mr-6">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-10 w-10" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <MobileHeader />
                      <DropdownMenuMobile />
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition> */}
          </div>
        )}
      </Popover>




      {/* {classes === "" && routeLocation.pathname !== '/' &&  (
        <nav className="bg-grey-light rounded w-full bg-white p-5">
          <ol className="list-reset flex text-grey-dark p-5 text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md">{breadCrumb}</ol>
        </nav>
      )} */}
      <div className={`${routeLocation.pathname === '/' ? '' : 'min-h-70'}`}>
        {/* <Suspense fallback={<Loader />}>
        <Switch>
          {menu}
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Suspense> */}
        {/* <div>
        { showPopup  ? <Popup toggleModal = {toggleModal}/> : '' }
      </div> */}
      </div>

      {/* {
          routeLocation.pathname === '/' && <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 ">
            <div className="bg-white 2xl:hidden">
              <div className="grid grid-cols-5 p-14 border-b border-blue">
                <div className="text-right sm:text-3xl xs:text-xl sm:col-start-1 lg:text-5xl lg:col-start-2">
                  Today
                </div>
                <div className="text-left sm:text-4xl xs:text-xl lg:text-6xl px-10 lg:col-span-3 sm:col-span-4">
                  <p>
                    {currentDate ? currentDate : ""}
                    <br />
                    <br />
                    {currentTime ? currentTime : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 ">
                <div className="border-r border-blue ">
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage
                      id="Primary_Sites"
                      defaultMessage="Primary Sites"
                    />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage id="Sample" defaultMessage="Sample" />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage id="Genes" defaultMessage="Genes" />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage id="Mutations" defaultMessage="Mutations" />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage id="cnv" defaultMessage="CNV" />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage
                      id="Fusion Genes"
                      defaultMessage="Fusion Genes"
                    />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage
                      id="Global Proteome"
                      defaultMessage="Global Proteome"
                    />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                  <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                    <FormattedMessage
                      id="Phospho Site"
                      defaultMessage="Phospho Site"
                    />
                    <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
                  </div>
                </div>
                <div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    1
                  </div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    {countStatus === 200 && countJson && "sample" in countJson ? countJson["sample"] : ""}
                  </div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    {countStatus === 200 && countJson && "genes" in countJson ? countJson["genes"] : ""}
                  </div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    {countStatus === 200 && countJson && "mutation" in countJson
                      ? countJson["mutation"]
                      : ""}
                  </div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    {countStatus === 200 && countJson && "cnv" in countJson ? countJson["cnv"] : ""}
                  </div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    {countStatus === 200 && countJson && "fusion" in countJson ? countJson["fusion"] : ""}
                  </div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    {countStatus === 200 && countJson && "proteome" in countJson
                      ? countJson["proteome"]
                      : ""}
                  </div>
                  <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                    {countStatus === 200 && countJson && "phospho" in countJson
                      ? countJson["phospho"]
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-main-blue p-14 2xl:p-5  2xl:col-span-2">
              <div className="grid 2xl:grid-cols-12">
                <div className="text-white grid text-center mb-16 content-center text-3xl 2xl:col-span-2">
                  <FormattedMessage
                    id="Data of included cancer type"
                    defaultMessage="Data of included cancer type"
                  />
                  <br />
                  <FormattedMessage
                    id="Table relationship"
                    defaultMessage="[Table relationship]"
                  />
                </div>
                <div className=" con 2xl:col-span-10">
                  <ul className="grid lg:grid-cols-3 2xl:grid-cols-10">
                    <li className="text-center pt-1  relative">
                      <a>
                        <button
                          onClick={() => setShowModal(true)}
                          className="w-full"
                        >
                          <span></span>
                          <font className="text-white text-3xl text-3xl ">
                            <FormattedMessage
                              id="breast cancer"
                              defaultMessage="Breast cancer"
                            />
                          </font>
                        </button>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl text-center">
                          <FormattedMessage
                            id="Thyroid cancer"
                            defaultMessage="Thyroid cancer"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl text-center">
                          <FormattedMessage
                            id="Cervical cancer"
                            defaultMessage="Cervical cancer"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl">
                          <FormattedMessage
                            id="lung cancer"
                            defaultMessage="lung cancer"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1  relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl text-center">
                          <FormattedMessage
                            id="Colorectal cancer"
                            defaultMessage="Colorectal cancer"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl text-center">
                          <FormattedMessage
                            id="renal cancer"
                            defaultMessage="Renal cancer"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl ">
                          <FormattedMessage
                            id="Liver cancer"
                            defaultMessage="Liver cancer"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl text-center">
                          <FormattedMessage
                            id="cancer of the stomach"
                            defaultMessage="Cancer of the stomach"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl text-center">
                          <FormattedMessage
                            id="Prostate cancer"
                            defaultMessage="Prostate cancer"
                          />
                        </font>
                      </a>
                    </li>
                    <li className="text-center pt-1 relative">
                      <a>
                        <span></span>
                        <font className="text-white text-3xl text-center">
                          <FormattedMessage
                            id="Pancreatic cancer"
                            defaultMessage="Pancreatic cancer"
                          />
                        </font>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-white lg:pt-0  pt-20">
            <div className="py-10 border-t ">
              <Slider {...settings}>
                <div>
                  <img src={s1} alt="s1" />
                </div>
                <div>
                  <img src={s2} alt="s2" />
                </div>
                <div>
                  <img src={s3} alt="s3" />
                </div>
                <div>
                  <img src={s4} alt="s4" />
                </div>
                <div>
                  <img src={s5} alt="s5" />
                </div>
                <div>
                  <img src={s6} alt="s6" />
                </div>
                <div>
                  <img src={s7} alt="s7" />
                </div>
                <div>
                  <img src={s8} width="250" alt="s8" />
                </div>
              </Slider>
            </div>
          </div>
          {showModal ? (
            <>
              <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
                <div className="relative w-auto my-6 mx-auto container md-container">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div>
                      {koreanlanguage && (
                        <div className="relative p-6 flex-auto">
                            <img src={breast_cancer_korean} alt="breast-cancer" />
                        </div>
                      )}
                      {Englishlanguage && (
                        <div className="relative p-6 flex-auto">
                          <img src={breast_cancer_english} alt="breast-cancer"  />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        <FormattedMessage id="Close" defaultMessage="Close" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          </div>
    } */}

      {/* <footer className="border-gray-300 border-t w-full ">
        <div className="d-flex flex-row text-white" style={{ height: "50px", backgroundColor: "#203239" }}>
          <Link to="/termsandconditions/" className="m-5">
            <FormattedMessage id="TermsofService" defaultMessage="Member Terms and Conditions" />
          </Link>
          <p className="m-5">|</p>
          <Link to="/privacypolicy/" className="m-5 text-yellow-200">
            <FormattedMessage id="PrivacyPolicy" defaultMessage="Privacy Policy" />
          </Link>
        </div>
        <div className="grid grid-cols-2" style={{ backgroundColor: "#F0EBE3", height: "80px" }}>
          <div className="text-gray-500 my-auto">
            <p>경기도 고양시 일산동구 일산로 323 국립암센터</p>
            <p>Copyright ⓒ 2021 by NCC. All rights reserved.</p>
          </div>
          <div className="my-auto">
            <img src={footer_logo} alt="footer-logo" className="float-right" />
          </div>
        </div>
      </footer> */}
    </div>
  );
}
