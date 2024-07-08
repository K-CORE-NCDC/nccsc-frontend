import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VolcanoCmp from '../../Common/Volcano';
import NoContentMessage from '../../Common/NoContentComponent';
import { getClinicalMaxMinInfo, VolcanoPlotInfo } from '../../../actions/api_actions';
import LoaderCmp from '../../Common/Loader';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';

export default function DataVolcono({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
  VFData
}) {
  const reference = useRef();
  const dispatch = useDispatch();
  const [volcanoJson, setVolcanoJson] = useState();
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );

  const history = useHistory();
  let { project_id } = useParams();
  const [watermarkCss, setWatermarkCSS] = useState('');
  const [loader, setLoader] = useState(false);
  const [negativeData, setNegativeData] = useState();
  const [positiveData, setPositiveData] = useState();
  const [tabCount, setTabCount] = useState();
  const [showVolcano, setShowVolcano] = useState(false);
  const [noContent, setNoContent] = useState(false);
  const [sampleCount, setSampleCount] = useState({});
  const [inputState, setInputState] = useState({});
  const [groupFilters, setGroupFilters] = useState({});
  const [volcanoType, setVolcanoType] = useState('transcriptome');
  const [proteomeValue, setProteomeValue] = useState('N');

  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      if (project_id === undefined) {
        dispatch(getClinicalMaxMinInfo('GET', {}));
      }
    }
  }, []);

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData, ...VFData }));
    }
    if ('groupFilters' in VFData) {
      setGroupFilters(VFData['groupFilters']);
    }
    if ('volcanoType' in VFData) {
      setVolcanoType(VFData['volcanoType']);
    }
    if ('proteomeValue' in VFData) {
      setProteomeValue(VFData['proteomeValue']);
    }
    if ('setUserDefienedFilter' in VFData) {
      setUserDefienedFilter(VFData['setUserDefienedFilter']);
    }
  }, [inputData, VFData]);

  useEffect(() => {
    if (inputState && 'genes' in inputState) {
      if (
        inputState.type !== '' &&
        groupFilters &&
        Object.keys(groupFilters).length > 0 &&
        proteomeValue !== 'NT'
      ) {
        setLoader(true);
        if ('volcanoProteomeType' in inputState) {
          delete inputState['volcanoProteomeType'];
        }
        if (volcanoType === 'proteome') {
          inputState['volcanoProteomeType'] = proteomeValue;
        }
        let return_data = VolcanoPlotInfo('POST', { ...inputState, filterGroup: groupFilters });
        return_data
          .then((result) => {
            const d = result;
            if (d.status === 200) {
              let r_ = d['data'];
              r_['status'] = 200;
              setVolcanoJson(r_);
            } else {
              setVolcanoJson();
            }
          })
          .catch(() => {
            setVolcanoJson();
            history.push('/notfound');
          });
      } else if (proteomeValue === 'NT') {
        submitProteomeNT();
      }
    }
  }, [inputState]);

  useEffect(() => {
    if (volcanoJson) {
      setTimeout(function () {
        setLoader(false);
      }, 4000);

      let negative = [];
      let positive = [];
      let negativeCount = 0;
      let positiveCount = 0;
      if ('table_data' in volcanoJson) {
        volcanoJson['table_data'].forEach((item) => {
          let log2foldchange = parseFloat(item['log2(fold_change)']);
          if (log2foldchange <= -1.5) {
            negativeCount += 1;
            negative.push({
              'Gene Name': item['gene'],
              'Log2FC': parseFloat(item['log2(fold_change)']),
              '-Log(Pvalue)': item['p_value'],
              'FDR': item['fdr']
            });
          } else if (log2foldchange >= 1.5) {
            positiveCount += 1;
            positive.push({
              'Gene Name': item['gene'],
              'Log2FC': parseFloat(item['log2(fold_change)']),
              '-Log(Pvalue)': item['p_value'],
              'FDR': item['fdr']
            });
          }
        });
      }

      setTabCount({
        negative: negativeCount,
        positive: positiveCount
      });

      setNegativeData(negative);
      setPositiveData(positive);
    }
  }, [volcanoJson]);

  useEffect(() => {
    if (volcanoJson && volcanoJson.status === 200) {
      if (volcanoJson && Object.keys(volcanoJson).length > 0) {
        setSampleCount(volcanoJson.samples);
        setShowVolcano(true);
        setNoContent(false);
        let sampleCountsCard_ = [];

        if (sampleCount && Object.keys(sampleCount).length > 0) {
          Object.keys(sampleCount).map((e) =>
            sampleCountsCard_.push(
              <div
                key={e}
                className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue"
              >
                Group {e} : {sampleCount[e]}
              </div>
            )
          );
        }
      } else {
        setShowVolcano(false);
        setNoContent(true);
      }
    } else if (volcanoJson && 'status' in volcanoJson && volcanoJson.status !== undefined) {
      setShowVolcano(false);
      setNoContent(true);
    }
  }, [volcanoJson]);

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS('watermark');
    } else {
      setWatermarkCSS('');
    }

    if (watermarkCss !== '' && screenCapture) {
      setToFalseAfterScreenCapture();
    }
  }, [screenCapture, watermarkCss]);

  const submitProteomeNT = () => {
    setLoader(true);
    inputState['volcanoProteomeType'] = proteomeValue;
    if (project_id === undefined) {
      let return_data = VolcanoPlotInfo('POST', { ...inputState, filterGroup: groupFilters });
      return_data
        .then((result) => {
          const d = result;
          if (d.status === 200) {
            let r_ = d['data'];
            r_['status'] = 200;
            setVolcanoJson(r_);
          } else {
            setVolcanoJson({ status: 204 });
          }
        })
        .catch(() => {
          setVolcanoJson({ status: 204 });
          history.push('/notfound');
        });
    } else {
      let return_data = VolcanoPlotInfo('POST', { ...inputState, filterGroup: groupFilters });
      return_data
        .then((result) => {
          const d = result;
          if (d.status === 200) {
            let r_ = d['data'];
            r_['status'] = 200;
            setVolcanoJson(r_);
          } else {
            setVolcanoJson({ status: 204 });
          }
        })
        .catch(() => {
          setVolcanoJson({ status: 204 });
          history.push('/notfound');
        });
    }
  };

  return (
    <>
      {loader ? (
        <div className="MarginTop4">
          <LoaderCmp />
        </div>
      ) : (
        <>
          {noContent && (
            <div className="MarginTop4">
              <NoContentMessage />
            </div>
          )}

          {inputData && inputData.genes.length === 0 && (
            <p className="MarginTop4">
              {' '}
              <FormattedMessage
                id="PleaseSelecttheGeneSetData"
                defaultMessage="Please Select the Gene Set Data"
              />{' '}
            </p>
          )}

          {groupFilters &&
            Object.keys(groupFilters).length === 0 &&
            proteomeValue &&
            proteomeValue !== 'NT' && (
              <p className="MarginTop4">
                <FormattedMessage
                  id="PleaseSelectFilterData"
                  defaultMessage="Please Select the Filter Data"
                />
              </p>
            )}

          <div className="MarginTop20">
            <div className="OverFlowXHide">
              {showVolcano && (
                <VolcanoCmp
                  watermarkCss={watermarkCss}
                  ref={reference}
                  w={width}
                  data={volcanoJson['d3_response']}
                  negative_data={negativeData}
                  positive_data={positiveData}
                  tab_count={tabCount}
                  tableData={volcanoJson['table_data']}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
