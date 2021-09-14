import React, { useState, useEffect } from 'react';

const UserFilesTable = ({ userDataTableData }) => {
    // const columns = ['name', 'dna_mutation', 'dna_methylation', 'rna_zscore', 'proteome', 'clinical_information']
    const [columns, setColumns] = useState()
    const [showTableRows, setShowTableRows] = useState(false)
    const [tableRows, setTableRows] = useState("")

    useEffect(() => {
        if(userDataTableData){
          let body_data = []
          let first = true
          userDataTableData.forEach((item, i) => {
            if(first){
              setColumns(Object.keys(item))
              first = false
              let td = []
              Object.keys(item).forEach((key, i) => {
                    td.push(
                      <td key={`${i}-${Object.keys(item)[i]}`} className="px-6 py-3 text-center font-medium tracking-wider">
                        {item[key]}
                      </td>
                    )
              });
              body_data.push(
                <tr key={i} value={i}>
                  {td}
                </tr>
              )
            }
            else{
              let td = []
              Object.keys(item).forEach((key, i) => {
                    td.push(
                      <td key={`${i}-${Object.keys(item)[i]}`} className="px-6 py-3 text-center font-medium tracking-wider">
                        {item[key]}
                      </td>
                    )
              });
              body_data.push(
                <tr key={i} value={i}>
                  {td}
                </tr>
              )
            }
          });
          setTableRows(body_data)
        }
    }, [userDataTableData])

    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-4">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-4">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns?columns.map(columnName => (
                                            <th key={columnName} scope="col" className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                                                {columnName}
                                            </th>
                                        )):""}
                                    </tr>
                                </thead>
                                {
                                  tableRows &&
                                  <tbody className="bg-white divide-y divide-gray-200">
                                  {tableRows}
                                </tbody>
                              }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserFilesTable;
