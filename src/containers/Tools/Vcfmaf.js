import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { vcfmaf, clearToolsData } from '../../actions/api_actions';
import Attachments from '../../assets/files/TkExMjg3OC5FVkEuMTAwLnZjZg.vcf';
import AttachmentsImage from '../../assets/images/vcftomafexample_File.png';
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
                  <h3 className="Toolmodal-title">Vcf to Maf Sample File</h3>
                  <button className="Toolmodal-close-btn" onClick={() => setShowModal(false)}>
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <ul style={{ margin: '10px' }}>
                      <li>
                        본 분석도구는 VCF 형식 파일을 MAF 형식 파일로 변환하는 도구입니다.
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

function Vcfmaf() {
  const fileInputRef = useRef(null);
  const [vcfMafFiles, setVcfMafFiles] = useState({});
  const [vcfMafFilesName, setVcfMafFilesName] = useState([]);
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState({});
  const [html, setHtml] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const vcf2mafResponse = useSelector((data) => data.homeReducer.vcfmaf);
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
  // let VcfMafTool = (event) => {
  //   setVcfMafFiles(event.target.files[0]);
  // };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (newFiles.length + Object.keys(vcfMafFiles).length > 5) {
        alert("You can upload a maximum of 5 files at once.");
        return;
    }
    let totalSize = 0;

    // Calculate the total size of already selected files
    for (const fileKey in vcfMafFiles) {
        totalSize += vcfMafFiles[fileKey].file.size;
    }

    // Calculate the total size of the new files
    let newFilesSize = 0;
    for (let i = 0; i < newFiles.length; i++) {
        newFilesSize += newFiles[i].size;
    }

    // Check if the total number of files does not exceed 50 and the total size is less than or equal to 500MB
    if (newFiles.length + Object.keys(vcfMafFiles).length <= 5 && totalSize + newFilesSize <= 500 * 1024 * 1024) {
        const newFormData = { ...vcfMafFiles };

        for (let i = 0; i < newFiles.length; i++) {
            const newFile = newFiles[i];
            const newFileName = newFile.name;
            newFormData[newFileName] = {
                file: newFile,
                fileName: newFileName,
            };
        }

        setVcfMafFiles(newFormData);

        const newFileNames = newFiles.map((file) => file.name);
        setVcfMafFilesName([...vcfMafFilesName, ...newFileNames]);
    } else if (totalSize + newFilesSize > 500 * 1024 * 1024) {
        alert("The total file size should not exceed 500MB.");
    } else {
        alert("Maximum 5 files are allowed.");
    }
};
const handleFileRemove = (fileName) => {

  setVcfMafFiles((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      delete updatedFormData[fileName];
      return updatedFormData;
  });

  const updatedFileNames = vcfMafFilesName.filter((name) => name !== fileName);

  setVcfMafFilesName(updatedFileNames);
};

function isAlphanumeric(str) {
  // Check if the string contains only alphanumeric characters
  return /^[a-zA-Z0-9_.-]+$/.test(str);
}

let uploadFile = () => {
  if (Object.keys(vcfMafFiles).length === 0) {
    alert("No files uploaded. Please select files to upload.");
    return;
  }
  // Check if all files in the object have the ".vcf" extension
  const areAllFilesVcf = Object.keys(vcfMafFiles).every(file => file.endsWith('.vcf'));
  const alphanum= Object.keys(vcfMafFiles).every(file => {
      let fileNameWithoutExtension = file.split('.').slice(0, -1).join('.');
      return isAlphanumeric(fileNameWithoutExtension);
  });

  if (areAllFilesVcf && Object.keys(vcfMafFiles)?.length > 0 && alphanum) {
      console.log(vcfMafFiles)
      console.log(vcfMafFiles['fileName'])
      setIsError(false);
      setLoader(true);
      setHtml([])
      dispatch(vcfmaf('POST', { vcfMafFiles: vcfMafFiles}));
      setMsg({ id: 'FileUplodPlsWait', defaultMessage: 'File Uploading, Please Wait......' });
  } else {
      if (!alphanum) {
          alert("Invalid file name. Only alphanumeric characters are allowed.");
      }
      else if (!areAllFilesVcf){
      setIsError(true);
      setMsg({ id: 'RefverInvalid', defaultMessage: 'Invalid file format. Please select VCF files only.' });}
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
          <>
            <div className="Flex FlexDirRow">
            <span
              style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }}
              className="Flex"
              >
              <FormattedMessage id='RefverResult1' defaultMessage='Your results are ready.' />
              <FormattedMessage id='RefverResult2' defaultMessage=' Click on the link to download' />

              {vcf2mafResponse.zip_file_url ? (
                <a
                    className="ToolResultsReady"
                    href={
                        backend_url +
                          'media/VcfMaf/output/' + vcf2mafResponse.zip_file_url}
                    download
                >
                    {` (${vcf2mafResponse.zip_file_url}) `}
                </a>
                  ) : (
                      <span>{` (${vcf2mafResponse['container_name']}) `}</span>
                  )}
              </span>
            </div>
          </>
        );
        setHtml(h);
      }
    }
  }, [vcf2mafResponse]);

  useEffect(() => {
    return () => {
      dispatch(clearToolsData());
    };
  }, []);

  const breadCrumbs = {
    '/vcfmaf/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: 'MyDataVisualization', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
      { id: 'Tools', defaultMessage: 'Other Tools', to: '/tools/' },
      { id: 'VCFMAF', defaultMessage: 'VCF To MAF', to: '/vcfmaf/' }
    ]
  };
  function formatFileSize(size) {
    if (size < 1024) {
        return size + " B";
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + " KB";
    } else {
        return (size / (1024 * 1024)).toFixed(2) + " MB";
    }
  }

  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/vcfmaf/']} type="single" />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <div className="auto">
            <h3 className="colorSecondary">
              <span className="colorPrimary">VCF T</span>o MAF
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
                            <div style={{ marginTop: '20px' }}>
                              <dl>
                                <dt>
                                  <FormattedMessage id="UploadFile" defaultMessage="Upload Files" />
                                </dt>
                                <dd>
                                  <div className="inputText flex">
                                    <input type="file" className="w100 maf-merger-file-input" accept=".vcf" id="vcfMafFiles" onChange={(e) => handleFileChange(e)} autoComplete="off" style={{ padding: '10px' }} multiple={true} ref={fileInputRef}/>
                                    <label className='maf-merger-label' htmlFor="vcfMafFiles">
                                      <FormattedMessage id='SelectMultipleFiles' defaultMessage='Select Multiple Files' />
                                    </label>
                                  </div>
                                </dd>
                              </dl>
                            </div>
                            <div>
                              {Object.keys(vcfMafFiles)?.map((filename, index) => (
                                <div key={filename} style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px',border: '1px solid #ccc',margin: '5px 0'}}>
                                  <div>
                                      {filename} - {formatFileSize(vcfMafFiles[filename].file.size)}
                                  </div>
                                    <button onClick={() => handleFileRemove(filename)}>X</button>
                                </div>
                              ))}
                            </div>

                            {!(vcf2mafResponse) &&
                              <button className="btn btnPrimary SubmitButton" onClick={uploadFile}>
                                <FormattedMessage id="Submit" defaultMessage="Submit" />
                              </button>
                            }
                          </div>
                          {isError && <p>Upload only .vcf extension files</p>}
                        </div>
                      </div>
                      {!(vcf2mafResponse) &&
                        <span
                          style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }}
                          className="Flex"
                        >
                          <FormattedMessage
                            id="VcfToMafNote"
                            defaultMessage=" Note: only .vcf file accepted and files which are generated using genome version hg38"
                          />
                        </span>
                      }
                      {vcf2mafResponse &&
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

            {/* <>
              <dl>
                <dt>&nbsp;</dt>
                <dd>
                  <button
                    onClick={() => toggleModal(true, fileName)}
                    className="ToolModalBtn"
                    style={{ float: 'right' }}
                  >
                    <InforIcon />
                  </button>
                </dd>
              </dl>
              <dl key={'dl1-' + key} className="boardSearchBox">
                <dt>
                  {' '}
                  <FormattedMessage id="selectType" defaultMessage="Select Type" />
                </dt>
                <dd className="selectBox select Flex">
                  <select
                    onChange={updateFileTypeOnChange}
                    name={key}
                    defaultChecked={selectedFileSampleType[key]}
                    value={selectedFileSampleType[key]}
                    className="select-color w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
                  >
                    {Object.keys(dropdownOptionsSelected[key]).map((type) => (
                      <option className="text-gray-900" key={type} value={type}>
                        {dropdownOptionsSelected[key][type]}
                      </option>
                    ))}
                  </select>
                </dd>
              </dl>
              <dl key={'dl2-' + key}>
                <dt>&nbsp;</dt>
                <dd className="inputText" style={{ paddingTop: '2%' }}>
                  <label className="select-color w-full block text-right border focus:outline-none border-b-color focus:ring focus:border-blue-300 p-4 mt-3">
                    <input
                      type="file"
                      className="w-full"
                      data={key}
                      name={selectedFileSampleType[key]}
                      id="user-file-input"
                      filename={key}
                      onChange={file_Upload_}
                      ref={inputRef}
                    />
                  </label>
                </dd>
              </dl>
            </> */}
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

export default Vcfmaf;
