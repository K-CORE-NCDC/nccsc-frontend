import React, { useEffect, useRef, useState } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { FormattedMessage,useIntl } from 'react-intl';
import { PcaInformation } from '../../../actions/api_actions';
import '../../../assets/css/style.css';
import '../../../styles/css/Scatter.css';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import PcaPlot from '../../Common/PCAPlot';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function Pca({inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef(null);
  const [pcaJson, setPcaJson] = useState({});
  const [watermarkCss, setWatermarkCSS] = useState('');
  const [loader, setLoader] = useState(false);
  const [inputState, setInputState] = useState({});
  const [showPca, setShowPca] = useState(false);
  const [noContent, setNoContent] = useState(false);
  const [noGeneData, setNoGeneData] = useState(true);
  const [tableType, setTableType] = useState('');
  const [projectId, setProjectId] = useState(false);
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  const intl = useIntl();

  const tabList = useSelector((data) => data.dataVisualizationReducer);
  const changeTabType = (e,type)=>{
    setTableType(type);
  }
  useEffect(() => {
    if ('userProjectsDataTable' in tabList && projectId) {
      let _data = tabList?.userProjectsDataTable;
      if (_data['proteome'] !== null) {
        setTableType('proteome');
      } else if (_data['rna'] !== null) {
        setTableType('rna');
      }
    }
  }, [tabList,projectId]);

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData }));

      if ('project_id' in inputData){
        setProjectId(true);
      }
      else{
        setTableType('proteome')
      }

    }
  }, [inputData]);

  useEffect(() => {
    if (inputState && 'genes' in inputState && tableType) {

      let g = inputState['genes'];
      let dataJson = inputState;
      if (tableType){
        if (tableType === 'proteome' || tableType === 'rna') {
          dataJson['genes'] = g;
        }
        if (inputState.type == 'all-genes'){
          dataJson['genes'] = ['all-genes'];
        }
        if (inputState.type !== '' && inputState['genes'].length > 0) {
          setLoader(true);
          dataJson['table_type'] = tableType;
          callPca(dataJson)
          setNoGeneData(false);
        }
        else {
          setNoGeneData(true);
        }
      }

    }
  }, [inputState, tableType]);

  const callPca = (dataJson) => {
    setLoader(true);
    let return_data = PcaInformation('POST', dataJson);
    return_data
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          let r_ = d['data'];
          r_['status'] = 200;
          setPcaJson(r_);
        }
        else {
          setPcaJson({ status: 204 });
        }
        setLoader(false);
      })
      .catch(() => {
        Swal.fire({
          title: intl.formatMessage({ id: "Warning", defaultMessage: 'Warning' }),
          text: intl.formatMessage({ id: "DataError", defaultMessage: 'Not enough data. Please select other genes (at least 2 genes).' }),
          icon: 'warning',
          confirmButtonColor: '#003177',
          confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
          allowOutsideClick: false
        })
        setPcaJson({ status: 204 });
        setLoader(false);
      });
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
          fileName: 'PCA',
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
    if (!noGeneData) {
      if (pcaJson && pcaJson.status === 200) {
        setShowPca(true);
        setNoContent(false);
      } else if (pcaJson && pcaJson.status !== 200) {
        setShowPca(false);
        setNoContent(true);
      }
    }
  }, [pcaJson, noGeneData]);


  return (
    <div
      style={{
        marginTop: '5%',
        border: '1px solid #d6d6d6',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
        padding: '5%'
      }}
    >
      <div>
        <div className="maintabs_box">
          <div className="selctionBox">
            <div style={{ paddingLeft: '1%' }}>
            </div>
          </div>
        </div>

      </div>
      {!projectId && <>
        <div className="tab mainTab">
            <div className="tab_main">
              <ul>
                <li className={tableType === 'proteome' ? 'on' : ''}>
                  <button
                    type="button"
                    name="maintype"
                    onClick={(e) => {
                      changeTabType(e, 'proteome');
                    }}
                  >
                    Proteome
                  </button>
                </li>
                <li className={tableType === 'rna' ? 'on' : ''}>
                  <button
                    type="button"
                    name="maintype"
                    onClick={(e) => {
                      changeTabType(e, 'rna');
                    }}
                  >
                    RNA
                  </button>
                </li>
              </ul>
            </div>
          </div>
      </>}
      {loader || isTakingScreenshot ?
        (
          <LoaderCmp />
        ) : (
          <>
            {showPca && (
              <PcaPlot watermarkCss={watermarkCss} ref={reference} pca_data={pcaJson} />
            )}
            {noContent && <NoContentMessage />}
          </>
        )
      }
      {inputData.genes.length === 0 && (
        <p>
          <FormattedMessage
            id="PleaseSelecttheGeneSetData"
            defaultMessage="PleaseSelect the Gene Set Data"
          />
        </p>
      )}
    </div>
  );
}
