import tip from 'd3-tip'
import * as d3 from 'd3'
import React, { useState,useEffect,useRef } from 'react'
import { schemePaired } from 'd3-scale-chromatic';

export default function StackedBarChart({width}) {
  const drawBarChart = (data,key,width)=>{
    var me = this,
		  domEle = 'StackedBarChart',
		  stackKey = key,
		  data = data,
		  margin = {top: 20, right: 20, bottom: 30, left: 50},
		  width = width - margin.left - margin.right,
		  height = 400 - margin.top - margin.bottom,
		  xScale = d3.scaleLinear().rangeRound([0, width]),
		  yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
		  color = d3.scaleOrdinal(schemePaired),
		  xAxis = d3.axisBottom(xScale),
		  yAxis =  d3.axisLeft(yScale),
		  svg = d3.select("#"+domEle).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var stack = d3.stack()
			.keys(stackKey)
			/*.order(d3.stackOrder)*/
			.offset(d3.stackOffsetNone);

		var layers= stack(data);
			yScale.domain(data.map(function(d) { return d.date; }));
			xScale.domain([0, 999 ]).nice();

		var layer = svg.selectAll(".layer")
			.data(layers)
			.enter().append("g")
			.attr("class", "layer")
			.style("fill", function(d, i) { return color(i); });

		  layer.selectAll("rect")
			  .data(function(d) { return d; })
			.enter().append("rect")
			  .attr("y", function(d) { return yScale(d.data.date); })
			  .attr("x", function(d) { return xScale(d[0]); })
			  .attr("height", yScale.bandwidth())
			  .attr("width", function(d) {
          var v_ = xScale(d[1]) - xScale(d[0])
          if (isNaN(v_)){
            v_=0
          }
          return v_
        });
    svg.append("g")
		  .attr("class", "axis axis--x")
		  .attr("transform", "translate(0," + (height+5) + ")")
		  .call(xAxis);

		svg.append("g")
		  .attr("class", "axis axis--y")
		  .attr("transform", "translate(0,0)")
		  .call(yAxis);
  }

  useEffect(()=>{
    var data = [{"date":"TEXT","01":59,"03":33,"04":23},{"date":"DIFF","02":88,"03":1,"04":30},{"date":"ETCH","02":78,"03":81,"04":70},{"date":"ANNL","01":53,"03":12,"05":18},{"date":"FCOT","01":84,"02":27,"05":16},{"date":"PRNT","01A":72,"01A":14,"04B":42}];
    var key = ["01","02", "03", "04","05","01A", "01B", "02A", "02B", "01A", "03B", "04A", "04B"];
    drawBarChart(data,key,width)
  },[])
  return (
    <div id='StackedBarChart'>
    </div>
  )
}
