import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import FusionVennCmp from "../../Common/FusionVenn";
import { useParams } from "react-router-dom";
import NoContentMessage from "../../Common/NoContentComponent";
import {
  FusionVennDaigram,
} from "../../../actions/api_actions";
import LoaderCmp from "../../Common/Loader";
import FusionCustomPlot from "../../Common/FusionCustomPlot";
import { FormattedMessage } from "react-intl";
import DataTable from "react-data-table-component";
import { Context } from "../../../wrapper";
import { EyeIcon } from "@heroicons/react/outline";
import html2canvas from 'html2canvas';
import $ from 'jquery'

export default function FusionPlot({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
  VFData,
}) {
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [groupFilters, setGroupFilters] = useState({});
  const [tableData, setTableData] = useState([]);
  const [fusionId, setFusionId] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [noData, setNoData] = useState(false)
  const [showFusion, setShowFusion] = useState(false)
  const [VennData, setVennData] = useState({})
  const [inputState, setInputState] = useState({})
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [showDiv, setShowDiv] = useState(true)

  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
    } else {
      setKoreanlanguage(false);
    }
  }, [context]);


  let takeScreenshot = async () => {
   
    const element = document.getElementById('venn')
    const clone = element.cloneNode(true);
    document.getElementById('preview').appendChild(clone);
    const element2 = document.getElementById('vennn')
 
    if (element2) {
      const clone2 = element2.cloneNode(true);
      document.getElementById('preview').appendChild(clone2);
    }
    const ctx = document.getElementById('preview')
    let imgData
    await html2canvas(ctx).then(canvas => {
      imgData = canvas.toDataURL('image/jpeg', 1.0);

    });
    let link = document.createElement('a');
    link.href = imgData;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    setShowDiv(false)
    document.body.removeChild(link);

  }


  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }

    if (watermarkCss !== "" && screenCapture) {
      takeScreenshot()
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])

  let { project_id } = useParams();

  const [userDefienedFilter, setUserDefienedFilter] = useState(
    project_id === undefined ? "static" : "dynamic"
  );
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );


  const tableColumnsData = [
    {
      name: <FormattedMessage id="SampleName" defaultMessage="Sample Name" />,
      cell: (row, index) => {
        let html = [];
        let check = false;
        if ("group 1" in row) {
          let s = row["group 1"];

          html.push(
            <p>
              <strong>Group 1:</strong> {s.join(",")}
            </p>
          );
          check = true;
        }
        if ("group 2" in row) {
          let s = row["group 2"];
          html.push(
            <p>
              <strong>Group 2:</strong> {s.join(",")}
            </p>
          );
          check = true;
        }
        if ("group 3" in row) {
          let s = row["group 3"];
          html.push(
            <p>
              <strong>Group 3:</strong> {s.join(",")}
            </p>
          );
          check = true;
        }
        if (!check) {
          let s = row["sample_id"];
          s = [...new Set(s)]
          html.push(s.join(","));
          // html.push(s);
        }
        let main_html = [];
        main_html.push(
          <div className="flex flex-col w-full text-left" style={{gap:'10px'}}>
            {html}
            <button onClick={(e) => generateFusion(e, row.id)} id={row.id}>
                  <EyeIcon style={{width:"15px"}} />
              </button>
          </div>
        );
        return main_html;
      },
      sortable: true,
      minWidth:'12%'
    },
    {
      name: <FormattedMessage id="LeftGeneName" defaultMessage="Left Gene Name" />,
      selector: (row) => row.left_gene_name,
      sortable: true,
    },
    {
      name: <FormattedMessage id="LeftEnsemblId" defaultMessage="Left Ensembl Id" />,
      selector: (row) => row.left_gene_ensmbl_id,
      sortable: true,
    },
    {
      name: <FormattedMessage id="LeftBreakpoint" defaultMessage="Left Breakpoint" />,
      cell: (row, index) => {
        return row.left_gene_chr + ":" + row.left_hg38_pos;
      },
      sortable: true,
    },
    {
      name: <FormattedMessage id="RightGeneName" defaultMessage="Right Gene Name" />,
      selector: (row) => row.right_gene_name,
      sortable: true,
    },
    {
      name: <FormattedMessage id="RightEnsemblId" defaultMessage="Right Ensembl Id" />,
      selector: (row) => row.right_gene_ensmbl_id,
      sortable: true,
    },
    {
      name: <FormattedMessage id="RightBreakpoint" defaultMessage="Right Breakpoint" />,
      cell: (row, index) => {
        return row.right_gene_chr + ":" + row.right_hg38_pos;
      },
      sortable: true,
    },
    {
      name: <FormattedMessage id="JunctionReadCount" defaultMessage="Junction Read Count" />,
      selector: (row) => row.junction_read_count ? row.junction_read_count : 0,
      sortable: true,
    },
    {
      name: <FormattedMessage id="SpanningFragCount" defaultMessage="Spanning Frag Count" />,
      selector: (row) => row.spanning_frag_count ? row.spanning_frag_count : 0,
      sortable: true,
    },
    {
      name: <FormattedMessage id="SpliceType" defaultMessage="Splice Type" />,
      selector: (row) => row.splice_type ? row.splice_type : 'None',
      sortable: true,
    }
  ];

  const generateFusion = (e, id) => {
    setFusionId(id);
  };

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData, ...VFData }));
    }
    if ('groupFilters' in VFData) {
      setGroupFilters(VFData['groupFilters'])
    }
  }, [inputData, VFData, userDefienedFilter])

  useEffect(() => {
    setVennData({})
    setGroupName("")
    setTableData([])
    if (inputState) {
      if (
        inputState.type !== "" &&
        Object.keys(groupFilters).length > 0 &&
        inputState["genes"].length > 0
      ) {
        console.log('a');
        setLoader(true);
        inputState["filterType"] = userDefienedFilter;
        let return_data = FusionVennDaigram('POST', { ...inputState, filterGroup: groupFilters })
        return_data.then((result) => {
          console.log('b');
          const d = result
          if (d.status === 200) {
            let r_ = {}
            r_['res'] = d["data"]
            r_['status'] = 200
            setVennData(r_)
            setShowFusion(true)
            setLoader(false);
            setNoData(false)
          } else {
            console.log('c');
            setNoData(true)
            setShowFusion(false)
            setVennData({})
            setLoader(false);
          }
        })
          .catch((e) => {
            console.log('d');
            setLoader(false);
            setShowFusion(false)
            setNoData(true)
            setVennData({})
          });



      }
    }
  }, [inputState]);

  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      setVennData({})
    }
  }, []);


  const getVennIds = (key) => {
    if (key.length > 0) {
      setFusionId(0);
      let name = key.split("_");
      let t = "Unique";

      if (name.length > 1) {
        t = "Core";
      }
      let tmp_name = name.join(" & ");
      tmp_name = tmp_name.replace(/g/g, "G");
      tmp_name = tmp_name.replace(/a/g, "A");
      tmp_name = tmp_name.replace(/b/g, "B");
      tmp_name = tmp_name.replace(/c/g, "C");
      tmp_name += " : " + t + " Fusion Gene Table ";
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
          {
            noData && (
              <div className="MarginTop4"><NoContentMessage /></div>
            )
          }

          {
            (inputData && inputData.genes.length === 0) &&
            <p className="MarginTop4"> <FormattedMessage id="PleaseSelecttheGeneSetData" defaultMessage="Please Select the Gene Set Data" /> </p>
          }

          {groupFilters && Object.keys(groupFilters).length === 0 &&
            <p className="MarginTop4">
              <FormattedMessage id="PleaseSelectFilterData" defaultMessage="Please Select the Filter Data" />
            </p>}

          {showFusion &&
            <div className="MarginTop4 BorderstyleViz OverFlowXHide" >
              {VennData && !noData && (
                <FusionVennCmp
                  parentCallback={getVennIds}
                  VennData={VennData}
                  width={width}
                />
              )}


              {VennData && !noData && fusionId !== 0 && (
                <div className="mt-5 my-0 mx-auto h-auto w-11/12 shadow-lg">
                  <FusionCustomPlot fusionId={fusionId} />
                </div>
              )}

              {VennData && !noData && tableData.length > 0 && (
                <div>
                  <div
                    className="MarginBottom5 MarginLeft4"
                    style={{
                      textAlign: "start",
                      lineHeight: "1.4",
                      fontSize: "12px",
                    }}
                  >
                    <p>
                      {koreanlanguage ? "환자군에서 적어도 1명의 환자에게 검출된 융합 유전자의 수를 센다." : "Fusion gene detected in at least 1 patient in a paitent group is counted"}
                    </p>
                    <p>
                      {koreanlanguage ? "Core: Group1과 Group2 모두에서 발견되는 융합 유전자" : "Core : Fusion genes found in both Group 1 and Group 2"}
                    </p>
                    <p>
                      {koreanlanguage ? "Unique: 특정 환자군에서 발견된 융합 유전자" : "Unique : Fusion genes found in certain patient group."}
                    </p>
                  </div>

                  <div className="mt-20 my-0 mx-auto  w-11/12 shadow-lg">
                    <div className="bg-white border-b border-gray-200 py-5 text-left px-5">
                      {groupName}
                    </div>
                    {VennData && !noData && <DataTable
                      pagination
                      columns={tableColumnsData}
                      data={tableData}
                      customStyles={{
                        table: {
                          border: '1px solid black',
                        },
                        pagination: {
                          style: {
                              gap:"10px"
                          }
                        }      
                      }}
                    />
                    }
                  </div>
                </div>
              )}
            </div>



          }

        </>
      )}

      <div id="preview" style={showDiv ? { display: 'block' } : { display: 'none' }}></div>
    </>
  );
}
