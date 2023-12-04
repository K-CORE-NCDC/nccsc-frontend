import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  SingleFileUpload,
  clearSingleFIleUploadState
} from '../../../actions/api_actions';
import { Context } from '../../../wrapper';
import { DataOfFiles } from '../MultiDataVisualization/MultiFileUpload';

function Modal({ showModal, toggleModal, fileName }) {
  let fileNameImage = require(`../../../assets/images/FileScreenshots/${fileName}.png`).default;
  let fileNameFile = require(`../../../assets/files/20_samples/${fileName}.tsv`).default;

  return (
    <>
      {showModal ? (
        <>
          <div className="Toolmodal-container">
            <div className="Toolmodal-content" style={{ maxWidth: '60vw' }}>
              {/*content*/}
              <div className="Toolmodal-dialog">
                <div className="Toolmodal-header">
                  <h3 className="Toolmodal-title">Sample File Download</h3>
                  <button className="Toolmodal-close-btn" onClick={() => toggleModal(false, '')}>
                    ×
                  </button>
                </div>
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <img src={fileNameImage} alt="ExampleFileImage" />
                    <DataOfFiles fileName={fileName} />
                    {fileName === 'DnaMutation'
                      &&
                      <div>
                        <p>
                          <FormattedMessage
                            id="clinicalInformationGuideinnerp5"
                            defaultMessage="In survival analysis, if 'recur_yn', 'death_yn' are left blank, they are automatically treated as 'FALSE'"
                          />
                        </p>
                      </div>
                    }
                    <div className="Flex FlexDirRow" style={{ marginTop: '20px', gap: '10px' }}>
                      <a className="Tooldownload-link" href={fileNameFile} download>
                        <FormattedMessage id='DownloadFile' defaultMessage="Click on the link to download the sample file" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="Toolmodal-footer">
                  <button className="Toolmodal-close-btn" onClick={() => toggleModal(false, '')}>
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

const SingleDataFileUpload = ({ updateComponentNumber }) => {
  const projectNameRef = useRef(null);
  const history = useHistory();
  const response = useSelector((data) => data.homeReducer.fileUploadData);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState({ type: '', message: '' });
  const [loader, setLoader] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState({});
  const projectName = 'Project_name';
  const [formSbubmitButtonText, setFormSubmitButtonText] = useState('upload');
  const [initialInputState, setInitialInputState] = useState(undefined);
  let { tab } = useParams();
  const intl = useIntl();
  const inputRef = useRef(null);
  const allowedTabs = [
    'circos',
    'lollipop',
    'CNV',
    'heatmap',
    'box',
    'survival',
    'variant-summary'
  ];

  const charts = {
    circos: {
      rna: 'RNA',
      dna_mutation: 'DNA Mutation',
      methylation: 'DNA Methylation',
      proteome: 'proteome',
      cnv: 'CNV',
      fusion: 'fusion'
    },
    lollipop: {
      phospho: 'phospho',
      dna_mutation: 'DNA Mutation'
    },
    CNV: {
      cnv: 'CNV'
    },
    heatmap: {
      rna: 'RNA',
      methylation: 'DNA Methylation',
      proteome: 'proteome',
      phospho: 'phospho'
    },
    box: {
      proteome: 'proteome',
      rna: 'RNA'
    },
    survival: {
      clinical_information: 'Clinical Information'
    },
    'variant-summary': {
      dna_mutation: 'DNA Mutation'
    }
  };

  const [selectedFileSampleType, setSelectedFileSampleType] = useState(() => {
    let firstKey = '';
    if (allowedTabs.includes(tab) && Object.keys(charts).includes(tab))
      firstKey = Object.keys(charts[tab])[0];
    return { 1: firstKey };
  });
  const [dropdownOptionsSelected, setDropdownOptionsSelected] = useState(() => {
    let object = {};
    if (allowedTabs.includes(tab) && Object.keys(charts).includes(tab)) object = charts[tab];
    return { 1: object };
  });

  const dropdownOptions = (() => {
    let object = {};
    if (allowedTabs.includes(tab) && Object.keys(charts).includes(tab)) object = charts[tab];
    return object;
  });

  let fileNames = {
    clinical_information: 'ClinicalInformation',
    cnv: 'CNV',
    dna_mutation: 'DnaMutation',
    rna: 'RNA',
    fusion: 'Fusion',
    methylation: 'Methylation',
    proteome: 'Proteome',
    phospho: 'Phospho'
  };

  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(fileNames[selectedFileSampleType['1']]);
  const [fileDataAsTableAll, setFileDataAsTableAll] = useState({});
  const [showFileDataTable, setShowFileDataTable] = useState(false);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);

  let toggleModal = (status, file) => {
    setShowModal(status);
    setFileName(file);
  };

  useEffect(() => {
    if (!allowedTabs.includes(tab)) {
      history.push('/notfound/');
    }
  }, [tab]);

  useEffect(() => {
    dispatch(clearSingleFIleUploadState());
  }, []);

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
    if (formSbubmitButtonText === 'upload' || formSbubmitButtonText === '업로드') {
      if (koreanlanguage) {
        setFormSubmitButtonText('업로드');
      } else {
        setFormSubmitButtonText('upload');
      }
    }
  }, [koreanlanguage, Englishlanguage]);

  useEffect(() => {
    setErrorMessage({ type: '', message: '' });
  }, []);

  const resetStates = () => {
    inputRef.current.value = null;
    setSelectedFileSampleType({
      1: 'clinical_information'
    });

    setDropdownOptionsSelected(() => {
      let object = {};
      if (allowedTabs.includes(tab) && Object.keys(charts).includes(tab)) object = charts[tab];
      return { 1: object };
    });
    setSelectedFiles([]);
    setUploadFile([]);
  };

  useEffect(() => {
    if (Object.values(loader).some((element) => element === 'failed')) {
      if (koreanlanguage) {
        setFormSubmitButtonText('Retry');
      } else {
        setFormSubmitButtonText('다시 해 보다');
      }
    }
  }, [loader]);

  const updateFileTypeOnChange = (e) => {
    const divName = e.target.name;
    const divValue = e.target.value;
    setDropdownOptionsSelected((prevState) => ({
      ...prevState,
      [divValue]: dropdownOptions[divValue]
    }));
    setSelectedFileSampleType((prevState) => ({
      ...prevState,
      [divName]: divValue
    }));

    setFileName(fileNames[divValue]);
  };

  useEffect(() => {
    let filesUploadedStatus = undefined;
    if (response) {
      filesUploadedStatus = response.files;
    }

    if (filesUploadedStatus) {
      Object.keys(filesUploadedStatus).forEach((fileType) => {
        if (filesUploadedStatus[fileType]) {
          setLoader((prevState) => ({ ...prevState, [fileType]: 'success' }));
        } else {
          setLoader((prevState) => ({ ...prevState, [fileType]: 'failed' }));
        }
      });
    }
    if (filesUploadedStatus) {
      let errorModalData = [];
      Object.keys(filesUploadedStatus).forEach((element) => {
        if (filesUploadedStatus[element] === false) {
          let errorFileName = ''; // uploadFile[element]['file'].name
          Object.keys(uploadFile).forEach((e) => {
            if (uploadFile[e].type === element) {
              errorFileName = uploadFile[e]['file'].name;
            }
          });
          errorModalData.push(
            <div key={element} className="text-black">
              <h6 className="text-red-500">{errorFileName}</h6>
              is invalid, check sample file for reference
            </div>
          );
        }
      });

      if (Object.values(filesUploadedStatus).some((element) => element === false)) {
        if (koreanlanguage) {
          setFormSubmitButtonText('Retry');
        } else {
          setFormSubmitButtonText('다시 해 보다');
        }
      } else {
        if (koreanlanguage) {
          setFormSubmitButtonText('시각화');
        } else {
          setFormSubmitButtonText('Visualize');
        }
      }
    }
    if (filesUploadedStatus && filesUploadedStatus.table) {
      setFileDataAsTableAll(filesUploadedStatus.table);
    }
  }, [response]);

  useEffect(() => {
    if (fileDataAsTableAll) {
      let currentRenderedTable = Object.keys(fileDataAsTableAll);
      if (currentRenderedTable.length > 0) {
        setShowFileDataTable(true);
      }
    }
  }, [fileDataAsTableAll]);



  useEffect(() => {
    Object.keys(uploadFile).forEach((element) => {
      if (uploadFile[element].type !== selectedFileSampleType[element]) {
        setUploadFile((prevState) => ({
          ...prevState,
          [element]: { file: prevState[element].file, type: selectedFileSampleType[element] }
        }));
      }
    });
  }, [selectedFileSampleType]);

  useEffect(() => {
    let firstInput = [];

    Object.keys(selectedFileSampleType).forEach((key) => {
      firstInput.push(
        <>
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
        </>
      );
    });
    setInitialInputState(firstInput);
  }, [selectedFileSampleType, loader, selectedFiles]);

  const file_Upload_ = (e) => {
    let selected_files = selectedFiles;
    let type_name = e.target.name;
    let divKey = e.target.getAttribute('filename');

    if (type_name && e.target.files) {
      if (e.target.files[0] && 'name' in e.target.files[0]) {
        let file_name = e.target.files[0]['name'];
        selectedFiles.push(file_name);
        setUploadFile((prevState) => ({
          ...prevState,
          [divKey]: { type: type_name, file: e.target.files[0] }
        }));
        setSelectedFiles([...selected_files]);
      }
    }
  };
  const on_upload = () => {
    let FilesData = uploadFile;
    FilesData = Object.keys(FilesData).reduce((acc, key) => {
      const { type, file } = uploadFile[key];
      acc[type] = { type, file };
      return acc;
    }, {});
    setUploadFile(FilesData);
    if (Object.keys(FilesData).length > 0) {
      dispatch(SingleFileUpload(FilesData, projectName));
      updateComponentNumber(1);
      for (let key in uploadFile) {
        setLoader((prevState) => ({ ...prevState, [uploadFile[key].type]: 'loader' }));
      }
    } else {
      Swal.fire({
        title: intl.formatMessage({ id: "Warning", defaultMessage: 'Warning' }),
        text: intl.formatMessage({ id: "SelectFile", defaultMessage: 'Upload File' }),
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
        allowOutsideClick: false
      });
    }
  };

  const formSubmitButtonActions = () => {
    if (projectName.length > 0) {
      if (formSbubmitButtonText === 'upload' || formSbubmitButtonText === '업로드') {
        on_upload();
      }
      if (formSbubmitButtonText === 'retry' || formSbubmitButtonText === '다시 해 보다') {
        on_upload();
      }
      if (formSbubmitButtonText === 'visualize') {
        history.push(`/visualise-singledata/circos/${response['serializer'].id}`);
      }
    } else {
      projectNameRef.current.focus();
    }
  };

  const InforIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '1.5rem', height: '1.5rem' }}
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

  return (
    <>
      {!showFileDataTable && (
        <div className="auto ">
          <div>
            {showModal && (
              <Modal showModal={showModal} toggleModal={toggleModal} fileName={fileName} />
            )}
          </div>
          {error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">{error_message['type']}</strong>
              <span className="block sm:inline"> {error_message['message']}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => setError(false)}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : (
            ''
          )}

          <div className="formBox">{initialInputState}</div>

          <div className="bottomBtns">
            <div className="flex">
              <button onClick={resetStates} className="btn btnGray bdBtn">
                <FormattedMessage id="Reset" defaultMessage="Reset" />
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btnPrimary" onClick={formSubmitButtonActions}>
                {formSbubmitButtonText}
              </button>
            </div>
          </div>
          <button
            id="BackButton"
            className="btn btnPrimary"
            style={{ float: 'right', margin: '10px 0px 10px 0px' }}
            onClick={() => history.push(`/visualise-singledata/home/`)}
          >
            <FormattedMessage id="Back" defaultMessage="Back" />
          </button>
        </div>
      )}
      {showFileDataTable && (
        <div>
          <button
            onClick={() => setShowFileDataTable(false)}
            className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          >
            back to upload
          </button>
          <button
            onClick={() =>
              history.push(`/visualise-singledata/circos/${response['serializer'].id}`)
            }
            className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          >
            visualize
          </button>
        </div>
      )}
    </>
  );
};

export default SingleDataFileUpload;
