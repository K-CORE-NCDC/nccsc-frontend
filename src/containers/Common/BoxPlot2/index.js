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
      var margin = {top: 10, right: 30, bottom: 30, left: 40},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      var svg = d3.select("#box2")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      // console.log(svg)


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
      .entries(d_)

    // Show the X scale
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(["setosa", "versicolor", "virginica"])
      .paddingInner(1)
      .paddingOuter(.5)
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

        // Show the Y scale
        var y = d3.scaleLinear()
          .domain([3,9])
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
            .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
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
        .data(d_)
        .enter()
        .append("circle")
          .attr("cx", function(d){return(x(d.Species) - jitterWidth/2 + Math.random()*jitterWidth )})
          .attr("cy", function(d){return(y(d.Sepal_Length))})
          .attr("r", 4)
          .style("fill", "white")
          .attr("stroke", "black")
  }


  useEffect(()=>{
    var data_ = [
      {"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},
      {"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":4.0,"Petal_Width":2,"Species":"setosa"},
      {"Sepal_Length":4.7,"Sepal_Width":3.2,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},
      {"Sepal_Length":4.6,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},
      {"Sepal_Length":5.3,"Sepal_Width":6.1,"Petal_Length":4.0,"Petal_Width":2,"Species":"setosa"},
      {"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.7,"Petal_Width":0.4,"Species":"setosa"},
      {"Sepal_Length":4.6,"Sepal_Width":3.4,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},
      {"Sepal_Length":5.3,"Sepal_Width":4.1,"Petal_Length":5.0,"Petal_Width":2,"Species":"setosa"},
      {"Sepal_Length":4.4,"Sepal_Width":2.9,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},
      {"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.1,"Species":"setosa"},
      {"Sepal_Length":5.4,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},
      {"Sepal_Length":4.8,"Sepal_Width":3.4,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},
      {"Sepal_Length":4.8,"Sepal_Width":3.1,"Petal_Length":4.0,"Petal_Width":1,"Species":"setosa"},
      {"Sepal_Length":4.3,"Sepal_Width":3.1,"Petal_Length":1.0,"Petal_Width":1,"Species":"setosa"},
      {"Sepal_Length":5.8,"Sepal_Width":4.1,"Petal_Length":2.0,"Petal_Width":2,"Species":"setosa"},
      {"Sepal_Length":5.7,"Sepal_Width":4.4,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},
      {"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.3,"Petal_Width":0.4,"Species":"setosa"},
      {"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},
      {"Sepal_Length":5.7,"Sepal_Width":3.8,"Petal_Length":1.7,"Petal_Width":0.3,"Species":"setosa"},
      {"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.5,"Petal_Width":0.3,"Species":"setosa"},
      {"Sepal_Length":5.4,"Sepal_Width":3.4,"Petal_Length":1.7,"Petal_Width":0.2,"Species":"setosa"},
      {"Sepal_Length":5.1,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},
      {"Sepal_Length":4.6,"Sepal_Width":3.6,"Petal_Length":1.0,"Petal_Width":2,"Species":"setosa"}
      ]
  drawChart(data_)
    // if(box_data){
    //     drawChart(box_data)
    // }
  },[])


  return (
      <div id="box2" className="md:w-auto sm:w-auto">
      </div>
  )
}
