import React, { useState,useEffect } from 'react'
import * as d3 from 'd3'
import {scaleSequential} from 'd3-scale'


export default function HeatmapCmp({ width }) {

  const drawChart = (data) => {
    let width = 900,
    height = 500,
    wrapperWidth = Math.min(width, height) * 0.6,
    linkHeight = 50,
    margin = 5,
    heatmapWidth = wrapperWidth - (linkHeight + margin),
    mousePosition;


    // append the svg object to the body of the page

    var svg = d3.select('#heatmap')
          .append("svg")
          .attr('width', width)
          .attr('height', height)
          .on('mousemove', function() {
              mousePosition = d3.pointer(this);
              tooltipGroup.attr('transform', 'translate(' + (mousePosition[0] - (150 / 2) + 10) + ',' + (mousePosition[1] + 20) + ')');
              tooltipText.text(function() {
                  return selectedCell ? '(' + selectedCell.col + ', ' + selectedCell.row + '): value: ' + selectedCell.value : ''
              });
          });

      var heatmap = svg.append('g').attr('class', 'heatmap')
      .attr('transform', 'translate('+ ((width - wrapperWidth) / 2) + ',' + ((height - wrapperWidth) / 2) + ')');

      var tableData = [
        {
            key: 'a',
            values: [
                {key: 'd1', value: 0.1},
                {key: 'd2', value: 0.5},
                {key: 'd4', value: 0.9},
                {key: 'd3', value: 0.6}
            ]
        },
        {
            key: 'f',
            values: [
                {key: 'd1', value: 0.6},
                {key: 'd2', value: 0.9},
                {key: 'd4', value: 0.6},
                {key: 'd3', value: 0.9}
            ]
        },
        {
            key: 'g',
            values: [
                {key: 'd1', value: 0.7},
                {key: 'd2', value: 0.8},
                {key: 'd4', value: 0.9},
                {key: 'd3', value: 0.8}
            ]
        },
        {
            key: 'e',
            values: [
                {key: 'd1', value: 0.5},
                {key: 'd2', value: 0.1},
                {key: 'd4', value: 0.4},
                {key: 'd3', value: 0.5}
            ]
        },
        {
            key: 'b',
            values: [
                {key: 'd1', value: 0.2},
                {key: 'd2', value: 0.4},
                {key: 'd4', value: 0.1},
                {key: 'd3', value: 0.7}
            ]
        },
        {
            key: 'c',
            values: [
                {key: 'd1', value: 0.3},
                {key: 'd2', value: 0.3},
                {key: 'd4', value: 0.2},
                {key: 'd3', value: 0.8}
            ]
        },
        {
            key: 'd',
            values: [
                {key: 'd1', value: 0.4},
                {key: 'd2', value: 0.2},
                {key: 'd4', value: 0.3},
                {key: 'd3', value: 0.9}
            ]
        }
    ];
      var nCols = tableData[0].values.length;
      var nRows = tableData.length;
      var bandX = d3.scaleBand()
        .domain(d3.range(nCols))
        .range([0, heatmapWidth]);
      var bandY = d3.scaleBand()
        .domain(d3.range(nRows))
        .range([0, heatmapWidth]);

      var heatColor = d3.scaleLinear().domain([0.1, 0.5, 0.9]).range(['#00ff00', '#ff0000', 'black']);
      var table = heatmap.append('g').attr('class', 'table')
        .attr('transform', 'translate(' + (linkHeight + margin) + ',' + (linkHeight + margin) + ')');
      var rows = table.selectAll('.row')
          .data(tableData)
          .enter().append('g')
          .attr('class', 'row')
          .attr('transform', function(d, i) {
              return 'translate(0, ' + bandY(i) + ')';
          });

      var selectedCell;

      rows.selectAll('rect')
        .data(function(d) { d.values.map(function(i) {return i.parent = d.key}); return d.values; })
        .enter().append('rect')
        .style('fill', function (d) {return heatColor(d.value)})
        .style('opacity', 0.7)
        .attr('x', function(d, i) {return bandX(i);})
        .attr('width', bandX.bandwidth())
        .attr('height', bandY.bandwidth())
        .on('mouseover', function(d) {
            selectedCell = {row: d.parent, col: d.key, value: d.value};
            tooltip.style('opacity', 1);
            d3.select(this)
                .style('opacity', 1)
                .style('stroke', '#000')
                .style('stroke-width', 2);
        })
        .on('mouseout', function(d) {
            selectedCell = null;
            tooltip.style('opacity', 0);
            d3.select(this)
                .style('opacity', 0.7)
                .style('stroke-width', 0);
        });

        var yRootData = {
          totalLength: 0.76,
          children: [
              {
                  length: 0.05,
                  children: [
                      {
                          length: 0.71,
                          key: 'a'
                      },
                      {
                          length: 0.37,
                          children: [
                              {
                                  length: 0.34,
                                  key: 'f'
                              },
                              {
                                  length: 0.34,
                                  key: 'g'
                              }
                          ]
                      }
                  ]
              },
              {
                  length: 0.33,
                  children: [
                      {
                          length: 0.43,
                          key: 'e'
                      },
                      {
                          length: 0.21,
                          children : [
                              {
                                  length: 0.22,
                                  key: 'b'
                              },
                              {
                                  length: 0.10,
                                  children: [
                                      {
                                          length: 0.12,
                                          key: 'c'
                                      },
                                      {
                                          length: 0.12,
                                          key: 'd'
                                      }
                                  ]
                              }
                          ]
                      }
                  ]
              }
          ]
      };

      var yRoot = d3.hierarchy(yRootData)
             .sum(function(d) {
                 return d.length;
             });

     setYLinkScaledY(yRoot, yRoot.data.length = 0, linkHeight / yRoot.data.totalLength);
        function setYLinkScaledY(d, y0, k) {
            d.yLinkScaledY = (y0 += d.data.length) * k;
            if (d.children) d.children.forEach(function(d) { setYLinkScaledY(d, y0, k); });
      }


      var yCluster = d3.cluster()
        .size([heatmapWidth, linkHeight])
        .separation(function() {return 1;});

      yCluster(yRoot);

      var yLinks = heatmap.append('g').attr('class', 'ylinks')
        .attr('transform', 'translate(' + 0 + ',' + (linkHeight + margin) + ')');

      yLinks.selectAll('.link')
          .data(yRoot.descendants().slice(1))
          .enter().append('path')
          .attr('class', 'link')
          .style('fill', 'none')
          .style('stroke', '#000')
          .style('stroke-width', 1)
          .attr("d", function(d) {
              return "M" + d.yLinkScaledY + "," + d.x
                      + "L" + d.parent.yLinkScaledY + "," + d.x
                      + " " + d.parent.yLinkScaledY + "," + d.parent.x;
          });

        var yNodes = heatmap.append('g').attr('class', 'ynodes')
            .attr('transform', 'translate(' + (heatmapWidth + margin + 10) + ',' + (linkHeight + margin + 4) + ')');

        yNodes.selectAll('.y-node')
            .data(yRoot.descendants())
            .enter().append('text')
            .attr('class', function(d) {return 'y-node ' + (d.data.key ? d.data.key : '')})
            .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })
            .text(function(d) { return d.children ? '' : d.data.key });


            var xRootData = {
            totalLength: 0.8,
            children: [
                {
                    length: 0.4,
                    children: [
                        {
                            length: 0.4,
                            key: 'd1'
                        },
                        {
                            length: 0.4,
                            key: 'd2'
                        }
                    ]
                },
                {
                    length: 0.6,
                    children: [
                        {
                            length: 0.2,
                            key: 'd4'
                        },
                        {
                            length: 0.2,
                            key: 'd3'
                        }
                    ]
                }
            ]
        };

      var xRoot = d3.hierarchy(xRootData)
        .sum(function(d) {
            return d.length;
        });

      setXLinkScaledY(xRoot, xRoot.data.length = 0, linkHeight / xRoot.data.totalLength);

    function setXLinkScaledY(d, y0, k) {
        d.xLinkScaledY = (y0 += d.data.length) * k;
        if (d.children) d.children.forEach(function(d) { setXLinkScaledY(d, y0, k); });
    }

    var xCluster = d3.cluster()
        .size([heatmapWidth, linkHeight])
        .separation(function() {return 1;});

    xCluster(xRoot);

    var xLinks = heatmap.append('g').attr('class', 'xlinks')
        .attr('transform', 'translate(' + (linkHeight + margin) + ',' + 0 + ')');

    xLinks.selectAll('.link')
            .data(xRoot.descendants().slice(1))
            .enter().append('path')
            .attr('class', 'link')
            .style('fill', 'none')
            .style('stroke', 'blue')
            .style('stroke-width', 1)
            .attr("d", function(d) {
                return "M" + d.x + "," + d.xLinkScaledY
                        + "L" + d.x + "," + d.parent.xLinkScaledY
                        + " " + d.parent.x + "," + d.parent.xLinkScaledY;
            });

      var xNodes = heatmap.append('g').attr('class', 'xnodes')
        .attr('transform', 'translate(' + (linkHeight + margin - 5) + ',' + (heatmapWidth + margin + 20) + ')');

      xNodes.selectAll('.x-node')
          .data(xRoot.descendants())
          .enter().append('text')
          .attr('class', 'x-node')
          .style("text-anchor", 'start')
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .text(function(d) { return d.children ? '' : d.data.key });

      var tooltipGroup = svg.append('g').attr('class', 'tooltip');
      var tooltip = tooltipGroup.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 150)
            .attr('height', 30)
            .style('opacity', 0)
            .style('stroke', '#000')
            .style('stroke-width', 1)
            .style('fill', 'rgba(255, 255, 255, 0.9');
      var tooltipText = tooltipGroup.append('text')
          .attr('x', 0)
          .attr('y', 0)
          .attr('dx', 10)
          .attr('dy', 20)
  }


  useEffect(()=>{
    let d = [{group: "A", variable: "v1", value: "30"},
    {group: "A", variable: "v2", value: "95"},
    {group: "A", variable: "v3", value: "22"},
    {group: "A", variable: "v4", value: "14"},
    {group: "A", variable: "v5", value: "59"},
    {group: "A", variable: "v6", value: "52"},
    {group: "A", variable: "v7", value: "88"},
    {group: "A", variable: "v8", value: "20"},
    {group: "A", variable: "v9", value: "99"},
    {group: "A", variable: "v10", value: "66"},
    {group: "B", variable: "v1", value: "37"},
    {group: "B", variable: "v2", value: "50"},
    {group: "B", variable: "v3", value: "81"},
    {group: "B", variable: "v4", value: "79"},
    {group: "B", variable: "v5", value: "84"},
    {group: "B", variable: "v6", value: "91"},
    {group: "B", variable: "v7", value: "82"},
    {group: "B", variable: "v8", value: "89"},
    {group: "B", variable: "v9", value: "6"},
    {group: "B", variable: "v10", value: "67"},
    {group: "C", variable: "v1", value: "96"},
    {group: "C", variable: "v2", value: "13"},
    {group: "C", variable: "v3", value: "98"},
    {group: "C", variable: "v4", value: "10"},
    {group: "C", variable: "v5", value: "86"},
    {group: "C", variable: "v6", value: "23"},
    {group: "C", variable: "v7", value: "74"},
    {group: "C", variable: "v8", value: "47"},
    {group: "C", variable: "v9", value: "73"},
    {group: "C", variable: "v10", value: "40"},
    {group: "D", variable: "v1", value: "75"},
    {group: "D", variable: "v2", value: "18"},
    {group: "D", variable: "v3", value: "92"},
    {group: "D", variable: "v4", value: "43"},
    {group: "D", variable: "v5", value: "16"},
    {group: "D", variable: "v6", value: "27"},
    {group: "D", variable: "v7", value: "76"},
    {group: "D", variable: "v8", value: "24"},
    {group: "D", variable: "v9", value: "1"},
    {group: "D", variable: "v10", value: "87"},
    {group: "E", variable: "v1", value: "44"},
    {group: "E", variable: "v2", value: "29"},
    {group: "E", variable: "v3", value: "58"},
    {group: "E", variable: "v4", value: "55"},
    {group: "E", variable: "v5", value: "65"},
    {group: "E", variable: "v6", value: "56"},
    {group: "E", variable: "v7", value: "9"},
    {group: "E", variable: "v8", value: "78"},
    {group: "E", variable: "v9", value: "49"},
    {group: "E", variable: "v10", value: "36"},
    {group: "F", variable: "v1", value: "35"},
    {group: "F", variable: "v2", value: "80"},
    {group: "F", variable: "v3", value: "8"},
    {group: "F", variable: "v4", value: "46"},
    {group: "F", variable: "v5", value: "48"},
    {group: "F", variable: "v6", value: "100"},
    {group: "F", variable: "v7", value: "17"},
    {group: "F", variable: "v8", value: "41"},
    {group: "F", variable: "v9", value: "33"},
    {group: "F", variable: "v10", value: "11"},
    {group: "G", variable: "v1", value: "77"},
    {group: "G", variable: "v2", value: "62"},
    {group: "G", variable: "v3", value: "94"},
    {group: "G", variable: "v4", value: "15"},
    {group: "G", variable: "v5", value: "69"},
    {group: "G", variable: "v6", value: "63"},
    {group: "G", variable: "v7", value: "61"},
    {group: "G", variable: "v8", value: "54"},
    {group: "G", variable: "v9", value: "38"},
    {group: "G", variable: "v10", value: "93"},
    {group: "H", variable: "v1", value: "39"},
    {group: "H", variable: "v2", value: "26"},
    {group: "H", variable: "v3", value: "90"},
    {group: "H", variable: "v4", value: "83"},
    {group: "H", variable: "v5", value: "31"},
    {group: "H", variable: "v6", value: "2"},
    {group: "H", variable: "v7", value: "51"},
    {group: "H", variable: "v8", value: "28"},
    {group: "H", variable: "v9", value: "42"},
    {group: "H", variable: "v10", value: "7"},
    {group: "I", variable: "v1", value: "5"},
    {group: "I", variable: "v2", value: "60"},
    {group: "I", variable: "v3", value: "21"},
    {group: "I", variable: "v4", value: "25"},
    {group: "I", variable: "v5", value: "3"},
    {group: "I", variable: "v6", value: "70"},
    {group: "I", variable: "v7", value: "34"},
    {group: "I", variable: "v8", value: "68"},
    {group: "I", variable: "v9", value: "57"},
    {group: "I", variable: "v10", value: "32"},
    {group: "J", variable: "v1", value: "19"},
    {group: "J", variable: "v2", value: "85"},
    {group: "J", variable: "v3", value: "53"},
    {group: "J", variable: "v4", value: "45"},
    {group: "J", variable: "v5", value: "71"},
    {group: "J", variable: "v6", value: "64"},
    {group: "J", variable: "v7", value: "4"},
    {group: "J", variable: "v8", value: "12"},
    {group: "J", variable: "v9", value: "97"},
    {group: "J", variable: "v10", value: "72"}]
    drawChart(d)
  },[])
  return (
    <div id='heatmap' className='p-3'>
    </div>
  )
}
