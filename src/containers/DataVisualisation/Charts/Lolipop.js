import React, { useState,useEffect,Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import LollipopCmp from '../../Common/Lollipop'
import { getLolipopInformation } from '../../../actions/api_actions'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'
import DataTable from 'react-data-table-component';

export default function DataLolipop({ width,inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [genesHtml,setGenesHtml] = useState([])
  const [gene,setGene] = useState('')
  const [activeCmp,setActiveCmp] = useState(false)
  const [tableType,setTableType] = useState('Mutation')
  const [inputState,setInputState] = useState({})
  const [watermarkCss, setWatermarkCSS] = useState("")
  const lolipopJson = useSelector((data) => data.dataVisualizationReducer.lollipopSummary);
  const [loader, setLoader] = useState(false)
  const [tableData, setTableData] = useState([])
  const [state,setState] = useState({"domains":[],"lollipop":[],"width":0,'height':0})
  const [mutationLabel,setMutationLabel] = useState([])
  const [tableColumnsData,setTableColumnsData] = useState([])
  const [enstId,setEnstId] = useState([])
  const [refSeqId,setRefSeqId] = useState([])
  let mutation_colors = {
    'In_Frame_Del':'#1b4879',
    'In_Frame_Ins':'#c74951',
    'Frame_Shift_Del':'#603d92',
    'Frame_Shift_Ins':'#3778ae',
    'Nonsense_Mutation':'#d3352b',
    'Splice_Site':'#f28432',
    'Germline':'#000000',
    'Missense_Mutation':'#549d3e'
  }

  let phospo_colors = {
    "S":"#1b4879",
    "T":'#603d92',
    "Y":'#d3352b'
  }



  const geneSet = (e) => {
    let gene = e.target.value
    setGene(gene)
    if(inputData.type !==''){
      let dataJson = inputData
      dataJson['genes'] = gene
      dataJson['table_type'] = tableType
      setLoader(true)
      setActiveCmp(false)
      dispatch(getLolipopInformation('POST',dataJson))
    }
  }

  const loadGenesDropdown = (genes) => {

    let t = []
    for (var i = 0; i < genes.length; i++) {
      t.push(
        <option key={i+'_'+genes[i]} value={genes[i]}>
          {genes[i]}
        </option>
      )
    }
    setGenesHtml(t)
  }

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
        dataJson['genes'] = g[0]
        dataJson['table_type'] = tableType
        dispatch(getLolipopInformation('POST',dataJson))
      }
      setTableType(tableType)
    }
  },[inputState])

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  const generateColor = ()=>{
    var letters = "0123456789ABCDEF";
    var color = '#';
    for (var i = 0; i < 6; i++)
      color += letters[(Math.floor(Math.random() * 16))];
    return color
  }


  useEffect(()=>{
    if(lolipopJson){
      if(Object.keys(lolipopJson).length>0){
        let domainsTmp = {}
        let domains = []
        let lollipop = []
        let lollipopLegenedTmp = {}
        let lollipopTmp = {}
        let codons = {}
        var width = []
        let data = lolipopJson['data']
        let table_data = []
        let table_cols = []
        let enst_id = []
        let refseq_id = []
        if(data.length>0){
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            if(tableType === "Mutation"){
              let vc_sample = data[i]['variant_classification']
              if(vc_sample in lollipopLegenedTmp){
                if(lollipopLegenedTmp[vc_sample].includes(data[i].sample)==false){
                  lollipopLegenedTmp[vc_sample].push(data[i].sample)
                }
              }else{
                lollipopLegenedTmp[vc_sample] = [data[i].sample]
              }
              if(data[i]['protien']){
                let protein = data[i]['protien'].replace(/[^\d]/g,'');
                let p_vc = protein+"||"+data[i]['variant_classification']

                if(p_vc in lollipopTmp){
                  lollipopTmp[p_vc].push(data[i]['sample']+"||"+data[i]['protien'])
                }else{
                  lollipopTmp[p_vc] = [data[i]['sample']+"||"+data[i]['protien']]
                }
              }
              table_data.push({
                "sample":data[i]['sample'],
                "protein":data[i]['protien'],
                "variant_classification":data[i]['variant_classification']
              })

              refseq_id.push(data[i]['refseq_mrna_id'])
              enst_id.push(data[i]['annotation_transcript'])

            }else if(tableType=="Phospho"){
              let site_sample = data[i]['site'].split(' ')
              for (var k = 0; k < site_sample.length; k++) {
                if(site_sample[k] in lollipopLegenedTmp){
                  if(lollipopLegenedTmp[site_sample[k]].includes(data[i].sample)==false){
                    lollipopLegenedTmp[site_sample[k]].push(data[i].sample)
                  }
                }
                else{
                  lollipopLegenedTmp[site_sample[k]] = [data[i].sample]
                }
              }
              table_data.push({
                "sample": data[i]['sample'],
                "site": data[i]['site'],
                "gene": gene
              })
            }
          }
        }
        setRefSeqId(refseq_id)
        setEnstId(enst_id)
        let tmp = []
        let height = []
        let colors
        if(tableType === "Mutation"){
          table_cols = [
            {
              name: 'Sample Id',
              selector: row => row.sample
            },
            {
              name: 'Protein Change',
              selector: row => row.protein
            },
            {
              name: 'Mutation Type',
              selector: row => row.variant_classification
            }
          ]
          colors = mutation_colors
          for (var key in mutation_colors) {
            let name = key
            let count = 0
            if(key in lollipopLegenedTmp){
              count = lollipopLegenedTmp[key].length
            }
            tmp.push(
              <div className='p-3'>
                <span style={{'backgroundColor':colors[key]}} className="inline-flex items-center justify-center px-3 mr-3 pb-1 text-md font-bold leading-none text-white rounded-full">
                  { count }
                </span>
                <text style={{'color':colors[key]}}><strong>{key}</strong></text>
              </div>
            )
            for (var vc in lollipopTmp) {
              if(vc.includes(key)){
                let codon = vc.split("||")
                lollipop.push({
                  "codon":codon[0],
                  'count': lollipopTmp[vc].length,
                  'color':colors[key],
                  'tooltip': {
                    'header':'Protein Change',
                    'body': lollipopTmp[vc][0].split('||')[1]
                  }
                })
                height.push(lollipopTmp[vc].length)
              }
            }
          }
        }else{
          table_cols = [
            {
              name: 'Sample Id',
              selector: row => row.sample
            },
            {
              name: 'Site',
              selector: row => row.site
            },
            {
              name: 'Gene',
              selector: row => row.gene
            }
          ]
          tmp.push(
            <div className='p-3'>
              <text>Total Site:</text>
            </div>
          )
          colors = phospo_colors
          let phospho_tmp = {}
          for(var key in lollipopLegenedTmp){
            let name = key.substring(0,1)
            if( name in phospho_tmp){
              phospho_tmp[name] += lollipopLegenedTmp[key].length
            }else{
              phospho_tmp[name] = lollipopLegenedTmp[key].length
            }
            let position = key.replace(/[^\d]/g,'');
            lollipop.push({
              "codon":position,
              'count': lollipopLegenedTmp[key].length,
              'color':colors[key.substring(0,1)],
              'tooltip': {
                'header': key+' Site',
                'body': lollipopLegenedTmp[key].length+' Phosphorelytions'
              }
            })

            height.push(lollipopLegenedTmp[key].length)
          }
          for(var key in phospo_colors){
            let name = key
            let count = 0
            if(key in phospho_tmp){
              count = phospho_tmp[key]
            }
            tmp.push(
              <div className='p-3'>
                <span style={{'backgroundColor':colors[name]}} className="inline-flex items-center justify-center px-3 mr-3 pb-1 text-md font-bold leading-none text-white rounded-full">
                  { count }
                </span>
                <text style={{'color':colors[key]}}><strong>{name}</strong></text>
              </div>
            )
          }
          tmp.push(<div className='p-3'> / Major Site:</div>)
          for(var key in lollipopLegenedTmp){
            tmp.push(<div className='p-3'>
              <text ><strong>{key+"("+lollipopLegenedTmp[key].length+")"}</strong></text>
            </div>)
          }
        }

        let domains_data = lolipopJson['domains']
        for (var i = 0; i < domains_data.length; i++) {
          let l = (domains_data[i].end-domains_data[i].start)/domains_data[i]['domain'].length
          let name = domains_data[i]['domain'].substring(0,l)
          if(name == ''){
            name =  domains_data[i]['domain'].substring(0,1)
          }


          width.push(domains_data[i]['end'])

          domains.push({
            "startCodon": domains_data[i]['start'],
            "endCodon": domains_data[i]['end'],
            "label": name+'...',
            'color': generateColor(),
            'tooltip': {
              "body": domains_data[i]['domain']+" ("+domains_data[i]['start']+" - "+domains_data[i]['end']+")"
            }
          })
        }
        let w = 300
        let h = 10
        if (width.length>0) w = Math.max(...width)
        if (height.length>0) h = Math.max(...height)

        setMutationLabel(tmp)
        setTableData(table_data)
        setTableColumnsData(table_cols)
        setState((prevState) => ({
          ...prevState,
          'domains': domains,
          'lollipop':lollipop,
          "width": w+100,
          "height": h+10
        }))

        setActiveCmp(true)
        setLoader(false)
      }
    }
  },[lolipopJson])

  useEffect(()=>{
    if(activeCmp){
      let c = document.getElementsByName('type')
      for (var i = 0; i < c.length; i++) {
        let classList = c[i].classList
        classList.remove("hover:bg-main-blue","bg-main-blue","text-white");
        classList.add("text-teal-700","hover:bg-teal-200", "bg-teal-100")
      }
      document.getElementById(tableType).classList.add("hover:bg-main-blue","bg-main-blue","text-white")
    }
  },[activeCmp])


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


  const changeType = (e,type)=> {
    let c = document.getElementsByName('type')
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue","bg-main-blue","text-white");
      classList.add("text-teal-700","hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue","bg-main-blue","text-white")
    setTableType(type)
    setActiveCmp(false)
    setLoader(true)
    if(inputData.type !==''){
      let dataJson = inputData
      dataJson['genes'] = gene
      dataJson['table_type'] = type
      dispatch(getLolipopInformation('POST',dataJson))
    }

  }


  return (
    <>{
        loader?
        <LoaderCmp/>
        :
        <div>
          {activeCmp &&
          <Fragment>
            <div className="grid grid-cols-2  ">
              <div className="p-5 text-right">
                <div className="flex justify-start items-baseline flex-wrap">
                  <div className="flex m-2">
                    <button onClick={e=>changeType(e,'Mutation')} id='Mutation' name='type' className="rounded-r-none  hover:scale-110
                      focus:outline-none flex p-5 rounded font-bold cursor-pointer
                      hover:bg-main-blue  bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition">
                        Mutation
                    </button>
                    <button onClick={e=>changeType(e,'Phospho')} id='Phospho' name='type' className="rounded-l-none border-l-0
                      hover:scale-110 focus:outline-none flex justify-center p-5
                      rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                      text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                        Phospho
                    </button>
                  </div>
                </div>
              </div>
              <div className='p-5 text-right m-5'>
                <div className='flex float-right'>
                  <div className='p-3'>Selected Gene Is</div>
                  <div>
                    <select value={gene} onChange={e=>geneSet(e)} className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700">
                      {genesHtml}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid p-10'>
              <div className='bg-white flex'>
                <LollipopCmp watermarkCss={watermarkCss} ref={reference} width={width} type={tableType}
                  gene={gene}
                  data={state}
                />
                {tableType==="Mutation" &&
                  <div className='absolute right-10 flex'>
                    <div className='m-3 text-left'>
                      <label>Enst Id List</label>
                      <textarea className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4">
                        {enstId.join("\n")}
                      </textarea>
                    </div>
                    <div className='m-3 text-left'>
                      <label>Refseq MRNA Id List</label>
                      <textarea className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4">
                        {refSeqId.join("\n")}
                      </textarea>
                    </div>
                  </div>
                }

              </div>
              <div className='flex bg-blue-100 p-10'>
                {mutationLabel}
              </div>

              {tableData.length>0 &&<div className='mt-5'>

                <DataTable pagination
                  columns={tableColumnsData}
                  data={tableData}
                />
              </div>}
            </div>
          </Fragment>
          }
        </div>
    }

    </>
  )

}
