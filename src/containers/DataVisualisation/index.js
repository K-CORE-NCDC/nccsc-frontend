import { Popover, Transition } from '@headlessui/react';
import { CogIcon, FilterIcon } from '@heroicons/react/outline';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  clearDataVisualizationState,
  getBreastKeys,
  getUserDataProjectsTableData,
  getUserDefinedFilter,
  samplesCount
} from '../../actions/api_actions';
import Filter from '../Common/filter';
import { Charts } from '../DataVisualisation/Charts';
import GeneSet from '../UserDataVisualization/Components/MainComponents/GeneSet';

export default function DataVisualization() {
  const elementRef = useRef(null);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [chart, setCharts] = useState({ viz: [] });
  const [boolChartState, setBoolChartState] = useState(true);
  const [state, setState] = useState({ genes: [], filter: {}, type: '' });
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [gridData, setGridData] = useState([]);
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
  const setToFalseAfterScreenCapture = (param = false) => {
    if (param === false) {
      setScreenCapture(false);
    } else {
      setScreenCapture(true);
    }
  };

  const submitFilter = () => {
    setBoolChartState(false);
    setChartName(tabName);
    let chartx = LoadChart(width, tabName);
    setCharts((prevState) => ({
      ...prevState,
      viz: chartx
    }));
  };

  const callback = useCallback(({ filters, value, genes }) => {
    if (filters) {
      setState((prevState) => ({
        ...prevState,
        filter: filters
      }));
      setfilterApplied(true);
    } else if (value && genes) {
      setState((prevState) => ({
        ...prevState,
        genes: genes,
        type: value
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
    if (chartName) {
      submitFilter();
    }
    let t = ['volcano', 'survival', 'fusion'];
    if (t.indexOf(tabName) !== -1) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [tab, tabName, chartName]);

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
    // setBoolChartState(false);
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
        'fusion'
      ];
    }

    l.forEach((element) => {
      if (element === 'heatmap') {
      } else if (element === 'cnv') {
        element = 'CNV';
      } else if (element === 'onco') {
        element = 'OncoPrint';
      }

      let gridobj = {
        title: element,
        image: require(`../../assets/images/Visualizations/${element}.png`).default,
        link: `/visualise-multidata/${element}/${project_id}`
      };
      gridData.push(gridobj);
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
  }, [tabName, state]);

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
  }, [chart]);

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
        return Charts.volcano(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'heatmap':
        return Charts.heatmap(w, state, screenCapture, BrstKeys, setToFalseAfterScreenCapture);
      case 'survival':
        return Charts.survival(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'correlation':
        return Charts.scatter(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'CNV':
        return Charts.igv(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'fusion':
        return Charts.fusion(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'box':
        return Charts.box(w, state, screenCapture, setToFalseAfterScreenCapture);
      default:
        return false;
    }
  };

  const screen_call = useCallback(() => {
    setToggle(false);
  }, []);

  useEffect(() => {
    document.addEventListener.click = checkPopup;
    return () => {
      dispatch(clearDataVisualizationState());
    };
  }, []);
  const checkPopup = (event) => {
    console.log(event);
  };

  return (
    <div>
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font>
                <FormattedMessage id="MultiData" defaultMessage="MultiData" />{' '}
              </font>
              <span className="colorSecondary">
                <font>
                  <FormattedMessage id="Visualization" defaultMessage="Visualization" />
                </font>
              </span>
            </font>
          </h3>
        </div>
        <div>
          <div>
            <div className="Flex">
              <div className="FilterGeneSet">
                <Popover className="Relative" title="ClinicalFilter">
                  {() => {
                    return (
                      <>
                        <Popover.Button id="filterPopover">
                          <div className="GeneSetgeneSetButton">
                            <div className="flex-1">Clinical info. Re-filtering</div>
                            <div className="w-20">
                              <CogIcon className="filter-icon" />
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
                            <div className="FilterDiv">
                              <Filter
                                parentCallback={callback}
                                filterState={state['filter']}
                                set_screen={screen_call}
                                project_id={project_id}
                              />
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    );
                  }}
                </Popover>

                <Popover className="Relative" style={{ margin: 'auto' }}>
                  {() => {
                    return (
                      <>
                        <div>
                          <Popover.Button>
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
                    );
                  }}
                </Popover>
              </div>
            </div>
            {gridData && !tabName && (
              <div className="dataList">
                <ul>
                  {gridData.map((item, index) => (
                    <li key={index}>
                      <div className="labelBox">
                        <div className="labels01">
                          <h3 style={{ textTransform: 'capitalize' }}>{item.title}</h3>
                        </div>
                        <div className="labels02" style={{ columnGap: '10px' }}>
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
