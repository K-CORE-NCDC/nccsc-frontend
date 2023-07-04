import React, { useState } from 'react';
import Loadable from 'react-loadable';
import Loader from './layout/Loader';
import '../assets/css/style.css';
import Wrapper from '../wrapper';
import MainPage from '../MainPage';
import {  XCircleIcon } from '@heroicons/react/outline';
// import mainlogo from '../assets/images/KoreanImageNcc.png'
import mainlogo from "../assets/images/Left_up.png";
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  MenuIcon
} from "@heroicons/react/outline";
require('dotenv').config();


const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay: 60,
});


export default function App() {
  const [blurScreenCss] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Wrapper>
      <div >
        <Web></Web>
      </div>
    </Wrapper>
  );
}
