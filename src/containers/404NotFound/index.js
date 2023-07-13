import React from 'react'
import { Link, useLocation } from "react-router-dom";
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
function NotFound() {
  const routeLocation = useLocation();
  const title = { id: "notfound", defaultMessage: "notfound" }

  const breadCrumbs = {
    '/notfound/': [
      { id: 'notfound', defaultMessage: 'notfound', to: '/notfound/' }
    ],
  };

  return (
    <>

      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/notfound/']}
        type="single"
      />

      <article id="subContents" className="subContents">
        <div>
        
          <div className="ptn">
            <div className="auto">
              {routeLocation.pathname !== '/' ?
                <div className='notFound'>
                  <div>
                    <h1 className='' style={{ fontSize: '140px', color: 'rgb(249 115 22)' }}>404</h1>
                  </div>
                  <h2 className=''>OOPS! NOTHING WAS FOUND</h2>
                  <h3 className=''>The page you are looking for might have been removed, had it changed or is temporarily unavailable.</h3>
                  <div className=''>
                    <Link className="" style={{ color: 'rgb(249 115 22)' }} to={`/`}>Click here to return to HomePage</Link>
                  </div>
                </div>
                : <></>}
            </div>
          </div>
        </div>
      </article>


    </>
  )
}

export default NotFound