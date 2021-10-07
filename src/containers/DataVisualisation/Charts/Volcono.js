import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from '../../Common/Volcano'
import GroupFilters, { PreDefienedFilters } from '../../Common/GroupFilter'
import { exportComponentAsPNG } from 'react-component-export-image';
import NoContentMessage from '../../Common/NoContentComponent'

import { getVolcanoPlotInfo } from '../../../actions/api_actions'
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'

const selectedCss = "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition"
const nonSelectedCss = "w-1/2 rounded-l-none border-l-0 hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition"

export default function DataVolcono({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const volcanoJson = useSelector((data) => data.dataVisualizationReducer.volcanoSummary);
  const [activeCmp, setActiveCmp] = useState(false)
  const [comp, setComp] = useState([])
  // const didMountRef = useRef(false)
  const [data_, setData] = useState('')
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [negativeData, setNegativeData] = useState()
  const [positiveData, setPositiveData] = useState()
  const [tabCount, setTabCount] = useState()
  const [groupFilters, setGroupFilters] = useState({})
  const [showVolcano, setShowVolcano] = useState(false)
  const [noContent, setNoContent] = useState(true)
  const [sampleCount, setSampleCount] = useState({})
  const [userDefienedFilter, setUserDefienedFilter] = useState('static')


  const updateGroupFilters = (filtersObject) => {
    if (filtersObject) {
      setGroupFilters(filtersObject)
    }
  }


  useEffect(() => {
    if (inputData) {
      setActiveCmp(false)
      if (inputData.type !== '' && Object.keys(groupFilters).length > 0) {
        setLoader(true)
        dispatch(getVolcanoPlotInfo('POST', { ...inputData, filterGroup: groupFilters }))
      }
    }
  }, [inputData, groupFilters])

  useEffect(() => {
    if (volcanoJson) {
      if (Object.keys(volcanoJson).length > 0) {
        setActiveCmp(true)
        setData(volcanoJson)
      }
      setTimeout(function () {
        setLoader(false)
      }, (1000));

      let negative = []
      let positive = []
      let neg_count = 1
      let pos_count = 1
      let n_t = 1
      let p_t = 1
      let total = { "negative": 1, "positive": 1 }
      if ('table_data' in volcanoJson) {
        volcanoJson['table_data'].forEach((item, i) => {
          // console.log(item)
          let log2foldchange = parseFloat(item['log2(fold_change)'])
          if (log2foldchange < 0) {
            total['negative'] += 1
            if (neg_count === 5) {
              return false
            } else {
              negative.push({
                "Gene Name": item['gene'],
                "Log2FC": parseFloat(item['log2(fold_change)']),
                "-Log(Pvalue)": item['q_value']
              })
              neg_count += 1
            }
          }
          else {
            total['positive'] += 1
            if (pos_count === 5) {
              return false
            } else {
              positive.push({
                "Gene Name": item['gene'],
                "Log2FC": parseFloat(item['log2(fold_change)']),
                "-Log(Pvalue)": item['q_value']
              })
              pos_count += 1
            }
          }
        });
      }

      // console.log(total['negative'])
      // console.log(total['positive'])

      setTabCount({
        "negative": total['negative'],
        "positive": total['positive']
      })

      setNegativeData(negative)
      setPositiveData(positive)
    }
  }, [volcanoJson])

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }

    if (watermarkCss !== "" && screenCapture) {
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])

  useEffect(() => {
    if (volcanoJson && volcanoJson.status === 200) {
      if (volcanoJson && Object.keys(volcanoJson).length > 0) {
        setSampleCount(volcanoJson.samples)
        setShowVolcano(true)
        setNoContent(false)
      } else {
        setShowVolcano(false)
        setNoContent(true)
      }
    } else {
      setShowVolcano(false)
      setNoContent(true)
    }
  }, [volcanoJson])


  return (
    <>
      {
        loader ?
          <LoaderCmp />
          :
          <div className="flex flex-row justify-around">
            <div className="w-1/5">
              <div>
                {(sampleCount && Object.keys(sampleCount).length > 0) && <div className="m-1 p-1 border border-black border-dashed">
                  {Object.keys(sampleCount).map(e => (
                    <div key={e} className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue">
                      Group {e} : {sampleCount[e]}
                    </div>
                  ))}
                </div>}
              </div>
              <h6 className="p-4 ml-1 text-left text-bold text-blue-700">Choose Filter group</h6>
              <div className="m-1 flex flex-row justify-around">
                <button onClick={() => setUserDefienedFilter('static')}
                  className={userDefienedFilter === 'static' ? selectedCss : nonSelectedCss}
                >
                  Static
                </button>
                <button onClick={() => setUserDefienedFilter('dynamic')}
                  className={userDefienedFilter === 'dynamic' ? selectedCss : nonSelectedCss}
                >
                  Dynamic
                </button>
              </div>
              {(userDefienedFilter === 'dynamic') && <GroupFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
              {(userDefienedFilter === 'static') && <PreDefienedFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
              {/* <GroupFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} /> */}
              <div className="m-1 p-1 border border-black border-dashed">
                <p className="text-blue-900 text-lg font-bold text-left">{`Blue: Log2FC <= -1.5 & pvalue >= 0.05`}</p>
                <p className="text-blue-900 text-lg font-bold text-left">{`Red: Log2FC >= 1.5 & pvalue >= 0.05`}</p>
                <p className="text-blue-900 text-lg font-bold text-left">Grey: Not significant gene</p>
                <p className="text-blue-900 text-lg font-bold text-left">Black: Selected genes</p>
              </div>
            </div>
            <div className="w-4/5" style={{ 'overflowX': 'scroll' }}>
              {showVolcano
                && <VolcanoCmp watermarkCss={watermarkCss}
                  ref={reference}
                  w={width}
                  data={volcanoJson['data']}
                  negative_data={negativeData}
                  positive_data={positiveData}
                  tab_count={tabCount}
                  tableData={volcanoJson['table_data']}
                />}
              {noContent && <NoContentMessage />}
            </div>
          </div>
      }
    </>
  )

}
