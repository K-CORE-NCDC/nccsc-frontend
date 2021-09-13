import React, { useState,useEffect } from 'react'
import * as d3 from 'd3';
import * as Circos from 'circos';
import {queue} from 'd3-queue';
import cytobands from './cytobands.csv'
const CircosCmp = React.forwardRef(({ width, data, watermarkCss, fusionJson }, ref) => {
  // console.log(fusionJson, data);
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
    let childnode = document.getElementById("circos");
    if(childnode.hasChildNodes()){
      while (childnode.firstChild) {
        childnode.removeChild(childnode.firstChild)
      }

    }
    var width = width-100
    var circosHighlight = new Circos({
      container: '#circos',
      width: width,
      height: width
    })
    let data = cytobands
    let all_chr = []
    for (var i = 0; i < GRCh37.length; i++) {
      all_chr.push({
        "block_id":GRCh37[i]['id'],
        "position":0,
        "value":0,
        "name":'',
      })
    }
    let conf = {
      innerRadius: width / 2 - 100,
      outerRadius: width / 2 - 50,
      gap:0.04,
      labels: {
        radialOffset: 70
      },
      ticks: {
        display: false,
      },
    }

    var snp250 = all_chr;

    if('dna_mutation' in api_data){
      let strchr = 0
      let iter = 1
      let dna_mutation_data = api_data['dna_mutation']
      for (var i = 0; i < dna_mutation_data.length; i++) {
        snp250.push({
          block_id: dna_mutation_data[i].chromosome,
          position: strchr,
          value: iter,
          name: dna_mutation_data[i].hugo_symbol+"||"+dna_mutation_data[i].genome_change

        })

        if (iter === 10) {
          iter = 1
          strchr = iter+parseFloat((strchr + 3.500).toFixed(3))
        }
        iter++
      }
    }



    var dna_methylation = all_chr
    if ('dna_methylation' in api_data){
      let strchr = 0
      let iter = 1
      let dna_methylation_data = api_data['dna_methylation']
      for (var i = 0; i < dna_methylation_data.length; i++) {
        dna_methylation.push({
          block_id: dna_methylation_data[i].chromosome,
          position: strchr,
          value: iter,
          name: dna_methylation_data[i].hugo_symbol
        })
        iter++
        if (iter === 15) {
          iter = 1
          strchr = parseFloat((strchr + 4.5).toFixed(3))
        }
      }
    }


    var rna_expression_up = all_chr;
    var rna_expression_down = all_chr;
    if ('rna_expression' in api_data){
      let strchr = 0
      let iter = 1
      let strchr2 = 0
      let iter2 = 1
      let rna_expression_data = api_data['rna_expression']

      for (var i = 0; i < rna_expression_data.length; i++) {
        if(rna_expression_data[i].rna_cnt>1){
          rna_expression_up.push({
            block_id: rna_expression_data[i].chromosome,
            position: rna_expression_data[i].rna_cnt,
            value: iter,
            name: rna_expression_data[i].hugo_symbol,
            rna:rna_expression_data[i].rna_cnt
          })
          iter++
          if (iter === 10) {
            iter = 1
            strchr = parseFloat((strchr + 4.500).toFixed(4))
          }
        } else if(rna_expression_data[i].rna_cnt<-1){
          rna_expression_down.push({
            block_id: rna_expression_data[i].chromosome,
            position: -rna_expression_data[i].rna_cnt,
            value: iter2,
            name: rna_expression_data[i].hugo_symbol,
            rna:rna_expression_data[i].rna_cnt
          })
          iter2++
          if (iter2 === 10) {
            iter2 = 1
            strchr2 = parseFloat((strchr + 4.500).toFixed(4))
          }
        }
      }
    }

    var global_proteome_up = all_chr;
    var global_proteome_down = all_chr
    if ('global_proteome' in api_data){
      let global_proteome_data = api_data['global_proteome']
      let strchr = 0
      let iter = 1
      let strchr2 = 0
      let iter2 = 1
      for (var i = 0; i < global_proteome_data.length; i++) {
        if(global_proteome_data[i].rna_cnt>1){
          global_proteome_up.push({
            block_id: global_proteome_data[i].chromosome,
            position: strchr,
            value: iter,
            rna:global_proteome_data[i].rna_cnt,
            name: global_proteome_data[i].hugo_symbol
          })
        }
        else if (global_proteome_data[i].rna_cnt<-1) {
          global_proteome_down.push({
            block_id: global_proteome_data[i].chromosome,
            position: strchr2,
            value: iter2,
            rna:global_proteome_data[i].rna_cnt,
            name: global_proteome_data[i].hugo_symbol
          })
        }
        iter++
        if (iter === 30) {
          iter = 1
          strchr = parseFloat((strchr + 3.500).toFixed(3))
        }
        iter2++
        if (iter2 === 30) {
          iter2 = 1
          strchr2 = parseFloat((strchr + 3.500).toFixed(3))
        }
      }
    }

    let chord_data = fusionJson

    circosHighlight.layout(GRCh37,conf)
    .highlight('cytobands-1', data, {
      innerRadius: width/2 -100,
      outerRadius: width / 2 - 50,
      opacity: 0.5,
      color: function (d) {
        return gieStainColor[d.gieStain]
      }
    })
    .scatter('dna-mutation', snp250, {
      innerRadius: 0.99,
      outerRadius: 0.85,
      color:function(d){
        if(d.name) {
          return 'grey'
        }else{
          return 'rgba(0,0,0,0)'
        }
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },
      strokeWidth: 1,
      shape: 'circle',
      size: 15,
      min: 0,
      max: 10,
      direction:'out',
      
      axes: [
        {
          spacing: 1,
          color: '#f44336',
          opacity: 0.3
        }
      ],

      tooltipContent: function (d, i) {
        console.log(d);
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.name} mutation`
      }
    })
    .scatter('rna-up', rna_expression_up, {
      innerRadius: 0.85,
      outerRadius: 0.75,
      color:function(d){
        if(d.name) {
          return 'red'
        }else{
          return 'rgba(0,0,0,0)'
        }
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },

      strokeWidth: 1,
      shape: 'circle',
      size: 15,
      min: 0,
      max: 10,
      axes: [
        {
          spacing: 2,
          color: '#68BBE3',
          opacity: 0.3
        }
      ],
      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.name}`
      }
    })
    .scatter('rna-down', rna_expression_down, {
      innerRadius: 0.75,
      outerRadius: 0.65,
      color:function(d){
        if(d.name) {
          return '#7c7ce5'
        }else{
          return 'rgba(0,0,0,0)'
        }
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },
      strokeWidth: 1,
      shape: 'circle',
      direction:'out',
      size: 15,
      min: 0,
      max: 16,

      axes: [
        {
          spacing: 2,
          color: '#68BBE3',
          opacity: 0.3
        }

      ],

      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.name}`
      }
    })
    .scatter('snp-250-4', dna_methylation, {
      innerRadius: 0.65,
      outerRadius: 0.55,
      color:function(d){
        if(d.name) {
          return '#000'
        }else{
          return 'rgba(0,0,0,0)'
        }
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },
      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 16,
      axes: [
        {
          spacing: 3,
          color: 'grey',
          opacity: 0.3
        },

      ],

      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .scatter('snp-250-5', global_proteome_up, {
      innerRadius: 0.53,
      outerRadius: 0.43,
      color:function(d){
        if(d.name) {
          return 'red'
        }else{
          return 'rgba(0,0,0,0)'
        }
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },
      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 15,

      axes: [
        {
          spacing: 2,
          color: 'red',
          opacity: 0.5
        }
      ],

      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .scatter('snp-250-6', global_proteome_down, {
      innerRadius: 0.42,
      outerRadius: 0.32,
      color:function(d){
        if(d.name) {
          return '#7c7ce5'
        }else{
          return 'rgba(0,0,0,0)'
        }
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },

      strokeWidth: 1,
      shape: 'circle',
      size: 16,
      min: 0,
      max: 15,
      axes: [
        {
          spacing: 2,
          color: 'red',
          opacity: 0.5
        }
      ],
      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .highlight('cytobands', data, {
      innerRadius: .3,
      outerRadius: .25,
      opacity: 0.5,
      color: function (d) {
        return gieStainColor[d.gieStain]
      }
    })
    .chords('l1',chord_data,{
      radius: 0.26,
      logScale: false,
      opacity: 0.7,
      color: function(d){
        return d['source']['color']
      },
      tooltipContent: function (d) {
        return `<h3> source : ${d.source.id} | ${d.source.name}  ➤ target: ${d.target.id} | ${d.target.name} </h3>`
      },
      events: {
        'mouseover.demo': function (d, i, nodes, event) {
          // console.log(d, i, nodes, event.pageX)
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
    if ( state['cytobands'].length>0){
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
  },[state, data, fusionJson])

  return (
    <div ref={ref} className={`circos block ${watermarkCss}`} id='circos'></div>

  )
})

export default CircosCmp
