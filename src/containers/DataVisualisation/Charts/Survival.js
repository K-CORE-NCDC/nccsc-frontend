import React, { Fragment,useEffect, useRef,useCallback, useState,lazy,Suspense } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { FormattedMessage } from 'react-intl';
import { useLocation, useParams } from 'react-router-dom';
import { SurvivalInformation,getUserDefinedFilter } from '../../../actions/api_actions';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import SurvivalCmp from '../../Common/Survival';
import inputJson from '../../Common/data';
import Table from '../../Common/Table/ReactTable';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
export default function DataSurvival({
  width,
  screenCapture,
  setToFalseAfterScreenCapture,
  survialData
}) {
  const dispatch = useDispatch();
  const route = useLocation();
  const reference = useRef();
  const [inputState, setInputState] = useState({});
  const [survivalJson, setSurvivalJson] = useState({});
  const [pValueData, setPvalueData] = useState('');
  const [loader, setLoader] = useState(true);
  const [renderSurvival, setRenderSurvival] = useState(false);
  const [renderNoContent, setRenderNoContent] = useState(false);
  const [coxTable, setCoxTable] = useState([]);
  const [watermarkCss, setWatermarkCSS] = useState('');
  const [vizType, setVizType] = useState('');
  const [singelSurvialType, setSingelSurvialType] = useState('recurrence');
  const [survialType, setSurvialType] = useState('recurrence');
  const [isSurvivalFilterPopoverOpen, setSurvivalFilterPopoverOpen] = useState(false);
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  let { project_id } = useParams();

  const [SVFState, setSVFState] = useState(project_id ? 'dynamic' : 'static');
  let SurvivalFilterComponent;


  if (vizType === 'single'){
    SurvivalFilterComponent = lazy(() => import('../../UserDataVisualization/Components/MainComponents/SurvivalFilterComponent'));
  }

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS('watermark');
    } else {
      setWatermarkCSS('');
    }

    if (watermarkCss !== '' && screenCapture) {
      if (reference?.current) {
        setIsTakingScreenshot(true);
        exportComponentAsJPEG(reference, {
          fileName: 'Survival',
          html2CanvasOptions: {}
        }).then(() => {
          setIsTakingScreenshot(false);
          setToFalseAfterScreenCapture();
        }).catch((err) => {
          console.error('Screenshot error:', err);
          setIsTakingScreenshot(false);
        });
      }
    }
  }, [screenCapture, watermarkCss]);

  useEffect(() => {
    if (
      route.pathname.includes('visualise-singledata') ||
      route.pathname.includes('visualizesingle-exampledata')
    ) {
      setVizType('single');
      callSingleSurvial('recurrence');
    } else {
      setVizType('multi');
    }
  }, [route.pathname]);

  let callSingleSurvial = (survivalType,groupFilter) => {
    setSingelSurvialType(survivalType);
    setSurvialType(survivalType)
    let staticSurvivalData = {};
    staticSurvivalData['filterType'] = 'dynamic';
    staticSurvivalData['survival_type'] = survivalType;
    staticSurvivalData['filter_gene'] = '';
    staticSurvivalData['gene_database'] = 'dna_mutation';
    staticSurvivalData['group_filters'] = groupFilter;
    staticSurvivalData['clinical'] = true;
    staticSurvivalData['project_id'] = project_id;
    setInputState((prevState) => ({ ...prevState, ...staticSurvivalData }));
  };

  let check = (d) => {
    let check = false;
    for (let key in d['sample_counts']) {
      if (d['sample_counts'][key] !== 0) {
        check = true;
      }
    }
    return check;
  };

  useEffect(() => {
    let projectdata = { "project_id": project_id }
    setInputState((prevState) => ({ ...prevState, ...survialData, ...projectdata }));

    if (survialData && 'survival_type' in survialData) {
      setSurvialType(survialData['survival_type'])
    }
  }, [survialData]);

  useEffect(() => {
    if (((vizType !== 'single' || vizType === 'single') && 'survival_type' in inputState)) {
      let return_data = SurvivalInformation('POST', inputState);
      return_data
        .then((result) => {
          const d = result;
          if (
            d.status === 200 &&
            'data' in d &&
            'survival_type' in inputState &&
            (inputState['survival_type'] === 'survival' ||
              inputState['survival_type'] === 'recurrence') &&
            check(d['data'])
          ) {
            let r_ = d['data'];
            r_['status'] = 200;
            setSurvivalJson(r_);
            setRenderNoContent(false);
            setRenderSurvival(true);
          } else if (
            d.status === 200 &&
            'data' in d &&
            'survival_type' in inputState &&
            inputState['survival_type'] === 'cox'
          ) {
            let r_ = d['data'];
            r_['status'] = 200;
            setSurvivalJson(r_);
            setRenderNoContent(false);
            setRenderSurvival(true);
          } else {
            setRenderNoContent(true);
            setSurvivalJson({ status: d.status });
            setRenderSurvival(false);
          }
        })
        .catch(() => {
          setSurvivalJson({ status: 204 });
        });
    }

    if (
      renderNoContent || (vizType !== 'single' && inputState &&
        ('group_filters' in inputState === false || (inputState['survival_type'] === 'cox' &&
          'coxFilter' in inputState === false)))
    ) {
      setRenderSurvival(false);
    } else if (
      vizType === 'single' && (renderNoContent)) {
      setRenderSurvival(false);
    }
  }, [inputState]);

  useEffect(() => {
    setTimeout(function () {
      setLoader(false);
    }, 1000);
    if (
      inputState['survival_type'] === 'recurrence' || inputState['survival_type'] === 'survival') {

      if (survivalJson && survivalJson.sample_counts) {
        const sampleCountsObject = survivalJson.sample_counts;
        let htmlArray = [];
        if (Object.keys(sampleCountsObject).length > 0) {
          Object.keys(sampleCountsObject).forEach((e) => {
            htmlArray.push(
              <div key={e} className="SurvivalSampleCount">
                <FormattedMessage id={e} defaultMessage={e} /> {`: ${sampleCountsObject[e]}`}
              </div>
            );
          });
        }
        if (htmlArray.length > 1) {
          if (survivalJson.pvalue !== 0) {
            setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`);
          }
        } else {
          if (survivalJson.pvalue !== 0) {
            setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`);
          }
        }
      }
    }
    else if (inputState['survival_type'] === 'cox') {
      if (survivalJson && 'errorMessage' in survivalJson === false) {
        let inputDataJson = {};
        if (project_id) {
          if (
            inputState['coxUserDefinedFilter'] &&
            Object.keys(inputState['coxUserDefinedFilter']).length > 0
          ) {
            for (const a in inputState['coxUserDefinedFilter']) {
              if (a !== 'rlps_yn' && a !== 'rlps_cnfr_drtn') {
                if (
                  'value' in inputState['coxUserDefinedFilter'][a][0] &&
                  inputState['coxUserDefinedFilter'][a][0]['value'] !== 'yes' &&
                  'value' in inputState['coxUserDefinedFilter'][a][0] &&
                  inputState['coxUserDefinedFilter'][a][0]['value'] !== 'no'
                ) {
                  continue;
                } else {
                  inputDataJson[a] = a;
                }
              }
            }
          }
        } else {
          for (let z = 0; z < inputJson['filterChoices'].length; z++) {
            inputDataJson[inputJson['filterChoices'][z]['id']] =
              inputJson['filterChoices'][z]['name'];
          }
        }

        let tmp = [];
        let columns = survivalJson && 'columns' in survivalJson && survivalJson['columns'];
        let data = survivalJson && 'data' in survivalJson && JSON.parse(survivalJson['data']);
        let cf = survivalJson && 'clinical_filter' in survivalJson && survivalJson['clinical_filter'];
        let image = survivalJson && 'image' in survivalJson && survivalJson['image'];
        let trow = [];
        let temptrow = []
        if (cf) {
          for (let c = 0; c < cf.length; c++) {
            let obj = {}
            let col = cf[c];
            obj["name"] = col
            temptrow.push(obj)
          }
        }

        if (temptrow?.length > 0) {
          let _sampleData = [...temptrow]
          for (let rowname in _sampleData) {
            let _obj = { ..._sampleData[rowname] }
            Object.entries(data)?.forEach((key) => {
              let _name = _obj["name"]
              _obj[key[0]] = key[1][_name]?.toFixed(2)
            })
            trow.push({ ..._obj })
          }
        }


        tmp.push(
          <div className="Flex FlexDirCol" key={'cox'}>
            {/* Coefficient Table */}

            <h3 className="BorderBottom1 BorderGray200 P4" style={{ textAlign: 'center' }}>
              <FormattedMessage id="Co-efficientTable" defaultMessage="Co-efficient Table" />
            </h3>
            {columns?.length &&
              <Table
                columns={getColumns(columns)}
                data={trow}
                width={"1650"}
              />}


            {/* Confidence Intreval Plot */}
            <h3 className="BorderBottom1 BorderGray200 P8" style={{ textAlign: 'center' }}>
              <FormattedMessage
                id="ConfidenceIntervalPlot"
                defaultMessage="Confidence Interval Plot"
              />
            </h3>
            <div className="WFull">
              <img alt="box-plot" width="960" src={'data:image/png;base64,' + image} />
            </div>
          </div>
        );
        setCoxTable(tmp);
      }
      else {
        let tmp = [];
        tmp.push(
          <div className="Flex FlexDirCol" key={'cox'}>
            <h3 className="BorderBottom1 BorderGray200 P4" style={{ textAlign: 'center' }}>
              {survivalJson['errorMessage']}
            </h3>
          </div>
        )
        setCoxTable(tmp);
      }
    }
  }, [survivalJson]);


  useEffect(() => {
    if (project_id ) {
      dispatch(getUserDefinedFilter({ project_id: project_id }));
    }
  }, [project_id])


  const getColumns = (columns) => {
    if (columns) {
      let _array = []
      _array.push(
        {
          Header: "Name",
          accessor: (row) => row?.name
        }
      )
      for (let c = 0; c < columns.length; c++) {
        let obj = {}
        obj["Header"] = columns[c]
        obj["accessor"] = columns[c]
        _array.push(obj)
      }

      return _array
    }
  }

  const survivalCallback = useCallback(({ updatedState }) => {
    if(updatedState['survival_type']==='cox'){
      setInputState((prevState)=>({...prevState,...updatedState}))
    }else{
      callSingleSurvial(updatedState['survival_type'],updatedState['group_filters'])
    }
    setSVFState(updatedState?.filterType || 'static')
    setSurvivalFilterPopoverOpen(false);
  },[])
  return (
    <>
      {loader || isTakingScreenshot ? (
        <div className="MarginTop20 Flex JustifyCenter" style={{ margin: 'auto' }}>
          <LoaderCmp
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          />
        </div>
      ) : (
        <>
          {renderNoContent && (
            <div className="MarginTop4">
              <NoContentMessage />
            </div>
          )}
          {/*
          {vizType !== 'single' &&
            inputState &&
            (inputState['survival_type'] === 'cox' && !inputState['coxFilter']) && (
              <p className="MarginTop4">
                <FormattedMessage
                  id="PleaseSelectFilterData"
                  defaultMessage="Please Select Filter Data"
                />
              </p>
            )} */}

          {inputState &&
            (
              Object.keys(inputState)?.length === 1 ||
              (
                (inputState['survival_type'] === 'cox' && !inputState['coxFilter']) ||
                (
                  inputState['survival_type'] !== 'cox' &&
                  (
                    (inputState['clinical'] === true && !inputState['group_filters']) ||
                    (inputState['clinical'] === false && inputState['filter_gene'] === '')
                  )
                )
              )
            ) && (
              <p className="MarginTop4">
                <FormattedMessage
                  id="PleaseSelectFilterData"
                  defaultMessage="Please Select Filter Data"
                />
              </p>
            )
          }



          {vizType && vizType === 'single' && (
            <div className="Flex Gap2 FitContent M4">
              <Popover className="Relative gene_main_box">
                {({ }) => {
                  return (
                    <>
                      <div className="w-full">
                        <Popover.Button
                          className={'selectBox'}
                          onClick={() => setSurvivalFilterPopoverOpen(!isSurvivalFilterPopoverOpen)}
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

                        {isSurvivalFilterPopoverOpen && <Transition
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
                              maxHeight: '350px',
                              overflowY: 'scroll',
                              zIndex: '10',
                              background: 'white',
                              width: '120%'
                            }}
                          >
                            <Suspense >
                              <SurvivalFilterComponent
                                parentCallback={survivalCallback}
                                filterState={inputState}
                                survialData={survialData}
                                SVFState={SVFState}
                                SurvivalType = 'single'
                              />
                            </Suspense>

                          </Popover.Panel>
                        </Transition>
                        }
                      </div>
                    </>
                  );
                }}
              </Popover>
            </div>
          )}

          {/* chart */}
          {renderSurvival && (
            <div className="BorderstyleViz">
              {survivalJson &&
                (inputState['survival_type'] === 'recurrence' ||
                  inputState['survival_type'] === 'survival') && (
                  <>
                    <div id="tootltip_survival" className="svg-line-chart-tooltip-custom"></div>
                    <SurvivalCmp
                      watermarkCss={watermarkCss}
                      ref={reference}
                      width={width}
                      data={{
                        fileredGene: inputState['filter_gene'],
                        survivalJson: survivalJson
                      }}
                      pValue={pValueData}
                      survialType={survialType}
                    />
                  </>
                )}

              {inputState['survival_type'] === 'cox' && (
                <>
                  <div ref={reference}>{coxTable}</div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

