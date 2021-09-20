import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CircosCmp from '../../Common/Circos'
import PagenationTableComponent from '../../Common/PagenationTable'
import GraphsModal from '../../Common/circostimelineGraph'
import LoaderCmp from '../../Common/Loader'
import ImageGrid from '../../Common/ImageGrid'
import { getCircosInformation, getCircosTimelineTable, getOncoImages } from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';
import placeholder from '../../../assets/img/circos_plot_layer_info.png'


export default function DataCircos({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('all')
  const circosJson = useSelector((data) => data.dataVisualizationReducer.circosSummary);
  // const fusionJson = useSelector((data) => data.dataVisualizationReducer.fusionData);
  const oncoImageJson = useSelector((data) => data.dataVisualizationReducer.oncoSampleImagesData);
  const circosTimelieTableData = useSelector(state => state.dataVisualizationReducer.circosTimelieTableData)

  const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [showOncoImages, setShowOncoImages] = useState(false)
  const [showOncoTimelineTables, setShowOncoTimelineTables] = useState(false)

  const closeShowOncoImages = () => {
    setShowOncoImages(false)
  }

  const closeShowTimelineTables = () =>{
    setShowOncoTimelineTables(false)
  }

  const oncoImagesClickFunction = () =>{
    // setLoader(true)
    setShowOncoImages(true)
    dispatch(getOncoImages('POST', {sample_id: sampleKey}))
  }

  const timelineGraphClickFunction = () =>{
    // setLoader(true)
    setShowOncoImages(false)
    setShowOncoTimelineTables(true)
    dispatch(getCircosTimelineTable('POST', {sample_id: sampleKey}))
  }
  
  useEffect(() => {
    // console.log(oncoImageJson);
  }, [oncoImageJson])

  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;
  function sortAlphaNum(a, b) {
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if (aA === bA) {
      var aN = parseInt(a.replace(reN, ""), 10);
      var bN = parseInt(b.replace(reN, ""), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  }

  useEffect(() => {
    if (inputData) {
      let editInputData = inputData
      editInputData = { ...editInputData, sampleKey: sampleKey }
      if (editInputData.type !== '') {
        setLoader(true)
        dispatch(getCircosInformation('POST', editInputData))
        // dispatch(getFusionInformation('POST', editInputData))
        // dispatch(getOncoImages('POST',{"sample_id":sampleKey,'page_no':0}))
      }
    }
  }, [inputData, sampleKey])

  useEffect(() => {
    if (inputData && inputData.genes.length > 0) {
      setDisplaySamples(true)
    } else {
      setDisplaySamples(false)
    }
  }, [inputData])

  // useEffect(() => {
  //   if(!circosJson){
  //     setLoader(true)
  //     dispatch(getCircosInformation('POST', {}))
  //   }
  //   if(!fusionJson){
  //     setLoader(true)
  //     dispatch(getFusionInformation('POST', {}))
  //   }
  // }, [])

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
    if (circosSanpleRnidListData) {
      let sampleListElementsTemp = []
      // let sampleKey = ''
      let brstKeysObject = {}
      Object.keys(circosSanpleRnidListData).forEach(e => {
        brstKeysObject = { ...brstKeysObject, [circosSanpleRnidListData[e]]: e }
      })
      let brstKeysArray = Object.keys(brstKeysObject).sort(sortAlphaNum)
      brstKeysArray.forEach((element) => {
        sampleListElementsTemp.push(<option key={element} value={brstKeysObject[element]}>{element}</option>)
        // if(sampleKey==='') sampleKey = k
      })
      // setSampleKey(sampleKey)
      setSampleListElements(sampleListElementsTemp)
    }
  }, [circosSanpleRnidListData])

  useEffect(() => {
    setTimeout(function () {
      if (circosJson) {
        setLoader(false)
      }
    }, (1000));
  }, [circosJson])



  var w = Math.floor((width / 100) * 75)
  return (
    <>{
      loader ?
        <LoaderCmp />
        :
        <div className="grid ">
          <div className="p-1 grid grid-cols-6">
            <div>
              <label htmlFor="samples">Choose a Sample: </label>
              <select
                className="w-full border bg-white rounded px-3 py-2 outline-none"
                value={sampleKey}
                onChange={e => setSampleKey(e.target.value)}
                name="samples"
                id="samples"
              >
                <option value="all">all</option>
                {sampleListElements}
              </select>
            </div>
            <div className="col-start-2">
              <button className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={oncoImagesClickFunction}>Images</button>
            </div>
            <div className="col-start-3">
              <button className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={timelineGraphClickFunction}>Tables</button>
            </div>
            <div className='col-start-6'>
              <img src={placeholder} width='230' />
            </div>
          </div>
          <div>
            <div>
              {circosJson && <CircosCmp
                watermarkCss={watermarkCss}
                ref={reference}
                width={w}
                data={circosJson}
              />}
            </div>
          </div>
        </div>
    }
      {showOncoImages&& <PagenationTableComponent closeShowOncoImages={closeShowOncoImages} imageData={oncoImageJson} />}
      {showOncoTimelineTables && <GraphsModal circosTimelieTableData={circosTimelieTableData} closeShowTimelineTables={closeShowTimelineTables} />}
    </>
  )
}
