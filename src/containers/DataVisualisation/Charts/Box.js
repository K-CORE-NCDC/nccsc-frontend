import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import BoxPlot from '../../Common/BoxPlot2'
import LoaderCmp from '../../Common/Loader'
import { getBoxInformation} from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';
import Multiselect from 'multiselect-react-dropdown';
import NoContentMessage from '../../Common/NoContentComponent'

export default function Box({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const boxJson = useSelector((data) => data.dataVisualizationReducer.boxData);
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [gene,setGene] = useState('')
  const [inputState,setInputState] = useState({})
  const [genesHtml,setGenesHtml] = useState([])
  const [selectedValue,setSelectedValue] = useState('')
  const [showBoxPlot, setShowBoxPlot] = useState(false)
  const [noContent, setNoContent] = useState(true)

  

  useEffect(()=>{
    if(inputData && 'genes' in inputData){
      setInputState((prevState) => ({...prevState,...inputData }))
    }
  },[inputData])

  useEffect(()=>{
    if(inputState && 'genes' in inputState){
      let g = inputState['genes']
      loadGenesDropdown(g)
      setGene(g[0])
      if(inputState.type !==''){
        let dataJson = inputState
        setLoader(true)
        
        dataJson['genes'] = g
        dispatch(getBoxInformation('POST', dataJson))
      }
    }
  },[inputState])

  useEffect(() => {
    if(inputData && inputData.genes.length > 0) {
      setDisplaySamples(true)
    }else{
      setDisplaySamples(false)
    }
  }, [inputData])

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

  const loadGenesDropdown = (genes) => {
    let t = []
    for (var i = 0; i < genes.length; i++) {
      t.push(
        {"name":genes[i],"id":i}
      )
    }
    setGenesHtml(t)
  }


  function onSelect(selectedList, selectedItem) {
    let genes = []
    setSelectedValue(selectedList)
    selectedList.forEach((item, i) => {
      genes.push(item['name'])
    });
    if(inputData.type !==''){
      let dataJson = inputData
      dataJson['genes'] = genes
      setLoader(true)
      dispatch(getBoxInformation('POST', dataJson))
    }
  }

  function onRemove(selectedList, removedItem) {
    let genes = []
    setSelectedValue(selectedList)
    selectedList.forEach((item, i) => {
      genes.push(item['name'])
    });
    if(genes.length === 0){
      genes = inputState['genes']
    }
    if(inputData.type !==''){
      let dataJson = inputData
      dataJson['genes'] = genes
      setLoader(true)
      // setActiveCmp(false)
      dispatch(getBoxInformation('POST', dataJson))
    }
  }

  useEffect(() => {
    setTimeout(function() {
        setLoader(false)
    }, (1000));
  }, [boxJson])

  useEffect(() => {
    if (boxJson && boxJson.status === 200) {
      setShowBoxPlot(true)
      setNoContent(false)
    } else {
      setShowBoxPlot(false)
      setNoContent(true)
    }
  }, [boxJson])

  return (
    <>
        <div className="grid">
        <div className='flex float-left'>
          <div className='p-3'>Selected Gene Is</div>
          <div>
            <Multiselect
              options={genesHtml} // Options to display in the dropdown
              selectedValues={selectedValue} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              />
          </div>
        </div>
        {
          loader?
            <LoaderCmp/>
            :boxJson &&
            <>
            {showBoxPlot && <BoxPlot box_data={boxJson}  ref={reference} width={width}/>}
            {noContent && <NoContentMessage />}
            </>
        }
        </div>
    </>
  )
}
