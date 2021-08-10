import React, { useState,useEffect } from 'react'
import * as d3 from 'd3';
import * as Circos from 'circos';
import {queue} from 'd3-queue';

export default function CircosCmp({ width, data }) {
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


  const drawCircos =  (width, GRCh37, cytobands,api_data) => {


    var width = width-100
    var circosHighlight = new Circos({
      container: '#circos',
      width: width,
      height: width
    })
    let data = cytobands
    let conf = {
      innerRadius: width / 2 - 100,
      outerRadius: width / 2 - 50,
      labels: {
        radialOffset: 70
      },
      ticks: {
        display: false,
      },
    }
    var snp250 = [];
    if('dna_mutation' in api_data){
      snp250 = api_data['dna_mutation'].map(function (d,i) {
        let gc = d.genome_change
        gc = gc.match(/\d+/)
        return {
          block_id: d.chromosome,
          position: (parseInt(d.start_position) + parseInt(d.end_position)) /2,
          value:gc[0],
          name: d.hugo_symbol
        }
      })
    }
    var rna_expression_up = [];
    if ('rna_expression' in api_data){
      rna_expression_up = api_data['rna_expression'].reduce(function (tmp,d) {
        if(d.rna_cnt>1){
          let dt = {
            block_id: d.chromosome,
            position: (parseInt(d.start_position) + parseInt(d.end_position)) / 2,
            value: parseInt(d.start_position),
            name: d.name,
            rna:d.rna_cnt
          }
          tmp.push(dt)
        }
        return tmp
      },[])
    }
    var rna_expression_down = []
    if ('rna_expression' in api_data){
      rna_expression_down = api_data['rna_expression'].reduce(function (tmp,d) {
        if(d.rna_cnt < -1){
          let dt = {
            block_id: d.chromosome,
            position: (parseInt(d.start_position) + parseInt(d.end_position)) / 2,
            value: parseInt(d.start_position),
            name: d.name,
            rna:d.rna_cnt
          }
          tmp.push(dt)
        }
        return tmp
      },[])
    }

    var dna_methylation = []
    if ('dna_methylation' in api_data){
      dna_methylation = api_data['dna_methylation'].map(function (d,i) {
        return {
          block_id: d.chromosome,
          position: (parseInt(d.start_position) + parseInt(d.end_position)) / 2,
          value: d.start_position,
          name: d.name
        }
      })
    }

    var global_proteome_up = []
    if ('global_proteome' in api_data){
      global_proteome_up = api_data['global_proteome'].reduce(function (tmp,d) {
        if(d.rna_cnt>1){
          tmp.push({
            block_id: d.chromosome,
            position: (parseInt(d.start_position) + parseInt(d.end_position)) / 2,
            value: d.start_position,
            rna:d.rna_cnt,
            name: d.name
          })
        }
        return tmp
      },[])
    }

    var global_proteome_down = []
    if ('global_proteome' in api_data){
      global_proteome_down = api_data['global_proteome'].reduce(function (tmp,d) {
        if(d.rna_cnt<-1){
          tmp.push({
            block_id: d.chromosome,
            position: (parseInt(d.start_position) + parseInt(d.end_position)) / 2,
            value: d.start_position,
            rna:d.rna_cnt,
            name: d.name
          })
        }
        return tmp
      },[])
    }

    circosHighlight.layout(GRCh37,conf).highlight('cytobands', data, {
      innerRadius: width / 2 - 100,
      outerRadius: width / 2 - 50,
      opacity: 0.5,
      color: function (d) {
        return gieStainColor[d.gieStain]
      }
    })
    .scatter('dna-mutation', snp250, {
      innerRadius: width / 2 - 220,
      outerRadius: width / 2 - 120,
      color:'grey',
      strokeColor: 'grey',
      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 0.013,
      axes: [
        {
          spacing: 0.001,
          start: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.3
        },
        {
          spacing: 0.002,
          start: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        },
        {
          spacing: 0.002,
          start: 0.002,
          end: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        },
        {
          spacing: 0.001,
          end: 0.002,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        }
      ],
      backgrounds: [
        {
          start: 0.006,
          color: '#f44336',
          opacity: 0.1
        },
        {
          start: 0.002,
          end: 0.006,
          color: '#f44336',
          opacity: 0.1
        },
        {
          end: 0.002,
          color: '#f44336',
          opacity: 0.1
        }
      ],
      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.name}`
      }
    })
    .scatter('snp-250-2', rna_expression_up, {
      innerRadius: width / 2 - 400,
      outerRadius: width / 2 - 220,
      color: 'red',
      strokeColor: 'red',
      strokeWidth: 1,
      shape: 'circle',
      direction:'out',
      size: 16,
      min: 0,
      max: 0.013,

      axes: [
        {
          spacing: 0.001,
          thickness: 1,
          color: '#68BBE3',
          opacity: 0.3
        },
        {
          spacing: 0.002,
          thickness: 1,
          color: '#68BBE3',
          opacity: 0.5
        }
      ],

      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.name}`
      }
    })
    .scatter('snp-250-3', rna_expression_down, {
      innerRadius: width / 2 - 400,
      outerRadius: width / 2 - 300,
      color: '#7c7ce5',
      strokeColor: '#7c7ce5',
      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 0.013,

      axes: [
       {
         spacing: 0.001,
         thickness: 1,
         color: '#68BBE3',
         opacity: 0.3
       },
       {
         spacing: 0.002,
         thickness: 1,
         color: '#68BBE3',
         opacity: 0.5
       }
      ],

      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.name}`
      }
    })
    .scatter('snp-250-4', dna_methylation, {
      innerRadius: width / 2 - 500,
      outerRadius: width / 2 - 400,
      color: '#7c7ce5',
      strokeColor: '#7c7ce5',
      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 0.013,
      axes: [
        {
          spacing: 0.0001,
          thickness: 1,
          color: 'red',
          opacity: 0.3
        },
        {
          spacing: 0.0005,
          thickness: 1,
          color: 'red',
          opacity: 0.5
        }
      ],

      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .scatter('snp-250-5', global_proteome_up, {
      innerRadius: width / 2 - 600,
      outerRadius: width / 2 - 450,
      color: '#7c7ce5',
      strokeColor: '#7c7ce5',
      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 0.013,

      axes: [
        {
          spacing: 0.001,
          start: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.3
        },
        {
          spacing: 0.002,
          start: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        },
        {
          spacing: 0.002,
          start: 0.002,
          end: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        },
        {
          spacing: 0.001,
          end: 0.002,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        }
      ],

      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .scatter('snp-250-6', global_proteome_down, {
      innerRadius: width / 2 - 700,
      outerRadius: width / 2 - 500,
      color: '#7c7ce5',
      strokeColor: '#7c7ce5',
      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 0.013,
      axes: [
        {
          spacing: 0.001,
          start: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.3
        },
        {
          spacing: 0.002,
          start: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        },
        {
          spacing: 0.002,
          start: 0.002,
          end: 0.006,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        },
        {
          spacing: 0.001,
          end: 0.002,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        }
      ],
      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .render()

  }


  useEffect(()=>{

    d3.csv("https://nicgirault.github.io/circosJS/demo/data/cytobands.csv", function(d,i) {
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

    if ( state['cytobands'].length>0){
      
      document.getElementById('circos').html = ''

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
      // console.log(state['cytobands']);
      drawCircos(width,d,state['cytobands'],data)


    }
  },[state])

  return (
    <div className='circos' id='circos'></div>

  )
}
