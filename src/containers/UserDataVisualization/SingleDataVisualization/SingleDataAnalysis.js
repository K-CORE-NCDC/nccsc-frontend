import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { CogIcon, FilterIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ConfirmDownload from "../../Common/downloadConfirmation";
import { Charts } from "../../DataVisualisation/Charts";
import genes from "../../Common/gene.json";
import { Context } from "../../../wrapper";
import { useHistory, Link } from "react-router-dom";
import {
  getBreastKeys,
  getUserDataProjectsTableData,
  samplesCount
} from "../../../actions/api_actions";
import { Popover, Transition } from "@headlessui/react";
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import GeneSet from "../Components/MainComponents/GeneSet";
import ExampleImage from '../../../assets/images/mainSection05-img02.jpg';

export default function DataVisualization() {
  const context = useContext(Context);
  const elementRef = useRef(null);
  const dispatch = useDispatch();
  const [chart, setCharts] = useState({ viz: [] });
  const [boolChartState, setBoolChartState] = useState(true);
  const [state, setState] = useState({ genes: [], filter: {}, type: "user-defined" });
  const [gridData, setGridData] = useState([])
  const [width, setWidth] = useState(0);
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const userProjectDetails = useSelector(
    (data) => data.dataVisualizationReducer.userProjectsDataTable
  );
  const project_id_status = useSelector(
    (data) => data.homeReducer.project_id_status
  );
  const [availableTabsForProject, setavailableTabsForProject] = useState([]);
  let { tab, project_id } = useParams();
  const [chartName, setChartName] = useState(tab === 'home' ? undefined : tab);
  const [tabName, setTabName] = useState(tab === 'home' ? undefined : tab)
  const [toggle, setToggle] = useState(true);
  const [screenCapture, setScreenCapture] = useState(false);


  const setToFalseAfterScreenCapture = (param = false) => {
    if (param === false) {
      setScreenCapture(false);
    } else {
      setScreenCapture(true);
    }
  };

  const submitFilter = (e) => {
    setBoolChartState(false);
    // setChartName(tabName);
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx,
    }));

  };

  const LoadChart = (w, type) => {
    switch (type) {
      case "circos":
        return Charts.circos(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture,
          toggle,
        );
      case "lollipop":
        return Charts.lollipop(
          elementRef.current.getBoundingClientRect().width,
          state,
          screenCapture,
          setToFalseAfterScreenCapture,
        );
      case "heatmap":
        return Charts.heatmap(
          elementRef.current.getBoundingClientRect().width,
          state,
          screenCapture,
          BrstKeys,
          setToFalseAfterScreenCapture
        );
      case "CNV":
        return Charts.igv(
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
      case "variant-summary":
        return Charts.variant_summary(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      case "survival":
        return Charts.survival(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture
        );
      default:
        return false;
    }
  };

  useEffect(() => {
    if (chart) {
      if (tabName !== 'home' && state?.genes?.length > 0) {
        setBoolChartState(true);
      } else {
        setBoolChartState(false)
      }

    }
  }, [chart, tabName]);

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


  const callback = useCallback(({ filters, filterKeyandValues, value, genes }) => {
    if (filters && filterKeyandValues) {
      setState((prevState) => ({
        ...prevState,
        'filterKeyandValues': filterKeyandValues
      }));
      // setfilterApplied(true);
    }

    if (value && genes) {

      setState((prevState) => ({
        ...prevState,
        genes: genes,
        type: value,
      }));
    }
  }, []);



  useEffect(() => {
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx,
    }));
  }, [screenCapture]);

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

  }, [tab, tabName, chartName, BrstKeys]);

  useEffect(() => {
    let w = elementRef?.current?.getBoundingClientRect().width;
    setWidth(w);
    setBoolChartState(false);
    if (project_id !== undefined) {
      setState((prevState) => ({
        ...prevState,
        project_id: project_id
      }));
    }
    let l = [
      "circos",
      "lollipop",
      "cnv",
      "heatmap",
      "box",
      "variant_summary",
      "survival",
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
      } else if (element === "variant_summary") {
        name = "";
        element = "variant-summary";
      }

      let gridobj = {
        title: element, image: require(`../../../assets/images/Visualizations/${element}.png`).default, link: `/singledata-upload/${element}/`, viewLink: `/visualise-singledata/${element}`,
        description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.'
      }
      gridData.push(gridobj)

    });
    setGridData(gridData)
  }, []);


  useEffect(() => {
    if (project_id !== undefined) {
      let projectAvailableSteps = undefined;
      // if(userProjectDetails && 'key' in  userProjectDetails &&  userProjectDetails.key === 'NotFound'){
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
          } else if (stepName === "variant_summary") {
            tabList.push("variant_summary");
          } else {
            tabList.push(stepName);
          }
        });
      }
      setavailableTabsForProject(tabList);
    }

  }, [project_id, userProjectDetails, project_id_status]);

  // useEffect(() => {
  //   if (project_id) {
  //     dispatch(getUserDefinedFilter({
  //       "project_id": project_id
  //     }));
  //     // dispatch(samplesCount("POST", {}));
  //     dispatch(getBreastKeys(state));

  //   }
  // }, [project_id])


  useEffect(() => {

    if (project_id !== undefined) {
      if (state.genes.length > 0) {
        dispatch(samplesCount("POST", { project_id: project_id }));
        dispatch(getBreastKeys(state));
        setBoolChartState(false);
        // let chartx = LoadChart(width, tabName);
        // setCharts((prevState) => ({
        //   ...prevState,
        //   viz: chartx,
        // }));  
      }
    } else {
      if (state.genes.length > 0) {
        dispatch(samplesCount("POST", {}));
        dispatch(getBreastKeys(state));
      }
    }
  }, [state]);

  const breadCrumbs = {
    '/visualise-singledata/':
      [
        { id: 'Home', defaultMessage: 'Home', to: '/' },
        { id: 'SingleDataVisualisation', defaultMessage: 'Single Data Visualization', to: project_id ? `/visualise-singledata/home/${project_id}` : `/visualise-singledata/home/` },
        { id: tab !== 'home' ? tab : 'Null', defaultMessage: tab !== 'home' ? tab : 'Null', to: `/visualise-multidata/${tabName}/${project_id}` }
      ]

  };
  return (

    <div>
      <HeaderComponent
        title="회원가입"
        routeName="/visualise-singledata/"
        breadCrumbs={breadCrumbs['/visualise-singledata/']}
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
        <div className="ptn">
          <div className="auto">
            {
              gridData && !tabName ?
                <div className='mainContentsBox' style={{ marginTop: '50px' }}>
                  <div className="galleryList">
                    <ul className="justify-content-center">
                      {gridData.map((item, index) => {
                        return <li key={index} className="listitems">
                          <Link to={item.link}>
                            <div className="thumb">
                              <img src={ExampleImage} alt="img" />
                              <div className="hvBox">
                                <div className="vizButtons" >
                                  <Link to={item.link}>
                                    <span className="material-icons" style={{ fontSize: "50px" }}>
                                      download
                                    </span>
                                  </Link>

                                </div>
                                <div className="vizButtons" >
                                  <Link to={item.link}>
                                    <span className=" material-icons" style={{ fontSize: "50px" }}>
                                      play_circle
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="txtBox txtBoxpadding tac Relative">
                              <dl className="MarginTop10">
                                <dt className="h4 Capitalize">{item.title}</dt>
                                <dd className="p1">
                                  {item.description}
                                </dd>
                              </dl>
                              <span className="playicon">
                                <Link to={item.viewLink}>
                                  <span className="material-icons">
                                    visibility
                                  </span>
                                </Link>
                              </span>
                            </div>

                          </Link>
                        </li>
                      })}
                    </ul>
                  </div>
                </div>

                :
                <>
                  <section >
                    <div className="PopoverStyles single_viz">
                      <Popover className="relative gene_main_box">
                        {({ open }) => {
                          return (
                            <>
                              <div className="w-full">
                                <Popover.Button className={'selectBox'}>
                                  <div className="GeneSetgeneSetButton">
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
                                  <Popover.Panel className="GeneSetPopoverPanel">
                                    <GeneSet parentCallback={callback} filterState={state} />
                                  </Popover.Panel>
                                </Transition>
                              </div>
                            </>
                          )
                        }}
                      </Popover>

                      <Popover className="relative gene_main_box">
                        {({ open }) => {
                          return (
                            <>
                              <div className=''>
                                <Popover.Button className={'button'}>
                                  <div>
                                    <button onClick={() =>
                                      setToFalseAfterScreenCapture(true)
                                    } className="btn btnPrimary">Capture Screenshot</button>
                                  </div>
                                </Popover.Button>

                              </div>
                            </>
                          )
                        }}
                      </Popover>

                    </div>
                  </section>

                  <section>
                    <div
                      id="tab-contents"
                      className="block text-center"
                      style={{ display: "block", textAlign: "center" }}
                      ref={elementRef}>
                      {BrstKeys && tabName && tabName !== 'home' && boolChartState && <div>{chart["viz"]}</div>}
                      {tabName && tabName !== 'home' && !boolChartState && (
                        <div className="p-1 text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md">Please select Genes</div>
                      )}
                    </div>
                  </section>
                </>
            }



          </div>
        </div>
      </article>
    </div>

  );
}
