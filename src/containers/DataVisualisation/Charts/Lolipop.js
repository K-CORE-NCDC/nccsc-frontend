import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector } from "react-redux";
import LollipopCmp from '../../Common/Lollipop'
import { LolipopInformation } from '../../../actions/api_actions'
import { exportComponentAsJPEG } from 'react-component-export-image';
import LoaderCmp from '../../Common/Loader'
import DataTable from 'react-data-table-component';
import NoContentMessage from '../../Common/NoContentComponent';
import { FormattedMessage } from 'react-intl';
import { useParams, useHistory } from "react-router-dom";
import '../../../styles/css/lollipop.css'

export default function DataLolipop({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const history = useHistory();
  const [genesHtml, setGenesHtml] = useState([])
  const [gene, setGene] = useState('')
  const [activeCmp, setActiveCmp] = useState(true)
  const [tableType, setTableType] = useState('Mutation')
  const [inputState, setInputState] = useState({})
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [lolipopJson, setLolipopJson] = useState({ data: [], domains: [], status: 204 })
  const [loader, setLoader] = useState(false)
  const [tableData, setTableData] = useState([])
  const [state, setState] = useState({ "domains": [], "lollipop": [], "width": 0, 'height': 0 })
  const [mutationLabel, setMutationLabel] = useState([])
  const [tableColumnsData, setTableColumnsData] = useState([])
  const [enstId, setEnstId] = useState([])
  const [refSeqId, setRefSeqId] = useState([])
  const [showLollipop, setShowLollipop] = useState(false)
  const [noContent, setNoContent] = useState(true)
  const [noGeneData, setNoGeneData] = useState(false)
  const [percentage, setPercentage] = useState("")
  const [alltabList, setAllTabList] = useState({});
  let { project_id } = useParams();
  const [activeTab, setActiveTab] = useState('1')
  const [btnClickNote, setBtnClickNote] = useState(false)

  const tabList = useSelector(
    (data) => data.dataVisualizationReducer
  );

  useEffect(() => {
    if ('userProjectsDataTable' in tabList) {
      let _data = tabList.userProjectsDataTable
      if (_data?.viz_type === 'single') {
        if (_data["phospho"] !== null) {
          setActiveTab('2')
          setTableType('phospho')
        } else if (_data["dna_mutation"]) {
          setActiveTab('1')
        }
      } else {
        setActiveTab('1')
      }
      setAllTabList(tabList.userProjectsDataTable)
    }

  }, [tabList])

  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  let mutation_colors = {
    'In_Frame_Del': '#1b4879',
    'In_Frame_Ins': '#c74951',
    'Frame_Shift_Del': '#603d92',
    'Frame_Shift_Ins': '#3778ae',
    'Nonsense_Mutation': '#d3352b',
    'Splice_Site': '#f28432',
    'Germline': '#000000',
    'Missense_Mutation': '#549d3e'
  }

  let phospo_colors = {
    "S": "#1b4879",
    "T": '#603d92',
    "Y": '#d3352b'
  }

  const geneSet = (e) => {
    let gene = e.target.value
    setGene(gene)
    if (inputData.type !== '' && inputState.genes.length > 0) {
      let dataJson = { ...inputData }
      dataJson['genes'] = gene
      dataJson['table_type'] = tableType
      setLoader(true)
      setActiveCmp(false)
      let return_data = LolipopInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          r_["status"] = 200
          setLolipopJson(r_)
          setLoader(false)
          setNoContent(false)
          setActiveCmp(true)
        } else {
          setLoader(false)
          setNoContent(true)
          setActiveCmp(true)
          setLolipopJson({ data: [], domains: [], status: 204 })
        }
      })
        .catch((e) => {
          setLolipopJson({ data: [], domains: [], status: 204 })
          history.push('/notfound')
        });
    }
  }

  const loadGenesDropdown = (genes) => {

    let t = []
    for (var i = 0; i < genes.length; i++) {
      t.push(
        <option key={i + '_' + genes[i]} value={genes[i]}>
          {genes[i]}
        </option>
      )
    }
    setGenesHtml(t)
  }

  useEffect(() => {
    if (inputData && 'genes' in inputData) {
      setInputState((prevState) => ({ ...prevState, ...inputData }))
    }
  }, [inputData])

  useEffect(() => {
    console.log('inputState' , inputState)
    if (inputState && 'genes' in inputState) {
      let g = inputState['genes']
      loadGenesDropdown(g)
      setGene(g[0])
      if (inputState.type !== '') {
        let dataJson = inputState
        setLoader(true)
        dataJson['genes'] = g[0]
        dataJson['table_type'] = tableType
        let return_data = LolipopInformation('POST', dataJson)
        return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            r_["status"] = 200
            setLolipopJson(r_)
            setLoader(false)
            setNoContent(false)
            setActiveCmp(true)
          } else {
            setLoader(false)
            setNoContent(true)
            setActiveCmp(true)
            setLolipopJson({ data: [], domains: [], status: 204 })
          }
        })
          .catch((e) => {
            setLolipopJson({ data: [], domains: [], status: 204 })
            history.push('/notfound')
          });
        setNoGeneData(false)
      }
      setTableType(tableType)
    }
    else {
      setNoGeneData(true)
    }
  }, [inputState])

 

  const generateColor = () => {
    var letters = "0123456789ABCDEF";
    var color = '#';
    for (var i = 0; i < 6; i++)
      color += letters[(Math.floor(Math.random() * 16))];
    return color
  }

  useEffect(() => {
    if (lolipopJson && lolipopJson.status === 200) {
      if (Object.keys(lolipopJson).length > 0) {
        let domains = []
        let lollipop = []
        let lollipopLegenedTmp = {}
        let lollipopTmp = {}
        var width = []
        let data = lolipopJson['data']

        let table_data = []
        let table_cols = []
        let enst_id = []
        let refseq_id = []
        let sample_length = []
        let unique_sample = []
        // setPercentage(lolipopJson['percentage'])
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            sample_length.push(data[i]['sample'])
            if (tableType === "Mutation") {
              let vc_sample = data[i]['variant_classification']
              if (vc_sample in lollipopLegenedTmp) {
                if (lollipopLegenedTmp[vc_sample].includes(data[i].sample) === false) {
                  lollipopLegenedTmp[vc_sample].push(data[i].sample)
                  unique_sample.push(data[i].sample)
                }
              } else {
                lollipopLegenedTmp[vc_sample] = [data[i].sample]
                unique_sample.push(data[i].sample)
              }
              if (data[i]['protein']) {
                let protein = data[i]['protein'].replace(/[^\d]/g, '');
                let p_vc = protein + "||" + data[i]['variant_classification']
                if (p_vc in lollipopTmp) {
                  lollipopTmp[p_vc].push(data[i]['sample'] + "||" + data[i]['protein'])
                } else {
                  lollipopTmp[p_vc] = [data[i]['sample'] + "||" + data[i]['protein']]
                }
              }
              console.log('BrstKeys', BrstKeys)
              table_data?.push({
                "sample": BrstKeys[data[i]['sample']],
                "protein": data[i]['protein'],
                "variant_classification": data[i]['variant_classification']
              })
              refseq_id?.push(data[i]['refseq_mrna_id'])
              enst_id?.push(data[i]['annotation_transcript'])

            } else if (tableType === "Phospho") {
              let site_sample = data[i]['site'].split(' ')
              let regex = /\D/g;
              for (var k = 0; k < site_sample.length; k++) {
                let phospho_num = site_sample[k].replace(regex, "");
                width.push(parseInt(phospho_num))
                if (site_sample[k] in lollipopLegenedTmp) {
                  if (lollipopLegenedTmp[site_sample[k]].includes(data[i].sample) === false) {
                    lollipopLegenedTmp[site_sample[k]].push(data[i].sample)
                    unique_sample.push(data[i].sample)
                  }
                }
                else {
                  lollipopLegenedTmp[site_sample[k]] = [data[i].sample]
                  unique_sample.push(data[i].sample)
                }
              }
              table_data?.push({
                "sample": BrstKeys[data[i]['sample']],
                "site": data[i]['site'],
                "gene": gene
              })
            }
          }
        }

        setRefSeqId([...new Set(refseq_id)])
        setEnstId([...new Set(enst_id)])
        let tmp = []
        let height = []
        let colors
        if (tableType === "Mutation") {
          table_cols = [
            {
              name: <FormattedMessage id="sampleid" defaultMessage="Sample Id" />,
              selector: row => row.sample,
              sortable: true
            },
            {
              name: <FormattedMessage id="ProtienChange" defaultMessage="Protein Change" />,
              selector: row => row.protein,
              sortable: true
            },
            {
              name: <FormattedMessage id="MutationType" defaultMessage="Mutation Type" />,
              selector: row => row.variant_classification,
              sortable: true
            }
          ]

          colors = mutation_colors
          for (var key in mutation_colors) {
            let count = 0
            if (key in lollipopLegenedTmp) {
              count = lollipopLegenedTmp[key].length
            }
            tmp.push(
              <div className='p-3' key={key} >
                <span style={{ 'backgroundColor': colors[key] }} className="data_bubbles">
                  {count}
                </span>
                <span style={{ 'color': colors[key] }}><strong className="xs:text-sm sm:text-xl">{key}</strong></span>
              </div>
            )
            for (var vc in lollipopTmp) {
              if (vc.includes(key)) {
                let codon = vc.split("||")
                lollipop.push({
                  "codon": parseInt(codon[0]),
                  'count': lollipopTmp[vc].length,
                  'color': colors[key],
                  'tooltip': {
                    'header': 'Protein Change',
                    'body': lollipopTmp[vc][0].split('||')[1] + "\n Samples Count : " + lollipopTmp[vc].length
                  },

                })
                height.push(lollipopTmp[vc].length)
              }
            }
          }
        } else {
          table_cols = [
            {
              name: <FormattedMessage id="sampleid" defaultMessage="Sample Id" />,
              selector: row => row.sample,
              sortable: true
            },
            {
              name: <FormattedMessage id="Site" defaultMessage="Site" />,
              selector: row => row.site,
              sortable: true
            },
            {
              name: <FormattedMessage id="Gene" defaultMessage="Gene" />,
              selector: row => row.gene,
              sortable: true
            }
          ]
          tmp.push(
            <div className='p-3' key='total_site'>
              <FormattedMessage id='TotalSite' defaultMessage="Total Site :" />
            </div>
          )
          colors = phospo_colors
          let phospho_tmp = {}
          for (let key in lollipopLegenedTmp) {
            let name = key.substring(0, 1)
            if (name in phospho_tmp) {
              phospho_tmp[name] += lollipopLegenedTmp[key].length
            } else {
              phospho_tmp[name] = lollipopLegenedTmp[key].length
            }
            let position = key.replace(/[^\d]/g, '');
            lollipop.push({
              "codon": parseInt(position),
              'count': lollipopLegenedTmp[key].length,
              'color': colors[key.substring(0, 1)],
              'tooltip': {
                'header': key + ' Site',
                'body': lollipopLegenedTmp[key].length + ' : Phosphorylation'
              }

            })

            height.push(lollipopLegenedTmp[key].length)
          }
          for (let key in phospo_colors) {
            let name = key
            let count = 0
            if (key in phospho_tmp) {
              count = phospho_tmp[key]
            }
            tmp.push(
              <div className='p-3' key={key}>
                <span style={{ 'backgroundColor': colors[name] }} className="inline-flex items-center justify-center px-3 mr-3 pb-1 lg:text-md sm:text-xl font-bold leading-none text-white rounded-full">
                  {count}
                </span>
                <span style={{ 'color': colors[key] }}>
                  <strong className="sm:text-xl lg:text-2xl">{name}</strong>
                </span>
              </div>
            )
          }
          tmp.push(<div className='p-3' key={'major'}> <FormattedMessage id="MajorSite" defaultMessage=" / Major Site :" /></div>)
          for (let key in lollipopLegenedTmp) {
            tmp.push(<div className='p-3' key={key}>
              <span ><strong>{key + "(" + lollipopLegenedTmp[key].length + ")"}</strong></span>
            </div>)
          }
        }

        let domains_data = lolipopJson['domains']

        for (let i = 0; i < domains_data.length; i++) {
          let l = (domains_data[i].end - domains_data[i].start) / domains_data[i]['domain'].length
          let name = domains_data[i]['domain'].substring(0, l)
          if (name === '') {
            name = domains_data[i]['domain'].substring(0, 1)
          }


          width.push(domains_data[i]['end'])


          domains.push({
            "startCodon": domains_data[i]['start'],
            "endCodon": domains_data[i]['end'],
            "label": name + '...',
            'color': generateColor(),
            'tooltip': {
              "body": domains_data[i]['domain'] + " (" + domains_data[i]['start'] + " - " + domains_data[i]['end'] + ")"
            }

          })
        }

        // }


        let w = 300
        let h = 10
        if (width.length > 0) w = Math.max(...width)
        if (height.length > 0) h = Math.max(...height)

        let u_sample = [...new Set(unique_sample)]
        let total_smaples = Object.keys(BrstKeys).length
        let sm_frequency = (u_sample.length / total_smaples) * 100
        setPercentage(sm_frequency.toFixed(3))
        setMutationLabel(tmp)
        setTableData(table_data)
        setTableColumnsData(table_cols)
        setState((prevState) => ({
          ...prevState,
          'domains': domains,
          'lollipop': lollipop,
          "width": w + 100,
          "height": h + 10
        }))

        setActiveCmp(true)
        setLoader(false)
      }
      setShowLollipop(true)
      setNoContent(false)
    }
    else {
      setShowLollipop(false)
      setNoContent(true)
    }
  }, [lolipopJson])

  useEffect(() => {
    if (activeCmp) {
      let c = document.getElementsByName('type')
      for (var i = 0; i < c.length; i++) {
        let classList = c[i].classList
        classList?.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
        classList?.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
      }
      document?.getElementById(tableType)?.classList?.add("hover:bg-main-blue", "bg-main-blue", "text-white")
    }
  }, [activeCmp])


  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }
    if (watermarkCss !== "" && screenCapture) {
      exportComponentAsJPEG(reference, { fileName: 'Lollipop' })
      setToFalseAfterScreenCapture()
    }
  }, [screenCapture, watermarkCss])


  const changeType = (e, type) => {
    let c = document.getElementsByName('type')
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue", "bg-main-blue", "text-white");
      classList.add("text-teal-700", "hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue", "bg-main-blue", "text-white")
    setTableType(type)
    setActiveCmp(false)
    setLoader(true)
    if (inputData.type !== '' && inputState.genes.length > 0) {
      let dataJson = { ...inputData }
      dataJson['genes'] = gene
      dataJson['table_type'] = type
      let return_data = LolipopInformation('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          r_["status"] = 200
          setLolipopJson(r_)
          setLoader(false)
          setNoContent(false)
          setActiveCmp(true)
        } else {
          setNoContent(true)
          setLoader(false)
          setActiveCmp(true)
          setLolipopJson({ data: [], domains: [], status: 204 })
        }
      })
        .catch((e) => {
          setLolipopJson({ data: [], domains: [], status: 204 })
          history.push('/notfound')
        });
    }
  }

  return (
    <>{
      loader ?
        <LoaderCmp />
        :
        <div style={{ marginTop: '5%', border: '1px solid #d6d6d6', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)', position: 'relative', padding: '5%' }}>
          {activeCmp &&
            <Fragment>
              <div className="tabs_box">
                <div className="tab">
                  {btnClickNote ? <> <p style={{color:'red'}}>No {activeTab !== '1' ? 'mutation' : 'phospho'} file</p> </> : ''}
                  <div className="tab_main">
                    <ul>
                   
                      <li className={activeTab === '1' ? 'on' : ''}> <button  onClick={(e) => {
                        if (alltabList['dna_mutation'] === null) {
                          setBtnClickNote(true)
                        } else {
                          changeType(e, 'Mutation')
                          setActiveTab('1')
                          setBtnClickNote(false)
                        }
                      }} name='type' >  <FormattedMessage id="Mutation" defaultMessage='Mutation' /> </button></li>
                     
                      <li className={activeTab === '2' ? 'on' : ''}> <button id='Phospho'
                        onClick={(e) => {
                          if (alltabList['phospho'] === null) {
                            setBtnClickNote(true)
                          } else {
                            changeType(e, 'Phospho')
                            setActiveTab('2')
                            setBtnClickNote(false)
                          }
                        }} name='type' >  <FormattedMessage id="Phospho" defaultMessage='Phospho' /> </button></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='selectionGenes'>
                <div >
                  <div><FormattedMessage id="Selected Gene" defaultMessage='Selected Gene Is' /></div>
                  <div>
                    <select defaultValue={gene} onChange={e => geneSet(e)}>
                      {genesHtml}
                    </select>
                  </div>
                </div>
              </div>
              <>
                {noContent && <NoContentMessage />}
                {
                  showLollipop && <div className='' style={{ position: 'relative' }}>
                    <div className='chart_box'>
                      <LollipopCmp watermarkCss={watermarkCss} ref={reference} width={width} type={tableType}
                        gene={gene}
                        data={state}
                      />
                      {tableType === "Mutation" &&
                        <div className='id_lists' >
                          <div className='box' >
                            <label >Enst Id List</label>
                            <textarea defaultValue={enstId.join("\n")} className="" rows="4" ></textarea>
                          </div>
                          <div className='box' >
                            <label >Refseq MRNA Id List</label>
                            <textarea defaultValue={refSeqId.join("\n")} className="" rows="4" ></textarea>
                          </div>
                        </div>
                      }
                    </div>
                    <div className='chart_dataBox'>
                      <div className="">
                        {tableType === "Mutation" && <h5 className=""> <FormattedMessage id="SomanticMutationFrequency" defaultMessage="Somatic Mutation Frequency: " />{percentage ? percentage : ""}<FormattedMessage id="SomanticMutationmutationsamplenumber/totalselectedsamplenumber(%)Frequency" defaultMessage="%(mutation sample number/total selected sample number(%))" /></h5>}
                        {tableType !== "Mutation" && <h5 className=""> <FormattedMessage id="PhosphorylationFrequency" defaultMessage="Phosphorylation Frequency: " />{percentage ? percentage : ""}<FormattedMessage id="Phosphorylationsamplenumber/totalselectedsamplenumber(%)" defaultMessage="%(Phosphorylation sample number/total selected sample number(%))" /></h5>}
                      </div>
                      <div className='mutation_labels'>
                        {mutationLabel}
                      </div>
                    </div>

                    {tableData.length > 0 && <div className="contentsTable" style={{ marginTop: '30px' }}>
                      <DataTable pagination
                        columns={tableColumnsData}
                        data={tableData}
                      />
                    </div>}
                  </div>}
              </>
            </Fragment>


          }
          {/* {noGeneData && <p><FormattedMessage id="PleaseSelecttheGeneSetData" defaultMessage="Please Select the Gene Set Data" /></p>} */}

        </div>
    }

    </>
  )

}
