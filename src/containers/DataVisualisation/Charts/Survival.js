import React, { useEffect, useRef, useState } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { FormattedMessage } from 'react-intl';
import { useLocation, useParams } from 'react-router-dom';
import { SurvivalInformation } from '../../../actions/api_actions';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import SurvivalCmp from '../../Common/Survival';
import inputJson from '../../Common/data';
import Table from '../../Common/Table/ReactTable';

export default function DataSurvival({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
  survialData
}) {
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

  let { project_id } = useParams();

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS('watermark');
    } else {
      setWatermarkCSS('');
    }

    if (watermarkCss !== '' && screenCapture) {
      if (reference !== null) {
        exportComponentAsJPEG(reference, {
          fileName: 'Survival',
          html2CanvasOptions: {}
        });
      }
      setToFalseAfterScreenCapture();
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

  let callSingleSurvial = (survivalType) => {
    setSingelSurvialType(survivalType);
    let staticSurvivalData = {};
    staticSurvivalData['filterType'] = 'dynamic';
    staticSurvivalData['survival_type'] = survivalType;
    staticSurvivalData['filter_gene'] = '';
    staticSurvivalData['gene_database'] = 'dna_mutation';
    staticSurvivalData['group_filters'] = {};
    staticSurvivalData['clinical'] = true;
    setInputState((prevState) => ({ ...prevState, ...inputData, ...staticSurvivalData }));
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
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData, ...survialData }));
    }
  }, [inputData, survialData]);

  useEffect(() => {
    if (
      inputState &&
      'genes' in inputState &&
      ((vizType !== 'single' && inputState['genes'].length > 0) || vizType === 'single') &&
      'survival_type' in inputState
    ) {
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
      renderNoContent ||
      (inputData && inputData.genes.length === 0) ||
      (vizType !== 'single' &&
        inputState &&
        ('group_filters' in inputState === false ||
          (inputState['survival_type'] === 'cox' && 'coxFilter' in inputState === false)))
    ) {
      setRenderSurvival(false);
    } else if (
      vizType === 'single' &&
      (renderNoContent || (inputData && inputData.genes.length === 0))
    ) {
      setRenderSurvival(false);
    }
  }, [inputState]);

  useEffect(() => {
    setTimeout(function () {
      setLoader(false);
    }, 1000);
    if (
      inputState['survival_type'] === 'recurrence' ||
      inputState['survival_type'] === 'survival'
    ) {
      if (survivalJson && survivalJson.sample_counts) {
        const sampleCountsObject = survivalJson.sample_counts;
        // let totalCount = 0;
        let htmlArray = [];
        if (Object.keys(sampleCountsObject).length > 0) {
          Object.keys(sampleCountsObject).forEach((e) => {
            // totalCount += sampleCountsObject[e];
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
    } else if (inputState['survival_type'] === 'cox') {
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
          {/* <div
            key={'ci'}
            className="Flex FlexDirCol MarginTop20 Backgroundwhite  TextLeft  ShadowLarge WFull"
          > */}
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
        // </div>
      );
      setCoxTable(tmp);
    }
  }, [survivalJson]);

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

  return (
    <>
      {loader ? (
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

          {inputData && vizType !== 'single' && inputData.genes.length === 0 && (
            <p className="MarginTop4">
              {' '}
              <FormattedMessage
                id="PleaseSelecttheGeneSetData"
                defaultMessage="Please Select the Gene Set Data"
              />{' '}
            </p>
          )}

          {vizType !== 'single' &&
            inputState &&
            ((inputState['survival_type'] !== 'cox' && 'group_filters' in inputState === false) ||
              (inputState['survival_type'] === 'cox' && 'coxFilter' in inputState === false)) && (
              <p className="MarginTop4">
                <FormattedMessage
                  id="PleaseSelectFilterData"
                  defaultMessage="Please Select Filter Data"
                />
              </p>
            )}

          {vizType && vizType === 'single' && (
            <div className="Flex Gap2 FitContent M4">
              <button
                onClick={() => {
                  callSingleSurvial('recurrence');
                }}
                className={
                  singelSurvialType === 'recurrence'
                    ? 'SurvivalSelectedCss btn btnPrimary MAuto on'
                    : 'SurvivalNonSelectedCss btn MAuto'
                }
              >
                Recurrence
              </button>

              <button
                onClick={() => {
                  callSingleSurvial('survival');
                }}
                className={
                  singelSurvialType === 'survival'
                    ? 'SurvivalSelectedCss btn btnPrimary MAuto on'
                    : 'SurvivalNonSelectedCss btn MAuto'
                }
              >
                Survival
              </button>
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
