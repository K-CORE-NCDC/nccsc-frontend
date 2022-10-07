import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";

function FileUploadDropdowncomponent() {
    const [selectClinincalFilterColumn, setSelectClinincalFilterColumn] = useState([])
    const [responseData, setResponseData]= useState({})
    const [clinincalFilterColumns, setClinincalFilterColumns] = useState({
    })
    const clinicalfileresponse = useSelector((data) => data.homeReducer.newFileUploadData);
    const [fileId, setFileId] = useState(0) 

    
  const clinicalUpdateFileTypeOnChange = (e) => {
    // console.log(e.target.value, e.target.name);
    let divName = e.target.name
    let divValue = e.target.value
    console.log(divName,divValue);
    // setUploadFile(prevState)
    let tmp = {...clinincalFilterColumns} 
    Object.keys(tmp).forEach((obj)=>{
      if(tmp[obj].id === divName){
        tmp[obj].value = divValue
      }

    })
    setClinincalFilterColumns(tmp)
    // let finresponse = [...responseData]

    
    setResponseData(prevState => ({
      ...prevState,
      [divName]:divValue
    }))
    console.log(responseData);
  }

  const onSubmit = (e)=>{
console.log(responseData);
  }
    
    useEffect(() => {
        if (clinicalfileresponse && clinicalfileresponse['res'][fileId].columns !== null) {
          console.log(clinicalfileresponse['res'][fileId].columns);
          let columns = clinicalfileresponse['res'][fileId].columns
          for (let i = 0; i < columns.length; i++) {
            let obj = {
              id: columns[i],
              title: columns[i],
              type: 'select',
              options: ['','text', 'number', 'decimal', 'boolean', 'date'],
              value:"",
            }
            setClinincalFilterColumns(prevState => ({
              ...prevState,
              [i]: obj
            }))
    
          }
        }
      }, [clinicalfileresponse])
    
      useEffect(() => {
        // console.log("clinincalFilterColumns-------->", clinincalFilterColumns);
        let firstInput = []
        if (clinicalfileresponse) {
          Object.keys(clinincalFilterColumns).forEach(key => {
            console.log("key", clinincalFilterColumns[key]);
            firstInput.push(
              <div className="flex " >
                <div className="my-auto mr-20">
                  <h2>{clinincalFilterColumns[key].title}</h2>
                </div>
                <div key={key} className="grid grid-cols-12 gap-6 ">
                  <div className="relative w-full col-span-4">
                    <select onChange={clinicalUpdateFileTypeOnChange}
                      name={clinincalFilterColumns[key].title}
                      defaultChecked='false'
                      defaultValue={clinincalFilterColumns[key].value}
                      className='select-color w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                      {Object.keys(clinincalFilterColumns[key].options).map(type => (
                        <option className='text-gray-900' key={type} value={clinincalFilterColumns[key].options[type]}>{clinincalFilterColumns[key].options[type]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )
          })
        }
        setSelectClinincalFilterColumn(firstInput)
        // console.log("firstInput", firstInput);
      }, [clinincalFilterColumns])
  return (
    <div>
        {selectClinincalFilterColumn}
    </div>
  )
}

export default FileUploadDropdowncomponent