import React, { useState, useEffect, useRef } from 'react'
<<<<<<< HEAD

import { useSelector, useDispatch } from "react-redux";
import { getSankeyJson } from '../../../actions/api_actions'
import {
    format as d3Format,
    event,
    scaleOrdinal,
    schemeCategory10,
    select
  } from 'd3'
import {
    sankey as d3Sankey,
    sankeyJustify,
    sankeyLinkHorizontal
  } from 'd3-sankey'

=======
// import Sankeyd3 from './Sankeyd3'
// import Sankey from './Sankey'
import { useSelector, useDispatch } from "react-redux";
import { getSankeyJson } from '../../../actions/api_actions'
import Sankey from './NewSankey'
import NewSankeyd3 from './NewSankeyd3'
import { values } from 'd3-collection';
import { randomBates } from 'd3';
>>>>>>> 694a8ba4834805d5900d9cc5434973c50e8cf0bd
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
    const [listOfNodes, setListOfNodes] = useState([])
    const [listOfLinks, setListOfLinks] = useState([])
    const [detailGeneData, setDetailGeneData] = useState([])
    const [SankeyJsonData, setSankeyJsonData] = useState()
    const [sankyTableData, setSankyTableData] = useState()
    const [sankyTableData2,setSankyTableData2]  = useState('')
    let sankyTable;

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
            setRender(true)
            dispatch(getSankeyJson('POST', inputData))
            setSankyTableData2(variants[gene].filter(Boolean).toString())
            // setNodes([])
            // setLinks([])

            // sankyTableData_is = {
            //     'Gene': reportData['detail_gene_data'][gene]["gene_name"],
            //     'Variant': reportData['detail_gene_data'][gene]["Variant"].filter(Boolean).toString(),
            //     'Rsid': reportData['detail_gene_data'][gene]["Rsid"].filter(Boolean).toString(),
            //     'Disease': reportData['detail_gene_data'][gene]["Disease"].filter(Boolean).toString(),
            //     'Drug': reportData['detail_gene_data'][gene]["Drug"].filter(Boolean).toString()

            // }
            // setSankyTableData(sankyTableData_is)

            // setNodes(reportData['response_sanky_data'][gene]["nodes"])
            // setLinks(reportData['response_sanky_data'][gene]["links"])

            // if(reportData['response_sanky_data'][gene]["nodes"].length > 0){
            //     let nodes = reportData['response_sanky_data'][gene]["nodes"]
            //     let nodesJson ={}
            //     for(let i = 0; i<reportData['response_sanky_data'][gene]["nodes"].length;i++){
            //         console.log("i is",reportData['response_sanky_data'][gene]["nodes"][i]);
            //     }
            // }

        }
        console.log("sanky table data is", reportData);

    }, [initalProps])
    


    useEffect(() => {
        if (d) {
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

    useEffect(() => {
        if (sankeyJson) {
            console.log("sankeyJson", sankeyJson)
            let detailgeneData = [];
            for (let i = 0; i < Object.keys(sankeyJson).length - 1; i++) {
                detailgeneData.push(sankeyJson[i])
            }
            console.log("detail gene is", detailgeneData);
            setDetailGeneData(detailgeneData)
            // setSankeyJsonData(detailgeneData)
            // hugo_symbol,variant_classification, dbsnp_rs,diseasename,drugname            
            // {"source":1, "target":4, "value":Math.floor(Math.random() * 100)},
            // console.log("abcd ar3e", Object.keys(geneNodes).length);
            let firsttime = true;
            let prev = 0, next = 1;
            let geneNodes = {}
            let geneLinks = []
            let listOfNodes = []
            let count = 1;
            geneNodes[gene] = prev;
            count = 1;
            for (let obj in sankeyJson) {
                if (!(sankeyJson[obj]['variant_classification'] in geneNodes) && (sankeyJson[obj]['variant_classification'])) {
                    geneNodes[sankeyJson[obj]['variant_classification']] = count;
                    next = sankeyJson[obj]['variant_classification'];
                    console.log("in variant_classification", sankeyJson[obj]['variant_classification']);
                    if (firsttime) {

                        geneLinks.push({ 'source': 0, 'target': geneNodes[next], 'value': 10 })
                        firsttime = false;
                    }
                    else {
                        geneLinks.push({ 'source': geneNodes[prev], 'target': geneNodes[next], 'value': 10 })
                    }
                    prev = next;
                    count++;
                }
                else if ((sankeyJson[obj]['variant_classification'] in geneNodes)) {
                    prev = sankeyJson[obj]['variant_classification'];
                }
                if (!(sankeyJson[obj]['dbsnp_rs'] in geneNodes) && (sankeyJson[obj]['dbsnp_rs'])) {
                    console.log("in dbsnp_rs", sankeyJson[obj]['dbsnp_rs']);
                    geneNodes[sankeyJson[obj]['dbsnp_rs']] = count;
                    next = sankeyJson[obj]['dbsnp_rs'];
                    geneLinks.push({ 'source': geneNodes[prev], 'target': geneNodes[next], 'value': 10 })
                    prev = next;
                    count++;
                }
                else if ((sankeyJson[obj]['dbsnp_rs'] in geneNodes)) {
                    prev = sankeyJson[obj]['dbsnp_rs'];
                }
                if (!(sankeyJson[obj]['diseasename'] in geneNodes) && (sankeyJson[obj]['diseasename'])) {
                    console.log("in diseasename", sankeyJson[obj]['diseasename']);
                    geneNodes[sankeyJson[obj]['diseasename']] = count;
                    next = sankeyJson[obj]['diseasename'];
                    geneLinks.push({ 'source': geneNodes[prev], 'target': geneNodes[next], 'value': 10 })
                    prev = next;
                    count++;
                }
                else if ((sankeyJson[obj]['diseasename'] in geneNodes)) {
                    prev = sankeyJson[obj]['diseasename'];
                }
                if (!(sankeyJson[obj]['drugname'] in geneNodes) && (sankeyJson[obj]['drugname'])) {
                    console.log("in drugname", typeof (sankeyJson[obj]['drugname']));
                    geneNodes[sankeyJson[obj]['drugname']] = count;
                    next = sankeyJson[obj]['drugname'];
                    geneLinks.push({ 'source': geneNodes[prev], 'target': geneNodes[next], 'value': 10 })
                    prev = next;
                    count++;
                }
                else if ((sankeyJson[obj]['drugname'] in geneNodes)) {
                    prev = sankeyJson[obj]['drugname'];
                }
            }

            for (let i in geneNodes) {
                if (i !== 'undefined') {
                    // console.log("i", i, "geneNodes", geneNodes[i]);
                    listOfNodes.push({ "name": i })
                }
            }
            listOfNodes.pop()   // for removing the last undefined node.
            geneLinks.pop()     // for removing the last undefined link.
            setListOfNodes(listOfNodes)
            setListOfLinks(geneLinks)
            let sankeyjsondata = {
                "nodes": listOfNodes,
                "links": geneLinks
            }

            setSankeyJsonData(sankeyjsondata)


        }
    }, [sankeyJson])

    useEffect(() => {
        // console.log("list of node are in useffect", listOfNodes);
        // console.log("list of links are in useffect", listOfLinks);
        console.log("data is changed", detailGeneData);
        if (detailGeneData.length > 0) {
            let tableHTML = <table className="min-w-full border text-center">
                <thead className="border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                            gene
                        </th>
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
                    {detailGeneData.map((genedata, index) => (

                        <tr key={index} className="border-b">

            </table>
            setSankyTableData(tableHTML)
        }
        else {
            let tableHTML = <table className="min-w-full border text-center">
                <thead className="border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                            gene
                        </th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{gene}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{sankyTableData2}</td>
                        </tr>
                </tbody>

            </table>
            setSankyTableData(tableHTML)
        }

    }, [detailGeneData])

    // sankyTable = <div>
    //     <table className="min-w-full border text-center">
    //         <thead className="border-b">
    //             <tr>
    //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
    //                     gene
    //                 </th>
    //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
    //                     Variant
    //                 </th>
    //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
    //                     Rsid
    //                 </th>
    //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
    //                     Disease
    //                 </th>
    //                 <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
    //                     Drug
    //                 </th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {detailGeneData.map((item) => {

    //                 <tr className="border-b">

    //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{item['hugo_symbol']}</td>
    //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{item['hugo_symbol']}</td>
    //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{item['hugo_symbol']}</td>
    //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{item['hugo_symbol']}</td>
    //                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{sankyTableData[0]['Variant'] ? sankyTableData[0]['Variant'] : " "}</td>
    //             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
    //                 {sankyTableData[0]['Rsid'] ? sankyTableData[0]['Rsid'] : " "}
    //             </td>
    //             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
    //                 {sankyTableData[0]['Disease'] ? sankyTableData[0]['Disease'] : " "}
    //             </td>
    //             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    //                 {sankyTableData[0]['Drug'] ? sankyTableData[0]['Drug'] : " "}
    //             </td> */}
    //                 </tr>

    //             })}
    //         </tbody>
    //     </table>
    // </div>

    return (

        <div id="main_chart_cont">
<<<<<<< HEAD
            <div id='sankey-parent'>
                <div id='sankey'>

                </div>
            </div>
            {gene && nodes.length > 0 && links.length > 0 &&
=======
            {/* {gene && nodes.length > 0 && links.length > 0 &&
>>>>>>> 694a8ba4834805d5900d9cc5434973c50e8cf0bd
                <>
                    {sankyTableData && sankyTable}
                </>
            } */}

            {gene && listOfNodes.length > 0 && listOfLinks.length > 0 &&
                <>
                    <Sankey></Sankey>
                    <NewSankeyd3 SankeyJson={SankeyJsonData} idName={`chart`}></NewSankeyd3>
                    {sankyTableData}
                </>
            }

<<<<<<< HEAD
            {gene && (links.length <= 0) &&<> {sankyTable}</>}
=======
            {gene && (listOfLinks.length <= 0) &&
                <>
                    {sankyTableData}
                    {reportData.variant_info[gene].map((gene, i) => {
                        <p key={i}></p>
                    })
                    }

                </>
            }

            {/* {gene && (links.length <= 0) &&
                <>
                    <p>Double Click To Expand</p>
                    <p>Double Click To Expand</p>
                    {sankyTable}

                </>
            } */}
>>>>>>> 694a8ba4834805d5900d9cc5434973c50e8cf0bd
        </div>
    )
}

export default SankeyIndex








