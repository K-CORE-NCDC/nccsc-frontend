import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CircosCmp from '../../Common/Circos'
import LoaderCmp from '../../Common/Loader'
import ImageGrid from '../../Common/ImageGrid'
import { getCircosInformation, getFusionInformation,getOncoImages } from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';
import placeholder from '../../../assets/img/circos_plot_layer_info.png'


export default function DataCircos({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('all')
  const circosJson = useSelector((data) => data.dataVisualizationReducer.circosSummary);
  const fusionJson = useSelector((data) => data.dataVisualizationReducer.fusionData);
  const oncoImageJson = useSelector((data) => data.dataVisualizationReducer.oncoInfoData);
  // const circosSanpleRnidListData = useSelector(state => state.dataVisualizationReducer.circosSanpleRnidListData)

  const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (inputData) {
      let editInputData = inputData
      editInputData = { ...editInputData, sampleKey: sampleKey }
      if (editInputData.type !== '') {
        setLoader(true)
        dispatch(getCircosInformation('POST', editInputData))
        dispatch(getFusionInformation('POST', editInputData))
        dispatch(getOncoImages('POST',{"sample_id":sampleKey,'page_no':0}))
      }
    }
  }, [inputData, sampleKey])

  useEffect(() => {
    if(inputData && inputData.genes.length > 0) {
      setDisplaySamples(true)
    }else{
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
    if(screenCapture){
      setWatermarkCSS("watermark")
    }else{
      setWatermarkCSS("")
    }
    if(watermarkCss !== "" && screenCapture){
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }
  }, [screenCapture, watermarkCss])

  useEffect(() => {
    if (circosSanpleRnidListData) {
      let sampleListElementsTemp = []
      // let sampleKey = ''
      Object.entries(circosSanpleRnidListData).forEach(([k,v]) => {
        sampleListElementsTemp.push(<option key={k} value={k}>{v}</option>)
        // if(sampleKey==='') sampleKey = k
      })
      // setSampleKey(sampleKey)
      setSampleListElements(sampleListElementsTemp)
    }
  }, [circosSanpleRnidListData])

  useEffect(() => {
    setTimeout(function() {
      if(circosJson && fusionJson){
        setLoader(false)
      }
    }, (1000));
  }, [circosJson, fusionJson])



  var w = Math.floor((width/100)*75)
  return (
    <>{
      loader?
        <LoaderCmp/>
        :
        <div className="grid ">
          {true && <div className="p-1 grid grid-cols-6">
            <div>
              <label htmlFor="samples">Choose a Sample: </label>
              <select
              className="w-full border bg-white rounded px-3 py-2 outline-none"
              value={sampleKey}
              onChange={e =>  setSampleKey(e.target.value) }
              name="samples"
              id="samples"
              >
                <option value="all">all</option>
                {sampleListElements}
              </select>
            </div>
            <div className='col-start-6'>
              <img src={placeholder} width='230'/>
            </div>
          </div>}
        <div>
          <div>
            {(circosJson && fusionJson) && <CircosCmp
            watermarkCss={watermarkCss}
            ref={reference}
            width={w}
            data={circosJson}
            fusionJson={fusionJson}
             />}
          </div>
          {sampleKey!=='all' && <ImageGrid sample_id={sampleKey}/>}
        </div>
      </div>
    }
    </>
  )
}
