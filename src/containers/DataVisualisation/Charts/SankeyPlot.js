import React, { useState, useEffect, useRef } from 'react'
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { RNIDetails } from '../../../actions/api_actions'
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';
import ReportSubHeader from '../../Common/ReportSubHeader';
import SankeyIndex from './SankeyIndex';
import LoaderComp from '../../Common/Loader';

function SankeyPlot({
  inputData,
}) {

  const basicTable = useRef()
  let { project_id } = useParams();
  const [samplesCount, setSamplesCount] = useState(0);
  const [tabName, setTabName] = useState('patientSummary')
  const [sampleListElements, setSampleListElements] = useState([]);
  const [sampleKey, setSampleKey] = useState("");
  const [basicInformationData, setBasicInformationData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [basicHtml, setBasicHtml] = useState([]);
  const [rnaData, setRnaData] = useState([])
  const [tableRender, setTableRender] = useState(false)
  const [loader, setLoader] = useState(false);
  const [genesHtml, setGenesHtml] = useState([])
  const [inputState, setInputState] = useState({})
  const [selectedGene, setSelectedGene] = useState("")
  const [variantClassificationHtml, setVariantClassificationHtml] = useState()
  const [variantClassification, setVariantClassification] = useState("")
  const [variantClassificationList, setVariantClassificationList] = useState([])

  const SampleRnidListData = useSelector(
    (data) => data.dataVisualizationReducer.Keys
  );

  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;

  function sortAlphaNum(a, b) {
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if (aA === bA) {
      var aN = parseInt(a.replace(reN, ""), 10);
      var bN = parseInt(b.replace(reN, ""), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  }

  let getReport = (sampleId) => {
    let returnedData = RNIDetails("POST", { rnid: sampleId, 'project_id': project_id, 'genes': inputData['genes'] })
    returnedData.then((result) => {
      setRnaData(result.data)
    })
    setSampleKey(sampleId)
  }

  const customStyles = {
    table: {
      style: {
        display: "table",
        width: "100%",
        tableLayout: "fixed",
        border: "2px solid #2e2e2e",
        borderCollapse: "collapse",
        fontSize: "16px",
        color: "#8f8f8f",
        fontWeight: "500",
        textAlign: "center !important"
      },
    },
    thead: {
      style: {
        display: "table-header-group",
        fontWeight: "500",
        borderBottom: "2px solid #2e2e2e",
      },
    },
    td: {
      style: {
        display: "table-cell",
        verticalAlign: "middle",
        padding: "20px 16px",
        position: "relative",
        width: "90px",
        color: "#2e2e2e",
        borderBottom: "1px solid #2e2e2e"
      },
    },
    tr: {
      style: {
        display: "table-row",
      },
    },
    tbody: {
      style: {
        display: "table-row-group",
      },
    },
    headCells: {
      classNames: ['report_sankey'],
      style: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: "1px solid #2e2e2e",
        borderRight: "1px solid #2e2e2e"
      }
    },
    pagination: {
      style: {
        gap: "10px"
      }
    },
    subHeader: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        border: '2px solid black',
        padding: '0px',
        minHeight: '15px'
      },
    },
  };


  const generateTableColumnsData = (rnaData) => {
    if (rnaData && 'genomic_summary' in rnaData) {

      let tableColumnsData = [
        {
          name: "geneName",
          selector: (row) => {
            return row.gene;
          },
          sortable: true,
          classNames: ["report_sankey"],
          style: {
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #fff",
            boxSizing: "border-box",
            textAlign: "center",
            lineHeight: "3.5",
            display: "flex",
            justifyContent: "center"
          },
        },
      ];

      if (rnaData.genomic_summary[0].hasOwnProperty('dna')) {
        tableColumnsData.push(
          {
            name: "Yes",
            selector: (row) => {
              if (row.dna === "YES") {
                if (row.gene in rnaData["variant_info"]) {
                  let variants = rnaData["variant_info"][row.gene];
                  variants = variants.join("-");
                  return (
                    <div data-bs-toggle="tooltip" title={variants}>
                      {"O  (" + rnaData["variant_info"][row.gene].length + ")"}
                    </div>
                  );
                } else {
                  return row.dna;
                }
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #6F7378",
              borderRight: "1px solid #fff",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          }
        )
        tableColumnsData.push(
          {
            name: "No",
            selector: (row) => {
              if (row.dna === "NO") {
                return "O ";
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #ABB0B8",
              borderRight: "1px solid #fff",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          })
      }

      if (rnaData.genomic_summary[0].hasOwnProperty('rna')) {
        tableColumnsData.push(
          {
            name: "High",
            selector: (row) => {
              if (row.rna === "HIGH") {
                return "O ";
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #6F7378",
              borderRight: "1px solid #fff",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          })

        tableColumnsData.push(
          {
            name: "Intermediate",
            selector: (row) => {
              if (row.rna !== "HIGH" && row.rna !== "LOW") {
                return "O ";
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #ABB0B8",
              borderRight: "1px solid #fff",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          })

        tableColumnsData.push(
          {
            name: "Low",
            selector: (row) => {
              if (row.rna === "LOW") {
                return "O ";
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #ABB0B8",
              borderRight: "1px solid #fff",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          })
      }

      if (rnaData.genomic_summary[0].hasOwnProperty('proteome')) {
        tableColumnsData.push(
          {
            name: "High",
            selector: (row) => {
              if (row.proteome === "HIGH") {
                return "O ";
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #6F7378",
              borderRight: "1px solid #fff",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          })
        tableColumnsData.push(
          {
            name: "Intermediate",
            selector: (row) => {
              if (row.proteome !== "HIGH" && row.proteome !== "LOW") {
                return "O ";
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #ABB0B8",
              borderRight: "1px solid #fff",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          })
        tableColumnsData.push(
          {
            name: "Low",
            selector: (row) => {
              if (row.proteome === "LOW") {
                return "O ";
              } else return "";
            },
            sortable: true,
            style: {
              borderLeft: "1px solid #ABB0B8",
              borderRight: "1px solid #6F7378",
              boxSizing: "border-box",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              lineHeight: "3.5",
            },
          })
      }
      return tableColumnsData;
    }
    else return []
  }

  const tableColumnsData = generateTableColumnsData(rnaData)

  const loadGenesDropdown = (genes) => {
    let t = []
    let firstGene = true
    if (rnaData && 'variant_info' in rnaData) {

      for (var i = 0; i < genes.length; i++) {
        if (genes[i] in rnaData['variant_info']) {
          if (firstGene) {
            setSelectGene(genes[i])
            firstGene = false
          }
          t.push(
            <option key={i + '_' + genes[i]} value={genes[i]}>
              {genes[i]}
            </option>
          )
        }
      }
    }
    setGenesHtml(t)
  }

  const loadVarinatClassificationDropdown = (VCList) => {
    let t = []
    for (let i = 0; i < VCList.length; i++) {
      if (i === 0) {
        setSelectVariantClassification(VCList[0])
      }
      t.push(
        <option key={i + '_' + VCList[i]} value={VCList[i]}>
          {VCList[i]}
        </option>
      )
    }
    t.push(
      <option value="all">
        all
      </option>
    )
    setVariantClassificationHtml(t)
  }



  let setSelectGene = (g) => {
    setSelectedGene(g)
    if ('variant_info' in rnaData && g in rnaData['variant_info']) {
      loadVarinatClassificationDropdown(rnaData['variant_info'][g])
    }
  }

  let setSelectVariantClassification = (v) => {
    if (v === 'all' && selectedGene in rnaData['variant_info']) {
      setVariantClassificationList(rnaData['variant_info'][selectedGene])
      setVariantClassification(v)
    }
    else {
      let arr = []
      arr.push(v)
      setVariantClassificationList(arr)
      setVariantClassification(v)
    }
  }

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData }))
    }
  }, [inputData])

  useEffect(() => {
    if (sampleKey) {
      getReport(sampleKey)
    }
  }, [inputState])

  useEffect(() => {
    if (inputState && 'genes' in inputState) {
      let g = inputState['genes']
      loadGenesDropdown(g)
    }
    if (rnaData) {
      setLoader(true)
      setTimeout(() => {
        if ('genomic_summary' in rnaData) {
          setTableData(rnaData.genomic_summary);
        }
        if ('basic_information' in rnaData) {
          setBasicInformationData(rnaData.basic_information);
        }
        setLoader(false)
      }, 2000)
    }
  }, [rnaData]);

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setTableRender(true)
    }
  }, [tableData])

  useEffect(() => {
    setLoader(true)
    if (basicInformationData.length > 0) {
      const tmp = [];
      for (let i = 0; i < basicInformationData.length; i++) {
        const row = basicInformationData[i];
        for (const key in row) {
          tmp.push(
            <tr key={key} className='BasicInformationTable'>
              <td style={{ border: '1px solid black', padding: '8px' }}>{key}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row[key]}</td>
            </tr>
          );
        }
      }
      setBasicHtml(tmp);
    }
    setLoader(false)
  }, [basicInformationData]);

  useEffect(() => {
    if (SampleRnidListData) {
      let sampleListElementsTemp = [];
      let brstKeysObject = {};
      Object.keys(SampleRnidListData).forEach((e) => {
        brstKeysObject = {
          ...brstKeysObject,
          [SampleRnidListData[e]]: e,
        };
      });
      let brstKeysArray = Object.keys(brstKeysObject).sort(sortAlphaNum);
      brstKeysArray.forEach((element) => {
        sampleListElementsTemp.push(
          <option
            className="xs:text-sm lg:text-xl"
            key={element}
            value={brstKeysObject[element]}
          >
            {element}
          </option>
        );
      });
      setSampleListElements(sampleListElementsTemp);
    }
  }, [SampleRnidListData]);

  useEffect(() => {
    if (SampleRnidListData) {
      setSamplesCount(Object.keys(SampleRnidListData).length);
    }
  }, [SampleRnidListData]);



  return (
    <div>
      <div className="tabs_box">
        <div className="tab mainTab">
          <div className="tab_main">
            <ul>
              <li className={tabName === 'patientSummary' ? 'on' : ''}> <button onClick={e => {
                setTabName('patientSummary')
              }} name='type' > <FormattedMessage id="PatientSummary" defaultMessage="Patient Summary" /> </button></li>

              <li className={tabName === 'drugRelation' ? 'on' : ''}> <button onClick={e => {
                setTabName('drugRelation')
              }} name='type' > <FormattedMessage id="DrugRelationPlot" defaultMessage="Drug Relation Plot" /> </button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='Flex JustifySpaceBetween'>

        <div style={{ maxWidth: 'fit-content' }}>
          {(
            <div
              htmlFor="samples"
            >
              <FormattedMessage
                id="Cir_choose_sample"
                defaultMessage="Choose a Sample"
              />
              : ({samplesCount}){" "}
            </div>
          )}
          <select
            className="selectBox"
            value={sampleKey}
            onChange={(e) => {
              getReport(e.target.value)
            }}
            name="samples"
            id="samples"
          >
            <option>
              --Select Sample--
            </option>
            {sampleListElements}
            <option value="all">
              all
            </option>
          </select>
        </div>

        {
          tabName === 'drugRelation' && sampleKey &&
          <div className='SankeyVariantandGene'>

            <div style={{ maxWidth: 'fit-content' }}>
              <div className='selectionGenes' style={{ maxWidth: 'fit-content' }}>
                <div >
                  <div><FormattedMessage id="Selected Gene" defaultMessage='Selected Gene Is' /></div>
                  <div>
                    <select defaultValue={selectedGene} onChange={e => setSelectGene(e.target.value)}>
                      {genesHtml}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ maxWidth: 'fit-content' }}>
              <div className='selectionGenes' style={{ maxWidth: 'fit-content' }}>
                <div >
                  <div><FormattedMessage id="Selected Variant Classification is" defaultMessage='Selected Variant Classification Is' /></div>
                  <div>
                    <select defaultValue={variantClassification} onChange={e => setSelectVariantClassification(e.target.value)}>
                      {variantClassificationHtml}
                    </select>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }

      </div>

      {
        sampleKey === "" && <p className='MultiUploadTextCenter'>Select Sample</p>
      }

      {loader && tabName === 'patientSummary' && <LoaderComp />}

      {
        !loader && tabName === 'patientSummary' && sampleKey !== "" &&
        <div>
          {sampleKey !== "" && <div className='BasicGenomic'>
            <div className=''>

              {basicInformationData && basicInformationData.length > 0 && <div>
                <div>
                  <h3 className='BasicInformationTitle'>
                    Basic Information
                  </h3>
                </div>
                <div className='basicTable' ref={basicTable}>
                  {basicHtml}
                </div>
              </div>
              }

              {tableData && tableData.length > 0 &&
                <div>
                  <div className='rounded-lg border border-gray-200'>
                    <h3 className='BasicInformationTitle' style={{ margin: "40px 0px" }}>
                      Genomic Information
                    </h3>
                    <div className=' report_table'>
                      <DataTable pagination
                        responsive
                        columns={tableColumnsData}
                        data={tableData}
                        subHeader
                        customStyles={customStyles}
                        subHeaderComponent={<ReportSubHeader tData={tableRender} tableData={tableData} />}
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          }
        </div>
      }

      {
        tabName === 'drugRelation' && sampleKey !== "" &&
        <div>
          <SankeyIndex selectedGene={selectedGene} variants={variantClassificationList} allVariants={rnaData['variant_info']} />
        </div>
      }

    </div>
  )
}

export default SankeyPlot