import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import { FormattedMessage } from 'react-intl';
import { ScatterInformation } from '../../../actions/api_actions';
import '../../../assets/css/style.css';
import '../../../styles/css/Scatter.css';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import ScatterPlot from '../../Common/ScatterPlot';

export default function Scatter({inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef();
  const [scatterJson, setScatterJson] = useState({});
  const [watermarkCss, setWatermarkCSS] = useState('');
  const [loader, setLoader] = useState(false);
  const [gene, setGene] = useState('');
  const [genesHtml, setGenesHtml] = useState([]);
  const [inputState, setInputState] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [showScatter, setShowScatter] = useState(false);
  const [noContent, setNoContent] = useState(false);
  const [selectall, setSelectAll] = useState(false);
  const [primaryGene, setPrimaryGene] = useState('');
  const [lastRemoveItem, setLastRemoveItem] = useState([]);
  const [lastRemove, setLastRemove] = useState(false);
  const [noGeneData, setNoGeneData] = useState(true);
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData }));
    }
  }, [inputData]);

  useEffect(() => {
    if (inputState && 'genes' in inputState) {
      let g = inputState['genes'];
      loadGenesDropdown(g);
      setGene(g);
      if (inputState.type !== '' && inputState['genes'].length > 0) {
        let dataJson = inputState;
        setLoader(true);
        dataJson['genes'] = [g[0]];
        let return_data = ScatterInformation('POST', dataJson);
        return_data
          .then((result) => {
            const d = result;
            if (d.status === 200) {
              let r_ = d['data'];
              r_['status'] = 200;
              setScatterJson(r_);
            } else {
              setScatterJson({ status: 204 });
            }
          })
          .catch(() => {
            setScatterJson({ status: 204 });
          });
        setNoGeneData(false);
      } else {
        setNoGeneData(true);
      }
    }
  }, [inputState]);

  const loadGenesDropdown = (genes) => {
    let t = [];
    for (let i = 0; i < genes.length; i++) {
      t.push({ name: genes[i], id: i });
    }
    setGenesHtml(t);
    let select_ = t.slice(0, 1);
    setSelectedValue(select_);
    setPrimaryGene(select_);
  };

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS('watermark');
    } else {
      setWatermarkCSS('');
    }

    if (watermarkCss !== '' && screenCapture) {
      if (reference?.current) {
        setIsTakingScreenshot(true);
        exportComponentAsPNG(reference, {
          fileName: 'Corelation',
          html2CanvasOptions: {}
        }).then(() => {
          setIsTakingScreenshot(false);
          setToFalseAfterScreenCapture();
        }).catch((err) => {
          console.error('Screenshot error:', err);
          setIsTakingScreenshot(false);
        });
      }
      // else {
      //   Swal.fire({
      //     title: intl.formatMessage({ id: "Warning", defaultMessage: 'Warning' }),
      //     text: intl.formatMessage({ id: "EnterProjectName", defaultMessage: 'No plot generated yet!' }),
      //     icon: 'warning',
      //     confirmButtonColor: '#003177',
      //     confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
      //     allowOutsideClick: false
      //   });
      //   setToFalseAfterScreenCapture();
      // }
    }
  }, [screenCapture, watermarkCss]);

  function onSelect(selectedList) {
    let genes = [];
    selectedList.forEach((item) => {
      genes.push(item['name']);
    });
    if (inputData.type !== '' && inputState['genes'].length > 0) {
      let dataJson = { ...inputData };
      dataJson['genes'] = genes;
      setLoader(true);
      let return_data = ScatterInformation('POST', dataJson);
      return_data
        .then((result) => {
          const d = result;
          if (d.status === 200) {
            let r_ = d['data'];
            r_['status'] = 200;
            setScatterJson(r_);
          } else {
            setScatterJson({ status: 204 });
          }
        })
        .catch(() => {
          setScatterJson({ status: 204 });
        });
    }
  }

  function onRemove(selectedList, removedItem) {
    let genes = [];
    setSelectedValue(selectedList);
    selectedList.forEach((item) => {
      genes.push(item['name']);
    });

    if (selectedList.length === 0) {
      setLastRemoveItem([removedItem]);
      setLastRemove(true);
    } else {
      setLastRemove(false);
    }
    if (genes.length === 0 && selectedList.length === 0) {
      genes = [removedItem['name']];
    }
    if (inputData.type !== '') {
      let dataJson = { ...inputData };
      dataJson['genes'] = genes;
      setLoader(true);
      let return_data = ScatterInformation('POST', dataJson);
      return_data
        .then((result) => {
          const d = result;
          if (d.status === 200) {
            let r_ = d['data'];
            r_['status'] = 200;
            setScatterJson(r_);
          } else {
            setScatterJson({ status: 204 });
          }
        })
        .catch(() => {
          setScatterJson({ status: 204 });
        });
    }
  }

  useEffect(() => {
    setTimeout(function () {
      setLoader(false);
    }, 10000);
  }, [scatterJson]);

  useEffect(() => {
    if (!noGeneData) {
      if (scatterJson && scatterJson.status === 200) {
        setShowScatter(true);
        setNoContent(false);
        if (lastRemove) {
          setSelectedValue(lastRemoveItem);
        }
      } else if (scatterJson && scatterJson.status !== 200) {
        setShowScatter(false);
        setNoContent(true);
      }
    }
  }, [scatterJson, noGeneData]);

  function selectAll() {
    if (selectall === false) {
      setSelectAll(!selectall);
      setSelectedValue('');
      if (inputState && 'genes' in inputState) {
        if (inputState.type !== '' && inputState['genes'].length > 0) {
          let dataJson = inputState;
          setLoader(true);
          dataJson['genes'] = gene;
          let return_data = ScatterInformation('POST', dataJson);
          return_data
            .then((result) => {
              const d = result;
              if (d.status === 200) {
                let r_ = d['data'];
                r_['status'] = 200;
                setScatterJson(r_);
              } else {
                setScatterJson({ status: 204 });
              }
            })
            .catch(() => {
              setScatterJson({ status: 204 });
            });
        }
      }
    } else {
      setSelectAll(!selectall);
      setSelectedValue(primaryGene);
      if (inputState && 'genes' in inputState) {
        if (inputState.type !== '' && inputState['genes'].length > 0) {
          let dataJson = inputState;
          setLoader(true);
          dataJson['genes'] = [gene[0]];
          let return_data = ScatterInformation('POST', dataJson);
          return_data
            .then((result) => {
              const d = result;
              if (d.status === 200) {
                let r_ = d['data'];
                r_['status'] = 200;
                setScatterJson(r_);
              } else {
                setScatterJson({ status: 204 });
              }
            })
            .catch(() => {
              setScatterJson({ status: 204 });
            });
        }
      }
    }
  }

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
            <div style={{ paddingTop: '1%' }}>
              <FormattedMessage id="Selected Gene Is" defaultMessage="Selected Gene Is" />
            </div>
            <div style={{ paddingLeft: '1%' }}>
              <Multiselect
                options={genesHtml} // Options to display in the dropdown
                selectedValues={selectedValue} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="All_select">
            <label className="">
              <input type="checkbox" className="" checked={selectall} onChange={selectAll} />
              <span className="ml-2">
                <strong className="">
                  <FormattedMessage id="Select all" defaultMessage="Select all" />
                </strong>
              </span>
            </label>
          </div>
        </div>
        <div style={{ paddingTop: '3%', justifyContent: 'flex-start', display: 'flex', gap: '5%' }}>
          {showScatter && scatterJson['r_value'] ? (
            <h4 className="">
              <strong>r:</strong> {scatterJson['r_value']}
            </h4>
          ) : (
            ''
          )}
          {showScatter && scatterJson['p_value'] ? (
            <h4 className="">
              <strong>P-value:</strong> {scatterJson['p_value']}
            </h4>
          ) : (
            ''
          )}
        </div>
      </div>
      {loader || isTakingScreenshot ? (
        <LoaderCmp />
      ) : (
        <>
          {showScatter && (
            <ScatterPlot watermarkCss={watermarkCss} ref={reference} scatter_data={scatterJson} />
          )}
          {noContent && <NoContentMessage />}
        </>
      )}
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
