import React from 'react'
import Loader from "react-loader-spinner";

export default function LoaderComp() {
  return (
      <div className="text-center">
        <div className="">
          <Loader
            type="TailSpin"
            color="#0c3c6a"
            height={80}
            width={80}
            timeout={3000000} //3 secs
          />
        </div>
      </div>
  )
}
