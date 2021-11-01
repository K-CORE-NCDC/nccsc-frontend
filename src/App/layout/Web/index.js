import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../../../config";
import route from "../../../route";
import Loader from "../Loader";
import Header from './Header'
import DropdownMenu from './Header/DropdownMenu'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import logo from '../../../assets/images/logo.png'
import footer_logo from '../../../assets/images/f_logo.png'
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

  useEffect(()=>{
    let html = []
    for (let m = 0; m < menu.length; m++) {
      let p = id[0].split('/')[1]
      if(menu[m].props.path.includes(p)){
        let name = menu[m].props.name
        let childname = menu[m].props.childname
        html.push(<li key={m+'2'}><HomeIcon className="h-6 w-6" aria-hidden="true"/></li>)
        html.push(<li key={m+'1'}><span className="mx-2">|</span></li>)
        html.push(<li key={m}><a href="#" className="font-bold">{name}</a></li>)
        html.push(<li key={m+'c1'}><span className="mx-2">|</span></li>)
        html.push(<li key={m+'child'}>{childname}</li>)
      }
    }
    setBreadCrumb(html)
  },[props])

  useEffect(()=>{
    let today = new Date();
    var date = today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate()
    var a_or_p = today.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')[1]
    var time = a_or_p+" "+today.getHours() + ":" + today.getMinutes();

    setCurrentDate(date)
    setCurrentTime(time)
  },[])
  let classes = ''

  if(id[0]==='/'){
    classes = 'screen-2 xl:h-full lg:h-full '
  }

  return (
    <div className="relative">
      <Popover>
          {({ open }) => (
          <div id="header" className={classes}>
            <nav  className="w-full p-2 py-5 navbar-expand-lg">
              <div className="w-full grid md:grid-cols-3 xl:grid-cols-8 2xl:grid-cols-8 px-5  pt-5">
                <div className="relative pt-5 sm:flex xs:flex">
                  <a href="/" className='xs:w-11/12 sm:w-11/12'>
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-16 w-auto "
                      src={logo}
                      alt=""
                    />
                  </a>
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

            {classes!=='' && <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 grid-cols-3 px-64 py-20  text-right text-main-blue">
              <div className='text-center lg:col-span-3 lg:text-center  2xl:col-start-3'>
              <h2 className="text-8xl"><strong>K-CORE</strong> <strong>Portal</strong></h2>
              <h2 className="text-4xl mt-4"><strong>Cancer Omics Research Portal</strong></h2>
              <div className="pl-6">
                <p className="border-l-2 text-2xl p-5 font-medium mt-8 border-gray-600" style={{textAlign: 'right'}}>
                  <FormattedMessage  id = "home_child_title" defaultMessage='It is a cancer data platform that visually provides various analysis results by combining high-quality domestic cancer patient clinical and protein genomic information .'/>
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
                  <div className="grid grid-cols-8">
                    <div className="text-right text-6xl p-5">
                      1
                    </div>
                    <div className="text-right text-6xl p-5">
                      45312
                    </div>
                    <div className="text-right text-6xl p-5">
                      1
                    </div>
                    <div className="text-right text-6xl p-5">
                      1265
                    </div>
                    <div className="text-right text-6xl p-5">
                      1
                    </div>
                    <div className="text-right text-6xl p-5">
                      9865
                    </div>
                    <div className="text-right text-6xl p-5">
                      1
                    </div>
                    <div className="text-right text-6xl p-5">
                      1
                    </div>
                  </div>

                </div>
                <div className="row-span-2 col-span-10 mx-10">
                  <div className="grid grid-cols-8">
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>암종 (Primary Sites)
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>전체대상자 (Sample)
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>유전자 (Genes)
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>돌연변이 (Mutations)
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>유전체 복제수변이 (CNV)
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>융합 유전자 (Fusion Genes)
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>Global Proteome
                    </div>
                    <div className="text-right text-2xl p-5">
                      <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/>Phospho Site
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
                className="absolute top-0 right-0 transition transform origin-top-right md:hidden w-10/12">
                <div className=" shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-10 w-10" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="grid mobile">
                        
                      </div>
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
