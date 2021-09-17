import React, { useState,useEffect,Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import LollipopCmp from '../../Common/Lollipop'
import { getLolipopInformation } from '../../../actions/api_actions'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'


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
  const [tableData, setTableData] = useState()
  const [state,setState] = useState({"domains":[],"lollipop":[],"width":0})
  const [mutationLabel,setMutationLabel] = useState([])

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
    let hash = e.target.hash
    let gene = hash.substring(1)
    setGene(gene)
    if(inputData.type !==''){
      let dataJson = inputData
      dataJson['genes'] = gene
      dataJson['table_type'] = tableType
      setLoader(true)
      dispatch(getLolipopInformation('POST',dataJson))
    }
  }

  const loadGenesDropdown = (genes) => {
    let t = []
    for (var i = 0; i < genes.length; i++) {
      t.push(
        <Menu.Item key={i+'_'+genes[i]}>
          <a href={"#"+genes[i]} onClick={e=>geneSet(e)} className='bg-white-100 text-gray-900 block px-4 py-2'>{genes[i]}</a>
        </Menu.Item>
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

            let protein = data[i]['protien'].replace(/[^\d]/g,'');
            let p_vc = protein+"||"+data[i]['variant_classification']

            if(p_vc in lollipopTmp){
              lollipopTmp[p_vc].push(data[i]['sample']+"||"+data[i]['protien'])
            }else{
              lollipopTmp[p_vc] = [data[i]['sample']+"||"+data[i]['protien']]
            }
          }else{
            let vc_sample = data[i]['site']
            if(vc_sample in lollipopLegenedTmp){
              if(lollipopLegenedTmp[vc_sample].includes(data[i].sample)==false){
                lollipopLegenedTmp[vc_sample].push(data[i].sample)
              }
            }
            else{
                lollipopLegenedTmp[vc_sample] = [data[i].sample]
            }

            let protein = data[i]['protien'].replace(/[^\d]/g,'');
            let p_vc = protein+"||"+data[i]['site']
            if(p_vc in lollipopTmp){
              lollipopTmp[p_vc].push(data[i]['sample']+"||"+data[i]['protien'])
            }else{
              lollipopTmp[p_vc] = [data[i]['sample']+"||"+data[i]['protien']]
            }

          }
        }

        let tmp_ = {"S":[],"Y":[],"T":[]}
        for (var h in lollipopLegenedTmp){
            if (h.startsWith('S')){
                tmp_['S'].push(...lollipopLegenedTmp[h])
            }

            if (h.startsWith('Y')){
              tmp_['Y'].push(...lollipopLegenedTmp[h])
            }

            if (h.startsWith('T')){
                tmp_['T'].push(...lollipopLegenedTmp[h])
            }
        }


        let tmp = []
        let colors
        if(tableType === "Mutation"){
          colors = mutation_colors
        }else{
          lollipopLegenedTmp = tmp_
          colors = phospo_colors
        }

        for (var key in lollipopLegenedTmp) {
          tmp.push(
            <div className='p-3'>
              <span style={{'backgroundColor':colors[key]}} className="inline-flex items-center justify-center px-3 mr-3 pb-1 text-md font-bold leading-none text-white rounded-full">
                { lollipopLegenedTmp[key].length }
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
            }
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
        if(width.length>0){
          w = Math.max(...width)
        }
        setMutationLabel(tmp)
        setState((prevState) => ({
          ...prevState,
          'domains': domains,
          'lollipop':lollipop,
          "width": w+100
        }))
        // console.log(state);
        setActiveCmp(true)
      }

    }
    setTimeout(function() {
        setLoader(false)
    }, (1000));
  },[lolipopJson])

  useEffect(()=>{
    if(state){
      console.log(state);
    }
  },[state])

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
                    <button onClick={e=>changeType(e,'Mutation')} name='type' className="rounded-r-none  hover:scale-110
                      focus:outline-none flex p-5 rounded font-bold cursor-pointer
                      hover:bg-main-blue  bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition">
                        Mutation
                    </button>
                    <button onClick={e=>changeType(e,'Phospho')} name='type' className="rounded-l-none border-l-0
                      hover:scale-110 focus:outline-none flex justify-center p-5
                      rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                      text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                        Phospho
                    </button>
                  </div>
                </div>
              </div>
              <div className='p-5 text-right m-5'>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                      Selected Gene Is {gene}
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {genesHtml}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className='grid'>
              <div>
                <LollipopCmp watermarkCss={watermarkCss} ref={reference} width={width} type={tableType}
                gene={gene}
                data={state}
                />
              </div>
              <div className='flex'>
                {mutationLabel}
              </div>
            </div>
          </Fragment>
          }
        </div>
    }

    </>
  )

}
