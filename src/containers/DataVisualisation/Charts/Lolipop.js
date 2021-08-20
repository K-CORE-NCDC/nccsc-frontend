import React, { useState,useEffect,Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import LollipopCmp from '../../Common/Lollipop'
import { getLolipopInformation } from '../../../actions/api_actions'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'


export default function DataLolipop({ leftFilter,width,inputData }) {
  const dispatch = useDispatch()
  const [genesHtml,setGenesHtml] = useState([])
  const [gene,setGene] = useState('')
  const [activeCmp,setActiveCmp] = useState(false)
  const [tableType,setTableType] = useState('Mutation')
  const [inputState,setInputState] = useState({})
  const lolipopJson = useSelector((data) => data.dataVisualizationReducer.lollipopSummary);

  console.log(leftFilter);
  const geneSet = (e) => {
    let hash = e.target.hash
    let gene = hash.substring(1)
    setGene(gene)
    if(inputData.type !==''){
      let dataJson = inputData
      dataJson['genes'] = gene
      dataJson['table_type'] = tableType
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
      console.log('---inputdata');
      setInputState((prevState) => ({...prevState,...inputData }))
      // setInputState(inputData)

    }
  },[inputData])
  useEffect(()=>{
    if(inputState && 'genes' in inputState){
      console.log('---inputstat');
      console.log(inputState);
      let g = inputState['genes']
      loadGenesDropdown(g)
      setGene(g[0])
      if(inputState.type !==''){
        let dataJson = inputState
        dataJson['genes'] = g[0]
        dataJson['table_type'] = tableType
        dispatch(getLolipopInformation('POST',dataJson))
      }
    }
  },[inputState])

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(()=>{
    if(lolipopJson){
      if(Object.keys(lolipopJson).length>0){
        // if(lolipopJson['domains'].length>0 && lolipopJson['lollipop'].length>0){
          setActiveCmp(true)
        // }
      }
    }
  },[lolipopJson])

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
          <LollipopCmp width={width} gene={gene} data={lolipopJson}/>
        </div>
      </Fragment>
      }
    </div>
  )

}
