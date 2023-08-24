import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircosInformation } from '../../../actions/api_actions';
import CircosCmp from '../../Common/Circos';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import PagenationTableComponent from '../../Common/PagenationTable';
import GraphsModal from '../../Common/circostimelineGraph';

import html2canvas from 'html2canvas';
import { FormattedMessage } from 'react-intl';
import '../../../assets/css/style.css';
import PDFReport from '../../Common/PDFReport';
import Report from '../../Common/Report';

export default function DataCircos({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef();
  const [sampleKey, setSampleKey] = useState('');
  const [circosJson, setCircosJson] = useState({ status: 0 });
  const oncoImageJson = null;
  const circosTimelieTableData = null;
  const reportData = useSelector((state) => state.dataVisualizationReducer.rniData);
  const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [sampleListElements, setSampleListElements] = useState([]);
  const [watermarkCss, setWatermarkCSS] = useState('');
  const [loader, setLoader] = useState(false);
  const [showOncoImages, setShowOncoImages] = useState(false);
  const [showReportTable, setshowReportTable] = useState(false);
  const [showOncoTimelineTables, setShowOncoTimelineTables] = useState(false);
  const [showNoContent, setShowNoContent] = useState(false);
  const [renderCircos, setRenderCircos] = useState(false);
  const [samplesCount, setSamplesCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [noGeneData, setNoGeneData] = useState(true);
  const [basicInformationData, setBasicInformationData] = useState([]);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const tableColumnsData = [
    {
      name: 'geneName',
      selector: (row) => {
        return row.gene;
      },
      sortable: true,
      classNames: ['report_sankey'],
      style: {
        borderLeft: '1px solid #fff',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },

    {
      name: 'Yes',
      selector: (row) => {
        if (row.dna === 'YES') {
          if (row.gene in reportData['variant_info']) {
            let variants = reportData['variant_info'][row.gene];
            variants = variants.join('-');
            return (
              <div data-bs-toggle="tooltip" title={variants}>
                {'O  (' + reportData['variant_info'][row.gene].length + ')'}
              </div>
            );
          } else {
            return row.dna;
          }
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },
    {
      name: 'No',
      selector: (row) => {
        if (row.dna === 'NO') {
          return 'O ';
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },
    {
      name: 'High',
      selector: (row) => {
        if (row.rna === 'HIGH') {
          return 'O ';
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },
    {
      name: 'Intermediate',
      selector: (row) => {
        if (row.rna !== 'HIGH' && row.rna !== 'LOW') {
          return 'O ';
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },
    {
      name: 'Low',
      selector: (row) => {
        if (row.rna === 'LOW') {
          return 'O ';
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },
    {
      name: 'High',
      selector: (row) => {
        if (row.proteome === 'HIGH') {
          return 'O ';
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },
    {
      name: 'Intermediate',
      selector: (row) => {
        if (row.proteome !== 'HIGH' && row.proteome !== 'LOW') {
          return 'O ';
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    },
    {
      name: 'Low',
      selector: (row) => {
        if (row.proteome === 'LOW') {
          return 'O ';
        } else return '';
      },
      sortable: true,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #6F7378',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5'
      }
    }
  ];

  const closeShowOncoImages = () => {
    setShowOncoImages(false);
  };

  const closeShowTimelineTables = () => {
    setShowOncoTimelineTables(false);
  };


  useEffect(() => {
    if (reportData) {
      setTableData(reportData.genomic_summary);
      setBasicInformationData(reportData.basic_information);
    }
  }, [reportData]);

  const closeReportFunction = () => {
    setshowReportTable(false);
  };

  const isReportClickedFunction = (value) => {
    setIsReportClicked(value);
  };

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

  useEffect(() => {
    if (circosSanpleRnidListData) {
      setSamplesCount(Object.keys(circosSanpleRnidListData).length);
    }
  }, [circosSanpleRnidListData]);

  useEffect(() => {
    if (inputData) {
      if (sampleKey !== 'all') {
        let imageDocumentObject = document.getElementById('images');
        if (imageDocumentObject) {
          imageDocumentObject.classList.remove('opacity-50');
        }
        let tableDocumentObject = document.getElementById('tables');
        if (tableDocumentObject) {
          tableDocumentObject.classList.remove('opacity-50');
        }
      } else {
        let imageDocumentObject = document.getElementById('images');
        if (imageDocumentObject) {
          imageDocumentObject.classList.add('opacity-50');
        }
        let tableDocumentObject = document.getElementById('tables');
        if (tableDocumentObject) {
          tableDocumentObject.classList.add('opacity-50');
        }
      }

      let editInputData = inputData;
      editInputData = { ...editInputData, sampleKey: sampleKey };
      if (editInputData['genes'].length < 0) {
        setNoGeneData(true);
      } else {
        setNoGeneData(false);
      }
      if (editInputData.type !== '' && sampleKey !== '' && editInputData['genes'].length > 0) {
        setLoader(true);
        setRenderCircos(false);
        let returnData = CircosInformation('POST', editInputData);
        returnData.then((result) => {
          if (result.status === 200) {
            let r_ = result.data;
            r_['status'] = 200;
            setCircosJson(r_);
          } else {
            setCircosJson({ status: 204 });
          }
        });
      }
    }
  }, [inputData, sampleKey]);

  useEffect(() => {
    return () => {
      setCircosJson({ status: 0 });
      setSampleKey('');
    };
  }, []);

  let takeScreenshot = async () => {
    const element = document.getElementById('circos');
    let imgData;
    await html2canvas(element).then((canvas) => {
      imgData = canvas.toDataURL('image/jpeg', 1.0);
    });
    let link = document.createElement('a');
    link.href = imgData;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (inputData && inputData.genes.length > 0 && sampleKey !== '') {
      if (screenCapture) {
        if (reference !== null) {
          setWatermarkCSS('watermark');
        }
      } else {
        setWatermarkCSS('');
      }
      if (watermarkCss !== '' && screenCapture) {
        if (reference !== null) {
          takeScreenshot();
        }
        setToFalseAfterScreenCapture();
      }
    } else {
      setToFalseAfterScreenCapture();
    }
  }, [screenCapture, watermarkCss]);

  useEffect(() => {
    if (circosSanpleRnidListData) {
      let sampleListElementsTemp = [];
      let brstKeysObject = {};
      Object.keys(circosSanpleRnidListData).forEach((e) => {
        brstKeysObject = {
          ...brstKeysObject,
          [circosSanpleRnidListData[e]]: e
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
  }, [circosSanpleRnidListData]);

  useEffect(() => {
    setTimeout(function () {
      if (circosJson && circosJson.status !== 0) {
        setLoader(false);
        if (sampleKey !== 'all') {
          if (document.getElementById('images')) {
            document.getElementById('images').classList.remove('opacity-50');
          }
          if (document.getElementById('tables')) {
            document.getElementById('tables').classList.remove('opacity-50');
          }
        } else {
          if (document.getElementById('images')) {
            document.getElementById('images').classList.add('opacity-50');
          }
          if (document.getElementById('tables')) {
            document.getElementById('tables').classList.add('opacity-50');
          }
        }
      }
    }, 1000);
  }, [circosJson]);

  useEffect(() => {
    if (circosJson && circosJson.status) {
      if (circosJson.status === 200 && Object.keys(circosJson).length > 1) {
        setShowNoContent(false);
        setRenderCircos(true);
      } else if (circosJson.status === 0) {
        setLoader(true);
        setShowNoContent(false);
        setRenderCircos(false);
      } else {
        setRenderCircos(false);
        setShowNoContent(true);
      }
    }
  }, [circosJson]);

  var w = Math.floor((width / 100) * 75);
  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        <div
          style={{
            marginTop: '5%',
            border: '1px solid #d6d6d6',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            padding: '5%'
          }}
        >
          <div className="flex visualGrid">
            <div>
              {
                <div htmlFor="samples" className="lg:text-2xl sm:text-xl xs:text-sm">
                  <FormattedMessage id="Cir_choose_sample" defaultMessage="Choose a Sample" />: (
                  {samplesCount}){' '}
                </div>
              }
              <select
                className="selectBox"
                value={sampleKey}
                onChange={(e) => setSampleKey(e.target.value)}
                name="samples"
                id="samples"
              >
                <option className="xs:text-sm sm:text-sm lg:text-xl">Select Sample</option>
                {sampleListElements}
                <option className="xs:text-sm lg:text-xl" value="all">
                  all
                </option>
              </select>
            </div>
          </div>

          <div>
            <div>
              {renderCircos && (
                <CircosCmp
                  watermarkCss={watermarkCss}
                  ref={reference}
                  width={w}
                  data={circosJson}
                  selectedGenes={inputData.genes}
                />
              )}
              {showNoContent && <NoContentMessage />}
            </div>
          </div>
        </div>
      )}
      <div>
        {noGeneData && (
          <p>
            <FormattedMessage
              id="PleaseSelecttheGeneSetData"
              defaultMessage="Please Select the Gene Set Data"
            />
          </p>
        )}
      </div>
      {showOncoImages && (
        <PagenationTableComponent
          closeShowOncoImages={closeShowOncoImages}
          imageData={oncoImageJson}
        />
      )}
      {showOncoTimelineTables && (
        <GraphsModal
          circosTimelieTableData={circosTimelieTableData}
          closeShowTimelineTables={closeShowTimelineTables}
        />
      )}
      {showReportTable && (
        <Report
          sampleKey={circosSanpleRnidListData[sampleKey]}
          tableColumnsData={tableColumnsData}
          tableData={tableData}
          basicInformationData={basicInformationData}
          closeReportFunction={closeReportFunction}
          isReportClickedFunction={isReportClickedFunction}
          isReportClicked={isReportClicked}
        />
      )}

      {showReportTable && (
        <PDFReport
          sampleKey={circosSanpleRnidListData[sampleKey]}
          tableColumnsData={tableColumnsData}
          tableData={tableData}
          basicInformationData={basicInformationData}
        />
      )}
    </>
  );
}
