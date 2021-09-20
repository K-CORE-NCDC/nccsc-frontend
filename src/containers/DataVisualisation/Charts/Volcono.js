import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from '../../Common/Volcano'
import GroupFilters from '../../Common/GroupFilter'
import { exportComponentAsPNG } from 'react-component-export-image';

import { getVolcanoPlotInfo } from '../../../actions/api_actions'
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'

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

  const updateGroupFilters = (filtersObject) =>{
    if(filtersObject){
      setGroupFilters(filtersObject)
    }
  }


  useEffect(() => {
    if (inputData) {
      setActiveCmp(false)
      if (inputData.type !== '') {
        setLoader(true)
        console.log('dispatch', {...inputData, filterGroup: groupFilters});
        dispatch(getVolcanoPlotInfo('POST', {...inputData}))
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

      // console.log(total['negative'])
      // console.log(total['positive'])

      setTabCount({
        "negative": total['negative'],
        "positive": total['positive']
      })

      console.log(negative)
      console.log(positive)

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


  return (
    <>
      {
        loader ?
          <LoaderCmp />
          :
          <div className="flex flex-row justify-around">
            <div className="w-1/5">
              <GroupFilters parentCallback={updateGroupFilters} groupFilters={groupFilters}/>
            </div>
            <div className="w-4/5" style={{'overflowX':'scroll'}}>
              {(volcanoJson && Object.keys(volcanoJson).length > 0)
                && <VolcanoCmp watermarkCss={watermarkCss}
                  ref={reference}
                  w={width}
                  data={volcanoJson['data']}
                  negative_data={negativeData}
                  positive_data={positiveData}
                  tab_count={tabCount}
                />}
            </div>
          </div>
      }
    </>
  )

}
