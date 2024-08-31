import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OncoInformation } from '../../../actions/api_actions';
import '../../../styles/css/onco.css';
import { Context } from '../../../wrapper';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import OncoCmp from '../../Common/Onco';
import inputJson from '../../Common/data';

export default function DataOnco({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture
}) {
  const reference = useRef();
  const [oncoJson, setOncoJson] = useState({ status: 204 });
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const filterData = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);
  const [activeCmp, setActiveCmp] = useState(false);
  const [chartData, setChartData] = useState({});
  const [inputState, setInputState] = useState({});
  const [watermarkCss, setWatermarkCSS] = useState('');
  const [loader, setLoader] = useState(false);
  const tableData = '';
  let tableCount;
  const [showOnco, setShowOnco] = useState(false);
  const [noContent, setNoContent] = useState(true);
  const [noGeneData, setNoGeneData] = useState(true);
  const [optionChoices, setOptionChoices] = useState([]);
  const [option, setOption] = useState([]);
  let { project_id } = useParams();
  const [Filter,setFilter] =useState({
    "z_score_up_prot": 1.5,
    "z_score_down_prot": 0.5,
    "z_score_up_rna": 1,
    "z_score_down_rna": -1,
    "cn_up_value": 3,
    "cn_equal_value": 2,
    "cn_down_value": 1,
  })
  const [customFilterJson, setCustomFilterJson] = useState([]);

  useEffect(() => {
    if (context['locale'] === 'kr-KO') {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  }, [context]);

  useEffect(() => {
    if (inputJson['filterChoices']) {
      if (project_id !== undefined) {
        if (filterData && filterData.status === 200) {
          let filters = filterData['filterJson'];
          filters = filters['Clinical Information'];
          let tmp = [];
          for (const key in filters) {
            if (filters[key].length > 0) {
              if (filters[key][0]['type'] !== 'number') {
                tmp.push({ name: key, id: key });
              }
            }
          }
          setOptionChoices(tmp);
          setCustomFilterJson(tmp);
        }
      } else {
        if (koreanlanguage) {
          if (inputJson['filterChoicesKorean']) {
            let f = inputJson['filterChoicesKorean'];
            setOptionChoices(f);
          }
        } else {
          if (inputJson['filterChoices']) {
            let f = inputJson['filterChoices'];
            setOptionChoices(f);
          }
        }
      }
    }
  }, [koreanlanguage, filterData, project_id]);

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setActiveCmp(false);
      setInputState((prevState) => ({ ...prevState, ...inputData }));
    }
  }, [inputData]);

  useEffect(() => {
    if (inputState && 'genes' in inputState) {
      setActiveCmp(false);
      if (inputState.type !== '' && inputState.genes.length > 0) {
        setLoader(true);
        let dataJson = inputState;
        let return_data = OncoInformation('POST', dataJson);
        return_data
          .then((result) => {
            const d = result;
            if (d.status === 200) {
              let r_ = d['data'];
              r_['status'] = 200;
              setOncoJson(r_);
            } else {
              setOncoJson({ status: 204 });
            }
          })
          .catch(() => {
            setOncoJson({ status: 204 });
          });
        setNoGeneData(false);
      } else {
        setNoGeneData(true);
      }
    }
  }, [inputState]);

  useEffect(() => {
    if (oncoJson && oncoJson.status === 200) {
      setChartData((prevState) => ({
        ...prevState,
        ...oncoJson
      }));
      setActiveCmp(true);
      let gData = 'geneData' in oncoJson ? oncoJson['geneData'] : {};
      let cData = 'clinicalData' in oncoJson ? oncoJson['clinicalData'] : {};
      let final = {};
      let mutant_ = cData && 'mutCategory' in cData && cData['mutCategory'];

      mutant_.forEach((g) => {
        let sample_id = g['sample'];
        final[sample_id] = g['val'];
      });

      gData.forEach((g_s) => {
        let d_ = g_s['data'];
        d_.forEach((item) => {
          let s_id = item['sample'];
          let regulation = item['regulation'];
          let proteome = item['protein'];
          if (s_id in final) {
            if ('mRNA Upregulation' in final[s_id]) {
              if (regulation === 'up') {
                final[s_id]['mRNA Upregulation'] += 1;
                final[s_id]['mRNA Downregulation'] = 0;
              } else {
                final[s_id]['mRNA Upregulation'] = 0;
                final[s_id]['mRNA Downregulation'] += 1;
              }

              if (proteome === 'up') {
                final[s_id]['Proteome Up regulation'] += 1;
                final[s_id]['Proteome Downregulation'] = 0;
              } else {
                final[s_id]['Proteome Up regulation'] = 0;
                final[s_id]['Proteome Downregulation'] += 1;
              }
            } else {
              if (regulation === 'up') {
                final[s_id]['mRNA Up regulation'] = 1;
                final[s_id]['mRNA Down regulation'] = 0;
              } else if (regulation === 'down') {
                final[s_id]['mRNA Up regulation'] = 0;
                final[s_id]['mRNA Down regulation'] = 1;
              } else {
                final[s_id]['mRNA Up regulation'] = 0;
                final[s_id]['mRNA Down regulation'] = 0;
              }
              if (proteome === 'up') {
                final[s_id]['Proteome Up regulation'] = 1;
                final[s_id]['Proteome Down regulation'] = 0;
              } else if (proteome === 'down') {
                final[s_id]['Proteome Up regulation'] = 0;
                final[s_id]['Proteome Down regulation'] = 1;
              } else {
                final[s_id]['Proteome Up regulation'] = 0;
                final[s_id]['Proteome Down regulation'] = 0;
              }
            }
          }
        });
      });
    }
  }, [oncoJson]);

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

  useEffect(() => {
    setTimeout(function () {
      setLoader(false);
    }, 1000);
  }, [oncoJson]);

  useEffect(() => {
    if (oncoJson && oncoJson.status === 200) {
      setShowOnco(true);
      setNoContent(false);
    } else {
      setShowOnco(false);
      setNoContent(true);
    }
  }, [oncoJson]);

  function onSelect(selectedList) {
    let cf = [];
    setOption(selectedList);
    selectedList.forEach((item) => {
      cf.push(item['id']);
    });

    setActiveCmp(false);

    if (inputState.type !== '' && inputState.genes.length > 0) {
      setLoader(true);
      let dataJson = inputState;
      dataJson['clinicalFilters'] = cf;
      let return_data = OncoInformation('POST', dataJson);
      return_data
        .then((result) => {
          const d = result;
          if (d.status === 200) {
            let r_ = d['data'];
            r_['status'] = 200;
            setOncoJson(r_);
          } else {
            setOncoJson({ status: 204 });
          }
        })
        .catch(() => {
          setOncoJson({ status: 204 });
        });
    }
  }

  function onRemove(selectedList) {
    let cf = [];
    setOption(selectedList);
    selectedList.forEach((item) => {
      cf.push(item['id']);
    });

    setActiveCmp(false);
    if (inputState.type !== '' && inputState.genes.length > 0) {
      setLoader(true);
      let dataJson = inputState;
      dataJson['clinicalFilters'] = cf;
      let return_data = OncoInformation('POST', dataJson);
      return_data
        .then((result) => {
          const d = result;
          if (d.status === 200) {
            let r_ = d['data'];
            r_['status'] = 200;
            setOncoJson(r_);
          } else {
            setOncoJson({ status: 204 });
          }
        })
        .catch(() => {
          setOncoJson({ status: 204 });
        });
    }
  }

  const handleFilter =(e)=>{
    if(e.target.value){
      const {name,value} = e.target
      setFilter(prevState=>({
        ...prevState,
        [name]:parseFloat(value)
      }))
    }
  }
  const ChangeFilter = ()=>{
    setInputState((prevState) => ({ ...prevState, ...Filter }));
  }

  return (
    <div
      style={{
        marginTop: '5%',
        border: '1px solid #d6d6d6',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        padding: '5%'
      }}
    >
      <div className='flex Gap5'>
        {optionChoices && (
          <div className="gene_selctionBox">
            {!noGeneData && (
              <>
                <label>
                  <FormattedMessage
                    id="Clinical_Filters_heatmap"
                    defaultMessage="Clinical Attribute annotation"
                  />
                </label>
                <Multiselect
                  options={optionChoices} // Options to display in the dropdown
                  selectedValues={option} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  emptyRecordMsg={<FormattedMessage id="No Clinical Data" defaultMessage="No Clinical Data"/>} // Custom message when no options are available
                />
              </>
            )}
          </div>
        )}
        {showOnco && chartData['types'].length>0 && <div className='TextLeft MarginBottom4' style={{width:'43%'}}>
          <label>Filter</label>
          {showOnco && chartData['types'].includes('rna') && <div className="relative flex  oncoBorder">
            <span
              className="border oncoWidth TextAlignCenter oncoBoxesLabel"
              >mRNA &gt;= (z-score)</span>

                <input
                  type="number"
                  aria-label="From"
                  placeholder='From'
                  value={Filter['z_score_up_rna']}
                  onChange={handleFilter}
                  name='z_score_up_rna'
                  className="oncoBorderLeft oncoBoxes oncoWidth" />
                  <span
              className="border oncoWidth TextAlignCenter oncoBoxesLabel"
              >mRNA &lt;= (z-score)</span>
                <input
                  type="number"
                  aria-label="To"
                  placeholder='To'
                  value={Filter['z_score_down_rna']}
                  onChange={handleFilter}
                  name='z_score_down_rna'
                  className="oncoBorderLeft oncoBoxes oncoWidth" />

          </div>}
          {showOnco && chartData['types'].includes('cnv') && <div className="relative flex  oncoBorder">
            <span
              className="border oncoWidth TextAlignCenter oncoBoxesLabel"
              >CNV &gt;= </span>
            <input
              type="number"
              aria-label="From"
              placeholder='From'
              value={Filter['cn_up_value']}
              name='cn_up_value'
              onChange={handleFilter}
              className="oncoBorderLeft oncoBoxes oncoWidth" />
              <span
              className="border oncoWidth TextAlignCenter oncoBoxesLabel"
              >CNV  = </span>
            <input
              type="number"
              aria-label="equal"
              placeholder='equal'
              value={Filter['cn_equal_value']}
              name='cn_equal_value'
              onChange={handleFilter}
              className="oncoBorderLeft oncoBoxes oncoWidth" />
              <span
              className="border oncoWidth TextAlignCenter oncoBoxesLabel"
              >CNV &lt;= </span>
            <input
              type="number"
              aria-label="To"
              placeholder='To'
              value={Filter['cn_down_value']}
              name='cn_down_value'
              onChange={handleFilter}
              className="oncoBorderLeft oncoBoxes oncoWidth" />
          </div> }
          {showOnco && chartData['types'].includes('proteome') && <div className="relative flex  oncoBorder">
            <span
              className="border oncoWidth TextAlignCenter oncoBoxesLabel"
              >PROTEOME &gt;= (z-score)</span>

            <input
              type="number"
              aria-label="From"
              placeholder='From'
              value={Filter['z_score_up_prot']}
              onChange={handleFilter}
              name='z_score_up_prot'
              className="oncoBorderLeft oncoBoxes oncoWidth" />
              <span
              className="border oncoWidth TextAlignCenter oncoBoxesLabel"
              >PROTEOME &lt;= (z-score)</span>
            <input
              type="number"
              aria-label="To"
              placeholder='To'
              value={Filter['z_score_down_prot']}
              onChange={handleFilter}
              name='z_score_down_prot'
              className="oncoBorderLeft oncoBoxes oncoWidth" />
          </div>}
          <button onClick={ChangeFilter} className='btn btnPrimary MarginTop2 FusionNameRE'>Submit</button>

        </div>}
      </div>
      {loader ? (
        <LoaderCmp />
      ) : (
        <div>
          {activeCmp && (
            <div className="">
              <div className="">
                {showOnco && (
                  <div className="">
                    <div className="data_box">
                      <h3>
                        <FormattedMessage
                          id="GlobalMutationDistribution"
                          defaultMessage="Global Mutation Distribution : Distribution of total mutation"
                        />
                      </h3>
                      <br></br>
                      <h3>
                        <FormattedMessage
                          id="GlobalMutationCount"
                          defaultMessage="Global Mutation Count : Count of total somatic mutation"
                        />
                      </h3>
                      <br></br>
                      <h3>
                        <FormattedMessage
                          id="MutationDistribution"
                          defaultMessage="Mutation Distribution : Distribution of selected mutation"
                        />
                      </h3>
                      <br></br>
                      {Englishlanguage && (
                        <h3>Mutation Count : Count of selected somatic mutation</h3>
                      )}

                      {Englishlanguage && (
                        <h3>
                          <br></br>
                          <br></br>
                          {' '}
                          You can ACTIVATE or DEACTIVATE each VARIANT CLASSIFICATION legend by
                          CLICKING on each item. (Maximum 4 items)
                        </h3>
                      )}

                      {koreanlanguage && <h3>Mutation Count : 선택된 체세포 변이의 수</h3>}

                      {koreanlanguage && (
                        <h3>
                          <br></br>
                          <br></br>
                          각 항목을 클릭하여 각 변이 분류 범례를 활성화 또는 비활성화 할 수
                          있습니다.(최대 4개)
                        </h3>
                      )}
                    </div>
                    <OncoCmp
                      watermarkCss={watermarkCss}
                      ref={reference}
                      width={width}
                      data={chartData}
                      table_data={tableData}
                      table_count={tableCount}
                      customFilterJson={customFilterJson}
                      project_id={project_id}
                      filter={Filter}
                    />
                  </div>
                )}

                {noContent && <NoContentMessage />}
              </div>
            </div>
          )}
          {noGeneData && (
            <p>
              <FormattedMessage
                id="PleaseSelecttheGeneSetData"
                defaultMessage="Please Select the Gene Set Data"
              />
            </p>
          )}
        </div>
      )}
    </div>
  );
}
