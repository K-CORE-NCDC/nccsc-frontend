import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import { MenuIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Filter from "../Common/filter";
import ConfirmDownload from "../Common/downloadConfirmation";
import { Charts } from "./Charts/";
import genes from "../Common/gene.json";
import {
  getBreastKeys,
  getUserDataProjectsTableData,
  clearDataVisualizationState,
} from "../../actions/api_actions";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { element } from "prop-types";

export default function DataVisualization() {

  const elementRef = useRef(null);

  const [state, setState] = useState({ genes: [], filter: "", type: "" });

  // const geneFilterData = useSelector(state => state.dataVisualizationReducer.geneFilterData)
  // useEffect(()=>{
  //    console.log("gene data",geneFilterData);
  // })

  // const [advanceFilters, setAdvanceFilters] = useState({})
  const [boolChartState, setBoolChartState] = useState(true);
  const [filterState, setFilterState] = useState({});
  const [chart, setCharts] = useState({ viz: [] });
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const userProjectDetails = useSelector(
    (data) => data.dataVisualizationReducer.userProjectsDataTable
  );
  let { tab, project_id } = useParams();
  const [chartName, setChartName] = useState(tab);
  const [menuItems, setMenuItems] = useState([]);
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
  

  const setScreenCaptureFunction = (capture) => {
    // setScreenCapture(capture)
    setScreenCaptureConfirmation(true);
  };
  const submitFilter = (e) => {
    console.log("while submiting the filter");
    // e.preventDefault()
    setBoolChartState(false);
    setChartName(tab);
    let chartx = LoadChart(width, tab);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx,
    }));
  };

  const callback = useCallback((filters) => {
    console.log("callback the filter");
    let type = document.getElementById("gene_type").value;
    let g = genes[type].data;
    document.getElementById("genes").value = g.join(" ");
    setState((prevState) => ({
      ...prevState,
      filter: filters,
      genes: g,
      type: type,
    }));
    setfilterApplied(true);
  }, []);

  useEffect(() => {
    console.log("Filter Applied");
    if (filterApplied) {
      setfilterApplied(false);
      submitFilter();
    }
  }, [filterApplied]);

  const selectGene = (event) => {
    let val_ = event.target.value;
    let g = genes[val_].data;
    g = g.sort();
    document.getElementById("genes").value = g.join(" ");
    setState((prevState) => ({
      ...prevState,
      genes: g,
      type: val_,
    }));
  };

  useEffect(() => {
    if (project_id !== undefined) {
      let projectAvailableSteps = undefined;
      if (userProjectDetails) {
        projectAvailableSteps = userProjectDetails.available_steps;
      }

      let tabList = [];
      if (projectAvailableSteps === undefined) {
        dispatch(getUserDataProjectsTableData(project_id));
      } else {
        Object.keys(projectAvailableSteps).forEach((stepName) => {
          if (projectAvailableSteps[stepName].length > 0) {
            // console.log(projectAvailableSteps, stepName, );
            if (stepName === "fusion") {
              return;
            }
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
          }
        });
      }
      setavailableTabsForProject(tabList);
    }
  }, [project_id, userProjectDetails]);




  const toggleTab = (event) => {
    let t = ["Volcano Plot", "Survival Plot", "Fusion Plot"]
    if (t.indexOf(event.target.innerText) !== -1) {
      setToggle(false)
    } else {
      setToggle(true)
    }

    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("a");
    tabTogglers.forEach(function (toggler) {
      toggler.addEventListener("click", function (e) {
        for (var i = 0; i < tabTogglers.length; i++) {
          tabTogglers[i].parentElement.classList.remove(
            "border-transparent",
            "border-b",
            "-mb-px",
            "opacity-100"
          );
        }
        e.target.parentElement.classList.add(
          "border-transparent",
          "border-b-4",
          "-mb-px",
          "opacity-100"
        );
      });
    });


  };

  useEffect(() => {
    if(chartName){
      let tabsContainer = document.querySelector("#tabs");
      let tabTogglers = tabsContainer.querySelectorAll("li");
      tabTogglers.forEach(function (toggler) {
        let href = toggler.children[0].href;
        href = href.split("/");
        // console.log(href,tab)
        toggler.classList.remove(
          "border-blue-400",
          "border-b",
          "-mb-px",
          "opacity-100"
        );
        if (href.includes(tab)) {
          toggler.classList.add(
            "border-blue-400",
            "border-b-4",
            "-mb-px",
            "opacity-100"
          );
        }
      });
      submitFilter();
    }
  }, [tab,chartName]);

  useEffect(() => {
    let w = elementRef.current.getBoundingClientRect().width;
    setWidth(w);
    setBoolChartState(false);
    if (project_id !== undefined) {
      setState((prevState) => ({
        ...prevState,
        project_id: project_id,
      }));
    }
    // let l = ['circos', 'onco', 'lollipop', 'volcano', 'heatmap', 'survival']
    let l = [];
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
    let tmp = [];
    
    l.forEach((element) => {
      let classes =
        "lg:px-4 sm:px-2 xs:px-2 py-2 xs:text-sm sm:text-xl lg:text-2xl font-semibold rounded-t opacity-50 ";
      
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

      if (project_id !== undefined) {
        tmp.push(
          <li key={element} className={classes}>
            <Link
              className="capitalize"
              to={`/visualise/${element}/${project_id}`}
            >
              {element + name}
            </Link>
          </li>
        );
      } else {
        tmp.push(
          <li key={element} className={classes}>
            <Link className="capitalize" to={`/visualise/${element}/`}>
              {element + name}
            </Link>
          </li>
        );
      }
    });
    let t = ["volcano","survival","fusion"]
    if(t.indexOf(chartName)!==-1){
      setToggle(false)
    }
    setMenuItems(tmp);
  }, [availableTabsForProject,chartName]);

    useEffect(() => {
    if (project_id !== undefined) {
      dispatch(getBreastKeys({ project_id: project_id }));
    } else {
      dispatch(getBreastKeys({}));
    }
  }, []);

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
      setFilterState(tmp);
    }
  }, [BrstKeys]);

  useEffect(() => {
    if (chart) {
      setBoolChartState(true);
    }
  }, [chart]);

  useEffect(() => {
    let chartx = LoadChart(width, tab);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx,
    }));
  }, [screenCapture]);

  // useEffect(() => {
  //   if(state.filter !== advanceFilters){
  //     setAdvanceFilters(state.filter)
  //   }
  // }, [state])

  const LoadChart = (w, type) => {
    switch (type) {
      case "circos":
        return Charts.circos(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture,
          toggle,
          // state
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

  const leftFilterClose = (e) => {
    let t = ["volcano", "survival", "fusion"]
    if (t.indexOf(tab) !== -1) {
      return false
    } else {
      setToggle(!toggle)
    }
  }






  useEffect(() => {
    return () => {
      console.log("leaving the current chart");
      dispatch(clearDataVisualizationState());
    };
  }, []);

  
  return (
    <div className="header">
      <div className="mx-auto border-t rounded overflow-hidden ">
        <div id="main_div">
          <div className={(toggle) ? "grid grid-cols-4" : "grid "}>
            {toggle && (
              <div className="xs:col-span-3 lg:col-span-1 xs:z-10 xs:opacity-95 bg-white border border-gray-200 transition duration-150 ease-in-out">
                <Filter
                  parentCallback={callback}
                  filterState={state["filter"]}
                  set_screen={screen_call}
                />
              </div>
            )}
            <div
              className={
                toggle
                  ? "xs:absolute lg:relative col-start-2 col-span-3 overflow-auto"
                  : ""
              }
            >
              <div className="grid grid-cols-3 gap-1 p-5 bg-white">
                <div
                  className={`col-span-3 lg:hidden md:hidden ${
                    chartName === "volcano" ? "xs:hidden" : ""
                  }`}
                >
                  <button
                    className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={e => leftFilterClose(e)}
                    type="button"
                  >
                    <AdjustmentsIcon className="h-6 w-6 inline" />
                  </button>
                </div>
                <div className="flex xs:col-span-3 lg:col-span-3 sm:col-span-3 sm:gap-0 xs:gap-0 lg:gap-6">
                  <div className="inline-flex relative xs:hidden lg:block md:block">
                    <MenuIcon
                      className="h-8 w-8 inline text-main-blue mt-3 cursor-pointer"
                      onClick={e => leftFilterClose(e)}
                    />
                  </div>
                  <div className="inline-flex lg:w-2/5 xs:w-60">
                    <select
                      id="gene_type"
                      value={state["type"]}
                      onChange={(e) => selectGene(e)}
                      className="btn_input_height lg:w-full xs:w-56 p-3 border bg-white focus:outline-none border-blue-300 focus:ring focus:border-blue-300 xs:h-14 lg:h-16 xs:text-sm lg:text-xl"
                    >
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="user-defined"
                      >
                        User-Defined List
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="major-genes"
                      >
                        Cancer major genes (28 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="brst-major-genes"
                      >
                        Breast cancer major genes (20 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="hrd-genes"
                      >
                        HRD genes (15 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="hrd-asso-brst"
                      >
                        HRD association breast (26 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="tcell-exha-genes"
                      >
                        Tcell exhausted genes (8 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="cdc-brst-genes"
                      >
                        CDC Phenopedia breast cancer associated genes (18 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="cell-cycle-ctrl"
                      >
                        General: Cell Cycle Control (34 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="p53-signal"
                      >
                        General: p53 signaling (6 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="notch-signal"
                      >
                        General: Notch signaling (55 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="dna-damage-resp"
                      >
                        General: DNA Damage Response (12 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="other-grow-prol-signal"
                      >
                        General: Other growth/proliferation signaling (11 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="survival-cell-signal"
                      >
                        General: Survival/cell death regulation signaling (23
                        genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="telo-mere-main"
                      >
                        General: Telomere maintenance (2 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="rtk-signal-family"
                      >
                        General: RTK signaling family (16 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="pi3k-akt-mtor-signal"
                      >
                        General: PI3K-AKT-mTOR signaling (17 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="ras-raf-signal"
                      >
                        General: Ras-Raf-MEK-Erk/JNK signaling (26 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="regu-ribo-cell"
                      >
                        General: Regulation of ribosomal protein synthesis and
                        cell growth (9 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="angi-gene"
                      >
                        General: Angiogenesis (6 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="fola-trans"
                      >
                        General: Folate transport (5 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="inva-meta"
                      >
                        General: Invasion and metastasis (27 genes)
                      </option>
                      <option
                        className="xs:text-sm lg:text-xl"
                        value="tgf-beta-path"
                      >
                        General: TGF-β Pathway (43 genes)
                      </option>
                    </select>
                  </div>
                  <div className="inline-flex lg:w-2/5 sm:w-13 xs:w-60">
                    <input
                      type="text"
                      id="genes"
                      className="btn_input_height lg:w-full sm:w-13 xs:w-56 p-3 xs:text-sm lg:text-xl border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 xs:h-14 lg:h-16"
                      name="genes"
                    />
                  </div>
                  <div className="inline-flex lg:w-2/12 sm:w-1/5">
                    <button
                      className="btn_input_height bg-main-blue hover:bg-main-blue mb-3 xs:text-sm lg:text-xl lg:w-full text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded xs:h-14 lg:h-16"
                      onClick={submitFilter}
                    >
                      <FormattedMessage id="Filter" defaultMessage="Filter" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="gap-6">
                <section>
                  <nav id="second_header" className=" px-8 pt-2 shadow-md">
                    <ul
                      id="tabs"
                      className="inline-flex justify-center w-full lg:px-1 sm:px-0 pt-2"
                      onClick={(e) => toggleTab(e)}
                    >
                      {menuItems}
                    </ul>
                  </nav>
                </section>
                <section>
                  <div
                    id="tab-contents"
                    className="block text-center"
                    ref={elementRef}
                  >
                    <div className="grid grid-cols-6 p-5">
                      <div className="lg:col-start-6 sm:col-start-1 md:col-start-6 inline-flex justify-center p-2 ">
                        {screenCapture === false && (
                          <button
                            className="bg-main-blue hover:bg-main-blue mb-3 lg:w-full sm:w-40 sm:h-14  lg:h-20 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
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
                            className="bg-main-blue hover:bg-main-blue mb-3 w-full h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
                            disabled={true}
                          >
                            Loading...
                          </button>
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
                    {boolChartState && <div>{chart["viz"]}</div>}
                    {!boolChartState && (
                      <div className="p-1">Please select Genes</div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
