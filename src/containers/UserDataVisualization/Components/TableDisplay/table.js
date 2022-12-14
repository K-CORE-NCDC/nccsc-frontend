import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import config from '../../../../config';
import { Link } from 'react-router-dom'

const UserFilesTable = ({ userDataTableData }) => {
    const columns = ['name', 'dna_mutation', 'methylation', 'rna', 'proteome', 'clinical_information', 'cnv', 'phospho', 'fusion']
    const [showTableRows, setShowTableRows] = useState(false)

    const table_cols = [
        {
            name: 'NAME',
            selector: row => row.name,
            cell:(row)=><Link className="text-blue-600" to={`/user-data/${row.id}`}>{row.name}</Link>
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
        {
            cell:(row) => <button className="bg-main-blue hover:bg-main-blue w-80 h-20 text-white m-4 font-bold py-2 px-4 border border-blue-700 rounded" onClick={clickHandler} id={row.id}>Delete</button>,
            ignoreRowClick: false,
            allowOverflow: true,
            button: true,
        }
    ]
    const clickHandler = (event)=>{
    }

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