import * as d3 from 'd3';
import React, { useEffect } from 'react';
import * as venn from 'venn.js';
import '../../styles/survival.css';

export default function VennCmp({ width, data = null }) {
  useEffect(() => {
    if (data) {
      let sets = data;

      var chart = venn.VennDiagram().width(width);

      var div = d3.select('#venn').datum(sets).call(chart);

      div.select('svg').attr('class', 'inline');

      div.selectAll('path').style('stroke-opacity', 0).style('stroke', '#fff');

      let colors = {
        'Global Proteome': '#f18532',
        'RNA Expression': '#d2352b',
        'DNA Mutation': '#529d3f',
        'Global Proteome_RNA Expression': '#c74a52',
        'DNA Mutation_RNA Expression': '#b49cd6',
        'RNA Expression_DNA Mutation': '#b49cd6',
        'Global Proteome_DNA Mutation': '#3777af',
        'Global Proteome_DNA Mutation_RNA Expression': '#fffebc'
      };
      var tooltip = d3.select('body').append('div').attr('class', 'venntooltip');
      div
        .selectAll('path')
        .data(data)
        .style('fill', function (d) {
          if (d['sets'].length === 1) {
            return colors[d['sets'][0]];
          } else {
            let n = d['sets'].join('_');
            return colors[n];
          }
        })
        .style('fill-opacity', 1);

      div
        .selectAll('text')
        .data(data)
        .style('fill', function () {
          return '#333';
        });
      var svgTmp = d3.selectAll('.venn-area');
      let dTmp = [];
      let labels = svgTmp.selectAll('.label')['_groups'];
      if (labels.length > 0) {
        for (let x = 0; x < labels.length; x++) {
          let xTmp = labels[x][0]['x']['baseVal'][0]['valueAsString'];
          let yTmp = labels[x][0]['y']['baseVal'][0]['valueAsString'];
          let dyTmp = parseFloat(labels[x][0]['dy']['baseVal'][0]['valueAsString']);
          if (labels[x][0].textContent) {
            dyTmp = 2;
          }
          dTmp.push({
            x: xTmp,
            y: yTmp,
            dy: dyTmp,
            size: data[x].size
          });
        }

        svgTmp
          .data(dTmp)
          .append('text')
          .attr('class', 'sam')
          .text(function (d) {
            return d.size;
          })
          .attr('text-anchor', 'middle')
          .attr('fill', '#333')
          .attr('dy', function (d) {
            return d.dy + 'em';
          })
          .attr('x', function (d) {
            return d.x;
          })
          .attr('y', function (d) {
            return d.y;
          });
      }

      div
        .selectAll('g')
        .data(data)
        .on('click', function () {})
        .on('mouseover', function (d, i) {
          var s = i['sets'];
          var html = [];
          for (var j = 0; j < s.length; j++) {
            html.push(s[j]);
          }
          var ht = html.join('/');
          ht = ht + '(' + i.size + ')';
          tooltip.html(ht);
          tooltip.transition().duration(40).style('opacity', 1);
        });
    }
  }, [width, data]);

  return (
    <div>
      <div id="venn" className="relative w-full block text-center"></div>
    </div>
  );
}
