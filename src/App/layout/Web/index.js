import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import config from "../../../config";
import route from "../../../route";
import Loader from "../Loader";
import Header from './Header'


import { Fragment } from 'react'
import banner_img from '../../../assets/img/top_banner01.png'
import { Popover, Transition } from '@headlessui/react'
//import logo from '../../../assets/img/main_logo2.png'

import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const menu = route.map((route, index) => {

  return route.component ? (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      name={route.name}
      render={(props) => <route.component {...props} />}
    />
  ) : null;
});
export default function Web() {

  return (
    <div className="relative bg-white ">
      <Popover className="">
          {({ open }) => (
          <>
            <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
              <div className="w-full px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                  <a href="/">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src=''
                      alt=""
                    />
                  </a>
                  <Popover.Button  className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button"><MenuIcon className="h-6 w-6" aria-hidden="true" /></Popover.Button >
                </div>

                <div className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden">
                  <ul className="flex flex-col lg:flex-row list-none mr-auto">
                  </ul>
                  <Header/>
                </div>
              </div>
            </nav>
            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Popover.Panel
                focus
                static
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                          alt="Workflow"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-8">

                      </nav>
                    </div>
                  </div>

                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <Suspense fallback={<Loader />}>
        <Switch>
          {menu}
          <Redirect from="/" to="home" />
        </Switch>
      </Suspense>
    </div>
  )
}
