import React, {useEffect} from "react";
import { getCookie } from "../getCookie";
import ParentCard from "../CardComponent/ParentCard";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom";

const MainIndex = () => {
  let history = useHistory();
  // useEffect(() => {
  //   if(getCookie('is_login')=== null || getCookie('is_login') !== 'True'){
  //     history.push("/login")
  //   }
  // }, [history])
  return (
    <div>
      { getCookie('is_login') &&
      <div className="flex flex-wrap justify-center"> 
      <ParentCard
        background="bg-red-200"
        color="text-red-800"
        width="sm:w-1/4"
        padding="p-4"
        margin="m-4"
      >
        <div>
        <Link to='/visualise-singledata/home/'  className="px-3 py-4 lg:py-2 flex  ">
          <span>SingleData Visualization</span>
        </Link>
        </div>
      </ParentCard>

      <ParentCard
        background="bg-blue-200"
        color="text-blue-800"
        width="sm:w-1/4"
        padding="p-4"
        margin="m-4"
      >
        <div>
        <Link to='/multidatavisualization'  className="px-3 py-4 lg:py-2 flex  ">
          <span>MultiData Visualization</span>
        </Link>
        </div>
      </ParentCard>

      <ParentCard
        background="bg-green-200"
        color="text-green-800"
        width="sm:w-1/4"
        padding="p-4"
        margin="m-4"
      >
        Others
      </ParentCard>
      </div>
  }
    </div>
  );
};

export default MainIndex;
