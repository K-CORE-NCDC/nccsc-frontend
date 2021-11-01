import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import BoxPlot from '../../Common/BoxPlot2'
import BoxPlot1 from '../../Common/BoxPlot'
import LoaderCmp from '../../Common/Loader'
import { getBoxInformation} from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';
import Multiselect from 'multiselect-react-dropdown';
import NoContentMessage from '../../Common/NoContentComponent'
import {FormattedMessage} from 'react-intl';

export default function Box({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const boxJson = useSelector((data) => data.dataVisualizationReducer.boxData);

  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [inputState,setInputState] = useState({})
  const [genesHtml,setGenesHtml] = useState([])
  const [selectedValue,setSelectedValue] = useState([])
  const [showBoxPlot, setShowBoxPlot] = useState(false)
  const [noContent, setNoContent] = useState(true)
  const [viewType, setViewType] = useState('gene_vl')
  const [tableType,setTableType] = useState('proteome')
  const [activeCmp,setActiveCmp] = useState(false)
  const [gene, setGene] = useState('')
  const [geneOption,setGeneOption] = useState('')
  const [genes,setGenes] = useState('')

  useEffect(()=>{
    if(inputData && 'genes' in inputData){
      setGenes(inputData['genes'])
      setInputState({...inputData})

    }
  },[])

// dispatch(getBoxInformation('POST', {...postJsonBody, genes: inputData.genes}))

  const dispatchActionCommon = (postJsonBody) =>{
    if(postJsonBody.table_type === 'proteome'){
      dispatch(getBoxInformation('POST', postJsonBody))
    }else{
      dispatch(getBoxInformation('POST', postJsonBody))
    }
  }

  const loadGenesDropdownMutation = (genes) => {
    let t = []
    let t_ = []
    for (var i = 0; i < genes.length; i++) {
      t_.push(
        <option key={i + '_' + genes[i]} value={genes[i]}>
          {genes[i]}
        </option>
      )
      t.push(
        { "name": genes[i], "id": i }
      )
    }
    setGenesHtml(t)
    setGeneOption(t_)
  }

  const geneSet = (e) => {
    let gene = e.target.value
    setGene(gene)
    if (inputData.type !== '') {
      let dataJson = {...inputData}
      dataJson['genes'] = [gene]
      dataJson['table_type'] = tableType
      dataJson['view'] = viewType

      setLoader(true)
      setActiveCmp(false)
      dispatchActionCommon(dataJson)
    }
  }

  useEffect(()=>{
    if(inputState && 'genes' in inputState){
      let g = inputState['genes']
      let dataJson = inputState
      loadGenesDropdown(g)
      loadGenesDropdownMutation(g)
      setGene(g[0])
      if(tableType==='proteome'){
        dataJson['genes'] = g
      }else{
        dataJson['genes'] = [g[0]]
      }

      if(inputState.type !==''){
        setLoader(true)
        dataJson['table_type'] = tableType
        dataJson['view'] = viewType
        dispatchActionCommon(dataJson)
      }
    }
  },[inputState])

  // useEffect(() => {
  //   if(inputData && inputData.genes.length > 0) {
  //     setDisplaySamples(true)
  //   }else{
  //     setDisplaySamples(false)
  //   }
  // }, [inputData])

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
      let dataJson = {...inputData}
      dataJson['genes'] = genes
      dataJson['table_type'] = tableType
      dataJson['view'] = viewType
      // console.log(genes)
      setLoader(true)
      dispatchActionCommon(dataJson)
    }
  }

  function onRemove(selectedList, removedItem) {
    let genes = []
    setSelectedValue(selectedList)
    // console.log(removedItem)
    selectedList.forEach((item, i) => {
      genes.push(item['name'])
    });
    if(genes.length === 0){
      genes = inputState['genes']
    }
    if(inputData.type !==''){
      let dataJson = {...inputData}
      dataJson['genes'] = genes
      dataJson['table_type'] = tableType
      dataJson['view'] = viewType

      setLoader(true)
      // setActiveCmp(false)
      dispatchActionCommon(dataJson)
    }
  }

  const changeType = (e,type)=>{
    let c = document.getElementsByName('type')
    setTableType(type)
    setActiveCmp(false)
    setLoader(true)
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue","bg-main-blue","text-white")
    let dataJson = inputState
    if(inputData.type !==''){
      // console.log(selectedValue)
      let gene_ = selectedValue.map(x => x['name']);
      if (gene_.length <= 0){
        gene_ = [gene]
      }
      // console.log(type)
      // console.log(inputState)
      if(type==='mutation'){
        dataJson['genes'] = gene_

        let selected = selectedValue
        // selected.push({"name":gene,id:1})
        if(selected.length > 0){
          selected = selected.filter((data,index)=>{
            return selected.indexOf(data) === index;
          })
        }else{
          selected.push({"name":gene,id:1})
        }
      }else{
        setSelectedValue([])
        dataJson['genes'] = genes
      }

      // dataJson['genes'] = inputState['gene']
      dataJson['table_type'] = type
      dataJson['view'] = viewType
      dispatchActionCommon(dataJson)
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

    let dataJson = inputState
    if(inputData.type !==''){
      dataJson['table_type'] = tableType
      dataJson['view'] = view
      dispatchActionCommon(dataJson)
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
  selected_button += "rounded-r-none  hover:scale-110 focus:outline-none flex lg:p-5 sm:p-2 lg:px-10 md:px-10 sm:px-8 sm:w-40 md:w-80 sm:text-xl lg:text-2xl sm:h-16 lg:h-24"
  selected_button += " rounded font-bold cursor-pointer hover:bg-main-blue "
  selected_button +=" bg-main-blue text-white border duration-200 ease-in-out transition "

  let normal_button = ''
  normal_button += "rounded-l-none  hover:scale-110 focus:outline-none flex justify-center lg:p-5 sm:p-2 lg:px-10 sm:px-8 sm:w-40 md:w-80 sm:text-xl lg:text-2xl sm:h-16 lg:h-24"
  normal_button += " rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 "
  normal_button += " border duration-200 ease-in-out border-teal-600 transition px-10 "



  // <select value={gene} onChange={e=>geneSet(e)} className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700">
  //   {geneOption}
  // </select>


  return (
    <div className='grid'>
        <div className="grid grid-cols-2">
          <div className="mx-5 sm:col-span-2 lg:col-span-1">
            <div className="flex m-2 w-100">
              <button onClick={e => changeType(e, 'proteome')} name='type' className="rounded-r-none  hover:scale-110 focus:outline-none flex lg:p-5 sm:p-2 lg:px-10 md:px-10 sm:px-8 sm:w-40 md:w-48  lg:w-48 sm:text-xl lg:text-2xl sm:h-16 lg:h-20 rounded
              font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 ease-in-out transition ">
                Proteome
              </button>
              <button onClick={e => changeType(e, 'mutation')} name='type' className="rounded-l-none  hover:scale-110 focus:outline-none flex justify-center lg:p-5 sm:p-2 sm:w-40 md:w-48 lg:w-48 sm:text-xl lg:text-2xl sm:h-16 lg:h-20 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 border duration-200 ease-in-out border-teal-600 transition px-10 ">
                Mutation
              </button>
            </div>
          </div>

            <div className='flex  text-left'>
              <div className='w-9/12 text-right sm:pl-8'>
                {tableType==='proteome' && <>
                  <label><FormattedMessage  id = "Selected Gene Is" defaultMessage='Selected Gene Is'/></label>
                  <Multiselect
                    options={genesHtml} // Options to display in the dropdown
                    selectedValues={selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    style={style}
                  /> </>
                  }
                {
                  tableType==='mutation' &&
                  <div>
                    <label><FormattedMessage  id = "Selected Gene Is" defaultMessage='Selected Gene Is'/></label>
                    <Multiselect
                      options={genesHtml} // Options to display in the dropdown
                      selectedValues={selectedValue} // Preselected value to persist in dropdown
                      onSelect={onSelect} // Function will trigger on select event
                      onRemove={onRemove} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      style={style}
                    />
                  </div>
                }
              </div>
              <div className="mx-5 flex-wrap text-left w-3/12 text-right">
                  <FormattedMessage  id = "View_By_heatmap" defaultMessage='View By'/>:
                  <div className="flex m-2 w-100">
                    <button onClick={e => changeView(e, 'gene_vl')} name='view' className={viewType==="gene_vl"?selected_button:normal_button}>
                      Gene-vl
                    </button>
                    <button onClick={e => changeView(e, 'z_score')} name='view' className={viewType==="z_score"?selected_button:normal_button}>
                      Z-Score
                    </button>
                  </div>
              </div>
            </div>

        </div>
        {
          loader?
            <LoaderCmp/>
            :boxJson &&
            <>
            {showBoxPlot  && <BoxPlot box_data={boxJson} chart_type={tableType}  ref={reference} watermarkCss={watermarkCss} width={width}/>}

            {noContent && <NoContentMessage />}
            </>
        }

    </div>
  )
}
