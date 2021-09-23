import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ScatterPlot from '../../Common/ScatterPlot'
import LoaderCmp from '../../Common/Loader'
import { getScatterInformation, getCircosSamplesRnidList } from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';
import Multiselect from 'multiselect-react-dropdown';
import NoContentMessage from '../../Common/NoContentComponent'

export default function Scatter({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('')
  const scatterJson = useSelector((data) => data.dataVisualizationReducer.scatterData);
  // const circosSanpleRnidListData = useSelector(state => state.dataVisualizationReducer.circosSanpleRnidListData)
  // const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [gene, setGene] = useState('')
  const [genesHtml, setGenesHtml] = useState([])
  const [inputState, setInputState] = useState({})
  const [selectedValue, setSelectedValue] = useState('')
  const [showScatter, setShowScatter] = useState(false)
  const [noContent, setNoContent] = useState(true)


  // useEffect(() => {
  //   if (inputData) {
  //     let editInputData = inputData
  //     let g = editInputData['genes']
  //     if (editInputData.type !== '') {
  //       loadGenesDropdown(g)
  //       setLoader(true)
  //       dispatch(getScatterInformation('POST', editInputData))
  //     }
  //   }
  // }, [inputData])

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData }))
    }
  }, [inputData])

  useEffect(() => {
    if (inputState && 'genes' in inputState) {
      let g = inputState['genes']
      loadGenesDropdown(g)
      setGene(g[0])
      if (inputState.type !== '') {
        let dataJson = inputState
        setLoader(true)
        // dataJson['genes'] = g[0]
        dataJson['genes'] = g
        dispatch(getScatterInformation('POST', dataJson))
      }
    }
  }, [inputState])


  const loadGenesDropdown = (genes) => {
    let t = []
    for (var i = 0; i < genes.length; i++) {
      t.push(
        { "name": genes[i], "id": i }
      )
    }
    setGenesHtml(t)
  }

  useEffect(() => {
    if (inputData && inputData.genes.length > 0) {
      setDisplaySamples(true)
    } else {
      setDisplaySamples(false)
    }
  }, [inputData])


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


  function onSelect(selectedList, selectedItem) {
    let genes = []
    setSelectedValue(selectedList)
    selectedList.forEach((item, i) => {
      genes.push(item['name'])
    });
    // loadGenesDropdown(genes)
    if (inputData.type !== '') {
      let dataJson = inputData
      dataJson['genes'] = genes
      setLoader(true)
      // setActiveCmp(false)
      dispatch(getScatterInformation('POST', dataJson))
    }
  }

  function onRemove(selectedList, removedItem) {
    let genes = []
    setSelectedValue(selectedList)
    selectedList.forEach((item, i) => {
      genes.push(item['name'])
    });
    if (genes.length === 0) {
      genes = inputState['genes']
    }
    if (inputData.type !== '') {
      let dataJson = inputData
      dataJson['genes'] = genes
      setLoader(true)
      // setActiveCmp(false)
      dispatch(getScatterInformation('POST', dataJson))
    }
  }

  useEffect(() => {
    setTimeout(function () {
      setLoader(false)
    }, (10000));
  }, [scatterJson])

  useEffect(() => {
    if (scatterJson && scatterJson.status === 200) {
      setShowScatter(true)
      setNoContent(false)
    } else {
      setShowScatter(false)
      setNoContent(true)
    }
  }, [scatterJson])

  // console.log(genesHtml)

  return (
    <div>
      <div className='p-5 text-right m-5'>
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
      </div>
      {
        loader ?
          <LoaderCmp />
          :
          <>
          {showScatter && <ScatterPlot scatter_data={scatterJson}/>}
          {noContent && <NoContentMessage />}
          </>
      }
    </div>
  )
}

// <select value={gene} onChange={e=>geneSet(e)} class="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700" on>
//   {genesHtml}
// </select>
