import React, { useState, useEffect, useRef, } from "react";
import { FusionInformation, FusionExons } from '../../actions/api_actions'
import LoaderCmp from "./Loader";
import { useParams } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

export default function FusionCustomPlot({ fusionId }) {
  const listRef = useRef();
  const [loader, setLoader] = useState(false)
  const [html, setHtml] = useState([])
  const [leftTranscriptsHtml, setLeftTranscriptsHtml] = useState([])
  const [rightTranscriptsHtml, setRightTranscriptsHtml] = useState([])
  const [gene, setGene] = useState('')
  const [errorHtml, setErrorHtml] = useState('')
  const [fusionPlotJson, setFusionPlotJson] = useState({})
  const [exonData, setExonData] = useState([])
  const [fromGene, setFromGene] = useState('')
  const [renderPlot, setRenderPlot] = useState(false)
  const [fusionJson, setFusionJson] = useState({})
  let { project_id } = useParams();




  useEffect(() => {
    if (fusionId) {
      setLoader(true)
      let dataJson = {}
      dataJson['id'] = fusionId
      if (project_id !== undefined) {
        dataJson['project_id'] = parseInt(project_id)
      }
      let data = FusionInformation('POST', dataJson);
      data
        .then((result) => {
          if (
            'data' in result &&
            'status' in result.data &&
            result.data.status
          ) {
            setFusionJson(result.data)
            let transcriptdata = result?.data?.transcripts
            let z = 0
            let tg = []
            for (const key in transcriptdata) {
              tg.push(key)
              let transcripts = transcriptdata[key]
              let tmp = []

              for (let index = 0; index < transcripts.length; index++) {
                const element = transcripts[index];
                tmp.push(<option key={element} value={element}>{element}</option>)
              }
              if (z === 0) {
                setLeftTranscriptsHtml([tmp])
                z = z + 1
              } else {
                setRightTranscriptsHtml([tmp])
              }
            }
          }
          else {
            setFusionJson({})
          }
        })
        .catch(() => {
          setFusionJson({})
        });

      setLoader(true)
    }
  }, [fusionId])

  useEffect(() => {
    if (fusionJson) {
      if (fusionJson.status && 'exons' in fusionJson && Object.keys(fusionJson.exons).length >= 0
        && 'transcripts' in fusionJson && Object.keys(fusionJson.transcripts).length >= 0) {
        setErrorHtml('')
        setLoader(true)
        setFusionPlotJson(fusionJson)
      }
      else {
        setHtml([])
        setLoader(false)
        setErrorHtml('No Data')
      }
    }
  }, [fusionJson])

  useEffect(() => {
    setLoader(true)
    let main_width = listRef?.current?.getBoundingClientRect()?.width
    if (fusionPlotJson?.status && 'exons' in fusionPlotJson && Object.keys(fusionPlotJson.exons).length >= 0
      && 'transcripts' in fusionPlotJson && Object.keys(fusionPlotJson.transcripts).length >= 0) {
      // main_width = main_width/2
      let h = []
      let i = 0
      let tg = []
      for (const key in fusionPlotJson['exons']) {
        if (key) {
          tg.push(key)
          let r = fusionPlotJson['exons'][key]
          let pos = fusionPlotJson['pos'][key]?.split(':')
          let exon_pos = parseInt(pos[1])

          let htmlExons = []
          let htmlExons1 = []
          let htmlExons2 = []
          let f_w = 0
          let left_w = false
          let right_w = false
          let name = 'FusionNameRE'
          let gene_type = 'exon1 leftGene'
          let id = 'leftGene'
          if (i === 1) {
            name = 'FusionNameLS'
            gene_type = 'exon2 rightGene'
            right_w = true
            id = 'rightGene'
          } else {
            name = 'FusionNameRE'
            gene_type = 'exon1 leftGene'
            left_w = true
            id = 'leftGene'
          }
          let direction = 'right_arrow'
          let leftSecondRow = true
          let RightSecondRow = false
          for (let index = 0; index < r.length; index++) {

            const element = r[index];
            if (exon_pos > element.startCodon) {
              direction = 'right_arrow'
            } else {
              direction = 'left_arrow'
            }
            let w = element.endCodon - element.startCodon
            w = (w / r.length)

            if (w > 500) {
              w = 500
            }
            if (id === 'leftGene' && leftSecondRow) {
              htmlExons1.push(
                <div title={"exon -" + (index + 1) + " " + element.startCodon} key={index} style={{ width: w + 'px', backgroundColor: element.color, marginRight: '5px', marginLeft: '5px', height: '20px', borderRight: '1px solid ' + element.color }}>
                </div>
              )
              htmlExons2.push(
                <div title={"exon -" + (index + 1) + " " + element.startCodon} key={index} style={{ width: w + 'px', backgroundColor: element.color, height: '20px', border: '1px solid #333' }}>
                </div>
              )
            }
            if (id === 'rightGene' && RightSecondRow) {
              htmlExons1.push(
                <div title={"exon -" + (index + 1) + " " + element.startCodon} key={index} style={{ width: w + 'px', backgroundColor: element.color, marginRight: '5px', marginLeft: '5px', height: '20px', borderRight: '1px solid ' + element.color }}>
                </div>
              )
              htmlExons2.push(
                <div title={"exon -" + (index + 1) + " " + element.startCodon} key={index} style={{ width: w + 'px', backgroundColor: element.color, height: '20px', border: '1px solid #333' }}>
                </div>
              )
            }
            if ((exon_pos === element.endCodon || exon_pos === element.startCodon) || (exon_pos >= element.startCodon && exon_pos <= element.endCodon)) {
              htmlExons.push(
                <div title={"exon -" + (index + 1) + " " + element.startCodon} id={id} key={index} style={{ width: w + 'px', marginRight: '5px', marginLeft: '5px', height: '80px', borderRight: '1px solid ' + element.color }}>
                  <div style={{ backgroundColor: element.color, height: '20px', marginTop: '60px' }}>
                  </div>
                </div>
              )
              if (left_w) {
                f_w = f_w + w + 20
              }
              leftSecondRow = false
              RightSecondRow = true
              if (right_w) {

              }
            } else {
              htmlExons.push(
                <div title={"exon -" + (index + 1) + " " + element.startCodon} key={index} style={{ width: w + 'px', backgroundColor: element.color, marginRight: '5px', marginLeft: '5px', height: '20px', borderRight: '1px solid ' + element.color }}>
                </div>
              )

            }

          }


          h.push(
            <div key={key} className='ChromosomeFusionPlotDivision'>
              <h3 style={{ color: fusionPlotJson['exons'][key][0].color }}>{key} -- {fusionPlotJson['pos'][key]}</h3>

              <div id={'row_' + i} className={'grid_row Flex JustifyCenter AlignItemsFlexEnd  MarginTop10 Relative ' + id + ' ' + direction} style={{ color: fusionPlotJson['exons'][key][0].color, height: '100px', borderBottom: '1px solid ' + fusionPlotJson['exons'][key][0].color, borderColor: fusionPlotJson['exons'][key][0].color }}>
                {htmlExons}
                <div id={id + "1"} className={gene_type} style={{ borderColor: fusionPlotJson['exons'][key][0].color, width: f_w, position: 'absolute', }}></div>
              </div>
              <div className={'grid_row Flex  AlignItemsFlexEnd  MarginTop10 Relative ' + id + ' ' + name + " " + direction} style={{ height: '60px', borderBottom: '1px solid ' + fusionPlotJson['exons'][key][0].color, color: fusionPlotJson['exons'][key][0].color }}>
                {htmlExons1}
              </div>
              <div className={'grid_row flex  AlignItemsFlexEnd  MarginTop10 Relative ' + id + ' ' + name + " " + direction} style={{ height: '60px', borderBottom: '1px solid ' + fusionPlotJson['exons'][key][0].color, color: fusionPlotJson['exons'][key][0].color }}>
                {htmlExons2}
              </div>

            </div>
          )

          i = i + 1
        }
        setGene(tg.join('-'))
        h.push(
          <div key={`horizontalLine${key}`} style={{ height: "210px", borderRight: '1px solid red', width: '1px', left: '50%', top: '49.5%', position: 'absolute' }}>
          </div>
        )
        setHtml(h)
        setLoader(false)
        setRenderPlot(true)
      }
    }

  }, [fusionPlotJson])

  useEffect(()=>{
    if(html.length>0){

    }
  },[html])

  useEffect(() => {
    if (renderPlot && html.length > 0) {
      let main_div = document.getElementById('vennn').offsetWidth/2
      let row = document.getElementById('row_1')
      let rowLine = document.getElementById('leftGene')
      let rightrowLine = document.getElementById('rightGene')

      if (row !== null && rowLine !== null) {

        let t = rowLine.offsetLeft - rowLine.offsetWidth;

        document.getElementById('leftGene1').style.width =  main_div  - t + "px"
        document.getElementById('leftGene1').style.left = rowLine.offsetWidth+rowLine.offsetLeft + "px"

        if(document.getElementById('row_0').offsetWidth>main_div){
          document.getElementById('leftGene1').style.left = rowLine.offsetLeft + "px"
          document.getElementById('row_0').style.width = main_div-20  +"px"
        }
      }
      if (rightrowLine !== null) {
        document.getElementById('rightGene1').style.width = rightrowLine.offsetLeft + rightrowLine.offsetWidth + "px"
        document.getElementById('rightGene1').style.left = "0px"
      }
      setRenderPlot(false)
    }
  }, [renderPlot])

  const transcriptChange = (value, from) => {
    let g = ''

    if (from === 'left') {
      g = gene.split('-')[0]
    } else {
      g = gene.split('-')[1]

    }
    setFromGene(g)

    let dataJson = {
      'gene': g,
      'type': from,
      'transcript_id': value

    }

    let data = FusionExons('POST', dataJson);
    data
      .then((result) => {
        if (
          'data' in result &&
          result?.data?.length > 0
        ) {
          setExonData(result?.data)
          setFusionPlotJson(prevState => ({
            ...prevState,
            exons: {
              ...prevState.exons,
              [g]: result?.data
            }
          }));
        }
        else {
          setExonData([])
          setFusionPlotJson({})
          setLoader(false)
        }
      })
      .catch(() => {
        setExonData([])
        setFusionPlotJson({})
        setLoader(false)
      });

  }

  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (

        <div className="bg-white p-3" ref={listRef}>
          {html.length > 0 &&
            <>
              <div className="text-left py-5 px-5 border-b border-gray-200">
                <h3 className="text-3xl">{gene} Fusion Gene Plot</h3>
              </div>

              <div className="FusionChromosome" >
                <div className="text-left">
                  <label htmlFor='left_transcript_id'>Left Transcript Id</label>
                  <select id='left_transcript_id' onChange={e => transcriptChange(e.target.value, 'left')} className="w-full lg:p-4 xs:p-2 border xs:text-sm lg:text-lg focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3">
                    {leftTranscriptsHtml}
                  </select>
                </div>

                <div className="text-left">
                  <label htmlFor='right_transcript_id'>Right Transcript Id</label>
                  <select id='right_transcript_id' onChange={e => transcriptChange(e.target.value, 'right')} className="w-full lg:p-4 xs:p-2 border xs:text-sm lg:text-lg focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3">
                    {rightTranscriptsHtml}
                  </select>
                </div>
              </div>

              <div className="ChromosomeFusionPlot"  id="vennn">
                {html}
              </div>
            </>
          }
          {errorHtml && <div className="p-4 "><FormattedMessage id="FusionNoExonData" defaultMessage="No data match found in human genome database" /></div>}
        </div>


      )}</>
  )

}