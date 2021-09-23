import React, { useState,useEffect } from 'react'
import * as d3 from 'd3';
import * as Circos from 'circos';
import {queue} from 'd3-queue';
import cytobands from './cytobands.csv'
import LoaderCmp from './Loader'
import placeholder from '../../assets/img/circos_ncc-removebg-preview.png'


const CircosCmp = React.forwardRef(({ width, data, watermarkCss, fusionJson }, ref) => {
  // console.log(fusionJson, data);
  const [state, setState] = useState({"cytobands":[],'genes':[],'GRCh37':[]});
  const [loader, setLoader] = useState(false)

  const staticPositionValues =  {
    "chr1": 249250621,
    "chr2": 243199373,
    "chr3": 198022430,
    "chr4": 191154276,
    "chr5": 180915260,
    "chr6": 171115067,
    "chr7": 159138663,
    "chr8": 146364022,
    "chr9": 141213431,
    "chr10": 135534747,
    "chr11": 135006516,
    "chr12": 133851895,
    "chr13": 115169878,
    "chr14": 107349540,
    "chr15": 102531392,
    "chr16": 90354753,
    "chr17": 81195210,
    "chr18": 78077248,
    "chr19": 59128983,
    "chr20": 63025520,
    "chr21": 48129895,
    "chr22": 51304566,
    "chrX": 155270560,
    "chrY": 59373566,
  }


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
				labels		: {
					position		: 'center',
					display		: true,
					size			: 6,
					color		: '#000',
					radialOffset	: 70
				},
				ticks		: {
					display		: false,
					spacing		: 1000000,
					labelSize: '16px',
					labelSuffix	: ''
				}
			}

    var snp250 = [...all_chr];

    if('dna_mutation' in api_data){
      let strchr = 0
      let iter = 1
      let dna_mutation_data = api_data['dna_mutation']
      for (var i = 0; i < dna_mutation_data.length; i++) {
        // let position = (parseInt(dna_mutation_data[i].start) + parseInt(dna_mutation_data[i].end)) / 2
        const startPos = staticPositionValues[dna_mutation_data[i].chromosome]
        let position = Math.floor((Math.random() * startPos))
        // position < 150000000 ? position += 150000000 : position = position
        snp250.push({
          block_id: dna_mutation_data[i].chromosome,
          position: position,
          value: dna_mutation_data[i].value,
          name:  dna_mutation_data[i].hugo_symbol
        })

        if (iter === 10) {
          iter = 1
          strchr = iter+parseFloat((strchr + 3.500).toFixed(3))
        }
        iter++
      }
    }
    console.log(snp250);
    var dna_methylation = [...all_chr]

    if('dna_methylation' in api_data){
      let strchr = 0
      let iter = 1
      let dna_methylation_data = api_data['dna_methylation']
      for (var i = 0; i < dna_methylation_data.length; i++) {
        // let position = (parseInt(dna_methylation_data[i].start) + parseInt(dna_methylation_data[i].end)) / 2
        // position < 150000000 ? position += 150000000 : position = position
        const startPos = staticPositionValues[dna_methylation_data[i].chromosome]
        let position = Math.floor((Math.random() * startPos))
        dna_methylation.push({
          block_id: dna_methylation_data[i].chromosome,
          position: position,
          value: dna_methylation_data[i].value,
          name:  dna_methylation_data[i].hugo_symbol
        })

        if (iter === 10) {
          iter = 1
          strchr = iter+parseFloat((strchr + 3.500).toFixed(3))
        }
        iter++
      }
    }

    var rna_expression_up = [...all_chr];
    if ('rna_expression' in api_data){
      let rna_expression_data = api_data['rna_expression']
      for (var i = 0; i < rna_expression_data.length; i++) {
        // let position = (parseInt(rna_expression_data[i].start) + parseInt(rna_expression_data[i].end)) / 2
        // position < 150000000 ? position += 150000000 : position = position
        const startPos = staticPositionValues[rna_expression_data[i].chromosome]
        let position = Math.floor((Math.random() * startPos))
        rna_expression_up.push({
          block_id: rna_expression_data[i].chromosome,
          position: position,
          value: parseFloat(rna_expression_data[i].value),
          name: rna_expression_data[i].hugo_symbol

        })
      }
    }

    var global_proteome_up = [...all_chr];
    if ('global_proteome' in api_data){
      let global_proteome_data = api_data['global_proteome']
      for (var i = 0; i < global_proteome_data.length; i++) {
        // let position = (parseInt(global_proteome_data[i].start) + parseInt(global_proteome_data[i].end)) / 2
        // position < 150000000 ? position += 150000000 : position = position
        const startPos = staticPositionValues[global_proteome_data[i].chromosome]
        let position = Math.floor((Math.random() * startPos))
          global_proteome_up.push({
            block_id: global_proteome_data[i].chromosome,
            position: position,
            value: global_proteome_data[i].value,
            name: global_proteome_data[i].hugo_symbol
          })
      }
    }

    var cnvData = [...all_chr];

    if('cnv' in api_data){
      let cnv_data = api_data['cnv']
      for (var i = 0; i < cnv_data.length; i++) {
        // let position = (parseInt(global_proteome_data[i].start) + parseInt(global_proteome_data[i].end)) / 2
        // position < 150000000 ? position += 150000000 : position = position
        const startPos = staticPositionValues[cnv_data[i].chromosome]
        let position = Math.floor((Math.random() * startPos))
        cnvData.push({
            block_id: cnv_data[i].chromosome,
            position: position,
            value: parseInt(cnv_data[i].genome_change),
            name: cnv_data[i].hugo_symbol
          })
      }
    }
    let chord_data = api_data['fusion_genes_data']
    if ('sv_data' in api_data){
      let svData = api_data['sv_data']
      svData.forEach(element => {
        chord_data.push({
          source: {
            id: element.left_gene_chr,
            start: element.left_gene_pos - 3000000,
            end: element.left_gene_pos + 3000000,
            name: element.left_gene_name,
            color: '#ffce44',
            svtype: element.svtype
          },
          target: {
            id: element.right_gene_chr,
            start: element.right_gene_pos - 3000000,
            end: element.right_gene_pos + 3000000,
            name: element.right_gene_name,
          }
        })
      });
    }
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
      color:function(d){
        // console.log('mutation', d)
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
      showAxesTooltip: false,
      innerRadius	: 0.89,
			outerRadius	: .99,
      strokeWidth: 2.0,
      shape: 'circle',
      size: 7,
      min: 0,
      max: 1,
      axes: [
        {spacing: 0.1, thickness: 1, color: '#f44336', opacity: 0.2},
				{spacing: 0.2, thickness: 4, color: '#f44336', opacity: 0.2}
      ],

      tooltipContent: function (d, i) {
        // console.log(d);
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.name} dna_mutation`
      }
    })
    .scatter('rna-up', rna_expression_up, {
      innerRadius: 0.74,
      outerRadius: 0.84,
      color:function(d){
        if (d.value >= 1) 	{ return '#d2352b' }
				if (d.value <= -1) 	{ return '#3777af' }
				return '#d3d3d3'
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },
      showAxesTooltip: false,
      strokeWidth: 2.0,
      shape: 'circle',
      size: 15,
      min: -2,
      max: 2,
      axes: [
        {spacing: 0.1, thickness: 1, color: '#ffffff', opacity: 0.2},
					{spacing: 0.2, thickness: 3, color: '#ffffff', opacity: 0.2},
					{spacing: 0.3, thickness: 1, color: '#3777af', opacity: 0.3}
      ],
      tooltipContent	: function(d) {
        return `RNA gene: ${d.name} chromosome: ${d.block_id} | z score: ${d.value}`;
      },
    })
    .scatter('snp-250-4', dna_methylation, {
      innerRadius: 0.59,
      outerRadius: 0.69,
      showAxesTooltip: false,
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
      strokeWidth: 2.0,
      shape: 'circle',
      size: 7,
      min: 0,
      max: 1,
      axes: [
        {spacing: 0.1, thickness: 1, color: '#ffffff', opacity: 0.2},
				{spacing: 0.2, thickness: 3, color: '#ffffff', opacity: 0.2},
				{spacing: 0.3, thickness: 1, color: '#529d3f', opacity: 0.3}
      ],

      tooltipContent	: function(d) {
        return `Methylation gene: ${d.name} chromosome: ${d.block_id} | value: ${d.value}`
      },
    })
    .scatter('snp-250-5', global_proteome_up, {
      innerRadius: 0.47,
      outerRadius: 0.57,
      showAxesTooltip: false,
      color:function(d){
        return '#4285F4'
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },
      strokeWidth: 2.0,
      shape: 'circle',
      size: 7,
      min: 0,
      max: 2,

      axes: [
        {spacing: 0.1, thickness: 1, color: '#f18532', opacity: 0.2},
					{spacing: 0.3, thickness: 6, color: '#ffffff', opacity: 0.2},
					{spacing: 0.2, thickness: 1, color: '#644195', opacity: 0.3}
      ],

      tooltipContent	: function(d) {
        return `proteome gene: ${d.name} chromosome: ${d.block_id} | value: ${d.value}`
      },
    })
    .scatter('snp-250-6', cnvData, {
      innerRadius: 0.36,
      outerRadius: 0.45,
      showAxesTooltip: false,
      color:function(d){
        if (d.value > 1){
          return '#F4B400'
        }else{
          return "#0F9D58"
        }
      },
      strokeColor: function(d){
        if(d.name) {
          return 1
        }else{
          return 0
        }
      },
      strokeWidth: 2.0,
      shape: 'circle',
      size: 7,
      min: -1,
      max: 6,
      direction: 'center',
      showAxesTooltip: false,
      axes: [
        {spacing: 0.1, thickness: 1, color: 'grey', opacity: 0.1},
				{spacing: 0.3, thickness: 3, color: '#ffffff', opacity: 0.2},
      ],

      tooltipContent	: function(d) {
        return `CNV gene: ${d.name} chromosome: ${d.block_id} | CN value: ${d.value}`
      },
    })
    .highlight('cytobands', data, {
      innerRadius: .3,
      outerRadius: .35,
      opacity: 0.5,
      color: function (d) {
        return gieStainColor[d.gieStain]
      }
    })
    .chords('l1',chord_data,{
      radius: 0.3,
      logScale: false,
      opacity: 0.9,
      color: '#ffce44',
      color: function(d){
        if(d.source.svtype){
          return '#ffce44'
        }else{
          return "#0F9D58"
        }
      },
      tooltipContent: function (d) {
        console.log(d);
        if(d.source.svtype){
          return`<h3> SV Type : ${d.source.svtype} | source : ${d.source.id} | ${d.source.name}  ➤ target: ${d.target.id} | ${d.target.name} </h3>`
        }else{
          return `<h3> Fusion source : ${d.source.id} | ${d.source.name}  ➤ target: ${d.target.id} | ${d.target.name} </h3>`
        }
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
          labelSize: '1px',
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
    // setLoader(false)
    // setTimeout(function() {
    //   if(circosJson && fusionJson){
    //   }
    // }, (1000));
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
    <div className="grid grid-cols-12">
      <div className="col-span-9 p-5">
        <div ref={ref} className={`circos block ${watermarkCss}`} id='circos'></div>
      </div>
      <div className="col-span-3 pl-8">
        <img src={placeholder} width='400' className="mt-10 object-contain h-2/5"/>
      </div>
    </div>
  )
})

export default CircosCmp
