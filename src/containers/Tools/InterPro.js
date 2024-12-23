import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { interPro, clearToolsData } from '../../actions/api_actions';
import Attachments from '../../assets/files/insulin.fasta';
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
              {/*content*/}
              <div className="Toolmodal-dialog">
                {/*header*/}
                <div className="Toolmodal-header">
                  <h3 className="Toolmodal-title">Interpro Sample File</h3>
                  <button className="Toolmodal-close-btn" onClick={() => setShowModal(false)}>
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <div className="Flex FlexDirRow" style={{ marginTop: '20px', gap: '10px' }}>
                      <a className="Tooldownload-link" href={Attachments} download>
                      <FormattedMessage  id='DownloadFile' defaultMessage="Click on the link to download the sample file"/>
                      </a>
                    </div>
                  </div>
                </div>
                {/*footer*/}
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

function InterPro() {
  const [interProFile, setInterProFile] = useState({});
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState('');
  const [startInterval, setStartInterval] = useState(false)
  const [html, setHtml] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loop, setLoop] = useState(null)
  const interproResponse = useSelector((data) => data.homeReducer.interpro);
  const dispatch = useDispatch();
  const history = useHistory();
  let backend_url = config['auth'];

  const [selectedOption, setSelectedOption] = useState('textarea'); // Default selected option
  const title = { id: 'Other Tools: Interpro', defaultMessage: 'Interpro' };

  const setShowModalFunction = (stateData) => {
    setShowModal(stateData);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  let uploadFile = () => {
    // Check if interProFile is defined and has a name property
    if (interProFile && interProFile['name']) {
      if (interProFile['name'].endsWith('.fasta')) {
        setIsError(false);
        setLoader(true);
        setHtml([]);
        dispatch(interPro('POST', { file: interProFile, filename: interProFile['name'] }));
        setMsg({ id: 'FileUplodPlsWait', defaultMessage: 'File Uploading, Please Wait......' });
      } else {
        setIsError(true);
        setMsg({ id: 'InvalidFileType', defaultMessage: 'Invalid file type. Please upload a .fasta file.' });
      }
    } else {
      setIsError(true);
      alert("No files uploaded. Please select files to upload.");
    }
  };

  useEffect(() => {
    if (interproResponse) {
      if (interproResponse['status'] === 'running') {
        setLoader(true)
        setStartInterval(true)
        setMsg({ id: 'InterproFileUploadAnalysisSt', defaultMessage: 'File Uploaded, Analysis Started.....' });
      } else {
        setLoader(false)
        setStartInterval(false)
        setLoop(interval => {
          clearInterval(interval);
          return null;
        });
        let h = [];
        h.push(
            <div key={interproResponse['container_name']} className="Flex FlexDirRow">
              <FormattedMessage id='RefverResult1' defaultMessage='Your results are ready.' />
              <FormattedMessage id='RefverResult2' defaultMessage=' Click on the link to download' />
              <a
                className="ToolResultsReady"
                href={
                  backend_url +
                  'media/Interpro/files/' +
                  interproResponse['container_name'] +
                  '.tsv'
                }
                download={interproResponse['container_name'] + '.tsv'}
              >
                {interproResponse['container_name']+'.tsv'}
              </a>
            </div>
        );
        setHtml(h);
      }
    }
  }, [interproResponse]);

  useEffect(() => {
    if (startInterval) {
      setLoop(setInterval(() => {
        dispatch(interPro("GET", { "container_name": interproResponse['container_name'] }))
      }, 10000));
    }
  }, [startInterval])

  useEffect(() => {
    return () => {
      dispatch(clearToolsData());
    };
  }, []);


  const handleTextAreaChange = (e) => {
    const sequence = e.target.value;
    makeInterproFile(sequence);
  };

  const makeInterproFile = (sequence) => {
    const fileName = 'user_input.fasta'; // You can customize the file name here
    const blob = new Blob([`${sequence}`], { type: 'text/plain' });
    setInterProFile(new File([blob], fileName, { type: 'text/plain' }));
  };

  const InterProTool = (event) => {
    setInterProFile(event.target.files[0]);
  };


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

  const breadCrumbs = {
    '/interpro/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: 'MultiDataVisualization', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
      { id: 'Tools', defaultMessage: 'Other Tools', to: '/tools/' },
      { id: 'Interpro', defaultMessage: 'Interpro', to: '/interpro/' }
    ]
  };

  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/interpro/']} type="single" />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <div className="auto">
            <h3 className="colorSecondary">
              <span className="colorPrimary">Inter</span>
              pro
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
                      <div>
                        <div className="BG">
                          <div className="ModalBtn" style={{ marginBottom: '20px' }}>
                            <button onClick={() => setShowModal(true)} className="ToolModalBtn">
                              <InforIcon />
                            </button>
                          </div>
                        </div>
                        <div style={{ marginBottom: '40px' }}>
                          <p style={{ lineHeight: '2.5rem', textAlign: 'justify' }}>
                            <FormattedMessage
                              id="InterproDesc1"
                              defaultMessage=" InterPro is a resource that provides functional analysis of protein sequences by classifying them into families and predicting the presence of domains and important sites."
                            />
                          </p>
                          <p style={{ lineHeight: '2.5rem', textAlign: 'justify' }}>
                            <FormattedMessage
                              id="InterproDesc2"
                              defaultMessage="To classify proteins, InterPro uses predictive models called signatures, provided by several collaborating databases that collectively make up the InterPro consortium"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="Flex FlexDirCol ItemsCenter" style={{ gap: '10px' }}>

                        {selectedOption === 'textarea' && (
                          <div>
                            <dl>
                              <dt>
                                <FormattedMessage
                                  id="SequenceInFormat"
                                  defaultMessage="Sequence, in FASTA format"
                                />
                              </dt>
                              <dd>
                                <label htmlFor='message'></label>
                                <div className="">
                                  <FormattedMessage
                                    id="EnterYourSequence"
                                    defaultMessage="Enter your sequence"
                                  >
                                    {(msg) => (
                                      <textarea
                                        type="file"
                                        className="w100"
                                        id="message"
                                        rows="4"
                                        placeholder={msg}
                                        autoComplete="off"
                                        style={{ padding: '10px' }}
                                        onChange={handleTextAreaChange}
                                      />
                                    )}
                                  </FormattedMessage>
                                </div>
                              </dd>
                            </dl>
                          </div>
                        )}

                        {selectedOption === 'file' && (
                          <div>
                            <dl>
                              <dt>
                                <FormattedMessage id="UploadFile" defaultMessage="Upload File" />
                              </dt>
                              <dd>
                              <label htmlFor='interpro_file_input'></label>
                                <div className="inputText">
                                  <FormattedMessage id="NoFileChosen" defaultMessage="No File Chosen">
                                    {(msg) => (
                                      <input id='interpro_file_input'
                                        type="file"
                                        className="w100"
                                        accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
                                        data-title={msg}
                                        // id="FastaFile"
                                        onChange={InterProTool}
                                        placeholder="Please Select the File"
                                        autoComplete="off"
                                        style={{ padding: '10px' }}
                                      />
                                    )}
                                  </FormattedMessage>
                                </div>
                              </dd>
                            </dl>
                          </div>
                        )}

                        <div>
                          <dl>
                            <dt>
                              <FormattedMessage
                                id="SelectOption"
                                defaultMessage="Select one"
                              />
                            </dt>
                            <dd>
                              <div className="Flex">
                                <label>
                                  <FormattedMessage
                                    id="Sequence"
                                    defaultMessage="Sequence"
                                  />
                                  <input
                                    type="checkbox"
                                    value="textarea"
                                    checked={selectedOption === 'textarea'}
                                    onChange={() => handleOptionChange('textarea')}
                                    className="M4"
                                  />
                                </label>
                                <label>
                                  <FormattedMessage
                                    id="File"
                                    defaultMessage="File"
                                  />
                                  <input
                                    type="checkbox"
                                    value="file"
                                    checked={selectedOption === 'file'}
                                    onChange={() => handleOptionChange('file')}
                                    className="M4"
                                  />
                                </label>
                              </div>
                            </dd>
                          </dl>
                        </div>


                        <div>
                          {!interproResponse &&
                            <button className="btn btnPrimary SubmitButton" onClick={uploadFile}>
                              <FormattedMessage id="Submit" defaultMessage="Submit" />
                            </button>
                          }
                        </div>
                        {isError && <p>Upload only .fasta extension files</p>}
                      </div>
                      {!interproResponse &&
                        <span
                          style={{
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            justifyContent: 'center',
                            marginTop: '40px'
                          }}
                          className="Flex"
                        >
                          <FormattedMessage
                            id="interProNote"
                            defaultMessage="Note: protein sequence should be present in .fasta format"
                          />
                        </span>
                      }
                      {interproResponse &&
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
                <section className="VCFHtml">
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

export default InterPro;
