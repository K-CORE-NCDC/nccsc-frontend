import { EyeIcon } from '@heroicons/react/outline';
import html2canvas from 'html2canvas';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { FusionVennDaigram } from '../../../actions/api_actions';
import { Context } from '../../../wrapper';
import FusionCustomPlot from '../../Common/FusionCustomPlot';
import FusionVennCmp from '../../Common/FusionVenn';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import { useParams } from 'react-router-dom';

import Table from '../../Common/Table/ReactTable';

export default function FusionPlot({
  width,
  screenCapture,
  setToFalseAfterScreenCapture,
  VFData
}) {

  let { project_id } = useParams();
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [groupFilters, setGroupFilters] = useState({});
  const [tableData, setTableData] = useState([]);
  const [fusionId, setFusionId] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [noData, setNoData] = useState(false);
  const [showFusion, setShowFusion] = useState(false);
  const [VennData, setVennData] = useState({});
  const [inputState, setInputState] = useState({});
  const [watermarkCss, setWatermarkCSS] = useState('');
  const [showDiv, setShowDiv] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('');
  const intl = useIntl();

  useEffect(() => {
    if (context['locale'] === 'kr-KO') {
      setKoreanlanguage(true);
    } else {
      setKoreanlanguage(false);
    }
  }, [context]);

  const takeScreenshot = async () => {
    const previewContainer = document.getElementById('preview');

    // Clear the 'preview' container before appending new clones
    while (previewContainer.firstChild) {
      previewContainer.removeChild(previewContainer.firstChild);
    }

    const element = document.getElementById('venn');
    const clone = element.cloneNode(true);
    previewContainer.appendChild(clone);

    const element2 = document.getElementById('vennn');
    if (element2) {
      const clone2 = element2.cloneNode(true);
      previewContainer.appendChild(clone2);
    }

    const ctx = previewContainer;

    // Use html2canvas on the correct element (ctx) not the container
    await html2canvas(ctx, { logging: true }).then((canvas) => {
      let imgData = canvas.toDataURL('image/jpeg', 1.0);

      // Create a link element to download the image
      let link = document.createElement('a');
      link.href = imgData;
      link.download = 'fusion-screenshot.jpg';

      // Append the link to the body, trigger a click, and remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clear the 'preview' container after taking the screenshot
      while (previewContainer.firstChild) {
        previewContainer.removeChild(previewContainer.firstChild);
      }
    });
  };


  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS('watermark');
    } else {
      setWatermarkCSS('');
    }

    if (watermarkCss !== '' && screenCapture) {
      if(document.getElementById('venn')){
        takeScreenshot();
        setToFalseAfterScreenCapture();
      }
    }
  }, [screenCapture, watermarkCss]);
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );

  const tableColumnsData = [
    {
      // Header: intl.formatMessage({ id: "View", defaultMessage: 'View' }),
      Header: "View Fusion plot",
      wordBreak: "initial",
      accessor: (row) => row?.view,
      Cell: ({ cell: { row, value } }) => {
        let html = [];
        let check = false;
        if ('group 1' in row) {
          let s = row['group 1'];

          html.push(
            <p>
              <strong>Group 1:</strong> {s.join(',')}
            </p>
          );
          check = true;
        }
        if ('group 2' in row) {
          let s = row['group 2'];
          html.push(
            <p>
              <strong>Group 2:</strong> {s.join(',')}
            </p>
          );
          check = true;
        }
        if ('group 3' in row) {
          let s = row['group 3'];
          html.push(
            <p>
              <strong>Group 3:</strong> {s.join(',')}
            </p>
          );
          check = true;
        }
        if (!check) {
          let s = row['sample_id'];
          s = [...new Set(s)];
          html.push(s.join(','));
          // html.push(s);
        }
        let main_html = [];
        main_html.push(
          <div className="flex flex-col w-full text-left" style={{ gap: '10px', justifyContent: 'center' }}>
            {value}
            <button onClick={(e) => generateFusion(e, row?.original.id)} id={row.id} style={{ padding: '5px', cursor: 'pointer' }}>
              <EyeIcon style={{ width: "26px" }} />
            </button>
          </div>
        );
        return main_html;
      },
      width: 100
    },
    {
      // Header: intl.formatMessage({ id: "SampleName", defaultMessage: 'Sample Name' }),
      Header: "Sample Name",
      wordBreak: "initial",
      accessor: (original) => {
        let samples = '';

        if (original && original.sample_id) {
          samples = original.sample_id.join(',');
        } else {
          if (original && 'group 1' in original) {
            samples += original['group 1'].join(',');
          }
          if (original && 'group 2' in original) {
            if (samples) {
              samples += ',';
            }
            samples += original['group 2'].join(',');
          }
          if (original && 'group 3' in original) {
            if (samples) {
              samples += ',';
            }
            samples += original['group 3'].join(',');
          }
        }

        return samples;
      },
    },
    {
      // Header: intl.formatMessage({ id: "LeftGeneName", defaultMessage: 'Left Gene Name' }),
      Header: "Left Gene Name",
      wordBreak: "initial",
      accessor: (original) => original?.left_gene_name,
      Cell: ({ cell: { value } }) => (
        <div title={value}>{value}</div>
      ),

    },
    {
      // Header: intl.formatMessage({ id: "LeftEnsemblId", defaultMessage: 'Left Ensembl Id' }),
      Header: "Left Ensembl Id",
      wordBreak: "initial",
      accessor: (original) => original?.left_gene_ensmbl_id,
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    },
    {
      // Header: intl.formatMessage({ id: "LeftBreakpoint", defaultMessage: 'Left Breakpoint' }),
      Header: "Left Breakpoint",
      wordBreak: "initial",
      accessor: (original) => original?.left_hg38_pos,
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    },
    {
      // Header: intl.formatMessage({ id: "RightGeneName", defaultMessage: 'Right Gene Name' }),
      Header: "Right Gene Name",
      wordBreak: "initial",
      accessor: (original) => original?.right_gene_name,
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    },
    {
      // Header: intl.formatMessage({ id: "RightEnsemblId", defaultMessage: 'Right Ensembl Id' }),
      Header: "Right Ensembl Id",
      wordBreak: "initial",
      accessor: (original) => original?.right_gene_ensmbl_id,
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    },
    {
      // Header: intl.formatMessage({ id: "RightBreakpoint", defaultMessage: 'Right Breakpoint' }),
      Header: "Right Breakpoint",
      wordBreak: "initial",
      accessor: (original) => original?.right_hg38_pos,
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    },
    {
      // Header: intl.formatMessage({ id: "JunctionReadCount", defaultMessage: 'Junction Read Count' }),
      Header: "Junction Read Count",
      wordBreak: "initial",
      accessor: (original) => original?.junction_read_count,
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    },
    {
      // Header: intl.formatMessage({ id: "SpanningFragCount", defaultMessage: 'Spanning Frag Count' }),
      Header: "Spanning Frag Count",
      wordBreak: "initial",
      accessor: (original) => original?.spanning_frag_count ? original?.spanning_frag_count : 0,
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    },
    {
      // Header: intl.formatMessage({ id: "SpliceType", defaultMessage: 'Splice Type' }),
      Header: "Splice Type",
      wordBreak: "initial",
      accessor: (original) => original?.splice_type ? original?.splice_type : 'None',
      Cell: ({ cell: { value } }) => (< div title={value}>{value}</div>),
    }
  ];

  const generateFusion = (e, id) => {
    setFusionId(id);
  };

  useEffect(() => {
    let projectdata = { "project_id": project_id }
    setInputState((prevState) => ({ ...prevState, ...VFData, ...projectdata }));

    if ('groupFilters' in VFData) {
      setGroupFilters(VFData['groupFilters']);
    }
  }, [VFData]);

  useEffect(() => {
    setVennData({});
    setGroupName('');
    setTableData([]);
    if (inputState) {
      if (
        Object.keys(groupFilters).length > 0
      ) {
        setLoader(true);
        let return_data = FusionVennDaigram('POST', { ...inputState, filterGroup: groupFilters });
        return_data
          .then((result) => {
            const d = result;
            if (d.status === 200) {
              let r_ = {};
              r_['res'] = d['data'];
              r_['status'] = 200;
              setVennData(r_);
              setShowFusion(true);
              setLoader(false);
              setNoData(false);
            } else {
              setNoData(true);
              setShowFusion(false);
              setVennData({});
              setLoader(false);
            }
          })
          .catch(() => {
            setLoader(false);
            setShowFusion(false);
            setNoData(true);
            setVennData({});
          });
      }
    }
  }, [inputState]);

  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      setVennData({});
    }
  }, []);

  const getVennIds = (key) => {
    setSelectedGroup(key)
    if (key.length > 0) {
      setFusionId(0);
      let name = key.split('_');
      let t = 'Unique';

      if (name.length > 1) {
        t = 'Core';
      }
      let tmp_name = name.join(' & ');
      tmp_name = tmp_name.replace(/g/g, 'G');
      tmp_name = tmp_name.replace(/a/g, 'A');
      tmp_name = tmp_name.replace(/b/g, 'B');
      tmp_name = tmp_name.replace(/c/g, 'C');
      tmp_name += ' : ' + t + ' Fusion Gene Table ';
      setGroupName(tmp_name);
      let r = VennData.res.data;
      setTableData(r[key]);
    }
  };

  return (
    <>
      {loader ? (
        <div className="MarginTop4">
          <LoaderCmp />
        </div>
      ) : (
        <>
          {noData && (
            <div className="MarginTop4">
              <NoContentMessage />
            </div>
          )}

          {groupFilters && Object.keys(groupFilters).length === 0 && (
            <p className="MarginTop4">
              <FormattedMessage
                id="PleaseSelectFilterData"
                defaultMessage="Please Select the Filter Data"
              />
            </p>
          )}
          {
            showFusion && (
              <div className="BorderstyleViz">
                <div className="MarginTop4 OverFlowXHide">
                  {VennData && !noData && <FusionVennCmp parentCallback={getVennIds} VennData={VennData} width={width} />}
                  {VennData && !noData && fusionId !== 0 && <FusionCustomPlot fusionId={fusionId} />}
                </div>
                <div>
                  <div className="FusionCardText">
                    <p>{koreanlanguage ? '환자군에서 적어도 1명의 환자에게 검출된 융합 유전자의 수를 센다.' : 'Fusion gene detected in at least 1 patient in a patient group is counted'}</p>
                    <p>{koreanlanguage ? 'Core: Group1과 Group2 모두에서 발견되는 융합 유전자' : 'Core : Fusion genes found in both Group 1 and Group 2'}</p>
                    <p>{koreanlanguage ? 'Unique: 특정 환자군에서 발견된 융합 유전자' : 'Unique : Fusion genes found in a certain patient group.'}</p>
                  </div>
                  {
                    tableData.length <= 0 && selectedGroup.length > 0 &&
                    <div>
                      <p>{koreanlanguage ? '데이터가 없습니다.' : 'No Data Found. '}</p>
                    </div>
                  }
                  {
                    selectedGroup?.length === 0 &&
                    <div>
                      <p>{koreanlanguage ? '벤다이어그램 영역을 클릭하여 해당하는 fusion gene 을 확인하세요.' : 'Click on area of Venn diagram to view the corresponding fusion genes.'}</p>
                    </div>
                  }
                  {tableData.length > 0 && (
                    <div className="mt-20 my-0 mx-auto w-11/12 shadow-lg">
                      <div className="bg-white border-b border-gray-200 py-5 text-left px-5" style={{ fontSize: '18px' }}>
                        {groupName}
                      </div>
                      {VennData && !noData && (
                        <Table pagination columns={tableColumnsData} data={tableData} width="2650" summary={'fusion_table'} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          }
        </>
      )}

      <div id="preview" style={showDiv ? { display: 'block' } : { display: 'none' }}></div>
    </>
  );
}
