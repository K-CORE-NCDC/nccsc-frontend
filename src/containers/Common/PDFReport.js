
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

function PDFReport() {


  const [basicHtml, setBasicHtml] = useState([])
  const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
  const sankeyJson = useSelector(state => state.dataVisualizationReducer.SankeyJson)
  const [gene, setGene] = useState('NRAS')
  const [sankeyData, setSankeyData] = useState([])
  const [sankyGeneList, setSankyGeneList] = useState([])
  const [sankyDataCharts, setSankyDataCharts] = useState([])
  const GeneMutationData = useSelector((data) => data.dataVisualizationReducer.rniData);


  useEffect(() => {
    if (reportData) {
      
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

    }
  }, [reportData])

    useEffect(() => {
    
    const sankeyCharts = []
    for (let i = 0; i < sankeyData.length; i++) {
      let SankeyJsonDataIs = getSankyData(sankeyData[i]['links'])
      sankeyCharts.push(<div key={i} className={`sanky_chart_pdf${i}`}>
        {
          <div>
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
              <NewSankeyd3 SankeyJson={SankeyJsonDataIs} idName={`chart${i}`} forGene = {SankeyJsonDataIs.nodes[0].name}></NewSankeyd3>
            </div>
          </div>
        }
      </div>
      )
    }
    setSankyDataCharts(sankeyCharts)
  }, [sankeyData])

  const getSankyData = (sankeyJson) => {

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
      

    });


    let sankeyjsondata = {
      "nodes": final_nodes,
      "links": final_links
    }

    return sankeyjsondata;

  }
  



  return (
    <>
      <div>
        <div className='printpdf' id='printpdf'>
          {sankyDataCharts && sankyDataCharts}
      </div>
      </div>
    </>

  )
}

export default PDFReport