import React, { useEffect, useState } from 'react';
import {
  multiFileUpload,
  clearMultiFIleUploadState,
  UserDataProjectsCount,
  clearMafMerger
} from '../../../actions/api_actions';
// import { useDispatch } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';
import Swal from 'sweetalert2';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import Draggable from 'react-draggable';
import AOS from 'aos';
import { useHistory } from 'react-router-dom';
import FileUploadModal from './FileUploadModal';

function Modal({ showModal, toggleModal, fileName }) {
  let fileNameImage = require(`../../../assets/images/FileScreenshots/${fileName}.png`).default;
  let fileNameFile = require(`../../../assets/files/20_samples/${fileName}.tsv`).default;

  return (
    <>
      {showModal ? (

        <>

          <div className="Toolmodal-container">
            <div className="Toolmodal-content" style={{ maxWidth: '60vw' }}>
              <div className="Toolmodal-dialog">
                <div className="Toolmodal-header">
                  <h5 className="Toolmodal-title toolModal-header" style={{ marginTop:'5px',fontSize: '20px' }}>
                    {' '}
                    <FormattedMessage
                      id="SampleFileDownload"
                      defaultMessage="Sample File Download."
                    />
                  </h5>
                  <button className="MultiCloseButton" onClick={() => toggleModal(false, '')} title="close">
                    ×
                  </button>
                </div>
                <div
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    margin: '0px 10px 0px 15px'
                  }}
                >
                  <img
                    src={fileNameImage}
                    alt="ExampleFileImage"
                    style={{ padding: '5px 10px 5px 10px' }}
                  />
                </div>
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <DataOfFiles fileName={fileName} />
                    {fileName === 'DnaMutation'
                      &&
                      <div>
                        <p>
                          <FormattedMessage
                            id="clinicalInformationGuideinnerp5"
                            defaultMessage="* In survival analysis, if 'recur_yn', 'death_yn' are left blank, they are automatically treated as 'FALSE'"
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
                  <button
                    className="MultiUploadBgGrayButton"
                    style={{ fontSize: '20px' }}
                    onClick={() => toggleModal(false, '')} title="close"
                  >
                    <FormattedMessage id="Close" defaultMessage="Close" />
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

const Table = ({ updateComponentNumber }) => {
  const [filesData, setFilesData] = useState({});
  const [projectName, setProjectName] = useState('');
  const [mutationType, setMutationType] = useState('dna');
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const intl = useIntl();
  const [mafDetails,setMafDetails] = useState('')

  const setIsModalFunction = (stateData) => {
    setIsModal(stateData);
  };

const style={
  dna_button:{
    background:'#efefef',
    border:"1px solid #767676",
    padding:'3px 10px',
    color:"#000",
    fontSize:'12px',
    margin:'0px',
    fontFamily:'sans-serif',
    letterSpacing:'0.1px',
    borderRadius:'2px'
  },
  span_text:{
    fontSize: '14px',
    marginLeft: '5px',
    letterSpacing: '0.1px',
    color: 'rgb(97, 97, 97)',
    fontFamily: 'sans-serif',
  }
}

  useEffect(() => {
    dispatch(clearMultiFIleUploadState());
    AOS.init({});
    AOS.refresh();
    let return_data = UserDataProjectsCount('GET', {});
    return_data.then((result) => {
      const d = result;
      if (d.status === 200 && result.data.data >= 5) {
        history.push({
          pathname: '/multidatavisualization/',
          state: { redirected: true }
        });
      }
    });
  }, []);

  const handleDrag = () => {
    if (!isOpen) {
      return false;
    }
  };

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    setFilesData((prevFormData) => ({
      ...prevFormData,
      [type]: {
        file: selectedFile,
        type: type
      }
    }));
  };

  const getMafName = (name)=>{
    setMutationType('maf')
    setMafDetails(name)
  }

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleClearFile = (name) => {
    if(name==='mutation_file_name'){
      dispatch(clearMafMerger())
      setMutationType('dna')
      setMafDetails(null)
    }else{
      setFilesData((prevFormData) => {
        const updatedFormData = { ...prevFormData };
        delete updatedFormData[name];
        return updatedFormData;
      });
    }

  };


const countFiles = () => {
  let count = 0;

  for (const key in filesData) {
    if (filesData[key]) {
      count++;
    }
  }

  if (mutationType === 'maf' && mafDetails) {
    count++;
  }

  return count;
};
  const handleUpload = () => {
    const noOfFiles = countFiles();
    console.log(noOfFiles)
    if (noOfFiles < 2) {
      Swal.fire({
        title: intl.formatMessage({ id: "Warning", defaultMessage: 'Warning' }),
        text: intl.formatMessage({ id: "UploadTwo", defaultMessage: 'Upload at least Two Files' }),
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
        }
      });
      return;
    }

    if (projectName !== '') {

      dispatch(multiFileUpload(filesData, projectName,mafDetails,mutationType));
      updateComponentNumber(1);
    } else if (projectName === '') {
      Swal.fire({
        title: intl.formatMessage({ id: "Warning", defaultMessage: 'Warning' }),
        text: intl.formatMessage({ id: "EnterProjectName", defaultMessage: 'Enter Project Name' }),
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
        }
      });
    }
  };


  const handleReset = () => {
    setFilesData({});
    setProjectName('');
    if (document.getElementById('projectName')) {
      document.getElementById('projectName').value = '';
    }
    dispatch(clearMultiFIleUploadState());
  };

  let toggleModal = (status, file) => {
    setShowModal(status);
    setFileName(file);
  };

  const title = { id: 'Multi: Create Project', defaultMessage: 'Create New Project' };

  const breadCrumbs = {
    '/newmultidataproject/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
      {
        id: 'MultiDataVisualization',
        defaultMessage: 'Multi Data Visualization',
        to: '/multidatavisualization/'
      },
      { id: 'MultiDataUpload', defaultMessage: 'Multi Data Upload', to: '/newmultidataproject/' }
    ]
  };

  const InforIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '1.5rem', height: '1.5rem' }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        title="helpful_is_it_yaaaa"
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
  let closeModal = () => {
    setIsOpen(false);
    toggleModal(false);
  };

  return (
    <div>
      {isOpen && isOpen === true && (
        <Draggable disabled={!isOpen} onDrag={handleDrag}>
          <div
            style={{
              width: '300px',
              height: '400px',
              position: 'fixed',
              transitionDelay: '3s',
              bottom: isOpen ? '150px' : '-1000px',
              right: isOpen ? '50px' : '-1000px',
              transition: 'bottom 0.10s ease-in-out, right 0.5s ease-in-out',
              zIndex: '15',
              transitionDuration: '5s',
              transitionTimingFunction: 'linear'
            }}
          >
            <div className="mainPopup W100" data-aos="zoom-in" data-aos-once="true">
              <div className="popupHeader">
                <h3 className="TextLeft">Note</h3>
                <button
                  className="material-icons mainPopupClose"
                  id="mainPopupClose"
                  onClick={closeModal}
                  onTouchStart={closeModal} title="close"
                >
                  close
                </button>
              </div>
              <div
                className="popupBody  introduceWrap"
                style={{ padding: '0px', border: '1px solid #ddd' }}
              >
                <div className="introduceBox03" style={{ width: '100%', backgroundColor: "rgb(254, 196, 11)" }}>
                  <ul>
                    <li style={{ borderBottom: "1px solid black", color: 'black' }}>
                      <p style={{ color: "black" }}>
                        <FormattedMessage
                          id="uploadGuide1"
                          defaultMessage="Provides visualization results only for plots related to the uploaded data."
                        />
                      </p>
                    </li>
                    <li>
                      <p style={{ color: "black" }}>
                        <FormattedMessage
                          id="uploadGuide2"
                          defaultMessage="For omics data information required for each plot, please refer to the [Visualize Example Data] page."
                        />
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}

      <HeaderComponent
        title={title}
        routeName="/newmultidataproject/"
        breadCrumbs={breadCrumbs['/newmultidataproject/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div>
          {showModal && (
            <Modal showModal={showModal} toggleModal={toggleModal} fileName={fileName} />
          )}
        </div>
        <div className="contentsTitle" style={{ margin: '0px' }}>
          <h3>
            <font>
              <font>
                <FormattedMessage id="MultiData" defaultMessage="Multi Data" />
              </font>
              &nbsp;
              <span className="colorSecondary">
                <font>
                  <FormattedMessage id="Upload" defaultMessage="Upload" />{' '}
                </font>
              </span>
            </font>
          </h3>
        </div>
        <div className="MultiUploadFlex">
          <div className="MultiUploadContainer">
            <div className="MultiUploadFlex1">
              <label htmlFor="projectName" className="MultiUploadProjectNameLabel">
                <FormattedMessage id="ProjectName" defaultMessage="Project Name" />
              </label>
              <div className="MultiUploadProjectName">
                <input
                  type="text"
                  id="projectName"
                  name="project_name"
                  value={projectName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <table className="MultiUploadTableHead">
              <caption style={{display: 'none'}}>Clinical Info</caption>
              <thead>
                <tr className="MultiUploadBGGray">
                  <th className="MultiUploadTDHeader MultiUploadTextCenter" style={{ fontWeight: 'normal' }} colSpan="2" scope="col">Clinical Information File</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208" style={{ width: '31vw' }}>
                    <div className="Flex JustifySpaceBetween">
                      <span>Clinical Information</span>
                      <button onClick={() => toggleModal(true, 'ClinicalInformation')} title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData['clinical_information'] ? (
                      <>
                        <span>
                          {filesData['clinical_information'] &&
                            filesData['clinical_information'].file.name}
                        </span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('clinical_information')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <label htmlFor="clinical_information_file"></label>
                        <input
                          id="clinical_information_file"
                          type="file"
                          onChange={(event) => handleFileChange(event, 'clinical_information')}
                        />
                        <button className="MultiUploadBgGrayButton" disabled title="reset">
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>

            <table className="MultiUploadTableHead">
            <caption style={{display: 'none'}}>DNA</caption>
              <thead>
                  <tr className="MultiUploadBGYellow">
                    <th className="MultiUploadTDHeader MultiUploadTextCenter" style={{ fontWeight: 'normal' }} colSpan="2" scope="col">DNA File</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208">
                    <div className="Flex JustifySpaceBetween">
                      <span>DNA Mutation</span>
                      <button onClick={() => toggleModal(true, 'DnaMutation')}title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">

                  {mutationType==='maf'?<>
                    {mafDetails ? (
                      <>
                        <span>
                          {mafDetails}
                        </span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('mutation_file_name')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) :''}</>:''}
                    {mutationType==='dna'?<>
                      {filesData['dna_mutation'] ? (
                        <>
                          <span>
                            {filesData['dna_mutation'] && filesData['dna_mutation'].file.name}
                          </span>
                          <button
                            className="MultiUploadBgGrayButton"
                            type="button"
                            onClick={() => handleClearFile('dna_mutation')} title="reset"
                          >
                            <FormattedMessage id="Reset" defaultMessage="Reset" />
                          </button>
                        </>
                      )
                      :
                      (
                      <>

                        <div>
                          <button
                            style={style.dna_button}
                            type="button"
                            onClick={setIsModalFunction}
                          >
                            <FormattedMessage id="ChooseFile" defaultMessage="Choose File" />
                          </button>
                          <span style={style.span_text}>
                          <FormattedMessage id="NoFileChosen" defaultMessage="No file chosen" />
                          </span>
                        </div>

                          {isModal && <FileUploadModal isModal={isModal} setIsModal={setIsModalFunction} handleFileUpload={handleFileChange} mafType={getMafName} />}
                              <button className="MultiUploadBgGrayButton" disabled title="reset">
                                <FormattedMessage id="Reset" defaultMessage="Reset" />
                              </button>
                        </>
                      )
                      }
                    </>:''}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>CNV</span>
                      <button onClick={() => toggleModal(true, 'CNV')}title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData['cnv'] ? (
                      <>
                        <span>{filesData['cnv'] && filesData['cnv'].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('cnv')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <label htmlFor="cnv_file"></label>
                        <input id="cnv_file" type="file" onChange={(event) => handleFileChange(event, 'cnv')} />
                        <button className="MultiUploadBgGrayButton" disabled title="reset">
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>Methylation</span>
                      <button onClick={() => toggleModal(true, 'Methylation')}title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData['methylation'] ? (
                      <>
                        <span>
                          {filesData['methylation'] && filesData['methylation'].file.name}
                        </span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('methylation')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                      <label htmlFor="methylation_file"></label>
                        <input
                          id="methylation_file"
                          type="file"
                          onChange={(event) => handleFileChange(event, 'methylation')}
                        />
                        <button className="MultiUploadBgGrayButton" disabled title="reset">
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>

            <table className="MultiUploadTableHead">
            <caption style={{display: 'none'}}>RNA</caption>
              <thead>
                <tr className="MultiUploadBGOrange">
                  <th className="MultiUploadTDHeader MultiUploadTextCenter" colSpan="2" style={{ fontWeight: 'normal' }}scope="col">RNA File</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208">
                    <div className="Flex JustifySpaceBetween">
                      <span>RNA</span>
                      <button onClick={() => toggleModal(true, 'RNA')}title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData['rna'] ? (
                      <>
                        <span>{filesData['rna'] && filesData['rna'].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('rna')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <label htmlFor="rna_file"></label>
                        <input id="rna_file" type="file" onChange={(event) => handleFileChange(event, 'rna')} />
                        <button className="MultiUploadBgGrayButton" disabled title="reset">
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>Fusion</span>
                      <button onClick={() => toggleModal(true, 'Fusion')}title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData['fusion'] ? (
                      <>
                        <span>{filesData['fusion'] && filesData['fusion'].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('fusion')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <label htmlFor="fusion_file"></label>
                        <input
                          id="fusion_file"
                          type="file"
                          onChange={(event) => handleFileChange(event, 'fusion')}
                        />
                        <button className="MultiUploadBgGrayButton" disabled title="reset">
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>

            <table className="MultiUploadTableHead">
            <caption style={{display: 'none'}}>Protein</caption>
              <thead>
                <tr className="MultiUploadBGBlue">
                  <th className="MultiUploadTDHeader MultiUploadTextCenter" colSpan="2" scope="col" style={{ fontWeight: 'normal' }}>Protein File</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208">
                    <div className="Flex JustifySpaceBetween">
                      <span>Proteome</span>
                      <button onClick={() => toggleModal(true, 'Proteome')}title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData['proteome'] ? (
                      <>
                        <span>{filesData['proteome'] && filesData['proteome'].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('proteome')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <label htmlFor="proteome_file"></label>
                        <input
                          id="proteome_file"
                          type="file"
                          onChange={(event) => handleFileChange(event, 'proteome')}
                        />
                        <button className="MultiUploadBgGrayButton" disabled title="reset">
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>Phosphorylation</span>
                      <button onClick={() => toggleModal(true, 'Phospho')}title="help">
                        <InforIcon />
                      </button>
                    </div>
                  </td>

                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData['phospho'] ? (
                      <>
                        <span>{filesData['phospho'] && filesData['phospho'].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile('phospho')} title="reset"
                        >
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <label htmlFor="phospho_file"></label>
                        <input
                          id="phospho_file"
                          type="file"
                          onChange={(event) => handleFileChange(event, 'phospho')}
                        />
                        <button className="MultiUploadBgGrayButton" disabled title="reset">
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>

            <div className="bottomBtns">
              <div className="flex">
                <button className="btn btnGray bdBtn" onClick={handleReset} title="reset_all">
                  <FormattedMessage id="ResetAll" defaultMessage="Reset All" />
                </button>
                <button className="btn btnPrimary" onClick={handleUpload} title="upload">
                  <FormattedMessage id="Upload" defaultMessage="Upload" />
                </button>
              </div>
            </div>

            <button
              id="BackButton"
              className="btn btnPrimary"
              style={{ float: 'right', margin: '10px 0px 10px 0px' }}
              onClick={() => history.push(`/multidatavisualization`)} title="back"
            >
              <FormattedMessage id="Back" defaultMessage="Back" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Table;

export const DataOfFiles = ({ fileName }) => {
  return (
    <ul style={{ margin: '10px' }}>

      <div className="popularBox">
        <div className="contentBox">
          {fileName === 'ClinicalInformation' && (
            <ul className="" style={{ paddingTop: '10px' }}>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}>
                  <b></b>
                  <FormattedMessage
                    id="clinicalInformationGuidep2"
                    defaultMessage="Sample ID (sample_id) column and
                    the four variable columns below (rlps_yn, rlps_cnfr_drtn, death_yn, death_cnfr_drtn) are required regardless of whether there is data, and the variable names must not be changed."
                  />
                </p>

                <ul>
                  <li style={{ paddingLeft: '5%', paddingTop: '10px' }}>
                    {' '}
                    <FormattedMessage
                      id="clinicalInformationGuidep3"
                      defaultMessage="* However, if there is no data on recurrence and death variables, some functions in the Survival plot are limited."
                    />{' '}
                  </li>
                  <li style={{ paddingLeft: '5%', paddingTop: '10px' }}>
                    {' '}
                    -{' '}
                    <FormattedMessage
                      id="clinicalInformationGuideinnerp1"
                      defaultMessage="rlps_yn : recurrence yes or no (TRUE / FALSE)"
                    />{' '}
                  </li>
                  <li style={{ paddingLeft: '5%' }}>
                    {' '}
                    -{' '}
                    <FormattedMessage
                      id="clinicalInformationGuideinnerp2"
                      defaultMessage="rlps_cnfr_drtn : recurrence confirmation duration (numeric data)"
                    />{' '}
                  </li>
                  <li style={{ paddingLeft: '5%' }}>
                    -{' '}
                    <FormattedMessage
                      id="clinicalInformationGuideinnerp3"
                      defaultMessage="death_yn : death yes or no (TRUE / FALSE)"
                    />
                  </li>
                  <li style={{ paddingLeft: '5%' }}>
                    -{' '}
                    <FormattedMessage
                      id="clinicalInformationGuideinnerp4"
                      defaultMessage="death_cnfr_drtn : death confirmation duration (numeric data)"
                    />{' '}
                  </li>
                </ul>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}>
                  {' '}
                  <b></b> &nbsp;
                  <FormattedMessage
                    id="clinicalOnly15"
                    defaultMessage="Up to 15 clinical variables can be entered, including the 5 required input variables above."
                  />
                </p>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}>
                  {' '}
                  <b></b> &nbsp;
                  <FormattedMessage
                    id="RNAGuideP2"
                    defaultMessage="The 'None' value can be left blank."
                  />
                </p>
              </li>
            </ul>
          )}

          {(fileName === 'DnaMutation' ||
            fileName === 'CNV' ||
            fileName === 'Methylation' ||
            fileName === 'Fusion' ||
            fileName === 'Phospho') && (
              <ul className="" style={{ paddingTop: '10px' }}>
                <li className="" tabIndex="0">
                  <p style={{ color: 'black' }}>
                    {' '}
                    <b></b> &nbsp;
                    <FormattedMessage
                      id="DNAMutationGuideP1"
                      defaultMessage="Each column configuration of omics data must be same to the sample format. "
                    />
                  </p>
                </li>
                <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                  <p style={{ color: 'black' }}>
                    {' '}
                    <b></b> &nbsp;
                    <FormattedMessage
                      id="DNAMutationGuideP2"
                      defaultMessage="Leave the “None” value empty."
                    />
                  </p>
                </li>
                {fileName === 'DnaMutation' &&
                  <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                    <p style={{ color: 'black' }}>
                      {' '}
                      <b></b> &nbsp;
                      <FormattedMessage
                        id="DNAMutationGuideP3"
                        defaultMessage="DNA mutation input format contains DNA mutations of multiple samples."
                      />
                    </p>
                  </li>
                }
                {fileName === 'DnaMutation' &&
                  <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                    <p style={{ color: 'black' }}>
                      {' '}
                      <b></b> &nbsp;
                      <FormattedMessage
                        id="DNAMutationGuideP4  "
                        defaultMessage="By using [MAF merger] service of [Other Tools], user can merge multiple MAF files into a single TSV file, then use it as input file of this visualization service."
                      />
                    </p>
                  </li>
                }
              </ul>
            )}
          {(fileName === 'RNA' || fileName === 'Proteome') && (
            <ul className="" style={{ paddingTop: '10px' }}>
              <li className="" tabIndex="0">
                <p style={{ color: 'black' }}>
                  {' '}
                  <b></b> &nbsp;
                  <FormattedMessage
                    id="RNAGuideP1"
                    defaultMessage="Each column configuration of omics data must be same to the sample format."
                  />
                </p>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}>
                  {' '}
                  <b></b> &nbsp;
                  <FormattedMessage
                    id="RNAGuideP2"
                    defaultMessage="Leave the “None” value empty."
                  />
                </p>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}>
                  {' '}
                  <b></b> &nbsp;
                  <FormattedMessage
                    id="RNAGuideP3"
                    defaultMessage="[raw] column is raw count information. [norm] column is normalization information like CPM, RPKM, FPKM, TPM."
                  />
                </p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </ul>
  );
};
