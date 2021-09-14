import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import OncoCmp from '../../Common/Onco'
import { getOncoInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import UserFilesTable from '../../Common/Table'
import LoaderCmp from '../../Common/Loader'

export default function DataOnco({ width,inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const oncoJson = useSelector((data) => data.dataVisualizationReducer.oncoSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [chartData,setChartData] = useState({})
  const [inputState,setInputState] = useState({})
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [tableData, setTableData] = useState("")
  const [tableCount, setTableCount] = useState()

  useEffect(()=>{
    if(inputData && 'genes' in inputData){
      setActiveCmp(false)
      setInputState((prevState) => ({...prevState,...inputData }))
    }
  },[inputData])


  useEffect(()=>{
    if(inputState && 'genes' in inputState){
      setActiveCmp(false)
      if(inputState.type !==''){
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

      global_.forEach((g, i) => {
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
      let count = 1
      let table_data = []

      Object.keys(final).forEach((item, i) => {
        if("mRNA Upregulation" in final[item]){
          let val = final[item]
          val["sampl_id"] = item
          if(count === 6){
              return false
          }else{
              table_data.push(val)
              count += 1
          }
        }
      });
      setTableData(table_data)
      setTableCount(Object.keys(final).length)
    }
  },[oncoJson])

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
    setTimeout(function() {
        setLoader(false)
    }, (1000));
  }, [oncoJson])

  // console.log("tableCount---->",tableCount)

  return (
    <>{
      loader?
      <LoaderCmp/>
      :
      <div>
        {activeCmp &&
          <div className="grid grid-rows-2">
            <div className="col-span-2">
              <div className='text-left'>
                <div className="pl-10">
                <h3>Global Mutation Distribution :distribution of total mutation</h3>
                <h3>Global Mutation Count :count of total somatic mutation</h3>
                <h3>Mutation Distribution :distribution of selected mutation</h3>
                <h3>Mutation Count :count of selected somatic mutation</h3>
                </div>
                <OncoCmp
                watermarkCss={watermarkCss}
                ref={reference}
                width={width}
                data={chartData}
                table_data={tableData}
                table_count={tableCount}
                />
              </div>
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
