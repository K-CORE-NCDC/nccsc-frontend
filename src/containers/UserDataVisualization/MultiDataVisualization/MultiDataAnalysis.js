import { Popover, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  clearDataVisualizationState,
  getBreastKeys,
  getUserDataProjectsTableData,
  getUserDefinedFilter,
  samplesCount
} from '../../../actions/api_actions';
import arrow_icon from '../../../assets/images/btnDetail-arrow-white.svg';
import sample_img from '../../../assets/images/sample.webp';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import Filter from '../../Common/filter';
import { Charts } from '../../DataVisualisation/Charts';
import GeneSet from '../Components/MainComponents/GeneSet';
import SurvivalFilterComponent from '../Components/MainComponents/SurvivalFilterComponent';
import VolcanoFusionFilterComponent from '../Components/MainComponents/VolcanoFusionFilterComponent';

export default function DataVisualization() {
  const elementRef = useRef(null);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [chart, setCharts] = useState({ viz: [] });
  const [boolChartState, setBoolChartState] = useState(true);
  const [state, setState] = useState({ genes: [], filter: {}, type: '' });
  const [survialData, setSurvivalData] = useState({});
  const [survivalCardData, setSurvivalCardData] = useState({});
  const [VFData, setVFData] = useState({});
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [gridData, setGridData] = useState([]);
  const history = useHistory();
  const project_id_status = useSelector((data) => data.homeReducer.project_id_status);
  const userProjectDetails = useSelector(
    (data) => data.dataVisualizationReducer.userProjectsDataTable
  );
  let { tab, project_id } = useParams();
  const [chartName, setChartName] = useState(tab === 'home' ? undefined : tab);
  const [tabName, setTabName] = useState(tab === 'home' ? undefined : tab);
  const [screenCapture, setScreenCapture] = useState(false);
  const [availableTabsForProject, setavailableTabsForProject] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [filterApplied, setfilterApplied] = useState(false);
  const [title, setTitle] = useState({});

  const setToFalseAfterScreenCapture = (param = false) => {
    if (param === false) {
      setScreenCapture(false);
    } else {
      setScreenCapture(true);
    }
  };

  const submitFilter = () => {
    if (BrstKeys) {
      let chartx = LoadChart(width, tabName);
      setCharts((prevState) => ({
        ...prevState,
        viz: chartx
      }));
    }
  };

  const callback = useCallback(({ filter, value, genes }) => {
    let g = [];
    if (genes?.includes(' ')) {
      g = genes?.split(' ');
    } else {
      g?.push(genes);
    }
    if (filter) {
      setState((prevState) => ({
        ...prevState,
        filter: filter
      }));
      setfilterApplied(true);
      setFilterPopoverOpen(false);
    } else if (value && genes) {
      setState((prevState) => ({
        ...prevState,
        genes: genes,
        type: value
      }));
      setIsGeneSetPopoverOpen(false);
    }
    setChartName(tabName);
  }, []);

  const volcanoFusionFilterCallback = useCallback(({ volcanoFusionFilterData }) => {
    setVFData(volcanoFusionFilterData);
    setChartName(tabName);
    setVolFusFilterPopoverOpen(false);
  }, []);

  const survivalCallback = useCallback(({ updatedState }) => {
    setSurvivalData(updatedState);
    setChartName(tabName);
    setSurvivalFilterPopoverOpen(false);
  }, []);

  let trasnferSurvivalData = (cardData) => {
    setSurvivalCardData(cardData);
  };

  useEffect(() => {
    if (BrstKeys) {
      let chartx = LoadChart(width, tabName);
      setCharts((prevState) => ({
        ...prevState,
        viz: chartx
      }));
    }
  }, [state, BrstKeys, survialData, VFData]);

  useEffect(() => {
    if (filterApplied) {
      setfilterApplied(false);
      submitFilter();
    }
  }, [filterApplied]);

  useEffect(() => {
    if (project_id !== undefined) {
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

      let tabList = [];
      if (projectAvailableSteps === undefined) {
        dispatch(getUserDataProjectsTableData(project_id));
      } else {
        Object.keys(projectAvailableSteps).forEach((stepName) => {
          if (stepName === 'lollypop') {
            tabList.push('lollipop');
          } else if (stepName === 'oncoprint') {
            tabList.push('onco');
          } else if (stepName === 'igv') {
            tabList.push('CNV');
          } else if (stepName === 'scatter') {
            tabList.push('correlation');
          } else {
            tabList.push(stepName);
          }
        });
      }
      setavailableTabsForProject(tabList);
    }
  }, [project_id, userProjectDetails, project_id_status]);

  useEffect(() => {
    setTabName(tab === 'home' ? undefined : tab);
    setChartName(tabName);
    if (chartName && state?.genes?.length > 0) {
      submitFilter();
    }
    let t = ['volcano', 'survival', 'fusion'];
    if (t.indexOf(tabName) !== -1) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [tab, tabName, chartName, state, BrstKeys]);

  useEffect(() => {
    dispatch(
      getUserDefinedFilter({
        project_id: project_id
      })
    );
  }, [project_id]);

  useEffect(() => {
    let w = elementRef.current.getBoundingClientRect().width;
    setWidth(w);
    if (project_id !== undefined) {
      setState((prevState) => ({
        ...prevState,
        project_id: project_id
      }));
    }
    let l = [];
    let gridData = [];
    if (project_id !== undefined) {
      l = availableTabsForProject;
    } else {
      l = [
        'circos',
        'onco',
        'lollipop',
        'volcano',
        'heatmap',
        'survival',
        'correlation',
        'cnv',
        'box',
        'fusion',
        'sankey'
      ];
    }

    l.forEach((element) => {
      let desc = '';
      if (element === 'heatmap') {
        desc = (
          <FormattedMessage
            id="Example_mutli_heatmap"
            defaultMessage="represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'cnv' || element === 'CNV') {
        element = 'CNV';
        desc = (
          <FormattedMessage
            id="Example_signle_CNV"
            defaultMessage="visualize copy number variation data on integrated genome viewer"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'onco') {
        element = 'OncoPrint';
        desc = (
          <FormattedMessage
            id="Example_multi_onco"
            defaultMessage="visualize DNA mutations and various omics information of each patient's gene with columns, colors, symbols, etc."
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'circos') {
        desc = (
          <FormattedMessage
            id="Example_multi_circos"
            defaultMessage="visualize seven omics data as a circular layer on a circular chromosome map"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'lollipop') {
        desc = (
          <FormattedMessage
            id="Example_signle_Lollipop"
            defaultMessage=" visualize mutation or phosphorylation of certain gene on a sequence"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'survival') {
        desc = (
          <FormattedMessage
            id="Example_multi_survival"
            defaultMessage="visualize the recurrence/survival probability of patients according to clinical variable or genetic conditions"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'correlation') {
        desc = (
          <FormattedMessage
            id="Example_multi_correlation"
            defaultMessage=" visualize the correlation between RNA expression values and proteome abundance values for a selected gene"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'box') {
        desc = (
          <FormattedMessage
            id="Example_signle_box"
            defaultMessage="visualize the genetic information statistics of the selected gene(s) in the form of boxes"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'fusion') {
        desc = (
          <FormattedMessage
            id="Example_multi_fusion"
            defaultMessage="visualize the number of fusion gene(s) and individual fusion gene for the selected sample group"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'sankey') {
        desc = (
          <FormattedMessage
            id="Example_multi_sankey"
            defaultMessage=" visualize drug relation information of the selected mutations"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      } else if (element === 'volcano') {
        desc = (
          <FormattedMessage
            id="Example_multi_valcano"
            defaultMessage="visualize genes (DEGs) showing significant expression differences between the two groups divided according to clinical conditions"
          >
            {(placeholder) => placeholder}
          </FormattedMessage>
        );
      }
      let gridobj = {
        title: element,
        image: require(`../../../assets/images/Visualizations/${element}.png`).default,
        link: project_id
          ? `/visualise-multidata/${element}/${project_id} `
          : `/visualise-multidata/${element}/`,
        description: desc || ''
      };
      gridData.push(gridobj);
      if (project_id) {
        setTitle({ id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization' });
      } else {
        setTitle({ id: 'VisualizeExampleData', defaultMessage: 'Visualize Example Data' });
      }
    });
    setGridData(gridData);
  }, [availableTabsForProject, chartName]);

  useEffect(() => {
    if (project_id !== undefined) {
      if (state.genes.length > 0) {
        dispatch(samplesCount('POST', { project_id: project_id }));
        dispatch(getBreastKeys(state));
      }
    } else {
      if (state.genes.length > 0) {
        dispatch(samplesCount('POST', {}));
        dispatch(getBreastKeys(state));
      }
    }
  }, [state]);
  const checkPopup = (event) => {
    if (event.target.id === 'clinicalFilterPopover') {
      setFilterPopoverOpen(!isFilterPopoverOpen);
    } else if (event.target.id === 'geneFilterPopover') {
      setIsGeneSetPopoverOpen(!isGeneSetPopoverOpen);
    }
    console.log(isFilterPopoverOpen, isGeneSetPopoverOpen);
    if (isFilterPopoverOpen) {
      setFilterPopoverOpen(false);
    }
    if (isGeneSetPopoverOpen) {
      setIsGeneSetPopoverOpen(false);
    }
    event.stopPropagation();
  };
  useEffect(() => {
    document.body.addEventListener('click', checkPopup);
  }, []);

  useEffect(() => {
    if (BrstKeys) {
      let tmp = [];
      for (const [key, value] of Object.entries(BrstKeys)) {
        tmp.push(
          <option key={key} value={key + '_' + value}>
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

    if (tabName !== 'home' && state?.genes?.length === 0) {
      setBoolChartState(false);
    }
  }, [chart, tabName, state]);

  useEffect(() => {
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx
    }));
  }, [screenCapture]);

  const LoadChart = (w, type) => {
    switch (type) {
      case 'circos':
        return Charts.circos(w, state, screenCapture, setToFalseAfterScreenCapture, toggle, state);
      case 'OncoPrint':
        return Charts.onco(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'lollipop':
        return Charts.lollipop(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'volcano':
        return Charts.volcano(w, state, screenCapture, setToFalseAfterScreenCapture, VFData);
      case 'heatmap':
        return Charts.heatmap(w, state, screenCapture, BrstKeys, setToFalseAfterScreenCapture);
      case 'survival':
        return Charts.survival(
          w,
          state,
          screenCapture,
          setToFalseAfterScreenCapture,
          survialData,
          trasnferSurvivalData
        );
      case 'correlation':
        return Charts.scatter(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'CNV':
        return Charts.igv(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'fusion':
        return Charts.fusion(w, state, screenCapture, setToFalseAfterScreenCapture, VFData);
      case 'box':
        return Charts.box(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'sankey':
        return Charts.sankey(w, state, screenCapture, setToFalseAfterScreenCapture, toggle, state);
      default:
        return false;
    }
  };

  const screen_call = useCallback(() => {
    setToggle(false);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearDataVisualizationState());
    };
  }, []);

  const breadCrumbs = {
    '/visualise-multidata/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      project_id
        ? {
          id: 'MyDataVisualization',
          defaultMessage: 'Visualise My Data',
          to: '/home/visualizeMyData/'
        }
        : {
          id: `VisualizeExampleData`,
          defaultMessage: `Visualize Example Data`,
          to: `/home/visualizeMyExampleData/`
        },
      {
        id: 'MultiDataVisualization',
        defaultMessage: 'Multi Data Visualization',
        to: project_id ? `/visualise-multidata/home/${project_id}` : `/visualise-multidata/home/`
      },
      project_id && {
        id: '  ',
        defaultMessage: userProjectDetails?.name?.substr(
          0,
          userProjectDetails?.name.lastIndexOf('_')
        ),
        to: project_id ? `/visualise-multidata/home/${project_id}` : `/visualise-multidata/home/`
      },
      {
        id: tab !== 'home' ? tab : 'Null',
        defaultMessage: tab !== 'home' ? tab : 'Null',
        to: project_id
          ? `/visualise-multidata/${tabName}/${project_id}`
          : `/visualise-multidata/${tabName}`
      }
    ]
  };

  const [isGeneSetPopoverOpen, setIsGeneSetPopoverOpen] = useState(false);
  const [isFilterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [isSurvivalFilterPopoverOpen, setSurvivalFilterPopoverOpen] = useState(false);
  const [isVolFusFilterPopoverOpen, setVolFusFilterPopoverOpen] = useState(false);

  return (
    <div>
      <HeaderComponent
        title={title}
        routeName="/visualise-multidata/"
        breadCrumbs={breadCrumbs['/visualise-multidata/']}
        type="single"
      />

      <article id="subContents" className="subContents">
        {gridData && !tabName ? (
          <div className="contentsTitle">
            <h3>
              <font>
                <font>
                  {' '}
                  <FormattedMessage id="MultiData" defaultMessage="Multi Data" />{' '}
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
        ) : (
          <div className="contentsTitle">
            <h3>
              <font>
                <span className="colorSecondary">
                  <font>{tabName[0]?.toUpperCase() + tabName?.slice(1)}</font>
                </span>
              </font>
            </h3>
          </div>
        )}

        <div className="ptn">
          <div className="auto">
            <section>
              <div className="PopoverStyles">
                {toggle && (
                  <Popover className="Relative" id="clinicalFilterPopover2">
                    {({ }) => {
                      return (
                        <>
                          <div className="w-full">
                            <Popover.Button
                              className={'selectBox'}
                              onClick={(e) => {
                                setFilterPopoverOpen(!isFilterPopoverOpen);
                                e.stopPropagation();
                              }}
                            >
                              <div className="GeneSetgeneSetButton">
                                <div className="flex-1">
                                  <FormattedMessage
                                    id="ClinicalInfoReFiltering"
                                    defaultMessage="Clinical info. Re-filtering"
                                  />
                                </div>
                                <div className="w-20">
                                  <UserCircleIcon className="filter-icon" />
                                </div>
                              </div>
                            </Popover.Button>

                            <Transition
                              show={isFilterPopoverOpen}
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
                                style={{ height: '450px', overflowY: 'auto' }}
                              >
                                <Filter
                                  parentCallback={callback}
                                  filterState={state['filter']}
                                  set_screen={screen_call}
                                  project_id={project_id}
                                />
                              </Popover.Panel>
                            </Transition>
                          </div>
                        </>
                      );
                    }}
                  </Popover>
                )}

                {!toggle && tabName === 'survival' && (
                  <Popover className="Relative gene_main_box">
                    {({ }) => {
                      return (
                        <>
                          <div className="w-full">
                            <Popover.Button
                              className={'selectBox'}
                              onClick={() =>
                                setSurvivalFilterPopoverOpen(!isSurvivalFilterPopoverOpen)
                              }
                            >
                              <div className="GeneSetgeneSetButton">
                                <div className="flex-1">
                                  <FormattedMessage
                                    id="Clinical Grouping"
                                    defaultMessage="Clinical Grouping"
                                  />
                                </div>
                                <div className="w-20">
                                  <UserCircleIcon className="filter-icon" />
                                </div>
                              </div>
                            </Popover.Button>
                            <Transition
                              show={isSurvivalFilterPopoverOpen}
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel
                                className="SurvivalFilter W100 BorderstyleVizAbs"
                                style={{
                                  maxHeight: '450px',
                                  overflowY: 'scroll',
                                  zIndex: '10',
                                  background: 'white',
                                  width: '140%'
                                }}
                              >
                                <SurvivalFilterComponent
                                  parentCallback={survivalCallback}
                                  filterState={state}
                                  setSurvivalCardData={survivalCardData}
                                />
                              </Popover.Panel>
                            </Transition>
                          </div>
                        </>
                      );
                    }}
                  </Popover>
                )}

                {!toggle && (tabName === 'fusion' || tabName === 'volcano') && (
                  <Popover className="Relative gene_main_box">
                    {({  }) => {
                      return (
                        <>
                          <div className="w-full">
                            <Popover.Button
                              className={'selectBox'}
                              onClick={() => setVolFusFilterPopoverOpen(!isVolFusFilterPopoverOpen)}
                            >
                              <div className="GeneSetgeneSetButton">
                                <div className="flex-1">
                                  <FormattedMessage
                                    id="Clinical Grouping"
                                    defaultMessage="Clinical Grouping"
                                  />
                                </div>
                                <div className="w-20">
                                  <UserCircleIcon className="filter-icon" />
                                </div>
                              </div>
                            </Popover.Button>
                            <Transition
                              show={isVolFusFilterPopoverOpen}
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel
                                className="VFFilter W100 BorderstyleViz"
                                style={{
                                  width: '120%',
                                  position: 'absolute',
                                  maxHeight: '450px',
                                  overflowY: 'scroll',
                                  zIndex: '10',
                                  background: 'white'
                                }}
                              >
                                <VolcanoFusionFilterComponent
                                  parentCallback={volcanoFusionFilterCallback}
                                  tab={tabName}
                                />
                              </Popover.Panel>
                            </Transition>
                          </div>
                        </>
                      );
                    }}
                  </Popover>
                )}

                <Popover className="Relative gene_main_box" id="geneFilterPopover">
                  {({  }) => {
                    return (
                      <>
                        <div className="">
                          <Popover.Button
                            className={'selectBox'}
                            onClick={(e) => {
                              setIsGeneSetPopoverOpen(!isGeneSetPopoverOpen);
                              e.stopPropagation();
                            }}
                          >
                            <div className="GeneSetgeneSetButton">
                              <div className="flex-1">
                                <FormattedMessage
                                  id="GeneSetRe-filtering"
                                  defaultMessage="Gene set Re-filtering"
                                />{' '}
                              </div>
                              <div className="w-20" style={{ backgroundColor: 'white' }}>
                                <span className="filter-icon">
                                  <img src={sample_img} alt="img" />
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
                            <Popover.Panel className="GeneSetPopoverPanel" id="GeneSetPopverChild">
                              <GeneSet parentCallback={callback} filterState={state} />
                            </Popover.Panel>
                          </Transition>
                        </div>
                      </>
                    );
                  }}
                </Popover>

                {project_id && (
                  <Popover className="relative gene_main_box capture">
                    {({  }) => {
                      return (
                        <>
                          <div className="">
                            <Popover.Button className={'button'}>
                              <div>
                                <button
                                  onClick={() => setToFalseAfterScreenCapture(true)}
                                  className="btn btnPrimary"
                                >
                                  <FormattedMessage
                                    id="Capture_screen"
                                    defaultMessage="Capture Screenshot"
                                  />
                                </button>
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
            {gridData && !tabName && (
              <div className="mainContentsBox" style={{ marginTop: '50px' }}>
                <div className="galleryList">
                  <ul
                    className={`justify-content-${Object.keys(gridData).length > 2 ? 'start' : 'center'
                      }`}
                  >
                    {gridData.map((item, index) => {
                      return (
                        <li key={index} className="listitems">
                          <Link to={item.link}>
                            <div className="thumb">
                              <img src={item.image} alt="img" />
                              <div className="hvBox">
                                <div className="hvBox_links">
                                  {project_id ? (
                                    <>
                                      <Link to={item.link}>
                                        <div className="textdiv">
                                          <span>
                                            <FormattedMessage
                                              id="DownloadManual"
                                              defaultMessage="Download Manual"
                                            />
                                          </span>
                                          <img src={arrow_icon} alt="arrow-icon" />
                                        </div>
                                      </Link>
                                      <Link to={item.link}>
                                        <div className="textdiv">
                                          <span>
                                            <FormattedMessage
                                              id="RunAnalysis"
                                              defaultMessage="Run Analysis"
                                            />
                                          </span>
                                          <img src={arrow_icon} alt="arrow-icon" />
                                        </div>
                                      </Link>{' '}
                                    </>
                                  ) : (
                                    <Link to={item.link}>
                                      <div className="textdiv">
                                        <span>
                                          <FormattedMessage id="Example" defaultMessage="Example" />
                                        </span>
                                        <img src={arrow_icon} alt="arrow-icon" />
                                      </div>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="txtBox txtBoxpadding tac Relative">
                              <dl className="MarginTop8">
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
            )}
          </div>

          <section className="auto">
            <div
              id="tab-contents"
              style={{ display: 'block', textAlign: 'center' }}
              ref={elementRef}
            >
              {tabName && tabName !== 'home' && boolChartState && (
                <div className="">{chart['viz']}</div>
              )}
              {tabName && (
                <div style={{ marginTop: '50px' }}>
                  <button
                    className="btn btnPrimary"
                    style={{ float: 'right', margin: '10px 0px 10px 0px' }}
                    onClick={() =>
                      project_id
                        ? history.push(`/visualise-multidata/home/${project_id}`)
                        : history.push(`/visualise-multidata/home/`)
                    }
                  >
                    <FormattedMessage id="Back" defaultMessage="Back" />
                  </button>
                </div>
              )}

              {tabName && tabName !== 'home' && !boolChartState && (
                <div className="MultiDataVizErrorMessage">
                  <FormattedMessage id="PleaseSelectGenes" defaultMessage="Please Select Genes" />
                </div>
              )}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
