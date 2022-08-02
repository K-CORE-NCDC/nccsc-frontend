import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from "../../Common/Volcano";
import GroupFilters, { PreDefienedFilters } from "../../Common/FusionGroupFilter";
import { exportComponentAsPNG } from "react-component-export-image";
import NoContentMessage from "../../Common/NoContentComponent";
import { AdjustmentsIcon } from "@heroicons/react/outline";

import {
  getClinicalMaxMinInfo,
  getFusionVennDaigram,
} from "../../../actions/api_actions";
// import Loader from "react-loader-spinner";
import LoaderCmp from "../../Common/Loader";
import { FormattedMessage } from "react-intl";

const selectedCss =
  "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 xs:text-sm sm:text-sm md:text-2xl md:text-2xl ease-in-out border-gray-600 transition";
const nonSelectedCss =
  "w-1/2 rounded-l-none  hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border xs:text-sm sm:text-sm md:text-2xl md:text-2xl duration-200 ease-in-out border-teal-600 transition";

export default function FusionPlot({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [smallScreen, setSmallScreen] = useState(false)
  const [sampleCount, setSampleCount] = useState({})
  const [userDefienedFilter, setUserDefienedFilter] = useState('static')
  const [groupFilters, setGroupFilters] = useState({})
  const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);
  const updateGroupFilters = (filtersObject) => {
    if (filtersObject) {
      console.log(filtersObject)
      setGroupFilters(filtersObject)
    }
  }

  useEffect(() => {
    
    if (inputData) {
      
      
      if (inputData.type !== '' && Object.keys(groupFilters).length > 0) {
        setLoader(true)
        inputData['filterType'] = userDefienedFilter
        dispatch(getFusionVennDaigram('POST', { ...inputData, filterGroup: groupFilters }))
        
      }
    }
  }, [inputData, groupFilters])

  useEffect(()=>{
    if(!clinicalMaxMinInfo){
      dispatch(getClinicalMaxMinInfo('GET',{}))
    }
  },[])
  
  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        <div className="flex flex-row justify-around">
          <div className={`lg:hidden md:hidden xs:ml-8`}>
            <button
              className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={() => setSmallScreen(!smallScreen)}
              type="button"
            >
              <AdjustmentsIcon className="h-6 w-6 inline" />
            </button>
          </div>
          <div
            className={`lg:w-1/5 md:w-4/5 lg:block md:block lg:block sm:hidden ${
              smallScreen
                ? "xs:mr-80 xs:z-10 xs:opacity-95 xs:bg-white"
                : "xs:hidden"
            } `}
          >
            <div>
              {sampleCount && Object.keys(sampleCount).length > 0 && (
                <div className="m-1 p-1 border border-black border-dashed">
                  {Object.keys(sampleCount).map((e) => (
                    <div
                      key={e}
                      className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue"
                    >
                      Group {e} : {sampleCount[e]}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <h6 className="p-4 ml-1 text-left text-bold sm:text-xl lg:text-2xl text-blue-700"><FormattedMessage  id = "Choose Filter group" defaultMessage='Choose Filter group'/></h6>
            <div className="m-1 flex flex-row justify-around">
              <button onClick={() => {setUserDefienedFilter('static');setGroupFilters({})}}
                className={userDefienedFilter === 'static' ? selectedCss : nonSelectedCss}
              >
                <FormattedMessage  id = "Static_volcano" defaultMessage='Static'/>
              </button>
              <button onClick={() => {setUserDefienedFilter('dynamic');setGroupFilters({})}}
                className={userDefienedFilter === 'dynamic' ? selectedCss : nonSelectedCss}
              >
                <FormattedMessage  id = "Dynamic_volcano" defaultMessage='Dynamic'/>
              </button>
            </div>
            {(userDefienedFilter === 'static') && <PreDefienedFilters   viz_type='fusion' parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
            {(userDefienedFilter === 'dynamic') && <GroupFilters  viz_type='fusion' parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
          </div>
          <div className={`lg:w-4/5 md:w-4/5 sm:w-full lg:block ${smallScreen?"xs:absolute":"xs:w-full"}`} style={{ 'overflowX': 'scroll' }}>
            
          </div>
        </div>
        
      )}
    </>
  );
}
