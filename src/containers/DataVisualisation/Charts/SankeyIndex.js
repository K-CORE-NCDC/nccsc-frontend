import React, { useState, useEffect, useRef } from 'react'
// import Sankeyd3 from './Sankeyd3'
// import Sankey from './Sankey'
import { useSelector, useDispatch } from "react-redux";
import { getSankeyJson } from '../../../actions/api_actions'
import Sankey from './NewSankey'
import NewSankeyd3 from './NewSankeyd3'
import { values } from 'd3-collection';
import { randomBates } from 'd3';
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
        }

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

    useEffect(() => {
        if (sankeyJson) {
            let tmp = {}
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
            tmp[gene] = 'gene'
            count = 1;
            for (let obj in sankeyJson) {
                if (!(sankeyJson[obj]['variant_classification'] in geneNodes) && (sankeyJson[obj]['variant_classification'])) {
                    geneNodes[sankeyJson[obj]['variant_classification']] = count;
                    tmp[sankeyJson[obj]['variant_classification']] = 'vc'
                    next = sankeyJson[obj]['variant_classification'];
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
                    geneNodes[sankeyJson[obj]['dbsnp_rs']] = count;
                    tmp[sankeyJson[obj]['dbsnp_rs']] = 'rsid'
                    next = sankeyJson[obj]['dbsnp_rs'];
                    geneLinks.push({ 'source': geneNodes[prev], 'target': geneNodes[next], 'value': 10 })
                    prev = next;
                    count++;
                }
                else if ((sankeyJson[obj]['dbsnp_rs'] in geneNodes)) {
                    prev = sankeyJson[obj]['dbsnp_rs'];
                }
                if (!(sankeyJson[obj]['diseasename'] in geneNodes) && (sankeyJson[obj]['diseasename'])) {
                    geneNodes[sankeyJson[obj]['diseasename']] = count;
                    tmp[sankeyJson[obj]['diseasename']] = 'disease'
                    next = sankeyJson[obj]['diseasename'];
                    geneLinks.push({ 'source': geneNodes[prev], 'target': geneNodes[next], 'value': 10 })
                    prev = next;
                    count++;
                }
                else if ((sankeyJson[obj]['diseasename'] in geneNodes)) {
                    prev = sankeyJson[obj]['diseasename'];
                }
                if (!(sankeyJson[obj]['drugname'] in geneNodes) && (sankeyJson[obj]['drugname'])) {
                    geneNodes[sankeyJson[obj]['drugname']] = count;
                    tmp[sankeyJson[obj]['drugname']] = 'drug'
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
                    let type = ''
                    if (i in tmp){
                        type = tmp[i]
                    }
                    listOfNodes.push({ "name": i,"type": type })
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

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['hugo_symbol']}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['variant_classification']}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['dbsnp_rs']}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['diseasename']}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['drugname']}</td>
                        </tr>
                    ))}
                </tbody>

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

  
    return (

        <div id="main_chart_cont">

            {gene && listOfNodes.length > 0 && listOfLinks.length > 0 &&
                <>
                    <Sankey></Sankey>
                    <NewSankeyd3 SankeyJson={SankeyJsonData} idName='chart'></NewSankeyd3>
                    {sankyTableData}
                </>
            }

            {gene && (listOfLinks.length <= 0) &&
                <>
                    {sankyTableData}
                    {reportData.variant_info[gene].map((gene, i) => {
                        <p key={i}></p>
                    })
                    }
                </>
            }

        </div>
    )
}

export default SankeyIndex








