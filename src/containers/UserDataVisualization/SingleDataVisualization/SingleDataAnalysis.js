import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useEffect, useRef, useState, Suspense, lazy } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { userdataVisualization } from '../../../actions/Constants';
import {
  getBreastKeys,
  getUserDataProjectsTableData,
  sendCaptureScreenshot
} from '../../../actions/api_actions';
import LoaderCmp from '../../Common/Loader';
import arrow_icon from '../../../assets/images/btnDetail-arrow-white.svg';
import sample_img from '../../../assets/images/sample.webp';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import GeneSet from '../Components/MainComponents/GeneSet';
import CaptureScreenshot from "../Components/CaptureScreenshot"
export default function DataVisualization() {
  const history = useHistory();
  const elementRef = useRef(null);
  const dispatch = useDispatch();
  const [chart, setCharts] = useState({ viz: [] });
  const [boolChartState, setBoolChartState] = useState(true);
  const [state, setState] = useState({ genes: [], filter: {}, type: 'user-defined' });
  const [gridData, setGridData] = useState([]);
  const [width, setWidth] = useState(0);
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [title, setTitle] = useState({ id: '', defaultMessage: '' });
  const userProjectDetails = useSelector(
    (data) => data.dataVisualizationReducer.userProjectsDataTable
  );
  const project_id_status = useSelector((data) => data.homeReducer.project_id_status);
  let { tab, project_id } = useParams();
  const [chartName, setChartName] = useState(tab === 'home' ? undefined : tab);
  const [tabName, setTabName] = useState(tab === 'home' ? undefined : tab);
  const [toggle, setToggle] = useState(true);
  const [screenCapture, setScreenCapture] = useState(false);
  const route = useLocation();
  const [exampleData, setExampleData] = useState(false);

  function downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  let variant_summary_gene = false
  let pca = false
  if (tabName === 'variant-summary') {
    variant_summary_gene = true
  }
  else if (tabName === 'pca') {
    pca = true
  }
  const setToFalseAfterScreenCapture = (param = false) => {

    if (tab !== 'heatmap') {

      if (param === false) {
        setScreenCapture(false);
      } else {
        sendCaptureScreenshot('POST', { 'chart_name': tab, 'project_id': project_id, 'location': route?.pathname });
        setScreenCapture(true);
      }
    }
    else if (tab === 'heatmap') {
      CaptureScreenshot(tab, project_id, route?.pathname)
    }
  }

  const callback = useCallback(({ filters, filterKeyandValues, value, genes }) => {
    if (filters && filterKeyandValues) {
      setState((prevState) => ({
        ...prevState,
        filterKeyandValues: filterKeyandValues
      }));
    }

    if (value && genes) {
      setState((prevState) => ({
        ...prevState,
        genes: genes,
        type: value
      }));
      setIsGeneSetPopoverOpen(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch({
        type: userdataVisualization.USER_DATA_PROJECT_TABLE,
        payload: {}
      });
    };
  }, []);

  const LoadChart = (w, type) => {
    let Chart = lazy(() => import('../../DataVisualisation/Charts'));

    return (
      <Suspense fallback={<LoaderCmp />}>
        <Chart type={type} w={elementRef?.current?.getBoundingClientRect()?.width} state={state} screenCapture={screenCapture} setToFalseAfterScreenCapture={setToFalseAfterScreenCapture} toggle={toggle} BrstKeys={BrstKeys} />
      </Suspense>
    )
  };

  // First UseEffect
  useEffect(() => {
    setCharts({ viz: [] });
    dispatch(getBreastKeys(state));
  }, [state, tab])

  //Second UseEffect
  useEffect(() => {
    setTabName(tab === 'home' ? undefined : tab);
    setChartName(tab);
    const t = ['survival'];
    setToggle(t.indexOf(tab) === -1);

  }, [tab]);

  // 3rd UseEffect
  useEffect(() => {

    if (chart['viz']) {
      setBoolChartState(true);
      if (tabName !== 'home' && state?.genes?.length === 0) {
        setBoolChartState(false);
      }
      if (tabName === 'survival') {
        setBoolChartState(true);
      }
    }

  }, [chart]);

  useEffect(() => {
    if (BrstKeys) {
      let chartx = LoadChart(width, tabName);
      setCharts((prevState) => ({
        ...prevState,
        viz: chartx
      }));
    }
  }, [BrstKeys]);

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
    let l = ['variant_summary', 'circos', 'lollipop', 'cnv', 'heatmap', 'box', 'survival','pca'];
    let gridData = [];

    l.forEach((element) => {
      let desc = '';
      if (element === 'heatmap') {
        desc = (
          <FormattedMessage
            id="Example_single_heatMap"
            defaultMessage="represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'cnv') {
        element = 'CNV';
        desc = (
          <FormattedMessage
            id="Example_single_CNV"
            defaultMessage="visualize copy number variation data on integrated genome viewer"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'onco') {
        element = 'OncoPrint';
      } else if (element === 'variant_summary') {
        element = 'variant-summary';
        desc = (
          <FormattedMessage
            id="Example_single_variantSummary"
            defaultMessage="visualize summary information of major variant types"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'box') {
        desc = (
          <FormattedMessage
            id="Example_single_box"
            defaultMessage="visualize the genetic information statistics of the selected gene(s) in the form of boxes"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'lollipop') {
        desc = (
          <FormattedMessage
            id="Example_single_Lollipop"
            defaultMessage=" visualize mutation or phosphorylation of certain gene on a sequence"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'circos') {
        desc = (
          <FormattedMessage
            id="Example_single_circos"
            defaultMessage=" visualize one of the seven omics data as a circular layer on a circular chromosome map"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'survival') {
        desc = (
          <FormattedMessage
            id="Example_single_survival"
            defaultMessage="visualize the recurrence/survival probability of patients according to clinical variable conditions"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'pca') {
        desc = (
          <FormattedMessage
            id="Example_pca_small"
            defaultMessage="Tumor and Normal sample visualization for selected gene sets"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      }

      let gridobj = {
        title: element === 'variant-summary' ? 'Variant Summary'
        : element === 'pca' ? 'PCA Analysis'
        : element,
        image: require(`../../../assets/images/Visualizations/${element}.png`).default,
        manual: require(`../../../assets/files/DownloadbleFiles/SingleDataVis/${element}.pdf`).default,
        // manual: element !== 'pca' ? require(`../../../assets/files/DownloadbleFiles/SingleDataVis/${element}.pdf`).default
        // : undefined,
        link: `/singledata-upload/${element}/`,
        viewLink: `/visualizesingle-exampledata/${element}`,
        description: desc || ''
      };
      gridData.push(gridobj);
    });
    setGridData(gridData);
  }, []);

  useEffect(() => {
    if (project_id) {
      let projectAvailableSteps = undefined;
      if (
        userProjectDetails &&
        'key' in userProjectDetails &&
        userProjectDetails.key === 'NotFound'
      ) {
        history.push('/login');
      }
      if (userProjectDetails && 'available_steps' in userProjectDetails) {
        projectAvailableSteps = userProjectDetails.available_steps;
      }

      if (projectAvailableSteps === undefined) {
        dispatch(getUserDataProjectsTableData(project_id));
      }
    }
  }, [project_id, userProjectDetails, project_id_status]);


  useEffect(() => {
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx
    }));
  }, [screenCapture]);


  const breadCrumbs = {
    '/visualise-singledata/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      route?.pathname.includes('visualise-singledata')
        ? { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` }
        : {
          id: `VisualizeExampleData`,
          defaultMessage: `Visualize Example Data`,
          to: `/home/visualizeMyExampleData/`
        },
      {
        id: `SingleDataVisualization`,
        defaultMessage: `Single Data Visualization`,
        to: project_id ? `/visualise-singledata/home/${project_id}` : `/visualizesingle-exampledata/home/`
      },
      project_id ?
        {
          id: tab !== 'home' ? tab : 'Null',
          defaultMessage: tab !== 'home' ? tab : 'Null',
          to: `/visualise-singledata/${tabName}/${project_id}`
        }
        :
        {
          id: tab !== 'home' ? tab : 'Null',
          defaultMessage: tab !== 'home' ? tab : 'Null',
          to: `/visualizesingle-exampledata/${tabName}/`
        }
    ]
  };

  useEffect(() => {
    let newTitle = '';
    let newMsg = '';
    if (route.pathname.includes('/visualizesingle-exampledata/')) {
      newTitle += 'Example Single';
      newMsg+='Visualize Single Example Data'
    } else if (route.pathname.includes('/visualise-singledata/')) {
      newTitle = 'Single';
      newMsg+='Visualize Single Data'
    }
    const breadcrumbItems = breadCrumbs['/visualise-singledata/'];
    const currentBreadcrumb = breadcrumbItems.find(item => route.pathname.includes(item.to));

    if (currentBreadcrumb) {
      newTitle += `: ${tab === "home" ? "Home" : tab === "variant-summary" ? "Variant Summary" : tab === "pca" ? "PCA": tab[0]?.toUpperCase() + tab?.slice(1)}`;
      newMsg += `: ${tab === "home" ? "Home" : tab === "variant-summary" ? "Variant Summary" : tab === "pca" ? "PCA": tab[0]?.toUpperCase() + tab?.slice(1)}`;
    }

    if (title.id !== newTitle) {
      setTitle({ id: newTitle, defaultMessage: newMsg });
    }

    setExampleData(route.pathname.includes('/visualizesingle-exampledata/'));
  }, [route.pathname, breadCrumbs, title.id]);

  const [isGeneSetPopoverOpen, setIsGeneSetPopoverOpen] = useState(false);

  return (
    <div>
      <HeaderComponent
        title={title}
        routeName={
          route.pathname.includes('/visualise-singledata/')
            ? `/visualise-singledata/`
            : `/visualizesingle-exampledata/`
        }
        breadCrumbs={breadCrumbs[`/visualise-singledata/`]}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="ptn">
          <div className="auto">
            {gridData && !tabName ? (
              <>
                <div className="contentsTitle">
                  <h3>
                    <font>
                      <font>
                        {' '}
                        <FormattedMessage id="SingleData" defaultMessage="Single Data" />{' '}
                      </font>
                      <span className="colorSecondary">
                        <font>
                          {' '}
                          <FormattedMessage id="visualization" defaultMessage="Visualization" />
                        </font>
                      </span>
                    </font>
                  </h3>
                </div>
                <div className="mainContentsBox" style={{ marginTop: '50px' }}>
                  <div className="galleryList">
                    <ul
                      className={`justify-content-${Object.keys(gridData).length > 2 ? 'start' : 'center'
                        }`}
                    >
                      {gridData.map((item, index) => {
                        return (
                          <li key={index} className="listitems">
                            <Link to={route.pathname}>

                              <div className="thumb">
                                <img src={item.image} alt={item.image} />
                                <div className="hvBox">
                                  <div className="hvBox_links">

                                    {!exampleData && (
                                      <>

                                        <div className="textdiv" onClick={() => downloadFile(item.manual, `${item.title}.pdf`)}>
                                          <span>
                                            <FormattedMessage
                                              id="DownloadManual"
                                              defaultMessage="Download Manual"
                                            />
                                          </span>
                                          <img src={arrow_icon} alt="arrow-icon" />
                                        </div>


                                        <div className="textdiv">
                                          <Link to={item.link}>
                                          {/* <div onClick={() => history.push(item.link)}></div> */}
                                            <span>
                                              <FormattedMessage
                                                id="RunAnalysis"
                                                defaultMessage="Run Analysis"
                                              />
                                            </span>
                                            <img src={arrow_icon} alt="arrow-icon" />
                                          </Link>
                                          {/* <div></div> */}
                                        </div>
                                      </>
                                    )}

                                    {exampleData && (

                                      <div className="textdiv">
                                        <Link to={item.viewLink} id={`Example${item.title}`}>
                                          <span>
                                            <FormattedMessage id="Example" defaultMessage="Example" />
                                          </span>
                                          <img src={arrow_icon} alt="arrow-icon" />
                                        </Link>
                                      </div>

                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="txtBox txtBoxpadding tac Relative">
                                <dl className="MarginTop10">
                                  <dt className="h4 Capitalize">{item.title}</dt>
                                  <dd className="p1">{item.description}</dd>
                                </dl>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="contentsTitle">
                  <h3>
                    <font>
                      <span className="colorSecondary">
                        <font>{tabName === "variant-summary" ? "Variant Summary" : tabName[0]?.toUpperCase() + tabName?.slice(1)}</font>
                      </span>
                    </font>
                  </h3>
                </div>
                <section>
                  <div
                    className={`${tabName !== 'survival' ? 'single_viz' : 'single_viz_singleTab'
                      } PopoverStyles `}
                  >
                    {tabName !== 'survival' && (
                      <Popover className="Relative gene_main_box">
                        {({ }) => {
                          return (
                            <>
                              <div>
                                <Popover.Button
                                  className={'selectBox'}
                                  onClick={() => setIsGeneSetPopoverOpen(!isGeneSetPopoverOpen)}
                                >
                                  <div className="GeneSetgeneSetButton" >
                                    <div className="flex-1">
                                      <FormattedMessage
                                        id="GeneSetRe-filtering"
                                        defaultMessage="Gene set Re-filtering"
                                      />{' '}
                                    </div>
                                    <div className="w-20" style={{ backgroundColor: 'white' }}>
                                      <span className="filter-icon">
                                        <img src={sample_img} alt="sample_img" />
                                      </span>
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
                                  <Popover.Panel
                                    className="GeneSetPopoverPanel"
                                    id="GeneSetPopverChild"
                                    style={{ width: "100%" }}
                                  >
                                    <GeneSet parentCallback={callback} filterState={state} variantSummary={variant_summary_gene} pca={pca} />
                                  </Popover.Panel>
                                </Transition>
                              </div>
                            </>
                          );
                        }}
                      </Popover>
                    )}

                    {!exampleData && (
                      <Popover className="relative gene_main_box capture">
                        {({ }) => {
                          return (
                            <>
                              <div className="">
                                <Popover.Button className={'button'}>
                                  <div>
                                    <span
                                      onClick={() => setToFalseAfterScreenCapture(true)}
                                      className="btn btnPrimary"
                                    >
                                      <FormattedMessage
                                        id="Capture_screen"
                                        defaultMessage="Capture Screenshot"
                                      />
                                    </span>
                                  </div>
                                </Popover.Button>
                              </div>
                            </>
                          );
                        }}
                      </Popover>
                    )}
                  </div>
                </section>

                <section>
                  <div
                    id="tab-contents"
                    className="block text-center"
                    style={{ display: 'block', textAlign: 'center' }}
                    ref={elementRef}
                  >
                    {BrstKeys &&
                      tabName &&
                      tabName !== 'home' &&
                      tabName !== 'survival' &&
                      boolChartState && <div>{chart['viz']}</div>}

                    {tabName && tabName === 'survival' && boolChartState && (
                      <div>{chart['viz']}</div>
                    )}

                    {tabName && tabName !== 'home' && (
                      <div style={{ marginTop: '50px' }}>
                        <button
                          id="BackButton"
                          className="btn btnPrimary"
                          style={{ float: 'right', margin: '10px 0px 10px 0px' }}
                          onClick={() => {
                            if (project_id) {
                              history.push(`/visualise-singledata/home/`);
                            } else {
                              history.push(`/visualizesingle-exampledata/home/`);
                            }
                          }}
                        >
                          <FormattedMessage id="Back" defaultMessage="Back" />
                        </button>
                      </div>
                    )}
                    {tabName && (tabName !== 'home' && tabName !== 'survival' && tabName !== 'fusion') && !boolChartState && (
                      <div className="p-1 text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md">
                        <FormattedMessage
                          id="PleaseSelectGenes"
                          defaultMessage="Please Select Genes"
                        />
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </article >
    </div >
  );
}
