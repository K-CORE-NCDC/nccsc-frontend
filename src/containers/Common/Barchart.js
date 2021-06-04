import tip from 'd3-tip'
import * as d3 from 'd3'
import React, { useState,useEffect } from 'react'


export default function Barchart({width}) {
  const drawGraph = (data1,width)=>{
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = width - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    var tip1 = tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d,target) {
        // console.log(d.path,target);
        return "<strong>"+target.group+"</strong> <span style='color:red'>"+target.value+"</span>";
      })
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip1);
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data1.map(function(d) { return d.group; }))
        .padding(0.2);
    let xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

          // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 20])
      .range([ height, 0]);


    let yAxis = svg.append("g")
      .attr("class", "myYaxis")
      .call(d3.axisLeft(y).tickSizeOuter(0)).selectAll(".tick").each(function(data) {
        var line = d3.select(this).selectAll('line');
        line.attr("x2",width)
        line.attr("stroke","#d9d9d9")
      });


    let bar_width  = 0
    let next_bar_width = 0
    var u = svg.selectAll("rect")
      .data(data1)
    u.enter()
      .append("rect")
      .merge(u)
      //.transition()
      //.duration(1000)
      .attr("class","rect")
      .attr("x", function(d,i) {

        let final_width = 0
        if(i==0){
          bar_width = width/(data1.length)
          final_width = final_width+12
        }else{
          bar_width = i*bar_width
          final_width = bar_width+12
        }
        return final_width

      })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", function(d,i){
        let w =  width/(data1.length)
        return w-24
      })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#69b3a2")
      .on("mouseover", tip1.show)
      .on("mouseout", tip1.hide)
    // u.exit().remove();

    u.transition()
        .duration(1000)

    svg.selectAll(".domain")
    .attr("stroke","#d9d9d9")




    let line_width = 0
    let bar_size = 0
    xAxis.selectAll(".tick").each(function(data,i) {
      var tick = d3.select(this);
      let w = width/data1.length
      bar_size = w/2
      w = w+line_width
      tick.attr("transform","translate("+w+",0)")

      var line = d3.select(this).selectAll('line');
      line.attr("y2",-height)
      line.attr("stroke","#d9d9d9")

      var text = d3.select(this).selectAll('text');
      let xw = bar_size
      text.attr("x",-xw)
      line_width = w
    });

    xAxis.select('.domain').attr('stroke-width', 0)


  }

  useEffect(()=>{
    var data1 = [
       {group: "A", value: 4},
       {group: "B", value: 16},
    ];
    drawGraph(data1,width)

  },[])

  return (
    <div id="my_dataviz">
    </div>
  )

}
