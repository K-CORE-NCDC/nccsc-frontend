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
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
      if(d_['datasets'].length>width){
        width = d_['datasets'].length+500
      }
      var svg = d3.select("#box2")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


    // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
     // nest function allows to group the calculation per level of a factor
    var max_vl = 5 //d_['max']
    var min_vl = 0 //d_['min']
    var domains = []
    var sumstat = nest()
        .key(function(d) { return d.Species;})
        .rollup(function(d) {
          var t = []
          var n = []
          for (var i = 0; i < d.length; i++) {
            if (domains.includes(d[i]['Species'])===false){
              domains.push(d[i]['Species'])
            }

            if(d[i]['type']=="T"){
              let q1 = d3.quantile(d.map(function(g) {
                if (g.type==="T") return g.Sepal_Length;
              }).sort(d3.ascending),.25)
              let median = d3.quantile(d.map(function(g) {
                if (g.type==="T") return g.Sepal_Length;
              }).sort(d3.ascending),.5)
              let q3 = d3.quantile(d.map(function(g) {
                if (g.type==="T") return g.Sepal_Length;
              }).sort(d3.ascending),.75)
              let interQuantileRange = q3 - q1
              let min = q1 - 1.5 * interQuantileRange
              let max = q3 + 1.5 * interQuantileRange
              t.push({
                q1: q1,
                median: median,
                q3: q3,
                interQuantileRange: interQuantileRange,
                min: min,
                max: max,
                Sepal_Length: d[i]['Sepal_Length']
              })

              if (min < min_vl){
                min_vl = min
              }
              if (max > max_vl){
                max_vl = max+2
              }
            }else{
              let q1 = d3.quantile(d.map(function(g) {
                if (g.type==="N") return g.Sepal_Length;
              }).sort(d3.ascending),.25)
              let median = d3.quantile(d.map(function(g) {
                if (g.type==="N") return g.Sepal_Length;
              }).sort(d3.ascending),.5)
              let q3 = d3.quantile(d.map(function(g) {
                if (g.type==="N") return g.Sepal_Length;
              }).sort(d3.ascending),.75)
              let interQuantileRange = q3 - q1
              let min = q1 - 1.5 * interQuantileRange
              let max = q3 + 1.5 * interQuantileRange
              n.push({
                q1: q1,
                median: median,
                q3: q3,
                interQuantileRange: interQuantileRange,
                min: min,
                max: max,
                Sepal_Length: d[i]['Sepal_Length']
              })
              if (min < min_vl){
                min_vl = min
              }
              if (max > max_vl){
                max_vl = max+2
              }
            }
          }
          return [t,n]
      })
      .entries(d_['datasets'])


    // Show the X scale
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(domains)
      .paddingInner(1)
      .paddingOuter(.5)
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

        // Show the Y scale

    var y = d3.scaleLinear()
      .domain([min_vl,max_vl])
      .range([height, 0])
    svg.append("g").call(d3.axisLeft(y))

    for (var i = 0; i < sumstat.length; i++) {
      // console.log(sumstat[i]);
      var p = svg.append('g').attr('class','box')
      .attr('id',i)
      var key = x(sumstat[i]['key'])-50
      var vl = sumstat[i]['value']

      for (var z = 0; z < vl.length; z++) {
        p.selectAll("vertLines")
          .data([vl[z]])
          .enter()
          .append("line")
            .attr("x1", function(d){
              return(key)
            })
            .attr("x2", function(d){
              return(key)
            })
            .attr("y1", function(d){
              return(y(d[0].min))
            })
            .attr("y2", function(d){
              return(y(d[0].max))

            })
            .attr("stroke", "black")
            .style("width", 40)


        var boxWidth = 100- 20
        p.selectAll("boxes")
          .data([vl[z]])
          .enter()
          .append("rect")
          .attr("x", function(d){
            return(key-boxWidth/2)
          })
          .attr("y", function(d){return(
            y(d[0].q3))
          })
          .attr("height", function(d){

            return(y(d[0].q1)-y(d[0].q3))
          })
          .attr("width", boxWidth )
          .attr("stroke", "black")
          .style("fill", "#69b3a2")

        p
          .selectAll("medianLines")
          .data([vl[z]])
          .enter()
          .append("line")
            .attr("x1", function(d){return(key-boxWidth/2) })
            .attr("x2", function(d){return(key+boxWidth/2) })
            .attr("y1", function(d){return(y(d[0].median))})
            .attr("y2", function(d){return(y(d[0].median))})
            .attr("stroke", "black")
            .style("width", 80)

        var jitterWidth = 50
        p.selectAll("indPoints")
          .data(vl[z])
          .enter()
          .append("circle")
            .attr("cx", function(d){
              return(key - jitterWidth/2 + Math.random()*jitterWidth )
            })
            .attr("cy", function(d){
              // console.log(d);
              return(y(d.Sepal_Length))
            })
            .attr("r", 2)
            .style("fill", "red")
            .attr("stroke", "black")
        key = key+80
      }


    }

      // Add individual points with jitter
      //
  }


  useEffect(()=>{
    if(box_data){
      drawChart(box_data)
    }
  },[box_data])




  return (
      <div id="box2" style={{'width':'100%','overflowX':'scroll'}}>
      </div>
  )
}
