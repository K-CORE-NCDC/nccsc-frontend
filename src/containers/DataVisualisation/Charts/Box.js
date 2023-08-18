import React, { useState, useEffect, useRef } from "react";
import BoxPlot from "../../Common/BoxPlot2";
import LoaderCmp from "../../Common/Loader";
import { BoxInformation } from "../../../actions/api_actions";
import "../../../assets/css/style.css";
import Multiselect from "multiselect-react-dropdown";
import NoContentMessage from "../../Common/NoContentComponent";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import '../../../styles/css/box.css'

export default function Box({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const reference = useRef();
  const [watermarkCss, setWatermarkCSS] = useState("");
  const [loader, setLoader] = useState(false);
  const [inputState, setInputState] = useState({});
  const [genesHtml, setGenesHtml] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [showBoxPlot, setShowBoxPlot] = useState(false);
  const [noContent, setNoContent] = useState(false);
  const [viewType, setViewType] = useState("gene_vl");
  const [tableType, setTableType] = useState("proteome");
  const [gene, setGene] = useState("");
  const [genes, setGenes] = useState("");
  const [boxJson, setboxJson] = useState(null)
  const [noGeneData, setNoGeneData] = useState(true)
  const [alltabList, setAllTabList] = useState({});
  const [activeTab, setActiveTab] = useState('1')
  const [selectedType, setSelectedType] = useState('1')

  let { project_id } = useParams();
  const tabList = useSelector(
    (data) => data.dataVisualizationReducer
  );

  useEffect(() => {
    if ('userProjectsDataTable' in tabList) {
      let _data = tabList?.userProjectsDataTable
      if (_data['proteome'] !== null) {
        setActiveTab('1')
      } else if (_data['rna'] !== null) {
        setActiveTab('2')
        setTableType('rna')
      }
      setAllTabList(tabList.userProjectsDataTable)
    }
  }, [tabList])

  useEffect(() => {
    if (inputData && "genes" in inputData) {
      setGenes(inputData["genes"]);
      setInputState({ ...inputData });
    }
  }, [inputData]);


  const dispatchActionCommon = (postJsonBody) => {
    if (tableType && postJsonBody.table_type === "proteome") {
      setLoader(true)
      let return_data = BoxInformation('POST', postJsonBody)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          r_["status"] = 200
          setboxJson(r_)
        } else {
          setboxJson({ 'status': 204 })
        }
      })
        .catch((e) => {
          setboxJson({ 'status': 204 })
        });
    } else {
      let return_data = BoxInformation('POST', postJsonBody)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          r_["status"] = 200
          setboxJson(r_)
        } else {
          setboxJson({ 'status': 204 })
        }
      })
        .catch((e) => {
          setboxJson({ 'status': 204 })
        });
    }
  };


  useEffect(() => {
    if (inputState && "genes" in inputState && tableType) {

      let g = inputState["genes"];
      let dataJson = inputState;
      loadGenesDropdown(g);
      loadGenesDropdownMutation(g);
      setGene(g[0]);
      if (tableType === "proteome" || tableType === "rna") {
        dataJson["genes"] = g;
      }

      if (inputState.type !== "" && inputData["genes"].length > 0) {
        setLoader(true);
        dataJson["table_type"] = tableType;
        dataJson["view"] = viewType;
        dispatchActionCommon(dataJson);
        setNoGeneData(false)
      } else {
        setNoGeneData(true)
      }
    }
  }, [inputState, tableType]);

  let takeScreenshot = async () => {
    const element = document.getElementById('box2').children[0]
    var xml = new XMLSerializer().serializeToString(element);
    var svg64 = btoa(unescape(encodeURIComponent(xml))) //for utf8: btoa(unescape(encodeURIComponent(xml)))
    var b64start = 'data:image/svg+xml;base64,';
    var image64 = b64start + svg64;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = image64;
    downloadLink.target = '_self';
    downloadLink.download = 'box.svg';
    downloadLink.click();
  }

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark");
    } else {
      setWatermarkCSS("");
    }
    if (watermarkCss !== "" && screenCapture) {
      takeScreenshot()
      setToFalseAfterScreenCapture();
    }
  }, [screenCapture, watermarkCss]);

  useEffect(() => {
    if (boxJson) {
      if (boxJson.status === 200) {
        setShowBoxPlot(true);
        setNoContent(false);
        setLoader(false)
      } else {
        setShowBoxPlot(false);
        setNoContent(true);
        setLoader(false)
      }

    }

  }, [boxJson]);

  const loadGenesDropdown = (genes) => {
    let t = [];
    for (var i = 0; i < genes.length; i++) {
      t.push({ name: genes[i], id: i });
    }
    setGenesHtml(t);
  };

  const loadGenesDropdownMutation = (genes) => {
    let t = [];
    let t_ = [];
    for (var i = 0; i < genes.length; i++) {
      t_.push(
        <option key={i + "_" + genes[i]} value={genes[i]}>
          {genes[i]}
        </option>
      );
      t.push({ name: genes[i], id: i });
    }
    setGenesHtml(t);
  };


  function onSelect(selectedList, selectedItem) {
    let genes = [];
    setSelectedValue(selectedList);
    selectedList.forEach((item, i) => {
      genes.push(item["name"]);
    });
    if (inputData.type !== "" && inputData["genes"].length > 0) {
      let dataJson = { ...inputData };
      dataJson["genes"] = genes;
      dataJson["table_type"] = tableType;
      dataJson["view"] = viewType;
      setLoader(true);
      dispatchActionCommon(dataJson);
    }
  }

  function onRemove(selectedList, removedItem) {
    let genes = [];
    setSelectedValue(selectedList);
    selectedList.forEach((item, i) => {
      genes.push(item["name"]);
    });
    if (genes.length === 0) {
      genes = inputState["genes"];
    }
    if (inputData.type !== "" && inputData["genes"].length > 0) {
      let dataJson = { ...inputData };
      dataJson["genes"] = genes;
      dataJson["table_type"] = tableType;
      dataJson["view"] = viewType;

      setLoader(true);
      dispatchActionCommon(dataJson);
    }
  }

  const changeType = (e, type) => {
    let c = document.getElementsByName("type");
    setTableType(type);
    setLoader(true);
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList;
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100");
    }
    e.target.classList.add("hover:bg-main-blue", "bg-main-blue", "text-white");
    let dataJson = inputState;
    if (inputData.type !== "") {
      let gene_ = selectedValue.map((x) => x["name"]);
      if (gene_.length <= 0) {
        gene_ = [gene];
      }
      setSelectedValue([]);
      dataJson["genes"] = genes;
      dataJson["table_type"] = type;
      dataJson["view"] = viewType;
      dispatchActionCommon(dataJson);
    }
  };

  const changeView = (e, view) => {
    let c = document.getElementsByName("view");
    setLoader(true);
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList;
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100");
    }
    e.target.classList.add("hover:bg-main-blue", "bg-main-blue", "text-white");
    setViewType(view);

    let dataJson = inputState;
    if (inputData.type !== "" && inputData["genes"].length > 0) {
      dataJson["table_type"] = tableType;
      dataJson["view"] = view;
      dispatchActionCommon(dataJson);
    }
    setSelectedValue([])
  };

  let style = {
    multiselectContainer: {
      marginTop: "5px",
    },
    inputField: {
      padding: "5px",
    },
  };

  let selected_button = "";
  selected_button +=
    "rounded-r-none  hover:scale-110 focus:outline-none flex lg:p-5 sm:p-2 lg:px-10 md:px-10 sm:px-8 sm:text-xl lg:text-2xl ";
  selected_button += " rounded font-bold cursor-pointer hover:bg-main-blue ";
  selected_button +=
    " bg-main-blue text-white border duration-200 ease-in-out transition xs:p-3 xs:text-sm";

  let normal_button = "";
  normal_button +=
    "rounded-l-none  hover:scale-110 focus:outline-none flex justify-center lg:p-5 sm:p-2 lg:px-10 sm:px-8  sm:text-xl lg:text-2xl ";
  normal_button +=
    " rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 ";
  normal_button +=
    " border duration-200 ease-in-out border-teal-600 transition px-10 xs:p-3 xs:text-sm";

  return (
    <div className="main_div" style={{ marginTop: '5%', border: '1px solid #d6d6d6', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)', position: 'relative', padding: '5%' }}>
      <div className="cnv_sub_head">
        <div className="tabs_box Flex Gap5">
          <div className="tab">
            <div className="tab_main">
              <ul>
                <li className='on'> <button name='type' > <FormattedMessage id="TumorVsNormal" defaultMessage="Tumor Vs Normal" /> </button></li>
              </ul>
            </div>
          </div>
          <div className="tab">
            <div className="tab_main">
              <ul>
                {project_id === undefined &&
                  <li className={activeTab === '1' ? 'on' : ''}> <button onClick={e => {
                    if (alltabList['proteome'] !== null) {
                      changeType(e, 'proteome')
                      setActiveTab('1')
                    }
                  }} name='type' > <FormattedMessage id="Proteome" defaultMessage="Proteome" /> </button></li>
                }

                {(project_id && alltabList['proteome']) &&
                  <li className={activeTab === '1' ? 'on' : ''}> <button onClick={e => {
                    if (alltabList['proteome'] !== null) {
                      changeType(e, 'proteome')
                      setActiveTab('1')
                    }
                  }} name='type' > <FormattedMessage id="Proteome" defaultMessage="Proteome" /> </button></li>
                }

                {project_id === undefined &&
                  <li className={activeTab === '2' ? 'on' : ''}> <button onClick={e => {
                    if (alltabList['proteome'] !== null) {
                      changeType(e, 'rna')
                      setActiveTab('2')
                    }
                  }} name='type' > <FormattedMessage id="RNA" defaultMessage="RNA" /> </button></li>
                }

                {(project_id && alltabList['rna']) &&
                  <li className={activeTab === '2' ? 'on' : ''}> <button onClick={e => {
                    if (alltabList['rna'] !== null) {
                      changeType(e, 'rna')
                      setActiveTab('2')
                    }
                  }} name='type' > <FormattedMessage id="RNA" defaultMessage="RNA" /> </button></li>
                }

              </ul>
            </div>
          </div>
        </div>


        <div className="box_gap">
          <div className="">
            <>
              <label className="">
                <FormattedMessage
                  id="Selected Gene Is"
                  defaultMessage="Selected Gene Is"
                />
              </label>
              <Multiselect
                options={genesHtml} // Options to display in the dropdown
                selectedValues={selectedValue} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                style={style}
              />{" "}
            </>

          </div>
          <div className="">
            <FormattedMessage id="View_By_heatmap" defaultMessage="View By" />:
            <div className="tab">
              <div className="tab_main">
                <ul>
                  <li className={selectedType === '1' ? 'on' : ''}>  <button
                    onClick={(e) => {
                      changeView(e, "gene_vl")
                      setSelectedType('1')
                    }}
                    name="view"
                    className={
                      viewType === "gene_vl" ? selected_button : normal_button
                    }
                  >
                    Raw count
                  </button>
                  </li>
                  <li className={selectedType === '2' ? 'on' : ''}>
                    <button
                      onClick={(e) => {
                        changeView(e, "z_score")
                        setSelectedType('2')
                      }}
                      name="view"
                      className={
                        viewType === "z_score" ? selected_button : normal_button
                      }
                    >
                      Normalization
                    </button>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader ? (
        <LoaderCmp />
      ) : (
        boxJson && (
          <>
            <div className="boxplot_tooltip" id="box2_tooltip" style={{ width: '150px', float: 'right' }}></div>
            {tableType && <p className="text_align" style={{ marginBottom: '30px' }}>{tableType === 'proteome' ? <FormattedMessage id="BoxTvNDesc" defaultMessage="Proteome expression of Tumor samples vs Normal samples" /> : <FormattedMessage id="BoxRnaDesc" defaultMessage="RNA expression of Tumor samples vs Normal samples" />}</p>}
            {showBoxPlot && (
              <BoxPlot
                view_type={viewType}
                box_data={boxJson}
                chart_type={tableType}
                ref={reference}
                watermarkCss={watermarkCss}
                width={width}
              />
            )}

            {noContent && <NoContentMessage />}
          </>
        )
      )}
      {noGeneData && <p className='py-3'><FormattedMessage id="PleaseSelecttheGeneSetData" defaultMessage="Please Select the Gene Set Data" /></p>}

    </div>
  );
}
