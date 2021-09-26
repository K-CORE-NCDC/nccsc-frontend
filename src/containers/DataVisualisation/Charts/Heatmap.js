import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import HeatmapNewCmp from '../../Common/testH'
import { getHeatmapInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'
import NoContentMessage from '../../Common/NoContentComponent'


export default function DataHeatmap({ width,inputData, screenCapture, brstKeys, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [activeCmp,setActiveCmp] = useState(false)
  const [tableType,setTableType] = useState('rna')
  const [data_,setData] = useState('')
  const [inputGene,setInputGene] = useState([])
  const heatmapJson = useSelector((data) => data.dataVisualizationReducer.heatmapSummary);
  // const didMountRef = useRef(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [genes,setGenes] = useState([])
  const [selectedGene,setSelectedGene] = useState([])
  const [showBoxPlot, setShowBoxPlot] = useState(false)
  const [noContent, setNoContent] = useState(true)


  useEffect(() => {
    if (inputData) {
      setActiveCmp(false)
      let genes = inputData['genes']
      let t = []
      for (var i = 0; i < genes.length; i++) {
        t.push(<option key={i} value={genes[i]}>{genes[i]}</option>)
      }
      setInputGene(t)
      setGenes(genes)
      setSelectedGene([genes[0]])
      if(inputData.type !==''){
        setLoader(true)
        inputData['table_type'] = tableType
        dispatch(getHeatmapInformation('POST', inputData))
      }
    }
  }, [inputData])

  useEffect(() => {
    if (heatmapJson) {
      let genes = []
      let unique_sample_values = {}
      let heat_data = []

      heatmapJson.forEach((item, i) => {
        if(!genes.includes(item['gene_name'])){
          genes.push(item['gene_name'])
        }
        let breast_key = brstKeys[item['pt_sbst_no']]
        if (breast_key in unique_sample_values){
          unique_sample_values[breast_key].push(item["gene_vl"])
        }else{
          unique_sample_values[breast_key] = []
          unique_sample_values[breast_key].push(item["gene_vl"])
        }
      });
      
      let y = {
        "smps":genes,
        "vars":[],
        "data":[]
      }
      Object.keys(unique_sample_values).forEach((key, i) => {
        y["vars"].push(key)
        y['data'].push(unique_sample_values[key])
      });

      setActiveCmp(true)
      setData(y)
      setTimeout(function () {
        setLoader(false)
      }, (1000));
    }
  }, [heatmapJson])

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

  


  const changeType = (e, type) => {
    let c = document.getElementsByName('type')
    setActiveCmp(false)
    setLoader(true)
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue","bg-main-blue","text-white")

    setTableType(type)
    let dataJson = inputData
    if(type === 'rna'){
      dataJson['genes'] = genes
    }else if(type === 'methylation'){
      dataJson['genes'] = selectedGene
    }else if(type === 'proteome'){
      dataJson['genes'] = genes
    }else if(type === 'phospo'){
      dataJson['genes'] = selectedGene
    }

    if(inputData.type !==''){
      dataJson['table_type'] = type
      dispatch(getHeatmapInformation('POST', inputData))
    }
  }

  const setGene = (e)=>{
    let gene = e.target.value
    setSelectedGene([gene])

    let dataJson = inputData
    if(tableType === 'rna'){
      dataJson['genes'] = genes
    }else if(tableType === 'methylation'){
      dataJson['genes'] = [gene]
    }else if(tableType === 'proteome'){
      dataJson['genes'] = genes
    }else if(tableType === 'phospo'){
      dataJson['genes'] = [gene]
    }

    if(inputData.type !==''){
      dataJson['table_type'] = tableType
      setLoader(true)
      setActiveCmp(false)
      dispatch(getHeatmapInformation('POST',inputData))
    }
  }

  return (
    <div>
      <div className="grid  ">
        <div className="p-5 text-right">
          <div className="flex justify-start items-baseline flex-wrap">
            <div className="flex m-2">
              <button onClick={e => changeType(e, 'rna')} name='type' className="rounded-r-none  hover:scale-110
                  focus:outline-none flex p-5 rounded font-bold cursor-pointer
                  hover:bg-main-blue  bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition">
                RNA
              </button>
              <button onClick={e => changeType(e, 'methylation')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                Methylation
              </button>
              <button onClick={e => changeType(e, 'proteome')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                Global Proteome
              </button>
              <button onClick={e => changeType(e, 'phospo')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                Phospho
              </button>
            </div>
          </div>
        </div>
        <div className='grid'>
          { loader? <LoaderCmp/>: <div>
            {(tableType === 'methylation' || tableType==='phospo') &&
              <div className='grid grid-cols-6'>
                {inputGene &&
                  <select value={selectedGene[0]} onChange={e=>setGene(e)} className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700" >
                    {inputGene}
                  </select>
                }
              </div>
            }
            {data_ && <HeatmapNewCmp inputData={data_} watermarkCss={watermarkCss} ref={reference} width={width} />}
            </div>
          }
        </div>
      </div>
    </div>
  )
}
