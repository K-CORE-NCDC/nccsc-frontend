import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CircosCmp from '../../Common/Circos'
import NoContentMessage from '../../Common/NoContentComponent'
import PagenationTableComponent from '../../Common/PagenationTable'
import GraphsModal from '../../Common/circostimelineGraph'
import LoaderCmp from '../../Common/Loader'
import ImageGrid from '../../Common/ImageGrid'
import { getCircosInformation, getCircosTimelineTable, getOncoImages, getBreastKeys, getRNIDetails } from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';
import placeholder from '../../../assets/img/circos_ncc.png';
import { FormattedMessage } from 'react-intl';
import Report from '../../Common/Report';
import DataTable from 'react-data-table-component';
import { selector } from 'd3';



import PDFReport from '../../Common/PDFReport';



export default function DataCircos({ width, inputData, screenCapture, setToFalseAfterScreenCapture, toggle, state }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('')
  const circosJson = useSelector((data) => data.dataVisualizationReducer.circosSummary);
  // const fusionJson = useSelector((data) => data.dataVisualizationReducer.fusionData);
  const oncoImageJson = useSelector((data) => data.dataVisualizationReducer.oncoSampleImagesData);
  const circosTimelieTableData = useSelector(state => state.dataVisualizationReducer.circosTimelieTableData)
  const reportData = useSelector(state => state.dataVisualizationReducer.rniData)

  const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)
  const [showOncoImages, setShowOncoImages] = useState(false)
  const [showReportTable, setshowReportTable] = useState(false)
  const [showOncoTimelineTables, setShowOncoTimelineTables] = useState(false)
  const [showNoContent, setShowNoContent] = useState(false)
  const [renderCircos, setRenderCircos] = useState(false)
  const [samplesCount, setSamplesCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [basicInformationData, setBasicInformationData] = useState([])

  const [isReportClicked, setIsReportClicked]= useState(false)



  const tableColumnsData = [
    {
      name: <div><p>geneName</p>
                 </div>,
      selector: (row) => { return row.gene },
      sortable: true,
      classNames: ['report_sankey'],
      minWidth: '13%',
      // style: {
      //   minWidth: '15.2%',
      //   display: 'block',
      //   textAlign: 'center',
      //   lineHeight: '3.5',
      // }
    },

    {
      name: 'Yes',
      selector: row => {
        if (row.dna === 'YES') {
          if (row.gene in reportData['variant_info']) {
            let variants = reportData['variant_info'][row.gene]
            variants = variants.join('-')
            return <div data-bs-toggle="tooltip" title={variants}>{'O ' + "(" + reportData['variant_info'][row.gene].length + ")"}</div>
          } else {
            return row.dna

          }
        }
        else return ''
      },
      sortable: true,
      minWidth: '10.5%',
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        minWidth: '10.5%',
        display: 'block',
        lineHeight: '3.5',
      },

    },
    {
      name: 'No',
      selector: row => { if (row.dna === 'NO') { return 'O ' } else return '' },
      sortable: true,
      minWidth: '10.5%',
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        minWidth: '10.5%',
        display: 'block',
        lineHeight: '3.5',
      },
    },
    {
      name: 'High',
      selector: row => { if (row.rna === 'HIGH') { return 'O ' } else return '' },
      sortable: true,
      minWidth: '10.5%',
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        minWidth: '10.5%',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Intermediate',
      selector: row => { if (row.rna !== 'HIGH' && row.rna !== 'LOW' ) { return 'O ' } else return '' },
      sortable: true,
      minWidth: '10.5%',
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        minWidth: '10.5%',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Low',
      selector: row => { if (row.rna === 'LOW') { return 'O ' } else return '' },
      sortable: true,
      minWidth: '10.5%',
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        minWidth: '10.5%',
        display: 'block',
        lineHeight: '3.5',
      },
    },
    {
      name: 'High',
      selector: row => { if (row.proteome === 'HIGH') { return 'O ' } else return '' },
      sortable: true,
      minWidth: '10.5%',
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        minWidth: '10.5%',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Intermediate',
      selector: row => { if (row.proteome !== 'HIGH' && row.proteome !== 'LOW' ) { return 'O ' } else return '' },
      sortable: true,
      minWidth: '10.5%',
      style: {
        borderLeft: '1px solid #6F7378',
        borderRight: '1px solid #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        minWidth: '10.5%',
        display: 'block',
        lineHeight: '3.5',

      },
    },
    {
      name: 'Low',
      selector: row => { if (row.proteome === 'LOW') { return 'O ' } else return '' },
      sortable: true,
      style: {
        borderLeft: '1px solid #ABB0B8',
        borderRight: '1px solid #6F7378',
        boxSizing: 'border-box',
        textAlign: 'center',
        width: '10.5%',
        display: 'block',
        lineHeight: '3.5',
      },
    },
  ]



  const closeShowOncoImages = () => {
    setShowOncoImages(false)
  }

  const closeShowTimelineTables = () => {
    setShowOncoTimelineTables(false)
  }

  const oncoImagesClickFunction = () => {
    // setLoader(true)
    setShowOncoImages(true)
    dispatch(getOncoImages('POST', { sample_id: sampleKey }))
  }

  const timelineGraphClickFunction = () => {
    setShowOncoImages(false)
    setShowOncoTimelineTables(true)
    dispatch(getCircosTimelineTable('POST', { sample_id: sampleKey }))
  }


  const ReportDataFunction = () => {
    setshowReportTable(true)
    dispatch(getRNIDetails('POST', { rnid: sampleKey }))
  }

  useEffect(() => {
    if (reportData) {
      setTableData(reportData.genomic_summary)
      setBasicInformationData(reportData.basic_information)
      // setshowReportTable(true)
    }
  }, [reportData])

  const closeReportFunction = () => {
    setshowReportTable(false)
  }

  const isReportClickedFunction = (value)=>{
    setIsReportClicked(value)
  }





  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;
  function sortAlphaNum(a, b) {
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if (aA === bA) {
      var aN = parseInt(a.replace(reN, ""), 10);
      var bN = parseInt(b.replace(reN, ""), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  }

  useEffect(() => {

    if (circosSanpleRnidListData) {
      setSamplesCount(Object.keys(circosSanpleRnidListData).length)
    }
  }, [circosSanpleRnidListData])

  useEffect(() => {
    if (inputData) {
      if (sampleKey !== 'all') {
        let imageDocumentObject = document.getElementById('images')
        if (imageDocumentObject) {
          imageDocumentObject.classList.remove("opacity-50")
        }
        let tableDocumentObject = document.getElementById('tables')
        if (tableDocumentObject) {
          tableDocumentObject.classList.remove("opacity-50")
        }
      } else {
        let imageDocumentObject = document.getElementById('images')
        if (imageDocumentObject) {
          imageDocumentObject.classList.add("opacity-50")
        }
        let tableDocumentObject = document.getElementById('tables')
        if (tableDocumentObject) {
          tableDocumentObject.classList.add("opacity-50")
        }
      }

      let editInputData = inputData
      editInputData = { ...editInputData, sampleKey: sampleKey }
      dispatch(getBreastKeys(editInputData))
      if (editInputData.type !== '' && sampleKey != '') {

        setLoader(true)
        setRenderCircos(false)
        // dispatch(getBreastKeys(editInputData))
        dispatch(getCircosInformation('POST', editInputData))
      }
    }
  }, [inputData, sampleKey])

  useEffect(() => {

    return () => {
      dispatch(getBreastKeys({}))
    }
  }, [])

  useEffect(() => {
    if (inputData && inputData.genes.length > 0) {
      setDisplaySamples(true)
    } else {
      setDisplaySamples(false)
    }
  }, [inputData])


  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }
    if (watermarkCss !== "" && screenCapture) {
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }
  }, [screenCapture, watermarkCss])

  useEffect(() => {
    if (circosSanpleRnidListData) {
      let sampleListElementsTemp = []
      let brstKeysObject = {}
      Object.keys(circosSanpleRnidListData).forEach(e => {
        brstKeysObject = { ...brstKeysObject, [circosSanpleRnidListData[e]]: e }
      })
      let brstKeysArray = Object.keys(brstKeysObject).sort(sortAlphaNum)
      brstKeysArray.forEach((element) => {
        sampleListElementsTemp.push(<option className="xs:text-sm lg:text-xl" key={element} value={brstKeysObject[element]}>{element}</option>)
      })
      setSampleListElements(sampleListElementsTemp)
    }
  }, [circosSanpleRnidListData])

  useEffect(() => {
    setTimeout(function () {
      if (circosJson && circosJson.status !== 0) {
        setLoader(false)
        if (sampleKey !== 'all') {
          document.getElementById('images').classList.remove("opacity-50")
          document.getElementById('tables').classList.remove("opacity-50")
        } else {
          document.getElementById('images').classList.add("opacity-50")
          document.getElementById('tables').classList.add("opacity-50")
        }
      }
    }, (1000));
  }, [circosJson])

  useEffect(() => {
    if (circosJson && circosJson.status) {

      if (circosJson.status === 200 && Object.keys(circosJson).length > 1) {
        setShowNoContent(false)
        setRenderCircos(true)
      } else if (circosJson.status === 0) {
        setLoader(true)
        setShowNoContent(false)
        setRenderCircos(false)
      } else {
        setRenderCircos(false)
        setShowNoContent(true)
      }
    }

  }, [circosJson])


  var w = Math.floor((width / 100) * 75)

  return (
    <>{
      loader ?
        <LoaderCmp />
        :
        <div className="grid ">
          <div className={`p-1 grid xs:grid-cols-3 ${toggle ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}>
            <div className='flex xs:col-span-3 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-3'>
              <div className='flex-col text-left sm:w-2/6 xs:w-2/6'>
                {circosSanpleRnidListData &&
                  <div htmlFor="samples" className="lg:text-2xl sm:text-xl xs:text-sm"><FormattedMessage id="Cir_choose_sample" defaultMessage='Choose a Sample' />: ({samplesCount}) </div>}
                <select
                  className="w-full  border bg-white rounded px-3 py-4 outline-none lg:text-xl sm:text-xl xs:text-sm"
                  value={sampleKey}
                  onChange={e => setSampleKey(e.target.value)}
                  name="samples"
                  id="samples"
                >
                  <option className="xs:text-sm sm:text-sm lg:text-xl">--Select Sample--</option>
                  {sampleListElements}
                  <option className="xs:text-sm lg:text-xl" value="all">all</option>

                </select>
              </div>
              <div className='p-3 mt-6'>
                <button id='images' className="opacity-50 bg-main-blue hover:bg-blue-700 xs:text-sm xs:h-14 sm:text-xl lg:text-2xl text-white font-bold lg:p-4 md:p-4 sm:p-4 xs:p-1 rounded lg:w-80 sm:w-13 xs:mt-1 xs:w-40" onClick={oncoImagesClickFunction}>Pathological image</button>
              </div>
              <div className='p-3 mt-6'>
                <button id='tables' className="opacity-50 bg-main-blue hover:bg-blue-700 xs:text-sm xs:h-14 sm:text-xl lg:text-2xl text-white font-bold lg:p-4 md:p-4 sm:p-4 xs:p-1 rounded lg:w-80 sm:w-13 xs:mt-1 xs:w-40" onClick={timelineGraphClickFunction}>F/U Timeline</button>
              </div>
              <div className='p-3 mt-6'>
                <button id='reportData' className="bg-main-blue hover:bg-blue-700  xs:text-sm xs:h-14 sm:text-xl lg:text-2xl text-white font-bold lg:p-4 md:p-4 sm:p-4 xs:p-1 rounded lg:w-80 sm:w-13 xs:mt-1 xs:w-40" onClick={ReportDataFunction}>Report</button>
              </div>
            </div>
          </div>
          <div>
            <div>
              {renderCircos && <CircosCmp
                watermarkCss={watermarkCss}
                ref={reference}
                width={w}
                data={circosJson}
                selectedGenes={inputData.genes}
              />}
              {showNoContent && <NoContentMessage />}
            </div>
          </div>
        </div>
    }
      {showOncoImages && <PagenationTableComponent closeShowOncoImages={closeShowOncoImages} imageData={oncoImageJson} />}
      {showOncoTimelineTables && <GraphsModal circosTimelieTableData={circosTimelieTableData} closeShowTimelineTables={closeShowTimelineTables} />}
      {showReportTable
        &&
        <Report

          sampleKey={circosSanpleRnidListData[sampleKey]}
          tableColumnsData={tableColumnsData}
          tableData={tableData}
          basicInformationData={basicInformationData}
          closeReportFunction={closeReportFunction}
          isReportClickedFunction={isReportClickedFunction}
          isReportClicked={isReportClicked}
        />

      }
      
       { showReportTable && <PDFReport

        sampleKey={circosSanpleRnidListData[sampleKey]}
        tableColumnsData={tableColumnsData}
        tableData={tableData}
        basicInformationData={basicInformationData}
      />} 



    </>
  )
}
