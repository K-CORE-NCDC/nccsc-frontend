import React,{useState,useEffect,useRef} from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { getHeadersFiles } from '../../../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";
import Circos from '../Circos';


// import '../../index.css'

export default function TabsComponent() {
  const elementRef = useRef(null);
  const dispatch = useDispatch()
  const response = useSelector((data) => data.homeReducer.fileUploadData);
  const [responseState,setResponseState] = useState("")


  useEffect(()=>{
    dispatch(getHeadersFiles())
  },[])

  useEffect(()=>{
    if(response){
      setResponseState(responseState)
    }
  },[response, responseState])

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

  return (
    <div className='col-span-3 gap-6'>
      <section>
        <nav className=" px-8 pt-2 shadow-md">
          <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " onClick={toggleTab}>
            <li className="px-4 py-2 font-semibold rounded-t opacity-50  opacity-100 border-b-4  border-blue-400">
              <a id="default-tab" href="#first" >Circos Plot</a>
            </li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50"><a href="#second">OncoPrint</a></li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#third">Lollipop Plot</a></li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#fourth">Volcano Plot</a></li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#five">Heatmap</a></li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#six">Survival Plot</a></li>
          </ul>
        </nav>
      </section>
      <section >
        <div id="tab-contents" className='block' ref={elementRef}>
          <div id="first" className="w-full">
            {response?<Circos child_tab_data={response}/>:""}
          </div>
          <div id="second" className="hidden">
            'bbb'
          </div>
          <div id="third" className="hidden">
          'ccc'
          </div>
          <div id="fourth" className="hidden">
            'ddd'
          </div>
          <div id="five" className="hidden">
            'eeee'
          </div>
          <div id="six" className="hidden">
            'asd'
          </div>
        </div>
      </section>
    </div>
  )
}

// ______
// {circosJson && <CircosCmp width={width} data={circosJson}/> }
// <OncoCmp/>
// <LollipopCmp/>
// <VolcanoCmp/>
// <HeatmapCmp/>
// ________

// <TabsComponent/>

// <FileUpload/>


// {response?<Table data_={fileData}/>:""}

// {loader['child_'+id]?<Loader/>:""}
// {loader['child_1']?<Loader/>:""}
