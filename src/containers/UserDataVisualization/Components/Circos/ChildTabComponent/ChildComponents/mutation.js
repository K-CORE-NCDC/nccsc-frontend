import React from "react";
import {
  BeakerIcon
} from '@heroicons/react/outline'

const Mutation = (data_) => {
  // const [openTab, setOpenTab] = React.useState(1);

  let headers = []
  let m  = data_['data_']

  for (var k in m){
    headers.push(
      <span className="inline-flex items-center justify-center mt-3 px-3 py-2 ml-3  text-lg font-bold leading-none bg-white text-current border border-indigo-60 rounded">
      {m[k]}
      </span>
    )
  }

  return (
    <div className="border-t-2 grid grid-cols-6">
      <div className="col-span-1  mt-3">
        <span className="justify-center items-center text-base font-bold">Clinical Tracks</span>
      </div>
      <div className="col-span-5">
        <div className="flex flex-wrap">
          {headers}
        </div>
      </div>
    </div>
  );
};

export default Mutation;
