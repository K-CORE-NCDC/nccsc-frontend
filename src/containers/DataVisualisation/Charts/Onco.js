import React, { useState,useEffect, useRef, useContext } from 'react'
import { useSelector, useDispatch } from "react-redux";
import OncoCmp from '../../Common/Onco'
import { getOncoInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import UserFilesTable from '../../Common/Table'
import LoaderCmp from '../../Common/Loader'
import NoContentMessage from '../../Common/NoContentComponent'
import Multiselect from 'multiselect-react-dropdown';
import inputJson from '../../Common/data';
import {FormattedMessage} from 'react-intl';
import { useParams } from "react-router-dom";
import { Context } from "../../../wrapper";

export default function DataOnco({ width,inputData, screenCapture, setToFalseAfterScreenCapture }) {

  const reference = useRef()
  const dispatch = useDispatch()
  const oncoJson = useSelector((data) => data.dataVisualizationReducer.oncoSummary);
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const filterData = useSelector((data)=>data.dataVisualizationReducer.userDefinedFilter);
  const [activeCmp,setActiveCmp] = useState(false)
  const [chartData,setChartData] = useState({})
  const [inputState,setInputState] = useState({})
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [tableData, setTableData] = useState("")
  const [tableCount, setTableCount] = useState()
  const [showOnco, setShowOnco] = useState(false)
  const [noContent, setNoContent] = useState(true)
  const [optionChoices,setOptionChoices] = useState([])
  const [option,setOption] = useState([])
  let { tab, project_id } = useParams();
  const [customFilterJson,setCustomFilterJson] = useState([])

  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  });
  
  useEffect(()=>{
    if(inputJson['filterChoices']){
      if (project_id !== undefined) {
        if(filterData.status===200){
          let filters = filterData['filterJson']
          filters = filters['Clinical Information']
          let tmp = []
          for (const key in filters) {
            if(filters[key].length>0){
              if(filters[key][0]['type']!=='number'){
                tmp.push({"name":key,"id":key})
                
              }
            }
            
          }
          setOptionChoices(tmp)
          setCustomFilterJson(tmp)
        }
      }else{
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
      }
    }
  },[inputJson['filterChoices'],koreanlanguage])

  useEffect(()=>{
    if(inputData && 'genes' in inputData){
      setActiveCmp(false)
      setInputState((prevState) => ({...prevState,...inputData }))
    }
  },[inputData])


  useEffect(()=>{
    if(inputState && 'genes' in inputState){
      setActiveCmp(false)
      if(inputState.type !=='' && inputState.genes.length > 0){
        setLoader(true)
        let dataJson = inputState
        dispatch(getOncoInformation('POST',dataJson))
      }
    }
  },[inputState])

  useEffect(()=>{
    if(oncoJson){
      setChartData((prevState) => ({
        ...prevState,
        ...oncoJson
      }))
      setActiveCmp(true)
      let gData = oncoJson['geneData']
      let cData = oncoJson['clinicalData']
      let final = {}
      let global_ = cData["globalMutCategory"]
      let mutant_ = cData["mutCategory"]

      mutant_.forEach((g, i) => {
        let sample_id = g['sample']
        final[sample_id] = g["val"]
      });

      gData.forEach((g_s, i) => {
        let d_ = g_s['data']
        d_.forEach((item, i) => {
          let s_id = item['sample']
          let regulation = item['regulation']
          let protein = item['protein']
          if (s_id in final){
            if("mRNA Upregulation" in final[s_id]){
              if (regulation === "up"){
                 final[s_id]["mRNA Upregulation"] += 1
                 final[s_id]["mRNA Downregulation"] = 0
              }
              else{
                final[s_id]["mRNA Upregulation"] = 0
                final[s_id]["mRNA Downregulation"] += 1
              }

              if (protein === "up"){
                 final[s_id]["Protein Upregulation"] += 1
                 final[s_id]["Protein Downregulation"] = 0
              }else{
                final[s_id]["Protein Upregulation"] = 0
                final[s_id]["Protein Downregulation"] += 1
              }
            }
            else{
              if (regulation === "up"){
                 final[s_id]["mRNA Upregulation"] = 1
                 final[s_id]["mRNA Downregulation"] = 0
              }
              else if (regulation === "down" ){
                final[s_id]["mRNA Upregulation"] = 0
                final[s_id]["mRNA Downregulation"] = 1
              }else{
                final[s_id]["mRNA Upregulation"] = 0
                final[s_id]["mRNA Downregulation"] = 0
              }
              if (protein === "up"){
                 final[s_id]["Protein Upregulation"] = 1
                 final[s_id]["Protein Downregulation"] = 0
              }else if (protein === "down"){
                final[s_id]["Protein Upregulation"] = 0
                final[s_id]["Protein Downregulation"] = 1
              }else{
                final[s_id]["Protein Upregulation"] = 0
                final[s_id]["Protein Downregulation"] = 0
              }
            }
          }
        });
      });


    }
  },[oncoJson])

  useEffect(() => {
    if(screenCapture){
      setWatermarkCSS("watermark")
    }else{
      setWatermarkCSS("")
    }

    if(watermarkCss !== "" && screenCapture){
      setToFalseAfterScreenCapture()
    }
  }, [screenCapture, watermarkCss])

  useEffect(() => {
    setTimeout(function() {
        setLoader(false)
    }, (1000));
  }, [oncoJson])

  useEffect(() => {
    if (oncoJson && oncoJson.status === 200) {
      setShowOnco(true)
      setNoContent(false)
    } else {
      setShowOnco(false)
      setNoContent(true)
    }
  }, [oncoJson])

  function onSelect(selectedList, selectedItem) {

    let cf = []
    setOption(selectedList)
    selectedList.forEach((item, i) => {
      cf.push(item['id'])
    });

    setActiveCmp(false)
    if(inputState.type !=='' && inputState.genes.length > 0){
      setLoader(true)
      let dataJson = inputState
      dataJson['clinicalFilters'] = cf
      dispatch(getOncoInformation('POST',dataJson))
    }

  }

  function onRemove(selectedList, removedItem) {
    let cf = []
    setOption(selectedList)
    selectedList.forEach((item, i) => {
      cf.push(item['id'])
    });

    setActiveCmp(false)
    if(inputState.type !=='' && inputState.genes.length > 0){
      setLoader(true)
      let dataJson = inputState
      dataJson['clinicalFilters'] = cf
      dispatch(getOncoInformation('POST',dataJson))
    }
  }

  return (

    <>
    {optionChoices &&
      <div className='grid'>
        <div className='p-5 text-right m-5'>
          <div className='flex flex-wrap float-left'>
            
            <label><FormattedMessage  id = "Clinical_Filters_heatmap" defaultMessage='Clinical Attribute annotation'/></label>
            <Multiselect
              options={optionChoices} // Options to display in the dropdown
              selectedValues={option} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
        </div>
      </div>
    }
    {
      loader?
      <LoaderCmp/>
      :
      <div>
        {activeCmp &&
          <div className="grid ">
            <div className="col-span-2">
              {showOnco && <div className='text-left'>
                <div className="pl-10">
                <h3>
                <FormattedMessage  id = "GlobalMutationDistribution" defaultMessage="Global Mutation Distribution :distribution of total mutation"/>
                </h3>
                <h3>
                <FormattedMessage  id = "GlobalMutationCount" defaultMessage="Global Mutation Count :count of total somatic mutation"/>
                </h3>
                <h3>
                <FormattedMessage  id = "MutationDistribution" defaultMessage="Mutation Distribution :distribution of selected mutation"/>
                </h3>
                { Englishlanguage && <h3>Mutation count: count of selected somatic mutation</h3>}

                {
                  Englishlanguage && <h3> You can activate or deactivate each variant classification legend by clicking on each item. (Maximum 4 items)</h3>
                }

                { koreanlanguage && <h3>Mutation count: 선택된 체세포 변이의 수</h3>}

                {
                  koreanlanguage && <h3>각 항목을 클릭하여 각 변이 분류 범례를 활성화 또는 비활성화 할 수 있습니다.(최대 4개)</h3>
                }

                </div>
                {/* <div className="pl-10"><FormattedMessage  id = "oncoplot_total_samples" defaultMessage={`No of samples :${chartData['geneData']&&chartData['geneData'].length?chartData['geneData'][0].data.length:0}`}/></div> */}
                <OncoCmp
                watermarkCss={watermarkCss}
                ref={reference}
                width={width}
                data={chartData}
                table_data={tableData}
                table_count={tableCount}
                customFilterJson = {customFilterJson}
                project_id = {project_id}
                />
              </div>}
              {noContent && <NoContentMessage />}
            </div>

          </div>
        }
      </div>
    }
    </>
  )
}


// <div className="ml-20 col-span-2 max-w-screen-xl">
//   {
//     tableData &&
//     <UserFilesTable userDataTableData={tableData} />
//   }
// </div>
