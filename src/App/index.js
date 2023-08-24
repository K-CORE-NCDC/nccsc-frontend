import React from 'react';
import Loadable from 'react-loadable';
import '../assets/css/style.css';
import Wrapper from '../wrapper';
import Loader from './layout/Loader';
require('dotenv').config();

const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay: 60
});

export default function App() {

  return (
    <Wrapper>
      <div>
        <Web></Web>
      </div>
    </Wrapper>
  );
}
