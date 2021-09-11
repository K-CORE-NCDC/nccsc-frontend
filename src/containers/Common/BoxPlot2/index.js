import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as d3 from 'd3';
import { nest } from 'd3-collection';
// import genes from '../Common/gene.json'
// import { getBreastKeys, getUserDataProjectsTableData } from '../../actions/api_actions'

export default function BoxPlot({ box_data }) {
  const elementRef = useRef(null);

  function drawChart(d_){
      // set the dimensions and margins of the graph
      let childnode = document.getElementById("box2");
      if(childnode.hasChildNodes()){
        while (childnode.firstChild) {
          childnode.removeChild(childnode.firstChild)
        }
      }

      var margin = {top: 15, right: 50, bottom: 60, left: 50},
      width = 1500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      var svg = d3.select("#box2")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


    // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
     // nest function allows to group the calculation per level of a factor
    var sumstat = nest()
        .key(function(d) { return d.Species;})
        .rollup(function(d) {
        let q1 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.25)
        let median = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.5)
        let q3 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.75)
        let interQuantileRange = q3 - q1
        let min = q1 - 1.5 * interQuantileRange
        let max = q3 + 1.5 * interQuantileRange
        return({
          q1: q1,
          median: median,
          q3: q3,
          interQuantileRange: interQuantileRange,
          min: min,
          max: max})
      })
      .entries(d_['datasets'])

    // Show the X scale
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(d_['gene_names'])
      .paddingInner(1)
      .paddingOuter(.5)
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

        // Show the Y scale
    var y = d3.scaleLinear()
      .domain([-d_['min'] - (d_['min'] * 3 ), d_['max']])
      .range([height, 0])
    svg.append("g").call(d3.axisLeft(y))

    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.key))})
        .attr("x2", function(d){return(x(d.key))})
        .attr("y1", function(d){return(y(d.value.min))})
        .attr("y2", function(d){return(y(d.value.max))})
        .attr("stroke", "black")
        .style("width", 40)

      // rectangle for the main box
      var boxWidth = 100
      svg
        .selectAll("boxes")
        .data(sumstat)
        .enter()
        .append("rect")
            .attr("x", function(d){return(x(d.key)-boxWidth/2)})
            .attr("y", function(d){return(y(d.value.q3))})
            .attr("height", function(d){
              return(y(d.value.q1)-y(d.value.q3))
            })
            .attr("width", boxWidth )
            .attr("stroke", "black")
            .style("fill", "#69b3a2")


      // Show the median
      svg
        .selectAll("medianLines")
        .data(sumstat)
        .enter()
        .append("line")
          .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
          .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
          .attr("y1", function(d){return(y(d.value.median))})
          .attr("y2", function(d){return(y(d.value.median))})
          .attr("stroke", "black")
          .style("width", 80)

      // Add individual points with jitter
      var jitterWidth = 50
      svg
        .selectAll("indPoints")
        .data(d_['datasets'])
        .enter()
        .append("circle")
          .attr("cx", function(d){return(x(d.Species) - jitterWidth/2 + Math.random()*jitterWidth )})
          .attr("cy", function(d){return(y(d.Sepal_Length))})
          .attr("r", 4)
          .style("fill", "white")
          .attr("stroke", "black")
  }


  useEffect(()=>{
    if(box_data){
        drawChart(box_data)
    }
  },[box_data])


  return (
      <div id="box2">
      </div>
  )
}
