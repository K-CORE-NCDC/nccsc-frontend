import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import SankeyIndex from '../DataVisualisation/Charts/SankeyIndex';
import ReportSubHeader from './ReportSubHeader';
import { useSelector, useDispatch } from "react-redux";
import Sankey from '../DataVisualisation/Charts/NewSankey'
import NewSankeyd3 from '../DataVisualisation/Charts/NewSankeyd3'


function PDFReport({ sampleKey, tableData, tableColumnsData, basicInformationData }) {
  const [basicHtml, setBasicHtml] = useState([])
  const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
  const sankeyJson = useSelector(state => state.dataVisualizationReducer.SankeyJson)
  const [gene, setGene] = useState('NRAS')
  const [sankeyData, setSankeyData] = useState([])
  const [sankyGeneList, setSankyGeneList] = useState([])
  const [sankyTableData, setSankyTableData] = useState([])
  const [sankyDataCharts, setSankyDataCharts] = useState([])
  const [detailGeneData, setDetailGeneData] = useState([])
  const [listOfNodes, setListOfNodes] = useState([])
  const [listOfLinks, setListOfLinks] = useState([])
  const [SankeyJsonData, setSankeyJsonData] = useState()
  const [sankyTableData2, setSankyTableData2] = useState('')

  useEffect(() => {
    if (basicInformationData && basicInformationData.length > 0) {
      let tmp = []
      for (let i = 0; i < basicInformationData.length; i++) {
        const row = basicInformationData[i];
        for (const key in row) {
          tmp.push(
            <div key={key} className='grid grid-cols-2  border-b border-gray-200 w-full'>
              <div className='border-r border-gray-200'>
                <p className='px-6 py-3'>
                  {key}
                </p>
              </div>
              <div >
                <p className='px-6 py-3'>
                  {row[key]}
                </p>
              </div>
            </div>
          )
        }
      }
      setBasicHtml(tmp)
    }
  }, [basicInformationData])


  useEffect(() => {
    if (reportData) {
      // let x = document.getElementById('sanky_chart_pdf1').offsetWidth
      // let n = reportData.response_sanky_data[5]['gene_data']['nodes']
      // let l = reportData.response_sanky_data[5]['gene_data']['links']
      // let gene = reportData.response_sanky_data[5]['gene_name']
      setGene(gene)
      let listofSankey = []
      let GeneListSanky = []

      for (let i in reportData['response_sanky_data']) {
        if (reportData['response_sanky_data'][i]['gene_data'].length <= 0) {
          continue
        }
        listofSankey.push({ 'gene_name': i, 'links': reportData['response_sanky_data'][i]['gene_data'] })
        GeneListSanky.push(i)
      }
      setSankeyData(listofSankey)
      setSankyGeneList(GeneListSanky)

      console.log("listofSankey", listofSankey);
      console.log("GeneListSanky", GeneListSanky);
    }
  }, [reportData])

  useEffect(() => {
    // console.log("list of node are in useffect", listOfNodes);
    // console.log("list of links are in useffect", listOfLinks);
    console.log("detailGeneData", detailGeneData);
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


  useEffect(() => {
    let getSankyData = (sankeyJson) => {

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
          // console.log("in variant_classification", sankeyJson[obj]['variant_classification']);
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
          // console.log("in dbsnp_rs", sankeyJson[obj]['dbsnp_rs']);
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
          // console.log("in diseasename", sankeyJson[obj]['diseasename']);
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
          // console.log("in drugname", typeof (sankeyJson[obj]['drugname']));
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

      let sankeyjsondata = {
        "nodes": listOfNodes,
        "links": geneLinks
      }

      return sankeyjsondata;

    }

    let getSankyTable = (detailGeneData) => {
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
        return tableHTML
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
        return tableHTML
      }
    }
    const sankeyCharts = []
    for (let i = 0; i < sankeyData.length; i++) {
      let SankeyJsonDataIs = getSankyData(sankeyData[i]['links'])
      let SankeyTableData = getSankyTable(sankeyData[i]['links'])
      console.log("sankeyjsin data", SankeyJsonDataIs);
      sankeyCharts.push(<div key={i} className={`sanky_chart_pdf${i}`}>
        {
          <div>
            <Sankey></Sankey>
            <NewSankeyd3 SankeyJson={SankeyJsonDataIs} idName={`chart${i}`}></NewSankeyd3>
            {/* {sankyTableData} */}

            {/* <div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{sankyTableData[sankeyData[i]['gene_name']]['Variant'] ? sankyTableData[sankeyData[i]['gene_name']]['Variant'] : " "}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                      {sankyTableData[sankeyData[i]['gene_name']]['Rsid'] ? sankyTableData[sankeyData[i]['gene_name']]['Rsid'] : " "}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                      {sankyTableData[sankeyData[i]['gene_name']]['Disease'] ? sankyTableData[sankeyData[i]['gene_name']]['Disease'] : " "}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {sankyTableData[sankeyData[i]['gene_name']]['Drug'] ? sankyTableData[sankeyData[i]['gene_name']]['Drug'] : " "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
            {SankeyTableData}
          </div>
        }
      </div>
      )
    }
    // console.log(sankeyCharts)
    setSankyDataCharts(sankeyCharts)
  }, [sankeyData])


  const customStyles = {
    headCells: {
      classNames: ['report_sankey'],
      style: {
        'textAlign': 'center',
        'display': 'block',
      }
    },
    expanderCell: {
      style: {
        'minWidth': '5%',
        'display': 'block',
      }
    }
  }

  const rowPreDisabled = (row) => {
    let variant = reportData.variant_info
    let gene = row.gene
    if (gene in variant) {
      // return row
    } else {
      return row
    }
  }

  const rowExpandFunc = (expanded, row) => {


  }
  const expandableRowExpanded = (row) => {
    // console.log(row)
  }





  return (

    <>

      <div>
        <div className='printpdf'>

          <h3 className='py-4 px-3 my-10'>Sample Name : {sampleKey}</h3>
          <div className='rounded-lg border border-gray-200 my-5 '>
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="lg:text-3xl sm:text-xl font-semibold">
                Basic Information
              </h3>
            </div>

            <div className=''>
              {basicHtml}
            </div>

          </div>


          <div>
            <div className='col-span-3 rounded-lg border border-gray-200'>
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="lg:text-3xl  sm:text-xl font-semibold">
                  Genomic Summary
                </h3>

              </div>

              {tableData && <div className='report_table'>
                <DataTable
                  columns={tableColumnsData}
                  data={tableData}
                  subHeader
                  customStyles={customStyles}
                  subHeaderComponent={<ReportSubHeader />}
                  expandableRows
                  expandableRowDisabled={rowPreDisabled}
                  expandableRowsComponent={SankeyIndex}
                  expandableRowExpanded={expandableRowExpanded}
                  onRowExpandToggled={rowExpandFunc}
                  subHeaderWrap
                />
              </div>}
            </div>
          </div>


        </div>
        <div>
          {sankyDataCharts}
        </div>
      </div>
    </>

  )
}

export default PDFReport






























