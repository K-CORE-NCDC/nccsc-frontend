import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import SankeyIndex from '../DataVisualisation/Charts/SankeyIndex';
import ReportSubHeader from './ReportSubHeader';
import { useSelector, useDispatch } from "react-redux";
import Sankey from '../DataVisualisation/Charts/NewSankey'
import NewSankeyd3 from '../DataVisualisation/Charts/NewSankeyd3'
// ../../assets/images/sub/pipeline.png
// import logoNew from "../../../assets/images/Left_up.png";
import NccLogo1 from "../../assets/images/menu-logo-2.png";
import NccLogo2 from "../../assets/images/f_ci6.png";



function PDFReport({ sampleKey, tableData, tableColumnsData, basicInformationData }) {

  let newtableColumnsData = [
    {
      name: 'geneName',
      selector: (row) => { return row.gene },
      sortable: false,
      classNames: ['report_sankey'],
      style: {
        borderLeft: '1px solid #fff',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',
      },
    },

    {
      name: 'Yes',
      selector: row => {
        if (row.dna === 'YES') {
          if (row.gene in reportData['variant_info']) {
            let variants = reportData['variant_info'][row.gene]
            variants = variants.join('-')
            return <div data-bs-toggle="tooltip" title={variants}>{'O ' + "(" + reportData['variant_info'][row.gene].length + ")"}</div>
          } else {
            return row.dna

          }
        }
        else return ''
      },
      sortable: false,
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',
      },

    },
    {
      name: 'No',
      selector: row => { if (row.dna === 'NO') { return 'O ' } else return '' },
      sortable: false,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',
      },
    },
    {
      name: 'High',
      selector: row => { if (row.rna === 'HIGH') { return 'O ' } else return '' },
      sortable: false,
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Intermediate',
      selector: row => { if (row.rna !== 'HIGH' && row.rna !== 'LOW') { return 'O ' } else return '' },
      sortable: false,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Low',
      selector: row => { if (row.rna === 'LOW') { return 'O ' } else return '' },
      sortable: false,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',
      },
    },
    {
      name: 'High',
      selector: row => { if (row.proteome === 'HIGH') { return 'O ' } else return '' },
      sortable: false,
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Intermediate',
      selector: row => { if (row.proteome !== 'HIGH' && row.proteome !== 'LOW') { return 'O ' } else return '' },
      sortable: false,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Low',
      selector: row => { if (row.proteome === 'LOW') { return 'O ' } else return '' },
      sortable: false,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #6F7378',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'block',
        lineHeight: '3.5',
      },
    },
  ]

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
  const [tableRender, setTableRender] = useState(false)
  useEffect(() => {
    if (tableData.length > 0) {
      setTableRender(true)
    }
  }, [tableData])

  useEffect(() => {
    var today = new Date()
    let todaydate = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
    setTodayDate(todaydate)
    console.log("basic Inforamtion", basicInformationData[0]);
    if (basicInformationData && basicInformationData.length > 0) {
      let tmp = []
      for (let i = 0; i < basicInformationData.length; i++) {
        const row = basicInformationData[i];
        for (const key in row) {
          tmp.push(
            <div key={key} className='grid grid-cols-2 '>
              <div className='' style={{ border: '1px solid black' }}>
                <p className='px-6 py-3'>
                  {key}
                </p>
              </div>
              <div style={{ border: '1px solid black' }}>
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

  let ReportHeader = () => {
    return <div>
      <div style={{ marginTop: '150px' }} id='pdfReportHeader'>
        <div style={{ fontSize: "30px", fontWeight: '600', marginBottom: '20px', color: '#0c2f4d' }}>K-CORE</div>
        <div style={{ fontSize: "20px", fontWeight: '600', color: '#0c2f4d' }}>Cancer Omics Research Portal</div>
        <div style={{ width: "95%", height: "8px", backgroundColor: '#0c2f4d', margin: 'auto', marginTop: 'inherit' }}></div>
      </div>
    </div>
  }

  let ReportFooter = () => {
    return <div id='pdfReportFooter'>
      <div
        style={{ display: 'flex', justifyContent: 'end', marginRight: '45px', marginTop: '20px' }}>
        <img src={NccLogo1} style={{ width: '15%', }} alt="ncc logo"></img>
        <img src={NccLogo2} style={{ marginLeft: '20px' }} alt="ncc cancer logo"></img>
      </div>
    </div>
  }

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
    // console.log("detailGeneData", detailGeneData);
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
      let tmpTable = {}
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

        if (element["hugo_symbol"] && element["variant_classification"] && element["dbsnp_rs"] && element["diseasename"]) {
          let kt = element["hugo_symbol"] + "||" + element["variant_classification"] + "||" + element["dbsnp_rs"] + "||" + element["diseasename"]
          if (kt in tmpTable) {
            if (tmpTable[kt].indexOf(element["drugname"]) === -1) {
              tmpTable[kt].push(element["drugname"])
            }
          } else {
            tmpTable[kt] = [element["drugname"]]
          }
        }
        console.log("tmp table ------------ >>>>>>>>>>>>>", tmpTable);

      });


      let sankeyjsondata = {
        "nodes": final_nodes,
        "links": final_links
      }

      return sankeyjsondata;

    }

    let getSankyTable = (detailGeneData) => {
      console.log("Detail", detailGeneData);
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
      console.log("SankeyJsonDataIs is", SankeyJsonDataIs);
      let SankeyTableData = getSankyTable(sankeyData[i]['links'])
      console.log("sankeyjsin data", SankeyTableData);
      sankeyCharts.push(<div key={i} className={`sanky_chart_pdf${i}`}>
        {
          <div>
            <ReportHeader />
            {
              i === 0 &&
              <div>
                <h1 className="" style={{ textAlign: "left", marginLeft: '40px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
                  3. Sankey plot of mutated gene
                </h1>
                <div style={{ width: "95%", height: "6px", backgroundColor: '#0c2f4d', margin: 'auto', marginTop: 'inherit' }}></div>
              </div>

            }


            <h1 className="" style={{ textAlign: "left", marginLeft: '80px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
              Gene : {SankeyJsonDataIs.nodes[0].name}
            </h1>
            <div>
              <Sankey></Sankey>
              <NewSankeyd3 SankeyJson={SankeyJsonDataIs} idName={`chart${i}`}></NewSankeyd3>
              {SankeyTableData}
            </div>
            <ReportFooter />
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
          <div className='Basic_Information_Table'>
            {/* <div>
              <div style={{ width: '880px', height: '12px', background: '#19BDFF', margin: 'auto' }}></div>
              <h1 className='font-medium leading-tight text-5xl text-center text-black-600' style={{ margin: '22px' }}>Drug Prediction Report</h1>
              <h3 style={{ margin: '26px', fontSize: '20px' }} >Sample Name : {sampleKey}</h3>

              <div style={{ width: '880px', height: '12px', background: '#19BDFF', margin: 'auto' }}></div>
            </div> */}

            {/* <h1 className='font-medium leading-tight text-5xl text-center text-black-600' style={{ margin: '95px' }}>{`${todayDate}`}</h1> */}

            {/* <div style={{ width: '200px', margin: 'auto' }}>
              <img src={NccLogo} width="210" style={{ background: '#eae3dd' }} alt="National Cancer Center"></img>
            </div> */}

            <div>
              <ReportHeader />
            </div>
            <div>

              <h1 className="" style={{ textAlign: "left", marginLeft: '169px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
                1. Basic Information
              </h1>

            </div>

            <div className='my-5 ' style={{ width: '80%', border: ' 1px solid black' }}>
              <div className=''>
                {basicHtml}
              </div>
            </div>
          </div>


          <div className='Genomic_Summary_Table'>
            <div className='col-span-3'>
              {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="lg:text-3xl  sm:text-xl font-semibold">
                  Genomic Summary
                </h3>
              </div> */}
              <h1 className="" style={{
                textAlign: "left",
                marginLeft: '169px', fontWeight: '800', marginTop: '20px',
                marginBottom: '20px'
              }}>
                2.Genomic Summary
              </h1>

              <div style={{ width: '80%', border: '1px solid black' }}>
                {tableData && <div className='report_table'>
                  <DataTable
                    columns={newtableColumnsData}
                    data={tableData}
                    subHeader
                    customStyles={customStyles}
                    subHeaderComponent={<ReportSubHeader tData={tableRender} />}
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
          <ReportFooter />
        </div>
        <div>

        </div>
        <div>
          {sankyDataCharts && sankyDataCharts}
        </div>
      </div>
    </>

  )
}

export default PDFReport






























