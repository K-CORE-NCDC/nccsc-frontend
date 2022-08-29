import React, { useState, useEffect, useRef } from 'react'
import Sankeyd3 from './Sankeyd3'
import Sankey from './Sankey'
import { useSelector, useDispatch } from "react-redux";
import { getSankeyJson } from '../../../actions/api_actions'
function SankeyIndex({ ...props }) {
    const d = { ...props }
    const [initalProps, setInitialProps] = useState({})
    const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
    const sankeyJson = useSelector(state => state.dataVisualizationReducer.SankeyJson)
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [width, setWidth] = useState(960)
    const [gene, setGene] = useState('')
    const dispatch = useDispatch()
    const [render, setRender] = useState(false)
    const [sankyTableData, setSankyTableData] = useState({})


    useEffect(() => {
        if (initalProps && 'data' in initalProps) {
            let d = initalProps
            let variants = reportData.variant_info
            let sankyTableData_is

            console.log("props are ", d);
            console.log("props are ", initalProps);

            let gene = d['data']['gene']
            let inputData = {
                'gene': gene,
                'mutation': variants[gene]
            }
            setGene(gene)
            // setNodes([])
            // setLinks([])
            setRender(true)
            // dispatch(getSankeyJson('POST', inputData))

            sankyTableData_is = {
                'Gene': reportData['detail_gene_data'][gene]["gene_name"],
                'Variant': reportData['detail_gene_data'][gene]["Variant"].filter(Boolean).toString(),
                'Rsid': reportData['detail_gene_data'][gene]["Rsid"].filter(Boolean).toString(),
                'Disease': reportData['detail_gene_data'][gene]["Disease"].filter(Boolean).toString(),
                'Drug': reportData['detail_gene_data'][gene]["Drug"].filter(Boolean).toString()

            }
            setSankyTableData(sankyTableData_is)

            setNodes(reportData['response_sanky_data'][gene]["nodes"])
            setLinks(reportData['response_sanky_data'][gene]["links"])

        }
        console.log("sanky table data is", reportData);

    }, [initalProps])


    useEffect(() => {
        if (d) {
            console.log("first");
            setRender(false)
            setNodes([])
            setLinks([])
            setInitialProps(d)
        }


        // return()=>{
        //     console.log("Clean up")
        //     setWidth(960)
        //     setNodes([])
        //     setLinks([])

        // };

    }, [])

    // useEffect(() => {
    //     console.log("first function",gene);
    // },[gene])

    // useEffect(() => {
    //     if (sankeyJson) {
    //         let x = document.getElementById('main_chart_cont').offsetWidth
    //         setWidth(x)
    //         let n = sankeyJson['nodes']
    //         let l = sankeyJson['links']
    //         setNodes(n)
    //         setLinks(l)
    //     }
    // }, [sankeyJson])

    let sankyTable = <div>
        <table className="min-w-full border text-center">
            <thead className="border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                        Variant
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                        Rsid
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                        Disease
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        Drug
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{sankyTableData['Variant'] ? sankyTableData['Variant'] : " "}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {sankyTableData['Rsid'] ? sankyTableData['Rsid'] : " "}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {sankyTableData['Disease'] ? sankyTableData['Disease'] : " "}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {sankyTableData['Drug'] ? sankyTableData['Drug'] : " "}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>




    return (

        <div id="main_chart_cont">
            {gene && nodes.length > 0 && links.length > 0 &&
                <>
                    <Sankeyd3></Sankeyd3>
                    <Sankey gene={gene} width={width} exampleNodes={nodes} exampleLinks={links}></Sankey>
                    <p>Double Click To Expand</p>

                    {sankyTableData && sankyTable
                    }
                </>
            }



            {gene && (links.length <= 0) &&
                <>
                    <p>Double Click To Expand</p>
                    <p>Double Click To Expand</p>
                    {sankyTable}

                </>
            }
        </div>
    )
}

export default SankeyIndex








