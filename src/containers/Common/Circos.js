import { XCircleIcon } from '@heroicons/react/solid';
import * as Circos from 'circos';
import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import placeholder from '../../assets/images/circosLegend2.png';
import cytobands from './cytobands.csv';
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
};
const CircosCmp = React.forwardRef(
  ({ width, data, watermarkCss, fusionJson, selectedGenes, vizType }, ref) => {
    let selectedGenesObject = {};
    selectedGenes.forEach((e) => {
      selectedGenesObject[e] = true;
    });
    const selectedGeneColor = '#000';
    const [state, setState] = useState({ cytobands: [], genes: [], GRCh37: [] });
    const [openModal, setOpenModal] = useState(false);
    const [legendData,setLegendData] = useState({})
    // const [loader, setLoader] = useState(false)

    const staticPositionValues = {
      chr1: 249250621,
      chr2: 243199373,
      chr3: 198022430,
      chr4: 191154276,
      chr5: 180915260,
      chr6: 171115067,
      chr7: 159138663,
      chr8: 146364022,
      chr9: 141213431,
      chr10: 135534747,
      chr11: 135006516,
      chr12: 133851895,
      chr13: 115169878,
      chr14: 107349540,
      chr15: 102531392,
      chr16: 90354753,
      chr17: 81195210,
      chr18: 78077248,
      chr19: 59128983,
      chr20: 63025520,
      chr21: 48129895,
      chr22: 51304566,
      chrX: 155270560,
      chrY: 59373566
    };



    const drawCircos = (width, GRCh37, cytobands, api_data) => {
      let childnode = document.getElementById('circos');
      if (childnode.hasChildNodes()) {
        while (childnode.firstChild) {
          childnode.removeChild(childnode.firstChild);
        }
      }
      var newWidth = width - 100;

      var circosHighlight = new Circos({
        container: '#circos',
        width: newWidth,
        height: newWidth
      });




      let data = cytobands;
      let all_chr = [];

      for (var i = 0; i < GRCh37.length; i++) {


          all_chr.push({
            block_id: GRCh37[i]['id'],
            position: 0,
            value: 0,
            name: ''
          });
        }

      var mutationData = [...all_chr];
      let total_scatter = []

      if ('dna_mutation' in api_data) {
        if(api_data['dna_mutation'].length>0){
          total_scatter.push('dna_mutation')
        }
        let strchr = 0;
        let iter = 1;
        let dna_mutation_data = api_data['dna_mutation'];
        for (let i = 0; i < dna_mutation_data.length; i++) {

          const startPos = staticPositionValues[dna_mutation_data[i].chromosome];
          let position = Math.floor(Math.random() * startPos);
          mutationData.push({
            block_id: dna_mutation_data[i].chromosome,
            position: position,
            value: dna_mutation_data[i].value,
            name: dna_mutation_data[i].hugo_symbol
          });

          if (iter === 10) {
            iter = 1;
            strchr = iter + parseFloat((strchr + 3.5).toFixed(3));
          }
          iter++;
        }
      }

      var dna_methylation = [...all_chr];

      if ('dna_methylation' in api_data) {
        if(api_data['dna_methylation'].length>0){
          total_scatter.push('dna_methylation')
        }
        let strchr = 0;
        let iter = 1;
        let dna_methylation_data = api_data['dna_methylation'];
        for (let i = 0; i < dna_methylation_data.length; i++) {
          const startPos = staticPositionValues[dna_methylation_data[i].chromosome];
          let position = Math.floor(Math.random() * startPos);
          dna_methylation.push({
            block_id: dna_methylation_data[i].chromosome,
            position: position,
            value: dna_methylation_data[i].value,
            name: dna_methylation_data[i].hugo_symbol
          });

          if (iter === 10) {
            iter = 1;
            strchr = iter + parseFloat((strchr + 3.5).toFixed(3));
          }
          iter++;
        }
      }

      var rna_expression_up = [...all_chr];
      if ('rna_expression' in api_data) {
        if(api_data['rna_expression'].length>0){
          total_scatter.push('rna_expression')
        }
        let rna_expression_data = api_data['rna_expression'];
        for (let i = 0; i < rna_expression_data.length; i++) {
          const startPos = staticPositionValues[rna_expression_data[i].chromosome];
          let position = Math.floor(Math.random() * startPos);
          rna_expression_up.push({
            block_id: rna_expression_data[i].chromosome,
            position: position,
            value: parseFloat(rna_expression_data[i].value),
            name: rna_expression_data[i].hugo_symbol
          });
        }
      }

      var global_proteome_up = [...all_chr];
      if ('global_proteome' in api_data) {
        if(api_data['global_proteome'].length>0){

          total_scatter.push('global_proteome')
        }
        let global_proteome_data = api_data['global_proteome'];
        for (let i = 0; i < global_proteome_data.length; i++) {
          const startPos = staticPositionValues[global_proteome_data[i].chromosome];
          let position = Math.floor(Math.random() * startPos);
          global_proteome_up.push({
            block_id: global_proteome_data[i].chromosome,
            position: position,
            value: global_proteome_data[i].value,
            name: global_proteome_data[i].hugo_symbol
          });
        }
      }

      var cnvData = [...all_chr];
      if ('cnv' in api_data) {
        if(api_data['cnv'].length>0){
        total_scatter.push('cnv')
        }
        let cnv_data = api_data['cnv'];
        for (let i = 0; i < cnv_data.length; i++) {
          const startPos = staticPositionValues[cnv_data[i].chromosome];
          let position = Math.floor(Math.random() * startPos);
          cnvData.push({
            block_id: cnv_data[i].chromosome,
            position: position,
            value: parseInt(cnv_data[i].genome_change),
            name: cnv_data[i].hugo_symbol
          });
        }
      }

      let chord_data = api_data['fusion_genes_data'];
      if ('fusion_genes_data' in api_data){
        if(api_data['fusion_genes_data'].length>0){
          total_scatter.push('fusion_genes_data')
          }
      }

      if ('sv_data' in api_data) {
        if(api_data['sv_data'].length>0){
          total_scatter.push('sv_data')
        }
        let svData = api_data['sv_data'];
        if (Object.keys(svData).length) {
          svData.forEach((element) => {
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
                name: element.right_gene_name
              }
            });
          });
        }
      }

      let total_scatter_length = total_scatter.length
      let tmpOuterRadius = 1.0


      let pos = []

      for(i=1;i<=total_scatter_length;i++){
        let tmp_pos = 1/total_scatter_length
        if(i!=1){
          tmp_pos = tmp_pos*i
        }
        pos.push(tmp_pos)

      }

      // console.log('pos,', pos)
      let tmpInnerRadius = pos.pop()-0.1;
      if (total_scatter_length==1){
        tmpInnerRadius = 0.2
      }

      let mutationInnerRadius = 0.0
      let mutationOuterRadius = 0.0
      let rnaInnerRadius = 0.0
      let rnaOuterRadius = 0.0
      let methylationInnerRadius = 0.0
      let methylationOuterRadius = 0.0
      let proteomeInnerRadius = 0.0
      let proteomeOuterRadius = 0.0
      let cnvInnerRadius = 0.0
      let cnvOuterRadius = 0.0
      let svInnerRadius = 0.0
      let svOuterRadius = 0.0
      if(total_scatter.indexOf('dna_mutation')>-1){
        mutationInnerRadius = tmpInnerRadius
        mutationOuterRadius = tmpOuterRadius
        tmpOuterRadius = tmpInnerRadius
        tmpInnerRadius = pos.pop();
      }
      if(total_scatter.indexOf('rna_expression')>-1){
        rnaInnerRadius = tmpInnerRadius
        rnaOuterRadius = tmpOuterRadius
        tmpOuterRadius = tmpInnerRadius
        tmpInnerRadius = pos.pop();
      }
      if(total_scatter.indexOf('dna_methylation')>-1){
        methylationInnerRadius = tmpInnerRadius
        methylationOuterRadius = tmpOuterRadius
        tmpOuterRadius = tmpInnerRadius
        tmpInnerRadius = pos.pop();
      }

      if(total_scatter.indexOf('global_proteome')>-1){
        proteomeInnerRadius = tmpInnerRadius
        proteomeOuterRadius = tmpOuterRadius
        tmpOuterRadius = tmpInnerRadius
        tmpInnerRadius = pos.pop();
      }
      if(total_scatter.indexOf('cnv')>-1){
        cnvInnerRadius = tmpInnerRadius
        cnvOuterRadius = tmpOuterRadius
        tmpOuterRadius = tmpInnerRadius
        tmpInnerRadius = pos.pop();
      }
      if(total_scatter.indexOf('fusion_genes_data')>-1){
        svInnerRadius = tmpInnerRadius
        svOuterRadius = tmpOuterRadius
        tmpOuterRadius = tmpInnerRadius
        tmpInnerRadius = pos.pop();
      }
      if(total_scatter.indexOf('sv_data')>-1){
        svInnerRadius = tmpInnerRadius
        svOuterRadius = tmpOuterRadius
        tmpOuterRadius = tmpInnerRadius
        tmpInnerRadius = pos.pop();
      }


      let conf = {

        innerRadius: newWidth / 2 - 100,
        outerRadius: newWidth / 2 - 50,
        labels: {
          position: 'center',
          display: true,
          size: 6,
          color: '#000',
          radialOffset: 70
        },
        ticks: {
          display: false,
          spacing: 1000000,
          labelSize: '16px',
          labelSuffix: ''
        }
      };



      let circosPlot = circosHighlight.layout(GRCh37, conf).highlight('cytobands-1', data, {
        innerRadius: newWidth / 2 - 100,
        outerRadius: newWidth / 2 - 50,
        opacity: 0.5,
        color: function (d) {
          return gieStainColor[d.gieStain];
        }
      });

      if (mutationData.length > 24) {
        circosPlot.scatter('dna-mutation', mutationData, {
          // innerRadius: 0.89,
          // outerRadius: 0.99,
          innerRadius: mutationInnerRadius,
          outerRadius: mutationOuterRadius,
          color: function (d) {
            if (mutationData) {
              if (d.name) {
                if (d.name in selectedGenesObject) {
                  return selectedGeneColor;
                } else {
                  return '#7d7878';
                }
              } else {
                return '#000';
              }
            }
          },
          strokeColor: function (d) {
            if (d.name) {
              return 1;
            } else {
              return 0;
            }
          },
          showAxesTooltip: false,
          strokeWidth: 2.0,
          shape: 'circle',
          size: 7,
          min: 0,
          max: 1,
          axes: [
            { spacing: 0.1, thickness: 3, color: '#f44336', opacity: 0.2 },
            { spacing: 0.2, thickness: 3, color: '#f44336', opacity: 0.2 },
            { spacing: 0.3, thickness: 3, color: '#f44336', opacity: 0.2 }
          ],

          tooltipContent: function (d) {
            return `<h4> DNA mutation: ${d.name} ➤ ${d.block_id}:${Math.round(d.position)}</h4>`;
          }
        });
      }

      if (rna_expression_up.length > 24) {
        circosPlot.scatter('rna-up', rna_expression_up, {
          innerRadius: rnaInnerRadius,
          outerRadius: rnaOuterRadius,

          color: function (d) {
            if (d.name in selectedGenesObject) {
              return selectedGeneColor;
            } else {

              if (d.value >= 1) {
                return '#f22316';
              }
              if (d.value <= -1) {

                return '#115ff0';
              }
              return '#a8a5a5';
            }
          },
          strokeColor: function (d) {
            if (d.name) {
              return 1;
            } else {
              return 0;
            }
          },
          showAxesTooltip: false,
          strokeWidth: 2.0,
          shape: 'circle',
          size: 7,
          // min: -3,
          max: 3,
          axes: [
            { spacing: 0.1, thickness: 1, color: '#c8d4c5', opacity: 0.2 },
            { spacing: 0.2, thickness: 3, color: '#c8d4c5', opacity: 0.2 },
            { spacing: 0.3, thickness: 2, color: '#77b2e6', opacity: 0.3 },
            { spacing: 0.4, thickness: 4, color: '#77b2e6', opacity: 0.4 }
          ],
          tooltipContent: function (d) {
            return `<h4>RNA gene: ${d.name} ➤ ${d.block_id} | z score: ${d.value}</h4>`;
          }
        });
      }
      if (dna_methylation.length > 24) {
        circosPlot.scatter('snp-250-4', dna_methylation, {

          innerRadius: methylationInnerRadius,
          outerRadius: methylationOuterRadius,

          showAxesTooltip: false,
          color: function (d) {
            if (dna_methylation) {
              if (d.name) {
                if (d.name in selectedGenesObject) {
                  return selectedGeneColor;
                } else {
                  return '#000';
                }
              } else {
                return '#c9c5c5';
              }
            }
          },
          strokeColor: function (d) {
            if (dna_methylation) {
              if (d.name in selectedGenesObject) {
                return selectedGeneColor;
              } else {
                return '#eee';
              }
            }
          },
          strokeWidth: 2.0,
          shape: 'circle',
          size: 7,
          // min: 0,
          // max: 1,
          axes: [
            { spacing: 0.1, thickness: 3, color: '#c8d4c5', opacity: 0.3 },
            { spacing: 0.2, thickness: 3, color: '#c8d4c5', opacity: 0.3 },
            { spacing: 0.3, thickness: 3, color: '#529d3f', opacity: 0.3 }
          ],

          tooltipContent: function (d) {
            if (dna_methylation) {
              return `<h4> Methylation gene: ${d.name} ➤ ${d.block_id} | value: ${d.value}</h4>`;
            } else {
              return null;
            }
          }
        });
      }

      if (global_proteome_up.length > 24) {
        circosPlot.scatter('snp-250-5', global_proteome_up, {
          innerRadius: proteomeInnerRadius,
          outerRadius: proteomeOuterRadius,
          showAxesTooltip: false,
          color: function (d) {
            if (d.name in selectedGenesObject) {
              return selectedGeneColor;
            } else {

              if (d.value >= 1.5) {
                return '#f22316'; //red
              }
              else if (d.value <= 0.5) {
                return '#115ff0'; // blue
              }
              else if (d.value== 0){
                return '#8335f0';
              }
              else {
                return '#a8a5a5'; //grey
              }
            }
          },
          strokeColor: function (d) {
            if (d.name) {
              return 1;
            } else {
              return 0;
            }
          },
          strokeWidth: 2.0,
          shape: 'circle',
          size: 7,
          max: 4,
          // // min: -2,

          axes: [
            { spacing: 0.7, thickness: 3, color: '#ed781f', opacity: 0.2 },
            { spacing: 0.7, thickness: 3, color: '#c8d4c5', opacity: 0.2 },
            { spacing: 0.7, thickness: 3, color: '#8335f0', opacity: 0.3 }
          ],

          tooltipContent: function (d) {
            return `<h4> Proteome gene: ${d.name} ➤ ${d.block_id} | value: ${d.value} </h4>`;
          }
        });
      }

      if (cnvData.length > 24) {
        circosPlot.scatter('snp-250-6', cnvData, {
          innerRadius: cnvInnerRadius,
          outerRadius: cnvOuterRadius,
          color: function (d) {
            if (d.name in selectedGenesObject) {
              return selectedGeneColor;
            } else {
              if (d.value == 2) {
                return '#F4B400';
              } else if (d.value >=3){
                return '#0F9D58';
              }
              else if (d.value <=1) {
                return '#fffcfc';
              }
            }
          },
          strokeColor: function (d) {
            if (d.name) {
              return 1;
            } else {
              return 0;
            }
          },
          strokeWidth: 2.0,
          shape: 'circle',
          size: 7,
          // min: -1,
          // max: 7,
          direction: 'center',
          showAxesTooltip: false,
          axes: [
            { spacing: 1, thickness: 3, color: '#abadaa', opacity: 0.5 },
            { spacing: 1, thickness: 1, color: '#bad4b4', opacity: 0.5 }
          ],

          tooltipContent: function (d) {
            return `<h4> CNV gene: ${d.name} ➤ ${d.block_id} | CN value: ${d.value} </h4>`;
          }
        });
      }

      if (chord_data.length > 0) {
        circosPlot.highlight('cytobands', data, {
          innerRadius: svInnerRadius,
          outerRadius: svOuterRadius,

          opacity: 0.5,
          color: function (d) {
            return gieStainColor[d.gieStain];
          },
        });

        circosPlot.chords('l1', chord_data, {
          radius: svInnerRadius,
          logScale: false,
          opacity: 0.9,
          color: '#ffce44',
          class:function(d){
            return 'chord-data'
          },
          color: function (d) {
            if (d.source.svtype) {
              if (d.source.svtype === 'Deletion') {
                return 'red';
              } else {
                return '#ebff1c';
              }
            } else {
              return 'green';
            }
          },
          tooltipContent: function (d) {
            if (d.source.svtype) {
              return `<h4> SV Type : ${d.source.svtype} | source : ${d.source.id} | ${d.source.name}  ➤ target: ${d.target.id} | ${d.target.name} </h4>`;
            } else {
              return `<h4> Fusion source : ${d.source.id} | ${d.source.name}  ➤ target: ${d.target.id} | ${d.target.name} </h4>`;
            }
          },
          events: {
            'mouseover.demo': function () { }
          },
          labels: {
            display: true,
            position: 'center',
            size: '14px',
            color: '#000000',
            radialOffset: 20
          },
          ticks: {
            display: true,
            color: '#a3a6a2',
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
              major: 5
            }
          }
        });
      }

      circosPlot.render();

      let tmp_html = {
        'cytoband':'',
        'dna_mutation':'',
        'rna_up':'',
        'snp-250-4':'',
        'snp-250-5':'',
        'snp-250-6':'',
        'cytobands':'',
        'l1':''
      }
      d3.selectAll('.cytobands-1')
      .each(function(d,i) {
        tmp_html['cytoband'] = d.firstChild.innerHTML
      });
      d3.selectAll('.dna-mutation')
      .each(function(d,i) {
        tmp_html['dna_mutation'] = d.firstChild.innerHTML
      });
      d3.selectAll('.rna-up')
      .each(function(d,i) {
        tmp_html['rna_up'] = d.firstChild.innerHTML
      });
      d3.selectAll('.snp-250-4')
      .each(function(d,i){
        tmp_html['snp-250-4'] = d.firstChild.innerHTML
      });
      d3.selectAll('.snp-250-5')
      .each(function(d,i){
        tmp_html['snp-250-5'] = d.firstChild.innerHTML
      });
      d3.selectAll('.snp-250-6')
      .each(function(d,i){
        tmp_html['snp-250-6'] = d.firstChild.innerHTML
      });
      d3.selectAll('.cytobands')
      .each(function(d,i){
        tmp_html['cytobands'] = d.firstChild.innerHTML
      });

      var cyt = d3.selectAll('.l1')
      .each(function(d,i){

        tmp_html['l1'] = '<path class="chord" d="M2.392349916866057,-99.97137921362929A100,100,0,0,1,3.423641560698617,-99.94137620857468Q0,0,2.3923511202095233,-99.97137918483286A100,100,0,0,1,3.4236427636809625,-99.94137616736471Q0,0,2.392349916866057,-99.97137921362929Z" opacity="0.9" fill="red"></path>'
      });



      setLegendData(tmp_html)
    };

    useEffect(() => {
      d3.csv(cytobands, function (d) {
        return d;
      }).then(function (data) {
        let d = [];
        for (var i = 0; i < data.length; i++) {
          if ('columns' in data[i]) {
            continue;
          } else {
            d.push({
              block_id: data[i].chrom,
              start: parseInt(data[i].chromStart),
              end: parseInt(data[i].chromEnd),
              gieStain: data[i].gieStain
            });
          }
        }

        setState((prevState) => ({
          ...prevState,
          cytobands: d
        }));
      });
    }, []);

    useEffect(() => {
      if (state['cytobands'].length > 0) {

        let d = [
          { id: 'chr1', label: 'chr1', color: '#996600', len: 249250621 },
          { id: 'chr2', label: 'chr2', color: '#666600', len: 243199373 },
          { id: 'chr3', label: 'chr3', color: '#99991E', len: 198022430 },
          { id: 'chr4', label: 'chr4', color: '#CC0000', len: 191154276 },
          { id: 'chr5', label: 'chr5', color: '#FF0000', len: 180915260 },
          { id: 'chr6', label: 'chr6', color: '#FF00CC', len: 171115067 },
          { id: 'chr7', label: 'chr7', color: '#FFCCCC', len: 159138663 },
          { id: 'chr8', label: 'chr8', color: '#FF9900', len: 146364022 },
          { id: 'chr9', label: 'chr9', color: '#FFCC00', len: 141213431 },
          { id: 'chr10', label: 'chr10', color: '#FFFF00', len: 135534747 },
          { id: 'chr11', label: 'chr11', color: '#CCFF00', len: 135006516 },
          { id: 'chr12', label: 'chr12', color: '#00FF00', len: 133851895 },
          { id: 'chr13', label: 'chr13', color: '#358000', len: 115169878 },
          { id: 'chr14', label: 'chr14', color: '#0000CC', len: 107349540 },
          { id: 'chr15', label: 'chr5', color: '#6699FF', len: 102531392 },
          { id: 'chr16', label: 'chr16', color: '#99CCFF', len: 90354753 },
          { id: 'chr17', label: 'chr17', color: '#00FFFF', len: 81195210 },
          { id: 'chr18', label: 'chr18', color: '#CCFFFF', len: 78077248 },
          { id: 'chr19', label: 'chr19', color: '#9900CC', len: 59128983 },
          { id: 'chr20', label: 'chr20', color: '#CC33FF', len: 63025520 },
          { id: 'chr21', label: 'chr21', color: '#CC99FF', len: 48129895 },
          { id: 'chr22', label: 'chr22', color: '#666666', len: 51304566 },
          { id: 'chrX', label: 'chrX', color: '#999999', len: 155270560 },
          { id: 'chrY', label: 'chrY', color: '#CCCCCC', len: 59373566 }
        ];

        drawCircos(width, d, state['cytobands'], data);
      }
    }, [state, data, fusionJson]);

    return (
      <div>
        {vizType && vizType === 2 && <p>
          <FormattedMessage id="OnlyUploadedOmics" defaultMessage="Only uploaded omics data layers are drawn." />
        </p>}
        <div className="Flex JustifyEnd">
          <div>
            <p>
              <FormattedMessage id="ClickToZoomIn" defaultMessage="Click to zoom in !" />
            </p>
            <span
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <img
                alt="placeholder"
                src={placeholder}
                width="150"
                className="mt-10 object-contain h-2/5"
              />
            </span>
          </div>
        </div>
        {openModal && <ModalComponent legendData={legendData} setOpenModal={(data) => setOpenModal(data)} />}
        <div style={{ overflowY: 'auto', height: 'auto', width: 'auto' }}>
          <div className="p-5">
            <div ref={ref} className={`circos block ${watermarkCss}`} id="circos"></div>
          </div>
        </div>
      </div>
    );
  }
);

export default CircosCmp;

export const ModalComponent = ({ setOpenModal,legendData }) => {
  const [html,setHtml] = useState('')
  useEffect(()=>{
    let ct = legendData['cytoband'].split('</path>')[0]
    let ctx1
    if (ct.length>0){
      ct = ct.split('M')[1].split(',')
      ctx1 = ct[0].split('.')[1]
    }
    let dtx1,rtx1,sp4x1,sp5x1,sp6x1,l1x1,cybx1;
    let dt,rt,sp4t,sp5t,sp6t,l1t,cybt;
    if(legendData['dna_mutation']){
      dt = legendData['dna_mutation'].split('</path>')[0]
      dt = dt.split('M')[1].split(',')
      dtx1 = dt[0].split('.')[1]

    }
    if(legendData['rna_up']){
      rt = legendData['rna_up'].split('</path>')[0]
      rt = rt.split('M')[1].split(',')
      rtx1 = rt[0].split('.')[1]

    }
    if(legendData['snp-250-4']){
      sp4t = legendData['snp-250-4'].split('</path>')[0]
      if (sp4t.length>0){
        sp4t = sp4t.split('M')[1].split(',')
        sp4x1 = sp4t[0].split('.')[1]
      }
    }
    if(legendData['snp-250-5']){
      sp5t = legendData['snp-250-5'].split('</path>')[0]
      sp5t = sp5t.split('M')[1].split(',')
      sp5x1 = sp5t[0].split('.')[1]

    }
    if (legendData['snp-250-6']){
      sp6t = legendData['snp-250-6'].split('</path>')[0]
      if (sp6t.length>0){
        sp6t = sp6t.split('M')[1].split(',')
        sp6x1 = sp6t[0].split('.')[1]
      }
    }
    if (legendData['cytobands']){
      cybt = legendData['cytobands'].split('</path>')[0]
      cybt = cybt.split('M')[1].split(',')
      cybx1 = cybt[0].split('.')[1]
    }

            let html_= `<div><svg width="700" height="475" style="transform:rotate(-12deg)">
          <g class='all' transform='translate(100,400)'>`;

        if(legendData['cytoband']){
          html_ += `<g class='cytobands-1'>
            ${legendData['cytoband']}
          </g>
          <g>
            <text x="84" y="-${(ct[2]-50)}" style='transform:rotate(12deg)'>
              <tspan font-weight="bold">Chromosome Band</tspan>
            </text>
          </g>`;
        }
        if(legendData['dna_mutation']){
          html_ += `<g class='dna-mutation'>
            ${legendData['dna_mutation']}
          </g>
          <g>
            <text x="84" y="-${(dt[2])}" style='transform:rotate(12deg)'>
              <tspan font-weight="bold">DNA Mutation - </tspan> Grey:mutated genes
            </text>
          </g>`;
        }
        if(legendData['rna_up']){
          html_ += `<g class='rna-up'>
            ${legendData['rna_up']}
          </g>
          <g>
            <text x="84" y="-${(rt[2])}" style='transform:rotate(12deg)'>
              <tspan font-weight="bold">RNA Expression - </tspan> Red:z-score > 1.5 | Blue:z-score < 1.5
            </text>
          </g>`;
        }
        if(legendData['snp-250-4']){
          html_ += `<g class='snp-250-4'>
            ${legendData['snp-250-4']}
          </g>
          <g>
            <text x="84" y="-${(sp4t[2])}" style='transform:rotate(12deg)'>
              <tspan font-weight="bold">DNA Methylation - </tspan> Grey:methylated genes
            </text>
          </g>`;
        }
        if(legendData['snp-250-5']){
          html_ += `<g class='snp-250-5'>
            ${legendData['snp-250-5']}
          </g>
          <g>
            <text x="84" y="-${(sp5t[2])}" style='transform:rotate(12deg)'>
              <tspan font-weight="bold">Global Proteome - </tspan> Red:z-score > 1.5 | Blue:z-score < 0.5
            </text>
          </g>`;
        }
        if(legendData['snp-250-6']){
          html_ += `<g class='snp-250-6'>
            ${legendData['snp-250-6']}
          </g>
          <g>
            <text x="84" y="-${(sp6t[2])}" style='transform:rotate(12deg)'>
              <tspan font-weight="bold">Copy Number Variation - </tspan> Yellow:cnv >= 3| White:cn = 2| Green:cn <= 1
            </text>
          </g>`;
        }
        if(legendData['cytobands']){
          html_ += `<g class='cytobands'>
            ${legendData['cytobands']}
          </g>
          <g class='l1'>
            ${legendData['l1']}
          </g>
          <g>
            <text x="84" y="-${cybt[9]}" style='transform:rotate(12deg)'>
              <tspan font-weight="bold">Structural Variation - </tspan> Red: Deletion | Green: Insertion
            </text>
          </g>`
      }

      html_ +=`</g></svg></div>`


    setHtml(html_)
  },[legendData])

  return (
    <div className="CircosModal" style={{ position: 'fixed', top: 40, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
      <div className="CircosModalHeader">
        <div className="CircosModalBody">
          <div className="Flex JustifyEnd">
            <XCircleIcon
              style={{ width: '40px', height: '20px', margin: '20px' }}
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div>

             <img alt="placeholder" src={placeholder} className="mt-10 object-contain h-2/5" />
          </div>
        </div>
      </div>
    </div>
  );
};
