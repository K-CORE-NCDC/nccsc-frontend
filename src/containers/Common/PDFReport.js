import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import SankeyIndex from '../DataVisualisation/Charts/SankeyIndex';
import ReportSubHeader from './ReportSubHeader';
import { useSelector, useDispatch } from "react-redux";
import Sankey from '../DataVisualisation/Charts/NewSankey'
import NewSankeyd3 from '../DataVisualisation/Charts/NewSankeyd3'
import NccLogo from '../../assets/images/logoncc.png'


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
  const [todayDate, setTodayDate] = useState('')


  useEffect(() => {
    var today = new Date()
    let todaydate =today.getDate()+ '-' +(today.getMonth() + 1) + '-' + today.getFullYear();
    setTodayDate(todaydate)
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
      
      let nodes = {};
      let node_type = {};
      let i = 1;
      sankeyJson.forEach((element) => {
        for (const key in element) {
          if (key !== "sourceurl") {
            if (!nodes.hasOwnProperty(element[key]) && element[key]) {
              nodes[element[key]] = i;
              node_type[i] = key;
              i = i + 1;
            }
          }
        }
      });

      let final_nodes = [];
      for (const key in nodes) {
        final_nodes.push({ name: key, type: node_type[nodes[key]] });
      }
      let fn = {};
      let final_links = [];
      sankeyJson.forEach((element) => {
        if (element["hugo_symbol"] && element["variant_classification"]) {
          let k =
            nodes[element["hugo_symbol"]] +
            "_" +
            nodes[element["variant_classification"]];
          if (!(k in fn)) {
            fn[k] = "";
            final_links.push({
              source: element["hugo_symbol"],
              target: element["variant_classification"],
              value: 10,
            });
          }
        }
        if (element["variant_classification"] && element["dbsnp_rs"]) {
          let k =
            nodes[element["variant_classification"]] +
            "_" +
            nodes[element["dbsnp_rs"]];
          if (!(k in fn)) {
            fn[k] = "";
            final_links.push({
              source: element["variant_classification"],
              target: element["dbsnp_rs"],
              value: 10,
            });
          }
        }
        if (element["dbsnp_rs"] && element["diseasename"]) {
          let k =
            nodes[element["dbsnp_rs"]] + "_" + nodes[element["diseasename"]];
          if (!(k in fn)) {
            fn[k] = "";
            final_links.push({
              source: element["dbsnp_rs"],
              target: element["diseasename"],
              value: 10,
            });
          }
        }
        if (element["diseasename"] && element["drugname"]) {
          let k =
            nodes[element["diseasename"]] + "_" + nodes[element["drugname"]];
          if (!(k in fn)) {
            fn[k] = "";
            final_links.push({
              source: element["diseasename"],
              target: element["drugname"],
              value: 10,
            });
          }
        }
      });


      let sankeyjsondata = {
        "nodes": final_nodes,
        "links": final_links
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
            {SankeyTableData}
          </div>
        }
      </div>
      )
    }
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
        <div className='printpdf' id='printpdf'>
          <div>
            <h1 className='font-medium leading-tight text-5xl mt-0 mb-2 text-center text-black-600'>NCC Report</h1>
            <h1 className='font-medium leading-tight text-5xl mt-0 mb-2 text-center text-black-600'>{`Date : ${todayDate}`}</h1>
            {/* <img src={NccLogo} alt="National Cancer Center"></img> */}
          </div>
            
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
          
        </div>
      </div>
    </>

  )
}

export default PDFReport






























