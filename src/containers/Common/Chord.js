import React, { useState,useEffect } from 'react'
import * as d3 from 'd3';
import * as Circos from 'circos';
import cytobands from './cytobands.csv'

const ChordCmp = React.forwardRef(({ width, data, watermarkCss }, ref) => {
  const [state, setState] = useState({"cytobands":[],'genes':[],'GRCh37':[]});

  var gieStainColor = {
    gpos100: 'rgb(0,0,0)',
    gpos: 'rgb(0,0,0)',
    gpos75: 'rgb(130,130,130)',
    gpos66: 'rgb(160,160,160)',
    gpos50: 'rgb(200,200,200)',
    gpos33: 'rgb(210,210,210)',
    gpos25: 'rgb(200,200,200)',
    gvar: 'rgb(220,220,220)',
    gneg: 'rgb(255,255,255)',
    acen: 'rgb(217,47,39)',
    stalk: 'rgb(100,127,164)',
    select: 'rgb(135,177,255)'
  }

  const drawCircos = (d, cytobands_data, d_)=>{
    var width = 960
    var circosHighlight = new Circos({
      container: '#circoschord',
      width: width,
      height: width
    })
    let conf = {
      innerRadius: width / 2 - 100,
      outerRadius: width / 2 - 50,
      labels: {
        radialOffset: 70
      },
      ticks: {
        display: false,
      },
      events: {
        'click.demo': function (d, i, nodes, event) {
        }
      }
    }

    let chord_data = d_

    circosHighlight.layout(d,conf).highlight('cytobands', cytobands_data, {
      innerRadius: width / 2 - 100,
      outerRadius: width / 2 - 50,
      opacity: 0.5,
      color: function (d) {
        return gieStainColor[d.gieStain]
      }
    })
    .chords('l1',chord_data,{
      radius: function (d) {
        if (d.source.id === 'chr1') {
          return 0.5
        } else {
          return null
        }
      },
      logScale: false,
      opacity: 0.7,
      color: function(d){
        return d['source']['color']
      },
      tooltipContent: function (d) {
        return '<h3>' + d.source.id + ' ➤ ' + d.target.id + ': ' + d.value + '</h3><i>(CTRL+C to copy to clipboard)</i>'
      },
      events: {
        'mouseover.demo': function (d, i, nodes, event) {
        }
      },
      labels: {
          display: true,
          position: 'center',
          size: '14px',
          color: '#000000',
          radialOffset: 20,
      },
      ticks: {
          display: true,
          color: 'grey',
          spacing: 10000000,
          labels: true,
          labelSpacing: 10,
          labelSuffix: 'Mb',
          labelDenominator: 1000000,
          labelDisplay0: true,
          labelSize: '10px',
          labelColor: '#000000',
          labelFont: 'default',
          majorSpacing: 5,
          size: {
              minor: 2,
              major: 5,
          }
      }
    })
    .render()

  }

  useEffect(()=>{
    d3.csv(cytobands, function(d,i) {
      return d;
    }).then(function(data) {
      let d = []
      for (var i = 0; i < data.length; i++) {
        if ('columns' in data[i]){
          continue
        }else{
          d.push({
            "block_id": data[i].chrom,
            "start": parseInt(data[i].chromStart),
            "end": parseInt(data[i].chromEnd),
            "gieStain": data[i].gieStain
          })
        }
      }

      setState((prevState)=>({
        ...prevState,
        'cytobands':d
      }))
    });
  },[])

  useEffect(()=>{
    let d = [
      {"id":"chr1","label":"chr1","color":"#996600","len":249250621},
      {"id":"chr2","label":"chr2","color":"#666600","len":243199373},
      {"id":"chr3","label":"chr3","color":"#99991E","len":198022430},
      {"id":"chr4","label":"chr4","color":"#CC0000","len":191154276},
      {"id":"chr5","label":"chr5","color":"#FF0000","len":180915260},
      {"id":"chr6","label":"chr6","color":"#FF00CC","len":171115067},
      {"id":"chr7","label":"chr7","color":"#FFCCCC","len":159138663},
      {"id":"chr8","label":"chr8","color":"#FF9900","len":146364022},
      {"id":"chr9","label":"chr9","color":"#FFCC00","len":141213431},
      {"id":"chr10","label":"chr10","color":"#FFFF00","len":135534747},
      {"id":"chr11","label":"chr11","color":"#CCFF00","len":135006516},
      {"id":"chr12","label":"chr12","color":"#00FF00","len":133851895},
      {"id":"chr13","label":"chr13","color":"#358000","len":115169878},
      {"id":"chr14","label":"chr14","color":"#0000CC","len":107349540},
      {"id":"chr15","label":"chr5","color":"#6699FF","len":102531392},
      {"id":"chr16","label":"chr16","color":"#99CCFF","len":90354753},
      {"id":"chr17","label":"chr17","color":"#00FFFF","len":81195210},
      {"id":"chr18","label":"chr18","color":"#CCFFFF","len":78077248},
      {"id":"chr19","label":"chr19","color":"#9900CC","len":59128983},
      {"id":"chr20","label":"chr20","color":"#CC33FF","len":63025520},
      {"id":"chr21","label":"chr21","color":"#CC99FF","len":48129895},
      {"id":"chr22","label":"chr22","color":"#666666","len":51304566},
      {"id":"chrX","label":"chrX","color":"#999999","len":155270560},
      {"id":"chrY","label":"chrY","color":"#CCCCCC","len":59373566}
    ]
    if ( state['cytobands'].length>0){
      if(data){
          drawCircos(d, state['cytobands'],data)
      }

    //   let d = [
    //     {"id":"chr1","label":"chr1","color":"#996600","len":249250621},
    //     {"id":"chr2","label":"chr2","color":"#666600","len":243199373},
    //     {"id":"chr3","label":"chr3","color":"#99991E","len":198022430},
    //     {"id":"chr4","label":"chr4","color":"#CC0000","len":191154276},
    //     {"id":"chr5","label":"chr5","color":"#FF0000","len":180915260},
    //     {"id":"chr6","label":"chr6","color":"#FF00CC","len":171115067},
    //     {"id":"chr7","label":"chr7","color":"#FFCCCC","len":159138663},
    //     {"id":"chr8","label":"chr8","color":"#FF9900","len":146364022},
    //     {"id":"chr9","label":"chr9","color":"#FFCC00","len":141213431},
    //     {"id":"chr10","label":"chr10","color":"#FFFF00","len":135534747},
    //     {"id":"chr11","label":"chr11","color":"#CCFF00","len":135006516},
    //     {"id":"chr12","label":"chr12","color":"#00FF00","len":133851895},
    //     {"id":"chr13","label":"chr13","color":"#358000","len":115169878},
    //     {"id":"chr14","label":"chr14","color":"#0000CC","len":107349540},
    //     {"id":"chr15","label":"chr5","color":"#6699FF","len":102531392},
    //     {"id":"chr16","label":"chr16","color":"#99CCFF","len":90354753},
    //     {"id":"chr17","label":"chr17","color":"#00FFFF","len":81195210},
    //     {"id":"chr18","label":"chr18","color":"#CCFFFF","len":78077248},
    //     {"id":"chr19","label":"chr19","color":"#9900CC","len":59128983},
    //     {"id":"chr20","label":"chr20","color":"#CC33FF","len":63025520},
    //     {"id":"chr21","label":"chr21","color":"#CC99FF","len":48129895},
    //     {"id":"chr22","label":"chr22","color":"#666666","len":51304566},
    //     {"id":"chrX","label":"chrX","color":"#999999","len":155270560},
    //     {"id":"chrY","label":"chrY","color":"#CCCCCC","len":59373566}
    //   ]
    //   drawCircos(width,d,state['cytobands'],data)
    }
  },[state, ])

  return (
    <div ref={ref} className={`circos block ${watermarkCss}`} id='circoschord'>
    </div>
  )
})

export default ChordCmp
