import React, {  useState } from 'react';
import Loadable from 'react-loadable';
import Loader from './layout/Loader';
import '../assets/css/style.css';
import Wrapper from '../wrapper';
require('dotenv').config();

const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay: 60,
});


export default function App() {
  const [blurScreenCss] = useState('');

  return (
    <Wrapper>
      <div className={blurScreenCss}>
        <Web></Web>
      </div>
    </Wrapper>
  );
}
