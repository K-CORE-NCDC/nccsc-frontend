import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import Barchart from '../Common/Barchart'
import Piechart from '../Common/Piechart'
import StackedBarChart from '../Common/StackedBarChart'
// import CircosCmp from '../Common/Circos'
import VennCmp from '../Common/Venn'
import VolcanoCmp from '../Common/Volcano'
export default function DataSummary() {
  const [selected, setSelected] = useState('');
  const [divWidth, setdivWidth] = useState('');
  const [divWidth1, setdivWidth1] = useState('');

  const parentRef = useRef(null);
  const parentRef1 = useRef(null);
  // const inputEl = useRef(null);
  // const toggleAccordian = (event)=>{
  //
  //   let accordain_ul = document.querySelector("#accordian_tabs");
  //
  //   let accordain_button = accordain_ul.querySelectorAll("li button")
  //   let accordain_div = accordain_ul.querySelectorAll("li div.accordian_box")
  //   accordain_button.forEach((item, i) => {
  //     item.addEventListener("click",function(e){
  //       e.preventDefault();
  //       let id = this.getAttribute("data-id");
  //       accordain_div.forEach((child_item, j) => {
  //         let child_id = child_item.getAttribute('id')
  //         if(id===child_id){
  //           child_item.classList.remove('max-h-0')
  //           child_item.style.maxHeight = '1200px'
  //         }else{
  //           child_item.classList.add('max-h-0')
  //           child_item.style.maxHeight = '0'
  //         }
  //       });
  //     })
  //   });
  // }

  const toggleTab = (event)=>{
    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("a");
    tabTogglers.forEach(function(toggler) {
      toggler.addEventListener("click", function(e) {
        e.preventDefault();

        let tabName = this.getAttribute("href");

        let tabContents = document.querySelector("#tab-contents");

        for (let i = 0; i < tabContents.children.length; i++) {

          tabTogglers[i].parentElement.classList.remove("border-blue-400", "border-b",  "-mb-px", "opacity-100");  tabContents.children[i].classList.remove("hidden");
          if ("#" + tabContents.children[i].id === tabName) {
            continue;
          }
          tabContents.children[i].classList.add("hidden");

        }
        e.target.parentElement.classList.add("border-blue-400", "border-b-4", "-mb-px", "opacity-100");
      })
    })

  }

  const switchButton = (event,id)=>{
    let s = selected
    if (s===id){
      setSelected('')
    }else{
      setSelected(id)
    }
  }

  useEffect(()=>{
    if(parentRef.current){
      let parentWidth  = parentRef.current.offsetWidth;
      setdivWidth(parentWidth)
    }
    if(parentRef1.current){
      let parentWidth  = parentRef1.current.offsetWidth;
      setdivWidth1(parentWidth)
    }

  },[])


  return (
    <div className="header py-5">
      <section className="pt-5 relative pt-11 items-center  bg-cover bg-center bg-website-bg  justify-center">
        <nav className="bg-white px-8 pt-2 shadow-md">
          <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " onClick={toggleTab}>
            <li className="px-4 py-2  font-semibold opacity-50 border-b-4 -mb-px border-blue-400 rounded-t opacity-100">
              <a id="default-tab" href="#first" >Clinical Information</a>
            </li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50"><a href="#second">Genomic Information</a></li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50"><a href="#third">Advanced Information</a></li>
          </ul>
        </nav>

      </section>
      <section className="bg-website-bg ">
        <div id="tab-contents">
          <div id="first" className="grid grid-cols-4 gap-3">
            <div className="bg-white max-w-xl  border border-gray-200">
              <div>
              </div>
              <h4 className="p-3"><AdjustmentsIcon className="h-6 w-6 inline"/> &nbsp;Filters</h4>
              <ul className="shadow-box w-100 p-3" id='accordian_tabs' >
                <li className={selected==='a_1'?"relative bg-tab border-b border-gray-200 rounded":"relative border-b border-gray-200"}>
                  <button type="button" className={selected==="a_1"?"w-full p-3 text-left border-b border-gray-200 focus:outline-none":"w-full p-3 text-left focus:outline-none"}  onClick={(e)=>switchButton(e,'a_1')}>
                    <div className="flex items-center justify-between">
                      <span>Basic Daignostic Information</span>
                      {selected==='a_1'?<ChevronDownIcon className="h-6 w-6" aria-hidden="true"/>:<ChevronUpIcon className="h-6 w-6" aria-hidden="true"/>}
                    </div>
                  </button>
                  {selected==='a_1' ?
                    <div className="relative overflow-hidden grid grid-cols-1 py-5" id='a_1' >
                      <div className="mb-3">
                        <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                          <div className="ml-3 text-gray-700 w-80">
                            Smoking Status
                          </div>
                          <div className="relative">
                            <input type="checkbox" id="toggleB" className="sr-only"/>
                            <div className="block bg-gray-600 w-14 h-6 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                          <div className="ml-3 text-gray-700  w-80">
                            Alcohal Status
                          </div>
                          <div className="relative">
                            <input type="checkbox" id="toggleB" className="sr-only"/>
                            <div className="block bg-gray-600 w-14 h-6 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>


                    </div>
                  :""}
                </li>
                <li className={selected==='a_2'?"relative bg-tab border-b border-gray-200 rounded":"relative border-b border-gray-200 "}>
                  <button type="button" className={selected==="a_2"?"w-full p-3 text-left border-b border-gray-200 focus:outline-none":"w-full p-3 text-left focus:outline-none"}  onClick={(e)=>switchButton(e,'a_2')}>
                    <div className="flex items-center justify-between">
                      <span>Patient Health Information</span>
                      {selected==='a_2'?<ChevronDownIcon className="h-6 w-6" aria-hidden="true"/>:<ChevronUpIcon className="h-6 w-6" aria-hidden="true"/>}
                    </div>
                  </button>
                  {selected==='a_2' ?
                  <div className="relative overflow-hidden grid grid-cols-1 py-5" id='a_2'>
                    <div className="mb-3">
                      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                        <div className="ml-3 text-gray-700 w-80">
                          Smoking Status
                        </div>
                        <div className="relative">
                          <input type="checkbox" id="toggleB" className="sr-only"/>
                          <div className="block bg-gray-600 w-14 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition"></div>
                        </div>
                      </label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                        <div className="ml-3 text-gray-700  w-80">
                          Alcohal Status
                        </div>
                        <div className="relative">
                          <input type="checkbox" id="toggleB" className="sr-only"/>
                          <div className="block bg-gray-600 w-14 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition"></div>
                        </div>
                      </label>
                    </div>
                  </div>:''}
                </li>
              </ul>
            </div>
            <div className="col-start-2 col-span-3 m-5">
              <div className="grid grid-cols-4 sm:grid-cols-3 gap-3">
                <div className='max-w-sm bg-white rounded overflow-hidden shadow-lg' ref = { parentRef }>
                  {divWidth && <Barchart width={divWidth}/>}
                </div>
                <div className='max-w-sm bg-white rounded overflow-hidden shadow-lg '>
                  {divWidth && <Piechart width={divWidth}/>}
                </div>
                <div className='max-w-sm bg-white rounded overflow-hidden shadow-lg '>
                  {divWidth && <StackedBarChart width={divWidth}/>}
                </div>
                <div className='max-w-sm bg-white rounded overflow-hidden shadow-lg '>
                  {divWidth && <VennCmp width={divWidth}/>}
                </div>

              </div>
              <div className="grid bg-white" ref={parentRef1}>
                {divWidth1 && <VolcanoCmp width={divWidth1}/>}

              </div>
            </div>
          </div>
          <div id="second" className="hidden p-4">
            Second tab
          </div>
          <div id="third" className="hidden p-4">
            Third tab
          </div>

        </div>
      </section>
    </div>
  )
}
