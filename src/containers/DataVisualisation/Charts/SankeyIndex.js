import React, { useState, useEffect, useRef } from 'react'

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
            setNodes([])
            setLinks([])
            // setRender(true)
            dispatch(getSankeyJson('POST', inputData))

            sankyTableData_is = {
                'Gene': reportData['detail_gene_data'][gene]["gene_name"],
                'Variant': reportData['detail_gene_data'][gene]["Variant"].filter(Boolean).toString(),
                'Rsid': reportData['detail_gene_data'][gene]["Rsid"].filter(Boolean).toString(),
                'Disease': reportData['detail_gene_data'][gene]["Disease"].filter(Boolean).toString(),
                'Drug': reportData['detail_gene_data'][gene]["Drug"].filter(Boolean).toString()

            }
            setSankyTableData(sankyTableData_is)

            // setNodes(reportData['response_sanky_data'][gene]["nodes"])
            // setLinks(reportData['response_sanky_data'][gene]["links"])
        }

    }, [initalProps])
    


    useEffect(() => {
        if (d) {
            setRender(false)
            setNodes([])
            setLinks([])
            setInitialProps(d)
        }
    }, [])

    // useEffect(() => {
    //     console.log("first function",gene);
    // },[gene])

    useEffect(() => {
        if (sankeyJson) {
            let n = sankeyJson['nodes']
            let l = sankeyJson['links']
            setNodes(n)
            setLinks(l)
            let graph = {
                "nodes": [{"id": "Alice"},{"id": "Bob"},{"id": "Carol"}],
                "links": [{"source": 0, "target": 1}, {"source": 1, "target": 2}],
                "units": "TWh"
            }
            var elm = document.getElementById('sankey-parent')
            var sankyElement = document.getElementById('sankey')
            if (sankyElement.childNodes.length > 0) {
                sankyElement.childNodes[0].remove()
            }
            var w = elm.offsetWidth - 50
            drawSankey(graph, 'sankey', w, 700)


        }
    }, [sankeyJson])

    const guid = () => {
        const _p8 = (i) => {
            const p = (`${Math.random().toString(16)}000000000`).substr(2, 8)
            return i ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : p
        }
        return _p8() + _p8(true) + _p8(true) + _p8()
    }
    const drawSankey = (graph, id, w, h) => {
        select(id).select('svg').remove()
        const svg = select("#" + id)
          .append('svg')
          .attr('width', w)
          .attr('height', "100vh")
    
        const { nodes, links } = d3Sankey()
          .nodeId(function (d) {
            return d.index
          })
          .nodeAlign(sankeyJustify)
          .nodeWidth(15)
          .nodePadding(10)
          .extent([[1, 5], [w - 1, h - 5]])({
            nodes: graph.nodes.map(d => Object.assign({}, d)),
            links: graph.links.map(d => Object.assign({}, d))
          })
    
        // console.log(nodes,links);
        // const { nodes, links } = sankey(graph,w,h)
        const scale = scaleOrdinal(schemeCategory10)
        const color = name => scale(name.replace(/ .*/, ''))
        const format = d => `$${d3Format(',.0f')(d)}`
    
        const infoPopup = select('#d3Tooltip')
    
        svg.append('g')
          .attr('stroke', '#000')
          .selectAll('rect')
          .data(nodes)
          .enter()
          .append('rect')
          .attr("x", d => d.x0)
          .attr("y", d => d.y0)
          .attr("height", d => d.y1 - d.y0)
          .attr("width", d => d.x1 - d.x0)
          .attr("fill", d => color(d.name))
          .append("title")
          .text(d => `${d.name}\n${format(d.value)}`)
          .on('mouseover', (d) => {
            console.log(d);
          });
    
    
    
        const link = svg.append('g')
          .attr('fill', 'none')
          .attr('stroke-opacity', 0.5)
          .selectAll('g')
          .data(links)
          .enter()
          .append('g')
          .style('mix-blend-mode', 'multiply')
    
        const gradient = link.append('linearGradient')
          .attr('id', (d) => {
            d.uid = guid()
            return d.uid
          })
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', d => d.source.x1)
          .attr('x2', d => d.target.x0)
    
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', d => color(d.source.name))
    
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', d => color(d.target.name))
    
        link.append('path')
          .attr('d', sankeyLinkHorizontal())
          .attr('stroke', d => `url(#${d.uid})`)
          .attr('stroke-width', d => Math.max(1, d.width))
        link.append("title")
          .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);
        svg.append('g')
          .style('font', '10px sans-serif')
          .selectAll('text')
          .data(nodes)
          .enter()
          .append('text')
          .attr('x', d => (d.x0 < w / 2 ? d.x1 + 6 : d.x0 - 6))
          .attr('y', d => (d.y1 + d.y0) / 2)
          .attr('dy', '0.35em')
          .attr('text-anchor', d => (d.x0 < w / 2 ? 'start' : 'end'))
          .text(d => `${d.name}`)
    
      }

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
            <div id='sankey-parent'>
                <div id='sankey'>

                </div>
            </div>
            {gene && nodes.length > 0 && links.length > 0 &&
                <>
                    {sankyTableData && sankyTable}
                </>
            }

            {gene && (links.length <= 0) &&<> {sankyTable}</>}
        </div>
    )
}

export default SankeyIndex








