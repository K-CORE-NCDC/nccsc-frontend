import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import * as venn from 'venn.js';
import '../../styles/survival.css';

export default function FusionVennCmp({ parentCallback, width, VennData = null }) {
  const [data, setData] = useState([]);
  const [rnid, setRnid] = useState([]);

  useEffect(() => {
    if (rnid) {
      parentCallback(rnid);
    }
  }, [rnid]);
  useEffect(() => {
    if (VennData.status === 200) {
      let res = VennData.res.data;
      let tmp = [];
      for (const key in res) {
        let k = key.split('_');
        let size = 150;
        if (k.length === 2) {
          size = 30;
        } else if (k.length === 3) {
          size = 20;
        } else {
          size = 150;
        }
        tmp.push({ sets: k, size: size, total_size: res[key].length, key: key });
      }
      setData(tmp);
    }
  }, [width, VennData]);

  useEffect(() => {
    if (data) {
      document.getElementById('venn').innerHTML = '';
      let sets = data;
      var chart = venn.VennDiagram().width(600);
      // var div1 = d3.select('#venn').datum(sets).call(chart);
      // div1.select('svg').attr('class', 'inline');
      // div1.selectAll('path').style('stroke-opacity', 0).style('stroke', '#fff');

      var tooltip = d3.select('#venn').append('div').attr('class', 'venntooltip');


      let colors = {
        'group 1': '#f18532',
        'group 2': '#d2352b',
        'group 3': '#529d3f',
        'group 1_group 2': '#c74a52',
        'group 2_group 3': '#b49cd6',
        'group 3_group 2': '#b49cd6',
        'group 1_group 3': '#3777af',
        'group 1_group 2_group 3': '#fffebc'
      };

      var div = d3.select('#venn').datum(sets).call(chart);

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
            size: data[x]?.size,
            total_size: data[x]?.total_size
          });
        }

        svgTmp
          .data(dTmp)
          .append('text')
          .attr('class', 'sam')
          .text(function (d) {
            return d.total_size;
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
        .on('click', function (i, data) {
          let key = data['key'];
          setRnid(key);
        })
        .on('mouseover', function (d, i) {
          var s = i['sets'];
          var html = [];
          for (var j = 0; j < s.length; j++) {
            html.push(s[j]);
          }
          var ht = html.join('/');
          ht = ht + '(' + i.total_size + ')';
          tooltip.html(ht);
          tooltip.transition().duration(40).style('opacity', 1);
        })
        .on('mousemove', function (d) {
          tooltip.style('left', d.layerX + 'px').style('top', d.offsetY - 50 + 'px');
        })
        .on('mouseout', function () {
          tooltip.transition().duration(2500).style('opacity', 0);
        });
    }
  }, [data]);

  return (
    <div>
      <div id="venn" className="relative w-full block text-center"></div>
    </div>
  );
}
