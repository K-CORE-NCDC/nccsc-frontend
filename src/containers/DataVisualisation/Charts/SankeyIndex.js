/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSankeyJson } from "../../../actions/api_actions";
import Sankey from "./NewSankey";
import NewSankeyd3 from "./NewSankeyd3";

function SankeyIndex({ ...props }) {
  const d = { ...props };
  const [initalProps, setInitialProps] = useState({});
  const reportData = useSelector(
    (state) => state.dataVisualizationReducer.rniData
  );
  const sankeyJson = useSelector(
    (state) => state.dataVisualizationReducer.SankeyJson
  );

  const [gene, setGene] = useState("");
  const dispatch = useDispatch();

  const [detailGeneData, setDetailGeneData] = useState([]);
  const [SankeyJsonData, setSankeyJsonData] = useState({
    nodes: [],
    links: [],
  });
  const [sankyTableData, setSankyTableData] = useState();
  const [sankyTableData2, setSankyTableData2] = useState("");

  useEffect(() => {
    if (initalProps && "data" in initalProps) {
      let d = initalProps;
      let variants = reportData.variant_info;
      let gene = d["data"]["gene"];
      let inputData = {
        gene: gene,
        mutation: variants[gene],
      };
      setGene(gene);
      dispatch(getSankeyJson("POST", inputData));
      setSankyTableData2(variants[gene].filter(Boolean).toString());
    }
  }, [initalProps]);

  useEffect(() => {
    if (d) {
      setInitialProps(d);
    }
  }, []);

  useEffect(() => {
    if (sankeyJson && sankeyJson["data"].length > 0) {
      let detailgeneData = [];
      let nodes = {};
      let node_type = {};
      let i = 1;
      sankeyJson["data"].forEach((element) => {
        detailgeneData.push(element);
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
      sankeyJson["data"].forEach((element) => {
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
      setDetailGeneData(detailgeneData);
      setSankeyJsonData({ nodes: final_nodes, links: final_links });
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
            {detailGeneData.map((genedata, index) => (
              <tr key={index} className="border-b">
                <td
                  className="
                            px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r"
                >
                  {genedata["hugo_symbol"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                  {genedata["variant_classification"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                  {genedata["dbsnp_rs"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                  {genedata["diseasename"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
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
    <div id="main_chart_cont">
      {gene &&
        SankeyJsonData["nodes"].length > 0 &&
        SankeyJsonData["links"].length > 0 && (
          <>
            <Sankey></Sankey>
            <NewSankeyd3
              SankeyJson={SankeyJsonData}
              idName="chart"
            ></NewSankeyd3>
            {sankyTableData}
          </>
        )}
      {gene && SankeyJsonData["links"].length <= 0 && (
        <>
          {sankyTableData}
          {reportData.variant_info[gene].map((gene, i) => {
            return <p key={i}></p>;
          })}
        </>
      )}
    </div>
  );
}

export default SankeyIndex;
