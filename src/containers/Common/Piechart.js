import tip from 'd3-tip'
import * as d3 from 'd3'
import React, { useState,useEffect,useRef } from 'react'


export default function Piechart({width}) {
  const pieRef   = useRef(null);

  const drawPie = (data1,width)=>{
    var margin = {top: 30, right: 30, bottom: 70, left: 60};
    var width = width-50;
    var height = 400;
    var svg = d3.select('#pie').append("svg")
      .attr("width", width)
      .attr("height", 400)
      .attr("class", "inline")

      .append("g");

    svg.append("g")
			.attr("class", "slices");
    svg.append("g")
      .attr("class", "labels");
    svg.append("g")
      .attr("class", "lines");
    var margin = {top: 30, right: 30, bottom: 70, left: 60};
    var width = width;

    var radius = Math.min(width, height)/2;
    var color = 'red' //d3.scaleOrdinal(d3.schemeCategory20);
    var data = [26,25,10,30,30,50,33,56,38];



    var pie = d3.pie().sort(null).value(d => d);
    var arc = d3.arc().innerRadius(radius*0).outerRadius(radius*0.6);

     var outerArc = d3.arc()
                .outerRadius(radius * 0.9)
                .innerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
  	.attr('d', arc)
    .attr('fill', 'red');//color(i));
    svg.append('g').classed('labels',true);
    svg.append('g').classed('lines',true);


     var polyline = svg.select('.lines')
                .selectAll('polyline')
                .data(pie(data))
              .enter().append('polyline')
                .attr('stroke','red')
                .attr('fill','none')
                .attr('points', function(d) {

                    // see label transform function for explanations of these three lines.
                    var pos = outerArc.centroid(d);
                    
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return [arc.centroid(d), outerArc.centroid(d), pos]
                });



       var label = svg.select('.labels').selectAll('text')
                .data(pie(data))
              .enter().append('text')
                .attr('dy', '.35em')
                .html(function(d) {
                    return d.data;
                })
                .attr('transform', function(d) {
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });



    function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

  }

  useEffect(()=>{
    var data1 = [
       {group: "A", value: 4},
       {group: "B", value: 16},
    ];
    drawPie(data1,width)

  },[])
  return (
    <div id='pie' className='text-center'>
    </div>
  )
}
