import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import SankeyIndex from '../DataVisualisation/Charts/SankeyIndex';
import ReportSubHeader from './ReportSubHeader';
import { useSelector, useDispatch } from "react-redux";
import Sankeyd3 from '../../../src/containers/DataVisualisation/Charts/Sankeyd3'
import Sankey from '../../../src/containers/DataVisualisation/Charts/Sankey'
import { getSankeyJson } from '../../actions/api_actions'






function PDFReport({ sampleKey, tableData, tableColumnsData, closeReportFunction, basicInformationData }) {
  const [basicHtml, setBasicHtml] = useState([])
  const reportData = useSelector(state => state.dataVisualizationReducer.rniData)

  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const [gene, setGene] = useState('NRAS')


  var exampleNodes = [
    { "type": "Gene", "id": "g", "parent": null, "name": "Genes" },
    { "type": "Gene", "id": 1, "parent": "g", "number": "101", "name": "PIK3CA" },
    { "type": "Gene", "id": 2, "parent": "g", "number": "120", "name": "TP53" },
    { "type": "Gene", "id": 3, "parent": "g", "number": "140", "name": "KRAS" },
    { "type": "Variant", "id": "v", "parent": null, "number": "v", "name": "Variants" },
    { "type": "Variant", "id": 4, "parent": "v", "number": "210", "name": "rs121913279" },
    { "type": "Variant", "id": 5, "parent": "v", "number": "215", "name": "rs28934578" },
    { "type": "Variant", "id": 6, "parent": "v", "number": "220", "name": "rs786201057" },
    { "type": "Variant", "id": 7, "parent": "v", "number": "230", "name": "rs587782529" },
    { "type": "Variant", "id": 8, "parent": "v", "number": "240", "name": "rs104886003" },
    { "type": "Variant", "id": 9, "parent": "v", "number": "250", "name": "rs17851045" },
    { "type": "Disease", "id": "de", "parent": null, "number": "de", "name": "Diseases" },
    { "type": "Disease", "id": 10, "parent": "de", "number": "310", "name": "Adrenocortical carcinoma" },
    { "type": "Disease", "id": 11, "parent": "de", "number": "810", "name": "Cholangiocarcinoma" },
    { "type": "Drug", "id": "dr", "parent": null, "number": "dr", "name": "Drugs" },
  ]
  var exampleLinks = [
    { "source": 1, "target": 4, "value": 2 },
    { "source": 2, "target": 5, "value": 2 },
    { "source": 2, "target": 6, "value": 2 },
    { "source": 2, "target": 7, "value": 2 },
    { "source": 1, "target": 8, "value": 2 },
    { "source": 3, "target": 9, "value": 2 },
    { "source": 4, "target": 10, "value": 2 },
    { "source": 5, "target": 10, "value": 2 },
    { "source": 6, "target": 10, "value": 2 },
    { "source": 7, "target": 10, "value": 2 },
    { "source": 8, "target": 11, "value": 2 },
    { "source": 9, "target": 11, "value": 2 },
  ]

  // useEffect(() => {
  //   if (initalProps && 'data' in initalProps) {

  //     let d = initalProps
  //     let variants = reportData.variant_info

  //     let gene = 'NRAS'
  //     let inputData = {
  //       'gene': gene,
  //       'mutation': variants[gene]
  //     }

  //     // console.log("report data",reportData);
  //     // console.log("Props",d);
  //     // console.log("Variants",variants);
  //     // console.log("Gene",gene);
  //     setGene(gene)
  //     setNodes([])
  //     setLinks([])
  //     setRender(true)
  //     dispatch(getSankeyJson('POST', inputData))
  //   }
  // }, [initalProps])

  // useEffect(() => {
  //   if (d) {
  //     setInitialProps(d)
  //   }
  // }, [])


  useEffect(() => {
    if (reportData) {
      // let x = document.getElementById('sanky_chart_pdf1').offsetWidth
      let n = reportData.response_sanky_data[0]['gene_data']['nodes']
      let l = reportData.response_sanky_data[0]['gene_data']['links']
      setNodes(exampleNodes)
      setLinks(exampleLinks)
    }
  }, [reportData])



  // Sankey index








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
          <div className='rounded-lg border border-gray-200 my-5'>
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="lg:text-3xl sm:text-xl font-semibold">
                Basic Information
              </h3>
            </div>

            <div className=''>
              {basicHtml}
            </div>
          </div>


          <div className=''>
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

        {

          <div id="sanky_chart_pdf1">
            {gene && nodes.length > 0 && links.length > 0 &&
              <>
                <Sankeyd3></Sankeyd3>
                <Sankey gene='NRAS' width='1000' exampleNodes={nodes} exampleLinks={links}></Sankey>
                <p>Double Click To Expand</p>
              </>
            }
          </div>

        }



      </div>
      {

        <div id="sanky_chart_pdf2">
          {gene && nodes.length > 0 && links.length > 0 &&
            <>
              <Sankeyd3></Sankeyd3>
              <Sankey gene='NRAS' width='1000' exampleNodes={nodes} exampleLinks={links}></Sankey>
              <p>Double Click To Expand</p>
            </>
          }
        </div>

      }

    </>

  )
}

export default PDFReport






























