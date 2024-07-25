import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { mafmerger} from '../../../actions/api_actions';
import {TrashIcon}  from '@heroicons/react/outline';

  const FileUploadModal = ({ isModal, setIsModal, handleFileUpload,mafType }) => {
  const [isError, setIsError] = useState(false);
  const [mafMergerFiles, setMafMergerFiles] = useState({});
  const [mafMergerFilesName, setMafMergerFilesName] = useState([]);
  const [fileType, setFileType] = useState('tsv');
  const [msg, setMsg] = useState('');
  const [html, setHtml] = useState([]);
  const mafMergerResponse = useSelector((data) => data.homeReducer.mafmerger);
  const [startInterval, setStartInterval] = useState(false)
  const [loader, setLoader] = useState(false);
  const [loop, setLoop] = useState(null)
  const dispatch = useDispatch();
  useEffect(() => {
    if (startInterval) {
        setLoop(setInterval(() => {
            dispatch(mafmerger("GET", { "container_name": mafMergerResponse['container_name'] }))
        }, 10000));
    }
}, [startInterval])
useEffect(() => {
  if (mafMergerResponse) {
    console.log(mafMergerResponse)
      if (mafMergerResponse['status'] === 'running') {
          setLoader(true);
          setStartInterval(true)
          setMsg({ id: 'MAFMergerConversion', defaultMessage: 'File Uploaded, Conversion Started.....' });
      } else {
          setLoader(false);
          setStartInterval(false)
          clearInterval(loop);
          setLoop(interval => {
              clearInterval(interval);
              return null;
          });
          setMafMergerFiles({})
          setMafMergerFilesName([])
          mafType(mafMergerResponse['container_name']+'.tsv')
          setIsModal(false)
      }
  }
}, [mafMergerResponse]);
  let uploadFile = () => {
    // Check if all files in the object have the ".maf" extension
    const areAllFilesMaf = Object.keys(mafMergerFiles).every(file => file.endsWith('.maf'));

    if (areAllFilesMaf && Object.keys(mafMergerFiles)?.length > 0) {
        setIsError(false);
        setLoader(true);

        dispatch(mafmerger('POST', mafMergerFiles));
        setMsg({ id: 'FileUplodPlsWait', defaultMessage: 'File Uploading, Please Wait......' });
    } else {
        setIsError(true);
        setMsg({ id: 'MAFMergerInvalid', defaultMessage: 'Invalid file format. Please select MAF files only.' });

    }
};
const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files);

  if (newFiles.length + Object.keys(mafMergerFiles).length > 50) {
      alert("You can upload a maximum of 50 files at once.");
      return;
  }

  let totalSize = 0;

  // Calculate the total size of already selected files
  for (const fileKey in mafMergerFiles) {
      totalSize += mafMergerFiles[fileKey].file.size;
  }

  // Calculate the total size of the new files
  let newFilesSize = 0;
  for (let i = 0; i < newFiles.length; i++) {
      newFilesSize += newFiles[i].size;
  }

  // Check if the total number of files does not exceed 50 and the total size is less than or equal to 500MB
  if (newFiles.length + Object.keys(mafMergerFiles).length <= 50 && totalSize + newFilesSize <= 500 * 1024 * 1024) {
      const newFormData = { ...mafMergerFiles };

      for (let i = 0; i < newFiles.length; i++) {
          const newFile = newFiles[i];
          const newFileName = newFile.name;
          newFormData[newFileName] = {
              file: newFile,
              fileName: newFileName,
          };
      }

      setMafMergerFiles(newFormData);

      const newFileNames = newFiles.map((file) => file.name);
      setMafMergerFilesName([...mafMergerFilesName, ...newFileNames]);
  } else if (totalSize + newFilesSize > 500 * 1024 * 1024) {
      alert("The total file size should not exceed 500MB.");
  } else {
      alert("Maximum 50 files are allowed.");
  }
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

const handleFileRemove = (fileName) => {
  setMafMergerFiles((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      delete updatedFormData[fileName];
      return updatedFormData;
  });

  const updatedFileNames = mafMergerFilesName.filter((name) => name !== fileName);

  setMafMergerFilesName(updatedFileNames);
  console.log(mafMergerFiles)
};

return (
  <>
    {isModal ? (
      <>

<div className="Toolmodal-container" style={{"background":"rgba(0,0,0,0.8)"}}>
            <div className="Toolmodal-content" style={{ maxWidth: '60vw' }}>
              {/*content*/}
              <div className="Toolmodal-dialog" style={{borderRadius:'5px',width:'35vw'}}>
                {/*header*/}
                <div className="Toolmodal-header">
                  <h5 className="Toolmodal-title toolModal-header" style={{ fontSize: '20px', }}>
                    {' '}
                    <FormattedMessage
                      id="SelectFile"
                      defaultMessage="Select A File"
                    />
                  </h5>
                  <button className="Toolmodal-close-btn" onClick={() => setIsModal(false)}>
                    ×
                  </button>
                </div>
                {/*body*/}
                <div
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    margin: '0px 10px 0px 5px'
                  }}
                >

                </div>
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    {/* <DataOfFiles fileName={fileName} /> */}

                    {/* <div className="Flex FlexDirRow" style={{ marginTop: '20px', gap: '10px' }}> */}
                    <div className="Flex FlexDirRow modelFileType" >
                      <FormattedMessage id="FileType" defaultMessage="Select File Type" />
                      </div>
                      <div>
                      <label className="mr-4 textClass">
                        <input
                          type="radio"
                          name="fileType"
                          value="tsv"
                          checked={fileType === 'tsv'}
                          onChange={(e) => setFileType(e.target.value)}

                        /> Mutation(.tsv)
                      </label>
                      <label className='textClass'>
                        <input
                          type="radio"
                          name="fileType"
                          value="maf"
                          checked={fileType === 'maf'}
                          onChange={(e) => setFileType(e.target.value)}
                        /> MAF(.maf)
                      </label>
                    </div>
                    {fileType === 'tsv' && (
                      <div>
                        <label htmlFor="tsv-upload">
                          <input
                            type="file"
                            id="tsv-upload"
                            // onChange={(e) => handleFileUpload(e, 'tsv')}
                            onChange={(event) => handleFileUpload(event, 'dna_mutation')}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            accept=".tsv"
                          />
                        </label>
                      </div>
                    )}
                    {fileType === 'maf' && (
                      <div>
                        <label htmlFor="MAFFiles">
                          <FormattedMessage id="SelectMultipleFiles" defaultMessage="Select Multiple Files" />
                          <br/>
                          <input
                            type="file"
                            id="MAFFiles"
                            multiple
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            accept=".maf"
                          />
                        </label>

                        {mafMergerFilesName.length > 0  &&
                          <table className='contentsTable'>
                            <thead>
                              <tr>
                                <th style={{width:'10%'}}>S.No</th>
                                <th><FormattedMessage id="FileName" defaultMessage="File Name" /></th>
                                <th style={{width:'20%'}}><FormattedMessage id="Action" defaultMessage="Action" /></th>
                              </tr>
                            </thead>
                            <tbody>
                          {Object.keys(mafMergerFiles).map((filename,i) => (
                            <tr key={filename} className="">
                              <td>{i+1}</td>
                              <td>{filename} - {formatFileSize(mafMergerFiles[filename].file.size)}</td>
                              <td><button onClick={() => handleFileRemove(filename)}><TrashIcon className='trashIconSize'/></button></td>
                            </tr>
                          ))}
                          </tbody>
                          </table>
                        }
                        {isError && <p className="text-red-600">Upload only .maf extension files</p>}
                      </div>
                    )}
                  </div>
                </div>
                {/*footer*/}
                <div className="Toolmodal-footer">
                  <button
                    className="Toolmodal-close-btn"
                    style={{ fontSize: '20px' }}
                    onClick={() => setIsModal(false)}
                  >
                    <FormattedMessage id="Close" defaultMessage="Close" />
                  </button>
                  {loader ?'Loading..':''}
                  {!loader &&  <button className="btn btnPrimary SubmitButton" style={{ fontSize: '20px' }} onClick={uploadFile}>
                    <FormattedMessage id="Submit" defaultMessage="Submit" />
                  </button>
                  }
                </div>
              </div>
            </div>
          </div>
      </>
    ) : null}
  </>
);
};

export default FileUploadModal;

