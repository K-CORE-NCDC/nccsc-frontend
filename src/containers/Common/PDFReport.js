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
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


function PDFReport({ sampleKey, tableData, tableColumnsData, basicInformationData }) {

  const [basicHtml, setBasicHtml] = useState([])
  const [header, setHeader] = useState('')
  const [footer, setFooter] = useState('')
  const [tableRender, setTableRender] = useState(false)
  const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
  
  useEffect(() => {
    if (tableData.length > 0) {
      setTableRender(true)
    }
  }, [tableData])
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
  async function headerFunc(){
    if(document.getElementById('pdfReportHeader')){
      let e = document.getElementById('pdfReportHeader')
      return await html2canvas( e, { useCORS: true } )
      .then((canvas) => {
        setHeader(canvas.toDataURL('image/jpeg'))
        return
      })
    }
  }
  async function footerFunc(){
    if(document.getElementById('pdfReportFooter')){
      let e = document.getElementById('pdfReportFooter')
      return await html2canvas( e, { useCORS: true } )
      .then((canvas) => {
        setFooter(canvas.toDataURL('image/jpeg'))
        return
      })
    }
  }
  useEffect(()=>{
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
      headerFunc()
      footerFunc()
    }
  },[basicInformationData])


  let ReportHeader = () => {
    return <div>
      <div style={{ marginTop: '50px',width:'80%' }} id='pdfReportHeader'>
        <div style={{ fontSize: "30px", fontWeight: '600',paddingTop: '20px', marginBottom: '20px', color: '#0c2f4d' }}>K-CORE</div>
        <div style={{ fontSize: "20px", fontWeight: '600', color: '#0c2f4d' }}>Cancer Omics Research Portal</div>
        <div style={{ width: "95%", height: "8px", backgroundColor: '#0c2f4d', margin: 'auto', marginTop: 'inherit' }}></div>
      </div>
    </div>
  }

  let ReportFooter = () => {
    return <div id='pdfReportFooter' style={{width:"500px"}}>
      <div
        style={{ display: 'flex ', justifyContent: 'end', marginRight: '45px', marginTop: '20px' }}>
        <img src={NccLogo1} style={{ width: '40%', }} alt="ncc logo"></img>
        <img src={NccLogo2} style={{ marginLeft: '20px' }} alt="ncc cancer logo"></img>
      </div>
    </div>
  }
  const downloadPDF = async () => {
    let className = `printpdf`, count = 0
    while (document.querySelector(`.${className}`) !== null) {
        className = `sanky_chart_pdf${count}`
        count++;
    }
    console.log("out of while loop", count);
    const captureElement1 = document.querySelector('.printpdf')
    const pdf = new jsPDF('p', 'px', 'a4', true);
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    pdf.page = 1
    
    await html2canvas(captureElement1).then(canvas => {
      
      const imgData = canvas.toDataURL('image/jpg');
      var imgWidth = 500; 
      var pageHeight = 450; 
      var imgHeight = canvas.height * (imgWidth / canvas.width);
      console.log(imgHeight)
      var heightLeft = imgHeight;
      var position = 70; 
      // pdf.addPage();
      if(header !== ''){
        pdf.addImage(header,'JPEG', 10, 10, width-20, 0,"alias1",'SLOW')
      }
      pdf.addImage(imgData, 'jpg', 10, position, imgWidth, imgHeight,"alias2",'SLOW');
      // pdf.text(150,285, 'page ' + pdf.page);
      if(footer !== ''){
        pdf.addImage(footer,'JPEG', 10, 385, 400, 0,'alias3','SLOW')
      }
      // footer()
      heightLeft -= pageHeight;
      let z = 4
      while (heightLeft >= 0) {
          position = heightLeft - imgHeight; // top padding for other pages
          console.log(position)
          pdf.addPage();
          if(header !== ''){
            pdf.addImage(header,'JPEG', 10, 10, width-20, 0,"aliash"+z,"SLOW")
          }
          pdf.addImage(imgData, 'jpg', 10, position, imgWidth, imgHeight,"aliasm"+z,'SLOW');
          // footer()
          pdf.text(150,285, 'page ' + pdf.page);
          // if(footer !== ''){
          //   pdf.addImage(footer,'JPEG', 10, height, imgHeight+20, 0,'aliasf'+z,'SLOW')
          // }
          heightLeft -= pageHeight;
          z++
      }
    })
    window.open(pdf.output('bloburl'), '_blank');
    // console.log(header)
  }
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
  return (
    <>
      <div>
        <button onClick={(e)=>downloadPDF()}>Download</button>
        <div>
          <ReportHeader />
        </div>
        <div>
          <ReportFooter />

        </div>
      </div>
      
      <div className='printpdf' id='printpdf'>
        <div className='Basic_Information_Table'>
          <div>
            <h1 className="" style={{ textAlign: "left", marginLeft: '35px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
              1. Basic Information
            </h1>
          </div>
          <div className='my-5 ' style={{ width: '80%', border: '1px solid black',marginLeft:'35px' }}>
            <div className=''>
              {basicHtml}
            </div>
          </div>
        </div>
        <div className='Genomic_Summary_Table'>
            <div className='col-span-3'>
              <h1 className="" style={{
                textAlign: "left",
                marginLeft: '35px', fontWeight: '800', marginTop: '20px',
                marginBottom: '20px'
              }}>
                2.Genomic Summary
              </h1>

              <div style={{ width: '80%', border: '1px solid black',marginLeft:'35px' }}>
                {tableData && <div className='report_table'>
                  <DataTable
                    columns={tableColumnsData}
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
      </div>
    </>

  )
}

export default PDFReport


// import React, { useState, useEffect } from 'react'
// import DataTable from 'react-data-table-component';
// import SankeyIndex from '../DataVisualisation/Charts/SankeyIndex';
// import ReportSubHeader from './ReportSubHeader';
// import { useSelector, useDispatch } from "react-redux";
// import Sankey from '../DataVisualisation/Charts/NewSankey'
// import NewSankeyd3 from '../DataVisualisation/Charts/NewSankeyd3'
// // ../../assets/images/sub/pipeline.png
// // import logoNew from "../../../assets/images/Left_up.png";
// import NccLogo1 from "../../assets/images/menu-logo-2.png";
// import NccLogo2 from "../../assets/images/f_ci6.png";
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

// function PDFReport({ sampleKey, tableData, tableColumnsData, basicInformationData }) {

//   let newtableColumnsData = [
//     {
//       name: 'geneName',
//       selector: (row) => { return row.gene },
//       sortable: false,
//       classNames: ['report_sankey'],
//       style: {
//         borderLeft: '1px solid #fff',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',
//       },
//     },

//     {
//       name: 'Yes',
//       selector: row => {
//         if (row.dna === 'YES') {
//           if (row.gene in reportData['variant_info']) {
//             let variants = reportData['variant_info'][row.gene]
//             variants = variants.join('-')
//             return <div data-bs-toggle="tooltip" title={variants}>{'O ' + "(" + reportData['variant_info'][row.gene].length + ")"}</div>
//           } else {
//             return row.dna

//           }
//         }
//         else return ''
//       },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #6F7378',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',
//       },

//     },
//     {
//       name: 'No',
//       selector: row => { if (row.dna === 'NO') { return 'O ' } else return '' },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #ABB0B8',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',
//       },
//     },
//     {
//       name: 'High',
//       selector: row => { if (row.rna === 'HIGH') { return 'O ' } else return '' },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #6F7378',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',

//       },
//     },
//     {
//       name: 'Intermediate',
//       selector: row => { if (row.rna !== 'HIGH' && row.rna !== 'LOW') { return 'O ' } else return '' },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #ABB0B8',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',

//       },
//     },
//     {
//       name: 'Low',
//       selector: row => { if (row.rna === 'LOW') { return 'O ' } else return '' },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #ABB0B8',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',
//       },
//     },
//     {
//       name: 'High',
//       selector: row => { if (row.proteome === 'HIGH') { return 'O ' } else return '' },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #6F7378',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',

//       },
//     },
//     {
//       name: 'Intermediate',
//       selector: row => { if (row.proteome !== 'HIGH' && row.proteome !== 'LOW') { return 'O ' } else return '' },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #ABB0B8',
//         borderRight: '1px solid #fff',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',

//       },
//     },
//     {
//       name: 'Low',
//       selector: row => { if (row.proteome === 'LOW') { return 'O ' } else return '' },
//       sortable: false,
//       style: {
//         borderLeft: '1px solid #ABB0B8',
//         borderRight: '1px solid #6F7378',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//         display: 'block',
//         lineHeight: '3.5',
//       },
//     },
//   ]

//   const [basicHtml, setBasicHtml] = useState([])
//   const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
//   const sankeyJson = useSelector(state => state.dataVisualizationReducer.SankeyJson)
//   const [gene, setGene] = useState('NRAS')
//   const [sankeyData, setSankeyData] = useState([])
//   const [sankyGeneList, setSankyGeneList] = useState([])
//   const [sankyTableData, setSankyTableData] = useState([])
//   const [sankyDataCharts, setSankyDataCharts] = useState([])
//   const [detailGeneData, setDetailGeneData] = useState([])
//   const [listOfNodes, setListOfNodes] = useState([])
//   const [listOfLinks, setListOfLinks] = useState([])
//   const [SankeyJsonData, setSankeyJsonData] = useState()
//   const [sankyTableData2, setSankyTableData2] = useState('')
//   const [todayDate, setTodayDate] = useState('')
//   const [tableRender, setTableRender] = useState(false)
//   const [header, setHeader] = useState('')
//   useEffect(() => {
//     if (tableData.length > 0) {
//       setTableRender(true)
//     }
//   }, [tableData])

//   useEffect(() => {
//     var today = new Date()
//     let todaydate = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
//     setTodayDate(todaydate)
    
//     if (basicInformationData && basicInformationData.length > 0) {
//       let tmp = []
//       for (let i = 0; i < basicInformationData.length; i++) {
//         const row = basicInformationData[i];
//         for (const key in row) {
//           tmp.push(
//             <div key={key} className='grid grid-cols-2 '>
//               <div className='' style={{ border: '1px solid black' }}>
//                 <p className='px-6 py-3'>
//                   {key}
//                 </p>
//               </div>
//               <div style={{ border: '1px solid black' }}>
//                 <p className='px-6 py-3'>
//                   {row[key]}
//                 </p>
//               </div>
//             </div>
//           )
//         }
//       }
//       setBasicHtml(tmp)
//       headerFunc()
//     }
//   }, [basicInformationData])

//   let ReportHeader = () => {
//     return <div>
//       <div style={{ marginTop: '50px',width:'80%' }} id='pdfReportHeader'>
//         <div style={{ fontSize: "30px", fontWeight: '600',paddingTop: '20px', marginBottom: '20px', color: '#0c2f4d' }}>K-CORE</div>
//         <div style={{ fontSize: "20px", fontWeight: '600', color: '#0c2f4d' }}>Cancer Omics Research Portal</div>
//         <div style={{ width: "95%", height: "8px", backgroundColor: '#0c2f4d', margin: 'auto', marginTop: 'inherit' }}></div>
//       </div>
//     </div>
//   }

//   let ReportFooter = () => {
//     return <div id='pdfReportFooter'>
//       <div
//         style={{ display: 'flex ', justifyContent: 'end', marginRight: '45px', marginTop: '20px' }}>
//         <img src={NccLogo1} style={{ width: '25%', }} alt="ncc logo"></img>
//         <img src={NccLogo2} style={{ marginLeft: '20px' }} alt="ncc cancer logo"></img>
//       </div>
//     </div>
//   }

//   useEffect(() => {
//     if (reportData) {
      
//       setGene(gene)
//       let listofSankey = []
//       let GeneListSanky = []

//       for (let i in reportData['response_sanky_data']) {
//         if (reportData['response_sanky_data'][i]['gene_data'].length <= 0) {
//           continue
//         }
//         listofSankey.push({ 'gene_name': i, 'links': reportData['response_sanky_data'][i]['gene_data'] })
//         GeneListSanky.push(i)
//       }
//       setSankeyData(listofSankey)
//       setSankyGeneList(GeneListSanky)

//     }
//   }, [reportData])

//   useEffect(() => {
    
//     if (detailGeneData.length > 0) {
//       let tableHTML = <table className="min-w-full border text-center">
//         <thead className="border-b">
//           <tr>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               gene
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Variant
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Rsid
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Disease
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
//               Drug
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {detailGeneData.map((genedata, index) => (

//             <tr key={index} className="border-b">

//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['hugo_symbol']}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['variant_classification']}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['dbsnp_rs']}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['diseasename']}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{genedata['drugname']}</td>
//             </tr>
//           ))}
//         </tbody>

//       </table>
//       setSankyTableData(tableHTML)
//     }
//     else {
//       let tableHTML = <table className="min-w-full border text-center">
//         <thead className="border-b">
//           <tr>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               gene
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Variant
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Rsid
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Disease
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
//               Drug
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="border-b">
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{gene}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{sankyTableData2}</td>
//           </tr>
//         </tbody>

//       </table>
//       setSankyTableData(tableHTML)
//     }

//   }, [detailGeneData])

//   const getSankyData = (sankeyJson) => {

//     let nodes = {};
//     let node_type = {};
//     let i = 1;
//     sankeyJson.forEach((element) => {
//       for (const key in element) {
//         if (key !== "sourceurl") {
//           if (!nodes.hasOwnProperty(element[key]) && element[key]) {
//             nodes[element[key]] = i;
//             node_type[i] = key;
//             i = i + 1;
//           }
//         }
//       }
//     });

//     let final_nodes = [];
//     for (const key in nodes) {
//       final_nodes.push({ name: key, type: node_type[nodes[key]] });
//     }
//     let fn = {};
//     let final_links = [];
//     let tmpTable = {}
//     sankeyJson.forEach((element) => {
//       if (element["hugo_symbol"] && element["variant_classification"]) {
//         let k =
//           nodes[element["hugo_symbol"]] +
//           "_" +
//           nodes[element["variant_classification"]];
//         if (!(k in fn)) {
//           fn[k] = "";
//           final_links.push({
//             source: element["hugo_symbol"],
//             target: element["variant_classification"],
//             value: 10,
//           });
//         }
//       }
//       if (element["variant_classification"] && element["dbsnp_rs"]) {
//         let k =
//           nodes[element["variant_classification"]] +
//           "_" +
//           nodes[element["dbsnp_rs"]];
//         if (!(k in fn)) {
//           fn[k] = "";
//           final_links.push({
//             source: element["variant_classification"],
//             target: element["dbsnp_rs"],
//             value: 10,
//           });
//         }
//       }
//       if (element["dbsnp_rs"] && element["diseasename"]) {
//         let k =
//           nodes[element["dbsnp_rs"]] + "_" + nodes[element["diseasename"]];
//         if (!(k in fn)) {
//           fn[k] = "";
//           final_links.push({
//             source: element["dbsnp_rs"],
//             target: element["diseasename"],
//             value: 10,
//           });
//         }
//       }
//       if (element["diseasename"] && element["drugname"]) {
//         let k =
//           nodes[element["diseasename"]] + "_" + nodes[element["drugname"]];
//         if (!(k in fn)) {
//           fn[k] = "";
//           final_links.push({
//             source: element["diseasename"],
//             target: element["drugname"],
//             value: 10,
//           });
//         }
//       }

//       if (element["hugo_symbol"] && element["variant_classification"] && element["dbsnp_rs"] && element["diseasename"]) {
//         let kt = element["hugo_symbol"] + "||" + element["variant_classification"] + "||" + element["dbsnp_rs"] + "||" + element["diseasename"]
//         if (kt in tmpTable) {
//           if (tmpTable[kt].indexOf(element["drugname"]) === -1) {
//             tmpTable[kt].push(element["drugname"])
//           }
//         } else {
//           tmpTable[kt] = [element["drugname"]]
//         }
//       }
      

//     });


//     let sankeyjsondata = {
//       "nodes": final_nodes,
//       "links": final_links
//     }

//     return sankeyjsondata;

//   }

//   const getSankyTable = (detailGeneData) => {
//     let tableHTML= []
//     const dTable = []
//     if (detailGeneData.length > 0) {
//       // detailGeneData
//       let tmpTable = {}
//       detailGeneData.map((genedata, index) => {
//         if (genedata["hugo_symbol"] && genedata["variant_classification"] && genedata["dbsnp_rs"] && genedata["diseasename"] ){
//           let kt = genedata["hugo_symbol"]+"||"+genedata["variant_classification"]+"||"+genedata["dbsnp_rs"]+"||"+genedata["diseasename"]
//           if(kt in tmpTable){
//             if (tmpTable[kt].indexOf(genedata["drugname"]) === -1){
//               tmpTable[kt].push(genedata["drugname"])
//             }
//           }else{
//             tmpTable[kt] = [genedata["drugname"]]
//           }
//         }
//       })

      
//       for (const key in tmpTable) {
//         let r = key.split("||")
//         let drugs = tmpTable[key]
//         dTable.push({
//           "hugo_symbol":r[0],
//           "variant_classification":r[1],
//           "dbsnp_rs":r[2],
//           "diseasename":r[3],
//           "drugname": drugs.join(",")
//         })
//       }
//       let trRows = []
      
//       for (let index = 0; index < dTable.length; index++) {
//         const element = dTable[index];
//         trRows.push(
//           <tr key={'row'+index} className="border-b">
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{element['hugo_symbol']}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{element['variant_classification']}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{element['dbsnp_rs']}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{element['diseasename']}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{element['drugname']}</td>
//           </tr>
//         )
//       }
//       tableHTML.push(<table className="min-w-full border text-center">
//         <thead className="border-b">
//           <tr>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               gene
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Variant
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Rsid
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Disease
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
//               Drug
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {trRows}
//         </tbody>

//       </table>)
      
//     }
//     else {
//       tableHTML.push(<table className="min-w-full border text-center">
//         <thead className="border-b">
//           <tr>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               gene
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Variant
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Rsid
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
//               Disease
//             </th>
//             <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
//               Drug
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="border-b">
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{gene}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{sankyTableData2}</td>
//           </tr>
//         </tbody>
//       </table>)
      
//     }
//     return tableHTML
//   }
//   useEffect(() => {
    
//     // const sankeyCharts = []
//     // for (let i = 0; i < sankeyData.length; i++) {
//     //   let SankeyJsonDataIs = getSankyData(sankeyData[i]['links'])
//     //   let SankeyTableData = getSankyTable(sankeyData[i]['links'])
//     //   sankeyCharts.push(<div key={i} className={`sanky_chart_pdf${i}`}>
//     //     {
//     //       <div>
//     //         <ReportHeader />
//     //         {
//     //           i === 0 &&
//     //           <div>
//     //             <h1 className="" style={{ textAlign: "left", marginLeft: '40px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
//     //               3. Sankey plot of mutated gene
//     //             </h1>
//     //             <div style={{ width: "95%", height: "6px", backgroundColor: '#0c2f4d', margin: 'auto', marginTop: 'inherit' }}></div>
//     //           </div>
//     //         }
//     //         <h1 className="" style={{ textAlign: "left", marginLeft: '80px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
//     //           Gene : {SankeyJsonDataIs.nodes[0].name}
//     //         </h1>
//     //         <div>
//     //           <Sankey></Sankey>
//     //           <NewSankeyd3 SankeyJson={SankeyJsonDataIs} idName={`chart${i}`}></NewSankeyd3>
//     //           {SankeyTableData}
//     //         </div>
//     //         <ReportFooter />
//     //       </div>
//     //     }
//     //   </div>
//     //   )
//     // }
//     // setSankyDataCharts(sankeyCharts)
//   }, [sankeyData])


//   const customStyles = {
//     headCells: {
//       classNames: ['report_sankey'],
//       style: {
//         'textAlign': 'center',
//         'display': 'block',
//       }
//     },
//     expanderCell: {
//       style: {
//         'minWidth': '5%',
//         'display': 'block',
//       }
//     }
//   }

//   const rowPreDisabled = (row) => {
//     let variant = reportData.variant_info
//     let gene = row.gene
//     if (gene in variant) {
//       // return row
//     } else {
//       return row
//     }
//   }

//   const rowExpandFunc = (expanded, row) => {


//   }
//   const expandableRowExpanded = (row) => {
//     // console.log(row)
//   }
//   async function headerFunc(){
//     let e = document.getElementById('pdfReportHeader')
//     return await html2canvas( e, { useCORS: true } )
//     .then((canvas) => {
//       setHeader(canvas.toDataURL('image/jpeg'))
//       return
//     })
//   }

//   const downloadPDF = async () => {

    
//     let className = `printpdf`, count = 0
//     while (document.querySelector(`.${className}`) !== null) {
//         className = `sanky_chart_pdf${count}`
//         count++;
//     }
//     console.log("out of while loop", count);
//     const captureElement1 = document.querySelector('.printpdf')
//     const pdf = new jsPDF('p', 'px', 'a4', true);
//     var width = pdf.internal.pageSize.getWidth();
//     var height = pdf.internal.pageSize.getHeight();
//     // pdf.page = 1
//     // console.log(width,height)
//     // await html2canvas(captureElement1).then(canvas => {
      
//     //   const imgData = canvas.toDataURL('image/jpeg');
//     //   var imgWidth = 500; 
//     //   var pageHeight = 295; 
//     //   var imgHeight = canvas.height * imgWidth / canvas.width;
//     //   console.log(imgHeight)
//     //   var heightLeft = imgHeight;
//     //   var position = 70; 
//     //   // pdf.addPage();
//     //   if(header !== ''){
//     //     pdf.addImage(header,'JPEG', 10, 10, width-20, 0)
//     //   }
//     //   pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight,undefined,'FAST');
//     //   // footer()
//     //   heightLeft -= pageHeight;
//     //   while (heightLeft >= 0) {
//     //       position += heightLeft - imgHeight; // top padding for other pages
//     //       console.log(position)
//     //       pdf.addPage();
//     //       if(header !== ''){
//     //         pdf.addImage(header,'JPEG', 10, 10, width-20, 0)
//     //       }
//     //       pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight,undefined,'FAST');
//     //       // footer()
//     //       heightLeft -= pageHeight;
//     //   }
//     // })
//     // window.open(pdf.output('bloburl'), '_blank');
//     // console.log(header)
    
    
//   }


//   return (
//     <>
//       <div>
//         <button onClick={(e)=>downloadPDF()}>Download</button>
//         <div>
//           <ReportHeader />
//         </div>
//         <div>
//           <ReportFooter />

//         </div>
//         <div className='printpdf' id='printpdf'>
          
//           <div className='Basic_Information_Table'>
//             <div>
//               <h1 className="" style={{ textAlign: "left", marginLeft: '35px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
//                 1. Basic Information
//               </h1>
//             </div>
//             <div className='my-5 ' style={{ width: '350px', border: '1px solid black',marginLeft:'35px' }}>
//               <div className=''>
//                 {basicHtml}
//               </div>
//             </div>
//           </div>


//           <div className='Genomic_Summary_Table'>
//             <div className='col-span-3'>
//               <h1 className="" style={{
//                 textAlign: "left",
//                 marginLeft: '35px', fontWeight: '800', marginTop: '20px',
//                 marginBottom: '20px'
//               }}>
//                 2.Genomic Summary
//               </h1>

//               <div style={{ width: '80%', border: '1px solid black',marginLeft:'35px' }}>
//                 {tableData && <div className='report_table'>
//                   <DataTable
//                     columns={newtableColumnsData}
//                     data={tableData}
//                     subHeader
//                     customStyles={customStyles}
//                     subHeaderComponent={<ReportSubHeader tData={tableRender} />}
//                     expandableRows
//                     expandableRowDisabled={rowPreDisabled}
//                     expandableRowsComponent={SankeyIndex}
//                     expandableRowExpanded={expandableRowExpanded}
//                     onRowExpandToggled={rowExpandFunc}
//                     subHeaderWrap
//                   />
//                 </div>}
//               </div>
//             </div>
//           </div>
          
//         </div>
//         <div>

//         </div>
//         <div>
//           {sankyDataCharts && sankyDataCharts}
//         </div>
//       </div>
//     </>

//   )
// }

// export default PDFReport