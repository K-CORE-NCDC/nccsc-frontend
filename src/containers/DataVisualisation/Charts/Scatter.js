import React, { useState, useEffect, useRef } from 'react'
import ScatterPlot from '../../Common/ScatterPlot'
import LoaderCmp from '../../Common/Loader'
import {ScatterInformation} from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';
import Multiselect from 'multiselect-react-dropdown';
import NoContentMessage from '../../Common/NoContentComponent';
import {FormattedMessage} from 'react-intl';

export default function Scatter({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const [scatterJson, setScatterJson] = useState({})
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [gene, setGene] = useState('')
  const [genesHtml, setGenesHtml] = useState([])
  const [inputState, setInputState] = useState({})
  const [selectedValue, setSelectedValue] = useState('')
  const [showScatter, setShowScatter] = useState(false)
  const [noContent, setNoContent] = useState(false)
  const [selectall, setSelectAll] = useState(false)
  const [primaryGene, setPrimaryGene] = useState('')
  const [lastRemoveItem,setLastRemoveItem] = useState([])
  const [lastRemove,setLastRemove] = useState(false)

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData }))
    }
  }, [inputData])

  useEffect(() => {
    if (inputState && 'genes' in inputState) {
      let g = inputState['genes']
      loadGenesDropdown(g)
      setGene(g)
      if (inputState.type !== '' && inputState['genes'].length > 0) {
        let dataJson = inputState
        setLoader(true)
        dataJson['genes'] = [g[0]]
        let return_data = ScatterInformation('POST',dataJson)
        return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            r_["status"] = 200
            setScatterJson(r_)
          } else {
            setScatterJson({'status':204})
          }
        })
        .catch((e) => {
          setScatterJson({'status':204})
        });
      }
    }
  }, [inputState])


  const loadGenesDropdown = (genes) => {
    let t = []
      for (let i = 0; i < genes.length; i++) {
        t.push(
          { "name": genes[i], "id": i }
        )
    }
    setGenesHtml(t)
    let select_ = t.slice(0,1)
    setSelectedValue(select_)
    setPrimaryGene(select_)
  }


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
    selectedList.forEach((item, i) => {
      genes.push(item['name'])
    });
    if (inputData.type !== '' && inputState['genes'].length > 0) {
      let dataJson = { ...inputData }
      dataJson['genes'] = genes
      setLoader(true)
      let return_data = ScatterInformation('POST',dataJson)
        return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            r_["status"] = 200
            setScatterJson(r_)
          } else {
            setScatterJson({'status':204})
          }
        })
        .catch((e) => {
          setScatterJson({'status':204})
        });
    }
  }

  function onRemove(selectedList, removedItem) {
    
      let genes = []
      setSelectedValue(selectedList)
      selectedList.forEach((item, i) => {
        genes.push(item['name'])
      });
      
      if(selectedList.length === 0){
        setLastRemoveItem([removedItem])
        setLastRemove(true)
      }else{
        setLastRemove(false)
      }
      if (genes.length === 0 && selectedList.length===0) {
        genes = [removedItem['name']]
      }
      if (inputData.type !== '') {
        let dataJson = { ...inputData }
        dataJson['genes'] = genes
        setLoader(true)
        let return_data = ScatterInformation('POST',dataJson)
        return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            r_["status"] = 200
            setScatterJson(r_)
          } else {
            setScatterJson({'status':204})
          }
        })
        .catch((e) => {
          setScatterJson({'status':204})
        });
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
      if(lastRemove){
        setSelectedValue(lastRemoveItem)
      }
    } else  if (scatterJson && scatterJson.status !== 200)  {
      setShowScatter(false)
      setNoContent(true)
    }
  }, [scatterJson])

  function selectAll(){
    if(selectall === false){
      setSelectAll(!selectall)
      setSelectedValue("")
      if (inputState && 'genes' in inputState) {
        if (inputState.type !== '' && inputState['genes'].length > 0) {
          let dataJson = inputState
          setLoader(true)
          dataJson['genes'] = gene
          let return_data = ScatterInformation('POST',dataJson)
          return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            r_["status"] = 200
            setScatterJson(r_)
          } else {
            setScatterJson({'status':204})
          }
        })
        .catch((e) => {
          setScatterJson({'status':204})
        });
        }
      }
    }
    else{
      setSelectAll(!selectall)
      setSelectedValue(primaryGene)
      if (inputState && 'genes' in inputState) {
        if (inputState.type !== '' && inputState['genes'].length > 0) {
          let dataJson = inputState
          setLoader(true)
          dataJson['genes'] = [gene[0]]
          let return_data = ScatterInformation('POST',dataJson)
          return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            r_["status"] = 200
            setScatterJson(r_)
          } else {
            setScatterJson({'status':204})
          }
        })
        .catch((e) => {
          setScatterJson({'status':204})
        });
        }
      }
    }
  }



  return (
    <div>
      <div className='p-5 text-right m-5'>
        <div className='grid grid-rows-3'>
          <div className="flex float-left xs:flex-wrap">
              <div className='p-3 ml-6 xs:text-sm lg:text-xl md:text-xl'><FormattedMessage  id ="Selected Gene Is" defaultMessage="Selected Gene Is" /></div>
              <div>
                <Multiselect
                  options={genesHtml} // Options to display in the dropdown
                  selectedValues={selectedValue} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>
              <div className="mt-3 lg:ml-4 xs:ml-10">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={selectall} onChange={selectAll}/>
                  <span className="ml-2"><strong className="lg:text-xl xs:text-sm"><FormattedMessage  id ="Select all" defaultMessage="Select all"/></strong></span>
                </label>
              </div>
          </div>
          <div className="flex float-left pt-6 pl-3 ml-6">
            {showScatter && scatterJson['r_value']?<h4 className="xs:text-sm sm:text-xl lg:text-2xl"><strong>r:</strong> {scatterJson['r_value']}</h4>:""}
            {showScatter && scatterJson['p_value']?<h4 className="ml-8 xs:text-sm sm:text-xl lg:text-2xl"><strong>P-value:</strong> {scatterJson['p_value']}</h4>:""}
          </div>
        </div>
      </div>
      {
        loader ?
          <LoaderCmp />
          :
          <>
          {showScatter && <ScatterPlot  watermarkCss={watermarkCss} ref={reference} scatter_data={scatterJson}/>}
          {noContent && <NoContentMessage />}
          </>
      }
        {
              inputData.genes.length === 0 &&  <p><FormattedMessage  id="PleaseSelecttheGeneSetData" defaultMessage="PleaseSelect the Gene Set Data" /></p>
            }
    </div>
  )
}
