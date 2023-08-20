import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  uploadClinincalSamples,
  clearUploadClinicalColumns
} from '../../../../actions/api_actions';
import Swal from 'sweetalert2';
import LoaderCmp from '../../../Common/Loader';
import { FormattedMessage } from 'react-intl';

function FileUploadDropdowncomponent({ updateComponentNumber }) {
  const [selectClinincalFilterColumn, setSelectClinincalFilterColumn] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [clinincalFilterColumns, setClinincalFilterColumns] = useState([]);
  const [activeTableKey, setActiveTableKey] = useState('');
  const [defaultClinicalInformationColumns, setDefaultClinicalInformationColumns] = useState({});
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const dispatch = useDispatch();
  const clinicalfileresponse = useSelector((data) => data.homeReducer.newFileUploadData);
  const [message, setMessage] = useState({});
  const [columnTypes, setColumnTypes] = useState({});

  const getFileName = (clinicalfileresponse, tab) => {
    if (
      clinicalfileresponse &&
      clinicalfileresponse['res'] &&
      clinicalfileresponse['res'].length > 0
    ) {
      for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
        if (clinicalfileresponse['res'][i]['tab'] === tab) {
          return clinicalfileresponse['res'][i]['filename'];
        }
      }
    }
  };

  useEffect(() => {
    if (
      clinicalfileresponse &&
      clinicalfileresponse['res'] &&
      clinicalfileresponse['res'].length > 0
    ) {
      setActiveTableKey(clinicalfileresponse['res'][0]['tab']);
      for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
        if (clinicalfileresponse['res'][i]['tab'] === 'clinical_information') {
          setDefaultClinicalInformationColumns(clinicalfileresponse['res'][i]['types']);
        }
      }
    }
  }, [clinicalfileresponse]);

  useEffect(() => {
    dispatch(clearUploadClinicalColumns());
  }, []);

  const clinicalUpdateFileTypeOnChange = (e) => {
    let divName = e.target.name;
    let divValue = e.target.value;
    if (
      responseData &&
      'clinical_information' in responseData &&
      'types' in responseData['clinical_information'] &&
      ('sample_id' in responseData['clinical_information']['types'] === false ||
        'rlps_yn' in responseData['clinical_information']['types'] === false ||
        'rlps_cnfr_drtn' in responseData['clinical_information']['types'] === false ||
        'death_yn' in responseData['clinical_information']['types'] === false ||
        'death_cnfr_drtn' in responseData['clinical_information']['types'] === false)
    ) {
      let tempresponseData = { ...responseData };
      tempresponseData[activeTableKey]['types']['sample_id'] = 'character';
      tempresponseData[activeTableKey]['types']['rlps_yn'] = 'yesorno';
      tempresponseData[activeTableKey]['types']['rlps_cnfr_drtn'] = 'decimal';
      tempresponseData[activeTableKey]['types']['death_yn'] = 'yesorno';
      tempresponseData[activeTableKey]['types']['death_cnfr_drtn'] = 'decimal';
      setResponseData(tempresponseData);
    }
    if (
      divName === 'sample_id' ||
      divName === 'rlps_yn' ||
      divName === 'rlps_cnfr_drtn' ||
      divName === 'death_yn' ||
      divName === 'death_cnfr_drtn'
    ) {
      if (defaultClinicalInformationColumns[divName] === divValue) {
        let tempresponseData = { ...responseData };
        if (tempresponseData[activeTableKey]) {
          tempresponseData[activeTableKey]['types'][divName] = divValue;
        } else {
          tempresponseData[activeTableKey] = {};
          tempresponseData[activeTableKey]['tab'] = activeTableKey;
          tempresponseData[activeTableKey]['filename'] = getFileName(
            clinicalfileresponse,
            activeTableKey
          );
          tempresponseData[activeTableKey]['types'] = {};
          tempresponseData[activeTableKey]['types'][divName] = divValue;
        }
        setResponseData(tempresponseData);
        if (e) {
          e.target.classList.remove('border-red-400');
        }
      } else {
        if (e) {
          e.target.classList.add('border-red-400');
        }
        let tempresponseData = { ...responseData };
        if (tempresponseData[activeTableKey]) {
          tempresponseData[activeTableKey]['types'][divName] = '';
        } else {
          tempresponseData[activeTableKey] = {};
          tempresponseData[activeTableKey]['tab'] = activeTableKey;
          tempresponseData[activeTableKey]['filename'] = getFileName(
            clinicalfileresponse,
            activeTableKey
          );
          tempresponseData[activeTableKey]['types'] = {};
          tempresponseData[activeTableKey]['types'][divName] = '';
        }
        setResponseData(tempresponseData);
      }
    }

    if (activeTableKey === 'clinical_information') {
      let tmp = { ...clinincalFilterColumns };
      Object.keys(tmp).forEach((obj) => {
        if (tmp[obj].id === divName) {
          tmp[obj].value = divValue;
        }
      });
      setClinincalFilterColumns(tmp);
      let tempresponseData = { ...responseData };

      if (
        divName !== 'sample_id' &&
        divName !== 'rlps_yn' &&
        divName !== 'rlps_cnfr_drtn' &&
        divName !== 'death_yn' &&
        divName !== 'death_cnfr_drtn'
      ) {
        if (tempresponseData[activeTableKey]) {
          tempresponseData[activeTableKey]['types'][divName] = divValue;
        } else {
          tempresponseData[activeTableKey] = {};
          tempresponseData[activeTableKey]['tab'] = activeTableKey;
          tempresponseData[activeTableKey]['filename'] = getFileName(
            clinicalfileresponse,
            activeTableKey
          );
          tempresponseData[activeTableKey]['types'] = {};
          tempresponseData[activeTableKey]['types'][divName] = divValue;
        }
        setResponseData(tempresponseData);
      }
    }
  };

  const sendColumnsData = (columnsData, totalFiles) => {
    let verifyClinincalInformationColumns = () => {
      if (
        clinicalfileresponse &&
        clinicalfileresponse['res'] &&
        clinicalfileresponse['res'].length > 0
      ) {
        let total_columns;
        let send_c = true;
        total_columns = 0;
        if (columnsData && 'clinical_information' in columnsData) {
          for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
            if (clinicalfileresponse['res'][i]['tab'] === 'clinical_information') {
              total_columns = clinicalfileresponse['res'][i]['columns'].length;
            }
          }
          for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
            if (clinicalfileresponse['res'][i]['tab'] === 'clinical_information') {
              if (
                columnsData &&
                'clinical_information' in columnsData &&
                'types' in columnsData['clinical_information']
              ) {
                for (let kv in columnsData['clinical_information']['types']) {
                  if (columnsData['clinical_information']['types'][kv] === '') {
                    send_c = false;
                  }
                }
              }
            }
          }

          if (
            send_c &&
            Object.keys(columnsData['clinical_information']['types']).length === total_columns
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    };
    if (
      columnsData &&
      Object.keys(columnsData).length === totalFiles &&
      verifyClinincalInformationColumns()
    ) {
      let d = {
        project_name: clinicalfileresponse['project_name'],
        file_types: columnsData
      };
      dispatch(uploadClinincalSamples(d));
      updateComponentNumber(2);
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please Select All Columns in Clinical Information.',
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
        }
      });
    }
  };

  const tabDropdownTable = (tab) => {
    setActiveTableKey(tab);
    if (
      clinicalfileresponse &&
      clinicalfileresponse['res'] &&
      clinicalfileresponse['res'].length > 0
    ) {
      for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
        let row = clinicalfileresponse['res'][i];
        let column = row['columns'];
        let types = row['types'];
        let tab = row['tab'];
        processColumns(column, tab, types);
      }
    }
  };

  const processColumns = (columns, tab, types) => {
    let colsarray = [];
    if (tab !== 'clinical_information') {
      for (let i = 0; i < columns.length; i++) {
        let obj = {
          id: columns[i],
          title: columns[i],
          type: 'select',
          options: ['', 'character', 'numeric', 'decimal', 'yesorno'],
          value: types[columns[i]]
        };
        colsarray.push(obj);
      }
      setClinincalFilterColumns((prevState) => ({
        ...prevState,
        [tab]: colsarray
      }));
      let tempresponseData = { ...responseData };
      if (tempresponseData[tab]) {
        tempresponseData[tab]['types'] = types;
      } else {
        tempresponseData[tab] = {};
        tempresponseData[tab]['filename'] = getFileName(clinicalfileresponse, tab);
        tempresponseData[tab]['types'] = {};
        tempresponseData[tab]['types'] = types;
        tempresponseData[tab]['tab'] = tab;
      }
      setResponseData((prevState) => ({
        ...prevState,
        [tab]: tempresponseData[tab]
      }));
    } else {
      for (let i = 0; i < columns.length; i++) {
        let obj = {
          id: columns[i],
          title: columns[i],
          type: 'select',
          options: ['', 'character', 'numeric', 'decimal', 'yesorno'],
          value: ''
        };
        colsarray.push(obj);
      }
      setClinincalFilterColumns((prevState) => ({
        ...prevState,
        [tab]: colsarray
      }));
    }
  };

  useEffect(() => {
    // checking if clinical filter response has clinical filter in it:
    if (
      clinicalfileresponse &&
      clinicalfileresponse['res'] &&
      clinicalfileresponse['res'].length > 0
    ) {
      let temptabs = [];
      for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
        setColumnTypes((prevState) => ({
          ...prevState,
          [clinicalfileresponse['res'][i]['tab']]: clinicalfileresponse['res'][i]['types']
        }));
        let row = clinicalfileresponse['res'][i];
        let tab = row['tab'];
        let css = 'px-4 py-2 font-semibold rounded-t opacity-50';

        if (activeTableKey === tab) {
          css += ' border-blue-400 border-b-4 -mb-px opacity-100';
        }
        temptabs.push(
          <li key={tab} className={css}>
            <button value={tab} onClick={() => tabDropdownTable(tab)} className="capitalize">
              {tab}
            </button>
          </li>
        );
        let columns = row['columns'];
        let types = row['types'];
        if (clinicalfileresponse['res'][i]['message'] === '') {
          processColumns(columns, tab, types);
        } else {
          let key = clinicalfileresponse['res'][i]['tab'];
          let value = clinicalfileresponse['res'][i]['message'];
          setMessage((prevState) => ({
            ...prevState,
            [key]: value
          }));
        }
      }
      setTableNavTabs(temptabs);
    }
  }, [clinicalfileresponse, activeTableKey]);

  useEffect(() => {}, [columnTypes]);

  useEffect(() => {
    let firstInput = [];
    if (clinincalFilterColumns) {
      Object.keys(clinincalFilterColumns).forEach((key) => {
        if (activeTableKey === 'clinical_information' && key === 'clinical_information') {
          clinincalFilterColumns[key].forEach((obj) => {
            firstInput.push(
              <div className="flex justify-between" key={key + '_' + obj.id}>
                <div className="my-auto">
                  <h2>{obj.title}</h2>
                </div>
                <div key={obj.id} className="">
                  <div className="relative w-full col-span-4">
                    <select
                      onChange={clinicalUpdateFileTypeOnChange}
                      name={obj.title}
                      defaultValue={
                        obj.id === 'rlps_yn'
                          ? 'yesorno'
                          : obj.id === 'rlps_cnfr_drtn'
                          ? 'decimal'
                          : obj.id === 'sample_id'
                          ? 'character'
                          : obj.id === 'death_yn'
                          ? 'yesorno'
                          : obj.id === 'death_cnfr_drtn'
                          ? 'decimal'
                          : ''
                      }
                      className="select-color w-48 p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
                    >
                      {Object.keys(obj.options).map((type) => (
                        <option className="text-gray-900" key={type} value={obj.options[type]}>
                          {obj.options[type] === 'yesorno' ? 'YES/NO' : obj.options[type]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          });
        } else if (activeTableKey !== 'clinical_information' && key === activeTableKey) {
          clinincalFilterColumns[key].forEach((obj) => {
            columnTypes &&
              firstInput.push(
                <div className="flex justify-between" key={obj.id + '_' + key}>
                  <div className="my-auto">
                    <h2>{obj.title}</h2>
                  </div>
                  <div key={obj.id} className="">
                    <div className="relative w-full col-span-4">
                      <select
                        name={obj.title}
                        defaultChecked="false"
                        defaultValue={columnTypes[key][obj.id]}
                        className="select-color w-48 p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
                      >
                        {Object.keys(obj.options).map((type) => (
                          <option className="text-gray-900" key={type} value={obj.options[type]}>
                            {obj.options[type] === 'yesorno' ? 'YES/NO' : obj.options[type]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
          });
        }
      });
    }
    setSelectClinincalFilterColumn(firstInput);
  }, [clinincalFilterColumns]);

  return (
    <div className="container mx-auto mt-8">
      <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 ">
          {tableNavTabs}
        </ul>
      </nav>
      <div id="tab-contents" className="mx-auto mt-20" style={{ width: '60%' }}>
        <div className="grid grid-cols-3 gap-4">
          {clinicalfileresponse && selectClinincalFilterColumn}
        </div>
        {!clinicalfileresponse && (
          <div>
            <LoaderCmp />
            <p className="mt-8 text-center text-lg">
              <FormattedMessage
                id="UploadWaitMessage"
                defaultMessage="Uploading data, Please wait for a moment."
              />{' '}
            </p>
          </div>
        )}
      </div>
      <div className="w-full">
        <h1 className="text-center">{message[activeTableKey]}</h1>
      </div>

      <div className="flex justify-between mt-24">
        <div className="">
          <button
            className="capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
            type="button"
            onClick={() => {
              updateComponentNumber(0);
            }}
          >
            <FormattedMessage id="Back" defaultMessage="Back" />
          </button>
        </div>
        <div className="">
          <button
            className="capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
            type="button"
            onClick={() => {
              sendColumnsData(responseData, clinicalfileresponse['res'].length);
            }}
          >
            <FormattedMessage id="Send" defaultMessage="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadDropdowncomponent;
