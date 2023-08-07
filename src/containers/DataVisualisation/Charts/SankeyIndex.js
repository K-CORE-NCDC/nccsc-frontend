/* eslint-disable react-hooks/exhaustive-deps */
import Sankey from "./NewSankey";
import NewSankeyd3 from "./NewSankeyd3";
import { useSelector } from "react-redux";
import LoaderCmp from "../../Common/Loader";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SankeyJson } from "../../../actions/api_actions";
import NoContentGene from "../../Common/NoContentGene";


function SankeyIndex({ selectedGene, variants, allVariants }) {
  const d = selectedGene
  const reportData = useSelector(
    (state) => state.dataVisualizationReducer.rniData
  );

  const [gene, setGene] = useState("");
  const [loader, setLoader] = useState(false);
  const [detailGeneData, setDetailGeneData] = useState([]);
  const [showNoContent, setShowNoContent] = useState(false);
  const [sankeyJson, setSankeyJson] = useState([])
  const [SankeyJsonData, setSankeyJsonData] = useState({
    nodes: [],
    links: [],
  });
  const [sankyTableData, setSankyTableData] = useState();
  const [sankyTableData2, setSankyTableData2] = useState("");
  const history = useHistory();
  const uniqiue_values = { 'dbsnp_rs': new Set(), 'diseasename': new Set() }
  useEffect(() => {
    setLoader(true)
    setShowNoContent(false)

    let gene = selectedGene
    let inputData = {
      gene: gene,
    };
    inputData['mutation'] = variants
    // if(variants && gene in variants ){
    //   inputData['mutation'] = variants[gene]
    // }
    // else{
    //   inputData['mutation'] = []
    // }
    setGene(gene);

    if (selectedGene && variants.length > 0) {
      let return_data = SankeyJson("POST", inputData)
      return_data.then((result) => {
        const d = result
        if (d.status === 200 && "data" in d && d['data'].length > 0) {
          setSankeyJson(d['data'])
          setShowNoContent(false)
        } else {
          setLoader(false)
          setShowNoContent(true)
          setSankeyJson([])
        }
      })
        .catch((e) => {
          setShowNoContent(true)
          setSankeyJson([])
          history.push('/notfound')
        });
    }
    if (variants) {
      setSankyTableData2(variants);
    }
    else {
      setSankyTableData2([])
    }
  }, [selectedGene, variants]);

  useEffect(() => {
    if (sankeyJson && sankeyJson.length > 0) {
      setShowNoContent(false)

      let detailgeneData = [];
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
      let drugNodeCount = 0
      let drugToDisease = 0
      for (const key in nodes) {
        final_nodes.push({ name: key, type: node_type[nodes[key]] });
      }

      let fn = {};
      let final_links = [];
      let tmpTable = {}


      sankeyJson.forEach((element) => {
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
          uniqiue_values['dbsnp_rs'].add(element["dbsnp_rs"])
          uniqiue_values['diseasename'].add(element["diseasename"])
        }
        if (element["diseasename"] && element["drugname"]) {
          let k =
            nodes[element["diseasename"]] + "_" + nodes[element["drugname"]];
          if (drugToDisease <= 15) {
            if (!(k in fn)) {
              fn[k] = "";
              final_links.push({
                source: element["diseasename"],
                target: element["drugname"],
                value: 10,
              });
              drugToDisease += 1
            }
          }

        }
      });

      for (const key in tmpTable) {
        let r = key.split("||")
        let d = tmpTable[key]
        let row = {
          "hugo_symbol": r[0],
          "variant_classification": r[1],
          "dbsnp_rs": r[2],
          "diseasename": r[3],
          "drugname": d.join(",")
        }
        detailgeneData.push(row)

      }
      setDetailGeneData(detailgeneData);
      setSankeyJsonData({ nodes: final_nodes, links: final_links });
      setLoader(false)
    }
  }, [sankeyJson]);

  useEffect(() => {
    if (detailGeneData.length > 0) {
      let tableHTML = (
        <table className="min-w-full border text-center">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-md font-medium text-gray-900 px-6 py-4 border-r"
              >
                gene
              </th>
              <th
                scope="col"
                className="text-md font-medium text-gray-900 px-6 py-4 border-r"
              >
                Variant
              </th>
              <th
                scope="col"
                className="text-md font-medium text-gray-900 px-6 py-4 border-r"
              >
                Rsid
              </th>
              <th
                scope="col"
                className="text-md font-medium text-gray-900 px-6 py-4 border-r"
              >
                Disease
              </th>
              <th
                scope="col"
                className="text-md font-medium text-gray-900 px-6 py-4"
              >
                Drug
              </th>
            </tr>
          </thead>
          <tbody>
            {detailGeneData.map((genedata, index) => (
              <tr key={index} className="border-b">
                <td
                  className="
                            px-6 py-4  text-md font-medium text-gray-900 border-r"
                >
                  {genedata["hugo_symbol"]}
                </td>
                <td className="px-6 py-4  text-md font-medium text-gray-900 border-r">
                  {genedata["variant_classification"]}
                </td>
                <td className="px-6 py-4  text-md font-medium text-gray-900 border-r">
                  {genedata["dbsnp_rs"]}
                </td>
                <td className="px-6 py-4 text-md font-medium text-gray-900 border-r">
                  {genedata["diseasename"]}
                </td>
                <td className="px-6 py-4 text-md font-medium text-gray-900 border-r">
                  {genedata["drugname"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
      setSankyTableData(tableHTML);
    } else {
      let tableHTML = (
        <table className="min-w-full border text-center">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
              >
                gene
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
              >
                Variant
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
              >
                Rsid
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
              >
                Disease
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4"
              >
                Drug
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {gene}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {sankyTableData2}
              </td>
            </tr>
          </tbody>
        </table>
      );
      setSankyTableData(tableHTML);
    }
  }, [detailGeneData]);

  return (
    <>
      {showNoContent && <div className="mt-20 mb-20"><NoContentGene /></div>}
      {loader ? (<div className="mb-28"><LoaderCmp /></div>) :
        (
          <div id="main_chart_cont">
            {gene && sankeyJson.length > 0 &&
              SankeyJsonData["nodes"].length > 0 &&
              SankeyJsonData["links"].length > 0 && (
                <>
                  <Sankey></Sankey>
                  <NewSankeyd3 SankeyJson={SankeyJsonData} idName="chart"></NewSankeyd3>
                  {sankyTableData}
                </>
              )}
          </div>

        )}
    </>
  );
}

export default SankeyIndex;
