import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const Table = ({ tableData }) => {
    return (
        <table className="divide-y justify-center border w-4/5 divide-gray-200">
            <thead className="bg-gray-500">
                <tr>
                    {tableData.header.map(element => (
                        <th key={`${element}`} scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase">
                            {element}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {tableData.rows.map((row, rowIndex) => (
                    <tr key={`${rowIndex}-${Math.random()}`}>{row.map((element, index) => (
                        <td key={`${index}-${Math.random()}`} className="px-6 py-4 whitespace-nowrap text-left text-black">
                            {element}
                        </td>
                    ))}</tr>
                ))}
            </tbody>
        </table>
    );
}

const GraphsModal = ({closeShowTimelineTables, circosTimelieTableData }) => {
    const [showGraphs, setShowGraphs] = useState(false)
    const [bmiChart, setBmiChart] = useState([])
    const [ki67Chart, setKi67Chart] = useState([])
    const [bmiTable, setBmiTable] = useState({header: ['rgst_date', 'bmi_value'], rows: []})
    const [ki67Table, setKi67Table] = useState({ header: ['imnl_read_date', 'ki67_score'], rows: [] })
    const convertStrToDate = (dateString) => {
        let dateSplits = dateString.split('-')
        return new Date(dateSplits[0], dateSplits[1], dateSplits[2])
    }
    const ChartData = [[
        { type: 'string', id: 'Name' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
    ]]

    useEffect(() => {
        if(showGraphs){
            setBmiChart([...ChartData, [
                circosTimelieTableData.graph.bmi.sample,
                convertStrToDate(circosTimelieTableData.graph.bmi.min),
                convertStrToDate(circosTimelieTableData.graph.bmi.max)
            ]])

            setKi67Chart([...ChartData, [
                circosTimelieTableData.graph.ki67.sample,
                convertStrToDate(circosTimelieTableData.graph.ki67.min),
                convertStrToDate(circosTimelieTableData.graph.ki67.max)
            ]])
            let bmiTableRows = []
            let ki67TableRows = []
            circosTimelieTableData.table.bmi.forEach(element => {
                bmiTableRows.push([element.rgst_date, element.bmi_value])
            })

            circosTimelieTableData.table.ki67.forEach(element => {
                ki67TableRows.push([element.imnl_read_date, element.ki67_score])
            })

            setBmiTable(prevState => ({
                ...prevState,
                rows: bmiTableRows
            }))

            setKi67Table(prevState => ({
                ...prevState,
                rows: ki67TableRows
            }))
        }
    }, [showGraphs])

    useEffect(() => {
        if(circosTimelieTableData !== null && circosTimelieTableData !== undefined){
            if(Object.keys(circosTimelieTableData).length > 0){
                setShowGraphs(true)
            }else{
                setShowGraphs(false)
            }
        }else{
            setShowGraphs(false)
        }
    }, [circosTimelieTableData])

    return (
        <div>
            {showGraphs ?
                <div
                className="justify-center items-center w-screen flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-11/12 h-11/12 my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Timeline Graph
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className=" flex w-full">
                            <div className="mr-1 w-1/2 border-r-2">
                                <div className="m-1">
                                    <h6>Body Mass Index Timeline</h6>
                                </div>
                                <div className="m-1">
                                    <Chart
                                        width={'90%'}

                                        chartType="Timeline"
                                        loader={<div>Loading Chart</div>}
                                        data={bmiChart}
                                        options={{
                                            showRowNumber: true,
                                        }}
                                        rootProps={{ 'data-testid': '1' }}
                                    />
                                </div>
                                <div className="m-1">
                                    <Table tableData={bmiTable} />
                                </div>
                            </div>
                            <div className="ml-1 w-1/2">
                                <div className="m-1">
                                    <h6>KI67 Timeline</h6>
                                </div>
                                <div className="m-1">
                                    <Chart
                                        width={'90%'}

                                        chartType="Timeline"
                                        loader={<div>Loading Chart</div>}
                                        data={ki67Chart}
                                        options={{
                                            showRowNumber: true,
                                        }}
                                        rootProps={{ 'data-testid': '1' }}
                                    />
                                </div>
                                <div className="m-1">
                                    <Table tableData={ki67Table} />
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                onClick={closeShowTimelineTables}
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div> : <div>No DataFound</div>
            }
        </div>
    );
}

export default GraphsModal;