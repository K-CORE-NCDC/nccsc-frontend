import React, { useState } from 'react';
import Loadable from 'react-loadable';
import Loader from './layout/Loader';
import '../assets/css/style.css';
import Wrapper from '../wrapper';
import MainPage from '../MainPage';
import { ChartPieIcon, ChevronDownIcon, FingerPrintIcon, MenuIcon, PhoneIcon, PlusIcon, XCircleIcon } from '@heroicons/react/outline';
import mainlogo from '../assets/images/KoreanImageNcc.png'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
require('dotenv').config();


const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay: 60,
});

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: PlusIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: PlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: PlusIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlusIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const [blurScreenCss] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    // <Wrapper>
    //   <div className={blurScreenCss}>
    //     <Web></Web>
    //   </div>
    // </Wrapper>
    <div>
      <header className="bg-white w-full" style={{ backgroundColor: 'transparent', position: 'absolute', top: '0', zIndex: '3', width: '100%' }}>
        <nav className="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-16 w-auto" src={mainlogo} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:text-xl gap-4">
            <button className="font-semibold leading-6 text-gray-900">
              LogIn
            </button>
            <button className="font-semibold leading-6 text-gray-900">
              Find Password
            </button>
          </div>
        </nav>
        <nav className="hidden lg:block lg:text-2xl" >
          <div className="grid grid-cols-6 gap-4 bg-transparent py-5">
            <div className="col-start-2 col-span-4">
              <div className="flex justify-between">
                <span>Introduction</span>
                <span>Visualize Example Data</span>
                <span>Visualize My Data</span>
                <span>Customer Service</span>

              </div>
            </div>

          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div></div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only flex justify-end">Close menu</span>
                <XCircleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">

                  <span
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Introduction
                  </span>
                  <span
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Visualize Example Data
                  </span>
                  <span
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Visualize My Data
                  </span>
                  <span
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Customer Service
                  </span>
                </div>
                <div className="py-6 flex flex-row gap-5">
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    LogIn
                  </button>
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Find Password
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <MainPage />
    </div>

  );
}
