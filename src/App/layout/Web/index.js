import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../../../config";
import route from "../../../route";
import Loader from "../Loader";
import Header from './Header'
import MobileHeader from './Mobile'
import DropdownMenuMobile from './Mobile/DropdownMenu'
import DropdownMenu from './Header/DropdownMenu'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import logo from '../../../assets/images/logo.png'
import footer_logo from '../../../assets/images/f_logo.png'
import { useSelector, useDispatch } from "react-redux";
import {
  MenuIcon,
  ChevronRightIcon,
  XIcon,
  HomeIcon
} from '@heroicons/react/outline'
import MenuItems from '../../../menu-item'
import {
  useParams
} from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import { getDashboardCount } from "../../../actions/api_actions";


const menu = route.map((route, index) => {

  return route.component ? (
    <Route
      key = {index}
      path =  {route.path}
      exact = {route.exact}
      name = {route.name}
      childname = {route.childname}
      render = {(props) => <route.component {...props} />}
    />
  ) : null;
});


export default function Web(props) {
  let id = useParams();
  const [breadCrumb,setBreadCrumb] = useState([])
  const [currentDate,setCurrentDate] = useState("")
  const [currentTime,setCurrentTime] = useState("")
  const dispatch = useDispatch()
  const countJson = useSelector((data) => data.homeReducer.dataCount);

  useEffect(()=>{
    let html = []
    // console.log(menu)
    for (let m = 0; m < menu.length; m++) {
      let p = id[0].split('/')[1]
      if(menu[m].props.path.includes(p)){
        let name = menu[m].props.name
        let childname = menu[m].props.childname
        html.push(<li key={m+'icon'}><HomeIcon className="h-6 w-6" aria-hidden="true"/></li>)
        html.push(<li key={m+'1pipe'}><span className="mx-2">|</span></li>)
        html.push(<li key={m+name}><a href="#" className="font-bold">{name}</a></li>)
        html.push(<li key={m+'c1'}><span className="mx-2">|</span></li>)
        html.push(<li key={m+'child'}>{childname}</li>)
      }
    }
    setBreadCrumb(html)
  },[props])

  useEffect(()=>{
    if(id[0]==='/home' ){  
      let today = new Date();
      var date = today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate()
      var a_or_p = today.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')[1]
      var time = a_or_p+" "+today.getHours() + ":" + today.getMinutes();

      setCurrentDate(date)
      setCurrentTime(time)
      if(!countJson){
        dispatch(getDashboardCount())
      }
    }

  },[])
  let classes = ''
  if(id[0]==='/home'){
    classes = 'screen-2 xl:h-full lg:h-full '
  }


  return (
    <div className="relative">
      <Popover>
          {({ open }) => (
          <div id="header" className={classes}>
            <nav  className="w-full p-2 py-5 navbar-expand-lg">
              <div className="w-full grid md:grid-cols-3 xl:grid-cols-8 2xl:grid-cols-8 px-5  pt-5">
                <div className="relative pt-5 sm:flex flex">
                  <Link to="/" className='xs:w-11/12 sm:w-11/12'>
                    <span className="sr-only">Workflow</span>
                    <img className="h-16 w-auto " src={logo} alt=""/>
                  </Link>
                  <Popover.Button  className="xs:block sm:block lg:hidden  text-white  cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none" type="button"><MenuIcon className="h-6 w-6" aria-hidden="true" /></Popover.Button >
                </div>
                <div className="hidden 2xl:block 2xl:col-span-5 z-10">
                  <DropdownMenu/>
                </div>
                <div className="hidden md:block lg:block xl:block 2xl:block md:col-span-2 lg:col-span-7 xl:col-span-7 2xl:col-span-2 py-5">
                  <Header/>
                </div>
                <div className="hidden md:block lg:block xl:block 2xl:block md:col-span-3 lg:col-span-8  2xl:hidden px-5 py-5">
                  <DropdownMenu/>
                </div>
              </div>
            </nav>

            {classes!=='' && <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xs:grid-cols-4 lg:px-64 xs:px-40 py-20  text-right text-main-blue">
              <div className='text-center xs:col-span-4  lg:col-span-3 lg:text-center  2xl:col-start-3'>
              <h2 className="lg:text-8xl xs:text-4xl"><strong>K-CORE</strong> <strong>Portal</strong></h2>
              <h2 className="lg:text-4xl xs:text-xl mt-4"><strong>Cancer Omics Research Portal</strong></h2>
              <div className="pl-6">
                <p className="lg:border-l-2 lg:text-2xl xs:text-sm sm:text-xl p-5 font-medium mt-8 border-gray-600" style={{textAlign: 'right'}}>
                  <FormattedMessage  id = "home_child_title" defaultMessage='A cancer data platform that provides a variety of visualized analysis results by combining high quality clinical and proteogenomic information of domestic cancer patients.'/>
                </p>
              </div>
              </div>
            </div>}
            {classes!=='' &&
              <div className="lg:hidden 2xl:block 2xl:grid  grid-rows-2 grid-col-12 grid-flow-col gap-4  text-right text-main-blue px-5">
                <div className='row-span-3 col-span-2 text-6xl py-10'>
                  <div className="row-span-1">
                    <p><span className='text-4xl'>Today &nbsp;&nbsp;</span><strong>{currentDate?currentDate:""}.</strong></p>
                  </div>
                  <div className="row-span-2">
                    <p> {currentTime?currentTime:""}</p>
                  </div>
                </div>

                <div className="col-span-10 border-bottom-blue mx-10">
                  <div className="grid grid-cols-8 border-b border-blue-color ">
                    <div className="text-right text-6xl p-5">
                      1
                    </div>
                    <div className="text-right text-6xl p-5">
                      {(countJson && 'sample' in countJson) ?countJson['sample'] : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                    {(countJson && 'genes' in countJson) ?countJson['genes'] : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                    {(countJson && 'mutation' in countJson) ?countJson['mutation'] : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                    {(countJson && 'cnv' in countJson) ?countJson['cnv'] : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                    {(countJson && 'fusion' in countJson) ?countJson['fusion'] : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                    {(countJson && 'proteome' in countJson) ?countJson['proteome'] : ""}
                    </div>
                    <div className="text-right text-6xl p-5">
                    {(countJson && 'phospho' in countJson) ?countJson['phospho'] : ""}
                    </div>
                  </div>

                </div>
                <div className="row-span-2 col-span-10 mx-10">
                  <div className="grid grid-cols-8">
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage  id = "Primary_Sites" defaultMessage='Primary Sites'/>
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage  id = "Sample" defaultMessage='Sample'/>
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage id='Genes' defaultMessage='Genes'/>
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage id='Mutations' defaultMessage='Mutations'/>
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage id='cnv' defaultMessage='CNV'/>
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage id='Fusion Genes' defaultMessage='Fusion Genes'/>
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage id='Global Proteome' defaultMessage='Global Proteome'/>
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>
                      <FormattedMessage id='Phospho Site' defaultMessage='Phospho Site'/>
                    </div>
                  </div>
                </div>
              </div>
            }

            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Popover.Panel
                focus
                static
                className="absolute top-0 right-0 transition transform origin-top-right md:hidden w-10/12 z-50">
                <div className=" shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="py-6  mobile-background">
                    <div className="flex items-center justify-between">
                      <div>

                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 mr-6">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-10 w-10" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <MobileHeader/>
                      <DropdownMenuMobile/>
                    </div>
                  </div>

                </div>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover>
      {classes =='' && <nav className="bg-grey-light rounded w-full bg-white p-5">
        <ol className="list-reset flex text-grey-dark p-5">
          {breadCrumb}
        </ol>
      </nav> }

      <Suspense fallback={<Loader />}>
        <Switch>
          {menu}
          <Redirect from="/" to="home" />
        </Switch>
      </Suspense>

      <footer className="p-10 bg-white border-gray-300 border-t">
        <div className="grid grid-cols-2">
          <div className="text-gray-500">
            <p>경기도 고양시 일산동구 일산로 323 국립암센터</p>
            <p>
              Copyright ⓒ 2021 by NCC. All rights reserved.
            </p>
          </div>
          <div>
            <img src={footer_logo} alt="footer-logo" className="float-right"/>
          </div>
        </div>
      </footer>
    </div>
  )
}
