import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  Fragment
} from "react";
import { CogIcon, FilterIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Filter from "../../Common/filter";
import ConfirmDownload from "../../Common/downloadConfirmation";
import { Charts } from "../../DataVisualisation/Charts";
import genes from "../../Common/gene.json";
import { Context } from "../../../wrapper";
import { useHistory, Link } from "react-router-dom";
import {
  getBreastKeys,
  getUserDataProjectsTableData,
  clearDataVisualizationState,
  samplesCount,
  getUserDefinedFilter
} from "../../../actions/api_actions";

import { Popover, Transition } from "@headlessui/react"
import { FormattedMessage } from "react-intl";
import GeneSet from "../Components/MainComponents/GeneSet";
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


  const history = useHistory();

  const project_id_status = useSelector(
    (data) => data.homeReducer.project_id_status
  );
  const userProjectDetails = useSelector(
    (data) => data.dataVisualizationReducer.userProjectsDataTable
  );
  let { tab, project_id } = useParams();



  const [chartName, setChartName] = useState(tab === 'home' ? undefined : tab);
  const [tabName, setTabName] = useState(tab === 'home' ? undefined : tab)
  const [screenCapture, setScreenCapture] = useState(false);
  const [availableTabsForProject, setavailableTabsForProject] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [filterApplied, setfilterApplied] = useState(false);
  const [screenCaptureConfirmation, setScreenCaptureConfirmation] =
    useState(false);
  const setToFalseAfterScreenCapture = (param = false) => {
    if (param === false) {
      setScreenCapture(false);
    } else {
      setScreenCapture(true);
    }
  };

  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  }, [context]);

  useEffect(() => {
    if (koreanlanguage) {
      setUserDefinedList("사용자 정의")
      setEnterGenes("유전자 입력")
    }
    else {
      setUserDefinedList("User-Defined List")
      setEnterGenes("Enter Genes")
    }
  }, [koreanlanguage, Englishlanguage])

  const setScreenCaptureFunction = (capture) => {
    setScreenCaptureConfirmation(true);
  };

  const submitFilter = (e) => {
    setBoolChartState(false);
    setChartName(tabName);
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx,
    }));

  };

  const callback = useCallback(({ filters, filterKeyandValues, value, genes }) => {

    if (filters && filterKeyandValues) {
      setState((prevState) => ({
        ...prevState,
        'filterKeyandValues': filterKeyandValues
      }));
      setfilterApplied(true);
    }
    else if (value && genes) {
      setState((prevState) => ({
        ...prevState,
        genes: genes,
        type: value,
      }));
    }

  }, []);


  useEffect(() => {
    if (filterApplied) {
      setfilterApplied(false);
      submitFilter();
    }
  }, [filterApplied]);


  useEffect(() => {
    if (project_id !== undefined) {
      let projectAvailableSteps = undefined;
      // if (userProjectDetails && 'key' in userProjectDetails && userProjectDetails.key === 'NotFound') {
      //   console.log('--------');
      //   history.push('/login')
      // }
      if (userProjectDetails && 'available_steps' in userProjectDetails) {
        projectAvailableSteps = userProjectDetails.available_steps;
      }

      let tabList = [];
      if (projectAvailableSteps === undefined) {
        dispatch(getUserDataProjectsTableData(project_id));
      } else {
        Object.keys(projectAvailableSteps).forEach((stepName) => {
          if (stepName === "lollypop") {
            tabList.push("lollipop");
          } else if (stepName === "oncoprint") {
            tabList.push("onco");
          } else if (stepName === "igv") {
            tabList.push("CNV");
          } else if (stepName === "scatter") {
            tabList.push("correlation");
          } else {
            tabList.push(stepName);
          }
        });
      }
      setavailableTabsForProject(tabList);
    }

  }, [project_id, userProjectDetails, project_id_status]);

  useEffect(() => {
    setTabName(tab === 'home' ? undefined : tab)
    setChartName(tabName)
    if (chartName) {
      submitFilter();
    }
    let t = ["volcano", "survival", "fusion"];
    if (t.indexOf(tabName) !== -1) {
      setToggle(false);
    }
    else {
      setToggle(true);
    }
  }, [tab, tabName, chartName]);

  useEffect(() => {
    dispatch(getUserDefinedFilter({
      "project_id": project_id
    }));
  }, [project_id])

  useEffect(() => {
    // let w = elementRef.current.getBoundingClientRect().width;
    // setWidth(w);
    // setBoolChartState(false);
    if (project_id !== undefined) {
      setState((prevState) => ({
        ...prevState,
        project_id: project_id,
      }));
    }
    let l = [];
    let gridData = []
    if (project_id !== undefined) {
      l = availableTabsForProject;
    } else {
      l = [
        "circos",
        "onco",
        "lollipop",
        "volcano",
        "heatmap",
        "survival",
        "correlation",
        "cnv",
        "box",
        "fusion",
      ];
    }

    l.forEach((element) => {

      let classes =
        toggle ? "lg:px-4 sm:px-2 xs:px-2 py-2 font-semibold rounded-t opacity-50 BorderDiv" : "lg:px-4 sm:px-2 xs:px-2 py-2 font-semibold rounded-t opacity-50 ";

      if (chartName === element) {
        classes = classes + " border-blue-400 border-b-4 -mb-px opacity-100";
      }
      let name = " Plot";
      if (element === "heatmap") {
        name = "";
      } else if (element === "cnv") {
        element = "CNV";
      } else if (element === "onco") {
        element = "OncoPrint";
        name = "";
      }

      let gridobj = { title: element, image: require(`../../../assets/images/Visualizations/${element}.png`).default, link: `/visualise-multidata/${element}/${project_id}` }
      gridData.push(gridobj)

    });
    setGridData(gridData)
  }, [availableTabsForProject, chartName]);

  useEffect(() => {
    if (project_id !== undefined) {
      if (state.genes.length > 0) {
        dispatch(samplesCount("POST", { project_id: project_id }));
        dispatch(getBreastKeys(state));
      }
    } else {
      if (state.genes.length > 0) {
        dispatch(samplesCount("POST", {}));
        dispatch(getBreastKeys(state));
      }
    }
  }, [tabName, state]);




  useEffect(() => {
    if (BrstKeys) {
      let tmp = [];
      for (const [key, value] of Object.entries(BrstKeys)) {
        tmp.push(
          <option key={key} value={key + "_" + value}>
            {value}
          </option>
        );
      }
    }
  }, [BrstKeys]);

  useEffect(() => {
    if (chart) {
      setBoolChartState(true);
    }
  }, [chart]);

  useEffect(() => {
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx,
    }));
  }, [screenCapture]);

  const LoadChart = (w, type) => {
    switch (type) {
      case "circos":
        return Charts.circos(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture,
          toggle,
          state
        );
      case "OncoPrint":
        return Charts.onco(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "lollipop":
        return Charts.lollipop(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "volcano":
        return Charts.volcano(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "heatmap":
        return Charts.heatmap(
          w,
          state,
          screenCapture,
          BrstKeys,
          setToFalseAfterScreenCapture
        );
      case "survival":
        return Charts.survival(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "correlation":
        return Charts.scatter(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "CNV":
        return Charts.igv(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "fusion":
        return Charts.fusion(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "box":
        return Charts.box(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      default:
        return false;
    }
  };

  const screen_call = useCallback((bool) => {
    setToggle(false);
  }, []);


  useEffect(() => {
    return () => {
      dispatch(clearDataVisualizationState());
    };
  }, []);

  const breadCrumbs = {
    '/visualise-multidata/': [
      { id: 'FindID', defaultMessage: 'Home', to: '/' },
      { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualisation', to: '/visualise-multidata/home/' },
    ],

  };

  return (
    <div>
      <HeaderComponent
        title="회원가입"
        routeName="/visualise-multidata/"
        breadCrumbs={breadCrumbs['/visualise-multidata/']}
        type="single"

      />

      {/* Filter and Gene Filter */}
      <div className="flex">
        <div className="flex items-center justify-center space-x-4 md:justify-start md:space-x-0 md:mr-4 mx-auto gap-40">
          {/* {toggle && (
            <Popover className="relative" style={{ margin: 'auto' }}>
              {({ open }) => {
                return (
                  <>
                    <div>
                      <Popover.Button>
                        <div className="flex bg-white bg-white text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md btn_input_height  mb-3 lg:w-full   font-bold py-2 px-4 border  rounded xs:h-14 lg:h-16">
                          <div className="flex-1 flex items-center justify-center px-4">Clinical info. Re-filtering</div>
                          <div className="w-20 h-full bg-gray-200 flex items-center justify-center">
                            <CogIcon className="h-8 w-8" />
                          </div>
                        </div>
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-0 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                          <div className="hidden md:block lg:block xl:block 2xl:block  xs:z-10 xs:opacity-95 bg-white border border-gray-200 transition duration-150 ease-in-out overflow-y-scroll" style={{ height: "60vh" }} >
                            <Filter
                              parentCallback={callback}
                              filterState={state["filter"]}
                              set_screen={screen_call}
                              project_id={project_id}
                            />
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </div>
                  </>
                )
              }}
            </Popover>
          )} */}
         <Popover className="relative" style={{ margin: 'auto' }}>
            {({ open }) => {
              return (
                <>
                  {/* <div>
                    <Popover.Button>
                      <div className="flex bg-white text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md btn_input_height  mb-3 lg:w-full   font-bold py-2 px-4 border  rounded xs:h-14 lg:h-16">

                        <div className="flex-1 flex items-center justify-center px-4">Gene set Re-filtering</div>
                        <div className="w-20 h-full bg-gray-200 flex items-center justify-center">
                          <FilterIcon className="h-8 w-8" />
                        </div>
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-0 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                        <GeneSet
                          parentCallback={callback}
                          filterState={state}
                        />

                      </Popover.Panel>
                    </Transition>
                  </div> */}

                <div>
                  <Popover.Button>
                    <div className="gene-set-button">
                      <div className="flex-1">Gene set Re-filtering</div>
                      <div className="w-20">
                        <FilterIcon className="filter-icon" />
                      </div>
                    </div>
                  </Popover.Button> 
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="popover-panel">
                      <GeneSet parentCallback={callback} filterState={state} />
                    </Popover.Panel>
                  </Transition>
                </div>
                </>
              )
            }}
          </Popover> 
        </div>

   
        
        <div className="ml-auto md:ml-auto">
          <div className="flex justify-end p-5 ">
          <div className="popup">
          sdsdsd
         </div>
            <div className=" inline-flex  ">
              {screenCapture === false && (
                <button
                  className="text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md btn_input_height bg-main-blue hover:bg-main-blue mb-3 lg:w-full text-white  font-bold py-2 px-10 border border-blue-700 rounded xs:h-14 lg:h-16"
                  onClick={() => setScreenCaptureFunction(true)}
                >
                  <FormattedMessage
                    id="Capture_screen"
                    defaultMessage="capture screenshot"
                  />
                </button>
              )}
              {screenCapture === true && (
                <button
                  className="text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md btn_input_height bg-main-blue hover:bg-main-blue mb-3 lg:w-full text-white  font-bold py-2 px-4 border border-blue-700 rounded xs:h-14 lg:h-16"
                  disabled={true}
                >
                  Loading...
                </button>
              )}
              {screenCapture === true && (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-auto">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-56"
                        style={{ width: "400px" }}
                      >
                        <div
                          className="relative p-6 flex-auto my-auto"
                          style={{ height: "100%" }}
                        >
                          <p className="my-4 text-slate-500 text-lg leading-relaxed py-12">
                            Image is downloading.....
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              )}
              {screenCaptureConfirmation && (
                <ConfirmDownload
                  screenCaptureFunction={setToFalseAfterScreenCapture}
                  hideModal={() =>
                    setScreenCaptureConfirmation(false)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* List of Tabs and Chart */}
      {/* style={{height:"60vh"}} */}
      {/* <div className="gap-6" >

            <section>
              {
                gridData && !tabName && <div className={containerStyles}>
                  <div className={`${gridStyles} grid-rows-${numRows}`} style={{ gridTemplateRows }}>
                    {gridData.map((item, index) => (
                      <div key={index} className={cardStyles}>
                        <div className="flex justify-between">
                          <h6 className={titleStyles}>{item.title}</h6>
                          <div className="pt-2 pr-2">
                            <div className={buttonStyles}>
                              <Link to={item.link}>Run Analysis</Link>
                            </div>
                          </div>
                        </div>
                        <div>
                          <img src={item.image} alt="img" className={imageStyles} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </section>


            <section>
              <div
                id="tab-contents"
                className="block text-center"
                ref={elementRef}>
                {tabName && tabName !== 'home' && boolChartState && <div>{chart["viz"]}</div>}
                {tabName && tabName !== 'home' && !boolChartState && (
                  <div className="p-1 text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md">Please select Genes</div>
                )}
              </div>
            </section>


        </div> */}

      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font ><FormattedMessage id="MultiData" defaultMessage="MultiData" /> </font>
              <span className="colorSecondary">
                <font ><FormattedMessage id="Visualization" defaultMessage="Visualization" /></font>
              </span>
            </font>
          </h3>
        </div>
        <div className="section ptn">
          <div className="auto">
            {
              gridData && !tabName &&
              <div className='dataList'>
                <ul >
                  {gridData.map((item, index) => (

                    <li key={index} >
                      <div className="labelBox">
                        <div className="labels01">
                          <h3 style={{ textTransform: 'capitalize' }}>
                            {item.title}
                          </h3>
                        </div>
                        <div className="labels02" style={{ columnGap: "10px" }}>
                          <Link to={item.link}>
                            <span className="label01">
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

          <section>
            <div id="tab-contents" style={{display:"block",textAlign:"center"}} ref={elementRef}>
              {tabName && tabName !== 'home' && boolChartState && (
                <div className="MultiDataVizChartViz">{chart["viz"]}</div>
              )}
              {tabName && tabName !== 'home' && !boolChartState && (
                <div className="MultiDataVizErrorMessage">Please select Genes</div>
              )}
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
