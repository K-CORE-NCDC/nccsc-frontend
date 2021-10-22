import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const UserFilesTable = ({ userDataTableData }) => {
    console.log(userDataTableData);
    const columns = ['name', 'dna_mutation', 'methylation', 'rna', 'proteome', 'clinical_information', 'cnv', 'phospho', 'fusion']
    const [showTableRows, setShowTableRows] = useState(false)

    const table_cols = [
        {
            name: 'NAME',
            selector: row => row.name,
            cell:(row)=><a className="text-blue-600" href={`user-data/${row.id}`}>{row.name}</a>
        },
        {
            name: 'DNA MUTATION',
            selector: row => row.dna_mutation,
        },
        {
            name: 'METHYLATION',
            selector: row => row.methylation,
        },
        {
            name: 'RNA',
            selector: row => row.rna,
        },
        {
            name: 'PROTEOME',
            selector: row => row.proteome,
        },
        {
            name: 'CLINICAL INFO',
            selector: row => row.clinical_information,
        },
        {
            name: 'CNV',
            selector: row => row.cnv,
        },
        {
            name: 'PHOSPHO',
            selector: row => row.phospho,
        },
        {
            name: 'FUSION',
            selector: row => row.fusion,
        },
    ]

    useEffect(() => {
        if (userDataTableData && userDataTableData.length > 0) {
            setShowTableRows(true)
        } else {
            setShowTableRows(false)
        }
    }, [userDataTableData])

    return (
        <>
            <DataTable pagination
            columns={table_cols}
            data={userDataTableData}
          />
        </>
    );
}

export default UserFilesTable;