import React, { useState, useEffect } from 'react';
import * as d3 from 'd3'
import '../../styles/volcano.css'

const VolcanoPlotD3 = ({ dataProps }) => {
    const [volcanoData, setVolcanoData] = useState([])

    function volcanoPlot() {
        var width = 1000,
            height = 800,
            margin = { top: 20, right: 20, bottom: 40, left: 50 },
            xColumn, // name of the variable to be plotted on the axis
            yColumn,
            xAxisLabel, // label for the axis
            yAxisLabel,
            xAxisLabelOffset, // offset for the label of the axis
            yAxisLabelOffset,
            xTicks, // number of ticks on the axis
            yTicks,
            sampleID = "Gene",
            significanceThreshold = 0.05, // significance threshold to colour by
            foldChangeThreshold = 1.0, // fold change level to colour by
            colorRange, // colour range to use in the plot
            xScale = d3.scaleLinear(), // the values for the axes will be continuous
            yScale = d3.scaleLinear();



        function chart(selection) {
            var innerWidth = width - margin.left - margin.right, // set the size of the chart within its container
                innerHeight = height - margin.top - margin.bottom;

            selection.each(function (data) {

                // set up the scaling for the axes based on the inner width/height of the chart and also the range
                // of value for the x and y axis variables. This range is defined by their min and max values as
                // calculated by d3.extent()
                xScale.range([0, innerWidth])
                    .domain([-10, 10])
                    .nice();

                // normally would set the y-range to [height, 0] but by swapping it I can flip the axis and thus
                // have -log10 scale without having to do extra parsing
                yScale.range([0, innerHeight])
                    .domain([10, 0])
                    .nice(); // adds "padding" so the domain extent is exactly the min and max values
                var zoom = d3.zoom()
                    .scaleExtent([1, 20])
                    .translateExtent([[0, 0], [width, height]])
                    .on('zoom', zoomFunction);

                // append the svg object to the selection
                var svg = d3.select(this).append('svg')
                    .attr('height', height)
                    .attr('width', width)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                    .call(zoom);

                // position the reset button and attach reset function
                d3.select('#resetBtn')
                    .style('top', margin.top * 1.5 + 'px')
                    .style('left', margin.left * 1.25 + 'px')
                    .on('click', reset);

                svg.append('defs').append('clipPath')
                    .attr('id', 'clip')
                    .append('rect')
                    .attr('height', innerHeight)
                    .attr('width', innerWidth);

                // add the axes
                var xAxis = d3.axisBottom(xScale);
                var yAxis = d3.axisLeft(yScale)
                   

                var gX = svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + innerHeight + ')')
                    .call(xAxis);

                gX.append('text')
                    .attr('class', 'label')
                    .attr('transform', 'translate(' + width / 2 + ',' + (margin.bottom - 6) + ')')
                    .attr('text-anchor', 'middle')
                    .html(xAxisLabel || xColumn);

                var gY = svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis);

                gY.append('text')
                    .attr('class', 'label')
                    .attr('transform', 'translate(' + (0 - margin.left / 1.25) + ',' + (height / 2) + ') rotate(-90)')
                    .style('text-anchor', 'middle')
                    .html(yAxisLabel || yColumn);

                // this rect acts as a layer so that zooming works anywhere in the svg. otherwise, if zoom is called on
                // just svg, zoom functionality will only work when the pointer is over a circle.
                var zoomBox = svg.append('rect')
                    .attr('class', 'zoom')
                    .attr('height', innerHeight)
                    .attr('width', innerWidth);

                var circles = svg.append('g')
                    .attr('class', 'circlesContainer');

                circles.selectAll(".dot")
                    .data(data)
                    .enter().append('circle')
                    .attr('r', 3)
                    .attr('cx', function (d) { return xScale(d[xColumn]); })
                    .attr('cy', function (d) { return yScale(d[yColumn]); })
                    .attr('class', circleClass)
                    .on('mouseenter', tipEnter)
                    .on("mousemove", tipMove)
                    .on('mouseleave', function (d) {
                        return tooltip.style('visibility', 'hidden');
                    });

                var gdots = svg.selectAll("g.dot")
                    .data(data)
                    .enter().append('g');
                gdots.append("text").text(function (d) {
                    if(d.color === 'black'){
                        return d.gene
                    }else{
                        return undefined
                    }
                })
                .attr("x", function (d) {
                    return xScale(d[xColumn]);
                })
                .attr("y", function (d) {
                    return yScale(d[yColumn]);
                });


                // var textLabels = svg.append("g").attr("class", "")
                // .data(data)
                // .attr("x", function (d) { return xScale(d[xColumn]); })
                // .attr("y", function (d) { return yScale(d[yColumn]); } - 10)
                // .attr("class", "name")
                // .style("text-anchor", "middle")
                // .text(data.gene);

                var thresholdLines = svg.append('g')
                    .attr('class', 'thresholdLines');

                // add horizontal line at significance threshold
                thresholdLines.append("svg:line")
                    .attr('class', 'threshold')
                    .attr("x1", 0)
                    .attr("x2", innerWidth)
                    .attr("y1", yScale(significanceThreshold))
                    .attr("y2", yScale(significanceThreshold));

                // add vertical line(s) at fold-change threshold (and negative fold-change)
                [foldChangeThreshold, -1 * foldChangeThreshold].forEach(function (threshold) {
                    thresholdLines.append("svg:line")
                        .attr('class', 'threshold')
                        .attr("x1", xScale(threshold))
                        .attr("x2", xScale(threshold))
                        .attr("y1", 0)
                        .attr("y2", innerHeight);
                });

                var tooltip = d3.select("body")
                    .append("div")
                    .attr('class', 'tooltip');

                function tipEnter(d) {
                    tooltip.style('visibility', 'visible')
                        .style('font-size', '11px')
                        .html(
                            '<strong>' + sampleID + '</strong>: ' + d.target.__data__.gene + '<br/>' +
                            '<strong>' + xColumn + '</strong>: ' + d3.format('.2f')(d.target.__data__["log2(fold_change)"]) + '<br/>' +
                            '<strong>' + yColumn + '</strong>: ' + d.target.__data__.q_value
                        );
                }

                function tipMove(event) {
                    tooltip.style("top", (event.pageY - 5) + "px")
                        .style("left", (event.pageX + 20) + "px");
                }

                function yTickFormat(n) {
                    return d3.format(".2r")(getBaseLog(10, n));
                    function getBaseLog(x, y) {
                        return Math.log(y) / Math.log(x);
                    }
                }

                function zoomFunction(event) {
                    var transform = d3.zoomTransform(this);
                    d3.selectAll('.dot')
                        .attr('transform', transform)
                        .attr('r', 3 / Math.sqrt(transform.k));
                    gX.call(xAxis.scale(event.transform.rescaleX(xScale)));
                    gY.call(yAxis.scale(event.transform.rescaleY(yScale)));
                    svg.selectAll('.threshold')
                        .attr('transform', transform)
                        .attr('stroke-width', 1 / transform.k);
                }

                function circleClass(d) {
                    if (d['color'] === 'red') return 'dot red';
                    else if (d['color'] === 'blue') return 'dot blue';
                    else if (d['color'] === 'black') return 'dot black';
                    else return 'dot grey';
                }

                function reset() {
                    var ease = d3.easePolyIn.exponent(4.0);
                    svg.transition().duration(750)
                        .ease(ease)
                        .call(zoom.transform, d3.zoomIdentity);
                }
            });
        }

        chart.width = function (value) {
            if (!arguments.length) return width;
            width = value;
            return chart;
        };

        chart.height = function (value) {
            if (!arguments.length) return height;
            height = value;
            return chart;
        };

        chart.margin = function (value) {
            if (!arguments.length) return margin;
            margin = value;
            return chart;
        };

        chart.xColumn = function (value) {
            if (!arguments.length) return xColumn;
            xColumn = value;
            return chart;
        };

        chart.yColumn = function (value) {
            if (!arguments.length) return yColumn;
            yColumn = value;
            return chart;
        };

        chart.xAxisLabel = function (value) {
            if (!arguments.length) return xAxisLabel;
            xAxisLabel = value;
            return chart;
        };

        chart.yAxisLabel = function (value) {
            if (!arguments.length) return yAxisLabel;
            yAxisLabel = value;
            return chart;
        };

        chart.xAxisLabelOffset = function (value) {
            if (!arguments.length) return xAxisLabelOffset;
            xAxisLabelOffset = value;
            return chart;
        };

        chart.yAxisLabelOffset = function (value) {
            if (!arguments.length) return yAxisLabelOffset;
            yAxisLabelOffset = value;
            return chart;
        };

        chart.xTicks = function (value) {
            if (!arguments.length) return xTicks;
            xTicks = value;
            return chart;
        };

        chart.yTicks = function (value) {
            if (!arguments.length) return yTicks;
            yTicks = value;
            return chart;
        };

        chart.significanceThreshold = function (value) {
            if (!arguments.length) return significanceThreshold;
            significanceThreshold = value;
            return chart;
        };

        chart.foldChangeThreshold = function (value) {
            if (!arguments.length) return foldChangeThreshold;
            foldChangeThreshold = value;
            return chart;
        };

        chart.colorRange = function (value) {
            if (!arguments.length) return colorRange;
            colorRange = value;
            return chart;
        };

        chart.sampleID = function (value) {
            if (!arguments.length) return sampleID;
            sampleID = value;
            return chart;
        };

        return chart;
    }

    useEffect(() => {
        // let data = []
        // d3.tsv("https://gist.githubusercontent.com/mbhall88/3eb7f295657d9fb81f039de6642727e0/raw/b3c6fced77ed6856878e4684b512c52866ae6827/data.diff", (d) => {
        //     return d
        // }).then(res => {
        //     setVolcanoData(res);
        // })
        if (dataProps && dataProps.length > 0) {
            setVolcanoData(dataProps);
        }
    }, [dataProps])

    useEffect(() => {
        if (volcanoData.length > 0) {
            let arr = volcanoData
            arr.forEach(function (part, index, theArray) {
                theArray[index] = { ...part, q_value: parseFloat(part.q_value), "log2(fold_change)": parseFloat(part["log2(fold_change)"]) };
            });
            var yLabel = '-log<tspan baseline-shift="sub">10</tspan>False Discovery Rate',
                xLabel = 'log<tspan baseline-shift="sub">2</tspan>Fold-change';
            var volcanoPlot1 = volcanoPlot()
                .xAxisLabel(xLabel)
                .yAxisLabel(yLabel)
                .foldChangeThreshold(2.0)
                .sampleID("gene")
                .xColumn("log2(fold_change)")
                .yColumn("q_value");
            d3.select('#chart-d3-volcano')
                .data([arr])
                .call(volcanoPlot1);
        }
    }, [volcanoData])
    return (
        <div>
            <div>Volcano plot</div>
            <div id="chart-d3-volcano" className="chart-d3-volcano"></div>
        </div>
    );
}

export default VolcanoPlotD3;