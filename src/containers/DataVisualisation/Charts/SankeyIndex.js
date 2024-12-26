import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SankeyJson } from '../../../actions/api_actions';
import LoaderCmp from '../../Common/Loader';
import NoContentGene from '../../Common/NoContentGene';
import Sankey from './NewSankey';
import NewSankeyd3 from './NewSankeyd3';
import Table from '../../Common/Table/ReactTable';
import { useIntl } from 'react-intl';

function SankeyIndex({ selectedGene, variants, screenCapture, setToFalseAfterScreenCapture,tabName }) {
  const [gene, setGene] = useState('');
  const [loader, setLoader] = useState(false);
  const [detailGeneData, setDetailGeneData] = useState([]);
  const [showNoContent, setShowNoContent] = useState(false);
  const [sankeyJson, setSankeyJson] = useState([]);
  const [SankeyJsonData, setSankeyJsonData] = useState({
    nodes: [],
    links: []
  });
  const intl = useIntl();

  const history = useHistory();
  const uniqiue_values = { dbsnp_rs: new Set(), diseasename: new Set() };

  useEffect(() => {
    setLoader(true);
    setShowNoContent(false);

    let gene = selectedGene;
    let inputData = {
      gene: gene
    };
    inputData['mutation'] = variants;
    setGene(gene);

    if (selectedGene && variants.length > 0) {
      let return_data = SankeyJson('POST', inputData);
      return_data
        .then((result) => {
          const d = result;
          if (d.status === 200 && 'data' in d && d['data'].length > 0) {
            setSankeyJson(d['data']);
            setShowNoContent(false);
          } else {
            setLoader(false);
            setShowNoContent(true);
            setSankeyJson([]);
          }
        })
        .catch(() => {
          setShowNoContent(true);
          setSankeyJson([]);
          history.push('/notfound');
        });
    }
    else {
      setLoader(false);
      setShowNoContent(true);
      setSankeyJson([]);
    }
  }, [selectedGene, variants]);

  useEffect(() => {
    if (sankeyJson && sankeyJson.length > 0) {
      setShowNoContent(false);

      let detailgeneData = [];
      let nodes = {};
      let node_type = {};
      let i = 1;

      sankeyJson.forEach((element) => {
        for (const key in element) {
          if (key !== 'sourceurl') {
            if (!nodes.hasOwnProperty(element[key]) && element[key]) {
              nodes[element[key]] = i;
              node_type[i] = key;
              i = i + 1;
            }
          }
        }
      });

      let final_nodes = [];
      let drugToDisease = 0;
      for (const key in nodes) {
        final_nodes.push({ name: key, type: node_type[nodes[key]] });
      }

      let fn = {};
      let final_links = [];
      let tmpTable = {};

      sankeyJson.forEach((element) => {
        if (
          element['hugo_symbol'] &&
          element['variant_classification'] &&
          element['dbsnp_rs'] &&
          element['diseasename']
        ) {
          let kt =
            element['hugo_symbol'] +
            '||' +
            element['variant_classification'] +
            '||' +
            element['dbsnp_rs'] +
            '||' +
            element['diseasename'];
          if (kt in tmpTable) {
            if (tmpTable[kt].indexOf(element['drugname']) === -1) {
              tmpTable[kt].push(element['drugname']);
            }
          } else {
            tmpTable[kt] = [element['drugname']];
          }
        }

        if (element['hugo_symbol'] && element['variant_classification']) {
          let k = nodes[element['hugo_symbol']] + '_' + nodes[element['variant_classification']];
          if (!(k in fn)) {
            fn[k] = '';
            final_links.push({
              source: element['hugo_symbol'],
              target: element['variant_classification'],
              value: 10
            });
          }
        }
        if (element['variant_classification'] && element['dbsnp_rs']) {
          let k = nodes[element['variant_classification']] + '_' + nodes[element['dbsnp_rs']];
          if (!(k in fn)) {
            fn[k] = '';
            final_links.push({
              source: element['variant_classification'],
              target: element['dbsnp_rs'],
              value: 10
            });
          }
        }
        if (element['dbsnp_rs'] && element['diseasename']) {
          let k = nodes[element['dbsnp_rs']] + '_' + nodes[element['diseasename']];
          if (!(k in fn)) {
            fn[k] = '';
            final_links.push({
              source: element['dbsnp_rs'],
              target: element['diseasename'],
              value: 10
            });
          }
          uniqiue_values['dbsnp_rs'].add(element['dbsnp_rs']);
          uniqiue_values['diseasename'].add(element['diseasename']);
        }
        if (element['diseasename'] && element['drugname']) {
          let k = nodes[element['diseasename']] + '_' + nodes[element['drugname']];
          if (!(k in fn)) {
            fn[k] = '';
            final_links.push({
              source: element['diseasename'],
              target: element['drugname'],
              value: 10
            });
            drugToDisease += 1;
          }
        }
      });

      for (const key in tmpTable) {
        let r = key.split('||');
        let d = tmpTable[key];
        let row = {
          hugo_symbol: r[0],
          variant_classification: r[1],
          dbsnp_rs: r[2],
          diseasename: r[3],
          drugname: d.join(',')
        };
        detailgeneData.push(row);
      }
      setDetailGeneData(detailgeneData);
      setSankeyJsonData({ nodes: final_nodes, links: final_links });
      setLoader(false);
    }
  }, [sankeyJson]);

  useEffect(() => {
    generateTableColumnsData(detailGeneData);
  }, [detailGeneData]);




  const generateTableColumnsData = (detailGeneData) => {
    if (detailGeneData && detailGeneData.length > 0) {
      let tableColumnsData = [
        {
          Header: intl.formatMessage({ id: "GeneName", defaultMessage: 'Gene Name' }),
          accessor: (row) =>
            row.hugo_symbol,
          enableSorting: true
        }

      ];

      tableColumnsData.push({
        Header: intl.formatMessage({ id: "VariantType", defaultMessage: 'Variant Type' }),
        accessor: (row) =>
          row.variant_classification
      });

      tableColumnsData.push({
        Header: intl.formatMessage({ id: "rsid", defaultMessage: 'Variant ID(RS ID)' }),
        accessor: (row) => row.dbsnp_rs,
      });

      tableColumnsData.push({
        Header: intl.formatMessage({ id: "Disease", defaultMessage: 'Disease' }),
        accessor: (row) =>
          row.diseasename,
      });

      tableColumnsData.push({
        Header: intl.formatMessage({ id: "Drug", defaultMessage: 'Drug' }),
        accessor: (row) =>
          row.drugname
      });

      return tableColumnsData;
    } else return [];

  };


  return (
    <>
      {showNoContent && (
        <div className="mt-20 mb-20">
          <NoContentGene />
        </div>
      )}
      {loader ? (
        <div className="mb-28">
          <LoaderCmp />
        </div>
      ) : (
        <div id="main_chart_cont">
          {gene &&
            sankeyJson.length > 0 &&
            SankeyJsonData['nodes'].length > 0 &&
            SankeyJsonData['links'].length > 0 && (
              <>
                <Sankey></Sankey>
                <NewSankeyd3 SankeyJson={SankeyJsonData} idName="chart"
                  screenCapture={screenCapture}
                  setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
                  tabName={tabName}
                ></NewSankeyd3>
                <div>
                  {detailGeneData && detailGeneData.length > 0 && (
                    <div className="rounded-lg border border-gray-200">
                      <div className="">
                        <Table
                          columns={generateTableColumnsData(detailGeneData)}
                          data={detailGeneData}
                          width="1100"
                          summary={'sankey_data'}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
        </div>
      )}
    </>
  );
}

export default SankeyIndex;
