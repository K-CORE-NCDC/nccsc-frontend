import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import FileProjectDataTable from './FileProjectDataTable';

function FileUploadDropdowncomponent({sendColumnsData}) {
  const [selectClinincalFilterColumn, setSelectClinincalFilterColumn] = useState([])
  const [responseData, setResponseData] = useState({})
  const [clinincalFilterColumns, setClinincalFilterColumns] = useState([])
  const [activeTableKey, setActiveTableKey] = useState("clinical_information")
  const [currentFilename, setCurrentFilename] = useState("")
  const [tableNavTabs, setTableNavTabs] = useState([])
  const clinicalfileresponse = useSelector((data) => data.homeReducer.newFileUploadData);
  const verificationResponse = useSelector((data) => data.homeReducer.uploadClinicalColumns);
  const [message, setMessage] = useState('')



  const getFileName = () => {
    if (clinicalfileresponse && clinicalfileresponse['res'].length > 0) {
      for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
        if (clinicalfileresponse['res'][i]['tab'] === activeTableKey) {
          return clinicalfileresponse['res'][i]['filename']
        }
      }
    }
  }

  const clinicalUpdateFileTypeOnChange = (e) => {
    console.log(activeTableKey, e.target.name, e.target.value);
    let divName = e.target.name
    let divValue = e.target.value
    // setUploadFile(prevState)
    let tmp = { ...clinincalFilterColumns }
    Object.keys(tmp).forEach((obj) => {
      if (tmp[obj].id === divName) {
        tmp[obj].value = divValue
      }

    })
    setClinincalFilterColumns(tmp)
    let tempresponseData = { ...responseData }
    console.log(tempresponseData[activeTableKey]);
    if (tempresponseData[activeTableKey]) {
      tempresponseData[activeTableKey]['types'][divName] = divValue
    }
    else {
      tempresponseData[activeTableKey] = {}
      tempresponseData[activeTableKey]['filename'] = getFileName(clinicalfileresponse)
      tempresponseData[activeTableKey]['types'] = {}
      tempresponseData[activeTableKey]['types'][divName] = divValue
    }
    setResponseData(tempresponseData)
    console.log("responseData",responseData);
  }

  const onSubmit = (e) => {
    console.log(responseData);
  }
  const tabDropdownTable = (tab) => {
    // console.log("tab", tab);
    setActiveTableKey(tab)
    if (clinicalfileresponse && clinicalfileresponse['res'].length > 0) {
      for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
        let row = clinicalfileresponse['res'][i]
        let column = row['columns']
        processColumns(column)
      }
      // console.log("clinincalFilterColumns", clinincalFilterColumns);
    }
  }
  const processColumns = (columns, tab) => {
    // console.log("columns", columns);
    let colsarray = []

    for (let i = 0; i < columns.length; i++) {
      let obj = {
        id: columns[i],
        title: columns[i],
        type: 'select',
        options: ['', 'text', 'number', 'decimal', 'boolean', 'date'],
        value: "",
      }
      colsarray.push(obj)
    }
    setClinincalFilterColumns(prevState => ({
      ...prevState,
      [tab]: colsarray
    }))
  }
  useEffect(() => {
    if (clinicalfileresponse && clinicalfileresponse['res'].length > 0) {
      let temptabs = []
      for (let i = 0; i < clinicalfileresponse['res'].length; i++) {
        let row = clinicalfileresponse['res'][i]
        let tab = row['tab']
        let css = "px-4 py-2 font-semibold rounded-t opacity-50"
        if (activeTableKey === tab) {
          css += " border-blue-400 border-b-4 -mb-px opacity-100"
        }
        temptabs.push(
          <li key={tab} className={css}>
            <button value={tab} onClick={() => tabDropdownTable(tab)} className="capitalize" >{tab}</button>
          </li>
        )
        let columns = row['columns']
        processColumns(columns, tab)

      }
      setTableNavTabs(temptabs)
    }
    else if(clinicalfileresponse){
      for(let i=0; i < clinicalfileresponse['res'].length; i++){
        if(clinicalfileresponse['res'][i]['tab'] === activeTableKey ){
          setMessage(clinicalfileresponse['res'][i]['message'])
        }
      }
    }
  }, [clinicalfileresponse])

  useEffect(() => {
    // console.log("clinincalFilterColumns-------->", clinincalFilterColumns);
    let firstInput = []
    if (clinicalfileresponse) {
      Object.keys(clinincalFilterColumns).forEach(key => {
        // console.log("key", clinincalFilterColumns[key]);
        if (key === activeTableKey) {
          clinincalFilterColumns[key].forEach(obj => {
            firstInput.push(
              <div className="flex justify-between" >
                <div className="my-auto">
                  <h2>{obj.title}</h2>
                </div>
                <div key={obj.id} className="">
                  <div className="relative w-full col-span-4">
                    <select onChange={clinicalUpdateFileTypeOnChange}
                      name={obj.title}
                      defaultChecked='false'
                      defaultValue={obj.value}
                      className='select-color w-48 p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                      {Object.keys(obj.options).map(type => (
                        <option className='text-gray-900' key={type} value={obj.options[type]}>{obj.options[type]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )
          })

        }


      }

      )
    }
    setSelectClinincalFilterColumn(firstInput)
    // console.log("firstInput", firstInput);
  }, [clinincalFilterColumns])
  return (
    <div>
      <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " >
          {tableNavTabs}
        </ul>
      </nav>
      <div id="tab-contents">
        <div className='grid grid-cols-3 gap-4'>
          {selectClinincalFilterColumn}
        </div>
      </div>
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            sendColumnsData(responseData)
          }}
        >
          send
        </button>
      </div>
      <FileProjectDataTable verificationResponse = {verificationResponse} activeTableKey = {activeTableKey}/>
    </div>
  )
}

export default FileUploadDropdowncomponent