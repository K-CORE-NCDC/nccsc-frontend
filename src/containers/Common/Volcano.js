import React, { useState,useEffect } from 'react'
import * as d3 from 'd3'
import dataD from './data.diff'
// import "../../styles/volcano.css"
export default function VolcanoCmp({ width }) {

  function volcanoPlot() {
    var width = 960,
        height = 500,
        margin = {top: 20, right: 20, bottom: 40, left: 50},
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
        yScale = d3.scaleLog();



    function chart(selection){
      var innerWidth = width - margin.left - margin.right, // set the size of the chart within its container
          innerHeight = height - margin.top - margin.bottom;
        selection.each(function(data) {

            // set up the scaling for the axes based on the inner width/height of the chart and also the range
            // of value for the x and y axis variables. This range is defined by their min and max values as
            // calculated by d3.extent()
            xScale.range([0, innerWidth])
                .domain(d3.extent(data, function(d) { return d[xColumn]; }))
                .nice();

            // normally would set the y-range to [height, 0] but by swapping it I can flip the axis and thus
            // have -log10 scale without having to do extra parsing
            yScale.range([0, innerHeight])
                .domain(d3.extent(data, function(d) { return d[yColumn]; }))
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
                .ticks(5)
                .tickFormat(yTickFormat);

            var gX = svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' +innerHeight+')')
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
                .attr('cx', function(d) { return xScale(d[xColumn]); })
                .attr('cy', function(d) { return yScale(d[yColumn]); })
                .attr('class', circleClass)
                .on('mouseenter', tipEnter)
                .on("mousemove", tipMove)
                .on('mouseleave', function(d) {
                   return tooltip.style('visibility', 'hidden');
                });

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
            [foldChangeThreshold, -1 * foldChangeThreshold].forEach(function(threshold) {
                thresholdLines.append("svg:line")
                    .attr('class', 'threshold')
                    .attr("x1", xScale(threshold))
                    .attr("x2", xScale(threshold))
                    .attr("y1", 0)
                    .attr("y2", innerHeight);
            });

            var tooltip = d3.select("body").append("div").attr('class', 'tooltip');

            function tipEnter(d) {
                tooltip.style('visibility', 'visible')
                    .style('font-size', '11px')
                    .html(
                        '<strong>' + sampleID + '</strong>: ' + d[sampleID] + '<br/>' +
                        '<strong>' + xColumn + '</strong>: ' + d3.format('.2f')(d[xColumn]) + '<br/>' +
                        '<strong>' + yColumn + '</strong>: ' + d[yColumn]
                    );
            }

            function tipMove() {
                // tooltip.style("top", (event.pageY - 5) + "px")
                //     .style("left", (event.pageX + 20) + "px");
            }

            function yTickFormat(n) {
                return d3.format(".2r")(getBaseLog(10, n));
                function getBaseLog(x, y) {
                    return Math.log(y) / Math.log(x);
                }
            }

            function zoomFunction() {
                // var transform = d3.zoomTransform(this);
                // d3.selectAll('.dot')
                //     .attr('transform', transform)
                //     .attr('r', 3 / Math.sqrt(transform.k));
                // gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
                // gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
                // svg.selectAll('.threshold')
                //     .attr('transform', transform)
                //     .attr('stroke-width', 1 / transform.k);
            }

            function circleClass(d) {
                if (d[yColumn] <= significanceThreshold && Math.abs(d[xColumn]) >= foldChangeThreshold) return 'dot sigfold';
                else if (d[yColumn] <= significanceThreshold) return 'dot sig';
                else if (Math.abs(d[xColumn]) >= foldChangeThreshold) return 'dot fold';
                else return 'dot';
            }

            function reset() {
                var ease = d3.easePolyIn.exponent(4.0);
                svg.transition().duration(750)
                    .ease(ease)
                    .call(zoom.transform, d3.zoomIdentity);
            }
        });
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.xColumn = function(value) {
        if (!arguments.length) return xColumn;
        xColumn = value;
        return chart;
    };

    chart.yColumn = function(value) {
        if (!arguments.length) return yColumn;
        yColumn = value;
        return chart;
    };

    chart.xAxisLabel = function(value) {
        if (!arguments.length) return xAxisLabel;
        xAxisLabel = value;
        return chart;
    };

    chart.yAxisLabel = function(value) {
        if (!arguments.length) return yAxisLabel;
        yAxisLabel = value;
        return chart;
    };

    chart.xAxisLabelOffset = function(value) {
        if (!arguments.length) return xAxisLabelOffset;
        xAxisLabelOffset = value;
        return chart;
    };

    chart.yAxisLabelOffset = function(value) {
        if (!arguments.length) return yAxisLabelOffset;
        yAxisLabelOffset = value;
        return chart;
    };

    chart.xTicks = function(value) {
        if (!arguments.length) return xTicks;
        xTicks = value;
        return chart;
    };

    chart.yTicks = function(value) {
        if (!arguments.length) return yTicks;
        yTicks = value;
        return chart;
    };

    chart.significanceThreshold = function(value) {
        if (!arguments.length) return significanceThreshold;
        significanceThreshold = value;
        return chart;
    };

    chart.foldChangeThreshold = function(value) {
        if (!arguments.length) return foldChangeThreshold;
        foldChangeThreshold = value;
        return chart;
    };

    chart.colorRange = function(value) {
        if (!arguments.length) return colorRange;
        colorRange = value;
        return chart;
    };

    chart.sampleID = function(value) {
        if (!arguments.length) return sampleID;
        sampleID = value;
        return chart;
    };

    return chart;
}

  useEffect(()=>{
    let d = [
      {"gene": "PAPD4", "log2(fold_change)": "-0.0195918", "q_value": "0.999906"},
      {"gene": "PAPD5", "log2(fold_change)": "-0.116465", "q_value": "0.999906"},
      {"gene": "PAPD7", "log2(fold_change)": "-0.028738", "q_value": "0.999906"},
      {"gene": "PAPOLA", "log2(fold_change)": "0.00787951", "q_value": "0.999906"},
      {"gene": "PAPOLG", "log2(fold_change)": "-0.136467", "q_value": "0.999906"},
      {"gene": "PAPPA", "log2(fold_change)": "-0.617492", "q_value": "0.999906"},
      {"gene": "PAPSS1", "log2(fold_change)": "0.123906", "q_value": "0.999906"},
      {"gene": "PAPSS2", "log2(fold_change)": "-0.288866", "q_value": "0.999906"},
      {"gene": "PAQR3", "log2(fold_change)": "-0.215258", "q_value": "0.999906"},
      {"gene": "PAQR4", "log2(fold_change)": "-0.668387", "q_value": "0.999906"},
      {"gene": "PAQR5", "log2(fold_change)": "0.107544", "q_value": "0.999906"},
      {"gene": "PAQR6", "log2(fold_change)": "-0.939981", "q_value": "0.999906"},
      {"gene": "PAQR7", "log2(fold_change)": "-0.168831", "q_value": "0.999906"},
      {"gene": "PAQR8", "log2(fold_change)": "0.199861", "q_value": "0.999906"},
      {"gene": "PAR-SN,SNORD107", "log2(fold_change)": "0.591027", "q_value": "0.999906"},
      {"gene": "PAR5", "log2(fold_change)": "0.341447", "q_value": "0.999906"},
      {"gene": "PARD3", "log2(fold_change)": "0.0388699", "q_value": "0.999906"},
      {"gene": "PARD3B", "log2(fold_change)": "-0.512061", "q_value": "0.999906"},
      {"gene": "PARD6A", "log2(fold_change)": "0.259424", "q_value": "0.999906"},
      {"gene": "PARD6G", "log2(fold_change)": "1.0406", "q_value": "0.999906"},
      {"gene": "PARG", "log2(fold_change)": "0.00207395", "q_value": "0.999906"},
      {"gene": "PARK2", "log2(fold_change)": "0.173745", "q_value": "0.999906"},
      {"gene": "PARK7", "log2(fold_change)": "-0.10123", "q_value": "0.999906"},
      {"gene": "PARL", "log2(fold_change)": "-0.0859096", "q_value": "0.999906"},
      {"gene": "PARN", "log2(fold_change)": "-0.130313", "q_value": "0.999906"},
      {"gene": "PARP1", "log2(fold_change)": "-0.00866933", "q_value": "0.999906"},
      {"gene": "PARP10", "log2(fold_change)": "0.245642", "q_value": "0.999906"},
      {"gene": "PARP11", "log2(fold_change)": "0.516052", "q_value": "0.999906"},
      {"gene": "PARP12", "log2(fold_change)": "-0.177056", "q_value": "0.999906"},
      {"gene": "PARP14", "log2(fold_change)": "0.161027", "q_value": "0.999906"},
      {"gene": "PARP16", "log2(fold_change)": "0.139963", "q_value": "0.999906"},
      {"gene": "PARP2", "log2(fold_change)": "0.707296", "q_value": "0.999906"},
      {"gene": "PARP3", "log2(fold_change)": "-0.00274685", "q_value": "0.999906"},
      {"gene": "PARP4", "log2(fold_change)": "-0.127207", "q_value": "0.999906"},
      {"gene": "PARP6", "log2(fold_change)": "-0.166621", "q_value": "0.999906"},
      {"gene": "PARP8", "log2(fold_change)": "0.0185618", "q_value": "0.999906"},
      {"gene": "PARP9", "log2(fold_change)": "0.549108", "q_value": "0.999906"},
      {"gene": "PARPBP", "log2(fold_change)": "0.683625", "q_value": "0.999906"},
      {"gene": "PARS2", "log2(fold_change)": "0.0817017", "q_value": "0.999906"},
      {"gene": "PARVA", "log2(fold_change)": "-0.444156", "q_value": "0.999906"},
      {"gene": "PARVB", "log2(fold_change)": "-0.0796523", "q_value": "0.999906"},
      {"gene": "PASK", "log2(fold_change)": "-0.16995", "q_value": "0.999906"},
      {"gene": "PATL1", "log2(fold_change)": "-0.0100655", "q_value": "0.999906"},
      {"gene": "PATZ1", "log2(fold_change)": "0.171027", "q_value": "0.999906"},
      {"gene": "PAXIP1", "log2(fold_change)": "0.177069", "q_value": "0.999906"},
      {"gene": "PBK", "log2(fold_change)": "0.35407", "q_value": "0.999906"},
      {"gene": "PBLD", "log2(fold_change)": "0.0426404", "q_value": "0.999906"},
      {"gene": "PBRM1", "log2(fold_change)": "0.151229", "q_value": "0.999906"},
      {"gene": "PBX1", "log2(fold_change)": "0.175751", "q_value": "0.999906"},
      {"gene": "PBX2", "log2(fold_change)": "0.257346", "q_value": "0.999906"},
      {"gene": "PBX3", "log2(fold_change)": "0.271268", "q_value": "0.999906"},
      {"gene": "PBXIP1", "log2(fold_change)": "0.0382423", "q_value": "0.999906"},
      {"gene": "PC", "log2(fold_change)": "-0.456776", "q_value": "0.999906"},
      {"gene": "PCBD1", "log2(fold_change)": "0.072208", "q_value": "0.999906"},
      {"gene": "PCBD2", "log2(fold_change)": "0.00329384", "q_value": "0.999906"},
      {"gene": "PCBP1", "log2(fold_change)": "-0.0486687", "q_value": "0.999906"},
      {"gene": "PCBP1-AS1", "log2(fold_change)": "-0.133876", "q_value": "0.999906"},
      {"gene": "PCBP4", "log2(fold_change)": "0.241701", "q_value": "0.999906"},
      {"gene": "PCCA", "log2(fold_change)": "0.0566578", "q_value": "0.999906"},
      {"gene": "PCCB", "log2(fold_change)": "0.312911", "q_value": "0.999906"},
      {"gene": "PCDH10", "log2(fold_change)": "0.462725", "q_value": "0.999906"},
      {"gene": "PCDH7", "log2(fold_change)": "-0.262745", "q_value": "0.999906"},
      {"gene": "PCDHB10", "log2(fold_change)": "0.332648", "q_value": "0.999906"},
      {"gene": "PCDHB13", "log2(fold_change)": "0.418733", "q_value": "0.999906"},
      {"gene": "PCDHB14", "log2(fold_change)": "0.259609", "q_value": "0.999906"},
      {"gene": "PCDHB15", "log2(fold_change)": "0.511177", "q_value": "0.999906"},
      {"gene": "PCDHB16", "log2(fold_change)": "0.307522", "q_value": "0.999906"},
      {"gene": "PCDHB2", "log2(fold_change)": "0.0774912", "q_value": "0.999906"},
      {"gene": "PCDHB3", "log2(fold_change)": "0.726984", "q_value": "0.999906"},
      {"gene": "PCDHB5", "log2(fold_change)": "0.742517", "q_value": "0.999906"},
      {"gene": "PCDHB7", "log2(fold_change)": "0.590211", "q_value": "0.999906"},
      {"gene": "PCDHB8", "log2(fold_change)": "0.488444", "q_value": "0.999906"},
      {"gene": "PCDHB9", "log2(fold_change)": "0.136506", "q_value": "0.999906"},
      {"gene": "PCF11", "log2(fold_change)": "-0.224206", "q_value": "0.999906"},
      {"gene": "PCGF1", "log2(fold_change)": "0.162643", "q_value": "0.999906"},
      {"gene": "PCGF2", "log2(fold_change)": "0.331611", "q_value": "0.999906"},
      {"gene": "PCGF3", "log2(fold_change)": "-0.146628", "q_value": "0.999906"},
      {"gene": "PCGF5", "log2(fold_change)": "-0.311076", "q_value": "0.999906"},
      {"gene": "PCGF6", "log2(fold_change)": "-0.210046", "q_value": "0.999906"},
      {"gene": "PCID2", "log2(fold_change)": "-0.0923425", "q_value": "0.999906"},
      {"gene": "PCIF1", "log2(fold_change)": "0.00915214", "q_value": "0.999906"},
      {"gene": "PCK2", "log2(fold_change)": "0.15212", "q_value": "0.999906"},
      {"gene": "PCM1", "log2(fold_change)": "0.115255", "q_value": "0.999906"},
      {"gene": "PCMT1", "log2(fold_change)": "-0.316777", "q_value": "0.999906"},
      {"gene": "PCMTD1", "log2(fold_change)": "0.365602", "q_value": "0.999906"},
      {"gene": "PCMTD2", "log2(fold_change)": "-0.00238332", "q_value": "0.999906"},
      {"gene": "PCNA-AS1", "log2(fold_change)": "0.710122", "q_value": "0.999906"},
      {"gene": "PCNP", "log2(fold_change)": "0.0239328", "q_value": "0.999906"},
      {"gene": "PCNT", "log2(fold_change)": "0.0650267", "q_value": "0.999906"},
      {"gene": "PCNX", "log2(fold_change)": "0.127902", "q_value": "0.999906"},
      {"gene": "PCNXL3", "log2(fold_change)": "-0.038297", "q_value": "0.999906"},
      {"gene": "PCOLCE2", "log2(fold_change)": "0.217315", "q_value": "0.999906"},
      {"gene": "PCSK1N", "log2(fold_change)": "0.287839", "q_value": "0.999906"},
      {"gene": "PCSK2", "log2(fold_change)": "-0.334562", "q_value": "0.999906"},
      {"gene": "PCSK4", "log2(fold_change)": "0.187394", "q_value": "0.999906"},
      {"gene": "PCSK5", "log2(fold_change)": "0.497518", "q_value": "0.999906"},
      {"gene": "PCSK6", "log2(fold_change)": "0.112565", "q_value": "0.999906"},
      {"gene": "PCTP", "log2(fold_change)": "-0.321457", "q_value": "0.999906"},
      {"gene": "PCYOX1", "log2(fold_change)": "-0.418051", "q_value": "0.999906"},
      {"gene": "PCYOX1L", "log2(fold_change)": "-0.179695", "q_value": "0.999906"},
      {"gene": "PCYT1A", "log2(fold_change)": "-0.136528", "q_value": "0.999906"},
      {"gene": "PDAP1", "log2(fold_change)": "-0.085108", "q_value": "0.999906"},
      {"gene": "PDCD10", "log2(fold_change)": "-0.446845", "q_value": "0.999906"},
      {"gene": "PDCD11", "log2(fold_change)": "-0.200981", "q_value": "0.999906"},
      {"gene": "PDCD1LG2", "log2(fold_change)": "0.194708", "q_value": "0.999906"},
      {"gene": "PDCD2", "log2(fold_change)": "-0.160375", "q_value": "0.999906"},
      {"gene": "PDCD2L", "log2(fold_change)": "0.187285", "q_value": "0.999906"},
      {"gene": "PDCD5", "log2(fold_change)": "-0.391846", "q_value": "0.999906"},
      {"gene": "PDCD6", "log2(fold_change)": "-0.235491", "q_value": "0.999906"},
      {"gene": "PDCD6IP", "log2(fold_change)": "-0.0178777", "q_value": "0.999906"},
      {"gene": "PDCD7", "log2(fold_change)": "-0.0269278", "q_value": "0.999906"},
      {"gene": "PDCL", "log2(fold_change)": "0.0658954", "q_value": "0.999906"},
      {"gene": "PDCL3", "log2(fold_change)": "-0.42324", "q_value": "0.999906"},
      {"gene": "PDDC1", "log2(fold_change)": "-0.113102", "q_value": "0.999906"},
      {"gene": "PDE12", "log2(fold_change)": "-0.216398", "q_value": "0.999906"},
      {"gene": "PDE1A", "log2(fold_change)": "-0.335404", "q_value": "0.999906"},
      {"gene": "PDE1C", "log2(fold_change)": "0.0604274", "q_value": "0.999906"},
      {"gene": "PDE3A", "log2(fold_change)": "0.458674", "q_value": "0.999906"},
      {"gene": "PDE3B", "log2(fold_change)": "0.22907", "q_value": "0.999906"},
      {"gene": "PDE4A", "log2(fold_change)": "-0.234879", "q_value": "0.999906"},
      {"gene": "PDE4B", "log2(fold_change)": "-0.116201", "q_value": "0.999906"},
      {"gene": "PDE4DIP", "log2(fold_change)": "-0.039365", "q_value": "0.999906"},
      {"gene": "PDE6D", "log2(fold_change)": "0.0750186", "q_value": "0.999906"},
      {"gene": "PDE7A", "log2(fold_change)": "0.207316", "q_value": "0.999906"},
      {"gene": "PDE7B", "log2(fold_change)": "0.254207", "q_value": "0.999906"},
      {"gene": "PDE8A", "log2(fold_change)": "-0.0725132", "q_value": "0.999906"},
      {"gene": "PDF", "log2(fold_change)": "0.105741", "q_value": "0.999906"},
      {"gene": "PDGFA", "log2(fold_change)": "-0.56316", "q_value": "0.999906"},
      {"gene": "PDGFD", "log2(fold_change)": "-0.396312", "q_value": "0.999906"},
      {"gene": "PDGFRA", "log2(fold_change)": "-0.538989", "q_value": "0.999906"},
      {"gene": "PDGFRB", "log2(fold_change)": "-0.406865", "q_value": "0.999906"},
      {"gene": "PDGFRL", "log2(fold_change)": "-0.118573", "q_value": "0.999906"},
      {"gene": "PDHA1", "log2(fold_change)": "-0.0964997", "q_value": "0.999906"},
      {"gene": "PDHB", "log2(fold_change)": "-0.311194", "q_value": "0.999906"},
      {"gene": "PDHX", "log2(fold_change)": "0.0321765", "q_value": "0.999906"},
      {"gene": "PDIA3", "log2(fold_change)": "0.0467757", "q_value": "0.999906"},
      {"gene": "PDIA3P", "log2(fold_change)": "0.162469", "q_value": "0.999906"},
      {"gene": "PDIA4", "log2(fold_change)": "0.306297", "q_value": "0.999906"},
      {"gene": "PDIA5", "log2(fold_change)": "0.181559", "q_value": "0.999906"},
      {"gene": "PDIA6", "log2(fold_change)": "0.0620993", "q_value": "0.999906"},
      {"gene": "PDIK1L", "log2(fold_change)": "0.30653", "q_value": "0.999906"},
      {"gene": "PDK1", "log2(fold_change)": "0.228124", "q_value": "0.999906"},
      {"gene": "PDK2", "log2(fold_change)": "-0.0237278", "q_value": "0.999906"},
      {"gene": "PDK3", "log2(fold_change)": "-0.470408", "q_value": "0.999906"},
      {"gene": "PDLIM2", "log2(fold_change)": "-0.131064", "q_value": "0.999906"},
      {"gene": "PDLIM3", "log2(fold_change)": "-0.0673889", "q_value": "0.999906"},
      {"gene": "PDLIM4", "log2(fold_change)": "0.379273", "q_value": "0.999906"},
      {"gene": "PDLIM7", "log2(fold_change)": "-0.615601", "q_value": "0.999906"},
      {"gene": "PDP1", "log2(fold_change)": "0.0723305", "q_value": "0.999906"},
      {"gene": "PDP2", "log2(fold_change)": "-0.636984", "q_value": "0.999906"},
      {"gene": "PDPK1", "log2(fold_change)": "-0.0564845", "q_value": "0.999906"},
      {"gene": "PDPR", "log2(fold_change)": "-0.00308819", "q_value": "0.999906"},
      {"gene": "PDRG1", "log2(fold_change)": "-0.0611073", "q_value": "0.999906"},
      {"gene": "PDS5A", "log2(fold_change)": "-0.243521", "q_value": "0.999906"},
      {"gene": "PDS5B", "log2(fold_change)": "0.22068", "q_value": "0.999906"},
      {"gene": "PDSS1", "log2(fold_change)": "-0.283471", "q_value": "0.999906"},
      {"gene": "PDSS2", "log2(fold_change)": "0.222474", "q_value": "0.999906"},
      {"gene": "PDXDC1", "log2(fold_change)": "0.119187", "q_value": "0.999906"},
      {"gene": "PDXDC2P", "log2(fold_change)": "-0.397742", "q_value": "0.999906"},
      {"gene": "PDXK", "log2(fold_change)": "-0.158365", "q_value": "0.999906"},
      {"gene": "PDXP", "log2(fold_change)": "-0.0263122", "q_value": "0.999906"},
      {"gene": "PDZD11", "log2(fold_change)": "-0.0148215", "q_value": "0.999906"},
      {"gene": "PDZD8", "log2(fold_change)": "-0.199431", "q_value": "0.999906"},
      {"gene": "PDZRN3", "log2(fold_change)": "-0.00768674", "q_value": "0.999906"},
      {"gene": "PEA15", "log2(fold_change)": "0.0730118", "q_value": "0.999906"},
      {"gene": "PEAR1", "log2(fold_change)": "0.21603", "q_value": "0.999906"},
      {"gene": "PEBP1", "log2(fold_change)": "-0.19666", "q_value": "0.999906"},
      {"gene": "PEBP4", "log2(fold_change)": "-0.694904", "q_value": "0.999906"},
      {"gene": "PECR", "log2(fold_change)": "0.395452", "q_value": "0.999906"},
      {"gene": "PEF1", "log2(fold_change)": "0.0345313", "q_value": "0.999906"},
      {"gene": "PEG3", "log2(fold_change)": "0.218471", "q_value": "0.999906"},
      {"gene": "PELI1", "log2(fold_change)": "0.265904", "q_value": "0.999906"},
      {"gene": "PELI3", "log2(fold_change)": "0.0664745", "q_value": "0.999906"},
      {"gene": "PELO", "log2(fold_change)": "0.0382189", "q_value": "0.999906"},
      {"gene": "PELP1", "log2(fold_change)": "0.126682", "q_value": "0.999906"},
      {"gene": "PEMT", "log2(fold_change)": "-0.574265", "q_value": "0.999906"},
      {"gene": "PENK", "log2(fold_change)": "-0.250931", "q_value": "0.999906"},
      {"gene": "PEPD", "log2(fold_change)": "0.0523542", "q_value": "0.999906"},
      {"gene": "PERP", "log2(fold_change)": "0.0544532", "q_value": "0.999906"},
      {"gene": "PES1", "log2(fold_change)": "-0.171847", "q_value": "0.999906"},
      {"gene": "PET112", "log2(fold_change)": "0.234746", "q_value": "0.999906"},
      {"gene": "PET117", "log2(fold_change)": "-0.463003", "q_value": "0.999906"},
      {"gene": "PEX1", "log2(fold_change)": "0.113127", "q_value": "0.999906"},
      {"gene": "PEX10", "log2(fold_change)": "0.344526", "q_value": "0.999906"},
      {"gene": "PEX11A", "log2(fold_change)": "-0.0700312", "q_value": "0.999906"},
      {"gene": "PEX11B", "log2(fold_change)": "-0.203484", "q_value": "0.999906"},
      {"gene": "PEX11G", "log2(fold_change)": "0.0332306", "q_value": "0.999906"},
      {"gene": "PEX12", "log2(fold_change)": "0.319337", "q_value": "0.999906"},
      {"gene": "PEX13", "log2(fold_change)": "0.0093441", "q_value": "0.999906"},
      {"gene": "PEX14", "log2(fold_change)": "-0.0625793", "q_value": "0.999906"},
      {"gene": "PEX16", "log2(fold_change)": "-0.333351", "q_value": "0.999906"},
      {"gene": "PEX19", "log2(fold_change)": "-0.150332", "q_value": "0.999906"},
      {"gene": "PEX2", "log2(fold_change)": "-0.0159351", "q_value": "0.999906"},
      {"gene": "PEX26", "log2(fold_change)": "0.0702224", "q_value": "0.999906"},
      {"gene": "PEX3", "log2(fold_change)": "0.461805", "q_value": "0.999906"},
      {"gene": "PEX5", "log2(fold_change)": "-0.00614621", "q_value": "0.999906"},
      {"gene": "PEX6", "log2(fold_change)": "-0.146891", "q_value": "0.999906"},
      {"gene": "PEX7", "log2(fold_change)": "0.124089", "q_value": "0.999906"},
      {"gene": "PFAS", "log2(fold_change)": "0.0582083", "q_value": "0.999906"},
      {"gene": "PFDN1", "log2(fold_change)": "0.0160983", "q_value": "0.999906"},
      {"gene": "PFDN2", "log2(fold_change)": "-0.19433", "q_value": "0.999906"},
      {"gene": "PFDN4", "log2(fold_change)": "0.0939954", "q_value": "0.999906"},
      {"gene": "PFDN5", "log2(fold_change)": "0.0146856", "q_value": "0.999906"},
      {"gene": "PFDN6", "log2(fold_change)": "-0.218414", "q_value": "0.999906"},
      {"gene": "PFKFB2", "log2(fold_change)": "0.00667754", "q_value": "0.999906"},
      {"gene": "PFKFB3", "log2(fold_change)": "-0.348547", "q_value": "0.999906"},
      {"gene": "PFKFB4", "log2(fold_change)": "0.152715", "q_value": "0.999906"},
      {"gene": "PFKL", "log2(fold_change)": "-0.0506415", "q_value": "0.999906"},
      {"gene": "PFKM", "log2(fold_change)": "0.208645", "q_value": "0.999906"},
      {"gene": "PFKP", "log2(fold_change)": "-0.0618055", "q_value": "0.999906"},
      {"gene": "PFN1", "log2(fold_change)": "-0.341898", "q_value": "0.999906"},
      {"gene": "PFN1P2", "log2(fold_change)": "0.343386", "q_value": "0.999906"},
      {"gene": "PFN2", "log2(fold_change)": "0.359046", "q_value": "0.999906"},
      {"gene": "PFN4", "log2(fold_change)": "0.748343", "q_value": "0.999906"},
      {"gene": "PGA5", "log2(fold_change)": "1.6992", "q_value": "0.999906"},
      {"gene": "PGAM1", "log2(fold_change)": "-0.111903", "q_value": "0.999906"},
      {"gene": "PGAM2", "log2(fold_change)": "-0.418968", "q_value": "0.999906"},
      {"gene": "PGAM4", "log2(fold_change)": "-0.26156", "q_value": "0.999906"},
      {"gene": "PGAM5", "log2(fold_change)": "-0.286585", "q_value": "0.999906"},
      {"gene": "PGAP2", "log2(fold_change)": "0.336218", "q_value": "0.999906"},
      {"gene": "PGAP3", "log2(fold_change)": "-0.0093441", "q_value": "0.999906"},
      {"gene": "PGBD1", "log2(fold_change)": "-0.0820933", "q_value": "0.999906"},
      {"gene": "PGBD2", "log2(fold_change)": "0.424176", "q_value": "0.999906"},
      {"gene": "PGBD3", "log2(fold_change)": "0.0633064", "q_value": "0.999906"},
      {"gene": "PGBD4", "log2(fold_change)": "0.261923", "q_value": "0.999906"},
      {"gene": "PGD", "log2(fold_change)": "-0.0290436", "q_value": "0.999906"},
      {"gene": "PGGT1B", "log2(fold_change)": "-0.00527886", "q_value": "0.999906"},
      {"gene": "PGK1", "log2(fold_change)": "-0.411003", "q_value": "0.999906"},
      {"gene": "PGLS", "log2(fold_change)": "0.177091", "q_value": "0.999906"},
      {"gene": "PGM1", "log2(fold_change)": "-0.205199", "q_value": "0.999906"},
      {"gene": "PGM2", "log2(fold_change)": "-0.306774", "q_value": "0.999906"},
      {"gene": "PGM2L1", "log2(fold_change)": "0.279769", "q_value": "0.999906"},
      {"gene": "PGM3", "log2(fold_change)": "0.264378", "q_value": "0.999906"},
      {"gene": "PGM5", "log2(fold_change)": "0.220813", "q_value": "0.999906"},
      {"gene": "PGM5P2", "log2(fold_change)": "0.388417", "q_value": "0.999906"},
      {"gene": "PGP", "log2(fold_change)": "-0.292219", "q_value": "0.999906"},
      {"gene": "PGRMC1", "log2(fold_change)": "0.18836", "q_value": "0.999906"},
      {"gene": "PGRMC2", "log2(fold_change)": "0.115948", "q_value": "0.999906"},
      {"gene": "PGS1", "log2(fold_change)": "-0.350774", "q_value": "0.999906"},
      {"gene": "PHACTR2", "log2(fold_change)": "-0.372432", "q_value": "0.999906"},
      {"gene": "PHACTR4", "log2(fold_change)": "0.150055", "q_value": "0.999906"},
      {"gene": "PHAX", "log2(fold_change)": "0.00553069", "q_value": "0.999906"},
      {"gene": "PHB", "log2(fold_change)": "-0.370897", "q_value": "0.999906"},
      {"gene": "PHB2", "log2(fold_change)": "-0.11085", "q_value": "0.999906"},
      {"gene": "PHC1", "log2(fold_change)": "0.321159", "q_value": "0.999906"},
      {"gene": "PHC3", "log2(fold_change)": "-0.0581957", "q_value": "0.999906"},
      {"gene": "PHEX", "log2(fold_change)": "0.700235", "q_value": "0.999906"},
      {"gene": "PHF1", "log2(fold_change)": "0.110863", "q_value": "0.999906"},
      {"gene": "PHF10", "log2(fold_change)": "-0.220971", "q_value": "0.999906"},
      {"gene": "PHF11", "log2(fold_change)": "-0.259392", "q_value": "0.999906"},
      {"gene": "PHF12", "log2(fold_change)": "0.0704913", "q_value": "0.999906"},
      {"gene": "PHF13", "log2(fold_change)": "-0.201034", "q_value": "0.999906"},
      {"gene": "PHF14", "log2(fold_change)": "0.271505", "q_value": "0.999906"},
      {"gene": "PHF15", "log2(fold_change)": "-0.343589", "q_value": "0.999906"},
      {"gene": "PHF19", "log2(fold_change)": "0.15287", "q_value": "0.999906"},
      {"gene": "PHF2", "log2(fold_change)": "0.0317477", "q_value": "0.999906"},
      {"gene": "PHF20", "log2(fold_change)": "0.0821429", "q_value": "0.999906"},
      {"gene": "PHF20L1", "log2(fold_change)": "-0.00757599", "q_value": "0.999906"},
      {"gene": "PHF21A", "log2(fold_change)": "0.0268821", "q_value": "0.999906"},
      {"gene": "PHF23", "log2(fold_change)": "0.241752", "q_value": "0.999906"},
      {"gene": "PHF3", "log2(fold_change)": "0.0844952", "q_value": "0.999906"},
      {"gene": "PHF5A", "log2(fold_change)": "-0.157727", "q_value": "0.999906"},
      {"gene": "PHF6", "log2(fold_change)": "0.162934", "q_value": "0.999906"},
      {"gene": "PHF7", "log2(fold_change)": "-0.0621807", "q_value": "0.999906"},
      {"gene": "PHF8", "log2(fold_change)": "-0.194174", "q_value": "0.999906"},
      {"gene": "PHIP", "log2(fold_change)": "0.456087", "q_value": "0.999906"},
      {"gene": "PHKA2", "log2(fold_change)": "-0.306986", "q_value": "0.999906"},
      {"gene": "PHKB", "log2(fold_change)": "0.168561", "q_value": "0.999906"},
      {"gene": "PHKG1", "log2(fold_change)": "0.956519", "q_value": "0.999906"},
      {"gene": "PHKG2", "log2(fold_change)": "-0.0700731", "q_value": "0.999906"},
      {"gene": "PHLDA2", "log2(fold_change)": "-0.496794", "q_value": "0.999906"},
      {"gene": "PHLDA3", "log2(fold_change)": "0.135375", "q_value": "0.999906"},
      {"gene": "PHLDB1", "log2(fold_change)": "-0.391977", "q_value": "0.999906"},
      {"gene": "PHLDB2", "log2(fold_change)": "0.36997", "q_value": "0.999906"},
      {"gene": "PHLPP1", "log2(fold_change)": "0.139629", "q_value": "0.999906"},
      {"gene": "PHLPP2", "log2(fold_change)": "-0.346098", "q_value": "0.999906"},
      {"gene": "PHOSPHO2", "log2(fold_change)": "-1.41671", "q_value": "0.999906"},
      {"gene": "PHPT1", "log2(fold_change)": "0.161073", "q_value": "0.999906"},
      {"gene": "PHRF1", "log2(fold_change)": "-0.221677", "q_value": "0.999906"},
      {"gene": "PHTF1", "log2(fold_change)": "-0.214926", "q_value": "0.999906"},
      {"gene": "PHTF2", "log2(fold_change)": "0.466632", "q_value": "0.999906"},
      {"gene": "PHYH", "log2(fold_change)": "-0.0656491", "q_value": "0.999906"},
      {"gene": "PHYHD1", "log2(fold_change)": "-0.114797", "q_value": "0.999906"},
      {"gene": "PHYHIP", "log2(fold_change)": "0.494345", "q_value": "0.999906"},
      {"gene": "PI4K2A", "log2(fold_change)": "0.252567", "q_value": "0.999906"},
      {"gene": "PI4K2B", "log2(fold_change)": "0.0387728", "q_value": "0.999906"},
      {"gene": "PI4KA", "log2(fold_change)": "0.144842", "q_value": "0.999906"},
      {"gene": "PI4KAP1", "log2(fold_change)": "0.0411803", "q_value": "0.999906"},
      {"gene": "PI4KAP2", "log2(fold_change)": "0.121154", "q_value": "0.999906"},
      {"gene": "PI4KB", "log2(fold_change)": "0.229724", "q_value": "0.999906"},
      {"gene": "PIAS1", "log2(fold_change)": "0.0550462", "q_value": "0.999906"},
      {"gene": "PIAS2", "log2(fold_change)": "0.164497", "q_value": "0.999906"},
      {"gene": "PIAS3", "log2(fold_change)": "0.00213531", "q_value": "0.999906"},
      {"gene": "PIAS4", "log2(fold_change)": "-0.144918", "q_value": "0.999906"},
      {"gene": "PIBF1", "log2(fold_change)": "-0.155107", "q_value": "0.999906"},
      {"gene": "PICALM", "log2(fold_change)": "-0.264921", "q_value": "0.999906"},
      {"gene": "PICK1", "log2(fold_change)": "0.0947978", "q_value": "0.999906"},
      {"gene": "PIEZO1", "log2(fold_change)": "-0.0333301", "q_value": "0.999906"},
      {"gene": "PIF1", "log2(fold_change)": "-0.198942", "q_value": "0.999906"},
      {"gene": "PIGA", "log2(fold_change)": "-0.776517", "q_value": "0.999906"},
      {"gene": "PIGB", "log2(fold_change)": "-0.0191345", "q_value": "0.999906"},
      {"gene": "PIGC", "log2(fold_change)": "-0.363011", "q_value": "0.999906"},
      {"gene": "PIGF", "log2(fold_change)": "-0.239161", "q_value": "0.999906"},
      {"gene": "PIGG", "log2(fold_change)": "-0.137506", "q_value": "0.999906"},
      {"gene": "PIGH", "log2(fold_change)": "-0.190769", "q_value": "0.999906"},
      {"gene": "PIGK", "log2(fold_change)": "-0.0757683", "q_value": "0.999906"},
      {"gene": "PIGL", "log2(fold_change)": "0.0495596", "q_value": "0.999906"},
      {"gene": "PIGM", "log2(fold_change)": "0.139674", "q_value": "0.999906"},
      {"gene": "PIGN", "log2(fold_change)": "-0.116777", "q_value": "0.999906"},
      {"gene": "PIGO", "log2(fold_change)": "0.151942", "q_value": "0.999906"},
      {"gene": "PIGP", "log2(fold_change)": "-0.0578814", "q_value": "0.999906"},
      {"gene": "PIGQ", "log2(fold_change)": "-0.196077", "q_value": "0.999906"},
      {"gene": "PIGS", "log2(fold_change)": "-0.138492", "q_value": "0.999906"},
      {"gene": "PIGT", "log2(fold_change)": "0.0227992", "q_value": "0.999906"},
      {"gene": "PIGU", "log2(fold_change)": "0.0647767", "q_value": "0.999906"},
      {"gene": "PIGV", "log2(fold_change)": "-0.198247", "q_value": "0.999906"},
      {"gene": "PIGW", "log2(fold_change)": "-0.0732663", "q_value": "0.999906"},
      {"gene": "PIGX", "log2(fold_change)": "-0.284793", "q_value": "0.999906"},
      {"gene": "PIGY", "log2(fold_change)": "-0.332445", "q_value": "0.999906"},
      {"gene": "PIGZ", "log2(fold_change)": "-0.40875", "q_value": "0.999906"},
      {"gene": "PIH1D1", "log2(fold_change)": "-0.193027", "q_value": "0.999906"},
      {"gene": "PIH1D2", "log2(fold_change)": "0.0518474", "q_value": "0.999906"},
      {"gene": "PIK3AP1", "log2(fold_change)": "0.158413", "q_value": "0.999906"},
      {"gene": "PIK3C2A", "log2(fold_change)": "-0.372056", "q_value": "0.999906"},
      {"gene": "PIK3C2B", "log2(fold_change)": "0.2222", "q_value": "0.999906"},
      {"gene": "PIK3C3", "log2(fold_change)": "-0.329592", "q_value": "0.999906"},
      {"gene": "PIK3CA", "log2(fold_change)": "-0.547921", "q_value": "0.999906"},
      {"gene": "PIK3CB", "log2(fold_change)": "-0.32714", "q_value": "0.999906"},
      {"gene": "PIK3CD", "log2(fold_change)": "-0.857987", "q_value": "0.999906"},
      {"gene": "PIK3IP1", "log2(fold_change)": "-0.0620494", "q_value": "0.999906"},
      {"gene": "PIK3R2", "log2(fold_change)": "0.470878", "q_value": "0.999906"},
      {"gene": "PIK3R4", "log2(fold_change)": "-0.101704", "q_value": "0.999906"},
      {"gene": "PIKFYVE", "log2(fold_change)": "-0.224286", "q_value": "0.999906"},
      {"gene": "PILRA", "log2(fold_change)": "-0.229771", "q_value": "0.999906"},
      {"gene": "PILRB", "log2(fold_change)": "-0.255769", "q_value": "0.999906"},
      {"gene": "PIM2", "log2(fold_change)": "-0.226484", "q_value": "0.999906"},
      {"gene": "PIM3", "log2(fold_change)": "-0.163647", "q_value": "0.999906"},
      {"gene": "PIN1", "log2(fold_change)": "-0.211183", "q_value": "0.999906"},
      {"gene": "PIN1P1", "log2(fold_change)": "-0.769343", "q_value": "0.999906"},
      {"gene": "PIN4", "log2(fold_change)": "0.0892971", "q_value": "0.999906"},
      {"gene": "PINK1", "log2(fold_change)": "-0.358334", "q_value": "0.999906"},
      {"gene": "PINX1", "log2(fold_change)": "-0.209831", "q_value": "0.999906"},
      {"gene": "PION", "log2(fold_change)": "-0.544516", "q_value": "0.999906"},
      {"gene": "PIP4K2A", "log2(fold_change)": "-0.234026", "q_value": "0.999906"},
      {"gene": "PIP4K2B", "log2(fold_change)": "0.105091", "q_value": "0.999906"},
      {"gene": "PIP4K2C", "log2(fold_change)": "0.0882754", "q_value": "0.999906"},
      {"gene": "PIP5K1A", "log2(fold_change)": "-0.422854", "q_value": "0.999906"},
      {"gene": "PIP5K1C", "log2(fold_change)": "-0.0818301", "q_value": "0.999906"},
      {"gene": "PIP5KL1", "log2(fold_change)": "0.522043", "q_value": "0.999906"},
      {"gene": "PIPSL", "log2(fold_change)": "-0.121932", "q_value": "0.999906"},
      {"gene": "PIR", "log2(fold_change)": "0.733093", "q_value": "0.999906"},
      {"gene": "PISD", "log2(fold_change)": "-0.448376", "q_value": "0.999906"},
      {"gene": "PITHD1", "log2(fold_change)": "0.0804858", "q_value": "0.999906"},
      {"gene": "PITPNA", "log2(fold_change)": "-0.394683", "q_value": "0.999906"},
      {"gene": "PITPNB", "log2(fold_change)": "-0.334565", "q_value": "0.999906"},
      {"gene": "PITPNC1", "log2(fold_change)": "-0.953388", "q_value": "0.999906"},
      {"gene": "PITPNM1", "log2(fold_change)": "-0.185639", "q_value": "0.999906"},
      {"gene": "PITPNM2", "log2(fold_change)": "-0.293002", "q_value": "0.999906"},
      {"gene": "PITRM1", "log2(fold_change)": "-0.22316", "q_value": "0.999906"},
      {"gene": "PITX1", "log2(fold_change)": "0.503247", "q_value": "0.999906"},
      {"gene": "PIWIL4", "log2(fold_change)": "-0.504798", "q_value": "0.999906"},
      {"gene": "PJA1", "log2(fold_change)": "0.163", "q_value": "0.999906"},
      {"gene": "PJA2", "log2(fold_change)": "0.0721017", "q_value": "0.999906"},
      {"gene": "PKD1", "log2(fold_change)": "-0.516148", "q_value": "0.999906"},
      {"gene": "PKD1L2", "log2(fold_change)": "1.09713", "q_value": "0.999906"},
      {"gene": "PKD1P1", "log2(fold_change)": "-0.402932", "q_value": "0.999906"},
      {"gene": "PKI55", "log2(fold_change)": "-0.182918", "q_value": "0.999906"},
      {"gene": "PKIG", "log2(fold_change)": "0.0472659", "q_value": "0.999906"},
      {"gene": "PKM2", "log2(fold_change)": "0.309378", "q_value": "0.999906"},
      {"gene": "PKN1", "log2(fold_change)": "-0.160623", "q_value": "0.999906"},
      {"gene": "PKN2", "log2(fold_change)": "-0.0480468", "q_value": "0.999906"},
      {"gene": "PKN3", "log2(fold_change)": "-0.480253", "q_value": "0.999906"},
      {"gene": "PKNOX1", "log2(fold_change)": "0.33629", "q_value": "0.999906"},
      {"gene": "PKP4", "log2(fold_change)": "0.00734729", "q_value": "0.999906"},
      {"gene": "PLA1A", "log2(fold_change)": "0.547988", "q_value": "0.999906"},
      {"gene": "PLA2G12A", "log2(fold_change)": "0.0648271", "q_value": "0.999906"},
      {"gene": "PLA2G15", "log2(fold_change)": "-0.441756", "q_value": "0.999906"},
      {"gene": "PLA2G16", "log2(fold_change)": "-0.446063", "q_value": "0.999906"},
      {"gene": "PLA2G2A", "log2(fold_change)": "-0.970154", "q_value": "0.999906"},
      {"gene": "PLA2G4B", "log2(fold_change)": "-0.339346", "q_value": "0.999906"},
      {"gene": "PLA2G4C", "log2(fold_change)": "1.05112", "q_value": "0.999906"},
      {"gene": "PLA2G5", "log2(fold_change)": "-0.289555", "q_value": "0.999906"},
      {"gene": "PLA2G6", "log2(fold_change)": "-0.272527", "q_value": "0.999906"},
      {"gene": "PLA2R1", "log2(fold_change)": "-0.0551059", "q_value": "0.999906"},
      {"gene": "PLAA", "log2(fold_change)": "0.102772", "q_value": "0.999906"},
      {"gene": "PLAC9", "log2(fold_change)": "0.054288", "q_value": "0.999906"},
      {"gene": "PLAG1", "log2(fold_change)": "-0.130444", "q_value": "0.999906"},
      {"gene": "PLAGL1", "log2(fold_change)": "0.0899422", "q_value": "0.999906"},
      {"gene": "PLAGL2", "log2(fold_change)": "-0.220008", "q_value": "0.999906"},
      {"gene": "PLAT", "log2(fold_change)": "0.125056", "q_value": "0.999906"},
      {"gene": "PLAU", "log2(fold_change)": "0.547674", "q_value": "0.999906"},
      {"gene": "PLAUR", "log2(fold_change)": "-0.0979941", "q_value": "0.999906"},
      {"gene": "PLBD1", "log2(fold_change)": "0.17858", "q_value": "0.999906"},
      {"gene": "PLBD2", "log2(fold_change)": "-0.101298", "q_value": "0.999906"},
      {"gene": "PLCB1", "log2(fold_change)": "0.695862", "q_value": "0.999906"},
      {"gene": "PLCB3", "log2(fold_change)": "-0.207259", "q_value": "0.999906"},
      {"gene": "PLCD1", "log2(fold_change)": "-0.257529", "q_value": "0.999906"},
      {"gene": "PLCD3", "log2(fold_change)": "0.00227446", "q_value": "0.999906"},
      {"gene": "PLCD4", "log2(fold_change)": "0.418682", "q_value": "0.999906"},
      {"gene": "PLCE1", "log2(fold_change)": "-0.575358", "q_value": "0.999906"},
      {"gene": "PLCG1", "log2(fold_change)": "0.0177259", "q_value": "0.999906"},
      {"gene": "PLCL1", "log2(fold_change)": "-0.36039", "q_value": "0.999906"},
      {"gene": "PLCL2", "log2(fold_change)": "0.0429628", "q_value": "0.999906"},
      {"gene": "PLCXD1", "log2(fold_change)": "0.0936831", "q_value": "0.999906"},
      {"gene": "PLD1", "log2(fold_change)": "0.571187", "q_value": "0.999906"},
      {"gene": "PLD2", "log2(fold_change)": "0.000619652", "q_value": "0.999906"},
      {"gene": "PLD3", "log2(fold_change)": "0.0743518", "q_value": "0.999906"},
      {"gene": "PLD6", "log2(fold_change)": "0.305592", "q_value": "0.999906"},
      {"gene": "PLDN", "log2(fold_change)": "0.0766879", "q_value": "0.999906"},
      {"gene": "PLEKHA1", "log2(fold_change)": "-0.298562", "q_value": "0.999906"},
      {"gene": "PLEKHA2", "log2(fold_change)": "-0.300531", "q_value": "0.999906"},
      {"gene": "PLEKHA3", "log2(fold_change)": "-0.40632", "q_value": "0.999906"},
      {"gene": "PLEKHA4", "log2(fold_change)": "0.503206", "q_value": "0.999906"},
      {"gene": "PLEKHA5", "log2(fold_change)": "0.283006", "q_value": "0.999906"},
      {"gene": "PLEKHA8", "log2(fold_change)": "-0.645588", "q_value": "0.999906"},
      {"gene": "PLEKHA8P1", "log2(fold_change)": "-0.531053", "q_value": "0.999906"},
      {"gene": "PLEKHB1", "log2(fold_change)": "0.424701", "q_value": "0.999906"},
      {"gene": "PLEKHB2", "log2(fold_change)": "-0.0733685", "q_value": "0.999906"},
      {"gene": "PLEKHF2", "log2(fold_change)": "-0.287979", "q_value": "0.999906"},
      {"gene": "PLEKHG1", "log2(fold_change)": "0.529538", "q_value": "0.999906"},
      {"gene": "PLEKHG2", "log2(fold_change)": "-0.213337", "q_value": "0.999906"},
      {"gene": "PLEKHG3", "log2(fold_change)": "-0.0442598", "q_value": "0.999906"},
      {"gene": "PLEKHG5", "log2(fold_change)": "0.71911", "q_value": "0.999906"},
      {"gene": "PLEKHH2", "log2(fold_change)": "-0.368454", "q_value": "0.999906"},
      {"gene": "PLEKHH3", "log2(fold_change)": "0.0757596", "q_value": "0.999906"},
      {"gene": "PLEKHJ1", "log2(fold_change)": "-0.428732", "q_value": "0.999906"},
      {"gene": "PLEKHM1", "log2(fold_change)": "0.0170968", "q_value": "0.999906"},
      {"gene": "PLEKHM1P", "log2(fold_change)": "-0.417923", "q_value": "0.999906"},
      {"gene": "PLEKHM2", "log2(fold_change)": "-0.176468", "q_value": "0.999906"},
      {"gene": "PLEKHM3", "log2(fold_change)": "-0.154065", "q_value": "0.999906"},
      {"gene": "PLEKHO1", "log2(fold_change)": "-0.457085", "q_value": "0.999906"},
      {"gene": "PLEKHO2", "log2(fold_change)": "0.0140866", "q_value": "0.999906"},
      {"gene": "PLGLB2", "log2(fold_change)": "7.51681", "q_value": "0.999906"},
      {"gene": "PLIN2", "log2(fold_change)": "-0.198184", "q_value": "0.999906"},
      {"gene": "PLIN3", "log2(fold_change)": "-0.109484", "q_value": "0.999906"},
      {"gene": "PLIN4", "log2(fold_change)": "0.592994", "q_value": "0.999906"},
      {"gene": "PLK1", "log2(fold_change)": "0.0563091", "q_value": "0.999906"},
      {"gene": "PLK1S1", "log2(fold_change)": "0.0211276", "q_value": "0.999906"},
      {"gene": "PLK3", "log2(fold_change)": "0.309165", "q_value": "0.999906"},
      {"gene": "PLOD1", "log2(fold_change)": "0.077685", "q_value": "0.999906"},
      {"gene": "PLOD2", "log2(fold_change)": "0.253979", "q_value": "0.999906"},
      {"gene": "PLOD3", "log2(fold_change)": "-0.354463", "q_value": "0.999906"},
      {"gene": "PLP2", "log2(fold_change)": "-0.502404", "q_value": "0.999906"},
      {"gene": "PLRG1", "log2(fold_change)": "-0.00728001", "q_value": "0.999906"},
      {"gene": "PLS3", "log2(fold_change)": "-0.13947", "q_value": "0.999906"},
      {"gene": "PLSCR1", "log2(fold_change)": "-0.0923767", "q_value": "0.999906"},
      {"gene": "PLSCR3", "log2(fold_change)": "0.126259", "q_value": "0.999906"},
      {"gene": "PLSCR4", "log2(fold_change)": "-0.490349", "q_value": "0.999906"},
      {"gene": "PLTP", "log2(fold_change)": "0.268556", "q_value": "0.999906"},
      {"gene": "PLXNA1", "log2(fold_change)": "-0.0446196", "q_value": "0.999906"},
      {"gene": "PLXNA2", "log2(fold_change)": "0.523343", "q_value": "0.999906"},
      {"gene": "PLXNA3", "log2(fold_change)": "0.146227", "q_value": "0.999906"},
      {"gene": "PLXNB2", "log2(fold_change)": "0.270226", "q_value": "0.999906"},
      {"gene": "PLXNB3", "log2(fold_change)": "-0.114967", "q_value": "0.999906"},
      {"gene": "PLXNC1", "log2(fold_change)": "-0.0643891", "q_value": "0.999906"},
      {"gene": "PLXND1", "log2(fold_change)": "0.0318922", "q_value": "0.999906"},
      {"gene": "PM20D2", "log2(fold_change)": "-0.569024", "q_value": "0.999906"},
      {"gene": "PMAIP1", "log2(fold_change)": "-0.0213657", "q_value": "0.999906"},
      {"gene": "PMEPA1", "log2(fold_change)": "0.989116", "q_value": "0.999906"},
      {"gene": "PMF1", "log2(fold_change)": "0.188098", "q_value": "0.999906"},
      {"gene": "PMF1-BGLAP", "log2(fold_change)": "0.0874082", "q_value": "0.999906"},
      {"gene": "PML", "log2(fold_change)": "-0.294774", "q_value": "0.999906"},
      {"gene": "PMM1", "log2(fold_change)": "-0.244179", "q_value": "0.999906"},
      {"gene": "PMM2", "log2(fold_change)": "-0.412176", "q_value": "0.999906"},
      {"gene": "PMP22", "log2(fold_change)": "0.215891", "q_value": "0.999906"},
      {"gene": "PMPCA", "log2(fold_change)": "-0.173672", "q_value": "0.999906"},
      {"gene": "PMPCB", "log2(fold_change)": "-0.0798028", "q_value": "0.999906"},
      {"gene": "PMS1", "log2(fold_change)": "-0.533488", "q_value": "0.999906"},
      {"gene": "PMS2", "log2(fold_change)": "0.367819", "q_value": "0.999906"},
      {"gene": "PMS2CL", "log2(fold_change)": "-0.0317774", "q_value": "0.999906"},
      {"gene": "PMS2L2", "log2(fold_change)": "-0.437212", "q_value": "0.999906"},
      {"gene": "PMS2P1", "log2(fold_change)": "-0.150851", "q_value": "0.999906"},
      {"gene": "PMS2P3", "log2(fold_change)": "0.480687", "q_value": "0.999906"},
      {"gene": "PMS2P4", "log2(fold_change)": "0.171935", "q_value": "0.999906"},
      {"gene": "PMS2P5", "log2(fold_change)": "-0.00101116", "q_value": "0.999906"},
      {"gene": "PMVK", "log2(fold_change)": "0.056691", "q_value": "0.999906"},
      {"gene": "PNISR", "log2(fold_change)": "0.0935936", "q_value": "0.999906"},
      {"gene": "PNKD", "log2(fold_change)": "-0.140803", "q_value": "0.999906"},
      {"gene": "PNKP", "log2(fold_change)": "0.224059", "q_value": "0.999906"},
      {"gene": "PNMA1", "log2(fold_change)": "-0.00307932", "q_value": "0.999906"},
      {"gene": "PNMA2", "log2(fold_change)": "-0.54064", "q_value": "0.999906"},
      {"gene": "PNMA6C", "log2(fold_change)": "0.456687", "q_value": "0.999906"},
      {"gene": "PNMAL1", "log2(fold_change)": "0.152339", "q_value": "0.999906"},
      {"gene": "PNMAL2", "log2(fold_change)": "0.0318104", "q_value": "0.999906"},
      {"gene": "PNN", "log2(fold_change)": "-0.0684188", "q_value": "0.999906"},
      {"gene": "PNO1", "log2(fold_change)": "-0.645158", "q_value": "0.999906"},
      {"gene": "PNP", "log2(fold_change)": "-0.725135", "q_value": "0.999906"},
      {"gene": "PNPLA3", "log2(fold_change)": "-0.0327772", "q_value": "0.999906"},
    ]

    var yLabel = '-log<tspan baseline-shift="sub">10</tspan>False Discovery Rate',
     xLabel = 'log<tspan baseline-shift="sub">2</tspan>Fold-change';
    var volcanoPlot1 = volcanoPlot()
         .xAxisLabel(xLabel)
         .yAxisLabel(yLabel)
         .foldChangeThreshold(2.0)
         .sampleID("gene")
         .xColumn("log2(fold_change)")
         .yColumn("q_value");
       d3.select('#volcano')
               .data([d])
               .call(volcanoPlot1);
  },[])

  return (
    <div>
      <div id ='volcano' className="p-3">
      </div>
    <button id="resetBtn">Reset</button>
    </div>
  )
}
