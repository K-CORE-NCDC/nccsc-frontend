import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import SankeyIndex from '../DataVisualisation/Charts/SankeyIndex';
import ReportSubHeader from './ReportSubHeader';
import { useSelector, useDispatch } from "react-redux";
import Sankeyd3 from '../../../src/containers/DataVisualisation/Charts/Sankeyd3'
import Sankey from '../../../src/containers/DataVisualisation/Charts/Sankey'


function PDFReport({ sampleKey, tableData, tableColumnsData, basicInformationData }) {
  const [basicHtml, setBasicHtml] = useState([])
  const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
  const [gene, setGene] = useState('NRAS')
  const [sankeyData, setSankeyData] = useState([])
  const [sankyGeneList, setSankyGeneList] = useState([])
  const [sankyTableData, setSankyTableData] = useState([])
  const [sankyDataCharts, setSankyDataCharts] = useState([])


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
        console.log("inside pdf report", reportData['response_sanky_data'][i]['links']);
        if (reportData['response_sanky_data'][i]['links'].length <= 0 || reportData['response_sanky_data'][i]['nodes'].length <= 0) {
          continue
        }
        listofSankey.push({ 'gene_name': i, 'nodes': reportData['response_sanky_data'][i]['nodes'], 'links': reportData['response_sanky_data'][i]['links'] })
        GeneListSanky.push(i)
      }
      setSankeyData(listofSankey)
      setSankyGeneList(GeneListSanky)
      let sankyTableData_is = {}

      for (let i = 0; i < GeneListSanky.length; i++) {
        let GeneData= {
          'Gene': reportData['detail_gene_data'][ GeneListSanky[i]]["gene_name"],
            'Variant': reportData['detail_gene_data'][ GeneListSanky[i]]["Variant"].filter(Boolean).toString(),
              'Rsid': reportData['detail_gene_data'][ GeneListSanky[i]]["Rsid"].filter(Boolean).toString(),
                'Disease': reportData['detail_gene_data'][ GeneListSanky[i]]["Disease"].filter(Boolean).toString(),
                  'Drug': reportData['detail_gene_data'][ GeneListSanky[i]]["Drug"].filter(Boolean).toString()
        }
        sankyTableData_is[GeneListSanky[i]]= GeneData
      }
      setSankyTableData(sankyTableData_is)


      // sankyTableData_is = {
      //   'Gene': reportData['detail_gene_data'][gene]["gene_name"],
      //   'Variant': reportData['detail_gene_data'][gene]["Variant"].filter(Boolean).toString(),
      //   'Rsid': reportData['detail_gene_data'][gene]["Rsid"].filter(Boolean).toString(),
      //   'Disease': reportData['detail_gene_data'][gene]["Disease"].filter(Boolean).toString(),
      //   'Drug': reportData['detail_gene_data'][gene]["Drug"].filter(Boolean).toString()

      // }
      // setSankyTableData(sankyTableData_is)

    }
  }, [reportData])

  useEffect(() => {
    console.log("sddsdssdsd", sankeyData);
    const sankeyCharts = []
    for (let i = 0; i < sankeyData.length; i++) {

      sankeyCharts.push(<div key={i} className={`sanky_chart_pdf${i}`}>
        {
          <>
            <Sankeyd3></Sankeyd3>
            <Sankey gene={sankeyData[i]['gene_name']} width='900' exampleNodes={sankeyData[i]['nodes']} exampleLinks={sankeyData[i]['links']}></Sankey>
            <p>Double Click To Expand</p>

            <div>
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
            </div>
          </>
        }
      </div>
      )
    }
    console.log(sankeyCharts)
    setSankyDataCharts(sankeyCharts)
  }, [sankeyData])

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
        <div >
          {sankyDataCharts}
        </div>
      </div>
      {

        // sankeyData 
        // <div className="sanky_chart_pdf2">
        //   {gene && nodes.length > 0 && links.length > 0 &&
        //     <>
        //       <Sankeyd3></Sankeyd3>
        //       <Sankey gene='NRAS' width='1000' exampleNodes={nodes} exampleLinks={links}></Sankey>
        //       <p>Double Click To Expand</p>
        //     </>
        //   }
        // </div>

      }
      {/* <div>

        <Sankeyd3></Sankeyd3>

        <Sankey gene='TP53' width='900' exampleNodes={exampleNodes} exampleLinks={exampleLinks}></Sankey>
      </div> */}

      {
        //  sankeyData.map((number) => {

        //   <div className="">
        //     <p>"hello"</p>
        //     {/* {number['gene_name'] && number['nodes'].length > 0 && number['links'].length > 0 &&
        //       <>
        //         <Sankeyd3></Sankeyd3>
        //         <Sankey gene={number['gene_name']} width='900' exampleNodes={number['nodes']} exampleLinks={number['links']}></Sankey>
        //         <p>Double Click To Expand</p>
        //       </>
        //     } */}
        //   </div>
        // })



      }


    </>

  )
}

export default PDFReport






























