import React,{useState,useEffect,useRef,useCallback} from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { getCircosUserData, getOncoUserData, getVolcanoUserData } from '../../../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";
import Filter from '../../../Common/filter';
import CircosCmp from '../../../Common/Circos';
import OncoCmp from '../../../Common/Onco'
import LollipopCmp from '../../../Common/Lollipop'
import HeatmapCmp from '../../../Common/Heatmap'
import VolcanoCmp from '../../../Common/Volcano'
import SurvivalCmp from '../../../Common/Survival'

// import CircosCmp from '../../../Common/Circos';
import inputJson from '../../../Common/data';

export default function Visualization() {
  const [hideupload,setHideUpload] = useState(true)
  const circosJson = useSelector((data) => data.dataVisualizationReducer.circosSummary);
  const oncoJson = useSelector((data) => data.dataVisualizationReducer.oncoSummary);
  const volcanoJson = useSelector((data) => data.dataVisualizationReducer.volcanoSummary);

  const [width,setWidth] = useState(0)
  const [select,setSelect] = useState()
  // const [filterForm, setfilterForm] = useState({})
  const [selectedGenes,setSelectGenes] = useState()
  const dispatch = useDispatch()
  const [showVisualization,setShowviualization] = useState(false)
  const elementRef = useRef(null);

  // const callback = (count) => {
  //   console.log(count);
  //   // setCount(count);
  // }, []);
  let filters = ''
  const callback = (filters_) => {
    // setfilterForm(JSON.stringify(filters_))
    filters = JSON.stringify(filters_)
    onFilter()
  }

  const selectGene = (e) =>{
    setSelect(e.target.value)
    setSelectGenes((inputJson.gene_selection[e.target.value]['data']).join())
  }

  useEffect(()=>{
    setWidth(elementRef.current.getBoundingClientRect().width);
    dispatch(getCircosUserData({}))
    dispatch(getOncoUserData({}))
    dispatch(getVolcanoUserData({}))
  },[])

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

  const onFilter = () =>{
    let selectedGenesList = selectedGenes;
    let data = {}

    if(selectedGenesList){
      data['selected_genes'] = selectedGenesList
    }
    // console.log("filters--->",filters)
    if(filters){
      data['filter'] = filters
    }
    dispatch(getCircosUserData(data))
  }

  return (
    <div className="header">
      <div className="mx-auto rounded overflow-hidden ">
        <div id="main_div">
          <div className="grid grid-cols-4">
            <div className="bg-white border border-gray-200">
              <Filter parentCallback={callback}/>
            </div>
            <div className="col-start-2 col-span-3 overflow-auto ">
              <div className="grid grid-cols-3 gap-1 p-5 bg-white">
                <h3>Gene Selection</h3>
                <div className='col-span-3 grid grid-cols-2 gap-6'>
                  <div className="relative w-full">
                    <select value={select} onChange={e=>selectGene(e)}className='w-full p-3 border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 '>
                      <option value="user-defined">User-Defined List</option>
                      <option value="major-genes">Cancer major genes (28 genes)</option>
                      <option value="brst-major-genes">Breast cancer major genes (20 genes)</option>
                      <option value="hrd-genes">HRD genes (15 genes)</option>
                      <option value="hrd-asso-brst">HRD association breast (26 genes)</option>
                      <option value="tcell-exha-genes">Tcell exhausted genes (8 genes)</option>
                      <option value="cdc-brst-genes">CDC Phenopedia breast cancer associated genes (18 genes)</option>
                      <option value="cell-cycle-ctrl">General: Cell Cycle Control (34 genes)</option>
                      <option value="p53-signal">General: p53 signaling (6 genes)</option>
                      <option value="notch-signal">General: Notch signaling (55 genes)</option>
                      <option value="dna-damage-resp">General: DNA Damage Response (12 genes)</option>
                      <option value="other-grow-prol-signal">General: Other growth/proliferation signaling (11 genes)</option>
                      <option value="survival-cell-signal">General: Survival/cell death regulation signaling (23 genes)</option>
                      <option value="telo-mere-main">General: Telomere maintenance  (2 genes)</option>
                      <option value="rtk-signal-family">General: RTK signaling family (16 genes)</option>
                      <option value="pi3k-akt-mtor-signal">General: PI3K-AKT-mTOR signaling (17 genes)</option>
                      <option value="ras-raf-signal">General: Ras-Raf-MEK-Erk/JNK signaling (26 genes)</option>
                      <option value="regu-ribo-cell">General: Regulation of ribosomal protein synthesis and cell growth  (9 genes)</option>
                      <option value="angi-gene">General: Angiogenesis (6 genes)</option>
                      <option value="fola-trans">General: Folate transport (5 genes)</option>
                      <option value="inva-meta">General: Invasion and metastasis (27 genes)</option>
                      <option value="tgf-beta-path">General: TGF-β Pathway (43 genes)</option>
                    </select>
                  </div>
                  <div className="">
                    <input type="text" className='w-full p-3 border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 h-full' onChange={(e)=>setSelectGenes(e.target.value)} value={selectedGenes} name='genes'/>
                  </div>
                  <div>
                    <button className="bg-blue-900 float-right p-3 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={onFilter}
                    >
                     Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-span-3 gap-6'>
                <section>
                  <nav className=" px-8 pt-2 shadow-md">
                    <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " onClick={toggleTab}>
                      <li className="px-4 py-2 font-semibold rounded-t opacity-50">
                        <a id="default-tab" href="#first" >Circos Plot</a>
                      </li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#second">OncoPrint</a></li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#third">Lollipop Plot</a></li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#fourth">Volcano Plot</a></li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 "><a href="#five">Heatmap</a></li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 opacity-100 border-b-4  border-blue-400"><a href="#six">Survival Plot</a></li>
                    </ul>
                  </nav>
                </section>
                <section >
                  <div id="tab-contents" className='block text-center' ref={elementRef}>
                    <div id="first" className="hidden">
                      {circosJson && <CircosCmp width={width} data={circosJson}/>}
                    </div>
                    <div id="second" className="hidden">
                      {oncoJson && <OncoCmp width={width} data = {oncoJson} />}
                    </div>
                    <div id="third" className="hidden">
                      <LollipopCmp/>
                    </div>
                    <div id="fourth" className="hidden">
                      {volcanoJson && <VolcanoCmp width={width} data={volcanoJson}/>}
                    </div>
                    <div id="five" className="hidden">
                      <HeatmapCmp/>
                    </div>
                    <div id="six" className="inline-block">
                      <SurvivalCmp/>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



// {loader['child_'+id]?<Loader/>:""}
// {loader['child_1']?<Loader/>:""}
