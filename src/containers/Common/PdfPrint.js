import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom';
import { logManagement, sankeyImageData,sendReportData,clearPdfLink} from '../../actions/api_actions'
import Sankey from '../DataVisualisation/Charts/NewSankey'
import NewSankeyd3 from '../DataVisualisation/Charts/NewSankeyd3'
import html2canvas from 'html2canvas';
import { useSelector, useDispatch } from "react-redux";
import config from '../../config';
function PdfPrint({ isReportClicked }) {
    const dispatch = useDispatch()
    const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
    const GeneMutationData = useSelector((data) => data.dataVisualizationReducer.rniData);
    const PDF_Report_Status = useSelector((data) => data.dataVisualizationReducer.PDF_Report);
    // const sankeyJson = useSelector(state => state.dataVisualizationReducer.SankeyJson)
    // const [basicHtml, setBasicHtml] = useState([])
    // const [gene, setGene] = useState('NRAS')
    // const [sankeyData, setSankeyData] = useState([])
    // const [sankyGeneList, setSankyGeneList] = useState([])
    // const [sankyDataCharts, setSankyDataCharts] = useState([])
  
  
    // useEffect(() => {
    //     if (reportData) {
            
    //     setGene(gene)
    //     let listofSankey = []
    //     let GeneListSanky = []
  
    //     for (let i in reportData['response_sanky_data']) {
    //       if (reportData['response_sanky_data'][i]['gene_data'].length <= 0) {
    //         continue
    //       }
    //       listofSankey.push({ 'gene_name': i, 'links': reportData['response_sanky_data'][i]['gene_data'] })
    //       GeneListSanky.push(i)
    //     }
    //     setSankeyData(listofSankey)
    //     setSankyGeneList(GeneListSanky)  
    //   }
    // }, [reportData,isReportClicked])
    
    // useEffect(() => {
    //     const sankeyCharts = []
    //     for (let i = 0; i < sankeyData.length; i++) {
    //       let SankeyJsonDataIs = getSankyData(sankeyData[i]['links'])
    //       sankeyCharts.push(<div key={i} className={`sanky_chart_pdf${i}`}>
    //         {
    //           <div>
    //             <h1 className="" style={{ textAlign: "left", marginLeft: '80px', fontWeight: '800', marginTop: '20px', marginBottom: '20px' }}>
    //               Gene : {SankeyJsonDataIs.nodes[0].name}
    //             </h1>
    //             <div>
    //               <Sankey></Sankey>
    //               <NewSankeyd3 SankeyJson={SankeyJsonDataIs} idName={`chart${i}`} forGene = {SankeyJsonDataIs.nodes[0].name}></NewSankeyd3>
    //             </div>
    //           </div>
    //         }
    //       </div>
    //       )
    //     }
    //     setSankyDataCharts(sankeyCharts)
    //   }, [sankeyData,isReportClicked])
     // const getSankyData = (sankeyJson) => {
  
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
    // }

      useEffect(() => {
        let className = `.printpdf`, count = 0
        if (isReportClicked === true) {
            className = `sanky_chart_pdf${count}`
            while (document.querySelector(`.${className}`) !== null) {
                className = `sanky_chart_pdf${count}`
                const abcd = document.querySelector(`.${className}`)
                count++;
            }
            DownloadPDF(count)
        }
    }, [isReportClicked])
  
    
   
    let DownloadPDF = async () => {
        let GeneListSanky = []
        for (let i in reportData['response_sanky_data']) {
            if (reportData['response_sanky_data'][i]['gene_data'].length <= 0) {
              continue
            }
            GeneListSanky.push(i)
          }
        let GeneandMutationList = {}
        let className = `printpdf`, count = 0
        while (document.querySelector(`.${className}`) !== null) {
            className = `sanky_chart_pdf${count}`
            count++;
        }        
        if(GeneListSanky.length > 0){
            if(GeneMutationData && "variant_info" in GeneMutationData  ){
              for(let i=0; i<GeneListSanky.length; i++){
                GeneandMutationList[GeneListSanky[i]] = GeneMutationData["variant_info"][GeneListSanky[i]]
              }
            }
          }

        for (let i = 0; i < count - 1; i++) {
            // let element = document.querySelector(`.sanky_chart_pdf${i}`)
            let element = document.querySelector(`#chart${i}`)
            // await html2canvas(element).then(canvas => {
            //     const imgData = canvas.toDataURL('image/jpeg',1.0);
                
            //     // dispatch(sankeyImageData({'filename':element.getAttribute('name'), 'imgdata':imgData}))
            // });
        }
        setTimeout(()=>{
            dispatch(sendReportData("POST",{"GeneandMutationList":GeneandMutationList,'BasicInformation':reportData.basic_information[0],'rows':reportData.genomic_summary}))
        },1000)
    }

useEffect(()=>{
  if(PDF_Report_Status && 'res' in PDF_Report_Status){
    let link = PDF_Report_Status['res']
    let navlink = config.auth+link
    dispatch(clearPdfLink())
    window.location.href = navlink;
  }
},[PDF_Report_Status])
    return (
        <div>
            {/* <a className='hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-NccBlue-700' rel='noreferrer' target="_blank" href='http://3.137.187.168:8009/media/sohel.pdf'>
                Download Report
            </a> */}
            <button
                className='hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-NccBlue-700'
                // onClick={(e)=>printpdf(e)}
                onClick={(e) => DownloadPDF(e)}
            >
                Download Report
            </button>
        </div>
    )
          }

export default PdfPrint