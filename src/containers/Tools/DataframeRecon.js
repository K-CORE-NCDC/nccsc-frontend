import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { matrixMelt, clearToolsData } from '../../actions/api_actions';
import Attachments from '../../assets/files/RNA_matrix_format.tsv';
import AttachmentsImage from '../../assets/images/MatrixToMeltedExampleFile.png';
import config from '../../config';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import LoaderCmp from '../Common/Loader';
import { useHistory } from 'react-router-dom';

function Modal({ showModal, setShowModal }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="Toolmodal-container">
            <div className="Toolmodal-content">
              <div className="Toolmodal-dialog">
                <div className="Toolmodal-header">
                  <h3 className="Toolmodal-title">Matrix to Melted Sample File</h3>
                  <button className="Toolmodal-close-btn" onClick={() => setShowModal(false)}>
                    ×
                  </button>
                </div>
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <ul style={{ margin: '10px' }}>
                      <li>
                      <FormattedMessage  id='MatrixToMeltedInfo' defaultMessage="This analysis tool is a tool that converts matrix format files to melted format files."/>
                      </li>
                    </ul>
                    <img src={AttachmentsImage} alt="ExampleFileImage" />
                    <div className="Flex FlexDirRow" style={{ marginTop: '20px', gap: '10px' }}>
                      <a className="Tooldownload-link" href={Attachments} download>
                        <FormattedMessage  id='DownloadFile' defaultMessage="Click on the link to download the sample file"/>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="Toolmodal-footer">
                  <button className="Toolmodal-close-btn" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="Toolmodal-overlay"></div>
        </>
      ) : null}
    </>
  );
}

function DataframeRecon() {
  const [matrixFile, setMatrixFile] = useState();
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState({});
  const [html, setHtml] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const matrixResponse = useSelector((data) => data.homeReducer.dataframe_recon);
  const title = { id: 'MyDataVisualization', defaultMessage: 'Visualize My Data' };
  const history = useHistory();

  const setShowModalFunction = (stateData) => {
    setShowModal(stateData);
  };
  const [startInterval, setStartInterval] = useState(false)
  const [loop, setLoop] = useState(null)
  const InforIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '2.5rem', height: '2.5rem' }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    );
  };

  let backend_url = config['auth'];
  let MatrixToMeltConvert = (event) => {
    setMatrixFile(event.target.files[0]);
  };

  let uploadFile = () => {
    if (matrixFile && matrixFile['name']) {
    if (matrixFile['name'].includes('.tsv')) {
      setIsError(false);
      setLoader(true);
      setHtml([])
      dispatch(matrixMelt('POST', { file: matrixFile, filename: matrixFile['name'] }));
      setMsg({ id: 'FileUplodPlsWait', defaultMessage: 'File Uploading, Please Wait......' });
    } else {
      setIsError(true);
    }
  }
  else{
    alert("No files uploaded. Please select files to upload.");
  }
  };

  useEffect(() => {
    if (startInterval) {
      setLoop(setInterval(() => {
        dispatch(matrixMelt("GET", { "container_name": matrixResponse['container_name'] }))
      }, 10000));
    }
  }, [startInterval])

  useEffect(() => {
    if (matrixResponse) {
      if (matrixResponse['status'] === 'running') {
        setLoader(true);
        setStartInterval(true)
        setMsg({ id: 'FileUploadConverSt', defaultMessage: 'File Uploaded, Conversion Started.....' });
      } else {
        setLoader(false);
        setStartInterval(false)
        setLoop(interval => {
          clearInterval(interval);
          return null;
        });
        let h = [];
        h.push(
          <div key={matrixResponse['output_file']} className="Flex FlexDirRow">
            <FormattedMessage id='RefverResult1' defaultMessage='Your results are ready.' />
            <FormattedMessage id='RefverResult2' defaultMessage=' Click on the link to download' />
            <a
              className="ToolResultsReady"
              href={
                backend_url + 'media/DfReconstruction/files/' + matrixResponse['output_file']
              }
              download={matrixResponse['output_file']}
            >
              {matrixResponse['output_file']}
            </a>
          </div>
        );
        setHtml(h);
      }
    }
  }, [matrixResponse]);

  useEffect(() => {
    return () => {
      dispatch(clearToolsData());
    };
  }, []);

  const breadCrumbs = {
    '/dataframeconverter/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: 'MyDataVisualization', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
      { id: 'Tools', defaultMessage: 'Other Tools', to: '/tools/' },
      { id: 'DataframeRecon', defaultMessage: 'Dataframe Converter', to: '/dataframeconverter/' }
    ]
  };

  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/dataframeconverter/']} type="single" />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <div className="auto">
            <h3 className="colorSecondary">
              <span className="colorPrimary">Dataframe</span> Converter
            </h3>
          </div>
        </div>
        <div className="ptn">
          <div className="auto">
            <div>
              {showModal && <Modal showModal={showModal} setShowModal={setShowModalFunction} />}
            </div>

            <div className="Tool formBox" style={{ paddingTop: '0px' }}>
              <div className="PY5">
                {!loader ? (
                  <section className="Section">
                    <div>
                      <div className="BG">
                        <div className="ModalBtn" style={{ marginBottom: '20px' }}>
                          <button onClick={() => setShowModal(true)} className="ToolModalBtn">
                            <InforIcon />
                          </button>
                        </div>
                        <div>
                          <div>
                            <dl>
                              <dt>
                                <FormattedMessage id="UploadFile" defaultMessage="Upload File" />
                              </dt>
                              <dd>
                                <div className="inputText">
                                  <input
                                    type="file"
                                    className="w100"
                                    accept=".tsv, "
                                    id="MatrixFile"
                                    onChange={(e) => MatrixToMeltConvert(e)}
                                    autoComplete="off"
                                    style={{ padding: '10px' }}
                                  />
                                </div>
                              </dd>
                            </dl>
                            {!matrixResponse &&
                              <button className="btn btnPrimary SubmitButton" onClick={uploadFile}>
                                <FormattedMessage id="Submit" defaultMessage="Submit" />
                              </button>
                            }
                          </div>
                          {isError && <p>Upload only .tsv extension files</p>}
                        </div>
                      </div>
                      {!matrixResponse &&
                        <span
                          style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }}
                          className="Flex"
                        >
                          <FormattedMessage
                            id="tsvaccepted"
                            defaultMessage=" Note: only .tsv file accepted"
                          />
                        </span>
                      }
                      {matrixResponse &&
                        <span
                        style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }}
                        className="Flex"
                        >(
                          <FormattedMessage
                            id="VcfToMafRefresh"
                            defaultMessage="Please refresh page to upload and convert again"
                          />)
                        </span>
                      }
                    </div>
                  </section>
                ) : (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                      <LoaderCmp />
                      <p className="MultiUploadTextCenter">
                        <FormattedMessage id={msg?.id} defaultMessage={msg?.defaultMessage} />
                      </p>
                    </div>
                  </>
                )}
              </div>
              {html.length > 0 && (
                <section className="DataframeHtml">
                  <div>
                    <div>{html}</div>
                  </div>
                </section>
              )}
            </div>

            <div style={{ marginTop: '50px' }}>
              <button
                id="BackButton"
                className="btn btnPrimary"
                style={{ float: 'right', margin: '10px 0px 10px 0px' }}
                onClick={() => history.push(`/tools/`)}
              >
                <FormattedMessage id="Back" defaultMessage="Back" />
              </button>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}

export default DataframeRecon;
