import React, { Suspense, useState } from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './layout/Loader/';
import { PrivateRoute } from './PrivateRoute';
import '../assets/css/style.css'
import Wrapper  from '../wrapper';
const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay: 60
});


export default function App() {
  const [blurScreenCss, setBlurScreenCss] = useState("")
 
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

