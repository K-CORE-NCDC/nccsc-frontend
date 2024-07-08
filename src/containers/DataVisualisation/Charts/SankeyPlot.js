import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RNIDetails } from '../../../actions/api_actions';
import LoaderComp from '../../Common/Loader';
import SankeyIndex from './SankeyIndex';
import Table from '../../Common/Table/ReactTable';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';
import { FormattedMessage, useIntl } from 'react-intl';
import Swal from 'sweetalert2';



function SankeyPlot({ inputData, screenCapture, setToFalseAfterScreenCapture }) {
  let { project_id } = useParams();
  const [samplesCount, setSamplesCount] = useState(0);
  const [tabName, setTabName] = useState('patientSummary');
  const [sampleListElements, setSampleListElements] = useState([]);
  const [sampleKey, setSampleKey] = useState('');
  const [basicInformationData, setBasicInformationData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [basicHtml, setBasicHtml] = useState([]);
  const [rnaData, setRnaData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [genesHtml, setGenesHtml] = useState([]);
  const [inputState, setInputState] = useState({});
  const [selectedGene, setSelectedGene] = useState('');
  const [variantClassificationHtml, setVariantClassificationHtml] = useState();
  const [variantClassification, setVariantClassification] = useState('');
  const [variantClassificationList, setVariantClassificationList] = useState([]);
  const [watermarkCss, setWatermarkCSS] = useState('');
  const intl = useIntl();

  const SampleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);

  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;

  function sortAlphaNum(a, b) {
    var aA = a.replace(reA, '');
    var bA = b.replace(reA, '');
    if (aA === bA) {
      var aN = parseInt(a.replace(reN, ''), 10);
      var bN = parseInt(b.replace(reN, ''), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  }


  let getReport = (sampleId) => {
    setLoader(true)
    let returnedData = RNIDetails('POST', {
      rnid: sampleId,
      project_id: project_id,
      genes: inputState['genes']
    });
    returnedData.then((result) => {
      setLoader(false)
      setRnaData(result.data);
    });
    setSampleKey(sampleId);
  };

  const ColumnNames = [
    {
      Header: intl.formatMessage({ id: "ClinicalAttribute", defaultMessage: 'Clinical Attribute' }),
      accessor: (row) =>
        row.clinicalAttribute,
    },
    {
      Header: intl.formatMessage({ id: "value", defaultMessage: 'Value' }),
      accessor: (row) =>
        row.Value,
    }
  ]

  const generateTableColumnsData = (rnaData) => {

    if (rnaData && 'genomic_summary' in rnaData) {
      // const columnHelper = createColumnHelper()
      let tableColumnsData = [
        {
          Header: 'Gene Name',
          accessor: (row) => row.gene,
        },
      ]
      if (rnaData.genomic_summary[0].hasOwnProperty('rna')) {
        tableColumnsData.push({
          id: 'dna_mutation',
          Header: <dt>DNA Mutation <span className='InlineFlex '>

            <FormattedMessage id='SankeyTableDNAMutationTooltip' defaultMessage="if occured mutation is one of the following variant">
              {(placeholder) => (
                <>
                  <QuestionMarkCircleIcon
                    data-multiline={true}
                    className="inline ml-2 mb-1"
                    data-class="my-tooltip"
                    data-tip={`Yes :  ${placeholder} <br>  <br/>Missense mutation, Nonsense mutation, Splice site, <br>  <br/>In frame insertion, In frame deletion, Frame-shift insertion, Frame-shift deletion`}
                    style={{ width: '20px', cursor: 'pointer' }}
                  ></QuestionMarkCircleIcon>
                  <ReactTooltip /></>
              )}
            </FormattedMessage>

          </span></dt>,
          style: {
            borderRight: '1px solid #8f8f8f'
          },
          columns: [
            {

              Header: "Yes",
              accessor: (row) => {
                if (row.dna === 'YES') {
                  if (row.gene in rnaData['dna_mutation_variant_info']) {
                    return 'O  (' + rnaData['dna_mutation_variant_info'][row.gene].length + ')'
                  } else {
                    return "";
                  }
                }
              },
            }, {
              Header: "No",
              accessor: (row) => {
                if (row.dna === 'NO') {
                  // if (row.gene in rnaData['variant_info']) {
                  //   return 'O  (' + rnaData['variant_info'][row.gene].length + ')'
                  // }
                  return 'O'
                  //  else {
                  //   return "O";
                  // }
                  // return "O";
                }
              },
            }
          ]
        })
      }
      if (rnaData.genomic_summary[0].hasOwnProperty('rna')) {
        tableColumnsData.push({
          id: 'rna',

          Header: <dt>
            RNA <span className='InlineFlex '>
              <QuestionMarkCircleIcon
                data-multiline="true"
                className="inline ml-2 mb-1"
                data-tip="RNA high : z-score ≥ 1,<br>  <br/>RNA low : z-score ≤ -1 "
                style={{ width: '20px', cursor: 'pointer' }}
              ></QuestionMarkCircleIcon>
              <ReactTooltip />
            </span></dt>,
          columns: [
            {
              Header: "High",
              accessor: (row) => {
                if (row.rna === 'HIGH') {
                  return 'O '
                } else return ''
              },
            }, {
              Header: "Intermediate",
              accessor: (row) => {
                if (row.rna !== 'HIGH' && row.rna !== 'LOW') {
                  return 'O '
                } else return ''
              }
            },
            {
              Header: 'Low',
              accessor: (row) => {
                if (row.rna === 'LOW') {
                  return 'O '
                } else return ''
              },
            }
          ]
        })
      }
      if (rnaData.genomic_summary[0].hasOwnProperty('proteome')) {
        tableColumnsData.push({
          id: 'proteome',
          Header: <dt>
            Proteome <span className='InlineFlex '>
              <QuestionMarkCircleIcon
                data-multiline="true"
                className="inline ml-2 mb-1"
                data-tip="Proteome high : z-score ≥ 1.5,<br>  <br/>Proteome low : z-score ≤ 0.5"
                style={{ width: '20px', cursor: 'pointer' }}
              ></QuestionMarkCircleIcon>
              <ReactTooltip />
            </span>
          </dt>,
          columns: [
            {
              id: 'pHigh',
              Header: "High",
              accessor: (row) => {
                if (row.proteome === 'HIGH') {
                  return 'O '
                } else return ''
              },
            }, {
              id: 'pIntermediate',
              Header: "Intermediate",
              accessor: (row) => {
                if (row.proteome !== 'HIGH' && row.proteome !== 'LOW') {
                  return 'O '
                } else return ''
              }
            },
            {
              id: 'pLow',
              Header: 'Low',
              accessor: (row) => {
                if (row.proteome === 'LOW') {
                  return 'O '
                } else return ''
              },
            }
          ]
        })
      }

      return tableColumnsData;
    } else return [];
  };

  const tableColumnsData = generateTableColumnsData(rnaData);

  const loadGenesDropdown = (genes) => {
    let t = [];
    let firstGene = true;
    let atleastOneGene = false;
    if (rnaData && 'variant_info' in rnaData) {
      for (var i = 0; i < genes.length; i++) {
        if (genes[i] in rnaData['variant_info']) {
          if (firstGene) {
            setSelectGene(genes[i]);
            firstGene = false;
          }
          if ('variant_info' in rnaData && genes[i] in rnaData['variant_info']) {
            atleastOneGene = true;
            loadVarinatClassificationDropdown(rnaData['variant_info'][genes[i]]);
          }
          t.push(
            <option key={i + '_' + genes[i]} value={genes[i]}>
              {genes[i]}
            </option>
          );
        }
      }
    }
    if (!atleastOneGene) {
      setSelectGene('');
      setSelectVariantClassification('');
      setVariantClassificationHtml([])
    }
    setGenesHtml(t);
  };

  const loadVarinatClassificationDropdown = (VCList) => {
    let t = [];
    for (let i = 0; i < VCList.length; i++) {
      if (i === 0) {
        setSelectVariantClassification(VCList[0]);
      }
      t.push(
        <option key={i + '_' + VCList[i]} value={VCList[i]}>
          {VCList[i]}
        </option>
      );
    }
    t.push(<option key="all" value="all">all</option>);
    setVariantClassificationHtml(t);
  };

  let setSelectGene = (g) => {
    setSelectedGene(g);
    if ('variant_info' in rnaData && g in rnaData['variant_info']) {
      loadVarinatClassificationDropdown(rnaData['variant_info'][g]);
    }
  };

  let setSelectVariantClassification = (v) => {
    if (v === 'all' && selectedGene in rnaData['variant_info']) {
      setVariantClassificationList(rnaData['variant_info'][selectedGene]);
      setVariantClassification(v);
    } else {
      let arr = [];
      arr.push(v);
      setVariantClassificationList(arr);
      setVariantClassification(v);
    }
  };

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData }));
    }
  }, [inputData]);

  useEffect(() => {
    if (sampleKey) {
      getReport(sampleKey);
    }
  }, [inputState]);

  useEffect(() => {
    if (inputState && 'genes' in inputState) {
      let g = inputState['genes'];
      loadGenesDropdown(g);
    }
    if (rnaData) {
      setLoader(true);
      setTimeout(() => {
        if ('genomic_summary' in rnaData) {
          setTableData(rnaData.genomic_summary);
        }
        if ('basic_information' in rnaData) {
          setBasicInformationData(rnaData.basic_information);
        }
        setLoader(false);
      }, 2000);
    }
  }, [rnaData]);

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      // setTableRender(true);
    }
  }, [tableData]);

  useEffect(() => {
    setLoader(true);
    if (basicInformationData.length > 0) {
      const emptyKeys = ['pt_sbst_no', 'rlps_yn', 'rlps_cnfr_drtn', 'death_yn', 'death_cnfr_drtn'];
      const dataKeys = basicInformationData.some(row =>
        Object.keys(row).some(key => !emptyKeys.includes(key))
      );
      if (dataKeys) {
      const tmp = [];
      for (let i = 0; i < basicInformationData.length; i++) {
        const row = basicInformationData[i];
        for (const key in row) {
          let obj = {}
          if (key !== 'Sample') {
            obj["clinicalAttribute"] = key
            obj["Value"] = row[key]
            tmp.push(
              obj
            );
          }
        }
      }
      setBasicHtml(tmp);
    }
  }
    setLoader(false);
  }, [basicInformationData]);

  useEffect(() => {
    if (SampleRnidListData) {
      setSamplesCount(Object.keys(SampleRnidListData).length);
      let sampleListElementsTemp = [];
      let brstKeysObject = {};
      Object.keys(SampleRnidListData).forEach((e) => {
        brstKeysObject = {
          ...brstKeysObject,
          [SampleRnidListData[e]]: e
        };
      });
      let brstKeysArray = Object.keys(brstKeysObject).sort(sortAlphaNum);
      brstKeysArray.forEach((element) => {
        sampleListElementsTemp.push(
          <option className="xs:text-sm lg:text-xl" key={element} value={brstKeysObject[element]}>
            {element}
          </option>
        );
      });
      setSampleListElements(sampleListElementsTemp);
    }
  }, [SampleRnidListData]);

  useEffect(() => {
    if (tabName === 'patientSummary') {

      if (screenCapture) {
        setWatermarkCSS('watermark');
      } else {
        setWatermarkCSS('');
      }

      if (watermarkCss !== '' && screenCapture) {
        comingSoon()
        setToFalseAfterScreenCapture();
      }
    }

  }, [screenCapture, watermarkCss]);

  let comingSoon = () => {
    Swal.fire({
      title: intl.formatMessage({ id: "Comingsoon", defaultMessage: 'Coming soon' }),
      icon: 'info',
      confirmButtonColor: '#003177',
      confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
      allowOutsideClick: false,
    })
  }
  return (
    <div style={{
      marginTop: '5%',
      border: '1px solid #d6d6d6',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      padding: '5%',
    }}>
      <div className="tabs_box">
        <div className="tab mainTab">
          <div className="tab_main" >
            <ul>
              <li className={tabName === 'patientSummary' ? 'on' : ''}>
                {' '}
                <button
                  onClick={() => {
                    setTabName('patientSummary');
                  }}
                  name="type"
                >
                  {' '}
                  <FormattedMessage id="PatientSummary" defaultMessage="Patient Summary" />{' '}
                </button>
              </li>

              <li className={tabName === 'drugRelation' ? 'on' : ''}>
                {' '}
                <button
                  onClick={() => {
                    setTabName('drugRelation');
                  }}
                  name="type"
                >
                  {' '}
                  <FormattedMessage
                    id="DrugRelationPlot"
                    defaultMessage="Drug Relation Plot"
                  />{' '}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="Flex JustifySpaceBetween">
        <div className="TextLeft InlineFlex FlexDirCol " style={{ marginLeft: 'auto', width: '250px' }}>
          {
            <div htmlFor="samples">
              <FormattedMessage id="Cir_choose_sample" defaultMessage="Choose a Sample" />: (
              {samplesCount}){' '}
            </div>
          }
          <select
            className="selectBox"
            value={sampleKey}
            onChange={(e) => {
              getReport(e.target.value);
            }}
            name="samples"
            id="samples"
          >
            <option>--Select Sample--</option>
            {sampleListElements}
            <option value="all">all</option>
          </select>
        </div>

        {
          // tabName !== 'patientSummary' && sampleKey &&  <div style={{ maxWidth: 'fit-content' }}>
          tabName === 'drugRelation' && sampleKey && (
            <div className="SankeyVariantandGene">
              <div style={{ maxWidth: 'fit-content', marginLeft: '15px' }}>
                <div className="selectionGenes" style={{ maxWidth: 'fit-content' }}>
                  <div>
                    <div>
                      <FormattedMessage id="Selected Gene" defaultMessage="Selected Gene Is" />
                    </div>
                    <div>
                      <select
                        value={selectedGene}
                        onChange={(e) => setSelectGene(e.target.value)}
                      >
                        {genesHtml}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ maxWidth: 'fit-content' }}>
                <div className="selectionGenes" style={{ maxWidth: 'fit-content', textAlign: 'left' }}>
                  <div>
                    <div>
                      <FormattedMessage
                        id="Selected Variant Classification is"
                        defaultMessage="Selected Variant Classification Is"
                      />
                    </div>
                    <div>
                      <select
                        value={variantClassification}
                        onChange={(e) => setSelectVariantClassification(e.target.value)}
                      >
                        {variantClassificationHtml}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>

      {sampleKey === '' && <p className="MultiUploadTextCenter">
        <FormattedMessage id="SelectSample" defaultMessage="Select Sample" />
      </p>}

      {loader && tabName === 'patientSummary' && <LoaderComp />}

      {!loader && tabName === 'patientSummary' && sampleKey !== '' && (
        <div>
          {sampleKey !== '' && (
            <div className="BasicGenomic MarginTop10">
              <div className="">
                {basicInformationData && basicInformationData.length > 0 && (
                  <div>
                    <div className='boardTopUtil '>
                      <h3 className="boardTotal">
                        <span>
                          <FormattedMessage id="BasicInformation" defaultMessage="Basic Information" />
                        </span>
                      </h3>
                    </div>
                    {basicHtml.length > 0 ? (
                    <Table
                      columns={ColumnNames}
                      data={basicHtml}
                      width={"1075"}
                    />
                    ) : (
                      <Table
                      columns={ColumnNames}
                      data={[{ clinicalAttribute: <FormattedMessage id="No Clinical Data" defaultMessage="No Clinical Data" />, Value: <FormattedMessage id="No Clinical Data" defaultMessage="No Clinical Data" /> }]}
                      width={"1075"}
                    />
                      )}
                  </div>
                )}

                {tableData && tableData.length > 0 && (
                  <div className='MarginTop10'>
                    <div className="rounded-lg border border-gray-200">

                      <div className='boardTopUtil '>
                        <h3 className="boardTotal">
                          <span>
                            <FormattedMessage id="GenomicInformation" defaultMessage="Genomic Information" />
                          </span>
                        </h3>
                      </div>
                      <div className="report_table sankey_multi_table">
                        <Table
                          columns={tableColumnsData}
                          data={tableData}
                          width={'1600'}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {tabName === 'drugRelation' && sampleKey !== '' && (
        <div>
          <SankeyIndex
            selectedGene={selectedGene}
            variants={variantClassificationList}
            allVariants={rnaData['variant_info']}
            screenCapture={screenCapture}
            setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
            tabName={tabName}
          />
        </div>
      )}
    </div>
  );
}

export default SankeyPlot;
