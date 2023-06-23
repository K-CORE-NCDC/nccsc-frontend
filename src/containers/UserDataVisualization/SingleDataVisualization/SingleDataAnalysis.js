import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext,
    Fragment
  } from "react";
  import {FilterIcon} from "@heroicons/react/outline";
  import { useSelector, useDispatch } from "react-redux";
  import { useParams } from "react-router-dom";
  import ConfirmDownload from "../../Common/downloadConfirmation";
  import { Charts } from "../../DataVisualisation/Charts";
  import genes from "../../Common/gene.json";
  import { Context } from "../../../wrapper";
  import { useHistory,Link } from "react-router-dom";
  import {
    getBreastKeys,
    getUserDataProjectsTableData,
    clearDataVisualizationState,
    samplesCount,
    getUserDefinedFilter
  } from "../../../actions/api_actions";
  
  import { Popover, Transition } from "@headlessui/react"
  import { FormattedMessage } from "react-intl";
  import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
  
  
  export default function DataVisualization() {
    const context = useContext(Context);
    const [koreanlanguage, setKoreanlanguage] = useState(false);
    const [Englishlanguage, setEnglishlanguage] = useState(true);
    const [userDefinedList, setUserDefinedList] = useState("User-Defined List")
    const [enterGenes, setEnterGenes] = useState("Enter Genes")

    const elementRef = useRef(null);
    const dispatch = useDispatch();
  
    const [width, setWidth] = useState(0);
    const [chart, setCharts] = useState({ viz: [] });
    const [boolChartState, setBoolChartState] = useState(true);
    const [state, setState] = useState({ genes: [], filter: {}, type: "" });
    const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  
    const [gridData, setGridData] = useState([])
    const numRows = Math.ceil(gridData.length / 3);
    const gridTemplateRows = `repeat(${numRows}, 1fr)`;
  
    const containerStyles = "flex justify-center items-center my-8 bg-gray-100";
    const gridStyles = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 h-full w-full mx-4 md:mx-10";
    const cardStyles = "bg-white rounded-lg shadow-lg overflow-hidden";
    const imageStyles = "object-cover object-center w-full h-full mt-8";
    const titleStyles = "text-lg font-semibold p-4 capitalize";
    const buttonStyles = "bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full capitalize";
  
  
   
    let { tab, project_id } = useParams();
    const [chartName, setChartName] = useState(tab === 'home' ? undefined : tab);
    const [tabName, setTabName] = useState(tab === 'home' ? undefined : tab)
    const [toggle, setToggle] = useState(true);
  
  

 
  
   
  

  
    

  
  
    useEffect(() => {
      setTabName(tab==='home'?undefined:tab)
      setChartName(tabName)
      
    }, [tab,tabName, chartName]);
  
    useEffect(() => {
      // let w = elementRef.current.getBoundingClientRect().width;
      // setWidth(w);
      setBoolChartState(false);
      if (project_id !== undefined) {
        setState((prevState) => ({
          ...prevState,
          project_id: project_id,
        }));
      }
      let l = [
        "circos",
        "lollipop",
        "cnv",
        "heatmap",
        "box",
      ];
      let gridData = []
 
      l.forEach((element) => {
        
        let name = " Plot";
        if (element === "heatmap") {
          name = "";
        } else if (element === "cnv") {
          element = "CNV";
        } else if (element === "onco") {
          name = "";
          element = "OncoPrint";
        }
  
        let gridobj = {title:element,image:require(`../../../assets/images/Visualizations/${element}.png`).default,link: `/singledata-upload/${element}/`}
        gridData.push(gridobj)
       
      });
      setGridData(gridData)
    }, []);
    
    gridData.map((item, index)=>{
      console.log(item,index)
    })
  
    return (
      <div>
        <HeaderComponent
          title="회원가입"
          breadCrumbs={{
            key1: 'Home',
            key2: 'Visualise My Data',
            key3: 'Single Data Visulisation'
          }}
          type="single"
        />
        <article id="subContents" className="subContents">
          <div className="contentsTitle">
            <h3>
              <font>
                <font >Single Data </font>
                <span className="colorSecondary">
                  <font >Visualization</font>
                </span>
              </font>
            </h3>
          </div>
          <div className="section ptn">
            <div className="auto">
              {
                gridData && !tabName  && 
                <div className='dataList singleDataViz'>
                  <ul >
                    {gridData.map((item, index) => (
                      
                      <li key={index} >
                        <div className="labelBox">
                          <div className="labels01">
                            <h3 style={{textTransform:'capitalize'}}>
                              {item.title}
                            </h3>
                          </div>
                          <div className="labels02" style={{columnGap:"10px"}}>
                            <Link  to={item.link}>
                              <span class="label01">
                                <font>
                                  <font>Download</font>
                                </font>
                              </span>
                            </Link>
                            <Link  to={item.link}>
                              <span class="label01">
                                <font>
                                  <font>Run Analysis</font>
                                </font>
                              </span>
                            </Link>
                          </div>
                          
                        </div>
                        <div>
                          <img src={item.image} alt="img" className={imageStyles} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            </div>
          </div>
        </article>
      </div>
      
    );
  }
  