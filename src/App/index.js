import React, { Suspense, useState, useEffect} from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './layout/Loader/';
import { PrivateRoute } from './PrivateRoute';
import '../assets/css/style.css'
import Wrapper  from '../wrapper';
// import ReactGA from 'react-ga';
require('dotenv').config()

const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay: 60
});



export default function App() {
  const [blurScreenCss] = useState("")

  // useEffect(()=>{
  //   const TRACKING_ID = "UA-240000755-1"; // YOUR_OWN_TRACKING_ID
  //   ReactGA.initialize(TRACKING_ID);
  // })
 

  return (
    <Wrapper>
      <div className={blurScreenCss}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute exact path="*" component={Web} />
          </Switch>
        </Suspense>
      </div>
    </Wrapper>
  )
}
