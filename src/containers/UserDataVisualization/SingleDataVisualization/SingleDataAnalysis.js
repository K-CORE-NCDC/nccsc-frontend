import { Popover, Transition } from "@headlessui/react";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { userdataVisualization } from "../../../actions/Constants";
import {
  getBreastKeys,
  getUserDataProjectsTableData,
  samplesCount
} from "../../../actions/api_actions";
import arrow_icon from '../../../assets/images/btnDetail-arrow-white.svg';
import sample_img from '../../../assets/images/sample.webp';
import { Context } from "../../../wrapper";
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import { Charts } from "../../DataVisualisation/Charts";
import GeneSet from "../Components/MainComponents/GeneSet";


export default function DataVisualization({ parentProps }) {
  const history = useHistory();
  const elementRef = useRef(null);
  const dispatch = useDispatch();
  const [chart, setCharts] = useState({ viz: [] });
  const [boolChartState, setBoolChartState] = useState(true);
  const [state, setState] = useState({ genes: [], filter: {}, type: "user-defined" });
  const [gridData, setGridData] = useState([])
  const [width, setWidth] = useState(0);
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [title, setTitle] = useState({ id: "", defaultMessage: "" })
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
  const route = useLocation();
  const [exampleData, setExampleData] = useState(false);

  const setToFalseAfterScreenCapture = (param = false) => {
    if (param === false) {
      setScreenCapture(false);
    } else {
      setScreenCapture(true);
    }
  };

  const submitFilter = (e) => {
    setBoolChartState(false);
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx,
    }));

  };


  useEffect(() => {
    return () => {
      dispatch({
        type: userdataVisualization.USER_DATA_PROJECT_TABLE,
        payload: {},
      });
    }
  }, [])

  const LoadChart = (w, type) => {
    switch (type) {
      case "circos":
        return Charts.circos(
          elementRef.current.getBoundingClientRect().width,
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
      if (tabName === 'survival') {
        setBoolChartState(true);
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
    }

    if (value && genes) {

      setState((prevState) => ({
        ...prevState,
        genes: genes,
        type: value,
      }));
      setIsGeneSetPopoverOpen(false)
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
      "variant_summary",
      "circos",
      "lollipop",
      "cnv",
      "heatmap",
      "box",
      "survival",
    ];
    let gridData = []

    l.forEach((element) => {

      let name = " Plot";
      let desc = ''
      if (element === "heatmap") {
        name = "";
        desc = <FormattedMessage id="Example_signle_heatMap" defaultMessage='represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)'>
          {placeholder =>
            placeholder
          }
        </FormattedMessage>
      } else if (element === "cnv") {
        element = "CNV";
        desc = <FormattedMessage id="Example_signle_CNV" defaultMessage='visualize copy number variation data on integrated genome viewer'>
          {placeholder =>
            placeholder
          }
        </FormattedMessage>
      } else if (element === "onco") {
        name = "";
        element = "OncoPrint";
      } else if (element === "variant_summary") {
        name = "";
        element = "variant-summary";
        desc = <FormattedMessage id="Example_signle_variantSummary" defaultMessage='visualize summary information of major variant types'>
          {placeholder =>
            placeholder
          }
        </FormattedMessage>
      } else if (element === 'box') {
        desc = <FormattedMessage id="Example_signle_box" defaultMessage='visualize the genetic information statistics of the selected gene(s) in the form of boxes'>
          {placeholder =>
            placeholder
          }
        </FormattedMessage>
      } else if (element === 'lollipop') {
        desc = <FormattedMessage id="Example_signle_Lollipop" defaultMessage=' visualize mutation or phosphorylation of certain gene on a sequence'>
          {placeholder =>
            placeholder
          }
        </FormattedMessage>
      } else if (element === 'circos') {
        desc = <FormattedMessage id="Example_signle_circos" defaultMessage=' visualize one of the seven omics data as a circular layer on a circular chromosome map'>
          {placeholder =>
            placeholder
          }
        </FormattedMessage>
      } else if (element === 'survival') {
        desc = <FormattedMessage id="Example_signle_sirvival" defaultMessage='visualize the recurrence/survival probability of patients according to clinical variable conditions'>
          {placeholder =>
            placeholder
          }
        </FormattedMessage>
      }

      let gridobj = {
        title: element === 'variant-summary' ? 'Variant Summary' : element, image: require(`../../../assets/images/Visualizations/${element}.png`).default, link: `/singledata-upload/${element}/`, viewLink: `/visualizesingle-exampledata/${element}`,
        description: desc || ''
      }
      gridData.push(gridobj)

    });
    setGridData(gridData)
  }, []);


  useEffect(() => {
    if (project_id) {
      let projectAvailableSteps = undefined;
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



  useEffect(() => {
    if (project_id !== undefined) {
      if (state.genes.length > 0) {
        dispatch(samplesCount("POST", { project_id: project_id }));
        dispatch(getBreastKeys(state));
        setBoolChartState(false);
      }
      if (tabName === 'survival') {
        setBoolChartState(true);
      }
    } else {
      if (state.genes.length > 0) {
        dispatch(samplesCount("POST", {}));
        dispatch(getBreastKeys(state));
      }
    }
  }, [state]);

  useEffect(() => {
    if (route.pathname.includes('/visualizesingle-exampledata/')) {
      setExampleData(true)
      setTitle({ id: "VisualizeExampleData", defaultMessage: "Visualize Example Data" })
    } else if (route.pathname.includes('/visualise-singledata/')) {
      setExampleData(false)
      setTitle({ id: 'MyDataVisualization', defaultMessage: 'Visualize My Data' })
    }
  }, [route.pathname]);

  const breadCrumbs = {
    '/visualise-singledata/':
      [
        { id: 'Home', defaultMessage: 'Home', to: '/' },
        { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
        { id: `SingleDataVisualization`, defaultMessage: `Single Data Visualization`, to: project_id ? `/visualise-singledata/home/${project_id}` : `/visualise-singledata/home/` },
        { id: tab !== 'home' ? tab : 'Null', defaultMessage: tab !== 'home' ? tab : 'Null', to: `/visualise-singledata/${tabName}/${project_id}` }
      ],
    '/visualizesingle-exampledata/':
      [
        { id: 'Home', defaultMessage: 'Home', to: '/' },
        { id: `VisualizeExampleData`, defaultMessage: `Visualize Example Data`, to: `/home/visualizeMyExampleData/` },
        { id: 'SingleDataVisualization', defaultMessage: `Single Data Visualization`, to: `/visualizesingle-exampledata/home/` },
        { id: tab !== 'home' ? tab : 'Null', defaultMessage: tab !== 'home' ? tab : 'Null', to: `/visualise-singledata/${tabName}/` }
      ],

  };

  const [isGeneSetPopoverOpen, setIsGeneSetPopoverOpen] = useState(false);

  return (

    <div>
      <HeaderComponent
        title={title}
        routeName={route.pathname.includes('/visualise-singledata/') ? `/visualise-singledata/` : `/visualizesingle-exampledata/`}
        breadCrumbs={breadCrumbs[route.pathname.includes('/visualise-singledata/') ? `/visualise-singledata/` : `/visualizesingle-exampledata/`]}
        type="single"

      />
      <article id="subContents" className="subContents">

        <div className="ptn">
          <div className="auto">

            {
              gridData && !tabName ?
                <>
                  <div className="contentsTitle">
                    <h3>
                      <font>
                        <font > <FormattedMessage id="SingleData" defaultMessage="Single Data" />  </font>
                        <span className="colorSecondary">
                          <font > <FormattedMessage id="visualization" defaultMessage="Visualization" /></font>
                        </span>
                      </font>
                    </h3>
                  </div>
                  <div className='mainContentsBox' style={{ marginTop: '50px' }}>
                    <div className="galleryList">
                      <ul className={`justify-content-${Object.keys(gridData).length > 2 ? 'start' : 'center'}`}>
                        {gridData.map((item, index) => {
                          return <li key={index} className="listitems">
                            <Link to={!exampleData ? item.link : item.viewLink}>
                              <div className="thumb">
                                <img src={item.image} alt="img" />
                                <div className="hvBox">
                                  <div className="hvBox_links">

                                    {!exampleData &&
                                      <>
                                        <Link to={item.link}>
                                          <div className="textdiv ">
                                            <span><FormattedMessage id="DownloadManual" defaultMessage="Download Manual" /></span>
                                            <img src={arrow_icon} alt="arrow-icon" />

                                          </div>
                                        </Link>
                                        <Link to={item.link}>
                                          <div className="textdiv">
                                            <span><FormattedMessage id="RunAnalysis" defaultMessage="Run Analysis" /></span>
                                            <img src={arrow_icon} alt="arrow-icon" />

                                          </div>
                                        </Link>
                                      </>
                                    }

                                    {
                                      exampleData &&
                                      <Link to={item.viewLink}>
                                        <div className="textdiv">
                                          <span><FormattedMessage id="Example" defaultMessage="Example" /></span>
                                          <img src={arrow_icon} alt="arrow-icon" />
                                        </div>
                                      </Link>
                                    }
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
                              </div>
                            </Link>
                          </li>
                        })}
                      </ul>
                    </div>
                  </div>
                </>
                :
                <>
                  <div className="contentsTitle">
                    <h3>
                      <font>
                        <span className="colorSecondary">
                          <font >{tabName[0]?.toUpperCase() +
                            tabName?.slice(1)}</font>
                        </span>
                      </font>
                    </h3>
                  </div>
                  <section >
                    <div className={`${tabName !== 'survival' ? 'single_viz' : 'single_viz_singleTab'} PopoverStyles `}>
                      {
                        tabName !== 'survival' &&
                        <Popover className="Relative gene_main_box">
                          {({ open }) => {
                            return (
                              <>
                                <div className=''>
                                  <Popover.Button className={'selectBox'} onClick={() => (setIsGeneSetPopoverOpen(!isGeneSetPopoverOpen))}>
                                    <div className="GeneSetgeneSetButton">
                                      <div className="flex-1"><FormattedMessage id="GeneSetRe-filtering" defaultMessage="Gene set Re-filtering" />  </div>
                                      <div className="w-20" style={{ backgroundColor: 'white' }}>
                                        <span className="filter-icon"><img src={sample_img} alt="img" /></span>
                                      </div>
                                    </div>
                                  </Popover.Button>
                                  <Transition
                                    show={isGeneSetPopoverOpen}
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                  >
                                    <Popover.Panel className="GeneSetPopoverPanel" id="GeneSetPopverChild">
                                      <GeneSet parentCallback={callback} filterState={state} />
                                    </Popover.Panel>
                                  </Transition>
                                </div>
                              </>
                            )
                          }}
                        </Popover>
                      }


                      {!exampleData &&
                        <Popover className="relative gene_main_box capture">
                          {({ open }) => {
                            return (
                              <>
                                <div className=''>
                                  <Popover.Button className={'button'}>
                                    <div>
                                      <button onClick={() =>
                                        setToFalseAfterScreenCapture(true)
                                      } className="btn btnPrimary"><FormattedMessage id="Capture_screen" defaultMessage="Capture Screenshot" /></button>
                                    </div>
                                  </Popover.Button>

                                </div>
                              </>
                            )
                          }}
                        </Popover>}

                    </div>
                  </section>

                  <section>
                    <div
                      id="tab-contents"
                      className="block text-center"
                      style={{ display: "block", textAlign: "center" }}
                      ref={elementRef}>
                      {BrstKeys && tabName && tabName !== 'home' && tabName !== 'survival' && boolChartState && <div>{chart["viz"]}</div>}

                      {tabName && tabName === 'survival' && boolChartState && <div>{chart["viz"]}</div>}

                      {tabName && tabName !== 'home' && <div style={{ marginTop: "50px" }}>
                        <button className="btn btnPrimary" style={{ float: "right", margin: "10px 0px 10px 0px" }} onClick={() => {
                          if (project_id) {
                            history.push(`/visualise-singledata/home/`)
                          } else {
                            history.push(`/visualizesingle-exampledata/home/`)
                          }
                        }}><FormattedMessage id="Back" defaultMessage="Back" /></button>
                      </div>
                      }
                      {tabName && tabName !== 'home' && !boolChartState && tabName !== 'survival' && (
                        <div className="p-1 text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md">
                          <FormattedMessage id="PleaseSelectGenes" defaultMessage="Please Select Genes" />
                        </div>
                      )}
                    </div>
                  </section>
                </>
            }
          </div >
        </div>
      </article >
    </div >

  );
}
