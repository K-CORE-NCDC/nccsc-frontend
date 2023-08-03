import React, { useState, useEffect } from 'react'

import {
  vcfmaf
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";
import LoaderCmp from '../Common/Loader'
import config from '../../config';
import { FormattedMessage } from 'react-intl';
import Attachments from '../../assets/files/TkExMjg3OC5FVkEuMTAwLnZjZg.vcf'
import AttachmentsImage from "../../assets/images/vcftomafexample_File.png";
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";


function Modal({ showModal, setShowModal, body }) {
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
                  <h3 className="Toolmodal-title">Vcf to Maf Sample File</h3>
                  <button
                    className="Toolmodal-close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <ul style={{margin:"10px"}}>
                      <li>VCF(Variant Call Format) is a text file format for variant information.</li>
                      <li>It contains meta-information lines, a headerline, and then data lines each containing information about a position in the genome.</li>
                      <li>The format also has the ability to contain genotype information on samples for each position.</li>
                    </ul>
                    <img src={AttachmentsImage} alt="ExampleFileImage" />
                    <div className='Flex FlexDirRow' style={{marginTop:"20px", gap:"10px"}}>

                    <p>Click on the link to download the sample file</p>
                    <a className="Tooldownload-link" href={Attachments} download>
                      Download
                    </a>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="Toolmodal-footer">
                  <button
                    className="Toolmodal-close-btn"
                    onClick={() => setShowModal(false)}
                  >
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

function Vcfmaf() {
  const [vcfMafFile, setVcfMafFile] = useState()
  const [loader, setLoader] = useState(false)
  const [startInterval, setStartInterval] = useState(false)
  const [msg, setMsg] = useState('')
  const [loop, setLoop] = useState(null)
  const [html, setHtml] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch();
  const vcf2mafResponse = useSelector((data) => data.homeReducer.vcfmaf);
  const title = { id: "VCFMAF", defaultMessage: "VCF To MAF" }

  const setShowModalFunction = (stateData) => {
    setShowModal(stateData)
  }

  const InforIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "2.5rem", height: "2.5rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }
  
  let backend_url = config['auth']
  let VcfMafTool = (event) => {
    setVcfMafFile(event.target.files[0])
  }


  let uploadFile = () => {
    if (vcfMafFile["name"].includes(".vcf")) {
      setIsError(false)
      setLoader(true)
      dispatch(vcfmaf("POST", { "file": vcfMafFile, "filename": vcfMafFile["name"] }));
      setMsg('File Uploading, Please Wait......')
    }
    else {
      setIsError(true)
    }

  };

  useEffect(() => {
    if (startInterval) {
      setLoop(setInterval(() => {
        dispatch(vcfmaf("GET", { "container_name": vcf2mafResponse['container_name'] }))
      }, 10000));
    }
  }, [startInterval])



  useEffect(() => {
    if (vcf2mafResponse) {
      if (vcf2mafResponse['status'] === 'running') {
        setLoader(true)
        setStartInterval(true)
        setMsg('File Uploaded, Conversion Started.....')
      } else {
        setLoader(false)
        setStartInterval(false)
        setLoop(interval => {
          clearInterval(interval);
          return null;
        });
        let h = []
        h.push(
          <>
            <div className='Flex FlexDirRow'>
              <p>Your Results are ready kindly click link to download &nbsp;</p>
              <a className='ToolResultsReady'
                href={backend_url + "media/VcfMap/files/" + vcf2mafResponse['container_name'] + ".maf"}
                download={vcf2mafResponse['container_name'] + ".maf"}>{vcf2mafResponse['container_name']}</a>
            </div>
          </>
        )
        setHtml(h)
      }
    }
  }, [vcf2mafResponse])

  const breadCrumbs = {
    '/vcfmaf/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: 'Tools', defaultMessage: 'Tools', to: '/tools/' },
      { id: 'VCFMAF', defaultMessage: 'VCF To MAF', to: '/vcfmaf/' }
    ],
  };

  return (
    <div>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/vcfmaf/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <div className="auto">
            <h3 className="colorSecondary">
              <span className="colorPrimary">VCF T</span>
              o MAF
            </h3>
          </div>
        </div>
        <div className="ptn">
          <div className="auto">
            <div>
              {showModal && <Modal showModal={showModal} setShowModal={setShowModalFunction} />}
            </div>

            <div className='Tool formBox' style={{paddingTop:"0px"}}>
              <div className="PY5">
                {!loader ? <section className="Section">
                  <div>
                    <div className="BG">
                      <div className="ModalBtn" style={{marginBottom:"20px"}}>
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
                                <input type="file" className="w100" accept=".vcf, " id="VcfMafFile" onChange={(e) => VcfMafTool(e)}  autoComplete="off" style={{ padding: "10px" }} />
                              </div>
                            </dd>
                          </dl>
                          <button
                            className='btn btnPrimary SubmitButton' onClick={uploadFile}>
                            <FormattedMessage id="Submit" defaultMessage="Submit" />
                          </button>
                        </div>
                        {isError && <p>Upload only .vcf extension files</p>}
                      </div>
                    </div>
                    <span style={{ fontSize: "1rem", lineHeight: "1.5rem", justifyContent: "center" }} className='Flex'>
                     
                      <FormattedMessage id="VcfToMafNote" defaultMessage=" Note: only .vcf file accepted and files which are generated using genome version hg38" />
                    </span>
                  </div>
                </section>
                  : <>
                    <LoaderCmp />
                    <p className='MultiUploadTextCenter'>
                      {msg}
                    </p>
                  </>}
              </div>
              {html.length > 0 &&
                <section className="VCFHtml">
                  <div>
                    <div>
                      {html}
                    </div>
                  </div>
                </section>
              }
            </div>

          </div>
        </div>
      </article>
    </div>

  )
}

export default Vcfmaf