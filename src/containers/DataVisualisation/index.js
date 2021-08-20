import React,{useState,useEffect,useRef,useCallback,Fragment   } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  UserCircleIcon,
  BeakerIcon,
  SearchIcon,
  PlusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import Filter from '../Common/filter'
import { Charts } from "./Charts/";
import genes from '../Common/gene.json'
import { getBreastKeys,getCircosInformation } from '../../actions/api_actions'
import {
  Link
} from "react-router-dom";

export default function DataVisualization() {
  const elementRef = useRef(null);
  const [state,setState] = useState({"genes":[],'filter':'','type':''})
  const [boolChartState,setBoolChartState] = useState(true)
  const [filterState,setFilterState] = useState({})
  const [leftFilter,setLeftFilter] = useState(false)
  const [chart,setCharts] = useState({"viz":[]})
  const [width,setWidth] = useState(0)
  const dispatch = useDispatch()
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  let { tab } = useParams();
  const [chartName,setChartName] = useState(tab)

  const callback = useCallback((filters) => {

    let type = document.getElementById('gene_type').value
    let g = genes[type].data
    setState((prevState) => ({...prevState,
      'filter': filters,
      'genes': g,
      'type': type
    }))

    setLeftFilter(true)
    // setCount(count);
  }, []);

  useEffect(() => {
    // console.log(state);
    submitFilter()
  },[state])

  const selectGene = (event) => {
    let val_ = event.target.value;
    let g = genes[val_].data;
    document.getElementById('genes').value = g.join(' ')
    setState((prevState)=>({
      ...prevState,
      'genes':g,
      'type':val_
    }))
  }

  const toggleTab = (event)=>{
    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("a");
    tabTogglers.forEach(function(toggler) {
      toggler.addEventListener("click", function(e) {
        let tabName = this.getAttribute("href");
        for (var i = 0; i < tabTogglers.length; i++) {
          tabTogglers[i].parentElement.classList.remove("border-blue-400", "border-b",  "-mb-px", "opacity-100");
        }
        e.target.parentElement.classList.add("border-blue-400", "border-b-4", "-mb-px", "opacity-100");
      })
    })

  }

  useEffect(()=>{
    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("li");
    tabTogglers.forEach(function(toggler) {
      let href = toggler.children[0].href
      href = href.split('/')
      toggler.classList.remove("border-blue-400", "border-b",  "-mb-px", "opacity-100");
      if (href.includes(tab)){
        toggler.classList.add("border-blue-400", "border-b-4", "-mb-px", "opacity-100");
      }
    })
    submitFilter()
  },[tab])

  useEffect(()=>{
    let w = elementRef.current.getBoundingClientRect().width
    setWidth(w);
    dispatch(getBreastKeys())
    setBoolChartState(false)
  },[])

  useEffect(()=>{
    if(BrstKeys){
      let tmp = []
      for (const [key, value] of Object.entries(BrstKeys)) {
        tmp.push(<option key={key} value={key+"_"+value}>{value}</option>)
      }
      setFilterState(tmp)
    }
  },[BrstKeys])


  useEffect(()=>{
    if(chart){
      setBoolChartState(true)
    }
  },[chart])


  const submitFilter = (e) => {
    setBoolChartState(false)
    setChartName(tab)
    let chartx = LoadChart(width,tab)
    setCharts((prevState)=>({
      ...prevState,
      'viz':chartx,
    }))
    // setLeftFilter(false)/
  }

  const LoadChart = (w,type)=>{
    console.log('----')
    switch (type) {
      case "circos":
        return Charts.circos(w, state, leftFilter)
      case "onco":
        return Charts.onco(w, state, leftFilter)
      case "lollipop":
        return Charts.lollipop(w, state, leftFilter)
      case "volcano":
        return Charts.volcano(w, state, leftFilter)
      case "heatmap":
        return Charts.heatmap(w, state, leftFilter)
      default:
        return false
    }
  }

  return (
    <div className="header">
      <div className="mx-auto border-t rounded overflow-hidden ">
        <div id="main_div">
          <div className="grid grid-cols-4">
            <div className="bg-white border border-gray-200">
              <Filter parentCallback={callback} genes={state} />
            </div>
            <div className="col-start-2 col-span-3 overflow-auto ">
              <div className="grid grid-cols-3 gap-1 p-5 bg-white">
                <h3>Gene Selection</h3>
                <div className='col-span-3 grid grid-cols-7 gap-6'>
                  <div className="relative w-full col-span-3">
                    <select id='gene_type' value={state['type']} onChange={e=>selectGene(e)}className='w-full p-3 border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 '>
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
                  <div className="col-span-3">
                    <input type="text" id='genes' className='w-full p-3 border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 h-full' name='genes'/>
                  </div>
                  <div className="">
                    <button className="bg-main-blue hover:bg-main-blue mb-3 w-full h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded" onClick={e=>submitFilter(e)}>Filter</button>
                  </div>
                </div>

              </div>
              <div className='col-span-3 gap-6'>
                <section>
                  <nav className=" px-8 pt-2 shadow-md">
                    <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " onClick={e=>toggleTab(e)}>
                      <li className="px-4 py-2 font-semibold rounded-t opacity-50 opacity-100 border-b-4  border-blue-400">
                        <Link to="/visualise/circos/">Ciros Plot</Link>
                      </li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 ">
                        <Link to="/visualise/onco">Oncoprint Plot</Link>
                      </li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 ">
                        <Link to="/visualise/lollipop">Lollipop Plot</Link>
                      </li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 ">
                        <Link to="/visualise/volcano">Volcano Plot</Link>
                      </li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 ">
                        <Link to="/visualise/heatmap">Heatmap</Link>
                      </li>
                      <li className="px-4 py-2 font-semibold  rounded-t opacity-50 ">
                        <Link to="/visualise/survival">Survival Plot</Link>
                      </li>
                    </ul>
                  </nav>
                </section>
                <section >
                   <div id="tab-contents" className='block text-center' ref={elementRef}>
                    {boolChartState &&
                      <div>{chart['viz']}</div>
                    }
                    {!boolChartState &&
                      <div>Loading.......</div>
                    }
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
