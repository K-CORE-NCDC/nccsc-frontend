import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from "react-redux";
import HeatmapNewCmp from '../../Common/testH'
import { HeatmapInformation } from '../../../actions/api_actions'
import LoaderCmp from '../../Common/Loader'
import NoContentMessage from '../../Common/NoContentComponent'
import inputJson from '../../Common/data'
import Multiselect from 'multiselect-react-dropdown';
import { FormattedMessage } from 'react-intl';
import { Context } from "../../../wrapper";
import { useParams, useLocation } from "react-router-dom";
import '../../../styles/css/heatmap.css'

export default function DataHeatmap({ width, inputData, screenCapture, brstKeys, setToFalseAfterScreenCapture }) {
  const route = useLocation();
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const reference = useRef()
  const [tableType, setTableType] = useState('')
  const [data_, setData] = useState('')
  const [inputGene, setInputGene] = useState([])
  const [heatmapJson, setHeatmapJson] = useState([])
  const [heatmapSummaryStatusCode, setHeatmapSummaryStatusCode] = useState({ status: 0, loader: true })
  const filterData = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [rangeValue, setRangeValue] = useState(5)
  const [loader, setLoader] = useState(false)
  const [genes, setGenes] = useState([])
  const [selectedGene, setSelectedGene] = useState([])
  const [optionChoices, setOptionChoices] = useState([])
  const [option, setOption] = useState([])
  const [viewType, setViewType] = useState('gene_vl')
  const [mainTab, setMainTab] = useState('heatmap')
  const [clusterRange, setClusterRange] = useState("")
  const inSufficientData = false
  const [renderNoContent, setRenderNoContent] = useState(false)
  let { project_id } = useParams();
  const [configVis, setConfigVis] = useState({ "colorSpectrumBreaks": [], "colorSpectrum": ["navy", "firebrick3"] })
  const [spectrumMin, setSpectrumMin] = useState(0)
  const [spectrumMax, setSpectrumMax] = useState(0)
  const [clinincalAttributesFil, setClinicalAttributesFil] = useState([])
  const [noGeneData, setNoGeneData] = useState(true)
  const [alltabList, setAllTabList] = useState({});
  const [activeTab, setActiveTab] = useState('1')
  const [btnClickNote, setBtnClickNote] = useState('')
  const [selectedType, setSelectedType] = useState('1')
  const _width = width - width * (3 / 100)
  const [noData, setNoData] = useState(false)
  const [vizType, setVizType] = useState('')


  const tabList = useSelector(
    (data) => data.dataVisualizationReducer
  );

  let themes = [
    { "name": "Theme 1", "value": ["navy", "firebrick3"] },
    { "name": "Theme 2", "value": ["#F9F9F9", "#FCD200"] },
    { "name": "Theme 3", "value": ["#D0D0D0", "#006CE0"] },
    { "name": "Theme 4", "value": ["#FFFFFF", "#9900E0"] },

  ]

  useEffect(() => {
    if (route.pathname.includes('visualise-singledata') || route.pathname.includes('visualizesingle-exampledata')) {
      setVizType("single")
    }
    else {
      setVizType("multi")
    }
  }, [route.pathname])

  useEffect(() => {
    if ('userProjectsDataTable' in tabList) {
      let _data = tabList?.userProjectsDataTable
      if (_data?.viz_type === 'single') {
        if (_data["methylation"] !== null) {
          setActiveTab('2')
          setTableType('methylation')
        } else if (_data["proteome"] !== null) {
          setActiveTab('3')
          setTableType('proteome')
        } else if (_data["phospho"] !== null) {
          setActiveTab('4')
          setTableType('phospho')
        } else if (_data["rna"] !== null) {
          setActiveTab('1')
          setTableType('rna')
        }
      } else {
        setActiveTab('1')
        setTableType('rna')
      }
      setAllTabList(tabList.userProjectsDataTable)
    } else {
      setActiveTab('1')
      setTableType('rna')
    }
  }, [tabList])


  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
    } else {
      setKoreanlanguage(false);
    }
  }, [context]);

  const diag_age = (vl) => {
    let n = parseInt(vl)
    let tmp = ''
    if (n > 20 && n <= 25) {
      tmp = '21~25'
    } else if (n > 25 && n <= 30) {
      tmp = '26~30'
    } else if (n > 30 && n <= 35) {
      tmp = '31~35'
    } else if (n > 35 && n <= 40) {
      tmp = '36~40'
    }
    return tmp
  }

  const bim_vl = (vl) => {
    let n = parseInt(vl)
    let tmp = ''
    if (n < 18.5) {
      tmp = '~18.5'
    } else if (n > 18.5 && n <= 25) {
      tmp = '18.5 ~ 25'
    } else if (n > 25 && n <= 30) {
      tmp = '25.1~30'
    } else if (n > 30) {
      tmp = '30.1~'
    }
    return tmp
  }

  useEffect(() => {
    if (inputJson['filterChoices']) {
      if (project_id !== undefined) {
        if (filterData && filterData.status === 200) {
          let filters = filterData['filterJson']
          filters = filters['Clinical Information']
          let tmp = []
          for (const key in filters) {
            if (filters[key].length > 0) {
              if (filters[key][0]['type'] !== 'number' && filters[key][0]['name'] !== 'rlps_yn') {
                tmp.push({ "name": key, "id": key })
              }
            }

          }
          setOptionChoices(tmp)
        }
      } else {
        if (koreanlanguage) {
          if (inputJson['filterChoicesKorean']) {
            let f = inputJson['filterChoicesKorean']
            setOptionChoices(f)
          }
        } else {

          if (inputJson['filterChoices']) {
            let f = inputJson['filterChoices']
            setOptionChoices(f)
          }
        }
      }
    }
  }, [koreanlanguage, filterData, project_id])


  useEffect(() => {
    if (inputData && tableType !== '') {
      let genes = inputData['genes']
      let t = []
      for (var i = 0; i < genes.length; i++) {
        t.push(<option key={i} value={genes[i]}>{genes[i]}</option>)
      }
      setInputGene(t)
      setGenes(genes)
      setSelectedGene([genes[0]])
      if (inputData.type !== '' && inputData['genes'].length > 0) {
        setLoader(true)
        inputData['table_type'] = tableType
        inputData['view'] = viewType
        inputData['heat_type'] = mainTab
        let return_data = HeatmapInformation('POST', inputData)
        return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            if (r_) {
              setHeatmapJson(r_)
              setHeatmapSummaryStatusCode({ status: 200 })
            }

          } else {
            setHeatmapJson([])
            setHeatmapSummaryStatusCode({ status: 204 })
          }
        })
          .catch((e) => {
            setHeatmapJson([])
            setHeatmapSummaryStatusCode({ status: 204 })
          });
        setNoGeneData(false)
      } else {
        setNoGeneData(true)
      }
    }

  }, [inputData, tableType])


  useEffect(() => {
    if (heatmapJson?.data?.length > 0 && brstKeys) {
      setNoData(false)
      let genes = []
      let unique_sample_values = {}
      let unique_cf = {}
      let z = {}
      let optn = {}
      if (option.length > 0) {
        for (let opt = 0; opt < option.length; opt++) {
          unique_cf[option[opt].id] = []
          z[option[opt].id] = []
          optn[option[opt].id] = option[opt].name
        }
      }

      let d_ = heatmapJson['data']

      if (d_ !== "" && d_ !== undefined) {
        d_ && d_.forEach((item, i) => {
          if (tableType === 'phospho' || tableType === 'methylation') {
            if (!genes.includes(item['gene_name_site'])) {
              genes.push(item['gene_name_site'])
            }
          } else {
            if (!genes.includes(item['gene_name'])) {
              genes.push(item['gene_name'])
            }
          }


          let breast_key = brstKeys[item['pt_sbst_no']]
          if (breast_key in unique_sample_values) {
            unique_sample_values[breast_key].push(item["gene_vl"])
          } else {
            unique_sample_values[breast_key] = []
            unique_sample_values[breast_key].push(item["gene_vl"])
          }
          if (option.length > 0) {
            for (let opt = 0; opt < option.length; opt++) {
              if (!(breast_key in unique_cf[option[opt].id])) {
                unique_cf[option[opt].id][breast_key] = item[option[opt].id]
              }
            }
          }
        });
      }

      let y = {
        "smps": genes,
        "vars": [],
        "data": []
      }

      let x = {}
      if (mainTab === "k-mean") {
        if (heatmapJson && ('clusters' in heatmapJson)) {
          x = {
            "Cluster": heatmapJson['clusters'],
          }
        }
      }

      Object.keys(unique_sample_values).forEach((key, i) => {
        y["vars"].push(key)
        y['data'].push(unique_sample_values[key])
        if (option.length > 0) {
          for (let opt = 0; opt < option.length; opt++) {
            if (option[opt].id === 'diag_age') {
              z[option[opt].id].push(diag_age(unique_cf[option[opt].id][key]))
            } else if (option[opt].id === 'bmi_vl') {
              z[option[opt].id].push(bim_vl(unique_cf[option[opt].id][key]))
            } else {
              z[option[opt].id].push(unique_cf[option[opt].id][key])
            }
          }
        }
      });

      let tmp = {}
      for (const key in z) {
        if (key in optn) {
          if (key.slice(-3) === '_yn') {
            for (let i = 0; i < z[key].length; i++) {
              if (z[key][i] === 1 || z[key][i] === true) {
                z[key][i] = 'True'
              }
              else if (z[key][i] === 0 || z[key][i] === false) {
                z[key][i] = 'False'
              }
              else {
                z[key][i] = 'Null'
              }
            }
          }
          tmp[optn[key]] = z[key]
        }
      }
      let setStateTrue = false
      for (const [key, value] of Object.entries(y)) {
        value.forEach(e => {
          if (e.length > 0) {
            setStateTrue = true
          }
        })
      }
      if (setStateTrue) {
        setRenderNoContent(false)
        setData({ "z": tmp, "x": x, "y": y })

      } else {
        setRenderNoContent(true)
      }
      setLoader(false)
    } else {
      if (heatmapSummaryStatusCode?.status === 204 && (heatmapJson?.data?.length === 0 || heatmapJson?.length === 0)) {
        setData("")
        setNoData(true)
        setLoader(false)
      }
    }
  }, [heatmapJson, brstKeys])




  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }

    if (watermarkCss !== "" && screenCapture) {
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])

  const changeType = (e, type) => {
    e.preventDefault()
    setTableType(type)
    let c = document.getElementsByName('type')
    setLoader(true)
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white", 'border-gray-600');
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue", "bg-main-blue", "text-white")
    let dataJson = { ...inputData }
    if (type === 'rna') {
      dataJson['genes'] = genes
    } else if (type === 'methylation') {
      dataJson['genes'] = selectedGene
    } else if (type === 'proteome') {
      dataJson['genes'] = genes
    } else if (type === 'phospho') {
      dataJson['genes'] = selectedGene
    }
    setOption([])
  }

  const changeMainType = (e, type) => {
    let c = document.getElementsByName('maintype')
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white", 'border-gray-600');
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue", "bg-main-blue", "text-white")
    setMainTab(type)
    setOption([])
    let dataJson = { ...inputData }
    if (inputData.type !== '' && inputData['genes'].length > 0) {
      setClusterRange(dataJson['genes'].length)
      setLoader(true)
      dataJson['table_type'] = tableType
      dataJson['view'] = viewType
      dataJson['heat_type'] = type
      setLoader(true)
      let return_data = HeatmapInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          setHeatmapJson(r_)
          setHeatmapSummaryStatusCode({ status: 200 })
        } else {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        }
      })
        .catch((e) => {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        });
    }
  }

  const setGene = (e) => {
    let gene = e.target.value
    setSelectedGene([gene])

    let dataJson = { ...inputData }
    if (tableType === 'rna') {
      dataJson['genes'] = genes
    } else if (tableType === 'methylation') {
      dataJson['genes'] = [gene]
    } else if (tableType === 'proteome') {
      dataJson['genes'] = genes
    } else if (tableType === 'phospho') {
      dataJson['genes'] = [gene]
    }

    if (inputData.type !== '' && inputData['genes'].length > 0) {
      dataJson['table_type'] = tableType
      dataJson['view'] = viewType
      dataJson['heat_type'] = mainTab
      setLoader(true)
      let return_data = HeatmapInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result

        if (d.status === 200) {
          let r_ = d["data"]
          setHeatmapJson(r_)
          setHeatmapSummaryStatusCode({ status: 200 })
        } else {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        }
      })
        .catch((e) => {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        });
    }
  }

  function onSelect(selectedList, selectedItem) {
    let cf = []
    setOption(selectedList)
    selectedList.forEach((item, i) => {
      cf.push(item['id'])
    });
    setClinicalAttributesFil(cf)
    if (inputData.type !== '' && inputData['genes'].length > 0) {
      setLoader(true)
      let dataJson = { ...inputData }
      dataJson['clinicalFilters'] = cf
      dataJson['view'] = viewType

      if ((tableType === "methylation") || (tableType === "phospho")) {
        dataJson['genes'] = selectedGene
      }
      dataJson['heat_type'] = mainTab
      dataJson['table_type'] = tableType
      let return_data = HeatmapInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          setHeatmapJson(r_)
          setHeatmapSummaryStatusCode({ status: 200 })
        } else {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        }
      })
        .catch((e) => {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        });
    }
  }

  function onRemove(selectedList, removedItem) {
    let items = []
    setOption(selectedList)
    selectedList.forEach((item, i) => {
      items.push(item['id'])
    });
    setClinicalAttributesFil(items)
    if (inputData.type !== '' && inputData['genes'].length > 0) {
      setLoader(true)
      let dataJson = { ...inputData }
      dataJson['clinicalFilters'] = items
      dataJson['view'] = viewType
      dataJson['heat_type'] = mainTab
      if ((tableType === "methylation") || (tableType === "phospho")) {
        dataJson['genes'] = selectedGene
      }
      let return_data = HeatmapInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          setHeatmapJson(r_)
          setHeatmapSummaryStatusCode({ status: 200 })
        } else {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        }
      })
        .catch((e) => {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        });
    }
  }

  const changeView = (e, view) => {
    let c = document.getElementsByName('view')
    setLoader(true)
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue", "bg-main-blue", "text-white")
    setViewType(view)
    let dataJson = { ...inputData }
    dataJson['view'] = view
    dataJson['heat_type'] = mainTab
    dataJson['clinicalFilters'] = clinincalAttributesFil
    if (inputData.type !== '' && inputData['genes'].length > 0) {
      let return_data = HeatmapInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          setHeatmapJson(r_)
          setHeatmapSummaryStatusCode({ status: 200 })
        } else {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        }
      })
        .catch((e) => {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        });
    }
  }

  let style = {
    multiselectContainer: {
      'marginTop': '5px'
    },
    inputField: {
      'padding': '5px'
    }
  }

  let selected_button = ''
  selected_button += "  hover:scale-110 focus:outline-none flex lg:p-5 sm:p-2 lg:px-10 md:px-10 sm:px-8 sm:w-40 md:w-80 "
  selected_button += " font-bold cursor-pointer hover:bg-main-blue "
  selected_button += " bg-main-blue text-white border border-teal-600 duration-200 ease-in-out transition xs:p-2  xs:w-28  text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md"

  let normal_button = ''
  normal_button += " hover:scale-110 focus:outline-none flex justify-center lg:p-5 sm:p-2 lg:px-10 sm:px-8 sm:w-40 md:w-80 "
  normal_button += " font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 "
  normal_button += " border duration-200 ease-in-out border-teal-600 transition px-10 xs:p-2 xs:w-28 text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md"

  function rangeCall(e) {
    setRangeValue(parseInt(e.target.value))
  }

  const changeCluster = () => {
    let cf = []
    if (inputData.type !== '' && inputData['genes'].length > 0) {
      setLoader(true)
      let dataJson = { ...inputData }
      dataJson['clinicalFilters'] = cf
      dataJson['view'] = viewType
      dataJson['type'] = viewType
      dataJson['heat_type'] = mainTab
      dataJson['cluster'] = rangeValue
      let return_data = HeatmapInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          setHeatmapJson(r_)
          setHeatmapSummaryStatusCode({ status: 200 })
        } else {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        }
      })
        .catch((e) => {
          setHeatmapJson([])
          setHeatmapSummaryStatusCode({ status: 204 })
        });
    }
  }

  const changeSepctrum = (e) => {
    setLoader(true)
    // eslint-disable-next-line no-useless-computed-key
    setConfigVis((prevState) => ({
      ...prevState,
      ['colorSpectrumBreaks']: [parseInt(spectrumMin), parseInt(spectrumMax)]
    }));

  }
  const changeTheme = (e) => {
    setLoader(true)
    let theme_name = e.target.value
    let colors = []
    for (let index = 0; index < themes.length; index++) {
      const row = themes[index];
      if (row['name'] === theme_name) {
        colors = row['value']
      }
    }
    setConfigVis((prevState) => ({
      ...prevState,
      ['colorSpectrum']: colors
    }));
  }

  useEffect(() => {
    setLoader(false)
  }, [configVis, noData])




  return (
    <div style={{ marginTop: '5%', border: '1px solid #d6d6d6', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)', position: 'relative' }}>
      <div style={{ padding: '5%' }}>
        <div>
          <div className="tab mainTab">
            <div className="tab_main" >
              <ul>
                <li className={mainTab === 'heatmap' ? 'on' : ''}>
                  <button type="button" name='maintype' onClick={(e) => {
                    setMainTab('heatmap')
                    changeMainType(e, 'heatmap')
                  }}>Heatmap</button>
                </li>
                <li className={mainTab === 'k-mean' ? 'on' : ''}>
                  <button type="button" name='maintype' onClick={(e) => {
                    setMainTab('k-mean')
                    changeMainType(e, 'k-mean')
                  }}>K-mean</button>
                </li>
              </ul>
            </div>
          </div>
          <div className='sub_head_heat'>
            <div className='selectBox'>
              <select onChange={(e) => {
                setActiveTab(e.target?.value)
                if (e.target.value === '1') {
                  changeType(e, 'rna')
                } else if (e.target.value === '2') {
                  changeType(e, 'methylation')
                } else if (e.target.value === '3') {
                  changeType(e, 'proteome')
                } else {
                  changeType(e, 'phospho')
                }

              }} className=''>
                <option key={'1'} value={"1"}>RNA</option>
                <option key={'2'} value={"2"}>Methylation</option>
                <option key={'3'} value={"3"}>Global Proteome</option>
                <option key={'4'} value={"4"}>Phospho</option>
              </select>
            </div>
            <div className="tabs_box" style={btnClickNote === '' ? { paddingTop: '22px' } : { paddingTop: '0px' }}>
              <div className="tab mainTab">
                {btnClickNote !== '' && <> <p style={{ color: 'red' }}>No {alltabList[btnClickNote] === null && btnClickNote} file</p> </>}
                <div className="tab_main">
                  <ul>
                    {project_id === undefined &&
                      <li className={activeTab === '1' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['rna'] === null) {
                          setBtnClickNote('rna')
                        } else {
                          changeType(e, 'rna')
                          setActiveTab('1')
                          setBtnClickNote('')
                        }
                      }} name='type' > RNA </button></li>}
                    {(project_id && alltabList['rna']) &&
                      <li className={activeTab === '1' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['rna'] === null) {
                          setBtnClickNote('rna')
                        } else {
                          changeType(e, 'rna')
                          setActiveTab('1')
                          setBtnClickNote('')
                        }
                      }} name='type' > RNA </button></li>}
                    {project_id === undefined &&
                      <li className={activeTab === '2' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['methylation'] === null) {
                          setBtnClickNote('methylation')
                        } else {
                          changeType(e, 'methylation')
                          setActiveTab('2')
                          setBtnClickNote('')
                        }
                      }} name='type' > Methylation </button></li>
                    }

                    {(project_id && alltabList['methylation']) &&
                      <li className={activeTab === '2' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['methylation'] === null) {
                          setBtnClickNote('methylation')
                        } else {
                          changeType(e, 'methylation')
                          setActiveTab('2')
                          setBtnClickNote('')
                        }
                      }} name='type' > Methylation </button></li>}

                    {project_id === undefined &&
                      <li className={activeTab === '3' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['proteome'] === null) {
                          setBtnClickNote('proteome')
                        } else {
                          changeType(e, 'proteome')
                          setActiveTab('3')
                          setBtnClickNote('')
                        }
                      }} name='type' > Global Proteome </button></li>}

                    {(project_id && alltabList['proteome']) &&
                      <li className={activeTab === '3' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['proteome'] === null) {
                          setBtnClickNote('proteome')
                        } else {
                          changeType(e, 'proteome')
                          setActiveTab('3')
                          setBtnClickNote('')
                        }
                      }} name='type' > Global Proteome </button></li>}

                    {project_id === undefined &&
                      <li className={activeTab === '4' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['phospho'] === null) {
                          setBtnClickNote('phospho')
                        } else {
                          changeType(e, 'phospho')
                          setActiveTab('4')
                          setBtnClickNote('')
                        }
                      }} name='type' > Phosphorylation </button></li>}

                    {(project_id && alltabList['phospho']) &&
                      <li className={activeTab === '4' ? 'on' : ''}> <button onClick={e => {
                        if (alltabList['phospho'] === null) {
                          setBtnClickNote('phospho')
                        } else {
                          changeType(e, 'phospho')
                          setActiveTab('4')
                          setBtnClickNote('')
                        }
                      }} name='type' > Phosphorylation </button></li>}
                  </ul>
                </div>
              </div>
            </div>


            <div className='GeneSelectionBox'>

              {(vizType !== 'single') && <div className='selectionBox'>
                <label><FormattedMessage id="Clinical_Filters_heatmap" defaultMessage='Clinical Attribute' />:</label>
                <Multiselect
                  style={style}
                  options={optionChoices} // Options to display in the dropdown
                  selectedValues={option} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>
              }
              {tableType !== 'methylation' && tableType !== 'phospho' &&
                <div className="selectionBox">
                  <FormattedMessage id="View_By_heatmap" defaultMessage='View By' />:
                  <div className="">
                    <div className="tab mainTab">
                      <div className="tab_main">
                        <ul>
                          <li className={selectedType === '1' ? 'on' : ''}>  <button
                            onClick={(e) => {
                              changeView(e, "gene_vl")
                              setSelectedType('1')
                            }}
                            name="view"

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

                            >
                              Normalization
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {(tableType === 'methylation' || tableType === 'phospho') &&
                <div className='selectionBox' >
                  {inputGene &&
                    <>
                      <label><FormattedMessage id="Select Gene" defaultMessage='Select Gene' /></label>
                      <select value={selectedGene[0]} onChange={e => setGene(e)} className="" >
                        {inputGene}
                      </select>
                    </>
                  }
                </div>
              }
            </div>
          </div>
        </div>

        <div className='GeneFilteringBox'>
          <div className=''>
            <label id="listbox-label" style={{ textAlign: 'left' }}>Color</label>
            <select onChange={(e) => changeTheme(e)} className=''>
              {
                themes.map(row =>
                  <option key={row['name']} value={row['name']}>{row['name']}</option>
                )
              }
            </select>
          </div>
          <div className=''>
            <label className="">Spectrum</label>
            <div className="Spectrum">
              <div className="">
                <input type="number" id='specturm_from' value={spectrumMin} onChange={(e) => setSpectrumMin(e.target.value)}
                  className=""
                />
              </div>
              <div className="">
                <div className="">
                  <b>-</b>
                </div>
              </div>
              <div className="">
                <input type="number" id='specturm_to' value={spectrumMax} onChange={(e) => setSpectrumMax(e.target.value)}
                  className=""
                />
              </div>
            </div>
          </div>
          <div className='Spectrumbtn'>
            <button onClick={(e) => changeSepctrum(e)} className='btn btnPrimary'>Apply</button>
          </div>

          {mainTab === 'k-mean' ?
            <div className='ClusterBox'>
              <div className="">
                <div className=''>
                  <div className='ClusterBtn'>
                    <span><label htmlFor="points"><strong className="">No. Of Cluster:  {rangeValue}</strong></label></span>
                    <div className=''>
                      <span className="material-icons" onClick={(e) => {
                        changeCluster(e)
                      }}>
                        add_task
                      </span>
                    </div>
                  </div>

                  <input type="range" className="custom-slider opacity-100"
                    id="points" name="points" min="1" step={1} max={clusterRange} defaultValue={rangeValue} onChange={rangeCall} />
                  <ul className="" id='tickmarks'>
                    <li key="min-range" className=""><span className="absolute">1</span></li>
                    <li key="max-range" className=""><span className="absolute">{clusterRange}</span></li>
                  </ul>
                </div>

              </div>
            </div>
            : ""
          }

        </div>
      </div>
      {loader ? <LoaderCmp /> : <div style={noGeneData === false ? { marginTop: '5%', display: 'inline-block', paddingBottom: '3%' } : { paddingBottom: '10%' }}>
        {(data_ && (inSufficientData !== true)) && <HeatmapNewCmp settings={configVis} clinicalFilter={optionChoices} inputData={data_} type={mainTab} watermarkCss={watermarkCss} ref={reference} width={_width} />
        }
        {(inSufficientData || renderNoContent || noData) && <NoContentMessage />}
        {noGeneData && <p ><FormattedMessage id="PleaseSelecttheGeneSetData" defaultMessage="Please Select the Gene Set Data" /></p>}
      </div>
      }


    </div>
  )
}
