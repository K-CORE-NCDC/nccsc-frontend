import React, { useState, useEffect, Fragment } from 'react'
import * as d3 from 'd3'
import { scaleSequential } from 'd3-scale'
import Clustergrammer from 'react-clustergrammer';
import '../../styles/clustergram.css'

export default function HeatmapNewCmp({ width, data }) {
    const drawChart = (data) => {
        var width = 900,
            height = 500,
            wrapperWidth = Math.min(width, height) * 0.6,
            linkHeight = 50,
            margin = 5,
            heatmapWidth = wrapperWidth - (linkHeight + margin),
            mousePosition;

        var svg = d3.select('#heatmap')
            .append("svg")
            .attr('width', width)
            .attr('height', height)
            .on('mousemove', function () {
                mousePosition = d3.pointer(this);
                tooltipGroup.attr('transform', 'translate(' + (mousePosition[0] - (150 / 2) + 10) + ',' + (mousePosition[1] + 20) + ')');
                tooltipText.text(function () {
                    return selectedCell ? '(' + selectedCell.col + ', ' + selectedCell.row + '): value: ' + selectedCell.value : ''
                });
            });

        var heatmap = svg.append('g').attr('class', 'heatmap')
            .attr('transform', 'translate(' + ((width - wrapperWidth) / 2) + ',' + ((height - wrapperWidth) / 2) + ')');
        var tableData = [
            {
                key: 'a',
                values: [
                    { key: 'd1', value: 0.1 },
                    { key: 'd2', value: 0.5 },
                    { key: 'd4', value: 0.9 },
                    { key: 'd3', value: 0.6 }
                ]
            },
            {
                key: 'f',
                values: [
                    { key: 'd1', value: 0.6 },
                    { key: 'd2', value: 0.9 },
                    { key: 'd4', value: 0.6 },
                    { key: 'd3', value: 0.9 }
                ]
            },
            {
                key: 'g',
                values: [
                    { key: 'd1', value: 0.7 },
                    { key: 'd2', value: 0.8 },
                    { key: 'd4', value: 0.9 },
                    { key: 'd3', value: 0.8 }
                ]
            },
            {
                key: 'e',
                values: [
                    { key: 'd1', value: 0.5 },
                    { key: 'd2', value: 0.1 },
                    { key: 'd4', value: 0.4 },
                    { key: 'd3', value: 0.5 }
                ]
            },
            {
                key: 'b',
                values: [
                    { key: 'd1', value: 0.2 },
                    { key: 'd2', value: 0.4 },
                    { key: 'd4', value: 0.1 },
                    { key: 'd3', value: 0.7 }
                ]
            },
            {
                key: 'c',
                values: [
                    { key: 'd1', value: 0.3 },
                    { key: 'd2', value: 0.3 },
                    { key: 'd4', value: 0.2 },
                    { key: 'd3', value: 0.8 }
                ]
            },
            {
                key: 'd',
                values: [
                    { key: 'd1', value: 0.4 },
                    { key: 'd2', value: 0.2 },
                    { key: 'd4', value: 0.3 },
                    { key: 'd3', value: 0.9 }
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
            .attr('transform', function (d, i) {
                return 'translate(0, ' + bandY(i) + ')';
            });
        var selectedCell;

        rows.selectAll('rect')
            .data(function (d) { d.values.map(function (i) { return i.parent = d.key }); return d.values; })
            .enter().append('rect')
            .style('fill', function (d) { return heatColor(d.value) })
            .style('opacity', 0.7)
            .attr('x', function (d, i) { return bandX(i); })
            .attr('width', bandX.bandwidth())
            .attr('height', bandY.bandwidth())
            .on('mouseover', function (d) {
                selectedCell = { row: d.parent, col: d.key, value: d.value };
                tooltip.style('opacity', 1);
                d3.select(this)
                    .style('opacity', 1)
                    .style('stroke', '#000')
                    .style('stroke-width', 2);
            })
            .on('mouseout', function (d) {
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
                            children: [
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
            .sum(function (d) {
                return d.length;
            });

        setYLinkScaledY(yRoot, yRoot.data.length = 0, linkHeight / yRoot.data.totalLength);
        function setYLinkScaledY(d, y0, k) {
            d.yLinkScaledY = (y0 += d.data.length) * k;
            if (d.children) d.children.forEach(function (d) { setYLinkScaledY(d, y0, k); });
        }

        var yCluster = d3.cluster()
            .size([heatmapWidth, linkHeight])
            .separation(function () { return 1; });

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
            .attr("d", function (d) {
                return "M" + d.yLinkScaledY + "," + d.x
                    + "L" + d.parent.yLinkScaledY + "," + d.x
                    + " " + d.parent.yLinkScaledY + "," + d.parent.x;
            });

        var yNodes = heatmap.append('g').attr('class', 'ynodes')
            .attr('transform', 'translate(' + (heatmapWidth + margin + 10) + ',' + (linkHeight + margin + 4) + ')');

        yNodes.selectAll('.y-node')
            .data(yRoot.descendants())
            .enter().append('text')
            .attr('class', function (d) { return 'y-node ' + (d.data.key ? d.data.key : '') })
            .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')'; })
            .text(function (d) { return d.children ? '' : d.data.key });

        var xRootData = { "totalLength": 2, "children": [{ "length": 1.1874342087037917, "children": [], "key": "d4" }, { "length": 1.1874342087037917, "children": [{ "length": 0.8124038404635961, "children": [], "key": "d1" }, { "length": 0.8124038404635961, "children": [{ "length": 0.6782329983125269, "children": [], "key": "d2" }, { "length": 0.6782329983125269, "children": [], "key": "d3" }], "key": "d2-d3" }], "key": "d1-d2-d3" }], "key": "d1-d2-d3-d4" }

        var xRoot = d3.hierarchy(xRootData)
            .sum(function (d) {
                return d.length;
            });

        setXLinkScaledY(xRoot, xRoot.data.length = 0, linkHeight / xRoot.data.totalLength);
        function setXLinkScaledY(d, y0, k) {
            d.xLinkScaledY = (y0 += d.data.length) * k;
            if (d.children) d.children.forEach(function (d) { setXLinkScaledY(d, y0, k); });
        }

        var xCluster = d3.cluster()
            .size([heatmapWidth, linkHeight])
            .separation(function () { return 1; });
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
            .attr("d", function (d) {
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
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .text(function (d) { return d.children ? '' : d.data.key });

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

    useEffect(() => {
        let d = ''
        drawChart(d)
    }, [])


    return (
        <div id='heatmap' className='p-3'>
        </div>
    )
}
