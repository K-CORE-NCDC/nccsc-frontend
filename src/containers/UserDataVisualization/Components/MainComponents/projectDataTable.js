import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectTableData, clearProjectTableDataTableData } from '../../../../actions/api_actions'
import DataTable from 'react-data-table-component';

const dropdownOptions = {
    clinical_information: "Clinical Information",
    rna: "RNA",
    dna_mutation: "DNA Mutation",
    dna_methylation: "DNA Methylation",
    proteome: "proteome",
    phospho: "phospho",
    cnv: "cnv",
    fusion: "fusion"
}
const ProjectDataTable = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const fileDataAsTableAll = useSelector((data) => data.dataVisualizationReducer.userDataProjectTable);
    const [tableNavTabs, setTableNavTabs] = useState([])
    const [fileDataAsTableRendered, setFileDataAsTableRendered] = useState({})
    const [activeTableKey, setActiveTableKey] = useState("")
    // const [fileDataAsTableAll, setFileDataAsTableAll] = useState({})
    const [tableHeaders, setTableHeaders] = useState([])
    const [show, setShow] = useState(false)
    const params = useParams()


    const changeErrorDataTable = (tableTabName) => {
        setShow(false)
        setActiveTableKey(tableTabName)
        setFileDataAsTableRendered(fileDataAsTableAll[tableTabName])
    }

    useEffect(() => {
        if (params && params.id) {
            dispatch(fetchProjectTableData({ project_id: params.id }))
        }
    }, [params])

    useEffect(() => {
        return () => {
            dispatch(clearProjectTableDataTableData())
        }
    }, [])

    useEffect(() => {
        if (fileDataAsTableRendered && fileDataAsTableRendered.length > 0) {
            let allColumns = []
            Object.keys(fileDataAsTableRendered[0]).forEach(e => {
                let nameOfCol = e
                nameOfCol = nameOfCol.replaceAll('_', ' ')
                allColumns.push(
                    {
                        name: nameOfCol.toLocaleUpperCase(),
                        selector: row => row[e]

                    }
                )
            })
            setTableHeaders(allColumns)
            setShow(true)
        }
    }, [fileDataAsTableRendered])


    useEffect(() => {
        if (fileDataAsTableAll) {
            setShow(false)
            let currentRenderedTable = Object.keys(fileDataAsTableAll)
            if (currentRenderedTable.length > 0) {
                setFileDataAsTableRendered(fileDataAsTableAll[currentRenderedTable[0]])
                setActiveTableKey(currentRenderedTable[0])
            }
        }
    }, [fileDataAsTableAll])

    useEffect(() => {
        if (fileDataAsTableAll) {
            let allTableTabs = Object.keys(fileDataAsTableAll)
            let tableNavTabsTemp = []
            allTableTabs.forEach(element => {
                let css = "px-4 py-2 font-semibold rounded-t opacity-50"
                if (activeTableKey === element) {
                    css += " border-blue-400 border-b-4 -mb-px opacity-100"
                }
                tableNavTabsTemp.push(
                    <li key={element} className={css}>
                        <button value={element} onClick={() => changeErrorDataTable(element)} className="capitalize" >{dropdownOptions[element]}</button>
                    </li>
                )
            })
            setTableNavTabs(tableNavTabsTemp)
        }
    }, [activeTableKey])


    return (
        <div>
            {show && <div className='p-1 col-span-3 gap-6'>
                <div className="p-1 flex justify-around">
                    <button onClick={() => history.push('/userdata/')} className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
                    >
                        back
                    </button>
                    <button onClick={() => history.push(`/visualise/circos/${params.id}`)} className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
                    >
                        visualize
                    </button>
                </div>
                <section>
                    <nav className=" px-8 pt-2 shadow-md">
                        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " >
                            {tableNavTabs}
                        </ul>
                    </nav>
                </section>
                <section >
                    <div id="tab-contents">
                        <div>
                            {/* <ExampleUserTable tableData={fileDataAsTableRendered} /> */}
                            <DataTable pagination
                                columns={tableHeaders}
                                data={fileDataAsTableRendered}
                            />
                        </div>
                    </div>
                </section>
            </div>}
        </div>
    );
}

export default ProjectDataTable;