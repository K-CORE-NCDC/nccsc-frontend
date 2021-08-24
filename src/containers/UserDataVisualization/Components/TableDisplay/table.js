import React, { useState, useEffect } from 'react';

const UserFilesTable = ({ userDataTableData }) => {
    const columns = ['name', 'dna_mutation', 'dna_methylation', 'rna_zscore', 'proteome', 'clinical_information']
    const [showTableRows, setShowTableRows] = useState(false)
    
    useEffect(() => {
        if (userDataTableData && userDataTableData.length > 0) {
            setShowTableRows(true)
        } else {
            setShowTableRows(false)
        }
    }, [userDataTableData])

    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns.map(columnName => (
                                            <th key={columnName} scope="col" className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                                                {columnName}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                {showTableRows && <tbody className="bg-white divide-y divide-gray-200">

                                    {userDataTableData.map((tableRows, index) => (
                                        <tr key={tableRows.id} value={tableRows.id}>
                                            {
                                                columns.map((eachElement, index) => (
                                                    <td key={`${index}-${columns[index]}`} className="px-6 py-3 text-center font-medium tracking-wider">
                                                        <a href={`visualise/circos/${tableRows.id}`}>{tableRows[columns[index]]}</a>
                                                    </td>
                                            ))
                                            }
                                        </tr>
                                    ))}

                                </tbody>}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserFilesTable;