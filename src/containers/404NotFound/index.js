import React from 'react'
import { Link,useLocation } from "react-router-dom";
function NotFound() {
  const routeLocation = useLocation(); 
    return (
      <>
       {routeLocation.pathname !== '/' ? 
        <div>
        <div>
        <h1 className='text-center m-28 font-sans' style={{fontSize:'140px', color:'rgb(249 115 22)'}}>404</h1>
        </div>
        <h2 className='text-6xl text-center m-4 font-sans'>OOPS! NOTHING WAS FOUND</h2>
        <h3 className='text-4xl text-center m-4 font-sans'>The page you are looking for might have been removed, had it changed or is temporarily unavailable.</h3>
        <div className='text-center m-8'>
        <Link className="capitalize text-4xl m-2 font-sans" style={{color:'rgb(249 115 22)'}} to={`/`}>Click here to return to HomePage</Link>
        </div>
      </div>
    : <></>}
     
      </>
  )
}

export default NotFound