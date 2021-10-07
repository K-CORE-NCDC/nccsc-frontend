import React, { useState,useEffect,useRef } from 'react';
import * as d3 from 'd3'
// import {nest} from 'd3-collection';
import * as d3Collection from 'd3-collection';


export default function Boxplot({data}) {
  const elementRef = useRef(null);

  const drawChart = (w,dt)=>{
    var doc = document.getElementById('my_dataviz')
    if(doc.hasChildNodes()){
      document.getElementById('my_dataviz').innerHTML=''
    }
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = w - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(40,-40)");

    var div = d3.select("#my_dataviz").append("div").attr('class','boxplot_tooltip')
               .style("opacity", 0);
    var data = dt


    var domains = []
    var max_d = []
    for (var i = 0; i < data.length; i++) {
      domains.push(data[i].label)
      max_d.push(...data[i].data)
    }
    var max_vl = 10
    var min_vl = 0
    if(max_d.length>0){
      max_vl = Math.max(...max_d)
      min_vl = Math.min(...max_d)
    }

    var sumstat = d3Collection.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.label;})
    .rollup(function(d) {
      var d = d[0]
      var q1 = d3.quantile(d['data'],.25)
      var median = d3.quantile(d['data'],.5)
      var q3 = d3.quantile(d['data'],.75)
      var interQuantileRange = q3 - q1
      var min = q1 - 1.5 * interQuantileRange
      var max = q3 + 1.5 * interQuantileRange
      if (min < min_vl){
        min_vl = min
      }
      if (max > max_vl){
        max_vl = max+20
      }
      return({q1: q1, median: median, q3: q3, min: min, max: max})
    })
    .entries(data)

        // Show the X scale
     var x = d3.scaleBand()
       .range([ 0, width ])
       .domain(domains)
       // .paddingInner(1)
       .paddingOuter(.5)

     svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x))
       .selectAll("text")
       .attr("y", 0)
       .attr("x", 9)
       .attr("dy", ".35em")
       .attr("transform", "rotate(130)")
       .style("text-anchor", "start");
     // Show the Y scale
     // console.log(min_vl)

     var y = d3.scaleLinear()
       .domain([-max_vl, max_vl])
       .range([height, 0])
     svg.append("g").call(d3.axisLeft(y))


     for (var i = 0; i < sumstat.length; i++) {
        var p = svg.append('g').attr('class','box')
        .attr('id',i)
        p.selectAll("vertLines")
          .data([sumstat[i]])
          .enter()
          .append("line")
            .attr("x1", function(d){
              return(x(d.key))
            })
            .attr("x2", function(d){return(x(d.key))})
            .attr("y1", function(d){
              
                return(y(d.value.min))
              
            })
            .attr("y2", function(d){
              
              return(y(d.value.max))
              
            })
            .attr("stroke", "black")
            .style("width", 40)

        var boxWidth = 60-20
        p.selectAll("boxes")
          .data([sumstat[i]])
          .enter()
          .append("rect")
          .attr("x", function(d){return(x(d.key)-boxWidth/2)})
          .attr("y", function(d){return(y(d.value.q3))})
          .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
          .attr("width", boxWidth )
          .attr("stroke", "black")
          .style("fill", "#69b3a2")


               // Show the median
         p.selectAll("medianLines")
          .data([sumstat[i]])
          .enter()
          .append("line")
          .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
          .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
          .attr("y1", function(d){return(y(d.value.median))})
          .attr("y2", function(d){return(y(d.value.median))})
          .attr("stroke", "black")
          .style("width", 80)

        //
        p.selectAll("toto")
        .data([sumstat[i]])
        .enter()
        .append("line")
          .attr('clas','r')
          .attr("x1", function(d){
            return(x(d.key)-boxWidth/2)
          })
          .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
          .attr("y1", function(d){
            if (y(d.value.min)>height){
              return(y(d.value.q3)-30)
            }else{
              return(y(d.value.max))

            }
          })
          .attr("y2", function(d){
            if (y(d.value.min)>height){
              return(y(d.value.q3)-30)
            }else{
              return(y(d.value.max))

            }
          })
          .attr("stroke", "black")


          p.selectAll("toto")
          .data([sumstat[i]])
          .enter()
          .append("line")
            .attr('class','rz')
            .attr("x1", function(d){
              return(x(d.key)-boxWidth/2)
            })
            .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
            .attr("y1", function(d){
              if (y(d.value.min)>height){
                return height-30
              }else{
                return(y(d.value.min))
              }
            })
            .attr("y2", function(d){
              if (y(d.value.min)>height){
                return height-30
              }else{
                return(y(d.value.min))
              }
            })
            .attr("stroke", "black")

          p.on("mouseover", function(d){
            var id = this.id
            var html = ''
            for(var key in sumstat[id].value){
              html +=key+":"+ sumstat[id].value[key]+"<br/>"
            }
            div.html(html)
               .style("left","50px")
               .style("top", "0px")
               .style("opacity", 1);

          })
          p.on("mouseleave", function(d){
            div.style("opacity", 0);
          })
      }
  }

  useEffect(()=>{
    if(data){
      let w = elementRef.current.getBoundingClientRect().width
      // console.log(w);
      drawChart(w,data)
    }
  },[data])
  return (
    <>
      <div id="my_dataviz" className='relative' ref={elementRef}></div>
    </>
  )
}
