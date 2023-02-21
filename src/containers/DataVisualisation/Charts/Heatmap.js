import React, { useState, useEffect, Fragment, useRef, useContext } from 'react'
import { useSelector, useDispatch } from "react-redux";
import HeatmapNewCmp from '../../Common/testH'
import { getHeatmapInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'
import NoContentMessage from '../../Common/NoContentComponent'
import inputJson from '../../Common/data'
import { ZoomInIcon } from '@heroicons/react/solid';
import Multiselect from 'multiselect-react-dropdown';
import KmeanCmp from '../../Common/K_mean';
import {FormattedMessage} from 'react-intl';
import { Context } from "../../../wrapper";
import { useParams } from "react-router-dom";
export default function DataHeatmap({ width,inputData, screenCapture, brstKeys, setToFalseAfterScreenCapture }) {
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const reference = useRef()
  const dispatch = useDispatch()
  const [activeCmp,setActiveCmp] = useState(false)
  const [tableType,setTableType] = useState('rna')
  const [data_,setData] = useState('')
  const [inputGene,setInputGene] = useState([])
  const heatmapJson = useSelector((data) => data.dataVisualizationReducer.heatmapSummary);
  const heatmapSummaryStatusCode = useSelector((data) => data.dataVisualizationReducer.heatmapSummaryStatusCode);
  // const didMountRef = useRef(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [rangeValue,setRangeValue] = useState(1)
  const [loader, setLoader] = useState(false)
  const [genes,setGenes] = useState([])
  const [selectedGene,setSelectedGene] = useState([])
  const [optionChoices,setOptionChoices] = useState([])
  const [option,setOption] = useState([])
  const [viewType, setViewType] = useState('gene_vl')
  const [mainTab,setMainTab] = useState('heatmap')
  const [clusterRange,setClusterRange] = useState("")
  const [inSufficientData, setInSufficientData] = useState(true)
  const [renderNoContent, setRenderNoContent] = useState(false)
  const [renderHeatmap, setRenderHeatmap] = useState(true)
  let { tab, project_id } = useParams();
  const [userDefienedFilter, setUserDefienedFilter] = useState(
    project_id === undefined ? "static" : "dynamic"
  );

  const [alltabList, setAllTabList] = useState({});
  const tabList = useSelector(
    (data) => data.dataVisualizationReducer
  );


  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  });

  const diag_age = (vl)=>{
    let n = parseInt(vl)
    let tmp = ''
    if(n >20 && n<=25){
      tmp = '21~25'
    } else if(n>25 && n<=30 )  {
      tmp = '26~30'
    } else if(n>30 && n<=35) {
      tmp = '31~35'
    } else if(n>35 && n<=40) {
      tmp = '36~40'
    }
    return tmp
  }

  const bim_vl = (vl)=>{
    let n = parseInt(vl)
    let tmp = ''
    if(n<18.5){
      tmp='~18.5'
    }else if (n>18.5 &&n<=25) {
      tmp = '18.5 ~ 25'
    }else if (n>25 &&n<=30) {
      tmp='25.1~30'
    }else if (n>30) {
      tmp='30.1~'
    }
    return tmp
  }

  const smoking_status = (n)=>{
    let tmp = ''
    if((n === 'Y') || (n === true) || (n === 'Yes')){
      tmp = 'YES'
    }else if((n === 'N') || (n === false) || (n === 'No')) {
      tmp = 'No'
    }else{
      tmp='N/A'
    }
    return tmp
  }

  useEffect(()=>{
    if(koreanlanguage){

      if(inputJson['filterChoicesKorean']){
        let f = inputJson['filterChoicesKorean']
        setOptionChoices(f)
      }
    }else{
      
      if(inputJson['filterChoices']){
        let f = inputJson['filterChoices']
        setOptionChoices(f)
      }
    }
  },[inputJson['filterChoices'],koreanlanguage])

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
      if(inputData.type !=='' && inputData['genes'].length > 0){
        setLoader(true)
        inputData['table_type'] = tableType
        inputData['view'] = viewType
        inputData['heat_type'] = mainTab
        dispatch(getHeatmapInformation('POST', inputData))
      }
    }
  }, [inputData])

  useEffect(() => {
    if (heatmapJson) {
      let genes = []
      let unique_sample_values = {}
      let heat_data = []
      let unique_cf = {}
      let z = {}
      let optn = {}
      if(option.length>0){
        for (let opt = 0; opt < option.length; opt++) {
          unique_cf[option[opt].id] = []
          z[option[opt].id] = []
          optn[option[opt].id] = option[opt].name
        }
      }

      let d_ = ""
      if(mainTab === "k-mean"){
        d_ = heatmapJson['data']
      }else{
        d_ = heatmapJson
      }

      if(d_!='' && d_ !== undefined){
        d_.forEach((item, i) => {
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
          if(option.length>0){
            for (let opt = 0; opt < option.length; opt++) {
              if(!(breast_key in unique_cf[option[opt].id])){
                unique_cf[option[opt].id][breast_key] = item[option[opt].id]
              }
            }
          }
        });
      }


      let y = {
        "smps":genes,
        "vars":[],
        "data":[]
      }

      let x = {}
      if(mainTab === "k-mean"){
        if(heatmapJson && ('clusters' in heatmapJson)){
          x = {
            "Cluster":heatmapJson['clusters'],
          }
        }
      }

      Object.keys(unique_sample_values).forEach((key, i) => {
        y["vars"].push(key)
        y['data'].push(unique_sample_values[key])
        if(option.length>0){
          for (let opt = 0; opt < option.length; opt++) {
            if(option[opt].id==='diag_age'){
              z[option[opt].id].push(diag_age(unique_cf[option[opt].id][key]))
            }else if(option[opt].id==='bmi_vl'){
              z[option[opt].id].push(bim_vl(unique_cf[option[opt].id][key]))
            }else {
              z[option[opt].id].push(unique_cf[option[opt].id][key])
            }
          }
        }
      });

      let tmp = {}
      for (const key in z) {
        if(key in optn){
          tmp[optn[key]] = z[key]
        }
      }
      // z = tmp
      let setStateTrue = false
      for (const [key, value] of Object.entries(y)) {
        value.forEach(e=>{
          if(e.length > 0){
            setStateTrue = true
          }
        })
      }
      if(setStateTrue){
        setRenderNoContent(false)
        setActiveCmp(true)
        setData({"z":tmp,"x":x,"y":y})
      }else{
        setRenderNoContent(true)
      }
 
      setTimeout(function () {
        setLoader(false)
      }, (1000));
    }
  }, [heatmapJson])


  useEffect(() => {
    if(heatmapJson){
      let geneSet = new Set();
      if('data' in heatmapJson){
        heatmapJson.data.forEach(e=>{
          geneSet.add(e.gene_name)
        })
      }else if(heatmapJson.length > 1){
        heatmapJson.forEach(e=>{
          geneSet.add(e.gene_name)
        })
      }
      if(geneSet.size > 2){
        setInSufficientData(false)
      }else{
        setInSufficientData(true)
      }
    }
  }, [heatmapJson])

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }

    if (watermarkCss !== "" && screenCapture) {
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])

  const changeType = (e, type) => {
    e.preventDefault()
    setTableType(type)
    let c = document.getElementsByName('type')
    setActiveCmp(false)
    setLoader(true)
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white",'border-gray-600');
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue","bg-main-blue","text-white")
    let dataJson = { ...inputData }
    if(type === 'rna'){
      dataJson['genes'] = genes
    }else if(type === 'methylation'){
      dataJson['genes'] = selectedGene
    }else if(type === 'proteome'){
      dataJson['genes'] = genes
    }else if(type === 'phospo'){
      dataJson['genes'] = selectedGene
    }
    setOption([])
    if(inputData.type !=='' && inputData['genes'].length > 0){
      dataJson['table_type'] = type
      dataJson['view'] = viewType
      inputData['heat_type'] = mainTab
      dispatch(getHeatmapInformation('POST', dataJson))
    }
  }

  const changeMainType = (e, type) => {
    let c = document.getElementsByName('maintype')
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white",'border-gray-600');
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue","bg-main-blue","text-white")
    setMainTab(type)
    setOption([])
    let dataJson = { ...inputData }
    if(inputData.type !=='' && inputData['genes'].length > 0){
      // setClusterRange
      setClusterRange(dataJson['genes'].length)
      setActiveCmp(false)
      setLoader(true)
      dataJson['table_type'] = tableType
      dataJson['view'] = viewType
      dataJson['heat_type'] = type
      setLoader(true)
      setActiveCmp(false)
      dispatch(getHeatmapInformation('POST',dataJson))
    }
  }

  const setGene = (e)=>{
    let gene = e.target.value
    setSelectedGene([gene])

    let dataJson = { ...inputData }
    if(tableType === 'rna'){
      dataJson['genes'] = genes
    }else if(tableType === 'methylation'){
      dataJson['genes'] = [gene]
    }else if(tableType === 'proteome'){
      dataJson['genes'] = genes
    }else if(tableType === 'phospo'){
      dataJson['genes'] = [gene]
    }

    if(inputData.type !=='' && inputData['genes'].length > 0){
      dataJson['table_type'] = tableType
      dataJson['view'] = viewType
      dataJson['heat_type'] = mainTab
      setLoader(true)
      setActiveCmp(false)
      dispatch(getHeatmapInformation('POST',dataJson))
    }
  }

  function onSelect(selectedList, selectedItem) {
    let cf = []
    setOption(selectedList)
    selectedList.forEach((item, i) => {
      cf.push(item['id'])
    });


    if(inputData.type !=='' && inputData['genes'].length > 0){
      setLoader(true)
      setActiveCmp(false)
      let dataJson = { ...inputData }
      dataJson['clinicalFilters'] = cf
      dataJson['view'] = viewType
      if((tableType === "methylation") || (tableType === "phospo")){
        dataJson['genes'] = selectedGene
      }
      dataJson['heat_type'] = mainTab
      dataJson['table_type'] = tableType
      dispatch(getHeatmapInformation('POST',dataJson))
    }
  }

  function onRemove(selectedList, removedItem) {
    let items = []
    setOption(selectedList)
    selectedList.forEach((item, i) => {
      items.push(item['id'])
    });
    if(inputData.type !=='' && inputData['genes'].length > 0){
      setLoader(true)
      setActiveCmp(false)
      let dataJson = { ...inputData }
      dataJson['clinicalFilters'] = items
      dataJson['heat_type'] = mainTab
      dataJson['genes'] = selectedGene
      dispatch(getHeatmapInformation('POST',dataJson))
    }
  }

  const changeView = (e,view)=>{
    let c = document.getElementsByName('view')
    setActiveCmp(false)
    setLoader(true)
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue","bg-main-blue","text-white")
    setViewType(view)
    let dataJson = { ...inputData }
    dataJson['view'] = view
    dataJson['heat_type'] = mainTab
    if(inputData.type !=='' && inputData['genes'].length > 0){
      dispatch(getHeatmapInformation('POST', dataJson))
    }
  }

  let style = {
    multiselectContainer:{
      'marginTop':'5px'
    },
    inputField:{
      'padding':'5px'
    }
  }

  let selected_button = ''
  selected_button += "rounded-r-none  hover:scale-110 focus:outline-none flex lg:p-5 sm:p-2 lg:px-10 md:px-10 sm:px-8 sm:w-40 md:w-80 sm:text-xl lg:text-2xl "
  selected_button += " rounded font-bold cursor-pointer hover:bg-main-blue "
  selected_button +=" bg-main-blue text-white border duration-200 ease-in-out transition xs:p-2 xs:text-sm xs:w-28"

  let normal_button = ''
  normal_button += "rounded-l-none  hover:scale-110 focus:outline-none flex justify-center lg:p-5 sm:p-2 lg:px-10 sm:px-8 sm:w-40 md:w-80 sm:text-xl lg:text-2xl "
  normal_button += " rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 "
  normal_button += " border duration-200 ease-in-out border-teal-600 transition px-10 xs:p-2 xs:text-sm xs:w-28"

  function rangeCall(e){
    let cf = []
    setRangeValue(e.target.value)

    if(inputData.type !=='' && inputData['genes'].length > 0){
      setLoader(true)
      setActiveCmp(false)
      let dataJson = { ...inputData }
      dataJson['clinicalFilters'] = cf
      dataJson['view'] = viewType
      dataJson['type'] = viewType
      dataJson['heat_type'] = mainTab
      dataJson['cluster'] = e.target.value
      dispatch(getHeatmapInformation('POST',dataJson))
    }
  }

  useEffect(() => {
    if (heatmapSummaryStatusCode && heatmapSummaryStatusCode.status === 200) {
      setRenderNoContent(false)
      setRenderHeatmap(true)
      setLoader(false)
    } else if(heatmapSummaryStatusCode && heatmapSummaryStatusCode.loader === true){
      setLoader(true)
      setData('')
    }else{
      setLoader(false)
      setRenderNoContent(true)
      setRenderHeatmap(false)
      setData('')
    }
  }, [heatmapSummaryStatusCode])
  

  return (
    <div>
      <div className="grid  ">
        <div className='grid grid-cols-4'>
          <div className="p-5 text-left col-span-4">
            <div className="flex justify-start items-baseline flex-wrap">
              <div className="flex m-2">
                <button onClick={e => changeMainType(e, 'heatmap')} name='maintype' className="rounded-r-none  hover:scale-110 focus:outline-none flex lg:p-5 rounded font-bold cursor-pointer hover:bg-main-blue
                bg-main-blue text-white border duration-200 ease-in-out sm:p-3 sm:text-xl lg:text-2xl sm:h-14 lg:h-20 xs:p-3 md-p-4 border-gray-600 transition xs:text-sm">
                  Heatmap
                </button>
                <button onClick={e => changeMainType(e, 'k-mean')} name='maintype' className="rounded-l-none border-l-0
                    hover:scale-110 focus:outline-none flex justify-center lg:p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 sm:p-3
                    sm:text-xl lg:text-2xl sm:h-14 lg:h-ease-in-out lg:h-20 xs:p-3 md-p-4 border-teal-600 transition xs:text-sm">
                  K-mean
                </button>
              </div>
            </div>
          </div>
          <div className="p-5 text-left xs:col-span-4  lg:col-span-2 sm:col-span-4">
            <div className="flex justify-start items-baseline flex-wrap">
              <div className="flex m-2">
                <button onClick={e => changeType(e, 'rna')} name='type' className="rounded-r-none  hover:scale-110
                    focus:outline-none flex p-5 rounded font-bold cursor-pointer sm:text-xl md:text-2xl lg:text-2xl xs:text-sm xs:p-3
                    hover:bg-main-blue  bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition">
                  RNA
                </button>
                <button onClick={e => changeType(e, 'methylation')} name='type' className="rounded-l-none border-l-0
                    hover:scale-110 focus:outline-none flex justify-center p-5
                    rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 sm:text-xl md:text-2xl lg:text-2xl xs:text-sm xs:p-3
                    text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                  Methylation
                </button>

                {
                  project_id === undefined &&   <button onClick={e => changeType(e, 'proteome')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 sm:text-xl md:text-2xl lg:text-2xl xs:text-sm xs:p-3
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                  Global Proteome
                  </button> 
                }
                {project_id !== undefined &&  alltabList['proteome'] && 
                <button onClick={e => changeType(e, 'proteome')} name='type' className="rounded-l-none border-l-0
                    hover:scale-110 focus:outline-none flex justify-center p-5
                    rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 sm:text-xl md:text-2xl lg:text-2xl xs:text-sm xs:p-3
                    text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                  Global Proteome
                </button> }

                {project_id !== undefined &&  alltabList['proteome'] && 
                <button onClick={e => changeType(e, 'phospo')} name='type' className="rounded-l-none border-l-0
                hover:scale-110 focus:outline-none flex justify-center p-5
                rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 sm:text-xl md:text-2xl lg:text-2xl xs:text-sm xs:p-3
                text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                Phospho </button>
                }
                {project_id === undefined && 
                  <button onClick={e => changeType(e, 'phospo')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 sm:text-xl md:text-2xl lg:text-2xl xs:text-sm xs:p-3
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                  Phospho
                  </button>
                  }
               
              </div>
            </div>
          </div>
          <div className='p-5 text-left flex col-span-2'>
            <div className={tableType!=='methylation'?'xs:w-4/5  lg:w-7/12 xl:w-7/12 2xl:w-9/12 text-left':'w-full text-left'}>
              <label className="xs:text-sm"><FormattedMessage  id = "Clinical_Filters_heatmap" defaultMessage='Clinical Attribute'/>:</label>
              <Multiselect
                style={style}
                options={optionChoices} // Options to display in the dropdown
                selectedValues={option} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
              {mainTab === 'k-mean'?
                <div className="mt-8">
                  <label htmlFor="points"><strong className="">No. Of Cluster:  {rangeValue}</strong></label>
                  <input type="range" className="border-2 border-gray-500 rounded-lg overflow-hidden appearance-none bg-white h-6 w-full opacity-100 relative"
                  id="points" name="points" min="1"  max={clusterRange}  defaultValue={rangeValue} onChange={rangeCall} list='tickmarks'/>
                  <ul className="flex justify-between w-full px-[1px]" id='tickmarks'>
                    { 
                      inputData['genes'].map((name,i)=>(
                        <li key={name} className="flex justify-around relative"><span className="absolute">{i+1}</span></li>
                      ))
                    }
                  </ul>
                </div>:""
              }
            </div>
            { tableType!=='methylation' &&
              <div className="mx-5 flex-wrap  text-left lg:w-5/12 xl:w-5/12 2xl:w-3/12 text-left">
                <FormattedMessage  id = "View_By_heatmap" defaultMessage='View By'/>:
                <div className="flex m-2 w-100">
                  <button onClick={e => changeView(e, 'gene_vl')} name='view' className={viewType==="gene_vl"?selected_button:normal_button}>
                    Gene-Vl
                  </button>
                  <button onClick={e => changeView(e, 'z_score')} name='view' className={viewType==="z_score"?selected_button:normal_button}>
                    Z-Score
                  </button>
                </div>
              </div>
            }
            {(tableType === 'methylation' || tableType==='phospo') &&
              <div className='mx-5 flex-wrap text-left'>
                {inputGene &&
                  <>
                  <label><FormattedMessage  id = "Select Gene" defaultMessage='Select Gene'/></label>
                  <select value={selectedGene[0]} onChange={e=>setGene(e)} className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700" >
                    {inputGene}
                  </select>
                  </>
                }
              </div>
            }
          </div>
        </div>

        <div className='grid'>
          { loader? <LoaderCmp/>: <div>

            {(data_ && (inSufficientData !== true)) && <HeatmapNewCmp clinicalFilter={optionChoices} inputData={data_} type={mainTab} watermarkCss={watermarkCss} ref={reference} width={width} />
            }
            {(inSufficientData || renderNoContent) && <NoContentMessage />}
            </div>
          }
        </div>
      </div>
    </div>
  )
}
